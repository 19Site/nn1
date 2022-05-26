import type { NextPage } from 'next';

import { useState, useEffect } from 'react';

import Axios from 'axios';

import Head from 'next/head';

import Image from 'next/image';

import Link from 'next/link';

import Swal from 'sweetalert2';

import type { CreateUserReturnDto } from '../../../backend/src/users/dto/create-user-return.dto';

import type { FindUsersReturnDto } from '../../../backend/src/users/dto/find-users-return.dto';

import type { User } from '../../../backend/src/users/entities/user.entity';

const Page: NextPage = () => {

	// is loading users
	const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);

	// users
	const [users, setUsers] = useState<User[]>([]);

	/**
	 * get users
	 */
	const getUsers = async () => {

		// url
		const url = '/api/v1/users';

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
			setUsers(resData.data);
		}
	};

	// component did mount
	useEffect(() => {

		getUsers();
	}, []);

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

							List
						</h4>

						<div className='mt-4'>

							<Link

								href={{

									pathname: '/users/new'
								}}
							>

								<a className='btn btn-success'>

									New
								</a>
							</Link>
						</div>

						{ // users

							users.length > 0 ? (

								<table className='table mt-4'>

									<thead>

										<tr>

											<th>

												Id
											</th>

											<th>

												Email
											</th>

											<th>

												Name
											</th>
										</tr>
									</thead>

									<tbody>

										{ // users

											users.map((user, idx) => {

												// render
												return (

													<tr key={'users-index-' + idx}>

														<td>

															<Link

																href={{

																	pathname: '/users/' + user.id
																}}
															>

																<a className='text-decoration-none'>

																	#{user.id}
																</a>
															</Link>
														</td>

														<td>

															{user.email}
														</td>

														<td>

															{user.name}
														</td>
													</tr>
												);
											})
										}
									</tbody>
								</table>
							) : (

								<div className='text-center py-5 text-secondary'>

									no data
								</div>
							)
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Page;