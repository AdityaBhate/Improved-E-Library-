import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Navbar from "../components/Navbar";

function Upload() {
	const [file, setFile] = useState();
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [branch, setBranch] = useState("");
	const [uploadedBy, setUploadedBy] = useState("");
	const [author, setAuthor] = useState("");

	function handleFileChange(event) {
		setFile(event.target.files[0]);
	}

	function handleSubmit(event) {
		const url = "http://localhost:3001/content/upload";
		event.preventDefault();

		let cookies = Cookies.get();
		setUploadedBy(cookies.User);
		const formData = new FormData();
		formData.append("file", file);
		formData.append("name", name.toLowerCase());
		formData.append("category", category);
		formData.append("branch", branch);
		formData.append("uploadedBy", uploadedBy);
		formData.append("author", author);
		formData.append("downloadCount", 0);

		axios.post(url, formData).then((response) => {
			alert("Book Uploaded!");
			setFile("");
			setName("");
			setCategory("");
			setBranch("");
			setUploadedBy("");
			setAuthor("");
		});
	}

	const hiddenFileInput = React.useRef(null);

	const handleClick = (event) => {
		hiddenFileInput.current.click();
	};

	return (
		<>
			<Navbar />
			<div className='upload-page'>
				<h1>Upload Content</h1>

				<div className='upload-uploadForm'>
					<label>Name</label>
					<input type='text' onChange={(e) => setName(e.target.value)} />

					<label>Category</label>
					<select
						name='category'
						id='category'
						onChange={(e) => setCategory(e.target.value)}>
						<option value=''>Select category</option>
						<option value='Book'>Book</option>
						<option value='Article'>Article</option>
						<option value='Notes'>Notes</option>
						<option value='Past Paper'>Past Paper</option>
					</select>

					{/* <label>Branch</label>
					<input type='text' onChange={(e) => setBranch(e.target.value)} /> */}
					<label>Branch</label>
					<select
						name='branch'
						id='searhCategroy'
						onChange={(e) => setBranch(e.target.value)}>
						<option value=''>Select Branch</option>
						<option value='CSE'>CSE</option>
						<option value='Mechanical'>Mechanical</option>
						<option value='Architecture'>Architecture</option>
						<option value='Electrical'>Electrical</option>
						<option value='BioEngineering'>BioEngineering</option>
					</select>

					<label>Author</label>
					<input type='text' onChange={(e) => setAuthor(e.target.value)} />

					<label className='custom-file-upload' onClick={handleClick}>
						File
					</label>
					<input
						type='file'
						id='fileUpload'
						ref={hiddenFileInput}
						onChange={handleFileChange}
					/>

					<button type='submit' onClick={handleSubmit}>
						Upload
					</button>
				</div>
			</div>
		</>
	);
}

export default Upload;

// async function handleSubmit() {
// 	let cookies = Cookies.get();
// 	setUploadedBy(cookies.User);
// 	const res = await uploadBookRequest(
// 		file,
// 		name,
// 		category,
// 		subject,
// 		uploadedBy,
// 		author
// 	);
// 	if (res === "Success") {
// 		alert("Book uploaded Sucessfully");
// 	} else {
// 		alert("Error occured while uploading book");
// 	}
// }
