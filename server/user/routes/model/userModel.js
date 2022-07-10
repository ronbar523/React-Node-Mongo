const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },

  userName: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },

  createdAt: {
    type: Number,
    required: true,
    default: Date.now,
  },

  // resetLink: {
  //   data: String,
  //   default: "",
  // },
});

const User = mongoose.model("user", userSchema);

const createUser = (email, userName, password, isAdmin, createdAt) => {
  const newUser = new User({ email, userName, password, isAdmin, createdAt });
  return newUser.save();
};

const findUserByEmail = (email) => {
  return User.find({ email: email });
};

const findUserByUserName = (userName) => {
  return User.find({ userName: userName });
};


const updateUserPassword = async (email, newPass) => {
  return await new Promise((success, failure) => {
    try {
      User.findOneAndUpdate({ email: email }, { password: newPass })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
      success("Successfully changed pass");
    } catch (e) {
      failure(e);
    }
  });
};

module.exports = {
  createUser,
  findUserByEmail,
  User,
  findUserByUserName,
  updateUserPassword,
};
