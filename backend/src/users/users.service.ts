import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

	constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

	/**
	 * create user
	 */
	create(createUserDto: CreateUserDto): Promise<User> {

		// create
		return this.usersRepository.save({

			...createUserDto
		});
	}

	/**
	 * find all
	 */
	findAll(): Promise<[User[], number]> {

		// find all
		return this.usersRepository.findAndCount();
	}

	/**
	 * find one
	 */
	findOne(id: number): Promise<User> {

		// find one
		return this.usersRepository.findOne(id);
	}

	/**
	 * update model
	 */
	update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

		// update
		return this.usersRepository.save({

			...updateUserDto,

			id: id
		});
	}

	/**
	 * remove
	 */
	async remove(id: number): Promise<number> {

		// model
		const model = await this.findOne(+id);

		// model not found
		if (!model) {

			throw new Error('model not found');
		}

		// delete
		this.usersRepository.softDelete(id);

		// return
		return id;
	}
}
