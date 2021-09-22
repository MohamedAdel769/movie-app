import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Movie} from "../../shared/movie.model";
import {MovieApiService} from "../../shared/movie-api.service";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie;
  isLoading: boolean = false;
  constructor(private route: ActivatedRoute, private movieAPI: MovieApiService) {
    this.movie = new Movie(0, '', 'Loading...', '',0,'');
  }

  ngOnInit(): void {
    this.isLoading = true;
    const id = +this.route.snapshot.params['id'];
    this.movieAPI.fetchMovie(id).subscribe(result => {
      this.movie = result;
      this.isLoading = false;
    });
  }

}
