import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// const mongoose = require("mongoose");
const port = process.env.port || 1156;
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb+srv://Pragnesh:4riCYFcGlxaudzmT@cluster0.a5k3605.mongodb.net/ReLive-Udamy"
);

//Routes
// app.post("/login", (req, res) => {
//   const { userusername } = req.body;
//   User.findOne(
//     { userusername: userusername },
//     (err,
//     (user) => {
//       if (user) {
//         if (password === user.password) {
//           res.send({ message: "Login successfull", user: user });
//         } else {
//           res.send({ message: "Password didn't match" });
//         }
//       } else {
//         res.send({ message: "Register Yourself" });
//       }
//     })
//   );
//   res.send("My api login");
// });

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        // If user is not found
        return res.status(201).json({ message: "Register Yourself First😉" });
      }

      // If user is found
      res.status(200).json({ message: "Login successful", user: user });
    })
    .catch((err) => {
      // Handle error
      console.error("Error finding user:", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.post("/findCar", (req, res) => {
  const { fromAddress, toAddress, date } = req.body;
  Bookings.findOne({
    fromAddress: fromAddress,
    toAddress: toAddress,
    date: date,
  })
    .then((user) => {
      if (!user) {
        // If user is not found
        return res.status(201).json({ message: "Not booking yet" });
      }

      // If user is found
      res.status(200).json({
        message: `Yes bookings avaliable from ${fromAddress} to ${toAddress} at this ${date}`,
        user: user,
      });
    })
    .catch((err) => {
      // Handle error
      console.error("Error finding user:", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.post("/register", (req, res) => {
  const { username, password, confirmPassword } = req.body;
  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        res.send({ message: "User already registered" });
      } else {
        const newUser = new User({
          username,
          password,
          confirmPassword,
        });
        newUser
          .save()
          .then(() => {
            res.send({ message: "Successfully Registered" });
          })
          .catch((err) => {
            res.send(err);
          });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/reserve", (req, res) => {
  const {
    carName,
    firstName,
    lastName,
    email,
    phoneNumber,
    fromAddress,
    toAddress,
    howPersons,
    date,
    time,
    information,
  } = req.body;
  Bookings.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.status(201).json({ message: "Please login first" });
      } else {
        const newUser = new Bookings({
          carName,
          firstName,
          lastName,
          email,
          phoneNumber,
          fromAddress,
          toAddress,
          howPersons,
          date,
          time,
          information,
        });
        newUser
          .save()
          .then(() => {
            res.status(200).send({ message: "Reserved Successfully" });
          })
          .catch((err) => {
            res.send(err);
          });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

// app.post("/send/message", (req, res) => {
//   const { name, email, message } = req.body;
//   sendingMsg
//     .then(() => {
//       const newUser = new sendingMsg({
//         name,
//         email,
//         message,
//       });
//       newUser
//         .save()
//         .then(() => {
//           res.send({ message: "Message sent successfully" });
//         })
//         .catch((err) => {
//           res.send(err);
//         });
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

app.post("/send/message", (req, res) => {
  const { name, email, message } = req.body;
  // Assuming sendingMsg is a function that sends the message
  const newMessage = new sendingMsg({
    name,
    email,
    message,
  });
  return newMessage
    .save()
    .then(() => {
      res.status(200).send({ message: "Message sent successfully" });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ error: "An error occurred while sending the message" });
    });
});

app.listen(port, () => {
  console.log(`App started at : ${port}`);
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  confirmPassword: String,
});
const sendingMessage = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
const bookingSchema = new mongoose.Schema({
  carName: String,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  fromAddress: String,
  toAddress: String,
  howPersons: String,
  date: String,
  time: String,
  information: String,
});

const User = mongoose.model("User", userSchema);
const sendingMsg = mongoose.model("Feedbacks", sendingMessage);
const Bookings = mongoose.model("Bookings", bookingSchema);
