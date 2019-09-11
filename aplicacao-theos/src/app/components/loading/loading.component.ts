import { Component } from '@angular/core';
import { BaseComponent } from '../../components/base-component/base-component.component'

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})

export class LoadingComponent extends BaseComponent {
  constructor() {
      super();
  }
}
