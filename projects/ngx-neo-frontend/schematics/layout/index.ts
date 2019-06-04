// tslint:disable:max-line-length
import { Rule, SchematicContext, Tree, apply, url, noop, filter, template, move, mergeWith, MergeStrategy, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { normalize } from 'path';
import { strings } from '@angular-devkit/core';
import { setupOptions } from './setup';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
  getWorkspace,
  getProjectFromWorkspace,
  addModuleImportToRootModule,
} from 'schematics-utilities';
import { schemaOptions } from './schema';
import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';

export function layout(options: schemaOptions): Rule {

  return chain([
    options && options.skipComponents ? noop() : addModuleToImports(options),
    options && options.skipComponents ? noop() : addComponets(options),
    options && options.skipStyles ? noop() : addStyles(options),
    options && options.skipStyles ? noop() : addStylesImport(),
    options && options.skipStyles ? noop() : addAssets(options),
    options && options.skipComponents ? noop() : editAppModule(options),
    options && options.skipComponents ? noop() : editAppHtml(options),
    options && options.skipComponents ? noop() : editMainTs(options),
    options && options.skipCordova ? noop() : addCordova(options),
    options && options.skipCordova ? noop() : addCordovaToAJson(),
    options && options.skipPackageJson ? noop() : addPackageJsonDependencies(),
    options && options.skipPackageJson ? noop() : installPackageJsonDependencies(),
  ]);

}

const addComponets = (options: schemaOptions): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    setupOptions(tree, options);

    const movePath = (options.flat) ?
      normalize(options.path) :
      normalize(options.path + '/' + strings.dasherize(options.name));

    const templateSource = apply(url('./files'), [
      options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
      template({
        ...strings,
        ...options,
      }),
      move(movePath),
    ]);

    const rule = mergeWith(templateSource, MergeStrategy.Default);
    _context.logger.log('info', '✅️ Basic layout created');
    return rule(tree, _context);
  };
};

const editAppModule = (options: schemaOptions): Rule => {
  return (tree: Tree, _context: SchematicContext) => {

    let movePath = (options.flat) ?
      normalize(options.path) :
      normalize(options.path + '/' + strings.dasherize(options.name));

    movePath += '/app.module.ts';
    const buffer = tree.read(movePath);

    if (!buffer) { return tree; }

    const content = buffer.toString('utf-8');

    let newContent = content.replace('providers: []', providersString(options.projectName));

    newContent = newContent.replace(`import { BrowserModule }`, `import { BrowserModule, HAMMER_GESTURE_CONFIG }`);

    newContent = newContent.replace(`import { NgModule } from '@angular/core';`, `import { NgModule, ErrorHandler, InjectionToken } from '@angular/core';`);

    newContent = newContent.replace(`import { AppComponent } from './app.component';`, importString(options.projectName));

    tree.overwrite(movePath, newContent);

    return tree;
  };
};

const editAppHtml = (options: schemaOptions): Rule => {
  return (tree: Tree, _context: SchematicContext) => {

    let movePath = (options.flat) ?
      normalize(options.path) :
      normalize(options.path + '/' + strings.dasherize(options.name));

    movePath += '/app.component.html';
    const buffer = tree.read(movePath);

    if (!buffer) { return tree; }

   // const content = buffer.toString('utf-8');

    const newContent = '<router-outlet></router-outlet>';

    tree.overwrite(movePath, newContent);

    return tree;
  };
};

const editMainTs = (options: schemaOptions): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    setupOptions(tree, options);

    const movePath =
      normalize(options.path + '/../main.ts');

    const buffer = tree.read(movePath);

    if (!buffer) { return tree; }

    const content = buffer.toString('utf-8');

    const newContent = content.replace(`import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';`,
     `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';`);

    tree.overwrite(movePath, newContent);

    return tree;
  };
};

const addStyles = (options: schemaOptions): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    setupOptions(tree, options);

    const movePath =
      normalize(options.path + '/../styles');

    const templateSource = apply(url('./styles'), [
      template({
        ...strings,
        ...options,
      }),
      move(movePath),
    ]);

    const rule = mergeWith(templateSource, MergeStrategy.Default);
    _context.logger.log('info', '✅️ Styles folder created');
    return rule(tree, _context);
  };
};

const addAssets = (options: schemaOptions): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    setupOptions(tree, options);

    const movePath =
      normalize(options.path + '/../assets');

    const templateSource = apply(url('./assets'), [
      template({
        ...strings,
        ...options,
      }),
      move(movePath),
    ]);

    const rule = mergeWith(templateSource, MergeStrategy.Default);
    _context.logger.log('info', '✅️ Assets added');
    return rule(tree, _context);
  };
};

