import { Context } from 'koa';
import { Controller, Param, Body, Get, Post, Put, Patch, Delete, Ctx } from "routing-controllers";
import { getRepository, Repository } from 'typeorm';
import userEntity from '../entity/user.entity';
import Response from '../utils/Response';

@Controller('/user')
export class UserController {

  @Get('/')
  async getAll(@Ctx() ctx: Context) {
    // Get the user repository from TypeORM.
    const userRepo: Repository<userEntity> = getRepository(userEntity);

    try {
      // Find the requested user.
      const user = await userRepo.find();
      return new Response(ctx, user).success();
    } catch (error) {
      console.error(error);
      return new Response(ctx, error.message).fail();
    }
  }

  @Get('/:userId')
  async getOne(@Param("userId") userId: number, @Ctx() ctx: Context) {
    // Get the user repository from TypeORM.
    const userRepo: Repository<userEntity> = getRepository(userEntity);

    try {
      // Find the requested user.
      const user = await userRepo.findOne({userId});
      return new Response(ctx, user).success();
    } catch (error) {
      console.error(error);
      return new Response(ctx, error.message).fail();
    }
  }

  @Post('/add')
  async addOne(@Ctx() ctx: Context, @Body({ required: true }) req: any) {
    // Get the user repository from TypeORM.
    const userRepo:Repository<userEntity> = getRepository(userEntity);

    // Create our new user.
    const user: userEntity|any = userRepo.create(req);

    // Persist it to the database.
    await userRepo.save(user);

    // return
    return new Response(ctx, user).success();
  }

  @Delete("/:userId")
  async deleteOne(@Param("userId") userId: number, @Ctx() ctx: Context) {
    // Get the user repository from TypeORM.
    const userRepo:Repository<userEntity> = getRepository(userEntity);

    // Find the requested user.
    const user = await userRepo.findOne({userId});

    // If the user doesn't exist, then throw a 404.
    // This will be handled upstream by our custom error middleware.
    if (!user) {
      return new Response(ctx, 'not found').fail();
    }

    // Delete our user.
    await userRepo.delete(user);

    // return
    return new Response(ctx, user).success();
  }

  @Patch('/edit/:userId')
  async edit(
    @Param("userId") userId: number, @Ctx() ctx: Context, @Body({ required: true }) req: any) {
    // Get the user repository from TypeORM.
    const userRepo:Repository<userEntity> = getRepository(userEntity);

    // Find the requested user.
    const user:userEntity = await userRepo.findOne(userId);

    // If the user doesn't exist, then throw a 404.
    // This will be handled upstream by our custom error middleware.
    if (!user) {
      return new Response(ctx, 'not found').fail();
    }

    // Merge the existing user with the new data.
    // This allows for really simple partial (PATCH).
    const updatedUser = await userRepo.merge(user, req);

    // Save the new data.
    userRepo.save(updatedUser);

    // return
    return new Response(ctx, updatedUser).success();
  }
}