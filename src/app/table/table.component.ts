import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { getDatabase, ref, onValue, remove} from "firebase/database";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['ProductName', 'ProductCategories', 'date', 'ProductStatus', 'Price', 'Comments', 'action'];
  dataSource !: MatTableDataSource<any>;
  public table:any;
  isLoaded: Boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api:ApiService, private dialog:MatDialog) { }

  ngOnInit():void{
    this.getProductList();
  }
  getProductList(){
    this.isLoaded = true;
    const db = getDatabase();
    const starCountRef = ref(db, 'products/');
    onValue(starCountRef, (snapshot) => {
    const data= snapshot.val();
    console.log('data');
    this.dataSource = new MatTableDataSource(Object.entries(data));
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
    this.isLoaded = false;
  });
    // this.api.getProduct()
    // .subscribe({
    //   next:(res)=>{
    //     console.log(res);
    //     this.dataSource=new MatTableDataSource(res);
    //     this.dataSource.paginator=this.paginator;
    //     this.dataSource.sort=this.sort;
    //   },
    //   error:()=>{
    //     alert("error while fetching Response")
    //   }
    // })
  }
  deleteContent(data:any){
    const db = getDatabase();
    remove(ref(db, 'products/' + data[0])).then(() => {
      alert('Success');
    }).catch((error) => {
       alert(error)
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openForm(row:any){
    this.dialog.open(DialogComponent,{
        width:"30%", 
        data: {
          data: row,
          isEdit: true
        }
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getProductList();
      }
    })
  }

}
