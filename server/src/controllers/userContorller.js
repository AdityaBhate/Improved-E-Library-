import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";

//handling logins and sign-ups

//login
export const UserLogin = async (req, res) => {
	const {
		username,
		password
	} = req.body;
	UserModel.findOne({
		username: username
	}).exec(async (err, doc) => {
		if (!doc) {
			return res.json({
				Auth: "User not found"
			});
		}
		if (await bcrypt.compare(password, doc.password)) {
			res.cookie("User", doc.id, {
				// httpOnly: true,
				maxAge: 8640000
			})
			res.cookie("Role", doc.role, {
				// httpOnly: true,
				maxAge: 8640000
			})
			console.log(req.headers.cookie)
			return res.json({
				Auth: `Success`,
				user: doc
			});
		} else {
			res.json({
				Auth: "username or password incorrect"
			});
		}
	});
};

//sign-up
export const UserSignup = async (req, res) => {
	const {
		username,
		password,
		role
	} = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = new UserModel({
		username: username,
		password: hashedPassword,
		role: role
	});
	try {
		await newUser.save()
		res.send(newUser)
	} catch (error) {
		console.log(error);
	}
};

export const getUser = (req, res) => {
	const _id = req.params.id;
	UserModel.findOne({
		_id: _id
	}, async (err, doc) => {
		res.json(doc);
	});
};