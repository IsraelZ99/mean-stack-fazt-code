import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AvatarModule } from "ngx-avatar";
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { FormEmployeeComponent } from './components/form-employee/form-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    FormEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AvatarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