const addCordova = (options: schemaOptions): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    setupOptions(tree, options);

    const movePath =
      normalize('/cordova');

    const templateSource = apply(url('./cordova'), [
      template({
        ...strings,
        ...options,
      }),
      move(movePath),
    ]);

    const rule = mergeWith(templateSource, MergeStrategy.Default);
    _context.logger.log('info', '✅️ Cordova files generated');
    return rule(tree, _context);
  };
};

const addCordovaToAJson = (): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(tree);

    const angularJson = 'angular.json';
    const buffer = tree.read(angularJson);
    if (!buffer || !workspace.defaultProject) { return tree; }

    const pName = workspace.defaultProject;
    const content = JSON.parse(buffer.toString('utf-8'));

    content['projects'][pName]['architect']['build']['configurations']['cordova'] = JSON.parse(cordovaString);
    content['projects'][pName]['architect']['build']['configurations']['cordova'] = JSON.parse(cordovaDebugString);

    const newContent = JSON.stringify(content, null, 4);

    tree.overwrite(angularJson, newContent);

    _context.logger.log('info', '✅️ angular.json updated');

    return tree;
  };
};

const addStylesImport = (): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(tree);

    const angularJson = 'angular.json';
    const buffer = tree.read(angularJson);
    if (!buffer || !workspace.defaultProject) { return tree; }

    const pName = workspace.defaultProject;
    const content = JSON.parse(buffer.toString('utf-8'));

    content['projects'][pName]['architect']['build']['options']['styles'] = ['src/styles/styles.scss'];

    const newContent = JSON.stringify(content, null, 4);

    tree.overwrite(angularJson, newContent);

    _context.logger.log('info', '✅️ angular.json styles updated');

    return tree;
  };
};

const addPackageJsonDependencies = (): Rule => {
  return (host: Tree, context: SchematicContext) => {
    const dependencies: NodeDependency[] = [
      { type: NodeDependencyType.Default, version: '^4.3.1', name: 'bootstrap' },
      { type: NodeDependencyType.Default, version: '^4.1.1', name: '@ng-bootstrap/ng-bootstrap' },
      { type: NodeDependencyType.Default, version: '^2.0.8', name: 'hammerjs' },
      { type: NodeDependencyType.Default, version: '^7.3.6', name: '@angular/cdk' },
      { type: NodeDependencyType.Default, version: '^0.0.6', name: 'ng5-breadcrumb' },
      { type: NodeDependencyType.Default, version: '^6.0.2', name: 'ngx-treeview' },
      { type: NodeDependencyType.Default, version: '~7.1.0', name: '@angular/animations' },
      { type: NodeDependencyType.Default, version: '^5.8.1', name: '@fortawesome/fontawesome-free' },
      { type: NodeDependencyType.Default, version: '^7.0.1', name: '@neocomplexx/ngx-neo-modal' },
      { type: NodeDependencyType.Default, version: '^7.0.30', name: '@neocomplexx/ngx-neo-components' },
      { type: NodeDependencyType.Default, version: '^7.0.10', name: '@neocomplexx/ngx-neo-directives' },
      { type: NodeDependencyType.Default, version: '^7.0.0', name: '@neocomplexx/ngx-neo-loader' },
      { type: NodeDependencyType.Default, version: '^7.0.2', name: '@neocomplexx/ngx-neo-pipes' },
      { type: NodeDependencyType.Default, version: '^7.0.0', name: '@neocomplexx/ngx-neo-completer' },
      { type: NodeDependencyType.Default, version: '1.1.2', name: '@aspnet/signalr' }
    ];

    dependencies.forEach(dependency => {
      addPackageJsonDependency(host, dependency);
      context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
    });

    return host;
  };

};

const installPackageJsonDependencies = (): Rule => {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);

    return host;
  };
};

