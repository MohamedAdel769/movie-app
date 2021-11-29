import { Component, OnInit } from '@angular/core';
import {Movie} from "../../models/movie.model";
import {MovieApiService} from "../../services/movie-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogService} from "../../services/catalog.service";

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit {
  movieList: Movie[] = [];

  constructor(private movieAPI: MovieApiService, private route: ActivatedRoute,
              public catalogService: CatalogService, private router: Router) {
  }

  ngOnInit(): void {
    this.catalogService.moviesChanged.subscribe((movies: Movie[]) => {
      this.movieList = movies;
    });
    this.movieList = this.catalogService.getMovies();
  }

  movieSelected(movieItem: Movie){
    this.catalogService.setMovie(movieItem);
    this.router.navigate(['/m', movieItem.id]);
  }
}
