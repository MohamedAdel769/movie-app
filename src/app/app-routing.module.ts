import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CatalogComponent} from "./catalog/catalog.component";
import {UserLoginComponent} from "./user-login/user-login.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {MovieDetailsComponent} from "./catalog/movie-details/movie-details.component";
import {MovieListComponent} from "./catalog/movie-list/movie-list.component";
import {NotFoundComponent} from "./error-handling/not-found/not-found.component";
import {TopRatedComponent} from "./catalog/top-rated/top-rated.component";

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: 'movies', component: MovieListComponent},
      {path: 'm/:id', component: MovieDetailsComponent},
      {path: 'topRated', component: TopRatedComponent}
    ]
  },
  {path: 'login', component: UserLoginComponent},
  {path: 'page404', component: NotFoundComponent},
  // {path: '**', redirectTo: '/page404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
