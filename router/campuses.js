const express = require("express");
const router = express.Router();
const { Campus } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await Campus.findAll());
  } catch (ex) {
    next(ex);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Campus.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    await campus.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    await campus.update(req.body);
    res.status(200).send(campus);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
