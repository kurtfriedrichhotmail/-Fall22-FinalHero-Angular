import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Pic } from './pic';

@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>('http://localhost:3000/heroes')
    //return this.http.get<Hero[]>('https://zfall2022node.azurewebsites.net/heroes')

    

    
  }


  /** GET hero by id.  */
  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>('http://localhost:3000/heroes/' + id)
    //return this.http.get<Hero>('https://zfall2022node.azurewebsites.net/heroes/' + id)
  }

  /** PUT: update the hero on the server 
   * server code allows for sending an updated id value, but this
   * client side code does not. Updating an id is not a great idea anyhow!
  */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put('http://localhost:3000/heroes/' + hero.id, hero)
    //return this.http.put('https://zfall2022node.azurewebsites.net/heroes/' + hero.id, hero)
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<string> {  
    return this.http.delete<string>('http://localhost:3000/heroes/' + id);
    //return this.http.delete<string>('https://zfall2022node.azurewebsites.net/heroes/' + id);
  }

    /** POST: add a new hero to the server */
    addHero(hero: Hero): Observable<Hero> {
      return this.http.post<Hero>('http://localhost:3000/newHero', hero)
      //return this.http.post<Hero>('https://zfall2022node.azurewebsites.net/newHero', hero)
    }

  /** GET heroes from the server */
  getHeroesSubset(owner: string ): Observable<Hero[]> {
    return this.http.get<Hero[]>('http://localhost:3000/heroesSubset/' + owner)
    //return this.http.get<Hero[]>('https://zfall2022node.azurewebsites.net/heroesSubset/' + owner)
  }

  getPicture(id: string): Observable<Pic> {
    return this.http.get<Pic>('http://localhost:3000/upload/image/'+id);
    //return this.http.get<Pic>('https://kurtfall2020.azurewebsites.net/upload/image/'+id);
  }

}