import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_employee_info')
export default class Employee {

  @PrimaryGeneratedColumn({name: 'EMPLOYEE_ID'})
  employeeId: number;

  @Column({ name: 'EMPLOYEE_NAME', type: "varchar", width: 200 })
  employeeName: string;
}