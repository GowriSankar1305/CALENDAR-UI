import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../services/user-api.service';
import { User } from '../../types/User';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage.service';
import { Constants } from '../../types/Constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit {
  btnContent: string = 'LOGIN';
  isBtnDisabled: boolean = false;
  user : User = new User();

  constructor(
      private userApiService : UserApiService,
      private storageService : SessionStorageService,
      private router: Router) {

  }

  ngOnInit(): void {
    console.log('Initited componnent=---------------------------');
  }

  loginTheUser() : void {
    console.log(this.user);
    this.btnContent = Constants.LOADING;
    this.isBtnDisabled = true;
    this.userApiService.callUserLoginApi(this.user).subscribe({
      next: response => {
        console.log(response);
        this.storageService.addItem(Constants.TOKEN,response.token);
        this.router.navigate(['/user/dashboard']);
      },
      error: errResp => {
        console.log(errResp);
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
        else {
          Swal.fire({
            title: errResp.error.message,
            icon: 'error'
          });
        }
        this.btnContent = 'LOGIN';
        this.isBtnDisabled = false;
      }
    });
  }
}
