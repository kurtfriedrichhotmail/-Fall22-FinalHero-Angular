import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  loggedIn: boolean = false;
  currentUser: string = 'Please Log In';
  picVar: string = "/assets/borderCollie.jpeg" 

  constructor(private heroService: HeroService) { }
  

  ngOnInit(): void {

    this.getHeroes();
 
    if(sessionStorage.getItem('ID:') === null){
      this.loggedIn = false;
    }
      else {
        this.loggedIn = true;
        this.currentUser = 'Welcome ' + sessionStorage.getItem('Name:');
        this.picVar =  sessionStorage.getItem('Picture:'); // logged in users pic 

    }
  
  }
 

  imageURLarray: string[] = []; // holds the actual picture in parallel structure with Hero array


  getHeroes(): void {
    this.imageURLarray.length = 0  //empty array
  
    this.heroService.getHeroes()
      .subscribe(heroes => 
      {
            this.heroes = heroes.slice(1, 5);  // just show 4 heroes
            let pointer = 0;

                this.heroService.getPicture(this.heroes[pointer].picID)
                .subscribe(servData => {
                  let binary = '';
                  let bytes = [].slice.call(new Uint8Array(servData.img.data.data));
                  bytes.forEach((b) => binary += String.fromCharCode(b));
                  let imageBinData = window.btoa(binary);
                  this.imageURLarray.push(`data:${'image/jpeg'};base64,${imageBinData}`);

                  pointer++;

                  this.heroService.getPicture(this.heroes[pointer].picID)
                  .subscribe(servData => {
                    let binary = '';
                    let bytes = [].slice.call(new Uint8Array(servData.img.data.data));
                    bytes.forEach((b) => binary += String.fromCharCode(b));
                    let imageBinData = window.btoa(binary);
                    this.imageURLarray.push(`data:${'image/jpeg'};base64,${imageBinData}`);
  
                    pointer++;

                    this.heroService.getPicture(this.heroes[pointer].picID)
                    .subscribe(servData => {
                      let binary = '';
                      let bytes = [].slice.call(new Uint8Array(servData.img.data.data));
                      bytes.forEach((b) => binary += String.fromCharCode(b));
                      let imageBinData = window.btoa(binary);
                      this.imageURLarray.push(`data:${'image/jpeg'};base64,${imageBinData}`);
    
                      pointer++;

                      this.heroService.getPicture(this.heroes[pointer].picID)
                      .subscribe(servData => {
                        let binary = '';
                        let bytes = [].slice.call(new Uint8Array(servData.img.data.data));
                        bytes.forEach((b) => binary += String.fromCharCode(b));
                        let imageBinData = window.btoa(binary);
                        this.imageURLarray.push(`data:${'image/jpeg'};base64,${imageBinData}`);
                  
                })  // end of 1st  subscribe
             
             })   // end of 2nd  subscribe

            })   // end of 3rd  subscribe

          })   // end of 4th  subscribe
            
            
        
      
      })  // end of outer subscribe
           
        
        
  } // end of getHeroes
  
}