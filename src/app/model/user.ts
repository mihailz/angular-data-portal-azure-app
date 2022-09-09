export class User {
  name: string;
  surname: string;
  age: number;
  email: string;
  isUpdating?: boolean;

  constructor(
    name: string,
    surname: string,
    age: number,
    email: string,
    isUpdating?: boolean
) {
    this.name = name
    this.surname = surname
    this.age = age
    this.email = email,
    this.isUpdating = isUpdating
  }

}
