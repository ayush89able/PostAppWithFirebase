import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { FormBuilder, Validators } from '@angular/forms';
import * as firebase from "firebase";
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { GlobalProvider } from './../../providers/global/global';
import {AllPostsPage} from '../all-posts/all-posts'

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  fbdata:any;
  postForm:any;
  userID:any;
  NameData:any;
  username:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
   public alertCtrl: AlertController, public fireData: FirebaseProvider, public global:GlobalProvider) {
    this.initialize();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
    this.getName();
    
    // this.fbdata=this.navParams.get('postData');
    // console.log(this.fbdata.email);
    // console.log(this.fbdata.uid);
    // this.userID=this.fbdata.uid;
    
    // this.namedata=this.navParams.get('name');
    // console.log(this.namedata);

    
  }

  initialize()
  {
    this.postForm=this.formBuilder.group({
      postTitle:['',Validators.compose([Validators.required])],
      postBody:['',Validators.compose([Validators.required])]
    })
  }

  addPostIdToProvider( ){

  var formaData =  this.postForm
  this.fireData.addPostFire( formaData).then((data)=>{
    
  })
  .catch(error=>{

  })
  this.showAlertOnPost();
} 

  getName()
  { 
this.fireData.getuserName().then((data)=>{
  this.NameData=data;
  console.log(this.NameData);
  this.username=this.NameData[1];
  this.global.userNAME=this.username;
  console.log('Name',this.username);
  console.log('Name',this.global.userNAME);
  })
  }

  showAlertOnPost(){
    let alert=this.alertCtrl.create({
      title: 'Posted Successfull',
      buttons: ['Ok'],      
    });
    alert.present();
  }

  onClickWatchPosts()
  {
    this.navCtrl.push(AllPostsPage);
  }

}

