export class Movie{
  constructor(public id?: number, public imgPath?: string, public title?: string,
              public genre?: string, public rate?: number, public overView?: string,
              public vote_count?: number, public release_date?: string,public genres?: string[]
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
  genres?: Genre[];
  vote_count?: number;
  release_date?: string;
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
