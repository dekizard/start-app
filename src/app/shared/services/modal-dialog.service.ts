import {
  ComponentRef,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  Type,
  EmbeddedViewRef,
  Injectable,
} from '@angular/core';

import { Message } from './../models/message';
import { ModalDialogComponent } from '../components/modal-dialog/modal-dialog.component';
import { MessagePopupComponent } from '../components/message-popup/message-popup.component';
import { DialogInjector } from '../components/modal-dialog/dialog-injector';
import { DialogConfig } from '../components/modal-dialog/dialog-config';
import { DialogRef } from '../components/modal-dialog/dialog-ref';
import { MessageType } from '../models/message-type';

@Injectable()
export class ModalDialogService {
  private dialogComponentRef: ComponentRef<ModalDialogComponent> | undefined;
  private uniqueId = 0;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public alert(message: Message) {
    const config = new DialogConfig();
    config.data = message;
    const dialogRef = this.addDialogToBody(MessagePopupComponent, config);
    return dialogRef;
  }

  public showInformation(message: string): DialogRef {
    const msg : Message = {
      text: message,
      type: MessageType.Info
    }
    return this.alert(msg);
  }

  public showWarning(message: string): DialogRef {
    const msg : Message = {
      text: message,
      type: MessageType.Warning
    }
    return this.alert(msg);
  }

  public showError(message: string): DialogRef {
    const msg : Message = {
      text: message,
      type: MessageType.Error
    }
    return this.alert(msg);
  }

  public showCritical(message: string): DialogRef {
    const msg : Message = {
      text: message,
      type: MessageType.Critical
    }
    return this.alert(msg);
  }

  public confirm(messageText: string) {
    const config = new DialogConfig();
    const msg: Message =
    {
      text: messageText,
      type: MessageType.Info,      
    };

    config.data = msg;
    config.alert = false;
    const dialogRef = this.addDialogToBody(MessagePopupComponent, config);
    return dialogRef;
  }

  private addDialogToBody(componentType: Type<any>, config: DialogConfig) {
    const injectors = new WeakMap();
    injectors.set(DialogConfig, config);
    const dialogRef = new DialogRef(this.uniqueId++);
    injectors.set(DialogRef, dialogRef);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      ModalDialogComponent
    );

    const componentRef = componentFactory.create(
      new DialogInjector(this.injector, injectors)
    );
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRef = componentRef;
    this.dialogComponentRef.instance.childComponentType = componentType;
    dialogRef.componentInstance = componentRef;

    dialogRef.afterClosed$.subscribe(() => {
      this.removeDialogFromBody(dialogRef);
    });

    dialogRef.afterConfirm$.subscribe(() => {
      this.removeDialogFromBody(dialogRef);
    });

    return dialogRef;
  }

  private removeDialogFromBody(dialogRef: DialogRef) {
    this.appRef.detachView(dialogRef.componentInstance.hostView);
    dialogRef.componentInstance.destroy();
  }
}
