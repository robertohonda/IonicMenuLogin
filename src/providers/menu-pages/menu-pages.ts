import { Injectable } from '@angular/core';

import { HomePage } from '../../pages/home/home';
import { ListPage } from '../../pages/list/list';

import { AngularFireAuth } from 'angularfire2/auth';
import { AlertProvider } from '../alert/alert';
import { Events } from 'ionic-angular';

@Injectable()
export class MenuPagesProvider {
  pages: Array<{title: string, component: any}>;

  constructor(
    private afAuth: AngularFireAuth,
    public events: Events,
    private alert: AlertProvider) {
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
    ];
  }

  logout(){
    console.log("logout!!");
    this.afAuth.auth.signOut()
    .catch(error => {
      this.alert.showAlert('Error!', error.message);
    });
  }
}
