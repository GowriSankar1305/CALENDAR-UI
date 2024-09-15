import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdminApiService } from '../../services/admin-api.service';
import { Admin } from '../../types/Admin';
import { Constants } from '../../types/Constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-signup',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './admin-signup.component.html',
  styleUrl: './admin-signup.component.css'
})
export class AdminSignupComponent {

  constructor(private adminApiService : AdminApiService,private router : Router) {}
  btnContent: string = 'SIGN UP';
  isBtnDisabled: boolean = false;
  admin : Admin = new Admin();

  signupTheAdmin() : void {
    console.log(this.admin);
    this.btnContent = Constants.LOADING;
    this.isBtnDisabled = true;
    this.adminApiService.callSignUpAdminApi(this.admin).subscribe({
      next: response => {
        console.log(response);
        this.router.navigate(['/admin/login']);
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
        else  {
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
