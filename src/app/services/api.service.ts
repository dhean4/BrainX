import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn:'root'
})
export class ApiService {
  constructor(private http:HttpClient) {
   }
   postProduct(data:any){
     return this.http.post("https://brainx-796fe-de fault-rtdb.firebaseio.com/productList.json",data)
   }
   getProduct(){
     return this.http.get<any>("https://brainx-796fe-default-rtdb.firebaseio.com/productList");
   }
   putProduct(data:any, id:number){
     return this.http.put<any>("https://brainx-796fe-default-rtdb.firebaseio.com/productList.json/"+id,data);
   }
   deleteProduct(id:number){
     return this.http.delete<any>("https://brainx-796fe-default-rtdb.firebaseio.com/productList.jso/"+id);
   }


}
