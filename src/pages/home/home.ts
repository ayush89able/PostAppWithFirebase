import { GlobalProvider } from './../../providers/global/global';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { PostPage } from './../post/post';
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { AngularFireAuth} from 'angularfire2/auth'
import { AngularFireDatabase} from 'angularfire2/database';






@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  signupForm: any;  //typecasting
  hasError:boolean=false;
  error:string;
  signupFormData:any;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,private afAuth:AngularFireAuth, 
  public alertCtrl: AlertController, public database: AngularFireDatabase,public fireData:FirebaseProvider,
  public global:GlobalProvider, public loadingCtrl:LoadingController) {
    this.initializeSignupForm();
    

  }
  initializeSignupForm() {
    this.signupForm=this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email:['',Validators.compose([Validators.required])],
      password:['',Validators.compose([Validators.required])],

    })
  }

  clickOnSubmit()
  {
    this.afAuth.auth.createUserWithEmailAndPassword(this.signupForm.value.email,this.signupForm.value.password)
    .then(data=>{
      this.signupFormData=data;
      this.global.userID=this.signupFormData.uid;
      console.log(this.signupFormData);
      console.log(this.global.userID); 
      this.presentLoadingDefault();
      this.addUserIdToProvider();
      this.showAlertOnRegister();
      this.navCtrl.push(PostPage );
      
    })
    .catch(error=>{
      console.error(error);
      this.error= error;
      this.hasError=true;
    }) 
  }

  addUserIdToProvider()
   {
    
     var formData=this.signupForm;
     this.fireData.addUserFire(formData).then((data)=>{

   })
   .catch(error=>{

   })
   }

   presentLoadingDefault()
   {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
   }


   showAlertOnRegister(){
    let alert=this.alertCtrl.create({
      title: 'Login Successfull',
      buttons: ['Ok'],      
    });
    alert.present();
  }

}



 
  
