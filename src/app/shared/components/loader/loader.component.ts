import {
  Component,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { LoaderService } from '../../services/loader.service';
import { LoaderState } from './loader-state';
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('ShowHide', [
      transition('void => *', [
        animate(
          '500ms',
          keyframes([
            style({ transform: 'translate3d(0, 100%, 0)', offset: 0 }),
            style({ transform: 'translate3d(0, 0, 0)', offset: 1 }),
          ])
        ),
      ]),
      transition('* => void', [
        animate(
          '500ms ease-in',
          keyframes([
            style({
              transform: 'translate3d(0, 0, 0)',
              offset: 0,
            }),
            style({
              transform: 'translate3d(0, 100%, 0)',
              offset: 1,
              opacity: 0,
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class LoaderComponent implements OnDestroy {
  private loaderStateSub: Subscription;

  show = false;

  constructor(
    private loaderService: LoaderService,
    private cd: ChangeDetectorRef
  ) {
    this.loaderStateSub = this.loaderService.loaderState$.subscribe(
      (state: LoaderState) => {
        this.show = state.show;
        this.cd.markForCheck();
      }
    );
  }

  ngOnDestroy() {
    this.loaderStateSub.unsubscribe();
  }
}
