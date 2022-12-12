import { Component, OnInit } from '@angular/core';

import Chart from 'chart.js/auto';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {


 chart: Chart;
 heroes: Hero[] = [];
 
 //                   red  blue  green  other
 colors: number[] = [0, 0, 0, 0];

 constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes =>
      { this.heroes = heroes;

        this.heroes.forEach(element => {
          switch(element.color) {
            case 'red':
              this.colors[0]++;
              break;
            case 'blue':
              this.colors[1]++;
              break;
            case 'green': 
            this.colors[2]++; 
            break;
            default:
              this.colors[3]++;
              break;
          }
         
      });
        this.createChart();
      });
  }

  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Red', 'Blue', 'Green', 'Other' ], 
	       datasets: [
          {
            label: "Color Frequency",
            data: this.colors,
            backgroundColor: 'lightblue'
          },
        ]
      },
      options: {
        aspectRatio:2.5
      }



      // data: {// values on X-Axis
      //   labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
			// 					 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	    //    datasets: [
      //     {
      //       label: "Sales",
      //       data: ['467','576', '572', '79', '92',
			// 					 '574', '573', '576'],
      //       backgroundColor: 'blue'
      //     },
      //     {
      //       label: "Profit",
      //       data: ['542', '542', '536', '327', '17',
			// 						 '0.00', '538', '541'],
      //       backgroundColor: 'limegreen'
      //     }  
      //   ]
      // },
      // options: {
      //   aspectRatio:2.5
      //}
    });
  }

}
