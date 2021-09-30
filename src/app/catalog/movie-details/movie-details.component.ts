import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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

  constructor(private router: Router, private movieAPI: MovieApiService, private route: ActivatedRoute,
              private movieService: CatalogService, private errorService: ErrorHandlingService) {
    this.movie = this.movieService.getMovie();
  }

  ngOnInit(): void {
    //if(this.movie.rate == 0){
      this.isLoading = true;
      const id = +this.route.snapshot.params['id'];
      this.movieAPI.fetchMovie(id).subscribe(result => {
        this.movie = result;
        // @ts-ignore
        this.movie.vote_count = this.movie.vote_count.toLocaleString();
        this.isLoading = false;
      }, error => {
          this.errorService.movie404Fired.emit();
          this.isLoading = false;
      });
      this.movieAPI.fetchActors(id).subscribe(result => {
        this.movie.cast = result;
      });
    //}
    // else {
    //   this.movie = this.movieService.getMovie();
    //   // @ts-ignore
    //   this.movie.vote_count = this.movie.vote_count.toLocaleString();
    // }
  }

  showMovies(){
    this.router.navigate(['/'], {queryParamsHandling: "preserve"});
  }
}
