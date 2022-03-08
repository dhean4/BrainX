import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getDatabase, push, ref, remove, set } from "firebase/database";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  productStatus:any=["new","used","Refurblished"];
  ProductForm !: FormGroup;
  actionBtn:string="submit";
  constructor(private formBuilder: FormBuilder, private api:ApiService,
      @Inject(MAT_DIALOG_DATA) public editData :any,
     private dialogRef:MatDialogRef<DialogComponent>) { }
  ngOnInit(): void {
    this.ProductForm=this.formBuilder.group({
      "ProductName": ['', Validators.required],
      "ProductCategories": ['', Validators.required],
      "date": ['', Validators.required],
      "ProductStatus": ['', Validators.required],
      "Price": ['', Validators.required],
      "Comments": ['', Validators.required]
    })
    console.log(this.editData);
    if(this.editData.isEdit){
      this.actionBtn="update product";
      this.ProductForm.controls['ProductName'].setValue(this.editData.data[1].ProductName);
      this.ProductForm.controls['ProductCategories'].setValue(this.editData.data[1].ProductCategories);
      this.ProductForm.controls['date'].setValue(this.editData.data[1].date);
      this.ProductForm.controls['ProductStatus'].setValue(this.editData.data[1].ProductStatus);
      this.ProductForm.controls['Comments'].setValue(this.editData.data[1].Comments);
     this.ProductForm.controls['Price'].setValue(this.editData.data[1].Price);
    }else{
      // console.log(" request invalid ")
    }
  }
  addProduct(){
    const db = getDatabase();
    let body:any = {}
    body = this.ProductForm.value;
    body.date = this.ProductForm.value.date.toISOString();
    console.log(body)
    if(this.editData.isEdit) {
       set(ref(db, 'products/' + this.editData.data[0]), body).then(() => {
            alert('Success');
            this.dialogRef.close('save');
          }).catch((error) => {
             alert(error)
          })
    } else {
    let body:any = {}
    body = this.ProductForm.value;
    // body.date = this.ProductForm.value.date.toISOString();
    console.log(body)
    // if(!this.editData){
      // if(this.ProductForm.valid){
          push(ref(db, 'products'), body).then(() => {
            alert('Success');
            this.dialogRef.close('save');
          }).catch((error) => {
             alert(error)
          })
        }

       
         
        // this.api.postProduct(this.ProductForm.value)
        // .subscribe({
        //   next:(res)=>{
        //     alert("Product is been saved successfully")
        //     this.ProductForm.reset();
        //     this.dialogRef.close('save');
        //     console.log(res)
        //   },
        //   error:()=>{
        //     alert("Error Occured while trying to save product");
        //   }
        // })
    // } 
  // }
  // else{
  //   this.updateData()
  //   }
  }
  updateData(){
    this.api.putProduct(this.ProductForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("product updated successfully")
        this.ProductForm.reset();
        this.dialogRef.close('update')
    },
    error:()=>{
      alert("Error while updating")
    }
  })
  }

}

