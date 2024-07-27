import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {authGuard} from "../../services/guard/auth.guard";
import {SharedLinkComponent} from "./pages/shared-link/shared-link.component";
import {MyLinkComponent} from "./pages/my-link/my-link.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'shared-links',
        component: SharedLinkComponent,
      },
      {
        path: 'my-links',
        component: MyLinkComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkRoutingModule {
}
