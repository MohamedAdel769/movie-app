import {Injectable} from "@angular/core";
import {Movie} from "../shared/movie.model";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class CatalogService{
  moviesChanged = new Subject<Movie[]>();
  private movies: Movie[] = [];


  getMovies(): Movie[] {
    return this.movies.slice();
  }

  setMovies(value: Movie[]) {
    this.movies = value;
    this.moviesChanged.next(this.movies.slice());
  }
}
