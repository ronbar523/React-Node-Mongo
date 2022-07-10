const express = require('express')
const router = express.Router()
const UserValidation = require("../validation/userValidation");
const bcrypt = require("../../config/bcrypt");
const UserModel = require("./model/userModel");
const jwt = require("../../config/jwt");


//REGISTER

router.post("/register", async (req, res) => {
  try {
    const request = await UserValidation.registerSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );

    request.password = await bcrypt.createHash(request.password);

    const ifExistingUserNameArr = await UserModel.findUserByUserName(
      request.userName
    );

    const ifExistingEmailArr = await UserModel.findUserByEmail(request.email);
    if (ifExistingEmailArr.length != 0) {
      throw "email its exist";
    } else {

      if (ifExistingUserNameArr.length != 0) {
        throw "userName its exist";
      } else {
        await UserModel.createUser(
          request.email,
          request.userName,
          request.password,
          request.isAdmin,
        );
      }
    }

    res.json({
      status: 200,
      msg: "You have successfully registered",
      response: request,
    });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const value = await UserValidation.loginSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const userArr = await UserModel.findUserByEmail(value.email);

    if (userArr.length != 0) {
      const rightPassword = await bcrypt.compareHash(
        value.password,
        userArr[0].password
      );

      if (rightPassword === true) {
        const token = await jwt.createToken({
          id: userArr[0].id,
          isAdmin: userArr[0].isAdmin,
        });

        res.json({
          status: 200,
          msg: `welcome back ${userArr[0].userName}`,
          token: token,
        });
      } else {
        throw "wrong password";
        // "Invalid email or password"
      }
    } else {
      throw "this email does not exist in the system";
      // Invalid email or password
    }
    
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
});





module.exports = router;
