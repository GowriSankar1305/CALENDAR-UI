import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  public addItem(key: string,value: string) : boolean {
    localStorage.setItem(key,value);
    return true;
  }

  public getItem(key: string) : string {
    if(localStorage.getItem(key) !== null)  {
      return localStorage.getItem(key) as string;
    }
    return '';
  }

  public clearSession() : void {
    localStorage.clear();
  }
  
}
