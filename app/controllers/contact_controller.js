const express = require("express");
const router = express.Router();

const { Contact } = require("../models/contact");
const { User } = require("../models/user");

function aunthnticate(req, res, next) {
	const token = req.header("x-auth");

	if (token) {
		User.findByToken(token)
			.then(user => {
				req.user = user;
				req.token = token;
				next();
			})
			.catch(err => {
				res.send(err);
			});
	} else {
		res.send("token must be provided");
	}
}

router.get("/contacts", aunthnticate, (req, res) => {
	Contact.find({
		user: req.user._id
	})
		.then(contacts => {
			if (contacts.length != 0) {
				res.send(contacts);
			} else {
				res.send("contacts are empty");
			}
		})
		.catch(err => {
			res.send(err);
		});
});
router.post("/contacts", aunthnticate, (req, res) => {
	const body = req.body;
	const contact = new Contact(body);
	contact.user = req.user._id;
	contact
		.save()
		.then(contact => {
			res.send(contact);
		})
		.catch(err => {
			res.send(err);
		});
});
router.get("/contacts/:id", aunthnticate, (req, res) => {
	const id = req.params.id;
	Contact.findOne({
		_id: id,
		user: req.user._id
	})
		.then(contact => {
			if (contact) {
				res.send(contact);
			} else {
				res.send("contacts are not found");
			}
		})
		.catch(err => {
			res.send(err);
		});
});
router.delete("/contacts/:id", aunthnticate, (req, res) => {
	const id = req.params.id;
	Contact.findOneAndDelete({
		_id: id,
		user: req.user._id
	})
		.then(contact => {
			if (contact) {
				res.send(contact);
			}
			res.send("contact deleted successfully");
		})
		.catch(err => {
			res.send(err);
		});
});

router.put("/contacts/:id", aunthnticate, (req, res) => {
	const id = req.params.id;
	const contact = req.body;
	Contact.findOneAndUpdate(
		{
			_id: id,
			user: req.user._id
		},
		contact,
		function(err, data) {
			if (err) console.log(err);
		}
	)
		.then(contact => {
			res.send(contact);
		})
		.catch(err => {
			res.send(err);
		});
});

module.exports = {
	urls: router
};
