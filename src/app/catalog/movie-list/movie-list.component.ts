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
  currentPage: number = 1;

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

  nextPage(){
    this.currentPage++;
    this.movieAPI.fetchMovies(this.currentPage);
  }

  prevPage(){
    this.currentPage--;
    if(!this.currentPage)
      this.currentPage = 1;
    this.movieAPI.fetchMovies(this.currentPage);
  }
}
