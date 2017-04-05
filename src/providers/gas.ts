import { Conso } from './../models/conso';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthService } from "./auth";
import 'rxjs/Rx';

@Injectable()
export class Gas {
  consos: Conso[] = [];
 
  constructor(private http: Http, private authService: AuthService) {  }

  /**
   * ADD NEW ENTRY
   * 
   * @param date 
   * @param cost 
   * @param qte 
   * @param trip 
   * @param price 
   */
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
      
    }
    console.log("[--- debug ---] partial = " + partial);
    
    // Add new object in dataset
    this.consos.push(new Conso(date,cost, qte, trip, price, conso, partial));

    // Save dataset into Firebase
    this.save();
  }

  /**
   * REMOVE SELECTED ENTRY FROM DATASET
   * @param index 
   */
  removeItems(index: number){
    this.consos.splice(index, 1); // Remove the selected entry from the dataset
    
    // Save the new dataset into Firebase
    this.save();
  }

  /**
   * GET THE MAX TRIP FROM DATASET
   */
  getMaxTrip() {
    return Math.max.apply(Math,this.consos.map(function(o){return o.trip;}));
  }

  /**
   * SAVE FUNCTION
   */
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
  

  /**
   * STORE DATA INTO FIREBASE
   * @param token 
   */
  storeData(token: string){
    console.log("[--- storedata ---]...");
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .put('https://geca-46351.firebaseio.com/' + userId + '/conso.json?auth=' + token, this.consos)
      .map((response: Response) => {
        return response.json();
      });
  }

  /**
   * FETCH DATA FROM FIREBASE
   * @param token 
   */
  fetchData(token: string){
    const userId = this.authService.getActiveUser().uid;
    //return this.http.get('https://geca-46351.firebaseio.com/' + userId + '/conso.json?&auth=' + token+'&orderBy="price"&equalTo="1.3891290920321184"')
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
