/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const keys = require("../config/keys");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      minlength: 1,
      trim: true,
      required: true
    },
    lastname: {
      type: String,
      minlength: 1,
      trim: true,
      required: true
    },
    description: {
      type: String,
      default: "Vous n'avez pas encore de description",
      trim: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      minlength: 1,
      trim: true,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email"
      }
    },
    password: {
      type: String,
      minlength: 6
    }
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;

  return userObject;
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = "auth";
  const token = jwt
    .sign(
      {
        _id: user._id.toHexString(),
        access
      },
      keys.app.jwt.secret
    )
    .toString();
  user.tokens.push({ access, token });
  return user.save().then(() => token);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
