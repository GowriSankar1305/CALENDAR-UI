import { Component } from '@angular/core';
import { User } from '../../types/User';
import { UserApiService } from '../../services/user-api.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Constants } from '../../types/Constants';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {
  btnContent: string = 'SIGN UP';
  isBtnDisabled: boolean = false;
  user : User = new User();

  constructor(private userApiService: UserApiService,private router : Router) {

  }

  signupTheUser() : void  {
    this.btnContent = Constants.LOADING;
    this.isBtnDisabled = true;
    this.userApiService.callUserSignUpApi(this.user).subscribe({
      next: response => {
        console.log(response);
        this.router.navigate(['/user/login']);
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
        else {
          Swal.fire({
            title: errResp.error.message,
            icon: 'error'
          });
        }
        this.btnContent = 'SIGN UP';
        this.isBtnDisabled = false;
      }
    });
  }
}
