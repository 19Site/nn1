import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UsePipes, ValidationPipe, ValidationError } from '@nestjs/common';

process.env.TS = 'Asia/Hong_Kong';

async function bootstrap() {

	// app
	const app = await NestFactory.create(AppModule);

	// set custom validation exception
	app.useGlobalPipes(

		new ValidationPipe({

			exceptionFactory: (validationErrors: ValidationError[] = []) => {

				return new HttpException({

					ok: false,

					error: 'invalid value of ' + validationErrors[0].property
				}, HttpStatus.BAD_REQUEST);
			},
		})
	);

	// start app
	await app.listen(80);
}

// bootstrap
bootstrap();
