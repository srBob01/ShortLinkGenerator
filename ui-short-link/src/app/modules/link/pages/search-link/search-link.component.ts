import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LinkService} from "../../../../services/services/link.service";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {PageResponseLinkResponse} from "../../../../services/models/page-response-link-response";
import {MatButton} from "@angular/material/button";
import {LinkCardComponent} from "../../components/link-card/link-card.component";
import {CategoryResponse} from "../../../../services/models/category-response";
import {CategoryService} from "../../../../services/services/category.service";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-search-link',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatError,
    FormsModule,
    MatInput,
    NgIf,
    MatButton,
    LinkCardComponent,
    NgForOf,
    MatSelect,
    MatOption
  ],
  templateUrl: './search-link.component.html',
  styleUrl: './search-link.component.scss'
})
export class SearchLinkComponent implements OnInit {
  linkResponse: PageResponseLinkResponse = {totalPages: 0, content: []};
  page = 0;
  size = 5;
  pagesToShow = 5;
  filter = {email: '', linkName: '', titleCategory: '', username: ''};
  errorMsg: string[] = [];
  categories: CategoryResponse[] = [];

  constructor(
    private router: Router,
    private linkService: LinkService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.categoryService.findAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        this.errorMsg = ['Failed to load categories'];
        console.error(err);
      }
    });
  }

  searchLinks() {
    this.linkService.findAllLinkByFilter({
      page: this.page,
      size: this.size,
      filter: this.filter
    }).subscribe({
      next: (links) => {
        this.linkResponse = links;
      },
      error: (err) => {
        this.errorMsg = ['Failed to search links']
        console.error(err);
      }
    });
  }

  resetFilter() {
    this.errorMsg = [];
    this.filter = {email: '', linkName: '', titleCategory: '', username: ''};
  }

  goToPage(page: number) {
    this.page = page;
    this.searchLinks();
  }

  goToFirstPage() {
    this.page = 0;
    this.searchLinks();
  }

  goToPreviousPage() {
    this.page--;
    this.searchLinks();
  }

  goToLastPage() {
    if (this.linkResponse.totalPages !== undefined) {
      this.page = this.linkResponse.totalPages - 1;
      this.searchLinks();
    }
  }

  goToNextPage() {
    this.page++;
    this.searchLinks();
  }

  get isLastPage() {
    return this.linkResponse.totalPages !== undefined && this.page === this.linkResponse.totalPages - 1;
  }

  get displayedPages() {
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
