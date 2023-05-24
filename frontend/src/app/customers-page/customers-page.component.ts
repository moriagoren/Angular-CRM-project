import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { APIserviceService } from '../services/apiservice.service';
import { Customer } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-page',
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.css'],
})
export class CustomersPageComponent implements OnInit{

 
  addCustomer = new FormGroup({
    firstName: new FormControl('', [
      Validators.required, Validators.pattern('^[a-zA-Z]+$'),
    Validators.minLength(2)]),
    lastName: new FormControl('', [
      Validators.required, Validators.pattern('^[a-zA-Z]+$'),Validators.minLength(2)
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'
      ), 
    ]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(256)]),
    Address: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(320)])
  });

 constructor(private api: APIserviceService, private router: Router){}

 err: string|undefined
  onSubmit(){
  if(this.addCustomer.controls.firstName.errors){
     console.log(this.addCustomer.controls.firstName.errors);
      console.log('errors in First Name');
      this.err='First Name has to be at least 2 letters and only letters'
  }else if(this.addCustomer.controls.lastName.errors){
 console.log(this.addCustomer.controls.lastName.errors);
 console.log('errors in Last Name');
 this.err='Last Name has to be at least 2 letters and only letters'
 }else if(this.addCustomer.controls.phone.errors){
 console.log(this.addCustomer.controls.phone.errors);
 console.log('error in Phone');
 this.err='error in Phone'
 }else if(this.addCustomer.controls.email.errors){
  console.log(this.addCustomer.controls.email.errors);
  console.log('error in Email');
  this.err='error in Email'
 }else if(this.addCustomer.controls.Address.errors){
    console.log(this.addCustomer.controls.Address.errors);
  console.log('error in Address');
  this.err='Address has to be at least 6 characters'
 }else{
  console.log(this.addCustomer.value);
  console.log('Customer added');
   this.api.addCustomer(this.addCustomer.value).subscribe({
  next: (data: Customer)=>{
    console.log(data);
    this.router.navigate(['customers']).then(()=>{
      window.location.reload()
    })
  }
 })
 }


}

customers: Array<Customer> = []
getCustomers(){
  this.api.getCustomers().subscribe({
    next: (data: Array<Customer>) => this.customers=data,
    error: (err)=>console.log(err)
  })
}
ngOnInit() {
  this.getCustomers()
}

onDelete(customer:Customer){
  if(!customer._id){
    return;
  }else{
    this.api.deleteCustomer(customer._id).subscribe({
      next: () => this.getCustomers(),
      error: (err) => console.log(err)
    })
  }
}

}
