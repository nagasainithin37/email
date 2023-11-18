const exp = require("express");
const app = exp();
const axios = require("axios");
const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");


app.use(exp.json());

const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nagasainithin06@gmail.com",
    pass: "ksmjdfdiordnmtgx",
  },
});


app.post("/sendMail", expressAsyncHandler(async(req,res)=>{
      const options = {
        from: "scoretrack@outlook.com",
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.text,
      };

        transpoter.sendMail(options, async function (err, info) {
          if (err) {
            console.log(err);
            res.send("error");
          } else {
            res.send("success");
          }
        });
}));


app.use((req, res, next) => {
  console.log(req.url);
  res.send({ message: `Invalid path ${req.url}` });
});

//Error Handling Route
app.use((err, req, res, next) => {
  console.log(err);
  res.send({ message: `${err}`, reason: `${err.message}` });
  return;
});

app.listen(3100, () => {
  console.log("Server is running");
});
