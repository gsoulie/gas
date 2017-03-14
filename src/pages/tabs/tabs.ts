import { ConsoListPage } from './../conso-list/conso-list';
import { FormPage } from './../form/form';
import { Component } from '@angular/core';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  formPage = FormPage;
  consoListPage = ConsoListPage;
}
