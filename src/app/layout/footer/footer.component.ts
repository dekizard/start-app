import { Component, OnInit } from '@angular/core';

import { Localization } from 'src/app/core/services/localization';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public localization: Localization) { }

  ngOnInit(): void {
  }

}
