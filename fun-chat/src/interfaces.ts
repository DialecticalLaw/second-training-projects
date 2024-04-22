export interface LooseStringObject {
  [key: string]: string;
}

export enum Page {
  Login,
  Main,
  Info
}

export enum Events {
  CloseConnect = 'closeconnect',
  ErrorConnect = 'errorconnect',
  Connect = 'connect',
  IncorrectPassword = 'incorrectpassword',
  AlreadyAuth = 'alreadyauth',
  Logined = 'logined',
  Logout = 'logout',
  UserList = 'userlist',
  ThirdParty = 'thirdparty',
  HandleUserSelect = 'handleuserselect',
  MessageHistory = 'messagehistory',
  ReceivedMessage = 'receivedmessage',
  Notification = 'notification',
  ReadMessages = 'readmessages'
}

export interface ClientUserData {
  login: string;
  password?: string;
}

export interface ServerUserData {
  login: string;
  isLogined: boolean;
}

interface Users {
  users: ServerUserData[];
}

export interface UserData {
  user: ClientUserData | ServerUserData;
}

export interface MessageStatus {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
  isDeleted: boolean;
}

export interface ServerMsgSend {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: Omit<MessageStatus, 'isDeleted'>;
}

type ClientMsgSend = Pick<ServerMsgSend, 'to' | 'text'>;

export interface MessageNotification {
  id: string;
  status: Partial<MessageStatus>;
}

interface MessageData {
  message: ClientMsgSend | ServerMsgSend | MessageNotification | { id: string };
}

interface Messages {
  messages: ServerMsgSend[];
}

export interface APIRequest {
  id: string | null;
  type: string;
  payload: MessageData | UserData | Users | Messages | null | { error: string };
}

export enum NotificationType {
  Delete = 'MSG_DELETE',
  Edit = 'MSG_EDIT',
  Read = 'MSG_READ'
}
