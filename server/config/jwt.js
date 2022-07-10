const jwt = require('jsonwebtoken')

const createToken = data => {
    return new Promise((res, rej) => {

        jwt.sign(data, "asdfghjkl", {expiresIn: '7d'}, (err, token) => {
            if(err) rej(err)
            else res(token)
        })
    })
}

const verifyToken = token => {
    return new Promise((res, rej) => {
        jwt.verify(token, "asdfghjkl", (err, decoded) => {
            if (err) rej(err);
            else res(decoded);
        })
    })
}

function verifyTokenUser(tokenFromUSer) {
  try {
    const userData = jwt.verify(tokenFromUSer, config.get("jwtKey"));

    return userData;
  } catch (error) {
    return null;
  }
}



module.exports = {
  createToken,
  verifyToken,
  verifyTokenUser,
};