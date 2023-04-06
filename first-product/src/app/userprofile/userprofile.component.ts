import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { ApiService } from '../api.service';
import { datamodel } from '../register/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  data: undefined | any;
  imageUrl: any;
  profileDP: any;
  sharedData: any;

  constructor(private api: ApiService,private modalService: NgbModal, private cd: ChangeDetectorRef) {
    
   }

   openRegistrationModal() {
    const modalRef = this.modalService.open(ProfileEditComponent);
    modalRef.componentInstance.name = 'Register';
  }

   url =
    'https://img.icons8.com/ios/100/000000/contract-job.png';
    uploadFile(event:any) {
      let reader = new FileReader(); // HTML5 FileReader API
      let file = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        reader.readAsDataURL(file);
  
        // When file uploads set it to file formcontrol
        reader.onload = () => {
          this.imageUrl = reader.result;
          this.profileDP = this.imageUrl;
        }
        // ChangeDetectorRef since file is loading outside the zone
        this.cd.markForCheck();        
      }
    }


  ngOnInit() {
    this.getUserProfile() ;
  }

  getUserProfile() {
    this.api.getUser().subscribe(res => {
      this.data = res.slice(-1)[0];
      this.profileDP = this.data.ProfileDP;
    })
  }


}

