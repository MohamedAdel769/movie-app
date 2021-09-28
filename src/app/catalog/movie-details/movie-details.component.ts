import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Movie} from "../../models/movie.model";
import {MovieApiService} from "../../services/movie-api.service";
import {CatalogService} from "../../services/catalog.service";
import {ErrorHandlingService} from "../../services/error-handling.service";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private movieAPI: MovieApiService,
              private movieService: CatalogService, private errorService: ErrorHandlingService) {
    this.movie = new Movie(0, '', 'Loading...', '',0,'');
  }

  ngOnInit(): void {
    // this.isLoading = true;
    // const id = +this.route.snapshot.params['id'];
    // this.movieAPI.fetchMovie(id).subscribe(result => {
    //   this.movie = result;
    //   this.isLoading = false;
    // }, error => {
    //   setTimeout(() => {
    //     this.errorService.movie404Fired.emit();
    //     this.isLoading = false;
    //   }, 3000);
    // });
    this.movie = this.movieService.getMovie();
  }
}
