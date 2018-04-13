import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { FirebaseProvider} from '../../providers/firebase/firebase';

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

  constructor(public fireData: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllPostsPage');
    this.fireData.fetchAllPosts();
  }

  

}


// fetchAllJobs() {
//   var uid = this.globals.userId;
//   var companyName = this.globals.userData.typeName;
//   return new Promise((resolve, reject) => {
//     var dbRef = firebase.database().ref('/allJobs')
//     dbRef.on('value', (jobs) => {
//       var allJobsArr = _.toArray(jobs.val());
//       console.log('all Jobs on fireData', allJobsArr);
//       this.globals.allJobs = allJobsArr
//       console.log("globals data", this.globals.allJobs)
//       resolve(allJobsArr);
//     })
//   });
// }