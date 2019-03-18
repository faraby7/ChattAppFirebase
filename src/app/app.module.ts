import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {ChatService} from './service/chat.service';
import {environment} from '../environments/environment';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StartchatComponent } from './startchat/startchat.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    StartchatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgbModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
