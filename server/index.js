const app = require("./app");
const { db, seed } = require("../db");
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await db.sync({ force: true });
    await seed();
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

start();
