import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUserList() {
    return this.http.get<Users[]>(this.url);
  }
}
