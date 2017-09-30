import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertProvider {

  constructor(public alertCtrl: AlertController) {
    console.log('Hello AlertProvider Provider');
  }

  showAlert(title: string, message: string, btnMessage?: string) {
    if(!btnMessage)
        btnMessage = 'OK';
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [btnMessage]
    });
    alert.present();
  }

}
