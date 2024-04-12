const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const secretKey = "SEDRTFGYHUIJOHGCFGYHUIJOHGF3456789";
app.get("/", (req, resp) => {
  resp.json({
    msg: "a sample api",
  });
});

app.post("/login", (req, resp) => {
  const user = {
    id: 1,
    userName: "mani",
    email: "amin@gmail.com",
  };
  jwt.sign(user, secretKey, { expiresIn: "900000" }, (err, token) => {
    resp.json({
      token,
    });
  });
});

app.post("/profile", verifyToken, (req, resp) => {
  //   jwt.verify(req.token, secretKey, (err, authData) => {
  //     if (err) {
  //       resp.send({
  //         result: err,
  //       });
  //     } else {
  //       resp.json({
  //         msg: "Profile is accesed",
  //         authData,
  //       });
  //     }
  //   });

  try {
    // Decode the token without a secret key
    const decodedToken = jwt.decode(req.token);
    console.log("Decoded token:", decodedToken);
  } catch (error) {
    console.log("Error:", error.message);
  }
});

function verifyToken(req, resp, next) {
  const bearerHeader = req.headers["authorization"];
  //   console.log(req);
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    console.log(token);
    req.token = token;
    next();
  } else {
    resp.send({
      result: "token is invalid",
    });
  }
}

app.listen(5000, () => {
  console.log("app is running on 5000 post");
});
