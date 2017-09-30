import { Injectable } from '@angular/core';

import { HomePage } from '../../pages/home/home';
import { ListPage } from '../../pages/list/list';

import { AngularFireAuth } from 'angularfire2/auth';
import { UserProvider } from '../user/user';
import { AlertProvider } from '../alert/alert';
import { Events } from 'ionic-angular';

@Injectable()
export class MenuPagesProvider {
  pages: Array<{title: string, component: any}>;

  constructor(
    private afAuth: AngularFireAuth,
    private userProv: UserProvider,
    public events: Events,
    private alert: AlertProvider) {
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
    ];

    /*evento ao logar*/
    afAuth.authState.subscribe(user=>{
      if(user){
        this.userProv.currentUser.isLogged = true;
      }
      else{
        this.userProv.currentUser.isLogged = false;
      }
    });
  }

  logout(){
    console.log("logout!!");
    this.afAuth.auth.signOut()
    .catch(error => {
      this.alert.showAlert('Error!', error.message);
    });
  }
}
