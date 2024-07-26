import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TokenService} from "../../../../services/token/token.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  currentUser: any = null;

  constructor(private tokenService: TokenService) {
  }

  ngOnInit() {
    this.currentUser = this.tokenService.currentUser;
  }

  logout() {
    this.tokenService.clearCurrentUser();
    this.tokenService.clearToken();
    window.location.reload();
  }
}
