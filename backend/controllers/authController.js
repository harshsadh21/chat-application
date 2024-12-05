import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import genToken from "../utils/gebToken.js";

export const sign = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    // console.log(req.file.path);
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password doesnot match" });
    }
    const user = await userModel.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exits " });
    }
    // HAsh password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new userModel({
      fullName,
      username,
      password: hashedPassword,
      profileImage: req.file ? req.file.path : "",
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    genToken(newUser._id, res);
    await newUser.save();
    res.status(201).send({
      _id: newUser._id,
      username: newUser.username,
      fullName: newUser.fullName,
      profile: newUser.profilePic,
      profileImage: newUser.profileImage,
      gender: newUser.gender,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid creditials" });
    }
    genToken(user._id, res);
    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return res.status(200).json({ message: "Loggout Succesfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
