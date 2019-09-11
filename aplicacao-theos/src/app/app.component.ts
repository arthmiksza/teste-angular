import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import * as modelToast from './models/Toast';
import { ToastService } from './services/toast.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showToast = false;
  objToast: modelToast.Toast;

  constructor(private location: Location, public toast: ToastService) {
  }

  title = 'app';
  ngOnInit() {
    this.objToast = new modelToast.Toast();
    this.toast.toastSubject.subscribe(obj => {
      this.objToast = obj;
      this.showToast = true;
      const subs = timer(1800).subscribe(() => {
        this.showToast = false;
        subs.unsubscribe();
      });
    });
  }
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
  goBack() {
    this.location.back();
  }

}
