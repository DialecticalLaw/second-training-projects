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
  MessageHistory = 'messagehistory'
}

interface ClientUserData {
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

interface MessageNotification {
  id: string;
  status: Partial<MessageStatus>;
}

interface MessageData {
  message: ClientMsgSend | ServerMsgSend | MessageNotification;
}

interface Messages {
  messages: ServerMsgSend[];
}

export interface APIRequest {
  id: string | null;
  type: string;
  payload: MessageData | UserData | Users | Messages | null | { error: string };
}

export interface EventDetail {
  [key: string]: ServerUserData[] | ServerMsgSend[] | string | boolean | null;
}
