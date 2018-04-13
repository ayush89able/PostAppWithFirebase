import { GlobalProvider } from './../global/global';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as _ from "lodash";



/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  postId:any;
  userId:any; 
  userName:any;

  constructor( public global:GlobalProvider) {
    console.log('Hello FirebaseProvider Provider');
  }

    addPostFire(formData) {
		return new Promise((resolve, reject) => {
		
			var dbRef = firebase.database().ref('/users/' + this.global.userID).child('Posts').push();

      var uniquePostKey = dbRef.key;
      // this.postId = uniquePostKey;
      this.global.postID=uniquePostKey;

			console.log("Unique post key=", dbRef.key)
			// Add post Data to the user
			dbRef.set({
				PostTitle: formData.value.postTitle,
        PostBody: formData.value.postBody,
        UserId: this.global.userID,
        PostId: uniquePostKey,
			}, () => {

				// Add allPosts Globally
				var gDbRef = firebase.database().ref('/allPosts/').child(uniquePostKey);
				  gDbRef.set({
					PostTitle: formData.value.postTitle,
          PostBody: formData.value.postBody,
          Name: this.global.userNAME,
          UserId: this.global.userID,
				}, () => {
					resolve({ success: true });

				});
			});
		});
  }
  
      addUserFire(formData)
      {
      return new Promise((resolve, reject) => {
      var dbRef = firebase.database().ref('/users/' + this.global.userID)
      console.log("user key=", dbRef.key)
			// Add userData to the user
			dbRef.set({
			  Name: formData.value.name,
        UserId: this.global.userID,
        Email: formData.value.email,
   
			}, () => {
			});
		});
  }
  
  getuserName()
  {
    return new Promise((resolve,reject)=>{
      var uid = this.global.userID;
      console.log(uid);
      var dbRef= firebase.database().ref('/users/' + uid)
      dbRef.once('value',(Name)=>{
      this.userName=_.toArray(Name.val());
      console.log(this.userName);
      resolve( this.userName);
      

      }).catch(error=>{
        reject(error);
      });
    });
  }

  fetchAllPosts()
  {
    return new Promise((resolve,reject)=>{
      var uid=this.global.userID;
      var dbref=firebase.database().ref('/users/'+uid+'/Posts/')
      dbref.on('value',(posts)=>{
        var allPostsArr=_.toArray(posts.val());
        console.log('all posts on fireData',allPostsArr);
        this.global.allPosts=allPostsArr;
        console.log('global data',this.global.allPosts);
        resolve(allPostsArr);
      })
    });
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