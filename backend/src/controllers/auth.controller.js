//routes k logic yha p hunge
const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

//user controllers
async function registerUser(req, res) {
  const { fullName, email, password } = req.body;
  const isUserAlreadyExist = await userModel.findOne({ email })

  if (isUserAlreadyExist) {
    return res.status(400).json({ message: "User already exist" })
  }

  //hash krenge password bcrypt.hash(password,saltRounds)se
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword

  })
  const token = jwt.sign({
    id: user._id,
  }, process.env.JWT_SECRET)

  res.cookie("token", token, { httpOnly: true });


  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email
    }
  })
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" })
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return res.status(400).json({ message: "Invalid email or password" })
  }
  const token = jwt.sign({
    id: user._id,
  }, process.env.JWT_SECRET)

  res.cookie("token", token, { httpOnly: true });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email
    }
  })
}

async function logoutUser(req, res) {

  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "User logged out successfully"
  })

}

//food partner controllers
async function registerFoodPartner(req, res) {
  const { name, phone, email, password, address, contactName } = req.body;

  const isFoodPartnerExist = await foodPartnerModel.findOne({ email })

  if (isFoodPartnerExist) {
    return res.status(400).json({
      message: "food partner already exists"
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    contactName
  })

  const token = jwt.sign({
    id: foodPartner._id
  }, process.env.JWT_SECRET)

  res.cookie("token", token, { httpOnly: true });

  res.status(201).json({
    message: "food partner registered successfully",
    foodPartner: {
      id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
      contactName: foodPartner.contactName,
      phone: foodPartner.phone,
      address: foodPartner.address
    }
  })
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;
  const foodPartner = await foodPartnerModel.findOne({ email });

  if (!foodPartner) {
    return res.status(400).json({ message: "Invalid email or password" })
  }

  const isPasswordMatched = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordMatched) {
    return res.status(400).json({ message: "Invalid email or password" })
  }
  const token = jwt.sign({
    id: foodPartner._id,
  }, process.env.JWT_SECRET)

  res.cookie("token", token, { httpOnly: true });

  res.status(200).json({
    success: true,
    message: "Food partner logged in successfully",
    foodPartner: {
      id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email
    }
  })
}

async function logoutFoodPartner(req, res) {

  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Food partner logged out successfully"
  })
}



module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner
}