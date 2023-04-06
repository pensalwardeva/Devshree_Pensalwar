import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  title = 'first-product';
 
  constructor(private modalService: NgbModal) { }

  // Method to open the registration form as a popups
  openRegistrationModal() {
    const modalRef = this.modalService.open(RegisterComponent);
    modalRef.componentInstance.name = 'Register';
  }


  close() {
    this.modalService.dismissAll(RegisterComponent);
  }
 

}

