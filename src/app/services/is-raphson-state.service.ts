import { Injectable } from '@angular/core';
import * as math from 'mathjs';


@Injectable({
  providedIn: 'root'
})

export class IsRaphsonStateService {
  private isRaphson: boolean = false;

  constructor() { }

  setIsRaphson(value: boolean) {
    this.isRaphson = value;
  }

  getIsRaphson(): boolean {
    return this.isRaphson;
  }

}