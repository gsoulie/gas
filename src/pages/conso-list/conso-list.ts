import { Gas } from './../../providers/gas';
import { Conso } from './../../models/conso';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-conso-list',
  templateUrl: 'conso-list.html'
})
export class ConsoListPage {
  consos: Conso[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private gasService: Gas) {}

  ionViewDidLoad() {
    this.consos = this.gasService.getItems();
  }
  ionViewWillEnter(){
    this.consos = this.gasService.getItems();
/*
    this.consos = [
      {date: "2017-01-01", cost: 21, qte: 16,  trip: 2115, price: 1.409,conso: 7.65},
      {date: "2017-01-01", cost: 21, qte: 16,  trip: 2115, price: 1.409,conso: 8.32},
      {date: "2017-01-01", cost: 21, qte: 16,  trip: 2115, price: 1.409,conso: 8.12}
    ];*/
  }
}
