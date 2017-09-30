import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AlertProvider } from '../../providers/alert/alert';
import { LoginPage } from '../login/login';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  user: User = {name: '', username: '',email: '', password: '', isLogged: false};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private alert: AlertProvider){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  isValidKey(key:string):boolean {
    if(key == '') return false;
    
    for(let c of key){
      if(c == '.' || c == '$' || c== '#' || c=='[' || c==']')
        return false;
    }
    return true;
  }

  registerComands(){
    this.db.list('/users').set(this.user.username, this.user);
    this.afAuth.auth.signOut();
    this.alert.showAlert('Info!', 'Registration Succeed!');
    this.navCtrl.setRoot(LoginPage);
  }

  register(){
    try{
      if(!this.isValidKey(this.user.username))
      {
        this.alert.showAlert('Error!', 'Invalid username!');
        return;
      }

      this.db.database.ref('/users/' + this.user.username).once('value').then( snapshot => {
        /*check if username already exist*/
        var username = (snapshot.val() && snapshot.val().username);
        console.log(username);
        if(username!=null) throw new TypeError('This username already exists!');
        }).then(data =>{
          /*ok, this username not existe yet*/
          this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
          .then(data => {
            this.registerComands();
          })
        .catch(error =>{
          /*error in createUserWithEmailAndPassword */
          this.alert.showAlert('Error!', error.message);
        });

      }).catch(error =>{
        
        this.alert.showAlert('Error!', error.message);
      });
    }catch(e){
      /*some error */
      this.alert.showAlert('Error!', e.message);
    }
  }

}
