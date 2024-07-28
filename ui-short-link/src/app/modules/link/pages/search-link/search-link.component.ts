import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LinkService} from "../../../../services/services/link.service";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {LinkCardComponent} from "../../components/link-card/link-card.component";
import {CategoryResponse} from "../../../../services/models/category-response";
import {CategoryService} from "../../../../services/services/category.service";
import {MatOption, MatSelect} from "@angular/material/select";
import {TokenService} from "../../../../services/token/token.service";
import {BaseLinkComponent} from "../../components/base-link/base-link.component";

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
export class SearchLinkComponent extends BaseLinkComponent {
  filter = {email: '', linkName: '', titleCategory: '', username: ''};
  categories: CategoryResponse[] = [];

  constructor(
    protected override router: Router,
    protected override linkService: LinkService,
    protected override tokenService: TokenService,
    private categoryService: CategoryService
  ) {
    super(router, tokenService, linkService);
  }

  override findAllLinks() {
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

  override ngOnInit() {
    this.categoryService.findAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        this.errorMsg = ['Failed to load categories'];
        console.error(err);
      }
    });
    super.ngOnInit();
  }

  resetFilter() {
    this.errorMsg = [];
    this.filter = {email: '', linkName: '', titleCategory: '', username: ''};
    this.findAllLinks();
  }
}
