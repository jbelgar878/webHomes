import { Component, inject } from '@angular/core';
import { HousingService } from '../../housing.service';
import { HousingLocation } from '../../housinglocation';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from '../details/details.component';
import { marker, Map, tileLayer } from 'leaflet';

@Component({
  selector: 'app-mapas',
  standalone: true,
  imports: [CommonModule, DetailsComponent],
  template:`
    
    <div id="map"></div>
  `,
  styleUrl: './mapas.component.css'
})
export class MapasComponent{

   public location?: [number, number];
   housingService = inject(HousingService);
   housingLocation: HousingLocation | undefined;
   route: ActivatedRoute = inject(ActivatedRoute);
   map:any;


  constructor(){
     const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
       this.housingLocation = housingLocation;
       this.setView();
    });
  }

  setView() {
    if (this.housingLocation) {
      this.location = [this.housingLocation.latitude, this.housingLocation.longitude];
      this.map = new Map('map').setView(this.location, 13);
      marker(this.location).addTo(this.map).bindPopup("<strong>the house is here</strong>").openPopup();  
        tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
      
    }
  }
    
}
 


  


