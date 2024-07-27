import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LinkResponse} from "../../../../services/models/link-response";
import {DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-link-card',
  standalone: true,
  imports: [
    DatePipe,
    NgIf
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

  private _manage = false;

  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  onCardClick(longLink: string | undefined) {
    if (longLink) {
      window.open(longLink, '_blank');
    }
  }

  @Output() private edit: EventEmitter<LinkResponse> = new EventEmitter<LinkResponse>();
  @Output() private remove: EventEmitter<LinkResponse> = new EventEmitter<LinkResponse>();

  onEdit() {
    this.edit.emit(this._link);
  }

  onRemove() {
    this.remove.emit(this._link);
  }
}
