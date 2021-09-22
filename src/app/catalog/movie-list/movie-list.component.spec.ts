import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {MovieApiService} from "../../shared/movie-api.service";
import {Genre, Movie, MovieResp, MoviesResp} from "../../shared/movie.model";
import {map, retry} from "rxjs/operators";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {CatalogService} from "../catalog.service";

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  const dummyMovies: Movie[] = [
    new Movie(1, '', 'dummy1', 'comedy', 7, ''),
    new Movie(2, '', 'dummy2', 'drama', 2, ''),
    new Movie(3, '', 'dummy3', 'thriller', 5, '')
  ];

  class CatalogServiceDummy extends CatalogService{
    // setMovies(value: Movie[]) {
    //   super.setMovies(value);
    // }
    getMovies(): Movie[] {
      return dummyMovies;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ MovieListComponent ],
      providers: [
        MovieApiService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies list correctly in the DOM', () => {
    component.catalogService = new CatalogServiceDummy();
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    let rows = compiled.querySelector('tbody').querySelectorAll('tr');

    let extractedList: Movie[] = [];
    for(let row of rows){
      const rowData: string[] = row.textContent.split(' ');
      const movie: Movie = new Movie(+rowData[0], '', rowData[1], rowData[3], +rowData[2], '');
      extractedList.push(movie);
    }
    console.log(extractedList);
    expect(extractedList).toEqual(dummyMovies);
  });
});
