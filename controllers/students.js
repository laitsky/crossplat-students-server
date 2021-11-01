const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json({ students });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.createStudent = async (req, res, next) => {
  const { nim, nama, prodi } = req.body;
  try {
    const student = await prisma.student.create({
      data: {
        nim: nim,
        nama: nama,
        prodi: prodi,
        foto: req.file.path || null
      }
    });
    res.status(201).json(student)
  } catch (err) {
    if (err.code === 'P2002') {
      err.statusCode = 409
      err.message = 'NIM already exist'
    }
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}