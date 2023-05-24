import { Component, OnInit } from '@angular/core';
import { APIserviceService } from '../services/apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Customer } from '../app.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit{
  
  customer: Customer | null=null

  customerDetailsForm= new FormGroup({
    firstName: new FormControl<string|null|undefined>({value:'', disabled: true}),
    lastName: new FormControl<string|null|undefined>({value:'', disabled: true}),
    email: new FormControl<string|null|undefined>({value:'', disabled: true}),
    phone: new FormControl<string|null|undefined>({value:'', disabled: true}),
    address: new FormControl<string|null|undefined>({value:'', disabled: true})
  })

  constructor(private api: APIserviceService, private activeRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activeRoute.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id') as string;
        return this.api.getOneCustomer(id)
      })
    ).subscribe({
      next: (data: Customer)=>{
        this.customer = data
        const firstName = this.customer.firstName
        const lastName = this.customer.lastName
        const email = this.customer.email
        const phone = this.customer.phone
        const address = this.customer.Address
        this.customerDetailsForm.get('firstName')?.setValue(firstName)
        this.customerDetailsForm.get('lastName')?.setValue(lastName)
        this.customerDetailsForm.get('email')?.setValue(email)
        this.customerDetailsForm.get('phone')?.setValue(phone)
        this.customerDetailsForm.get('address')?.setValue(address)
      },
      error: (err)=>console.log(err)
       })
      }

      }
