import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIserviceService } from '../services/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Customer } from '../app.component';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  customer: Customer | null = null

  editCustomer = new FormGroup({
    firstName: new FormControl<string | null | undefined>('', [
      Validators.required, Validators.pattern('^[a-zA-Z]+$'),
      Validators.minLength(2)]),
    lastName: new FormControl<string | null | undefined>('', [
      Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(2)
    ]),
    phone: new FormControl<string | null | undefined>('', [
      Validators.required,
      Validators.pattern(
        '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'
      ),
    ]),
    email: new FormControl<string | null | undefined>('', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(256)]),
    Address: new FormControl<string | null | undefined>('', [Validators.required, Validators.minLength(6), Validators.maxLength(320)])
  })

  constructor(private api: APIserviceService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id') as string;
        return this.api.getOneCustomer(id)
      })
    ).subscribe({
      next: (data: Customer) => {
        this.customer = data
        const firstName = this.customer.firstName
        const lastName = this.customer.lastName
        const email = this.customer.email
        const phone = this.customer.phone
        const address = this.customer.Address
        this.editCustomer.get('firstName')?.setValue(firstName)
        this.editCustomer.get('lastName')?.setValue(lastName)
        this.editCustomer.get('email')?.setValue(email)
        this.editCustomer.get('phone')?.setValue(phone)
        this.editCustomer.get('Address')?.setValue(address)
      },
      error: (err) => console.log(err)
    })
  }

  onSubmit() {
    if (this.editCustomer.invalid) {
      return;
    } else {
      console.log(this.editCustomer.value);
      console.log('Customer edited');
      this.api.editCustomer(this.customer?._id as string, this.editCustomer.value).subscribe({
        next: (data: Customer) => {
          console.log(data);
          this.router.navigate(['customers'])
        }
      })
    }
  }

  onCancel() {
    this.editCustomer.get('firstName')?.setValue(this.customer?.firstName)
    this.editCustomer.get('lastName')?.setValue(this.customer?.lastName)
    this.editCustomer.get('email')?.setValue(this.customer?.email)
    this.editCustomer.get('phone')?.setValue(this.customer?.phone)
    this.editCustomer.get('Address')?.setValue(this.customer?.Address)
    this.router.navigate(['customers'])
  }
}
