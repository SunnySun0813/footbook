import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './features/feed/feed.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FriendComponent } from './features/friend/friend.component';
import { HostComponent } from './features/host/host.component';
import { PostComponent } from './features/feed/post/post.component';
import { StoryComponent } from './features/feed/story/story.component';
import { SearchComponent } from './features/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { AuthInterceptor } from './shared/auth-interceptor';
import { PastTimePipe } from './shared/past-time.pipe';


@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    FriendComponent,
    HostComponent,
    PostComponent,
    StoryComponent,
    SearchComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    PastTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
