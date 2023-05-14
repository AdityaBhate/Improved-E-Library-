import React, { useRef, useState, useEffect } from "react";
import { useOnScreen } from "../useOnScreen";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import B1 from "../assests/Book_lover.png";
import B2 from "../assests/Books_re.png";
import B3 from "../assests/Bookshelves.png";
import B4 from "../assests/Contact_us.png";
import B5 from "../assests/online_reading.png";
import B6 from "../assests/Organized_content.png";
import B7 from "../assests/selection.png";
import B8 from "../assests/Team_page.png";

function Home() {
	//user state
	const [loggedIn, setLoggedIn] = useState("");

	const navigate = useNavigate();
	//all refs
	const HomeRef = useRef();
	const HowitworksRef = useRef();
	const aboutRef = useRef();
	const ContactRef = useRef();

	//onScreenHook
	const homeOnScreen = useOnScreen(HomeRef);
	const howitworksOnScreen = useOnScreen(HowitworksRef);
	const aboutOnScreen = useOnScreen(aboutRef);
	const contactOnScreen = useOnScreen(ContactRef);

	//state of navbar
	const [navbar, setNavbar] = useState();

	//setting navbar state function
	function setNavbarStatefunction() {
		if (homeOnScreen) {
			setNavbar("Home");
		}
		if (howitworksOnScreen) {
			setNavbar("Howitworks");
		}
		if (aboutOnScreen) {
			setNavbar("About");
		}
		if (contactOnScreen) {
			setNavbar("Contact");
		}
	}

	//scrolling function
	const executeScrolltoHomePage = () =>
		HomeRef.current.scrollIntoView({ block: "start", inline: "start" });

	const howitWorksScroll = () => {
		const element = document.getElementById("howitworks-section");
		let pos = element.offsetTop;
		window.scrollTo(0, pos - 100);
	};

	const aboutScroll = () => {
		const element = document.getElementById("aboutus-section");
		let pos = element.offsetTop;
		window.scrollTo(0, pos - 100);
	};

	const contactScroll = () => {
		const element = document.getElementById("contactus-section");
		let pos = element.offsetTop;
		window.scrollTo(0, pos - 100);
	};

	useEffect(() => {
		let cookies = Cookies.get();
		if (cookies.User) {
			setLoggedIn("Enter Library");
		} else {
			setLoggedIn("Log In");
		}
	}, []);

	return (
		<>
			<div className='navbar'>
				<ul className={`navbar-list ${navbar}`}>
					<li
						className='element navbar-home-element'
						onClick={executeScrolltoHomePage}>
						Home
					</li>
					<li
						className='element navbar-howitworks-element'
						onClick={howitWorksScroll}>
						How it Works
					</li>
					<li className='element navbar-about-element' onClick={aboutScroll}>
						About us
					</li>
					<li
						className='element navbar-contact-element'
						onClick={contactScroll}>
						Contact Us
					</li>
				</ul>
			</div>

			<div className='home-section' ref={HomeRef}>
				<div className='home-section-content'>
					<p className='home-section-content-title'>
						<strong id='home-section'>College E-Library</strong>
					</p>
					<p className='home-section-content-desc'>
						College E-library is a Virtual Library for student where they can
						access the book and notes provided by the professor anytime
					</p>
					<button
						className='home-section-login'
						onClick={() =>
							loggedIn === "Log In" ? navigate("/auth") : navigate("/search")
						}>
						{loggedIn}
					</button>
				</div>
				<div className='home-section-image'>
					<img src={B5} />
				</div>
			</div>

			<div className='howitworks-section' ref={HowitworksRef}>
				<div className='howitworks-section-title' id='howitworks-section'>
					How it Works
				</div>
				<div className='howitworks-section-content'>
					<div className='howitworks-section-content-step 1'>
						<img src={B3} />
						<p>
							<span>Step 1</span>
							Open the College E-library website. There are two options for
							logging in to the library, one for students and one for admins. If
							you are an admin, login using your roll number and if you are a
							student, login using your registration number.
						</p>
					</div>
					<div className='howitworks-section-content-step 2'>
						<p>
							<span>Step 2</span>
							If you logged in as a student, there will be an option to find the
							book that you seek. Just type the details of the book you wish to
							find in the respective search bars and the library will filter the
							books relevant to your search and show it in the webpage. After
							that you can choose to read the book of your choice.
						</p>
						<img src={B7} />
					</div>
					<div className='howitworks-section-content-step 3'>
						<img src={B6} />
						<p>
							<span>Step 3</span>
							After using the website, if you want to know more, go to about
							page from the navigation bar in home page. Or else if you want to
							give us feedback, feel free to mail us or contact us which option
							is present in the same navigation bar in home page. Logout after
							using the website. Thank you.
						</p>
					</div>
				</div>
			</div>

			<div className='aboutus-section' ref={aboutRef}>
				<div className='aboutus-section-title' id='aboutus-section'>
					About Us
				</div>
				<div className='aboutus-section-content'>
					<div className='aboutus-section-contnet-img'>
						<img src={B8} />
					</div>
					<div className='aboutus-section-contnet-desc'>
						In today's world everything' is shifting to online so why don't the
						library ,So we thought and try develop the E library for our college
						Through this app , we believe there is a better way to do study/read
						books at anytime. Where the user will able to access the book and
						notes as well as provide (or upload) the material We're obsessively
						passionate about it, and our mission is to help people though this
						application.
						<br />
						And to do this we need your help and support for constantly and
						continue helping students for further in future
					</div>
				</div>
			</div>

			<div className='contactus-section' ref={ContactRef}>
				<div className='contactus-section-title' id='contactus-section'>
					Contact Us
				</div>
				<div className='contactus-section-content'>
					<div className='contactus-section-form'>
						<label>Email</label>
						<input type='email'></input>

						<label className='message-label'>Feedback</label>
						<textarea type='text'></textarea>

						<button className='contactus-section-form-button'>Submit</button>
					</div>
					<div className='contactus-section-img'>
						<img src={B4} />
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
