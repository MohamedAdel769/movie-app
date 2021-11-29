import {HttpClient} from "@angular/common/http";
import {Genre, Movie, MovieResp, MoviesResp} from "../models/movie.model";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {CatalogService} from "./catalog.service";
import {Actor, Credits} from "../models/credits.model";
import {environment} from "../../environments/environment.prod";

@Injectable({providedIn: "root"})
export class MovieApiService{
  base_url = "https://api.themoviedb.org/3"
  api_key = "8419c8d7a9d6c4697f34fae892c76c66";
  img_size: string = 'original'
  img_path = `https://image.tmdb.org/t/p/${this.img_size}`;
  genres: Genre[];
  Actors: Actor[];

  apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient, private catalogService: CatalogService) {
    this.genres = [];
    this.Actors = [];
  }

  fetchActors(movieID: number){
    return this.http.get<Credits>(
      `${this.base_url}/movie/${movieID}/credits?api_key=${this.api_key}&language=en-US`
    ).pipe(map (response => {
      let actors: Actor[] = [];
      for(let actor of response.cast){
        actors.push({profile_path: this.img_path + actor.profile_path, name: actor.name, character: actor.character});
      }
      return actors;
    }));
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

        return new
        Movie(responseData.vote_average, responseData.id, this.img_path + responseData.backdrop_path,
          this.img_path + responseData.poster_path, responseData.title, chosenGenre,
          responseData.overview, responseData.vote_count, responseData.release_date, allGenres,
          responseData.runtime, responseData.tagline, this.Actors);
      }));
  }

  fetchMovies(page?: number){
    //TODO: add error handling
    this.fetchGenres();
    const pageNum = page ? page : 1;
    this.http.get<MoviesResp>(
      `${this.base_url}/movie/top_rated?api_key=${this.api_key}&language=en&page=${pageNum}&region=EG`)
      .pipe(map(responseData => {
        const movies: Movie[] = [];
        for(let movie of responseData.results){
          const genres: number[] = movie.genre_ids;

          const chosenGenre = this.getGenre(genres[0]);

          const fetchedMovie = new Movie(movie.vote_average, movie.id,
            this.img_path + movie.backdrop_path, this.img_path + movie.poster_path,
            movie.title, chosenGenre,  movie.overview, movie.vote_count, movie.release_date);

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
