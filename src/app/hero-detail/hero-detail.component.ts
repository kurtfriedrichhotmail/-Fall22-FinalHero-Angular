import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { Pic } from '../pic';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  loggedIn: boolean = false;

  imageDataURL: any;
  picID: string;
  pic: Pic;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();

    if(sessionStorage.getItem('ID:') === null){
      this.loggedIn = false;
    }
      else if(sessionStorage.getItem('ID:').length > 5){
      this.loggedIn = true;
    }
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
    .subscribe(hero => {
      this.hero = hero
      this.getPic(hero.picID)
    });
  }



  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      console.log(this.hero);
      this.heroService.updateHero(this.hero)
        .subscribe( results => console.log(results)); // this.goBack());
    }
  }

  getPic(id: string): void {   
    this.picID = id;
    if(this.picID.length > 5){
    this.heroService.getPicture(this.picID)
      .subscribe(servData => {
        this.pic = servData;
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(this.pic.img.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        let imageBinData = window.btoa(binary);
        this.imageDataURL = `data:${'image/jpeg'};base64,${imageBinData}`;

        return
      })
    }
  }

  
}