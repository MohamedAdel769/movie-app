import {Component, OnInit} from '@angular/core';
import {AuthService} from "./user-login/auth.service";
import {MovieDbService} from "./shared/movie-db.service";
import {MovieApiService} from "./shared/movie-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService, private movieAPI: MovieApiService) {}

  ngOnInit(): void {
    this.authService.autoLogIn();
    this.movieAPI.fetchMovies();
  }

}
