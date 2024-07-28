import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {authGuard} from "../../services/guard/auth.guard";
import {SharedLinkComponent} from "./pages/shared-link/shared-link.component";
import {MyLinkComponent} from "./pages/my-link/my-link.component";
import {HomeComponent} from "./pages/home/home.component";
import {ManageLinkComponent} from "./pages/manage-link/manage-link.component";
import {SearchLinkComponent} from "./pages/search-link/search-link.component";
import {AccountComponent} from "./pages/account/account.component";
import {SearchUserComponent} from "./pages/search-user/search-user.component";
import {adminGuardGuard} from "../../services/admin-guard/admin-guard.guard";

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
        component: HomeComponent
      },
      {
        path: 'manage',
        component: ManageLinkComponent,
        canActivate: [authGuard]
      },
      {
        path: 'search-links',
        component: SearchLinkComponent
      },
      {
        path: 'account',
        component: AccountComponent,
        canActivate: [authGuard]
      },
      {
        path: 'search-users',
        component: SearchUserComponent,
        canActivate: [adminGuardGuard]
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
