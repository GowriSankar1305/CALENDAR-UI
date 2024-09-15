import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDayCalendarComponent } from './user-day-calendar.component';

describe('UserDayCalendarComponent', () => {
  let component: UserDayCalendarComponent;
  let fixture: ComponentFixture<UserDayCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDayCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDayCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
