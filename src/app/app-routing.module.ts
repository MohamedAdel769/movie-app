import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CarouselComponent} from "./carousel/carousel.component";
import {CatalogComponent} from "./catalog/catalog.component";
import {UserLoginComponent} from "./user-login/user-login.component";
import {AuthGuardService} from "./user-login/auth-guard.service";
import {MovieDetailsComponent} from "./catalog/movie-details/movie-details.component";
import {MovieListComponent} from "./catalog/movie-list/movie-list.component";

const routes: Routes = [
  {path: '', component: CarouselComponent, pathMatch: 'full'},
  {
    path: 'catalog',
    component: CatalogComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: '', component: MovieListComponent},
      {path: 'movie/:id', component: MovieDetailsComponent}
    ]
  },
  {path: 'login', component: UserLoginComponent}
  // TODO: create 404 route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
