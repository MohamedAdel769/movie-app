import { Component, OnInit } from '@angular/core';
import {MovieApiService} from "../services/movie-api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  constructor(private movieAPI: MovieApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.toString());
    this.router.navigate(['/topRated']);
  }

}
