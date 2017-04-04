import { AuthService } from './../providers/auth';
import { LoginPage } from './../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { Component,ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;// = TabsPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;  // référencer la navigation
  
  constructor(platform: Platform, private authService: AuthService) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //StatusBar.backgroundColorByHexString("#DA032C");
      Splashscreen.hide();
    });

    firebase.initializeApp({apiKey: "AIzaSyAhI4b0Q3yRWqTsGXHDV8zLzn6sWRok5t0",authDomain: "geca-46351.firebaseapp.com"});
    console.log("[--- Authenticated ---] " + this.isAuthenticated);
		firebase.auth().onAuthStateChanged(user => {
			if(user) {
        console.log("[--- ok ---] ");
				this.isAuthenticated = true;
				this.rootPage = TabsPage;	// redirecting on the good page
			} else {
        console.log("[--- Non Authenticated ---] ");
				this.isAuthenticated = false;
				this.rootPage = LoginPage;	// redirecting on the good page
			}
		});
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
  }

  // logout function
	onLogout(){
		this.authService.logout();
		this.nav.setRoot(LoginPage);
	}
}
