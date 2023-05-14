import { useState, useEffect } from "react";
import { searchBookRequest } from "../api/apiClient";
import axios from "axios";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";

function Search() {
	const [searchResult, setSearchResult] = useState([]);
	const [searchName, setSearchName] = useState("");
	const [searchBranch, setSearchBranch] = useState("");
	const [searchCategory, setSearchCategory] = useState("");
	const [deleteBookId, setDeleteBookId] = useState("");

	async function handleSearchSubmit(event) {
		event.preventDefault();
		const res = await searchBookRequest(
			searchName,
			searchBranch,
			searchCategory
		);
		setSearchResult(res);
		console.log(searchResult);
	}

	return (
		<>
			<Navbar />
			<div className='search-container'>
				<h1 className='search-headline'>Library Search</h1>

				<div className='search-searchForm'>
					<div>
						<div className='search-name'>
							<input
								id='search_by_name'
								type='text'
								placeholder='search by name...'
								onChange={(e) => setSearchName(e.target.value)}
							/>
						</div>

						<div className='searcn-addtionaloptions'>
							<select
								name='SearchBranch'
								id='search_options'
								onChange={(e) => setSearchBranch(e.target.value)}>
								<option value=''>Select Branch</option>
								<option value='CSE'>CSE</option>
								<option value='Mechanical'>Mechanical</option>
								<option value='Architecture'>Architecture</option>
								<option value='Electrical'>Electrical</option>
								<option value='BioEngineering'>BioEngineering</option>
							</select>

							<select
								name='searhCategroy'
								id='searhCategroy'
								onChange={(e) => setSearchCategory(e.target.value)}>
								<option value=''>Select category</option>
								<option value='Book'>Book</option>
								<option value='Article'>Article</option>
								<option value='Notes'>Notes</option>
								<option value='Past Paper'>Past Paper</option>
							</select>
						</div>

						<button type='submit' onClick={handleSearchSubmit}>
							Search
						</button>
					</div>
				</div>

				<p className='tip'>For all books, just do a blank search</p>

				<hr
					style={{
						backgroundColor: "#000000",
						height: "0.5px",
						width: "90%",
					}}
				/>

				<div className='SearchResult-div'>
					{searchResult.map((data, index) => {
						return (
							<BookCard
								name={data.name}
								category={data.category}
								branch={data.branch}
								author={data.author}
								_id={data._id}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default Search;

//category, subject, author
