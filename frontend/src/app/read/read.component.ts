import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from '../apiservice.service'

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  readData:any;
  successmsg:any;

  ngOnInit(): void {
       this.getALLDATA(); 
  }
   
   // getdeleteid

   deleteId(id:any)
   {
     console.log(id,'deleteid==>');
     this.service.deleteDATA(id).subscribe((res)=>{
        console.log(res,'deleteres ==>');
        this.successmsg = res.message;
        this.getALLDATA();
        

     });
   }

 //getalldata
  getALLDATA()
  {
    this.service.getALLDATA().subscribe((res)=>{
      console.log(res,"res==>");
      this.readData = res.data;
    });
  }



}
