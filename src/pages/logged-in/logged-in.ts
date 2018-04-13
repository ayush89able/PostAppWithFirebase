import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import * as _ from "lodash";

@IonicPage()
@Component({
  selector: 'page-logged-in',
  templateUrl: 'logged-in.html',
})
export class LoggedInPage {
  uid:string;
  email:string;

  


  constructor(public navCtrl: NavController, public navParams: NavParams,
  private afAuth:AngularFireAuth) {
    this.uid=afAuth.auth.currentUser.uid;
    this.email=afAuth.auth.currentUser.email;

    // this.fetchPost();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoggedInPage');
    
  }


  // fetchPost()
  // {
  //   return new Promise((resolve,reject)=>{
  //     var dbRef=firebase.database().ref('/users/'+this.uid+'/posts/');
  //     var postsArr=[];
  //     dbRef.on('value',(posts)=>{

  //       if (posts.val() != 'default') {
	// 				postsArr = _.toArray(posts.val());
	// 				if (postsArr.length > 0) {
	// 					console.log('posts Array ', postsArr);
	// 					resolve({ events: postsArr });
	// 				} else {
	// 					reject({ msg: 'No post Found' });
	// 				}
	// 			} else {
	// 				reject({ msg: 'No post Found' });
	// 			}
  //     });
  //   });
    
  // }
}
