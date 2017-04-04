import { amountPipe } from './../pipe/amountPipe';
import { datePipe } from './../pipe/datePipe';
import { TabsPage } from './../pages/tabs/tabs';
import { ConsoListPage } from './../pages/conso-list/conso-list';
import { AuthService } from './../providers/auth';
import { Gas } from './../providers/gas';
import { FormPage } from './../pages/form/form';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    FormPage,
    ConsoListPage,
    TabsPage,
    datePipe,
    amountPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp,{tabsPlacement: "top"})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FormPage,
    ConsoListPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Gas, AuthService]
})
export class AppModule {}
