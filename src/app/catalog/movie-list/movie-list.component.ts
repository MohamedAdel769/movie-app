import { Component, OnInit } from '@angular/core';
import {Movie} from "../../shared/movie.model";
import {MovieDbService} from "../../shared/movie-db.service";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movieList: Movie[] = [];

  constructor(private movieDB: MovieDbService) {
    this.movieList = this.movieDB.movies;
  }

  ngOnInit(): void {
  }

}
