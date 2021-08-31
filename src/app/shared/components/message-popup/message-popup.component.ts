import { Localization } from 'src/app/core/services/localization';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Message } from '../../models/message';
import { MessageType } from '../../models/message-type';
import { DialogConfig } from '../modal-dialog/dialog-config';
import { DialogRef } from '../modal-dialog/dialog-ref';

@Component({
  selector: 'app-message-popup',
  templateUrl: './message-popup.component.html',
  styleUrls: ['./message-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagePopupComponent implements OnInit {
  showInfoMessage = false;
  showWarningMessage = false;
  showErrorMessage = false;
  showCriticalMessage = false;
  message: Message;

  constructor(public localization: Localization,
    private dialogConfig: DialogConfig,
    private dialogRef: DialogRef
  ) {
    this.message = this.dialogConfig.data as Message;
  }

  ngOnInit() {
    this.setMessageType();
  }

  setMessageType() {
    switch (this.message.type) {
      case MessageType.Info: {
        this.showInfoMessage = true;
        break;
      }
      case MessageType.Warning: {
        this.showWarningMessage = true;
        break;
      }
      case MessageType.Error: {
        this.showErrorMessage = true;
        break;
      }
      case MessageType.Critical: {
        this.showCriticalMessage = true;
        break;
      }
    }
  }

  isAlert(): boolean {
    return this.dialogConfig.alert;
  }

  confirm() {
    this.dialogRef.confirm();
  }

  close() {
    this.dialogRef.close();
  }
}
