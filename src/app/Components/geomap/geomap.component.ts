import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../places.service';
import { CommonModule } from '@angular/common';
import { icon, marker, Map, tileLayer } from 'leaflet';
import { weatherService } from '../../weather.service';
import { WeatherComponent } from "../weather/weather.component";
import { Weather } from '../../weather';

@Component({
  selector: 'app-geomap',
  standalone: true,
  templateUrl: './geomap.component.html',
  styleUrl: './geomap.component.css',
  imports: [CommonModule, WeatherComponent]
})
export class GeomapComponent implements OnInit {

  map: any;
  geo: any;
  location: [number, number] = [0, 0];
  weather: Weather | undefined;

  constructor(private placeSvc: PlacesService, private weatherService: weatherService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.geo = this.placeSvc.useLocation;
    }, 500);
  }


  ngAfterViewInit() {
    setTimeout(() => {

      this.map = new Map('map').setView(this.geo, 13);
      console.log('✌️this.map --->', this.map);

      marker(this.geo).addTo(this.map).bindPopup("<strong>the house is here</strong>").openPopup();
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.getWeather();
      


    }, 1000);


  }

  getWeather() {
    this.weatherService.getWeather(this.location[0], this.location[1]).subscribe(
      (data: Weather) => {
        this.weather = data;         
      },
      (error) => {
        console.error('Error fetching weather:', error);
      }
    );
  }
}


