import {Component} from '@angular/core';
import {UserRegisterRequest} from "../../services/models/user-register-request";
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../services/services/authentication.service";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerRequest: UserRegisterRequest = {email: '', firstName: '', lastName: '', password: '', username: ''};
  errorMessage: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMessage = [];
    this.authService.register({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigate(['activate-account']);
        },
        error: (err) => {
          if (err.error.validationsErrors) {
            this.errorMessage = err.error.validationsErrors;
          } else if (err.error.errors) {
            for (const key in err.error.errors) {
              if (err.error.errors.hasOwnProperty(key)) {
                this.errorMessage.push(`${key}: ${err.error.errors[key]}`);
              }
            }
          } else if (err.error.errorDescription) {
            this.errorMessage.push(err.error.errorDescription);
          } else {
            this.errorMessage.push('An unexpected error occurred');
          }
        }
      });
  }
}
