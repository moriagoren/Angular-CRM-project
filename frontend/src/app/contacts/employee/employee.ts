export class Employee {
    name:string|null
    email:string
    birthday: Date
    phone: string
    constructor(name:string, email:string, birthday:Date, phone:string){
        this.name = name,
        this.email = email,
        this.birthday = birthday,
        this.phone = phone
    }
}
