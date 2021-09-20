import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CarouselComponent} from "./carousel/carousel.component";
import {CatalogComponent} from "./catalog/catalog.component";
import {UserLoginComponent} from "./user-login/user-login.component";

const routes: Routes = [
  {path: '', component: CarouselComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'login', component: UserLoginComponent}
  // TODO: create 404 route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
