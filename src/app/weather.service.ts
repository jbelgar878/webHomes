import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from './weather';

@Injectable({
  providedIn: 'root'
})
export class weatherService {
  private urlApi = 'http://api.weatherapi.com/v1';
  private key = " 8620f06396af4926bb5210213241702"

  constructor(private httpClient: HttpClient) { }

  getWeather(lat: number, lon:number){
    let url = `${this.urlApi}/current.json?key=${this.key}&q=${lat},${lon}`;
    return this.httpClient.get<Weather>(url);
  
  }
}



