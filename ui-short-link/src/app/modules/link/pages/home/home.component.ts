import {Component} from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {NgIf} from "@angular/common";
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
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  shortLink: string = '';
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(private linkService: LinkService) {
  }

  redirectToLongLink(): void {
    this.errorMessage = null;

    this.linkService.getLongLink({shortLink: this.shortLink})
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
  }
}
