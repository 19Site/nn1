import type { NextPage } from 'next';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import Axios from 'axios';

import Head from 'next/head';

import Image from 'next/image';

import Link from 'next/link';

import Swal from 'sweetalert2';

import type { CreateUserReturnDto } from '../../../backend/src/users/dto/create-user-return.dto';

import type { FindUsersReturnDto } from '../../../backend/src/users/dto/find-users-return.dto';

import type { RemoveUserReturnDto } from '../../../backend/src/users/dto/remove-user-return.dto';

import type { User } from '../../../backend/src/users/entities/user.entity';

const Page: NextPage = props => {

	// get router
	const router = useRouter();

	// is loading users
	const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);

	// user
	const [user, setUser] = useState<User>({} as User);

	// get id
	const id = router.query.id as string;

	/**
	 * get user
	 */
	const getUser = async () => {

		// not numeric
		if (!/^\d+$/.test(id)) {

			return;
		}

		// url
		const url = '/api/v1/users/' + id;

		// request
		const res = await Axios.get(url);

		// res data
		const resData: FindUsersReturnDto = res.data;

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

			// set user
			setUser(resData.data[0]);
		}
	};

	/**
	 * save user
	 */
	const saveUser = async () => {

		// url
		let url = '/api/v1/users';

		// request
		let res: any = null;

		// check is numeric (update)
		if (/^\d+$/.test(id)) {

			// url
			url = url + '/' + id;

			// res
			res = await Axios.patch(url, {

				...user
			});
		}

		// create
		else if (/^new$/.test(id)) {

			// res
			res = await Axios.post(url, {

				...user
			});
		}

		// else
		else {

			// fire log
			return Swal.fire({

				title: 'Success',

				icon: 'success',

				text: 'Invalid route'
			});
		}

		// res data
		const resData: CreateUserReturnDto = res.data;

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

			// get id
			const id = resData.data.id;

			// redirect
			router.replace({

				pathname: '/users/' + id
			});

			// fire log
			return Swal.fire({

				title: 'Success',

				icon: 'success',

				text: 'User saved successfully'
			});
		}
	};

	/**
	 * delete user
	 */
	const deleteUser = async () => {

		// url
		const url = '/api/v1/users/' + id;

		// request
		const res = await Axios.delete(url);

		// res data
		const resData: RemoveUserReturnDto = res.data;

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

			// redirect
			router.replace({

				pathname: '/users'
			});
		}
	};

	// component did mount
	useEffect(() => {

		if (router.isReady) {

			getUser();
		}
	}, [router.isReady, id]);

	// render
	return (

		<div className='container py-4'>

			<div className='row'>

				<div className='col'>

					<h3>

						<Link

							href={{

								pathname: '/users'
							}}
						>

							<a className='text-decoration-none'>

								Users
							</a>
						</Link>
					</h3>

					<div className='border p-4 rounded mt-4'>

						<h4>

							New
						</h4>

						<div className='mt-4'>

							<label className='form-label'>

								Email
							</label>

							<input

								type='text'

								className='form-control'

								value={user && user.email ? user.email : ''}

								onChange={

									evt => {

										const value = evt.target.value;

										setUser({

											...user,

											email: value
										});
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

								value={user && user.password ? user.password : ''}

								onChange={

									evt => {

										const value = evt.target.value;

										setUser({

											...user,

											password: value
										});
									}
								}
							/>
						</div>

						<div className='mt-4'>

							<label className='form-label'>

								Name
							</label>

							<input

								type='text'

								className='form-control'

								value={user && user.name ? user.name : ''}

								onChange={

									evt => {

										const value = evt.target.value;

										setUser({

											...user,

											name: value
										});
									}
								}
							/>
						</div>

						<div className='mt-4'>

							<button

								className='btn btn-success'

								onClick={evt => saveUser()}
							>

								Save
							</button>

							{ // upate

								/^\d+$/.test(id) ? (

									<button

										className='btn btn-danger ms-4'

										onClick={evt => deleteUser()}
									>

										Delete
									</button>
								) : undefined
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Page;