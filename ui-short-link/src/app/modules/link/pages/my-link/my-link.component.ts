import {Component} from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {LinkCardComponent} from "../../components/link-card/link-card.component";
import {BaseLinkComponent} from "../../components/base-link/base-link.component";
import {Router, RouterLink} from "@angular/router";
import {LinkService} from "../../../../services/services/link.service";
import {NgForOf, NgIf} from "@angular/common";
import {TokenService} from "../../../../services/token/token.service";

@Component({
  selector: 'app-my-link',
  standalone: true,
  imports: [
    MenuComponent,
    LinkCardComponent,
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './my-link.component.html',
  styleUrl: './my-link.component.scss'
})
export class MyLinkComponent extends BaseLinkComponent {
  errorMessage: string | null = null;

  constructor(
    protected override router: Router,
    protected override linkService: LinkService,
    protected override tokenService: TokenService
  ) {
    super(router, tokenService, linkService);
  }

  override findAllLinks() {
    this.linkService.findAllLinkByUser({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (links => {
        this.linkResponse = links;
      })
    });
  }
}
