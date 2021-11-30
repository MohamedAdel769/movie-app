import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {MovieApiService} from "./services/movie-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService,private movieAPI: MovieApiService,
              private router: Router) {}

  ngOnInit(): void {
    this.authService.autoLogIn();
    this.movieAPI.fetchMovies();
    //this.router.navigate(['/home']);
  }

}
