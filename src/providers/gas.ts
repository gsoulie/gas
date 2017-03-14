import { Conso } from './../models/conso';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthService } from "./auth";
import 'rxjs/Rx';

@Injectable()
export class Gas {
  consos: Conso[] = [];
  test = [{date: "2017-01-01", cost: 21, qte: 16,  trip: 2999, price: 1.409,conso: 0},
      {date: "2017-01-01", cost: 21, qte: 16,  trip: 2655, price: 1.409,conso: 0},
      {date: "2017-01-01", cost: 21, qte: 16,  trip: 2833, price: 1.409,conso: 0}]

  constructor(private http: Http, private authService: AuthService) {  }

  addItem(date: string, cost: number, qte: number, trip: number, price: number){
    let conso = 0;
    let oldMaxTrip = this.getMaxTrip() || 0;
    if(trip > oldMaxTrip){
      let partial = trip - oldMaxTrip;
      if(partial > 0){
        conso = (qte/partial)*100;
      }
    } else {
      //TODO alerte le nouveau trip est inférieur au plus grand trip de la base
    }
    
    this.consos.push(new Conso(date,cost, qte, trip, price, conso));
  }

  getItems(){ return this.consos.slice(); }

  removeItems(index: number){
    this.consos.splice(index, 1);
  }

  getMaxTrip() {
    return Math.max.apply(Math,this.consos.map(function(o){return o.trip;}));
  }
  
  storeData(token: string){
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .put('https://geca-46351.firebaseio.com/' + userId + '/conso.json?auth=' + token, this.consos)
      .map((response: Response) => {
        return response.json();
      });
  }

  fetchData(token: string){
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://geca-46351.firebaseio.com/' + userId + '/conso.json?auth=' + token)
      .map((response: Response) => {
        return response.json();
      })
      .do((consos: Conso[]) => {
        if (consos) {
          this.consos = consos
        } else {
          this.consos = [];
        }
      });
  }
}
