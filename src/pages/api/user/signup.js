"use client";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize as serializeCookie } from "cookie";

export default async function signup(req, res) {
  console.log(1);
  await dbConnect();

  console.log(2);
  if (req.method === "POST") {
    const { email, password, firstName, lastName } = req.body;

    console.log(3);
    if (!email || !password || !firstName || !lastName) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    console.log(4);
    // تحقق من قوة كلمة المرور
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (
      password.length < 8 ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumbers ||
      !hasSpecialChars
    ) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.",
      });
    }

    console.log(5);
    try {
      // التحقق إذا كان المستخدم موجودًا بالفعل
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      console.log(6);
      // تشفير كلمة المرور
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(6.5);
      // إنشاء المستخدم الجديد
      const newUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        IsAdmin: false,
      });

      console.log(7);
      await newUser.save().then(() => {
        console.log("User saved successfully");
      }).catch((error) => {
        console.error("Error saving user:", error);
      });
      // إنشاء JSON Web Token
      console.log(8);
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.SECRET_KEY,
        { expiresIn: "30d" }
      );

      // تخزين الـ Token في Cookie
      console.log(9);
      res.setHeader(
        "Set-Cookie",
        serializeCookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development", // تأكد من أن secure مفعلة في بيئة الإنتاج
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 يومًا
          sameSite: "strict",
          path: "/",
        })
      );

      console.log(10);
      return res.status(201).json({ message: "Signup successful" });
    } catch (error) {
      return res.status(500).json({ error: "Server error", error });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
