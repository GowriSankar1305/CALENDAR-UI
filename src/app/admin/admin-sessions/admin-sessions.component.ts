import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-sessions',
  standalone: true,
  imports: [AdminSidebarComponent,RouterModule,FormsModule],
  templateUrl: './admin-sessions.component.html',
  styleUrl: './admin-sessions.component.css'
})
export class AdminSessionsComponent {

}
