import { Injectable } from '@angular/core';
import { User } from '../../models/user';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  currentUser: User = {name: '', username: '',email: '', password: '', isLogged: false};

  constructor() {
    console.log('Hello UserProvider Provider');

  }

}
