const Sequelize = require("sequelize");
const { UUID, UUIDV4, STRING, TEXT, DECIMAL } = Sequelize;

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_schools_db"
);

const Student = db.define("student", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  imageUrl: {
    type: STRING,
    validate: {
      isUrl: true,
    },
  },
  gpa: {
    type: DECIMAL,
    validate: {
      min: 0.0,
      max: 4.0,
    },
  },
});

const Campus = db.define("campus", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: STRING,
    validate: {
      isUrl: true,
    },
  },
  address: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: TEXT,
  },
});

Student.belongsTo(Campus);
Campus.hasMany(Student);

const seed = async () => {
  const [hogwarts, durmstrung, beauxbatons] = await Promise.all([
    Campus.create({
      name: "Hogwarts",
      address: "Undisclosed, Scotland",
      description: "Hogwarts blah blah...",
    }),
    Campus.create({
      name: "Durmstung",
      address: "Undisclosed, Germany",
      description: "Durmstrung blah blah...",
    }),
    Campus.create({
      name: "Beauxbatons",
      address: "Undisclosed, France",
      description: "Beauxbatons blah blah...",
    }),
    Campus.create({
      name: "Brakebills",
      address: "Undisclosed, USA",
      description: "Brakebill blah blah...",
    }),
  ]);
  return Promise.all([
    Student.create({
      firstName: "Harry",
      lastName: "Potter",
      email: "hp@hogwarts.edu",
      imageUrl:
        "https://images.ctfassets.net/usf1vwtuqyxm/3SQ3X2km8wkQIsQWa02yOY/8801d7055a3e99dae8e60f54bb4b1db8/HarryPotter_WB_F4_HarryPotterMidshot_Promo_080615_Port.jpg?w=914&q=70&fm=jpg",
      gpa: 3,
      campusId: hogwarts.id,
    }),
    Student.create({
      firstName: "Hermione",
      lastName: "Grange",
      email: "hg@hogwarts.edu",
      gpa: 4,
      campusId: hogwarts.id,
    }),
    Student.create({
      firstName: "Ron",
      lastName: "Weasley",
      email: "rw@hogwarts.edu",
      gpa: 2,
      campusId: hogwarts.id,
    }),
    Student.create({
      firstName: "Victor",
      lastName: "Krum",
      email: "vk@durmstrung.edu",
      gpa: 3,
      campusId: durmstrung.id,
    }),
    Student.create({
      firstName: "Fleur",
      lastName: "Delacour",
      email: "fd@beauxbatons.edu",
      gpa: 4,
      campusId: beauxbatons.id,
    }),
    Student.create({
      firstName: "Rubeus",
      lastName: "Hagrid",
      email: "rh@gmail.edu",
    }),
  ]);
};

module.exports = {
  db,
  seed,
  Student,
  Campus,
};
