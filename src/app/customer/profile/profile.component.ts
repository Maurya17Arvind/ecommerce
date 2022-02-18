import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public myForm!: FormGroup;
  public userPath: any;
  public userData: any;
  public addressForm!: FormGroup;

  constructor(private db: AngularFireDatabase, private fb: FormBuilder) {

    this.updateFormData();
  }



  ngOnInit(): void {
    this.updateFormData();

  }
  public updateFormData(): void {
    this.userPath = this.db.database.ref('/users/' + localStorage.getItem('customerId'));
    this.userPath.on('value', (userData: any) => {
      this.userData = userData.val();
    });

    this.myForm = this.fb.group({
      name: [this.userData?.name || ''],
      area: [this.userData?.area || ''],
      address: [this.userData?.address || ''],
      pinCode: [this.userData?.pinCode || ''],
      mobileNo: [this.userData?.mobileNo || '']
    });
  }

  public updateName(): void {
    const updateUserData = {
      address: this.myForm.value.address,
      area: this.myForm.value.area,
      email: this.userData.email,
      mobileNo: this.userData.mobileNo,
      name: this.myForm.value.name,
      pinCode: this.myForm.value.pinCode,
      role: this.userData.role
    }
    this.userPath.update(updateUserData);
  }
}
