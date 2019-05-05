import * as Koa from 'koa';
import * as Router from 'koa-router';
import { getRepository, Repository } from 'typeorm';
import employeeEntity from '../entity/employee.entity';
import * as HttpStatus from 'http-status-codes';

const routerOpts: Router.IRouterOptions = {
  prefix: '/employee',
};

const router: Router = new Router(routerOpts);

router.get('/', async (ctx:Koa.Context) => {
  // Get the employee repository from TypeORM.
  const employeeRepo:Repository<employeeEntity> = getRepository(employeeEntity);
  
  // Find the requested employee.
  const employee = await employeeRepo.find();

  // Respond with our employee data.
  ctx.body = {
    data: employee,
  };
});

router.get('/:employee_id', async (ctx:Koa.Context) => {
  // Get the employee repository from TypeORM.
  const employeeRepo:Repository<employeeEntity> = getRepository(employeeEntity);

  // Find the requested employee.
  const employee = await employeeRepo.findOne(ctx.params.employee_id);

  // If the employee doesn't exist, then throw a 404.
  // This will be handled upstream by our custom error middleware.
  if (!employee) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  // Respond with our employee data.
  ctx.body = {
    data: employee,
  };
});

router.post('/', async (ctx:Koa.Context) => {
  // Get the employee repository from TypeORM.
  const employeeRepo:Repository<employeeEntity> = getRepository(employeeEntity);

  // Create our new employee.
  const employee: employeeEntity|any = employeeRepo.create(ctx.request.body);

  // Persist it to the database.
  await employeeRepo.save(employee);

  // Set the status to 201.

  // Respond with our employee data.ctx.status = HttpStatus.CREATED;
  ctx.body = {
    data: employee,
  };
});

router.delete('/:employee_id', async (ctx:Koa.Context) => {
  // Get the employee repository from TypeORM.
  const employeeRepo:Repository<employeeEntity> = getRepository(employeeEntity);

  // Find the requested employee.
  const employee = await employeeRepo.findOne(ctx.params.employee_id);

  // If the employee doesn't exist, then throw a 404.
  // This will be handled upstream by our custom error middleware.
  if (!employee) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  // Delete our employee.
  await employeeRepo.delete(employee);

  // Respond with no data, but make sure we have a 204 response code.
  ctx.status = HttpStatus.NO_CONTENT;
});

router.patch('/:employee_id', async (ctx:Koa.Context) => {
  // Get the employee repository from TypeORM.
  const employeeRepo:Repository<employeeEntity> = getRepository(employeeEntity);

  // Find the requested employee.
  const employee:employeeEntity = await employeeRepo.findOne(ctx.params.employee_id);

  // If the employee doesn't exist, then throw a 404.
  // This will be handled upstream by our custom error middleware.
  if (!employee) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  // Merge the existing employee with the new data.
  // This allows for really simple partial (PATCH).
  const updatedEmployee = await employeeRepo.merge(employee, ctx.request.body);

  // Save the new data.
  employeeRepo.save(updatedEmployee);

  // Respond with our employee data.// Response with the updated content.
  ctx.body = {
    data: updatedEmployee,
  };
});

export default router;