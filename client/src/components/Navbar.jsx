import React from "react";

function Navbar() {
	return (
		<div className='Auth-navbar'>
			<p onClick={() => navigate("/")}>&#9735; Back</p>
		</div>
	);
}

export default Navbar;
