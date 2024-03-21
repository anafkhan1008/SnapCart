const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')


router.post('/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			username: req.body.username,
			email: req.body.email,
			password: newPassword,
			role : req.body.role,
			gender : req.body.gender
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

router.get("/user" , async (req , res)=>{
    const id = req.query.userId;
    console.log(id)
    try{
        const user = await User.findById(id)
        res.json(user).status("ok")
    }
    catch{
        (err)=>{
            console.log("Error in fetching user");
            res.status(404)
        }
    }
})

router.put("/user/:userId", async (req, res) => {
	const userId = req.params.userId;
	
	try {
	  const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
  
	  if (!updatedUser) {
		return res.status(404).json({ message: "User not found" });
	  }
  
	  res.json({ message: "User updated successfully", user: updatedUser });
	} catch (error) {
	  console.error("Error updating user:", error);
	  res.status(500).json({ message: "Internal server error" });
	}
  });



router.post('/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)
    console.log(isPasswordValid)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				email: user.email,
                userId : user._id
			},
			'secret123'
		)
		return res.json({ status: 'ok', user : user })
	} else {
		return res.json({ status: 'err', user: false })
	}
})

module.exports = router;