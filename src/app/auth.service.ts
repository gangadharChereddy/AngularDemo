import { User } from './models/user';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthService { 
  user$: Observable<firebase.User>;

  constructor(private afAuth:AngularFireAuth,private route :ActivatedRoute, router :Router,
    private userService:UserService) {
     this.user$ = this.afAuth.authState;
     this.afAuth.auth.getRedirectResult().then((result) => {
      if(result.user){
        this.userService.save(result.user);
        let returnUrl=localStorage.getItem('returnUrl');
        console.log(returnUrl);
        router.navigateByUrl(returnUrl);
      }
    }).catch((err) => {
      console.log(err);
    }); 

   }

  login(){
   let returnUrl= this.route.snapshot.queryParamMap.get('returnUrl') || '/';
   localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
     }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<User>{

    return this.user$.switchMap(user => {
     if(user) return this.userService.get(user.uid);

     return Observable.of(null);
    });
  }

}
