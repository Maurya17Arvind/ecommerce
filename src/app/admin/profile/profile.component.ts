import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userData: any;
  public myForm!: FormGroup;
  public userPath: any;
  public hide: boolean = false;

  constructor(private db: AngularFireDatabase, private fb: FormBuilder) {
    this.userPath = this.db.database.ref('/users/' + localStorage.getItem('customerId'));
    this.userPath.on('value', (data: any) => {
      this.userData = data.val();
    });

    this.myForm = this.fb.group({
      name: [this.userData?.name || ''],
      email: [this.userData?.email || ''],
      area: [this.userData?.area || ''],
      address: [this.userData?.address || ''],
      pinCode: [this.userData?.pinCode || ''],
      mobileNo: [this.userData?.mobileNo || '']
    });

  }

  ngOnInit(): void {
  }

  public showUserData(): void {
    this.hide = true;
  }

  public updateProfile(): void {
    const updateProfileData = {
      name: this.myForm.value.name,
      email: this.myForm.value.email,
      area: this.myForm.value.area,
      address: this.myForm.value.address,
      pinCode: this.myForm.value.pinCode,
      mobileNo: this.myForm.value.mobileNo
    }
    this.userPath.update(updateProfileData);
  }

}
