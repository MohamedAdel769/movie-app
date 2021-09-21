import {Movie} from "./movie.model";

export class MovieDbService{
  movies = [
    new Movie(1, 'https://via.placeholder.com/740x380', 'Test movie', 'Action', 8.7, 'This is the first movie'),
    new Movie(2, 'https://via.placeholder.com/740x380', 'Second movie', 'Drama', 7.3, 'This is the Second movie')
  ];

  getMovie(ID: number){
    const index = this.movies.findIndex( ({id}) => id == ID);
    if(index != -1)
      return this.movies[index];

    return new Movie(0, '', 'dummy', '',0,'');
  }
}
