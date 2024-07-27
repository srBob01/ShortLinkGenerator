import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {LinkService} from '../../../../services/services/link.service';
import {LinkRequest} from '../../../../services/models/link-request';
import {CategoryService} from '../../../../services/services/category.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CategoryResponse} from "../../../../services/models/category-response";

@Component({
  selector: 'app-manage-link',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './manage-link.component.html',
  styleUrls: ['./manage-link.component.scss']
})
export class ManageLinkComponent implements OnInit {
  linkRequest: LinkRequest = {categoryResponse: {id: 0, title: ''}, linkName: "", longLink: "", removeDate: ""};
  errorMsg: string[] = [];
  hours: number[] = Array.from({length: 24}, (_, i) => i);
  selectedHour: number | null = null;
  categories: CategoryResponse[] = [];
  isEditMode: boolean = false;
  linkId: number | null = null;

  constructor(
    private linkService: LinkService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.categoryService.findAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;

        this.activatedRoute.queryParams.subscribe(params => {
          if (params['id']) {
            this.isEditMode = true;
            this.linkId = +params['id'];
            this.loadLinkFromParams(params);
          }
        });
      },
      error: (err) => this.errorMsg.push('Failed to load categories')
    });
  }

  loadLinkFromParams(params: any) {
    this.linkRequest = {
      categoryResponse: {id: 0, title: ''},
      linkName: params['linkName'],
      longLink: params['longLink'],
      removeDate: params['removeDate']
    };

    const category = this.categories.find(cat => cat.title === params['titleCategory']);
    this.linkRequest.categoryResponse = category ? category : {id: 0, title: ''};

    const date = new Date(params['removeDate']);
    this.selectedHour = date.getHours();
  }

  save(linkForm: any) {
    if (linkForm.valid) {
      const selectedDate = this.linkRequest.removeDate ? new Date(this.linkRequest.removeDate) : null;
      if (selectedDate && this.selectedHour !== null) {
        this.linkRequest.removeDate = this.formatDateToLocalDateTime(selectedDate, this.selectedHour);
        if (this.isEditMode && this.linkId !== null) {
          this.updateLink();
        } else {
          this.createLink();
        }
      } else {
        this.errorMsg.push("Please select both date and hour.");
      }
    } else {
      this.errorMsg.push("Please fill out all required fields.");
    }
  }

  createLink() {
    this.linkService.saveLink({body: this.linkRequest}).subscribe({
      next: (id) => {
        console.log('Link created with ID:', id);
        this.router.navigate(['/links/my-links']);
      },
      error: (err) => {
        this.errorMsg.push('Failed to create link');
        console.error(err);
      }
    });
  }

  updateLink() {
    if (this.linkId !== null) {
      this.linkService.updateLink({id: this.linkId, body: this.linkRequest}).subscribe({
        next: () => {
          console.log('Link updated with ID:', this.linkId);
          this.router.navigate(['/links/my-links']);
        },
        error: (err) => {
          this.errorMsg.push('Failed to update link');
          console.error(err);
        }
      });
    }
  }

  validateDate(date: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      this.errorMsg.push("Please select a valid date (today or later).");
      this.linkRequest.removeDate = "";
    } else {
      this.errorMsg = this.errorMsg.filter(msg => msg !== "Please select a valid date (today or later).");
    }
  }

  validateHour(hour: number) {
    const now = new Date();
    if (this.linkRequest.removeDate) {
      const selectedDate = new Date(this.linkRequest.removeDate);
      if (selectedDate.toDateString() === now.toDateString() && hour <= now.getHours()) {
        this.errorMsg.push("Please select a valid hour.");
        this.selectedHour = null;
      } else {
        this.errorMsg = this.errorMsg.filter(msg => msg !== "Please select a valid hour.");
      }
    }
  }

  formatDateToLocalDateTime(date: Date, hour: number): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hourString = String(hour).padStart(2, '0');
    return `${year}-${month}-${day}T${hourString}:00:00`;
  }
}
