import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {authGuard} from "../../services/guard/auth.guard";
import {SharedLinkComponent} from "./pages/shared-link/shared-link.component";
import {MyLinkComponent} from "./pages/my-link/my-link.component";
import {HomeComponent} from "./pages/home/home.component";
import {ManageLinkComponent} from "./pages/manage-link/manage-link.component";
import {SearchLinkComponent} from "./pages/search-link/search-link.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'shared-links',
        component: SharedLinkComponent,
      },
      {
        path: 'my-links',
        component: MyLinkComponent,
        canActivate: [authGuard]
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage',
        component: ManageLinkComponent,
        canActivate: [authGuard]
      },
      {
        path: 'search-links',
        component: SearchLinkComponent,
        canActivate: [authGuard]
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
