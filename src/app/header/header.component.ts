import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
// import { TableComponent } from '../table/table.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog:MatDialog,
    // @Inject(TableComponent) public table:any
    ) { }
  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        width:"30%",
      },
    })
    .afterClosed().subscribe(val=>{
      if(val==="submit"){
        // this.table.getProductList();
      }
    })
   }

  ngOnInit(): void {
  }

}
