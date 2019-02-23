const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;
const userSchema = new Schema({
	username: {
		type: String,
		minlength: 3,
		requrired: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function(value) {
				return validator.isEmail(value);
			},
			massage: function() {
				return "invalid email fromat";
			}
		}
	},
	password: {
		type: String,
		minlength: 4,
		maxlength: 128,
		requrired: true,
		validate: {
			validator: function(value) {
				validator.isEmpty(value);
			}
		}
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	tokens: [
		{
			token: {
				type: String
			}
		}
	]
});
userSchema.pre("save", function(next) {
	if (this.isNew) {
		bcrypt.genSalt(10).then(salt => {
			bcrypt.hash(this.password, salt).then(hashedpassword => {
				this.password = hashedpassword;
				next();
			});
		});
	} else {
		next();
	}
});
userSchema.statics.findByCrendntials = function(email, password) {
	//const User = this
	return User.findOne({
		email
	})
		.then(user => {
			if (user) {
				return bcrypt.compare(password, user.password).then(result => {
					if (result) {
						return new Promise((resolve, reject) => {
							resolve(user);
						});
						// return Promise.resolve(user)
					} else {
						return new Promise((resolve, reject) => {
							reject("invalid email or password");
						});
						// return Promise.reject('invalid email or passward')
					}
				});
			} else {
				return new Promise((resolve, reject) => {
					reject("invalid email or password");
				});
				// return Promise.reject('invalid email or password')
			}
		})
		.catch(err => {
			return new Promise((resolve, reject) => {
				reject(err);
			});
			//return Promise.reject(err)
		});
};
userSchema.methods.generateToken = function() {
	const user = this;
	const tokenData = {
		userId: user._id
	};
	const token = jwt.sign(tokenData, "sHyaM@143");
	user.tokens.push({
		token
	});
	return user
		.save()
		.then(user => {
			return token;
		})
		.catch(err => {
			return err;
		});
};
userSchema.statics.findByToken = function(token) {
	//let code write on express also but write here is moduler code
	let tokenData;
	try {
		tokenData = jwt.verify(token, "sHyaM@143");
	} catch (err) {
		return Promise.reject(err);
	}

	return User.findOne({
		_id: tokenData.userId,
		"tokens.token": token
	})
		.then(user => {
			return Promise.resolve(user);
		})
		.catch(err => {
			return Promise.reject(err);
		});
};
const User = mongoose.model("User", userSchema);
module.exports = {
	User
};
