import React, { useEffect } from "react";
import P1 from "../assests/Page_not_found.png";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
	const navigate = useNavigate();

	useEffect(() => {
		console.log("auth", auth);
	}, []);
	return (
		<>
			<div className='Auth-navbar'>
				<p onClick={() => navigate("/")}>&#9735; Back</p>
			</div>
			<div className='pagenotfound-section'>
				<img src={P1} />
				<p>Oops! Wrong Page 🙃</p>
			</div>
		</>
	);
}

export default PageNotFound;
