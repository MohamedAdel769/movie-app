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
    this.http.get<MoviesResp>(
      `${this.base_url}/movie/top_rated?api_key=${this.api_key}&language=en-US&page=1`)
      .subscribe(result => this.parseMovies(result));
  }

  fetchGenres(){
    this.http.get<{genres: Genre[]}>(
      `${this.base_url}/genre/movie/list?api_key=${this.api_key}&language=en-US`)
      .subscribe( result => this.parseGenres(result));
  }

  getGenre(ID: number){
    const index = this.genres.findIndex( ({id}) => id == ID);
    return index==-1 ? '' : this.genres[index].name;
  }

  parseGenres(response: {genres: Genre[]}){
    this.genres = response.genres;
  }

  parseMovies(response: MoviesResp){
    for(let movie of response.results){
      const genres: number[] = movie.genre_ids;

      //TODO: use all genres
      const chosenGenre = this.getGenre(genres[0]);

      const fetchedMovie = new Movie(movie.id, this.img_path + movie.backdrop_path,
        movie.title, chosenGenre, movie.vote_average, movie.overview);

      this.movies.push(fetchedMovie);
    }
  }
}
