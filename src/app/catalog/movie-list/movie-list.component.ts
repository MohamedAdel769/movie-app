import { Component, OnInit } from '@angular/core';
import {Movie} from "../../shared/movie.model";
import {MovieApiService} from "../../shared/movie-api.service";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movieList: Movie[] = [];

  constructor(private movieAPI: MovieApiService) {
  }

  ngOnInit(): void {
    this.movieAPI.fetchGenres();
    this.movieAPI.fetchMovies().subscribe(movies => {
      this.movieList = movies;
    });
  }

}
