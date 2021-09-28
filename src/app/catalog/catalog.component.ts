import { Component, OnInit } from '@angular/core';
import {MovieApiService} from "../services/movie-api.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  showDetails: boolean = false;

  constructor(private movieAPI: MovieApiService) { }

  ngOnInit(): void {
    this.movieAPI.fetchMovies();
  }

}
