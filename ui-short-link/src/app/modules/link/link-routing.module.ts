import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {authGuard} from "../../services/guard/auth.guard";
import {SharedLinkComponent} from "./pages/shared-link/shared-link.component";
import {DatePipe} from "@angular/common";
// import {authGuard} from "../../services/guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard]
  },
  {
    path: 'shared-links',
    component: SharedLinkComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkRoutingModule {
}
