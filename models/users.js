const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRageXP = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 4,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRageXP,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(4).required(),
  email: Joi.string().pattern(emailRageXP).required(),
});
const loginSchema = Joi.object({
  password: Joi.string().min(4).required(),
  email: Joi.string().pattern(emailRageXP).required(),
});

const emailSchena = Joi.object({
  email: Joi.string().pattern(emailRageXP).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchena,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
