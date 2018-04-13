import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllPostsPage } from './all-posts';

@NgModule({
  declarations: [
    AllPostsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllPostsPage),
  ],
})
export class AllPostsPageModule {}
