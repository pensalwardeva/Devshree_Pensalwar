import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserprofileComponent } from '../userprofile/userprofile.component';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { datamodel } from './model';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


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
  submitted = false;
  ProfileDP: any;
  Age: any = 0;
  openmodel: boolean = false;
  selectedFiles?: FileList;
  currentFile?: File;
  imageInfos?: Observable<any>;
  preview: any;
  message: string ='';
  progress: number=0;
  @Input() imageUrl: any = "https://i.ibb.co/fDWsn3G/buck.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  sharedData: string ='';

  constructor(private formBuilder: FormBuilder, private api: ApiService, private modalService: NgbModal,private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        Firstname: ['', Validators.required],
        Lastname: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        ProfileDP: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        telno: ['', [Validators.required]],
        State: ['', [Validators.required]],
        Country: ['', [Validators.required]],
        Address: ['', [Validators.required]],
        tags: ['', [Validators.required]],
        Subscribe: ['', [Validators.required]],
        Age: ['', [Validators.required]]

      })

  
  }


  onFileSelected(event :any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.form.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }
  
  
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      this.openmodel = false
      return;

    }
    this.openmodel = true;

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  valueChanged(e: any) {
    this.Age = e.target.value;
  }


  openUserprofileModal(data: datamodel) {
    data.ProfileDP = this.imageUrl;
    if (this.openmodel) {
      const modalRef = this.modalService.open(UserprofileComponent);
      modalRef.componentInstance.name = 'Submit';
      this.api.RegisterUser(data).subscribe(() => {

      });

    }
  }

  close() {
    this.modalService.dismissAll(UserprofileComponent);
  }

}



