import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatComponent} from './chat/chat.component';
import {StartchatComponent} from './startchat/startchat.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: '', component: StartchatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
