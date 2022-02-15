import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss']
})
export class AddItemsComponent implements OnInit {

  public myForm!: FormGroup;
  public itemName!: string;
  public price!: string;
  public returnTime!: string;

  constructor(private fb: FormBuilder, private db: AngularFireDatabase, private toaster: ToastrService) {
    this.myForm = this.fb.group({
      itemName: '',
      price: '',
      returnTime: ''
    })
  }

  ngOnInit(): void {
  }

  public addItem(): void {
    // this.itemName = this.myForm.value.itemName;
    // this.price = this.myForm.value.price;
    // this.returnTime = this.myForm.value.returnTime
    // this.authAuthenticationService.addItems(this.itemName, this.price, this.returnTime)
    let items = this.db.database.ref('/products/');
    items.push(this.myForm.value);
    console.log('items', items);
    // this.toaster.success('Add item Successfuly...');
    this.myForm.reset();
  }

}
