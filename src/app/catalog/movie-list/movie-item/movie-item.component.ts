import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../../../shared/movie.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogService} from "../../catalog.service";

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movie: Movie;

  constructor(private router: Router, private route: ActivatedRoute, private movieService: CatalogService) {
    this.movie = new Movie(0,'','temp','',0,'');
  }

  ngOnInit(): void {
  }

  onSelected(){
    this.movieService.setMovie(this.movie);
    this.router.navigate(['movie', this.movie.id], {relativeTo: this.route});
  }
}
