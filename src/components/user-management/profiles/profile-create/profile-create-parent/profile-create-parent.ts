import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ProfilesProvider } from "../../../../../providers/profiles/profiles";
import { AlertProvider } from "../../../../../providers/alert-service/alert-service";
import { UserServiceProvider } from "../../../../../providers/user-service/user-service";

/**
 * Generated class for the ProfileCreateParentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "profile-create-parent",
  templateUrl: "profile-create-parent.html"
})
export class ProfileCreateParentComponent {
  @Output() formParentSubmited = new EventEmitter();
  formParent: FormGroup;
  kinships: any;
  child: any;
  childs: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private profilesProvider: ProfilesProvider,
    private alertProvider: AlertProvider,
    private userService: UserServiceProvider
  ) {
    this.formParent = this.formBuilder.group({
      userId: [this.userService.getUserAtt("_id")],
      kinship: [null, Validators.compose([Validators.required])],
      hasChilds: [false],
      childs: formBuilder.array([this.createChild()]),
      childId: [],
      childContact: []
    });
  }

  createChild(): FormGroup {
    return this.formBuilder.group({
      id: [""],
      contact: [""]
    });
  }

  addItem(): void {
    this.childs = this.formParent.get("childs") as FormArray;
    this.childs.push(this.createChild());
  }

  ngAfterContentInit() {
    this.kinships = this.profilesProvider.getKinships();
  }

  onInputTime(data) {
    if (data.value) {
      this.alertProvider.presentControlledLoader("Buscando por contato...");
      // this.child = this.profilesProvider.getFoundExamplesFake(data.value)[0];

      this.profilesProvider
        .getProfileByContact("student", data.value)
        .then(res => {
          if (res["success"]) {
            this.child = {
              photo: "assets/imgs/placeholder.png",
              ...res["data"]
            };
            console.log(this.child);
            this.formParent.controls["childId"].setValue(
              this.child.profile._id
            );
            this.alertProvider.loading.dismiss();
          }
        })
        .catch(err => {
          console.error(err);
          this.alertProvider.loading.dismiss();
          if (!this.child) {
            this.alertProvider.presentAlert(
              "Usuário não encontrado",
              "Gostaria de enviar um convite? Certifique de que o contato está correto",
              "Ok"
            );
          } else {
            this.formParent.controls["childId"].setValue(this.child.id);
          }
        });
    }
  }

  onSubmit() {
    console.log(this.formParent.value);
    if (this.formParent.valid) {
      this.profilesProvider
        .createProfile("parent", this.formParent.value)
        .then(res => {
          if (res["success"]) {
            this.alertProvider.presentAlert(
              "Perfil Familiar criado",
              "Agora será possível acompanhar o histórico escolar dos seus filhos",
              "Ok"
            );
            this.formParentSubmited.emit();
          }
        })
        .catch(err => {
          console.log(err);
          this.alertProvider.presentAlert(
            "Erro ao criar Perfil Familiar",
            "Não foi possível criar seu pefil agora. Tente novamente mais tarde",
            "OK"
          );
        });
    }
  }
}