import { Subject } from 'rxjs';

export class DialogRef {
  private afterClosed = new Subject<any>();
  private afterConfirm = new Subject<any>();

  afterConfirm$ = this.afterConfirm.asObservable();
  afterClosed$ = this.afterClosed.asObservable();
  id: string;
  componentInstance: any;

  constructor(private uniqueId: number) {
    this.id = 'dialog-' + this.uniqueId++;
  }

  confirm(data: any = null) {
    this.afterConfirm.next(data);
  }

  close(data: any = null) {
    this.afterClosed.next(data);
  }
}
