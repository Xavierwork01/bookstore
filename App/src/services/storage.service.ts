import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  localStorage: Storage;
  sessionStorage: Storage;

  // localstorage
  localset(key: string, value: string): void{
    localStorage.setItem(key, value);
  }

  localget(key: string): any{
    return localStorage.getItem(key);
  }

  localremove(key: string): any{
    localStorage.removeItem(key);
  }

  // sessionstorage
  sessionset(key: string, value: string): void{
    sessionStorage.setItem(key, value);
  }

  sessionget(key: string): any{
    try {
      return sessionStorage.getItem(key);
    } catch (error) {
      return {};
    }
  }

  sessionremove(key: string): any{
    sessionStorage.removeItem(key);
  }
}
