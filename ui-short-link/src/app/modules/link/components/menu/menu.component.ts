import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TokenService} from "../../../../services/token/token.service";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {LinkResponse} from "../../../../services/models/link-response";
import {LinkService} from "../../../../services/services/link.service";
import {FormsModule} from "@angular/forms";
import {LinkCardComponent} from "../link-card/link-card.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    FormsModule,
    NgClass,
    DatePipe,
    LinkCardComponent,
    NgForOf
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  currentUser: any = null;
  searchResult: LinkResponse | null = null;
  searchQuery: string = '';
  isError: boolean = false;

  constructor(private tokenService: TokenService,
              private linkService: LinkService,
              private router: Router,) {
  }

  ngOnInit() {
    this.currentUser = this.tokenService.currentUser;
  }

  logout() {
    this.tokenService.clearCurrentUser();
    this.tokenService.clearToken();
    window.location.reload();
  }

  searchLinks() {
    if (this.searchQuery) {
      this.linkService.findLinkByName({linkname: this.searchQuery}).subscribe(
        (response: LinkResponse) => {
          this.searchResult = response;
          this.isError = false;
        },
        (error) => {
          console.error('Error fetching link:', error);
          this.searchResult = null;
          this.isError = true;
        }
      );
    } else {
      this.searchResult = null;
      this.isError = true;
    }
  }

  removeCard() {
    this.searchResult = null;
  }

  redirectToAccount() {

  }
}
