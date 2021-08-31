import { Message } from './message';

export interface Response<T> {
  success: boolean;
  message: Message;
  messages: Message[];

  data: T;
}
