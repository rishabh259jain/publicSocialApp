// controllers/usersController.js

const { OAuth2Client } = require("google-auth-library");
const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const User = require("../models/users"); // Assuming you have a User model
require("dotenv").config();
const {
  ValidationError,
  PermissionError,
  AuthorizationError,
  DatabaseError,
  NotFoundError,
  OperationalError,
} = require("../utils/errors");

// Initialize AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

async function register(req, res, next) {
  try {
    let {
      phone,
      username,
      email,
      password,
      bio,
      photo,
      isAdmin,
      isPublic,
      provider,
      token,
    } = req.body;
    isAdmin = false;
    isPublic = false;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      phone,
      username,
      email,
      password: hashedPassword,
      bio,
      photo,
      isAdmin,
      isPublic,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser.email });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
}

const socialLogin = async (req, res, next) => {
  try {
    const { provider, token } = req.body;
    if (provider !== "google")
      return next(new AuthorizationError("Invalid provider"));
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const googleUserId = payload["sub"];
    const email = payload["email"];
    let user = await User.findOne({ email }).lean();

    if (!user) {
      await User.create({ email });
    }
    next();
  } catch (error) {
    console.error("Error with social login:", error);
    res.status(500).json({ error: "Error with social login" });
  }
};

async function login(req, res, next) {
  try {
    const { username, password, email, provider, token } = req.body;
    try {
      foundUser = await User.findOne({ email }).lean();
    } catch (error) {
      return next(new AuthorizationError("Username or password do not match"));
    }

    if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
      return next(new NotFoundError("Username or password do not match"));
    }
    req.user = foundUser;
    next();
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
}

async function uploadProfile(req, res, next) {
  try {
    const { imageUrl, file, email } = req.body;

    if (imageUrl) {
      await User.findOneAndUpdate({ email }, { $set: { photo: imageUrl } });
      res.status(200).json({ message: "Profile photo URL saved successfully" });
    } else if (file) {
      const params = {
        Bucket: "voosh-store",
        Key: `profile-photos/${email}-${file.originalname}`,
        Body: file.buffer,
      };
      const data = await s3.upload(params).promise();
      await User.findOneAndUpdate(
        { email },
        { $set: { photo: data.Location } }
      );
      res.status(200).json({ message: "Profile photo uploaded successfully" });
    } else {
      res
        .status(400)
        .json({ error: "Please provide either an image URL or upload a file" });
    }
  } catch (error) {
    console.error("Error handling profile photo:", error);
    res.status(500).json({ error: "Error handling profile photo" });
  }
}

async function changePrivacy(req, res, next) {
  try {
    const { email } = req.body;
    await User.findOneAndUpdate({ email }, { $set: { isPublic: true } });
    res.status(200).json({ message: "Profile public success" });
  } catch (error) {
    res.status(500).json({ error: "Error changing privacy settings" });
  }
}

async function getProfiles(req, res, next) {
  try {
    let { userArr } = req.params;
    let resp = [];
    if (userArr && isarray(userArr) && arr.length > 0) {
      for (let email of userArr) {
        let user = await User.findOne(
          { email, isPublic: 1 },
          { password: 0 }
        ).lean();
        resp.push(user);
      }
    } else {
      resp = await User.find({ isPublic: 1 }, { password: 0 }).lean();
    }
    res
      .status(200)
      .json({ message: "Users fetched successfully", users: resp });
  } catch (error) {
    res.status(500).json({ error: "Error getting user" });
  }
}

async function getUser(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).lean();
    if (user === null) {
      return next(new NotFoundError("No user in the database"));
    }

    return res.status(200).json({
      status: "success",
      message: "User found successfully",
      userDetails: {...user, password: undefined},
    });
  } catch (err) {
    return next(new DatabaseError("Error in fetching user Info"));
  }
}

module.exports = {
  register,
  login,
  uploadProfile,
  socialLogin,
  changePrivacy,
  getProfiles,
  getUser,
};
