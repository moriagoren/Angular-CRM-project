import { Component } from '@angular/core';
import { Employee } from './employee/employee';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  contacts: Array<Employee> = [
    new Employee('Avi Abutbul', 'aabutbul@gmail.com', new Date("December 15, 1985"), "0546985374"),
    new Employee('Sagi Cohen', 'scohen@gmail.com', new Date("June 02, 1992"), "0536498524"),
    new Employee('Shir Levi', 'shir@gmail.com', new Date("march 20, 2003"), "0536742346"),
    new Employee('Dan Suisa', 'dan@gmail.com', new Date("November 12, 1990"), "0583679233"),
    new Employee('Idan Buzaglo', 'idan@gmail.com', new Date("August 22, 2012"), "0583257199"),
    new Employee('Omer Chazan', 'omer@gmail.com', new Date("July 08, 1994"), "0583257199"),
    new Employee('Dor Duani', 'dor@gmail.com', new Date("September 19, 1983"), "0583257199"),
    new Employee('Noa Kirl', 'noa@gmail.com', new Date("may 20, 2020"), "0583257199"),
    new Employee('Neta Bar', 'neta@gmail.com', new Date("October 10, 2014"), "0583257199"),
    new Employee('Rif Neeman', 'rif@gmail.com', new Date("April 13, 1899"), "0523335799"),
    new Employee('Hen Dadon', 'hen@gmail.com', new Date("July 28, 2001"), "0556734297"),
    new Employee('Noam Gidoni', 'noam@gmail.com', new Date("January 11, 2023"), "0507843567"),
    new Employee('Rom Burla', 'rom@gmail.com', new Date("may 24, 1999"), "0508843769"),
    new Employee('Moria Goren', 'moria@gmail.com', new Date("April 18, 2000"), "0506746399"),
    new Employee('Kim Azulay', 'kim@gmail.com', new Date("Septenber 03, 1983"), "0507844321"),
    new Employee('Omer Dror', 'omer@gmail.com', new Date("March 30, 2009"), "0508979453"),
    new Employee('Tom Gur', 'tom@gmail.com', new Date("October 17, 2002"), "0504321675"),
    new Employee('Eden Hason', 'eden@gmail.com', new Date("August 08, 2016"), "0546743252"),
    new Employee('Itay shulz', 'itay@gmail.com', new Date("November 15, 2019"), "0504254567"),
    new Employee('Agam Buchbut', 'agam@gmail.com', new Date("February 31, 1980"), "0508567699")

  ]

  searchForm = new FormGroup({
    name: new FormControl<string | null>('')
  })

  onCancelFilter() {
    window.location.reload()
  }
  msg = ''
  onSearch() {
    const result = this.contacts.filter(contact => contact.name?.toLowerCase()
      .includes(this.searchForm.controls['name'].value?.toLowerCase() as string))
    const resultMsg = () => {
      if (result.length > 0) {
        return result
      } else {
        this.msg = 'No contact that includes this character found'
        return this.contacts
      }
    }
    this.contacts = resultMsg()
  }
}
