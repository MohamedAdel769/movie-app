import {Injectable} from "@angular/core";
import {Movie} from "../models/movie.model";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class CatalogService{
  moviesChanged = new Subject<Movie[]>();
  private movies: Movie[] = [];

  public movie: Movie = new Movie(0);
  private movieSubject = new BehaviorSubject(this.movie);

  setMovie(movie: Movie){
    this.movieSubject.next(movie);
  }

  getMovie() : Movie{
    this.movieSubject.subscribe((data) => {this.movie = data});
    return this.movie;
  }


  getMovies(): Movie[] {
    return this.movies.slice();
  }

  setMovies(value: Movie[]) {
    this.movies = value;
    this.moviesChanged.next(this.movies.slice());
  }
}
