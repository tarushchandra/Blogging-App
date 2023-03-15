const { createHmac, randomBytes } = require("crypto");
const mongoose = require("mongoose");
const { generateTokenForUser } = require("../services/authentication");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/user.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// Hashing the password
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

// Comparing the hashed password and generating JWT token
userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");

    const foundUserSalt = user.salt;
    const foundUserHashedPassword = user.password;

    const userProvidedHashedPassword = createHmac("sha256", foundUserSalt)
      .update(password)
      .digest("hex");

    if (userProvidedHashedPassword !== foundUserHashedPassword)
      throw new Error("Incorrect Password");

    const token = generateTokenForUser(user);
    return token;
  }
);

module.exports = mongoose.model("user", userSchema);
