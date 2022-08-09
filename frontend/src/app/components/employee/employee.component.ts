import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee, employeeInit } from '../../models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employees: Employee[];
  public employeeToUpdate: Employee;

  constructor(private employeeService: EmployeeService) {
    this.employees = [];
    this.employeeToUpdate = employeeInit;
  }

  public ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
  }

  public profileImage(fileName: string): string {
    if (fileName) {
      return this.employeeService.getProfileImage(fileName);
    } else {
      return "assets/img/default-icon.png"
    }
  }

  public formSent(employeeCreated: Employee): void {
    this.getEmployees();
  }

  public assignEmployeeToUpdate(employee: Employee): void {
    const { _id, name, office, position, salary, image } = employee;
    this.employeeToUpdate = { _id, name, office, position, salary, image };
  }

  public removeEmployee(id: any) {
    this.employeeService.deleteEmployee(id).subscribe(() => this.getEmployees());
  }

}
