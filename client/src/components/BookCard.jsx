import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { deleteBookRequest } from "../api/apiClient";

function BookCard({ name, category, branch, author, _id }) {
	const [adminAcess, setAdminAcess] = useState(false);
	useEffect(() => {
		let cookies = Cookies.get();
		if (cookies.Role === "admin") {
			setAdminAcess(true);
		} else {
			setAdminAcess(false);
		}
	}, []);

	async function deleteBook(_id) {
		const res = await deleteBookRequest(_id);
		alert(res);
		window.location.reload(false);
	}

	return (
		<div className='bookCard'>
			<div className='bookCard-header'>{name}</div>
			<div className='bookCard-body'>
				<p>Branch: {branch}</p>
				<p>Author: {author}</p>
				<p>Category: {category}</p>
			</div>
			<div className='bookCard-footer'>
				{adminAcess && (
					<button
						className='bookCard-delete-button'
						onClick={() => deleteBook(_id)}>
						Delete
					</button>
				)}
				<button
					className='bookCard-download-button'
					onClick={() =>
						window.open(`http://localhost:3001/file/${_id}`, "_blank")
					}>
					Download
				</button>
			</div>
		</div>
	);
}

export default BookCard;
