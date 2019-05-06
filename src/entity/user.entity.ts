import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_employee_info')
export default class Employee {

  @PrimaryGeneratedColumn({name: 'EMPLOYEE_ID'})
  userId: number;

  @Column({ name: 'EMPLOYEE_NAME', type: "varchar", width: 10, nullable: false })
  userName: string;

  @Column({ name: 'OPEN_ID', type: "varchar", width: 40 })
  openId: string;

  @Column({ name: 'EMPLOYEE_PHONE_NO', type: "varchar", width: 15 })
  phoneNo: string;

  @Column({ name: 'EMPLOYEE_NO', type: "varchar", width: 20 })
  userNo: string;

  @Column({ name: 'DEPARTMENT_ID', type: "int" })
  departmentId: number;

  @Column({ name: 'NICK_NAME', type: "varchar", width: 40 })
  nickName: string;

  @Column({ name: 'ROLE_ID', type: "int" })
  roleId: string;

  @Column({ name: 'CREATE_TIME' })
  createTime: Date;
}