import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { Localization } from 'src/app/core/services/localization';
import { ModalDialogService } from './../shared/services/modal-dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public localization: Localization, private dialogService: ModalDialogService, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  showInformation(): void {
     this.dialogService.showInformation(this.localization.translation.POPUP?.INFORMATION_TEXT);
  }

  showWarning(): void {
    this.dialogService.showWarning(this.localization.translation.POPUP?.WARNING_TEXT);
  }

  showError(): void {
    this.dialogService.showError(this.localization.translation.POPUP?.ERROR_TEXT);
  }

  showCritical(): void {
    this.dialogService.showCritical(this.localization.translation.POPUP?.CRITICAL_TEXT);
  }

  showAlert(): void {
    this.dialogService.confirm(this.localization.translation.POPUP?.CONFIRM_TEXT);
  }

  showLoader(): void {
      this.httpClient.get<any>('/api/products')
        .subscribe(() => {
          console.log('Console log http call');
      });
  }
}
