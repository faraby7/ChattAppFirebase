import { Component, OnInit } from '@angular/core';
import history from '../../assets/history.json';
import {ChatService} from '../service/chat.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  submitted: boolean;
  showSuccessMessage: boolean;
  sendervar: string;
  timevar: any;
  formControls = this.chatService.form.controls;
  private options: any;
  chatsArray = [];
  chatHistorique: any;
  vv: any;

  ngOnInit() {
    if (sessionStorage.getItem('sender') === null) {
      $('#exampleModalCenter').modal('show');

    }
    // chat example from file json
    this.chatHistorique = history.chat;
    // getItem from session Storage
    this.sendervar = sessionStorage.getItem('sender');

    this.chatService.getChat().subscribe(
        list => {
          this.chatsArray = list.map(item => {
            return {
              $key: item.key,
              ...item.payload.val()
            };
          });
        });
  }
  onSubmit() {

    this.submitted = true;
    if (this.chatService.form.valid) {
      this.chatService.form.value.sender = sessionStorage.getItem('sender');
      this.timevar = new Date(Date.now()); // Date timestap  we need to converte
      this.chatService.form.value.time = this.timevar.toISOString();
      this.chatService.insertChat(this.chatService.form.value);

// for the OK message topic
      if (sessionStorage.getItem('sender') != 'ADMIN') {
        this.chatService.form.value.sender = 'ADMIN';
        this.chatService.form.value.text = 'OK';
        this.timevar = new Date(Date.now());
        this.chatService.form.value.time = this.timevar.toISOString();
        this.chatService.insertChat(this.chatService.form.value);

      }
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);

      this.submitted = false;
      this.chatService.form.reset();
    }
  }

  SaveName(name: string): void {
    sessionStorage.setItem('sender', name );
    this.ngOnInit();
  }

  ExtractDate(dateSend: string) {
    dateSend = dateSend.toString();
    return  dateSend.substring(11, 16);
  }

 }
