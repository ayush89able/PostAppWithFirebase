import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { FirebaseProvider} from '../../providers/firebase/firebase';
import { GlobalProvider} from '../../providers/global/global';

/**
 * Generated class for the AllPostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-posts',
  templateUrl: 'all-posts.html',
})
export class AllPostsPage {
  allPostData:any;


  constructor(public fireData: FirebaseProvider,public global:GlobalProvider) {
    this.fireData.fetchAllPosts();
    this.getPosts();
    
   
    
  }

  onClick()
  {
    console.log(this.global.allPosts);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllPostsPage');
  }

  getPosts()
  {
      this.fireData.fetchAllPosts().then((data)=>{
      this.allPostData=this.global.allPosts;
      console.log(this.allPostData);
      // console.log(this.allPostData[0].PostTitle);
      // console.log(this.allPostData[0].PostBody);
     


      })
  }  

}


