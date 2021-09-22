import { Component, OnInit } from '@angular/core';
import {Movie} from "../../shared/movie.model";
import {MovieApiService} from "../../shared/movie-api.service";
import {CatalogService} from "../catalog.service";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movieList: Movie[] = [];

  constructor(private movieAPI: MovieApiService, public catalogService: CatalogService) {
  }

  ngOnInit(): void {
    // this.movieAPI.fetchGenres();
    // this.movieAPI.fetchMovies().subscribe(movies => {
    //   this.movieList = movies;
    // });
    this.catalogService.moviesChanged.subscribe((movies: Movie[]) => {
      this.movieList = movies;
    });
    this.movieList = this.catalogService.getMovies();
  }

}
