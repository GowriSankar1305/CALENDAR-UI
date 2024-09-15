import { Component } from '@angular/core';
import { AdminApiService } from '../../services/admin-api.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  btnContent: string = 'LOGIN';
  isBtnDisabled: boolean = false;
  
  constructor(private adminApiService : AdminApiService) {
    
  }

  loginTheAdmin() : void {

  }
}
