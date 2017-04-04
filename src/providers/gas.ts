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
    let oldMaxTrip = this.getMaxTrip() < 0 ? 0 : this.getMaxTrip();
    let partial = trip;
    console.log("[--- debug ---] oldMaxTrip = " + oldMaxTrip + " / trip = " + trip);
    if(trip > oldMaxTrip){
      partial = trip - oldMaxTrip;
      if(partial > 0){
        conso = (qte/partial)*100;
      }
    } else {
      //TODO alerte le nouveau trip est inférieur au plus grand trip de la base
    }
    console.log("[--- debug ---] partial = " + partial);
    this.consos.push(new Conso(date,cost, qte, trip, price, conso, partial));

    this.save();
  }

  getItems(){ 
    return this.consos.slice();
  }

  removeItems(index: number){
    this.consos.splice(index, 1);
    this.save();
  }

  getMaxTrip() {
    return Math.max.apply(Math,this.consos.map(function(o){return o.trip;}));
  }

  save(){
    this.authService.getActiveUser().getToken()
    .then((token: string) => {
      this.storeData(token)
      .subscribe(
        () => {},
        error => {
          console.log("[--- error ---] " + error.json().error);
        }
      );
    });
  }
  
  storeData(token: string){
    console.log("[--- storedata ---]...");
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
