const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "hr", "employee"],
      default: "employee",
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeeProfile",
    },
    refereshToken: {
        type: String
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.genrateToken = async function name(privateKey, expireIn) {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    privateKey,
    {
      expireIn: expireIn,
    }
  );
};

userSchema.methods.genrateRefershToken = async function() {
    return this.genrateToken(
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_EXPIRY
    );
}

const User = mongoose.model("User", userSchema);
export default User;
