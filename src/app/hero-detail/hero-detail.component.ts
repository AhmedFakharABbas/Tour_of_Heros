import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.getHero();
  }
  getHero(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe((Hero) => (this.hero = Hero));
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack);
  }
}
