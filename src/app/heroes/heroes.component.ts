import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  /* Although the component delegates hero deletion to the HeroService, 
  it remains responsible for updating its own list of heroes. 
  The component's delete() method immediately removes the hero-to-delete 
  from that list, anticipating that the HeroService succeeds on the server. */
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe(returnString => console.log(returnString) );
  }

  add(name: string, color: string, newID: number): void {
    let owner: string = "0";
    if(sessionStorage.getItem('ID:') === null){
     owner = "0";
    }
    else
    {
      owner = sessionStorage.getItem('ID:');
    }
    name = name.trim();
    if (!name) { return; }
    let newHero = {
      name: name,
      color: color,
      id: newID,
      owner: owner,
      picID: "637ff3013392d24f0c8258d6"
    }
    this.heroService.addHero(newHero as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);  // this updates local array versus doing a new get all 
        // it is using the hero object that came back, which is important since it has
        // the new _id value filled in
      });
  }

}