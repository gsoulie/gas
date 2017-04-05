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
  consos: Conso[] = [];
  month: any[] = [{id:1,text:'Janvier'},{id:2,text:'Février'},{id:3,text:'Mars'},{id:4,text:'Avril'},{id:5,text:'Mai'},
                  {id:6,text:'Juin'},{id:7,text:'Juillet'},{id:8,text:'Août'},{id:9,text:'Septembre'},{id:10,text:'Octobre'},
                  {id:11,text:'Novembre'},{id:12,text:'Décembre'}];

  selectedYear: number = 0;
  selectedMonth: number = 0;
  currentDate: Date = new Date();
  currentMonth = this.currentDate.getMonth()+1;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private gasService: Gas,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private actionSheetCtrl: ActionSheetController) {}

  ionViewDidLoad() {this.onRefresh();}
  ionViewWillEnter(){this.onRefresh();}

  /**
   * REFRESH DATASET
   */
  onRefresh(){
    this.consos = [];
    const loading = this.loadingCtrl.create({content: 'Please wait...'});

    // Get data from Firebase
    this.authService.getActiveUser().getToken()
    .then((token: string) => {
      this.gasService.fetchData(token)
      .subscribe(
          (res: Conso[]) => {
            loading.dismiss();
            if (res) {
              // Data filtering switch current month
              var tempMonth = this.currentMonth < 10 ? "0" + this.currentMonth : this.currentMonth;
              for(let i = 0 ; i < res.length; i++){
                if(res[i].date.substring(5,7) == tempMonth){
                  this.consos.push(res[i]);
                  console.log("[--- add ---] " + JSON.stringify(res[i]));
                }
              }
              //this.consos = res;
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

  /**
   * OPEN ACTION MENU
   * @param c 
   * @param i 
   */
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

  /**
   * SELECT MONTH
   * @param _selectedItem 
   */
  onSelectMonth(_selectedItem){
    this.consos = [];
    this.currentMonth = _selectedItem;
    this.onRefresh();
  }
}
