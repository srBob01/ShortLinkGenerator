import {Component} from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {LinkCardComponent} from "../../components/link-card/link-card.component";
import {BaseLinkComponent} from "../../components/base-link/base-link.component";
import {Router, RouterLink} from "@angular/router";
import {LinkService} from "../../../../services/services/link.service";
import {LinkResponse} from "../../../../services/models/link-response";
import {NgForOf, NgIf} from "@angular/common";

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
    private linkService: LinkService
  ) {
    super(router);
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

  removeLink($event: LinkResponse) {
    if ($event.id !== undefined) {
      this.linkService.deleteLink({id: $event.id}).subscribe({
        next: () => {
          this.findAllLinks();
          this.errorMessage = null;
        },
        error: (err) => {
          console.error('Failed to delete link', err);
          this.errorMessage = 'Failed to delete link';
        }
      });
    } else {
      console.error('Link id is undefined');
      this.errorMessage = 'Failed to delete link';
    }
  }


  editLink($event: LinkResponse) {
    this.router.navigate(['/links/manage'], {
      queryParams: {
        id: $event.id,
        titleCategory: $event.titleCategory,
        linkName: $event.linkName,
        longLink: $event.longLink,
        removeDate: $event.removeDate
      }
    });
  }

}
