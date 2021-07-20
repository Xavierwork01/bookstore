import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private localUrl = '';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json; chartset=utf-8'});

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { 
    const localUrl = this.storageService.localget('serverUrl') || '';
    this.localUrl = localUrl + '/api/user/';
  }

  // 登入驗證
  login(account, password): Observable<any>{
    return this.http.get(this.localUrl + 'account/' + account + '?' + 'password=' + password, { headers: this.headers, observe: 'response', responseType: 'text' });
  }

  // 註冊會員
  createUser(data): Observable<any>{
    return this.http.post(this.localUrl, data, { headers: this.headers, observe: 'response', responseType: 'text' });
  }
}
