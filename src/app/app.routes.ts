import { Routes } from '@angular/router';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserSignupComponent } from './user/user-signup/user-signup.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminSignupComponent } from './admin/admin-signup/admin-signup.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminSessionsComponent } from './admin/admin-sessions/admin-sessions.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { UserAvailabilityComponent } from './user/user-availability/user-availability.component';
import { UserDayCalendarComponent } from './user/user-day-calendar/user-day-calendar.component';
import { AvailabilityListComponent } from './user/availability-list/availability-list.component';

export const routes: Routes = [
    {path: '',redirectTo: 'user/login',pathMatch: 'full'},
    {path: 'user/login',component: UserLoginComponent},
    {path: 'user/signup',component: UserSignupComponent},
    {path: 'user/dashboard',component: UserDashboardComponent},
    {path: 'user/availability',component: UserAvailabilityComponent},
    {path: 'user/dayCalendar',component: UserDayCalendarComponent},
    {path: 'user/availabilityList',component:AvailabilityListComponent},
    {path: 'admin/login',component: AdminLoginComponent},
    {path: 'admin/signup',component: AdminSignupComponent},
    {path: 'admin/dashboard',component: AdminDashboardComponent},
    {path: 'admin/sessions',component: AdminSessionsComponent},
    {path: 'admin/usersList',component: AdminUsersComponent}
];
