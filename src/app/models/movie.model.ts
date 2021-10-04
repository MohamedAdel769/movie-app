import {Actor} from "./credits.model";

export class Movie{
  constructor(public rate: number, public id?: number, public imgPath?: string, public posterPath?: string,
              public title?: string, public genre?: string, public overView?: string, public vote_count?: string,
              public release_date?: string, public genres?: string[], public runtime?: number,
              public tagline?: string, public cast?: Actor[]
              ) {
  }
}

export interface MovieResp{
  overview: string;
  genre_ids: number[];
  id: number;
  title: string;
  backdrop_path: string | null;
  vote_average: number;
  poster_path?: string;
  genres?: Genre[];
  vote_count?: string;
  release_date?: string;
  runtime?: number;
  tagline?: string;
}

export interface MoviesResp{
  page: number;
  results: MovieResp[];
  total_results: number;
  total_pages: number;
}

export interface Genre{
  id: number;
  name: string;
}
