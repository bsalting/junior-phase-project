const express = require("express");
const router = express.Router();
const { Student } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await Student.findAll());
  } catch (ex) {
    next(ex);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.send(await Student.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.update(req.body);
    res.status(200).send(student);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
