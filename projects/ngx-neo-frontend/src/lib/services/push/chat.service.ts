import { Injectable } from '@angular/core';
import { ChatMessageModelDTO } from '../../models/chatMessage.ModelDTO';
import { UserDTO } from '../../models/DTO/User.DTO';
import { ChatMessageDTO } from '../../models/DTO/chatMessage.DTO';
import { PushService } from './signalr.push.service';

export class ChatUser {
  public messages: Array<ChatMessageModelDTO>;
  public nuevos = false;
  constructor(public userTo: UserDTO, public onLine: boolean) {
    this.messages = new Array<ChatMessageModelDTO>();
  }

  public AddChatMessage(message: ChatMessageDTO) {
    const messageDTO = new ChatMessageDTO();
    messageDTO.PrepareDTO(message);
    messageDTO.receptionDate = new Date();
    const messageModel = new ChatMessageModelDTO(messageDTO);
    this.nuevos = true;
    this.messages.push(messageModel);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public Users: Map<string, ChatUser> = new Map<string, ChatUser>();

  constructor(private pushService: PushService) {

    this.pushService.registerPushFrom<UserDTO>('UserOn', (user) => {
      if (user) { this.setUserIsOnline(user, true); }
    });

    this.pushService.registerPushFrom<UserDTO>('UserOff', (user) => {
      if (user) { this.setUserIsOnline(user, false); }
    });

    this.pushService.registerPushFrom('RequestUserIsOnline', () => {
      this.pushService.sendMessageToServer('ImOnline', this.pushService.user.userName);
    });


    this.pushService.registerPushFrom<ChatMessageDTO>('ReceiveChatMessage', (message) => {
      let chat: ChatUser = this.Users.get(message.from);
      if (!chat) {
        const userDTO = new UserDTO();
        userDTO.userName = message.from;
        userDTO.fullName = message.from;
        chat = new ChatUser(userDTO, true);
        this.Users.set(message.from, chat);
      }
      chat.AddChatMessage(message);
    });

    this.pushService.onConectedToServer(() => {
      this.Users.forEach(chatUser => {
        if (this.pushService.user.userName !== chatUser.userTo.userName) {
          chatUser.onLine = false;
        }
      });
      this.pushService.sendMessageToServer('FindAllOnline', this.pushService.user.userName);
    });
  }

  private setUserIsOnline(user: UserDTO, online: boolean): void {
    const chat = this.Users.get(user.userName);
    if (!chat) {
      this.Users.set(user.userName, new ChatUser(user, online));
    } else {
      chat.onLine = online;
    }
  }

  public sendChatMessage(to: string, message: string) {
    const chat: ChatUser = this.Users.get(to);
    const messageDTO: ChatMessageDTO = new ChatMessageDTO();

    messageDTO.creationDate = new Date();
    messageDTO.from = this.pushService.user.userName;
    messageDTO.to = to;
    messageDTO.message = message;
    this.pushService.sendMessageToServer('SendChatMessage', messageDTO);
    chat.AddChatMessage(messageDTO);
  }
}
