import { Component, OnInit } from '@angular/core';
import {Movie} from "../../models/movie.model";
import {MovieApiService} from "../../services/movie-api.service";
import {CatalogService} from "../../services/catalog.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movieList: Movie[] = [];
  currentPage: number = 1;

  constructor(private movieAPI: MovieApiService, private route: ActivatedRoute,
              public catalogService: CatalogService, private router: Router) {
  }

  ngOnInit(): void {
    const loaded_page = +this.route.snapshot.queryParams['page'];
    if(loaded_page)
      this.loadPage(loaded_page);
    this.catalogService.moviesChanged.subscribe((movies: Movie[]) => {
      this.movieList = movies;
    });
    this.movieList = this.catalogService.getMovies();
  }

  movieSelected(movieItem: Movie){
    this.catalogService.setMovie(movieItem);
    this.router.navigate(['movie', movieItem.id], {
      relativeTo: this.route,
      queryParams: {page:  this.currentPage} });
  }

  loadPage(page: number){
    this.currentPage = page;
    this.movieAPI.fetchMovies(page);
  }

  nextPage(){
    this.currentPage++;
    this.movieAPI.fetchMovies(this.currentPage);

    this.updateParams();
  }

  prevPage(){
    this.currentPage--;
    if(!this.currentPage)
      this.currentPage = 1;
    this.movieAPI.fetchMovies(this.currentPage);

    this.updateParams();
  }

  updateParams(){
    this.router.navigate([], {
      queryParams: {
        'page': this.currentPage
      },
      queryParamsHandling: 'merge'
    });
  }
}
