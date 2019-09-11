import { OnInit, OnDestroy, Injectable } from '@angular/core';

@Injectable()
export abstract class BaseComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
