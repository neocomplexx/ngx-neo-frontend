// Productor/administrativo del productor -> cliente (Professional)
// Administrativo -> Administrador

export enum TipoUsuarioGeneracion { Productor = 0, Administrativo = 1 }

export abstract class TipoUsuario {

    public static EsAdministrador(userType: string): boolean {
        return userType === 'administrator';
    }

    public static EsProfessional(userType: string): boolean {
        return userType === 'professional';
    }

    public static EsProductor(userRole: string): boolean {
        return userRole === 'Productor';
    }

    public static EsAdministrativoDeProductor(userRole: string) {
        return userRole === 'Administrativo';
    }
}
