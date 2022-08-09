export interface Employee {
     _id?: string;
     name: string;
     position: string;
     office: string;
     salary: number;
     image?: any;
}

export const employeeInit = { name: "", office: "", position: "", salary: 1 };