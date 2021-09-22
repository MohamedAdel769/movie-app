import {Injectable} from "@angular/core";
import {Movie} from "../shared/movie.model";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class CatalogService{
  moviesChanged = new Subject<Movie[]>();
  movieSelected = new Subject<Movie>();

  // private movies: Movie[] = [
  //   new Movie(496243, '', 'test', 'comedy', 2, 'teeeeeest'),
  //   new Movie(155, '', 'hahaha', 'drama', 2, 'hello world')
  // ];
  private movies: Movie[] = [];
  private movie: Movie = new Movie(1, '', 'dummy', '', 0, '');

  getMovies(): Movie[] {
    return this.movies.slice();
  }

  setMovies(value: Movie[]) {
    this.movies = value;
    this.moviesChanged.next(this.movies.slice());
  }

  getMovie(): Movie {
    return {...this.movie};
  }

  setMovie(value: Movie) {
    this.movie = value;
    this.movieSelected.next({...this.movie});
  }
}
