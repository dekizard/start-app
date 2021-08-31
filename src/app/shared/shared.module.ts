import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinElements } from './pipes/join-elements.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { MessagePopupComponent } from './components/message-popup/message-popup.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';

@NgModule({
  declarations: [
    LoaderComponent,
    MessagePopupComponent,
    ModalDialogComponent,
    JoinElements
  ],
  imports: [CommonModule],
  exports: [
    LoaderComponent,
    MessagePopupComponent,
    JoinElements
  ],
})
export class SharedModule {}
