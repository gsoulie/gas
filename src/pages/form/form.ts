import { TestPage } from './../test/test';
import { Gas } from './../../providers/gas';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'page-form',
  templateUrl: 'form.html'
})
export class FormPage {
  conso = {totalMois: "0.00€", consoMoy: "8.46L", total: "128.43€", prixMoyen: "1.409€"};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private gasService: Gas) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
    console.log("max trip " + this.gasService.getMaxTrip());
  }

  onAddItem(form: NgForm){
    let val = form.value;
    let price: number = 0;
    let qte = parseFloat(val.qte);
    let cost = parseFloat(val.cost);
    if(val.qte > 0){
      //price = parseFloat(cost/qte).toFixed(3);
      price = cost/qte;
    }
    
    this.gasService.addItem(val.date, val.cost, val.qte, val.trip, price);
    form.reset();
  }

  openTest(){
    this.navCtrl.push(TestPage);
  }

}
