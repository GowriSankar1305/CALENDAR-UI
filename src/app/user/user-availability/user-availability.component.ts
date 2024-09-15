import { Component, OnInit } from '@angular/core';
import { UserHeaderComponent } from '../user-header/user-header.component';
import { UserApiService } from '../../services/user-api.service';
import { CalendarRequest } from '../../types/CalendarRequest';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Day } from '../../types/Day';
import { Router } from '@angular/router';
import { DayCalendarRequest } from '../../types/DayCalendarRequest';

@Component({
  selector: 'app-user-availability',
  standalone: true,
  imports: [UserHeaderComponent,FormsModule,CommonModule],
  templateUrl: './user-availability.component.html',
  styleUrl: './user-availability.component.css'
})
export class UserAvailabilityComponent implements OnInit {

  cardHeading : string = '[Month] [year] Calendar';
  btnContent : string = '<i class="bi bi-calendar"></i>&nbsp;&nbsp;Fetch calendar';
  isBtnDisabled : boolean = false;
  calendarRequest : CalendarRequest = new CalendarRequest();
  years: number[] = [2024,2025,2026];
  months: any[] = [
    {key: 1, value: 'January'},{key: 2, value: 'Febraury'},
    {key: 3, value: 'March'},{key: 4, value: 'April'},
    {key: 5, value: 'May'},{key: 6, value: 'June'},
    {key: 7, value: 'July'},{key: 8, value: 'August'},
    {key: 9, value: 'September'},{key: 10, value: 'October'},
    {key: 11, value: 'November'},{key: 12, value: 'December'},
  ];
  weeks: Day[][] = [[]];

  constructor(private userApiService : UserApiService,private router: Router) {
  }
  
  ngOnInit(): void {
    this.calendarRequest.month = new Date().getMonth();
    this.calendarRequest.year = new Date().getFullYear();
    this.currentMonthCalendar();
  }

  currentMonthCalendar() : void {
    console.log('cal req-------> ',this.calendarRequest);
    this.userApiService.callUserMonthlyCalendarApi(this.calendarRequest).subscribe({
      next: response => {
        this.weeks = [[]];
        this.cardHeading = this.months[response.month - 1].value + '&nbsp;&nbsp;' + response.year + '&nbsp;&nbsp;Calendar';
        let finalContent = '';
        for(let i = 0 ; i < response.days.length ; i += 7) {
          const weekArray = response.days.slice(i,i+7);
          this.weeks.push(weekArray);
        }
      },
      error: errResp => {
        if(errResp.error && errResp.error.errors && errResp.error.errors.length > 0) {
          let display = '';
          for(let err of errResp.error.errors)  {
            display += err.msg + '\n';
          }
          Swal.fire({
            title: 'Errors found',
            html: '<pre>' + display + '</pre>',
            icon: 'error' 
          });
        }
        else  {
          console.log(errResp);
        }
        this.btnContent = '<i class="bi bi-calendar"></i>&nbsp;&nbsp;Fetch calendar';
        this.isBtnDisabled = false;
      }
    });
  }

  fetchDayCalendar(dayClicked: number) : void {
    console.log('calemdar day---------------------> ',dayClicked);
    console.log('calendar req------->',this.calendarRequest);
    
    // swal fire to ask time interval
    let daycalendarReq = new DayCalendarRequest();
    daycalendarReq.date = dayClicked;
    daycalendarReq.year = this.calendarRequest.year;
    daycalendarReq.month = this.calendarRequest.month;
    daycalendarReq.interval = '';

    this.router.navigate(['/user/dayCalendar'],{state: {'reqData': daycalendarReq}});
  }

  refreshCalendar() : void  {
    this.weeks = [[]];
    this.cardHeading = '[Month] [year] Calendar';
  }

}
