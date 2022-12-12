import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroesSubset();
  }

  getHeroesSubset(): void {

    let owner: string = "0";
    if(sessionStorage.getItem('ID:') === null){
     owner = "0";
    }
    else
    {
      owner = sessionStorage.getItem('ID:');
    }

    this.heroService.getHeroesSubset(owner)
    .subscribe(heroes => this.heroes = heroes);
  }

  

}
