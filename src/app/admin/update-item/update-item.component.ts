import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateData } from 'src/app/InterFace/all-interface';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {

  public myForm!: FormGroup;
  public key!: string;
  public updateProduct: any;
  public updateData!: UpdateData;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private db: AngularFireDatabase, private router: Router) {
    this.key = this.activatedRoute.snapshot.params['id']
    this.updateProduct = this.db.database.ref('/products/' + this.key);
    this.updateProduct.on('value', (data: any) => {
      this.updateData = data.val();
      console.log('updateData', this.updateData);
    })
    // console.log('this.key', this.key);
    this.myForm = this.fb.group({
      itemName: [this.updateData.itemName],
      price: [this.updateData.price],
      returnTime: [this.updateData.returnTime]
    })

  }

  ngOnInit(): void {
  }


  public updateItem(): void {
    this.updateProduct.update(this.myForm.value);
    this.router.navigate(['/view-items']);
  }
}
