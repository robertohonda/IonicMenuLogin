import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';

import { HomePage } from '../home/home';

import { UserProvider } from '../../providers/user/user';
import { AlertProvider } from '../../providers/alert/alert';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  /*user is the user that will try to login */
  user: User = {name: '', username: '',email: '', password: '', isLogged:false};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userProv: UserProvider,
    private alert: AlertProvider,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  isValidKey(key:string):boolean {
    if(key=='')
      return false;
    for(let c of key){
      if(c == '.' || c == '$' || c== '#' || c=='[' || c==']')
        return false;
    }
    return true;
  }

  singInComands(){
    this.afAuth.auth.signInWithEmailAndPassword(this.userProv.currentUser.email, this.userProv.currentUser.password).then(data=>{
      this.navCtrl.setRoot(HomePage);
      }).catch(error =>{
        this.alert.showAlert('Error!', error.message);
    });
  }

  signIn(user: User){
    console.log(user);
    try{
      if(!this.isValidKey(user.username))
      {
        this.alert.showAlert('Error!', 'Invalid username!');
        return;
      }
      this.db.database.ref('/users/' + user.username).once('value').then( snapshot => {
        /*tentando encontrar o usuario no db */
        let userFound = snapshot.val();
        if(userFound==null) throw new TypeError('This username is not registered!');
        if(this.user.password!=userFound.password) throw new TypeError('Wrong password!!');
        this.userProv.currentUser = userFound;
      }).then(data => {
        /* atualizar usuario corrente */
        this.singInComands();
        console.log(this.userProv.currentUser);
      }).catch(error =>{
        this.alert.showAlert('Error!', error.message);
      });
    }catch(e){
      this.alert.showAlert('Error!', e.message);
    }
}

}
