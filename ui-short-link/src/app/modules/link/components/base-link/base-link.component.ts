import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PageResponseLinkResponse} from '../../../../services/models/page-response-link-response';
import {MenuComponent} from "../menu/menu.component";
import {TokenService} from "../../../../services/token/token.service";
import {LinkResponse} from "../../../../services/models/link-response";
import {LinkService} from "../../../../services/services/link.service";

@Component({
  selector: 'app-base-link',
  templateUrl: './base-link.component.html',
  styleUrls: ['./base-link.component.scss'],
  standalone: true,
  imports: [
    MenuComponent
  ]
})
export class BaseLinkComponent implements OnInit {
  currentUser: any = null;
  linkResponse: PageResponseLinkResponse = {totalPages: 0, content: []};
  page = 0;
  size = 5;
  pagesToShow = 5;
  errorMsg: string[] = [];

  constructor(protected router: Router,
              protected tokenService: TokenService,
              protected linkService: LinkService) {
  }

  ngOnInit(): void {
    this.currentUser = this.tokenService.currentUser;
    this.findAllLinks();
  }

  removeLink($event: LinkResponse) {
    if ($event.id !== undefined) {
      this.linkService.deleteLink({id: $event.id}).subscribe({
        next: () => {
          this.findAllLinks();
          this.errorMsg = [];
        },
        error: (err) => {
          console.error('Failed to delete link', err);
          this.errorMsg.push('Failed to delete link')
        }
      });
    } else {
      console.error('Link id is undefined');
      this.errorMsg.push('Failed to delete link')
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

  findAllLinks() {
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllLinks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllLinks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllLinks();
  }

  goToLastPage() {
    if (this.linkResponse.totalPages !== undefined) {
      this.page = this.linkResponse.totalPages - 1;
      this.findAllLinks();
    }
  }

  goToNextPage() {
    this.page++;
    this.findAllLinks();
  }

  get isLastPage() {
    return this.linkResponse.totalPages !== undefined && this.page === this.linkResponse.totalPages - 1;
  }

  get displayedPages() {
    console.log(this.linkResponse.content);
    const totalPages = this.linkResponse.totalPages ?? 0;
    const currentPage = this.page;
    const pagesToShow = this.pagesToShow;
    const halfPagesToShow = Math.floor(pagesToShow / 2);

    if (totalPages <= pagesToShow) {
      return [...Array(totalPages).keys()];
    }

    if (currentPage <= halfPagesToShow) {
      return [...Array(pagesToShow).keys()];
    } else if (currentPage >= totalPages - halfPagesToShow) {
      return [...Array(pagesToShow).keys()].map(i => totalPages - pagesToShow + i);
    } else {
      return [...Array(pagesToShow).keys()].map(i => currentPage - halfPagesToShow + i);
    }
  }
}
