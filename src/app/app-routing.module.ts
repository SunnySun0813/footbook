import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './features/feed/feed.component';
import { FriendComponent } from './features/friend/friend.component';
import { HostComponent } from './features/host/host.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SearchComponent } from './features/search/search.component';
import { ErrorComponent } from './error/error.component';
import { ActivateService } from './shared/activate.service';

const routes: Routes = [
  { path:'login',component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'friend/:id', canActivate:[ActivateService], component: FriendComponent },
  { path:'host/:id', canActivate:[ActivateService], component: HostComponent },
  { path:'feed/:id', canActivate:[ActivateService], component: FeedComponent },
  { path:'search/:id/:keyword', canActivate:[ActivateService], component: SearchComponent},
  { path:'**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

