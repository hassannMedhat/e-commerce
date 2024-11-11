import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import express from 'express';


const app = express();
app.use(cookieParser());

export function authenticateToken(req, res, next) {
    // ! هنا نستخرج الـ token من الكوكيز
    const token = req.cookies.authToken;

    // ! تحقق من وجود token في الكوكيز
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // ! التحقق من JWT
        const decoded = jwt.verify(token, process.env.REACT_APP_SECRET_KEY);
        req.user = decoded;
        return next(); // إذا كان JWT صحيحًا، نكمل إلى الـ middleware التالي
    } catch (error) {
        console.error('Error verifying JWT:', error);
        return res.status(403).json({ message: 'Invalid token.' });
    }
}