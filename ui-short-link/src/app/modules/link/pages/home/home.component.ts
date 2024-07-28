import {Component} from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {CommonModule, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import {LinkService} from "../../../../services/services/link.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MenuComponent,
    NgIf,
    ReactiveFormsModule,
    RouterOutlet,
    FormsModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  shortLink: string = '';
  errorMessage: string | null = null;
  loading: boolean = false;
  private readonly baseUrl: string = 'http://localhost:8088/api/v1/';

  constructor(private linkService: LinkService) {
  }

  redirectToLongLink(): void {
    this.errorMessage = null;
    const trimmedShortLink = this.shortLink.trim();
    if (trimmedShortLink.startsWith(this.baseUrl)) {
      const cleanShortLink = trimmedShortLink.replace(this.baseUrl, '');

      this.linkService.getLongLink({shortLink: cleanShortLink})
        .subscribe({
          next: (response) => {
            if (response.longLink) {
              window.open(response.longLink, '_blank');
            } else {
              this.errorMessage = 'Link not found';
            }
          },
          error: () => {
            this.errorMessage = 'Link not found';
          }
        });
    } else {
      this.errorMessage = `The short link must start with: ${this.baseUrl}`;
    }
  }
}
