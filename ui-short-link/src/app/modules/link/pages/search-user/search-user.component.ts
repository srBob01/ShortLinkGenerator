import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/services/user.service";
import {UserFilter} from "../../../../services/models/user-filter";
import {PageResponseUserResponse} from "../../../../services/models/page-response-user-response";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-search-user',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton
  ],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.scss'
})
export class SearchUserComponent implements OnInit {
  userResponse: PageResponseUserResponse = {totalPages: 0, content: []};
  page = 0;
  size = 5;
  filter: UserFilter = {};
  errorMsg: string[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.searchUsers();
  }

  searchUsers() {
    this.userService.findAllUsersByFilter({page: this.page, size: this.size, filter: this.filter}).subscribe({
      next: (response) => {
        this.userResponse = response;
      },
      error: (err) => {
        this.errorMsg = ['Failed to search users'];
        console.error(err);
      }
    });
  }

  resetFilter() {
    this.filter = {};
    this.searchUsers();
  }

  deleteUser(userId: number) {
    this.userService.deleteUser({id: userId}).subscribe({
      next: () => {
        this.searchUsers();
      },
      error: (err) => {
        this.errorMsg = ['Failed to delete user'];
        console.error(err);
      }
    });
  }

  goToPage(page: number) {
    this.page = page;
    this.searchUsers();
  }

  goToFirstPage() {
    this.page = 0;
    this.searchUsers();
  }

  goToPreviousPage() {
    if (this.page > 0) {
      this.page--;
      this.searchUsers();
    }
  }

  goToLastPage() {
    if (this.userResponse.totalPages !== undefined) {
      this.page = this.userResponse.totalPages - 1;
      this.searchUsers();
    }
  }

  goToNextPage() {
    if (this.page < (this.userResponse.totalPages ?? 0) - 1) {
      this.page++;
      this.searchUsers();
    }
  }

  get isLastPage() {
    return this.userResponse.totalPages !== undefined && this.page === this.userResponse.totalPages - 1;
  }

  get displayedPages() {
    const totalPages = this.userResponse.totalPages ?? 0;
    const currentPage = this.page;
    const pagesToShow = 5;
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
