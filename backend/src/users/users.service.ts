import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

	constructor(@InjectRepository(User) private usersRepository: Repository<User>,) { }

	/**
	 * create user
	 */
	async create(createUserDto: CreateUserDto): Promise<User> {

		// create model
		const model = await this.usersRepository.save({

			...createUserDto
		});

		// return model
		return model;
	}

	/**
	 * find all
	 */
	findAll(): Promise<[User[], number]> {

		return this.usersRepository.findAndCount();
	}

	/**
	 * find one
	 */
	findOne(id: number): Promise<User> {

		return this.usersRepository.findOne(id);
	}

	update(id: number, updateUserDto: UpdateUserDto) {

		return `This action updates a #${id} user`;
	}

	/**
	 * remove
	 */
	remove(id: number) {

		return this.usersRepository.softDelete(id);
	}
}
