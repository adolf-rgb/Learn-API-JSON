const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'module_b'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'moduleb',
    resave: false,
    saveUninitialized: true
}));

app.use('/uploads', express.static('uploads'));
app.use('/public', express.static('public'));

function adminOnly(req, res, next) {
    if (!req.session.admin) {
        return res.status(401).send("401 Unauthorized");
    }
    next();
}

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/login.html'));
});

app.post('/login', (req, res) => {
    if (req.body.passphrase === 'admin') {
        req.session.admin = true;
        res.redirect('/dashboard');
    } else {
        res.status(401).send("Unauthorized");
    }
});

app.get('/dashboard', adminOnly, (req, res) => {
    res.sendFile(path.join(__dirname, 'views/dashboard.html'));
});

function validateGTIN(gtin) {
    return /^\d{13,14}$/.test(gtin);
}

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

app.get('/verify', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/verify.html'));
});

app.listen(PORT, () => {
    console.log("Server running on http://localhost:3000");
});