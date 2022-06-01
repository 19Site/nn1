import type { NextPage } from 'next';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import Axios from 'axios';

import Head from 'next/head';

import Image from 'next/image';

import Link from 'next/link';

import Swal from 'sweetalert2';

import type { LoginDto } from '../../backend/src/actions/dto/login.dto';

import type { LoginReturnDto } from '../../backend/src/actions/dto/login-return.dto';

const Page: NextPage = props => {

	// get router
	const router = useRouter();

	// is loading users
	const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);

	// email
	const [email, setEmail] = useState('');

	// password
	const [password, setPassword] = useState('');

	/**
	 * login
	 */
	const login = async () => {

		// url
		const url = '/api/v1/actions/login';

		// login dto
		const param = {} as LoginDto;

		param.email = email;

		param.password = password;

		// request
		let res: any = await Axios.post(url, param);

		// res data
		const resData: LoginReturnDto = res.data;

		// error
		if (!resData.ok) {

			// fire log
			return Swal.fire({

				title: 'Error',

				icon: 'error',

				text: resData.error
			});
		}

		// success
		else {

			// get tokens
			const { accessToken, refreshToken } = resData;

			// redirect
			router.replace({

				pathname: '/users'
			});
		}
	};

	// render
	return (

		<div className='container py-4'>

			<div className='row'>

				<div className='col'>

					<h3>

						Login
					</h3>

					<div className='border p-4 rounded mt-4'>

						<div className=''>

							<label className='form-label'>

								Email
							</label>

							<input

								type='text'

								className='form-control'

								value={email}

								onChange={

									evt => {

										const value = evt.target.value;

										setEmail(value);
									}
								}
							/>
						</div>

						<div className='mt-4'>

							<label className='form-label'>

								Password
							</label>

							<input

								type='password'

								className='form-control'

								value={password}

								onChange={

									evt => {

										const value = evt.target.value;

										setPassword(value);
									}
								}
							/>
						</div>

						<div className='mt-4'>

							<button

								className='btn btn-success'

								onClick={evt => login()}
							>

								Login
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Page;