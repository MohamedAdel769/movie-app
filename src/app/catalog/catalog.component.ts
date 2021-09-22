import { Component, OnInit } from '@angular/core';
import {MovieApiService} from "../shared/movie-api.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(private movieAPI: MovieApiService) { }

  ngOnInit(): void {
    this.movieAPI.fetchMovies();
  }

}
