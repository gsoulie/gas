import { AuthService } from './../../providers/auth';
import { Gas } from './../../providers/gas';
import { Conso } from './../../models/conso';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ActionSheetController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-conso-list',
  templateUrl: 'conso-list.html'
})
export class ConsoListPage {
  consos: Conso[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private gasService: Gas,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private actionSheetCtrl: ActionSheetController) {}

  ionViewDidLoad() {
    this.onRefresh();
    //this.consos = this.gasService.getItems();
  }

  onRefresh(){
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.authService.getActiveUser().getToken()
    .then((token: string) => {
      this.gasService.fetchData(token)
      .subscribe(
          (res: Conso[]) => {
            loading.dismiss();
            if (res) {
              this.consos = res;
            } else {
              this.consos = [];
            }
          },
          error => {
            loading.dismiss();
            alert("Error");
          }
        );
    });  
  }

  ionViewWillEnter(){
    this.consos = this.gasService.getItems();
  }

  onAction(c: Conso, i: number){
    let actionSheet = this.actionSheetCtrl.create({
     // title: 'Action',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            let confirm = this.alertCtrl.create({
              title: 'Are you sure to delete this entry ?',
              message: 'This entry will be definitively deleted',
              buttons: [
                {
                  text: 'Cancel',
                  handler: () => {
                    console.log('Disagree clicked');
                  }
                },
                {
                  text: 'Delete',
                  handler: () => {
                    this.gasService.removeItems(i);
                    this.onRefresh();
                  }
                }
              ]
             });
              confirm.present();
          }
        },{
          text: 'Edit',
          icon: 'create',
          handler: () => {
              
            
            }
          }
      ]
    });
    actionSheet.present().then(() => {
      this.onRefresh();
    });
  }
}
