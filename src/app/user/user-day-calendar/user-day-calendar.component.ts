import { Component } from '@angular/core';
import { UserHeaderComponent } from '../user-header/user-header.component';
import { Router } from '@angular/router';
import { DayCalendarRequest } from '../../types/DayCalendarRequest';
import { UserApiService } from '../../services/user-api.service';
import { CalendarDay } from '../../types/CalendarDay';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Constants } from '../../types/Constants';

@Component({
  selector: 'app-user-day-calendar',
  standalone: true,
  imports: [UserHeaderComponent, CommonModule, FormsModule],
  templateUrl: './user-day-calendar.component.html',
  styleUrl: './user-day-calendar.component.css'
})
export class UserDayCalendarComponent {
  cardHeading: string = 'Date';
  calendarDay: CalendarDay = new CalendarDay();
  dayCalendarRequest: DayCalendarRequest = new DayCalendarRequest();
  showElement = true;
  startTime: string = '';
  endTime: string = '';
  startTimeArray: string[] = [];
  endTimeArray: string[] = [];
  interval: string = '';
  btnContent: string = '<i class="bi bi-clock-fill"></i>&nbsp;&nbsp;Save time';
  isBtnDisabled: boolean = false;
  months: any[] = [
    { key: 1, value: 'January' }, { key: 2, value: 'Febraury' },
    { key: 3, value: 'March' }, { key: 4, value: 'April' },
    { key: 5, value: 'May' }, { key: 6, value: 'June' },
    { key: 7, value: 'July' }, { key: 8, value: 'August' },
    { key: 9, value: 'September' }, { key: 10, value: 'October' },
    { key: 11, value: 'November' }, { key: 12, value: 'December' },
  ];

  constructor(private router: Router, private userApiService: UserApiService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.dayCalendarRequest = navigation.extras.state['reqData'];
      console.log('reqdat===============> ', this.dayCalendarRequest);
    }
    this.fetchDayCalendarData();
  }

  fetchDayCalendarData(): void {
    this.userApiService.callUserDayCalendarApi(this.dayCalendarRequest).subscribe({
      next: response => {
        console.log('**** SUCCESS ****', response);
        this.calendarDay = response;
        this.cardHeading = `${response.date}-${this.months[response.month - 1].value}-${response.year}`
      },
      error: errResp => {
        console.log('**** FAILURE ****', errResp);
      }
    });
  }

  showDialog(): void {
    this.showElement = false;
  }

  fetchStartTime(): void {
    console.log('interval-----> ', this.interval);
    this.startTimeArray = [];
    this.endTimeArray = [];
    if (this.interval !== '') {
      if (this.interval === 'HOUR') { this.startTimeArray = this.populateHourIntervals(0); }
      else { this.startTimeArray = this.populate30MinIntervals(0, 0); }
    }
  }

  populateHourIntervals(hour: number): string[] {
    console.log('hour-------> ', hour);
    let data: string[] = [];
    for (let i = hour; i < 23; i++) {
      if (i <= 9) { data.push(`0${i}:00`); }
      else { data.push(`${i}:00`); }
    }
    console.log('final dat-------------> ', data);
    return data;
  }

  populate30MinIntervals(hour: number, minute: number): string[] {
    let intervals: string[] = [];
    for (let i = 0; i < 48; i++) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute === 0 ? '00' : '30';
      intervals.push(`${formattedHour}:${formattedMinute}`);
      if (minute === 0) { minute = 30; }
      else { minute = 0; hour++; if(hour === 24) { break; } }
    }
    return intervals;
  }

  fetchEndTime() {
    this.endTimeArray = [];
    if (this.startTime !== '' && this.interval !== '') {
      console.log('start time-----> ', this.startTime);
      if (this.interval === 'HOUR') {
        this.endTimeArray = this.populateHourIntervals
          (Number.parseInt(this.startTime.split(":")[0]) + 1)
      }
      else {
        if (Number.parseInt(this.startTime.split(":")[1]) > 0) {
          this.endTimeArray = this.populate30MinIntervals(Number.parseInt(this.startTime.split(":")[1]) + 1, 0);
        }
        else {
          this.endTimeArray = this.populate30MinIntervals(Number.parseInt(this.startTime.split(":")[0]), 30);
        }
      }
    }
  }

  saveAvailability() {
    this.btnContent = Constants.LOADING;
    this.isBtnDisabled = true;
    let object = {
      'startTime': `${this.calendarDay.year}-${this.calendarDay.month}-${this.calendarDay.date} ${this.startTime}:00`,
      'endTime': `${this.calendarDay.year}-${this.calendarDay.month}-${this.calendarDay.date} ${this.endTime}:59`,
      'interval': this.interval
    };
    this.userApiService.callSaveUserAvaialbilityApi(object).subscribe({
      next: response => {
        console.log('SUCCESS-------> ',response);
        this.btnContent = '<i class="bi bi-clock-fill"></i>&nbsp;&nbsp;Save time';
        this.isBtnDisabled = false;
      },
      error: errResp => {
        console.log('FAILURE----> ',errResp);
        this.btnContent = '<i class="bi bi-clock-fill"></i>&nbsp;&nbsp;Save time';
        this.isBtnDisabled = false;
      }
    });
  }

}
