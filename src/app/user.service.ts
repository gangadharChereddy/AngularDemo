import { User } from './models/user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    }); 
  }

  get(uid : string) :Observable<User> {
    
   return  this.db.object('/users/'+uid).valueChanges().map(response => response as User);
    
   
  }

}
