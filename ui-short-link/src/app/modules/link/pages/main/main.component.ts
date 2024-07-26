import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MenuComponent} from "../../components/menu/menu.component";
import {LinkService} from "../../../../services/services/link.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpContextToken} from "@angular/common/http";

export const AUTH_TOKEN = new HttpContextToken<string>(() => '');

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  shortLink: string = '';
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(private linkService: LinkService) {
  }

  redirectToLongLink(): void {
    this.loading = true;
    this.errorMessage = null;

    this.linkService.getLongLink({shortLink: this.shortLink})
      .subscribe({
        next: (response) => {
          this.loading = false;
          if (response.longLink) {
            window.location.href = response.longLink;
          } else {
            this.errorMessage = 'Link not found';
          }
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Link not found';
        }
      });
  }
}
