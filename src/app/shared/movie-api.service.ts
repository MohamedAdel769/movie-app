import {HttpClient} from "@angular/common/http";
import {Genre, Movie, MoviesResp} from "./movie.model";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class MovieApiService{
  movies: Movie[];
  base_url = "https://api.themoviedb.org/3"
  api_key = "8419c8d7a9d6c4697f34fae892c76c66";
  img_path = "https://image.tmdb.org/t/p/w780";
  // w300,w500,w780,w1280, original
  genres: Genre[];

  constructor(private http: HttpClient) {
    this.genres = [];
    this.movies = [];
  }

  fetchMovies(){
    // TODO: enhance request link
    this.http.get<MoviesResp>(
      `${this.base_url}/movie/top_rated?api_key=${this.api_key}&language=en-US&page=1`)
      .subscribe(result => this.parseResponse(result));
  }

  parseResponse(respone: MoviesResp){
    for(let movie of respone.results){
      const fetchedMovie = new Movie(movie.id, this.img_path + movie.backdrop_path,
        movie.title, '', movie.vote_average, movie.overview);

      this.movies.push(fetchedMovie);
    }
  }
}
