import {Component, OnInit} from '@angular/core';
import {UserRequest} from "../../../../services/models/user-request";
import {UserResponse} from "../../../../services/models/user-response";
import {UserService} from "../../../../services/services/user.service";
import {TokenService} from "../../../../services/token/token.service";
import {FormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatAnchor, MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    NgIf,
    MatButton,
    NgForOf,
    MatAnchor,
    RouterLink
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  userRequest: UserRequest = {email: '', firstName: '', lastName: '', username: ''};
  errorMsg: string[] = [];
  originalUser: UserResponse | null = null;

  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) {
  }

  ngOnInit() {
    const currentUser = this.tokenService.currentUser;
    if (currentUser && currentUser.username) {
      this.userService.findByUsername({username: currentUser.username}).subscribe({
        next: (user) => {
          this.userRequest = {
            email: user.email || '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            username: user.username || ''
          };
          this.originalUser = {...user};
        },
        error: (err) => {
          this.errorMsg.push('Failed to load user data');
          console.error(err);
        }
      });
    }
  }

  updateAccount(accountForm: any) {
    if (accountForm.valid && this.originalUser && this.originalUser.id) {
      this.userService.updateUser({id: this.originalUser.id, body: this.userRequest}).subscribe({
        next: (user) => {
          this.userRequest = {
            email: user.email || '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            username: user.username || ''
          };
          this.originalUser = {...user};
          this.errorMsg = [];
        },
        error: (err) => {
          this.errorMsg.push('Failed to update user data');
          console.error(err);
        }
      });
    } else {
      this.errorMsg.push('Please fill out all required fields.');
    }
  }

  resetAccount() {
    if (this.originalUser) {
      this.userRequest = {
        email: this.originalUser.email || '',
        firstName: this.originalUser.firstName || '',
        lastName: this.originalUser.lastName || '',
        username: this.originalUser.username || ''
      };
    }
  }
}
