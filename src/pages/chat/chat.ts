import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatShowPage } from '../chat-show/chat-show';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  items = [
    {name: 'Eliana Meneses', avatar:'assets/imgs/placeholder.png', lastMessage: 'Vou procurar uma mesa', lastMessageTime: '1:12 pm'},
    {name: 'Tânia', avatar:'assets/imgs/placeholder.png', lastMessage: 'Falei seu nome na rádio', lastMessageTime: '1:12 pm'},
    {name: 'Ana Kaffa', avatar:'assets/imgs/placeholder.png', lastMessage: 'Tem como integrar a BNCC?', lastMessageTime: '1:12 pm'},
    {name: 'Gisele Florentim', avatar:'assets/imgs/placeholder.png', lastMessage: 'E o módulo administrativo?', lastMessageTime: '1:12 pm'},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
    this.navCtrl.push(ChatShowPage,{item},{
      animate: true,
      direction: 'forward'
    })
  }

  onInput(event) {

  }

}
