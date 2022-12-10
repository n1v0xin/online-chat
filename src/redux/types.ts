export type UsersState = {
  loading: boolean;
  list: [] | User[];
  error: null | UsersStateError;
};

export type User = {
  readonly id: string;
  readonly nickname: string;
  isTyping: boolean;
};

// todo: fix me
export type UsersStateError = any;

export type MessagesState = {
  loading: boolean;
  list: [] | Message[];
  error: null | MessagesStateError;
};

export type Message = {
  readonly author: string;
  readonly text: string;
};

// todo: fix me
export type MessagesStateError = any;
