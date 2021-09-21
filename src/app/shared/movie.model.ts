export class Movie{
  constructor(public id: number, public imgPath: string, public title: string,
              public genre: string, public rate: number, public overView: string) {
  }
}

export interface MovieResp{
  poster_path:string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
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
