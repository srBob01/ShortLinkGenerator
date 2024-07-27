import {Component} from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {Router, RouterOutlet} from "@angular/router";
import {LinkService} from "../../../../services/services/link.service";
import {NgForOf, NgIf} from "@angular/common";
import {LinkCardComponent} from "../../components/link-card/link-card.component";
import {BaseLinkComponent} from "../../components/base-link/base-link.component";

@Component({
  selector: 'app-shared-link',
  standalone: true,
  imports: [
    MenuComponent,
    RouterOutlet,
    NgForOf,
    LinkCardComponent,
    NgIf,
    BaseLinkComponent
  ],
  templateUrl: './shared-link.component.html',
  styleUrls: ['./shared-link.component.scss']
})
export class SharedLinkComponent extends BaseLinkComponent {
  constructor(
    protected override router: Router,
    private linkService: LinkService
  ) {
    super(router);
    this.size = 5;

  }

  override findAllLinks() {
    this.linkService.findAllLink({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (links => {
        this.linkResponse = links;
      })
    });
  }
}
