import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../types/ApiResponse';
import { Admin } from '../types/Admin';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private httpClient : HttpClient) { }

  hostUrl : string = 'http://localhost:9898/admin/';

  callSignUpAdminApi(payload : Admin) : Observable<ApiResponse>  {
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'register',payload);
  }
}
