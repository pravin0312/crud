import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  getparamid:any;
  constructor(private service:ApiserviceService,private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid)
    {
      console.log(this.getparamid);
    this.service.getSingleData(this.getparamid).subscribe((res)=>{
      console.log(res,'res==>');
      this.userForm.patchValue({
        name:res.data[0].name,
        email:res.data[0].email,
        password:res.data[0].password
      })
    });
    }
    
  }

  userForm = new FormGroup({
    'name':new FormControl('',Validators.required),
    'password':new FormControl('',Validators.required),
    'email':new FormControl('',Validators.required)
  });

  //createnewuser
  userSubmit()
   {
      if(this.userForm.valid)
      {
        console.log(this.userForm.value)
        this.service.createDATA(this.userForm.value).subscribe((res)=>{
          console.log(res,'res==>');
          this.userForm.reset();
          this.successmsg = res.message;
        })
      }
      else{
        this.errormsg = 'all field is required !';
      }

   }  


   //updatedata
    userUpdate()
    {
      console.log(this.userForm.value,'updatedform');

      if(this.userForm.valid)

      {
        this.service.updateDATA(this.userForm.value,this.getparamid).subscribe((res)=>{
            console.log(res,'resupdated')
            this.successmsg = res.message
        });
      }else
      {
        this.errormsg = 'all the field is required';
      }
    }

}
