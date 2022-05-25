import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';

import { FindUsersReturnDto } from './dto/find-users-return.dto';

import { CreateUserReturnDto } from './dto/create-user-return.dto';

@Controller('users')
export class UsersController {

	constructor(private readonly usersService: UsersService) { }

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	async create(@Body() createUserDto: CreateUserDto): Promise<CreateUserReturnDto> {

		// try
		try {

			// create model
			const model = await this.usersService.create(createUserDto);

			// prepare dto
			const dto = new CreateUserReturnDto();

			dto.ok = true;

			dto.data = model;

			// return dto
			return dto;
		}

		// error
		catch (err) {

			// prepare dto
			const dto = new CreateUserReturnDto();

			dto.ok = false;

			dto.error = err.message;

			// throw error
			throw new HttpException(dto, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * find all
	 */
	@Get()
	async findAll(): Promise<FindUsersReturnDto> {

		// get models
		const [models, total] = await this.usersService.findAll();

		// prepare dto
		const dto = new FindUsersReturnDto();

		dto.ok = true;

		dto.data = models;

		dto.total = total;

		// return dto
		return dto;
	}

	/**
	 * find one
	 */
	@Get(':id')
	async findOne(@Param('id') id: string): Promise<FindUsersReturnDto> {

		// get model
		const model = await this.usersService.findOne(+id);

		// prepare dto
		const dto = new FindUsersReturnDto();

		dto.ok = true;

		dto.data = model ? [model] : [];

		dto.total = model ? 1 : 0;

		// return dto
		return dto;
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

		return this.usersService.update(+id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {

		return this.usersService.remove(+id);
	}
}
