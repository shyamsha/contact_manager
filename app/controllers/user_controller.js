const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

function aunthticateByUser(req, res, next) {
	let token = req.header("x-auth");
	let tokendata;
	try {
		tokendata = jwt.verify(token, "sHyaM@143");
	} catch (err) {
		res.send(err);
	}

	User.findOne({
		_id: tokendata.userId,
		"tokens.token": token
	})
		.then(user => {
			req.user = user;
			req.token = token;
			next();
		})
		.catch(err => {
			res.send(err);
		});
}

//create regestration for user
router.post("/register", (req, res) => {
	const user = new User(req.body);
	user
		.save()
		.then(user => {
			res.send({
				user,
				noticed: "sucessfully registered"
			});
		})
		.catch(err => {
			res.send(err);
		});
});
router.post("/login", (req, res) => {
	const body = req.body;
	User.findByCrendntials(body.email, body.password)
		.then(user => {
			return user.generateToken();
			// res.send(user)
		})
		.then(token => {
			//res.header("x-auth", token).send();
			res.send(token);
		})
		.catch(err => {
			res.send(err);
		});
});
router.delete("/logoutall", aunthticateByUser, (req, res) => {
	let token = req.token;
	User.findOne(
		{
			_id: req.user._id
		}
		/* {
                    //     $pull: {
                    //         tokens: {
                    //             token: token
                    //         }
                    //     }
                 }*/
		/* {
                    //     $set: {
                    //         tokens: {
                    //             token: []
                    //         }
                    //     }
                    }*/
	)
		.then(user => {
			for (let i = 0; i < user.tokens.length; i++) {
				if (token == user.tokens[i].token) {
					user.tokens.splice(0);
				}
			}
			user
				.save()
				.then(user => {
					res.send("suceessfully logout from all devices");
				})
				.catch(err => {
					res.send(err);
				});
		})
		.catch(err => {
			res.send(err);
		});
});
router.delete("/logout", aunthticateByUser, (req, res) => {
	let token = req.token;
	User.findOne(
		{
			_id: req.user._id
		}
		/* {
                        $pull: {
                            tokens: {
                                token: token
                            }
                        }
                 }*/
		/* {
                    //     $set: {
                    //         tokens: {
                    //             token: []
                    //         }
                    //     }
                    }*/
	)
		.then(user => {
			for (let i = 0; i < user.tokens.length; i++) {
				if (token == user.tokens[i].token) {
					//console.log(user.token[i])
					user.tokens.splice(i, 1);
				}
			}
			user.save().then(user => {
				res.send("suceessfully logout");
			});
		})
		.catch(err => {
			res.send(err);
		});
});

module.exports = {
	Usersrouter: router
};
