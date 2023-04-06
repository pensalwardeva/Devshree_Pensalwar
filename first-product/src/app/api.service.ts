import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { datamodel } from './register/model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private sharedData: Subject<any> = new Subject<any>();
  sharedData$: Observable<any> = this.sharedData.asObservable();

  setData(data :any) {
    this.sharedData.next(data);
  }

RegisterUser(data:datamodel){
return this.http.post<datamodel>("http://localhost:3000/posts", data)
}

getUser(){
  return this.http.get<datamodel[]>("http://localhost:3000/posts")
  }
}


