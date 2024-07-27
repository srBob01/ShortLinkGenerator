import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MenuComponent} from "../../components/menu/menu.component";
import {LinkService} from "../../../../services/services/link.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

}
