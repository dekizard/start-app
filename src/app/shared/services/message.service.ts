import { Subject } from 'rxjs';

export class MesssageService {
  message = new Subject<any>();

  setMessage(value: any) {
    this.message.next(value);
  }
}
