import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { datamodel } from '../register/model';
import { UserprofileComponent } from '../userprofile/userprofile.component';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {
  data: any;
  submitted = false;
  openmodel: boolean = true;
  Age: any;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private modalService: NgbModal,private cd: ChangeDetectorRef) { }

  onSubmit() {

  }

  form: FormGroup = new FormGroup({
    Firstname: new FormControl(''),
    Lastname: new FormControl(''),
    email: new FormControl(''),
    telno: new FormControl(''),
    State: new FormControl(''),
    Country: new FormControl(''),
    Address: new FormControl(''),
    tags: new FormControl(''),
    Subscribe: new FormControl(false),
    ProfileDP: new FormControl(''),
    Age: new FormControl(''),
  });

  ngOnInit(): void {
    this.getUserProfile();
  }


  getUserProfile() {
    this.api.getUser().subscribe(res => {
      this.data = res.slice(-1)[0];
      this.Age = this.data.Age;
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  openUserprofileModal(data: datamodel) {
    this.data.Age = this.Age;
    if (this.openmodel) {
      const modalRef = this.modalService.open(UserprofileComponent);
      modalRef.componentInstance.name = 'Save';
      this.api.RegisterUser(data).subscribe(() => {

      });

    }
  }

  valueChanged(e: any) {
    this.Age = e.target.value;
  }

}
