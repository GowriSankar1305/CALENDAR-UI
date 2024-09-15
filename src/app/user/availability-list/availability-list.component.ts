import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserHeaderComponent } from '../user-header/user-header.component';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-availability-list',
  standalone: true,
  imports: [CommonModule,FormsModule,UserHeaderComponent],
  templateUrl: './availability-list.component.html',
  styleUrl: './availability-list.component.css'
})
export class AvailabilityListComponent implements OnInit{
  
  dataList : any[] = [];
  constructor(private userApiService: UserApiService) {}
  ngOnInit(): void {
    this.fetchAvailabilityList();
  }
  
  fetchAvailabilityList() {
    this.userApiService.callAvailabilityListApi().subscribe({
      next: response => {
        console.log('-- OK --',response);
      },
      error: err => {
        console.log('-- problem --',err);
      }
    });
  }

}
