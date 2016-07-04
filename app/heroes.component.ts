import { Component, OnInit} from '@angular/core';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-heroes',
  styleUrls: ['app/heroes.component.css'],
  templateUrl: 'app/heroes.component.html',
  directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  selectedHero: Hero;
  heroes: Hero[];
  addingHero = false;
  error: any;

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  getHeroes() {
    this.heroService.getHeroes()
      .then(heroes => {
       this.heroes = heroes;
      })
      .catch(error => this.error = error);

  }

  gotoDetail() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) {
      this.getHeroes();
    }
  }

  deleteHero(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
      .delete(hero)
      .then(res => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      })
      .catch(error => this.error = error);
  }

}


