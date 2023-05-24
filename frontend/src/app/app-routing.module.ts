import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CustomersPageComponent } from './customers-page/customers-page.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: 'custoer', pathMatch: 'full' },
  {
    path: '', canActivateChild: [AuthService],
    children: [
      { path: 'customers', component: CustomersPageComponent },
      {
        path: 'customers', children: [
          { path: 'edit/:id', component: EditCustomerComponent },
          { path: 'details/:id', component: CustomerDetailsComponent }
        ]
      },
      { path: 'contacts', component: ContactsComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
