const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken"); 
const FormDataModel = require("./models/FormData");
const CartModel = require("./models/cartSchema");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const ContactFormDataModel = require("./models/ContactFormData");


dotenv.config();

const app = express();
app.use(express.json());

// CORS middleware'ini ekleyin
const corsOptions = {
  origin: 'http://localhost:3000', // frontend'inizin domain'i
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use("/uploads", express.static("uploads"));

// Define multer storage and upload middleware before using them in routes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const jwtSecretKey = process.env.JWT_SECRET_KEY || 'defaultSecretKey';

const authenticateUser = async (email, password) => {
  const user = await FormDataModel.findOne({ email: email });

  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }

  return null;
};


const generateToken = (userId) => {
  return jwt.sign({ userId }, jwtSecretKey, { expiresIn: '1h' });
};


const upload = multer({ storage: storage });

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.post("/register", upload.single("image"), async (req, res) => {
  const { name, lastname, email, password, phone, location } = req.body;

  try {
    const user = await FormDataModel.findOne({ email: email });

    if (user) {
      res.json("Already registered");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new FormDataModel({
        name: name,
        lastname: lastname,
        email: email,
        password: hashedPassword,
        phone: phone,
        image: req.file ? req.file.path : null,
        location: location,
      });
      await newUser.save();
      res.json(newUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser(email, password);

    if (user) {
      const token = generateToken(user._id);
      res.json({ status: "Success", userId: user._id, token });
    } else {
      res.json({ status: "Error", message: "Incorrect password or email" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  FormDataModel.findById(userId)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error" });
    });
});

app.post("/cart", async (req, res) => {
  const { userEmail, userName, cartItems } = req.body;

  try {
    const cart = new CartModel({
      userEmail,
      userName,
      cartItems,
    });

    await cart.save();
    console.log("Shopping cart submitted");
    res.json({ status: "Success", cart: cart });

    // Send an email when the cart is successfully submitted
    sendEmail(userEmail, userName, cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});



app.post("/contactus", async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    // Save the contact form data to the database
    const contactFormData = new ContactFormDataModel({
      email,
      subject,
      message,
    });

    await contactFormData.save();

    // Respond with a success message
    res.json({ status: "Success", message: "Contact form submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

function sendEmail(userEmail, userName, cartItems) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: "New Cart Submitted",
    html: `
      <h2>New Cart Submitted</h2>
      <p><strong>User:</strong> ${userName}</p>
      <p><strong>Email:</strong> ${userEmail}</p>
      <h3>Cart Items:</h3>
      <ul>
        ${cartItems.map(item => `
          <li>
            <label>Name:</label> ${item.productName}<br>
            <label>Quantity:</label> ${item.quantity}<br>
            <label>Price:</label> $${item.price}<br>
          </li>
        `).join('')}
      </ul>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Email sending error: ", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

app.listen(3001, () => {
  console.log("Server listening on http://127.0.0.1:3001");
});
