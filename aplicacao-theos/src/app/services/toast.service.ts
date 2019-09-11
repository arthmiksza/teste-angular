import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as modelToast  from '../models/Toast';

@Injectable()
export class ToastService {
  public toastSubject: Subject<modelToast.Toast> = new Subject<modelToast.Toast>();

  constructor() { }

}