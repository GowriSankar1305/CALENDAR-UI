import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../types/ApiResponse';
import { User } from '../types/User';
import { CalendarMonth } from '../types/CalendarMonth';
import { CalendarRequest } from '../types/CalendarRequest';
import { DayCalendarRequest } from '../types/DayCalendarRequest';
import { CalendarDay } from '../types/CalendarDay';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private httpClient: HttpClient) { }

  hostUrl : string = 'http://localhost:9898/user/';

  callUserLoginApi(payload: User) : Observable<ApiResponse>  {
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'login',payload);
  }

  callUserSignUpApi(payload: User) : Observable<ApiResponse>  {
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'signup',payload);
  }
  
  callUserDashboardApi() : Observable<any> {
    return this.httpClient.post<any>(this.hostUrl + 'dashboard',null);
  }

  callUserMonthlyCalendarApi(payload : CalendarRequest) : Observable<CalendarMonth> {
    return this.httpClient.post<CalendarMonth>(this.hostUrl + 'monthlyCalendar',payload);
  }

  callUserDayCalendarApi(payload: DayCalendarRequest) : Observable<CalendarDay> {
    return this.httpClient.post<CalendarDay>(this.hostUrl + 'dayCalendar',payload);
  }

  callSaveUserAvaialbilityApi(payload: any) : Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'addAvailability',payload);
  }

  callAvailabilityListApi() : Observable<any> {
    return this.httpClient.post<any>(this.hostUrl + 'availabilityList',null);
  }
  
}
