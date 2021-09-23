import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CatalogComponent } from './catalog/catalog.component';
import { MovieListComponent } from './catalog/movie-list/movie-list.component';
import { MovieDetailsComponent } from './catalog/movie-details/movie-details.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import {HttpClientModule} from "@angular/common/http";
import { MovieItemComponent } from './catalog/movie-list/movie-item/movie-item.component';
import { NotFoundComponent } from './error-handling/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatalogComponent,
    MovieListComponent,
    MovieDetailsComponent,
    UserLoginComponent,
    CarouselComponent,
    ErrorHandlingComponent,
    MovieItemComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
