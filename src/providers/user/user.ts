import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserProvider {
  currentUser: User = {name: '', username: '',email: '', password: '', isLogged: false};

  constructor(private db: AngularFireDatabase,
    public afAuth: AngularFireAuth) {
    console.log('Hello UserProvider Provider');

    
    afAuth.authState.subscribe(user=>{
      if(user){
        this.db.database.ref('/users/').once('value').then( snapshot => {
          snapshot.forEach(element => {
            let tempUser = element.val();
            if(tempUser.email == user.email)
              this.currentUser = tempUser;
          });
        }).then(data => {this.currentUser.isLogged = true
          console.log(this.currentUser);
        });
      }
      else{
        this.currentUser.isLogged = false;
      }
    });

  }

}
