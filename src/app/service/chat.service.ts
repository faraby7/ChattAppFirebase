import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firebase: AngularFireDatabase) { }
  chatList: AngularFireList<any>;

  // inistalization form group instance and inside of we have to provide an object
  form = new FormGroup({
    $key: new FormControl(null), // consider like a primary key to uniquely identify each message
    sender: new FormControl(''),
    time: new FormControl(''),
    text: new FormControl('', Validators.required) // i used Validators for make the text is required
  });

// we need to have observable for the list reeltime and inistalisation for the chatlist
  getChat() {
    this.chatList = this.firebase.list('chats');
    return this.chatList.snapshotChanges();
  }

// here we need to push new msg
  insertChat(chat) {
    this.chatList.push({
      sender: chat.sender,
      time: chat.time,
      text: chat.text
    });
  }

}
