import { Component } from '@angular/core';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

type Person = {
  name: {
    pre: string;
    sur: string;
  };
  age: number;
  eyeColor?: string;
};

@Component({
  imports: [SidebarComponent, NavbarComponent],
  selector: 'app-flight-app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  protected readonly title = 'Hello World!';

  constructor() {
    let alex: Person = {
      name: {
        pre: 'Alex',
        sur: 'Thal',
      },
      age: 40,
      // eyeColor: undefined
    };
    // alex.employeeCount = 16;

    // const company = alex as unknown as Company;

    // company.name = 'Dedalus';
    // company.employeeCount = 16;
    // company.age = 10;

    // console.log(JSON.parse(JSON.stringify(alex)));

    alex = { ...alex, age: 30, name: { ...alex.name, pre: 'Hugo' } };

    const deep = structuredClone(alex);
    deep.age = 20;
    deep.name.pre = 'Deep';

    console.log(alex);
    // console.log(hugo);
    console.log(deep);
  }
}
