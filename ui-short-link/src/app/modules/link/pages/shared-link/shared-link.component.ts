import {Component, OnInit} from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {Router, RouterOutlet} from "@angular/router";
import {LinkService} from "../../../../services/services/link.service";
import {PageResponseLinkResponse} from "../../../../services/models/page-response-link-response";
import {NgForOf} from "@angular/common";
import {LinkCardComponent} from "../../components/link-card/link-card.component";

@Component({
  selector: 'app-shared-link',
  standalone: true,
  imports: [
    MenuComponent,
    RouterOutlet,
    NgForOf,
    LinkCardComponent
  ],
  templateUrl: './shared-link.component.html',
  styleUrl: './shared-link.component.scss'
})
export class SharedLinkComponent implements OnInit {
  linkResponse: PageResponseLinkResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  message = '';

  constructor(
    private linkService: LinkService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllLinks();
  }

  private findAllLinks() {
    this.linkService.findAllLink({
        page: this.page,
        size: this.size
      }
    ).subscribe({
      next: (links => {
        this.linkResponse = links;
        console.log(links);
        this.pages = Array(this.linkResponse.totalPages)
          .fill(0)
          .map((x, i) => i);
      })
    })
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
    this.page = this.linkResponse.totalPages as number - 1;
    this.findAllLinks();
  }

  goToNextPage() {
    this.page++;
    this.findAllLinks();
  }

  get isLastPage() {
    return this.page === this.linkResponse.totalPages as number - 1;
  }
}
