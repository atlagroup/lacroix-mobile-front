import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ENV } from '@environment';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  apiUrl = ENV.API_LOCAL;

  constructor(
    public http: HttpClient,
    public platform: Platform
  ) {
    if (platform.is('cordova')) {
      console.log(ENV.API_ENDPOINT);
      this.apiUrl = ENV.API_ENDPOINT;
    }
  }

  addUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/user', JSON.stringify(data))
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/user').subscribe(data => {
        console.log(data);
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  sendSms(data) {
    console.log('what the fuck?');
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/notification/validation', data).subscribe(res => {
        console.log(res);
        resolve(res);
      }, (err) => {
        console.log(err);
        reject(err);
      })
    })
  }

  checkCode(code) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/notification/codecheck', code).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

}
