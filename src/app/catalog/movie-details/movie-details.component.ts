import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MovieDbService} from "../../shared/movie-db.service";
import {Movie} from "../../shared/movie.model";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie;
  constructor(private route: ActivatedRoute, private movieDB: MovieDbService) {
    this.movie = new Movie(0, '', 'dummy', '',0,'');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.movie = this.movieDB.getMovie(id);
  }

}
