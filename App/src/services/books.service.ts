import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { StorageService } from './storage.service';
import { EJSON } from 'ejson';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private localUrl = '';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json; chartset=utf-8'});

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    const localUrl = this.storageService.localget('serverUrl') || '';
    this.localUrl = localUrl + '/api/books/';
  }

  getBooks(): Observable<any>{
    // console.log('httpppppp', this.http.get(this.localUrl, { headers: this.headers}));
    return this.http.get(this.localUrl, { headers: this.headers, observe: 'response', responseType: 'text' });
  }

  getBooksId(Id): Observable<any>{
    return this.http.get(this.localUrl + Id, { headers: this.headers, observe: 'response', responseType: 'text' });
  }

  postBooks(data): Observable<any>{
    return this.http.post(this.localUrl, data, { headers: this.headers, observe: 'response', responseType: 'text' });
  }

  putBooks(Id, data): Observable<any>{
    return this.http.put(this.localUrl + Id, data, { headers: this.headers, observe: 'response', responseType: 'text' });
  }

  delBooks(Id): Observable<any>{
    return this.http.delete(this.localUrl + Id, { headers: this.headers, observe: 'response', responseType: 'text' });
  }

}
