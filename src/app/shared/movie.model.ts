export class Movie{
  constructor(public id: number, public imgPath: string, public title: string,
              public genre: string, public rate: number, public overView: string) {
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
