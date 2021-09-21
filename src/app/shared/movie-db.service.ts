import {Genre, Movie, MovieResp, MoviesResp} from "./movie.model";
import {Injectable} from "@angular/core";
import {MovieApiService} from "./movie-api.service";

@Injectable({providedIn: 'root'})
export class MovieDbService{
  movies = [
    new Movie(1, 'https://via.placeholder.com/740x380', 'Test movie', 'Action', 8.7, 'This is the first movie'),
    new Movie(2, 'https://via.placeholder.com/740x380', 'Second movie', 'Drama', 7.3, 'This is the Second movie')
  ];

  constructor(private movieAPI: MovieApiService) {
    this.movies = movieAPI.movies;
  }

  getMovie(ID: number){
    const index = this.movies.findIndex( ({id}) => id == ID);
    if(index != -1)
      return this.movies[index];

    return new Movie(0, '', 'dummy', '',0,'');
  }


}
