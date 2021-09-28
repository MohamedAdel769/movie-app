import {HttpClient} from "@angular/common/http";
import {Genre, Movie, MovieResp, MoviesResp} from "../models/movie.model";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {CatalogService} from "./catalog.service";

@Injectable({providedIn: "root"})
export class MovieApiService{
  base_url = "https://api.themoviedb.org/3"
  api_key = "8419c8d7a9d6c4697f34fae892c76c66";
  img_path = "https://image.tmdb.org/t/p/w780";
  genres: Genre[];

  constructor(private http: HttpClient, private catalogService: CatalogService) {
    this.genres = [];
  }

  fetchMovie(ID: number){
    return this.http.get<MovieResp>(
      `${this.base_url}/movie/${ID}?api_key=${this.api_key}&language=en-US`)
      .pipe(map( responseData => {
        let chosenGenre = '';
        let genres: Genre[] = [];
        if(responseData.genres) {
          chosenGenre = responseData.genres[0].name;
          genres = responseData.genres;
        }

        const allGenres: string[] = []
        for(let genre of genres){
          allGenres.push(genre.name.replace(/ /g,''));
        }

        let poster_path = '';
        if(responseData.backdrop_path !== null)
          poster_path = this.img_path + responseData.backdrop_path;

        const movie: Movie = new Movie(
          ID, poster_path, responseData.title,
          chosenGenre, responseData.vote_average, responseData.overview, responseData.vote_count,
          responseData.release_date?.split('-')[0],allGenres
        );

        return movie;
      }));
  }

  fetchMovies(page?: number){
    //TODO: add error handling
    this.fetchGenres();
    const pageNum = page ? page : 1;
    this.http.get<MoviesResp>(
      `${this.base_url}/movie/top_rated?api_key=${this.api_key}&language=en-US&page=${pageNum}`)
      .pipe(map(responseData => {
        const movies: Movie[] = [];
        for(let movie of responseData.results){
          const genres: number[] = movie.genre_ids;

          const chosenGenre = this.getGenre(genres[0]);

          const fetchedMovie = new Movie(movie.id, this.img_path + movie.backdrop_path,
            movie.title, chosenGenre, movie.vote_average, movie.overview, movie.vote_count, movie.release_date?.split('-')[0]);

          movies.push(fetchedMovie);
        }
        return movies;
      })).subscribe(result => {
      this.catalogService.setMovies(result);
    });
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