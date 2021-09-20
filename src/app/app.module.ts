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
import { MovieItemComponent } from './catalog/movie-list/movie-item/movie-item.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { CarouselComponent } from './carousel/carousel.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatalogComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MovieItemComponent,
    UserLoginComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
