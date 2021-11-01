const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const studentRoutes = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 4005;

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

const prisma = new PrismaClient();

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(multer({
  storage: fileStorage,
}).single('foto'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/students', studentRoutes);

app.use((err, req, res, next) => {
	res.status(err.statusCode || 404).json({
		message: err.message
	})
})

app.listen(PORT, async () => {
	await prisma.$connect();
	console.log(`😊 Successfully connected to DB`)
	console.log(`⚡️ Server is running at port ${PORT}`);
});
