import {HttpClient} from "@angular/common/http";
import {Genre, Movie, MovieResp, MoviesResp} from "./movie.model";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class MovieApiService{
  base_url = "https://api.themoviedb.org/3"
  api_key = "8419c8d7a9d6c4697f34fae892c76c66";
  img_path = "https://image.tmdb.org/t/p/w780";
  // w300,w500,w780,w1280, original
  genres: Genre[];

  constructor(private http: HttpClient) {
    this.genres = [];
  }

  fetchMovie(ID: number){
    return this.http.get<MovieResp>(
      `${this.base_url}/movie/${ID}?api_key=${this.api_key}&language=en-US`)
      .pipe(map( responseData => {
        //TODO: use all genres
        let chosenGenre = '';
        if(responseData.genres)
          chosenGenre = responseData.genres[0].name;

        const movie: Movie = new Movie(
          ID, this.img_path + responseData.backdrop_path, responseData.title,
          chosenGenre, responseData.vote_average, responseData.overview
        );

        return movie;
      }));
  }

  fetchMovies(){
    // TODO: use map to parse data
    return this.http.get<MoviesResp>(
      `${this.base_url}/movie/top_rated?api_key=${this.api_key}&language=en-US&page=2`)
      .pipe(map(responseData => {
        const movies: Movie[] = [];
        for(let movie of responseData.results){
          const genres: number[] = movie.genre_ids;

          //TODO: use all genres
          const chosenGenre = this.getGenre(genres[0]);

          const fetchedMovie = new Movie(movie.id, this.img_path + movie.backdrop_path,
            movie.title, chosenGenre, movie.vote_average, movie.overview);

          movies.push(fetchedMovie);
        }
        return movies;
      }));
  }

  fetchGenres(){
    this.http.get<{genres: Genre[]}>(
      `${this.base_url}/genre/movie/list?api_key=${this.api_key}&language=en-US`)
      .pipe(map( responseData => {
        return responseData.genres;
      }))
      .subscribe( result => {this.genres = [...result];});
  }

  getGenre(ID: number){
    const index = this.genres.findIndex( ({id}) => id == ID);
    return index==-1 ? '' : this.genres[index].name;
  }
}
