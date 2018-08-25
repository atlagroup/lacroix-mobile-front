import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ModalController,
  Events
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HomePage } from "../home/home";
import { Keyboard } from "@ionic-native/keyboard";
import { UserProvider } from "../../providers/user/user";

/**
 * Generated class for the UserBasicInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-user-basic-info",
  templateUrl: "user-basic-info.html"
})
export class UserBasicInfoPage {
  userInfo: any;
  form: FormGroup;
  isReady: boolean;
  step = "user";
  statusUser: boolean;
  statusProfile: boolean;
  showFooter = true;
  showProfiles: Array<any>;
  showStart = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserProvider,
    public platform: Platform,
    public key: Keyboard,
    public modalCtrl: ModalController,
    public events: Events
  ) {
    this.events.subscribe("app:showstart", value => {
      this.showStart = value;
    })
    this.events.subscribe("app:userinfoupdated", userinfo => {
      if (userinfo["statusProfile"]) {
        this.statusProfile = false;
      }
      if (userinfo["step"]) this.step = userinfo["step"];
    });
    const user = this.navParams.get("user");
    const _cellphone = this.navParams.get("cellphone");
    this.userInfo = { cellphone: _cellphone, ...user };
  }

  openModal(page) {
    let profileModal = this.modalCtrl.create(
      page.component,
      { profile: page },
      { enableBackdropDismiss: true }
    );
    profileModal.onDidDismiss(data => {
      if (data) {
        if (data["profileType"]) {
          this.step = "profile";
        }
      }
    });
    profileModal.present();
  }

  start() {
    this.navCtrl.setRoot(
      HomePage,
      {},
      {
        animate: true,
        direction: "forward"
      }
    );
  }
}
