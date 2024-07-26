import {Component, Input} from '@angular/core';
import {LinkResponse} from "../../../../services/models/link-response";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-link-card',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './link-card.component.html',
  styleUrl: './link-card.component.scss'
})
export class LinkCardComponent {
  private _link: LinkResponse = {};

  get link(): LinkResponse {
    return this._link;
  }

  @Input()
  set link(value: LinkResponse) {
    this._link = value;
  }

  onCardClick(longLink: string | undefined) {
    if (longLink) {
      window.open(longLink, '_blank');
    }
  }
}
