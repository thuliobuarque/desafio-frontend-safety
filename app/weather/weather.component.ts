import { Component }        from '@angular/core';
import { JSONP_PROVIDERS }  from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


import { WeatherService } from './weather.service';

@Component({
	selector: 'gs-weather',
	templateUrl: 'app/weather/weather.component.html',
	providers: [JSONP_PROVIDERS, WeatherService],
})

export class WeatherComponent {
	isVisible: boolean = false;
	// items: Observable <string[]>;
	  photo:string;
	icon:string;

	 private searchTermStream = new Subject<string>();

	constructor (private weatherService: WeatherService) {
  this.photo = 'assets/background/sky_main.jpg';

	}

	search(term: string) {this.isVisible = false;  this.searchTermStream.next(term);}

	items = this.searchTermStream
    .debounceTime(1000)
    .distinctUntilChanged()
    .switchMap((term: string) => this.weatherService.search(term))
    .subscribe(data => {this.isVisible = true; console.log(data); this.toChange(data.query.results.channel.item.forecast[0].text); this.items =  data});;

		toChange(icon: string){

		 if(icon == 'Scattered Thunderstorms'){
				this.photo = 'assets/background/47.jpg';
		 }
		 if(icon == 'Cloudy'){
		 this.photo = 'assets/background/26.jpg';
	}
	if(icon == 'Mostly Cloudy'){
		 this.photo = 'assets/background/28.jpg';
	}
	if(icon == "Partly Cloudy"){
		 this.photo = 'assets/background/30.jpg';
	}
	if(icon == 'Thunderstorms'){
		 this.photo = 'assets/background/4.jpg';
	 }
	if(icon == 'Rain'){
		 this.photo = 'assets/background/12.jpg';
	}
	if(icon == 'Sunny'){
		 this.photo = 'assets/background/32.jpg';
	}
	if(icon == 'Mostly Sunny'){
		 this.photo = 'assets/background/27.jpg';
	}
	if(icon == 'Snow'){
		 this.photo = 'assets/background/16.jpg';
	}
	if(icon == 'Showers' || icon == 'Scattered Showers'){
		 this.photo = 'assets/background/60.jpg';
	}
		 return icon;
		}

}
