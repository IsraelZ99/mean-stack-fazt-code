import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee, employeeInit } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-form-employee',
  template: `
  <form #employeeForm="ngForm" (ngSubmit)="saveEmployee(employeeForm)" enctype="multipart/form-data">
    <input type="hidden" class="form-control" id="_id" [(ngModel)]="employee._id" name="_id">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" id="name" [(ngModel)]="employee.name" name="name">
    </div>
    <div class="mb-3">
      <label for="position" class="form-label">Position</label>
      <input type="text" class="form-control" id="position" [(ngModel)]="employee.position" name="position">
    </div>
    <div class="mb-3">
      <label for="office" class="form-label">Office</label>
      <input type="text" class="form-control" id="office" [(ngModel)]="employee.office" name="office">
    </div>
    <div class="mb-3">
      <label for="salary" class="form-label">Salary</label>
      <input type="number" min="1" max="100000" class="form-control" id="salary" [(ngModel)]="employee.salary" name="salary">
    </div>
    <div class="mb-3">
      <label for="image" class="form-label">Image</label>
      <input type="file" class="form-control" id="image" name="image" (change)="changeImage($event)">
    </div>
    <button type="submit" class="btn btn-success" [disabled]="employeeForm.invalid">Save</button>
  </form>
  
  `,
  styles: [
  ]
})
export class FormEmployeeComponent implements OnChanges {


  public formEmployee: Employee;
  @Input() employee: Employee;
  @Output() employeeSaved: EventEmitter<Employee>;

  constructor(private employeeService: EmployeeService) {
    this.formEmployee = employeeInit;
    this.employee = employeeInit;
    this.employeeSaved = new EventEmitter<Employee>();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['employee'].currentValue);
  }

  public saveEmployee(form: NgForm) {
    form.value.image = this.employee.image;
    if (form.value._id) {
      this.updateEmployee(form);
    } else {
      this.saveNewEmployee(form);
    }
  }

  public changeImage(image: any) {
    this.formEmployee.image = image.target.files[0];
    this.employee.image = image.target.files[0];
  }

  private saveNewEmployee(form: NgForm) {
    if (form.value.image) {
      this.uploadProfileImage(form.value.image).subscribe(fileName => {
        form.value.image = fileName;
        this.employeeService.saveEmployee(form.value).subscribe(employeeCreated => {
          this.employeeSaved.emit(employeeCreated);
          form.reset();
        });
      });
    } else {
      this.employeeService.saveEmployee(form.value).subscribe(employeeCreated => {
        this.employeeSaved.emit(employeeCreated);
        form.reset();
      });
    }
  }

  private uploadProfileImage(image: File): Observable<string> {
    return new Observable<string>(obs => {
      this.employeeService.uploadProfileImage(image).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // console.log(Math.round(100 * event.loaded / event.total));
        } else if (event instanceof HttpResponse) {
          obs.next(event.body.fileName);
        }
      })
    })
  }

  private updateEmployee(form: NgForm) {
    form.value._id = this.employee._id;
    this.employeeService.updateEmployee(form.value).subscribe(employeeUpdated => {
      this.employeeSaved.emit(employeeUpdated);
      form.reset();
      this.employee.image = null;
    });
  }

  public profileImage(fileName: string): string {
    return this.employeeService.getProfileImage(fileName);
  }

}
