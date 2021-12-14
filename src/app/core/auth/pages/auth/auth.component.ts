import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorResponse } from '@core/interfaces/ErrorResponse';
import { AuthService } from '@core/services/auth.service';
import { first } from 'rxjs/operators';
// import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  returnUrl: string;
  view:boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private authServices: AuthService,
    // private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

   ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  async submit() {
    if (this.authForm.invalid) {
    return
  }
    const {username,password} = this.authForm.value
    try {
      const response = await this.authServices.login(username, password)
      if (response) {
        // this.notificationService.showSuccess('Login Correcto')
        console.log(this.returnUrl)
        this.router.navigate([this.returnUrl]);
      }
    } catch (error) {
      let errores = error.error;
      this.handleError(errores)
    }
}
  
  
  handleError(errores:ErrorResponse[]) {
    if (errores.length > 0) {
      errores.forEach(error => {
        let formField = this.authForm.get(error.field);
        if (formField) {
          formField.setErrors({'incorrect':true})
        }
        console.log(error.field);
        console.log(this.authForm.get(error.field).value);
      });
    }
  }

  viewPassword() {
    console.log('viewpassword')
  }

}
