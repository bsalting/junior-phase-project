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
      description: "Hogwarts...",
    }),
    Campus.create({
      name: "Durmstung",
      address: "Undisclosed, Germany",
      description: "Durmstrung...",
    }),
    Campus.create({
      name: "Beauxbatons",
      address: "Undisclosed, France",
      description: "Beauxbatons...",
    }),
  ]);
  return Promise.all(
    Student.create({
      firstName: "Harry",
      lastName: "Potter",
      email: "hp@hogwarts.edu",
      campusId: hogwarts.id,
    }),
    Student.create({
      firstName: "Victor",
      lastName: "Krum",
      email: "vk@durmstrung.edu",
      campusId: durmstrung.id,
    }),
    Student.create({
      firstName: "Fleur",
      lastName: "Delacour",
      email: "fd@beauxbatons.edu",
      campusId: beauxbatons.id,
    })
  );
};

module.exports = {
  db,
  seed,
  Student,
  Campus,
};