const addModuleToImports = (options: any): Rule => {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(
      workspace,
      // Takes the first project in case it's not provided by CLI
      options.project ? options.project : Object.keys(workspace['projects'])[0]
    );
    const moduleName = 'BrowserAnimationsModule';
    addModuleImportToRootModule(host, moduleName, '@angular/platform-browser/animations', project);
    context.logger.log('info', `✅️ "${moduleName}" is imported`);

    const moduleComponents = 'NgxNeoComponentsModule';
    addModuleImportToRootModule(host, moduleComponents, '@neocomplexx/ngx-neo-components', project);
    context.logger.log('info', `✅️ "${moduleComponents}" is imported`);

    const moduleNeoFront = 'NgxNeoFrontendModule.forRoot({ apiURL: urlAPI, delaySearchMilliseconds: searchDelay })';
    addModuleImportToRootModule(host, moduleNeoFront, '@neocomplexx/ngx-neo-frontend', project);
    context.logger.log('info', `✅️ "NgxNeoFrontend" is imported`);

    const moduleNeoCompleter = 'NgxNeoCompleterModule.forRoot()';
    addModuleImportToRootModule(host, moduleNeoCompleter, '@neocomplexx/ngx-neo-completer', project);
    context.logger.log('info', `✅️ "NgxNeoCompleter" is imported`);

    const moduleNeoPipes = 'NgxNeoPipesModule.forRoot()';
    addModuleImportToRootModule(host, moduleNeoPipes, '@neocomplexx/ngx-neo-pipes', project);
    context.logger.log('info', `✅️ "NgxNeoPipes" is imported`);

    const moduleNeomodal = 'NgxNeoModalModule.forRoot()';
    addModuleImportToRootModule(host, moduleNeomodal, '@neocomplexx/ngx-neo-modal', project);
    context.logger.log('info', `✅️ "NgxNeoModal" is imported`);

    const moduleNeoLoader = 'NgxNeoLoaderModule.forRoot()';
    addModuleImportToRootModule(host, moduleNeoLoader, '@neocomplexx/ngx-neo-loader', project);
    context.logger.log('info', `✅️ "NgxNeoLoader" is imported`);

    const moduleCoreModule = 'CoreModule';
    addModuleImportToRootModule(host, moduleCoreModule, './core/core.module', project);
    context.logger.log('info', `✅️ "${moduleCoreModule}" is imported`);

    const appRouting = 'AppRoutingModule';
    addModuleImportToRootModule(host, appRouting, './app-routing.module', project);
    context.logger.log('info', `✅️ "${appRouting}" is imported`);

    return host;
  };
};


const cordovaString = `{
  "fileReplacements": [
    {
      "replace": "src/index.html",
      "with": "./cordova/index.html"
    },
    {
      "replace": "src/environments/environment.ts",
      "with": "src/environments/environment.prod.ts"
    }
  ],
  "outputPath": "./cordova/www",
  "baseHref": ".",
  "optimization": true,
  "outputHashing": "all",
  "sourceMap": false,
  "extractCss": true,
  "namedChunks": false,
  "aot": true,
  "extractLicenses": true,
  "vendorChunk": false,
  "buildOptimizer": true
}`;
const cordovaDebugString = `{
  "fileReplacements": [
    {
      "replace": "src/index.html",
      "with": "./cordova/index.html"
    }
  ],
  "outputPath": "./cordova/www",
  "baseHref": ".",
  "optimization": false,
  "outputHashing": "all",
  "sourceMap": true,
  "extractCss": true,
  "namedChunks": false,
  "aot": false,
  "extractLicenses": true,
  "vendorChunk": true,
  "buildOptimizer": false
}`;

 const importString = (projectName: string) =>  `import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationNeoComplexxService, AuthGuard, HttpClientExtended, UnauthorizedErrorHandler, FrontEndConfig, UserServiceBackend, PushService, AuthenticationService, CordovaService, ExceptionManagerService, HeaderNeoComplexxService } from '@neocomplexx/ngx-neo-frontend';
import { HeaderService, NotificationService, CustomHammerConfig, MobileSidebarService } from '@neocomplexx/ngx-neo-components';
import { urlAPI, searchDelay } from './shared/constants';
import { Header${classify(projectName)}Service } from 'src/app/core/header-${dasherize(projectName)}/header-${dasherize(projectName)}.service';
import { Auth${classify(projectName)}Interceptor } from './shared/auth/auth-${dasherize(projectName)}.interceptor';
import { Unauthorized${classify(projectName)}ErrorHandler } from './shared/services/unauthorized-${dasherize(projectName)}.errorhandler';
import { BreadcrumbService } from 'ng5-breadcrumb';

const FrontEndConfigService = new InjectionToken<FrontEndConfig>('FrontEndConfig');
const config: FrontEndConfig = { delaySearchMilliseconds: searchDelay, apiURL: urlAPI };
    `;


const providersString = (projectName: string) =>  `  providers: [
  { provide: ErrorHandler, useClass: Unauthorized${classify(projectName)}ErrorHandler },
  { provide: HTTP_INTERCEPTORS, useClass: Auth${classify(projectName)}Interceptor, multi: true },
  { provide: HttpClient, useClass: HttpClientExtended },
  { provide: HeaderService, useExisting: Header${classify(projectName)}Service },
  { provide: HeaderNeoComplexxService, useExisting: Header${classify(projectName)}Service },
  { provide: NotificationService, useExisting: NotificationNeoComplexxService },
  {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: CustomHammerConfig
  },
  {
    provide: FrontEndConfigService,
    useValue: config
  },
  AuthGuard,
  BreadcrumbService,
]`;
