import { GlobalProvider } from './../../providers/global/global';
import { HomePage } from './../home/home';
import { PostPage } from './../post/post';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm:any;
  error:string;
  hasError:boolean=false;
  
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth:AngularFireAuth,
  public formBuilder: FormBuilder, public alertCtrl: AlertController, public global:GlobalProvider,
  public loadingCtrl:LoadingController) {
    this.initialize();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  initialize(){
    this.loginForm=this.formBuilder.group({
      email:['',Validators.compose([Validators.required])],
      password:['',Validators.compose([Validators.required])]

    })
  }


  clickOnLogin()
  {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email,this.loginForm.value.password)
    .then(data=>{

      this.global.userID=data.uid;
      this.showAlertOnLogin();
      console.log("got some data",data);
      this.presentLoadingDefault();
      this.navCtrl.push(PostPage);
      
    })
    .catch(error=>{
      console.log("got error",error);
      this.error = error;
      this.hasError=true;
    })
  }


  showAlertOnLogin(){
    let alert=this.alertCtrl.create({
      title: 'Login Successfull',
      buttons: ['Ok'],      
    });
    alert.present();
  }

  goToRegistationPage()
  {
    this.navCtrl.push(HomePage);
  }


  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }
  
}
