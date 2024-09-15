import { Component } from '@angular/core';
import { UserHeaderComponent } from '../user-header/user-header.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [UserHeaderComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
