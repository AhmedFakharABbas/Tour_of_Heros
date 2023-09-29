import { Component, OnInit } from '@angular/core';
import { Observable, observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor(private heroservice: HeroService) {}

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      //wait for 300 mili seconds after each keyStroke before considering the term
      debounceTime(300),
      //ignore new term is same as previous
      distinctUntilChanged(),
      //swith to new search observable each time the term change
      switchMap((term: string) => this.heroservice.searchHeroes(term))
    );
  }
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
