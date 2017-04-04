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
  }
}
