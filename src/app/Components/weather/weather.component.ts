import { Component, Input, OnInit, inject } from '@angular/core';
import { weatherService } from '../../weather.service';
import { Weather } from '../../weather';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { HousingService } from '../../housing.service';
import { HousingLocation } from '../../housinglocation';



@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template:`
  
    <div class="weather">
      <h1>In this location:</h1>
      <h2>teperature is :{{ weather?.current?.temp_c }}º <img src="{{weather?.current?.condition?.icon}}" alt=""></h2>
      <h3>condition is :{{ weather?.current?.condition?.text }} </h3>
    </div>
  
  
  `,
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

  @Input() city!: string;
  weather: Weather | undefined; 

  lat: number | undefined;
  lon: number | undefined;

  public location?: [number, number];
   housingService = inject(HousingService);
   housingLocation: HousingLocation | undefined;
   route: ActivatedRoute = inject(ActivatedRoute);


  constructor(private weatherService: weatherService) {

    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
       this.housingLocation = housingLocation;
       this.getWeather();
    });

   }

  getWeather() {
    this.weatherService.getWeather(this.housingLocation!.latitude, this.housingLocation!.longitude).subscribe(
      (data: Weather) => {
        this.weather = data;         
      },
      (error) => {
        console.error('Error fetching weather:', error);
      }
    );
  }
}