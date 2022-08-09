import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly URL_API = 'http://192.168.100.89:4000/api/employees';

  constructor(private httpClient: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.URL_API);
  }

  public saveEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.URL_API, employee);
  }

  public uploadProfileImage(image: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', image);
    const req = new HttpRequest('POST', `${this.URL_API}/profile`, formData, {
      reportProgress: true,
      responseType: 'json'
    })
    return this.httpClient.request(req);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.URL_API}/${employee._id}`, employee);
  }

  public deleteEmployee(id: string): Observable<Employee> {
    return this.httpClient.delete<Employee>(`${this.URL_API}/${id}`);
  }

  public getProfileImage(fileName: string): string {
    return `${this.URL_API}/profile/image/${fileName}`;
  }

  public getPreviewProfileImage(fileName: string): Observable<any> {
    return this.httpClient.get(`${this.URL_API}/profile/image/${fileName}`);
  }

}
