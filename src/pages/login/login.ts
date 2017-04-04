import { AuthService } from './../../providers/auth';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService, 
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSignin(form: NgForm){
    console.log("[--- signin ---] ...");
    const loading = this.loadingCtrl.create({
        content: 'Signin...'
    });
    loading.present();

    this.authService.signin(form.value.email, form.value.password)
    .then(data => {
      loading.dismiss();
    })
    .catch(error => {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Erreur Signin',
        message: error.message, 
        buttons: ['Ok']
      });

      alert.present();
    });
  }

  onSignup(form: NgForm){
    console.log("[--- signup ---] ...");
    const loading = this.loadingCtrl.create({
        content: 'Signup...'
    });
    loading.present();

    this.authService.signup(form.value.email, form.value.password)
    .then(data => {
      loading.dismiss();
    })
    .catch(error => {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Erreur Signup',
        message: error.message, 
        buttons: ['Ok']
      });

      alert.present();
    });
  }
}
