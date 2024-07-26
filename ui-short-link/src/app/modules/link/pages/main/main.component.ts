import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MenuComponent} from "../../components/menu/menu.component";
import {LinkService} from "../../../../services/services/link.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

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
