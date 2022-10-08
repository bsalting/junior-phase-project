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
      notEmpty: {
        msg: "Student requires a first name",
      },
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Student requires a last name",
      },
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Student requires an email address",
      },
      isEmail: {
        msg: "Provide a valid email address",
      },
    },
  },
  imageUrl: {
    type: STRING,
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
      notEmpty: {
        msg: "Campus requires a name",
      },
    },
  },
  address: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Campus requires an address",
      },
    },
  },
  imageUrl: {
    type: STRING,
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
      description: "Hogwarts School...",
      imageUrl:
        "https://hogwarts.io/images/avatars/upload/75c1eced7014a4bc935f4d1340b1dda1_1885.jpg?u=20181212",
    }),
    Campus.create({
      name: "Durmstrung",
      address: "Undisclosed, Germany",
      description: "Durmstrung Institute...",
      imageUrl: "https://hogwarts.io/files/ca6ddc809e98061e.png",
    }),
    Campus.create({
      name: "Beauxbatons",
      address: "Undisclosed, France",
      description: "Beauxbatons Academy...",
      imageUrl:
        "https://i.pinimg.com/474x/a9/a0/fe/a9a0fef70adad2ed4e1ef2cb6dc0f779.jpg",
    }),
    Campus.create({
      name: "Brakebills",
      address: "Undisclosed, USA",
      description: "Brakebills School...",
      imageUrl:
        "https://preview.redd.it/c4ql03a7vw061.png?width=679&format=png&auto=webp&s=89ab06ffe64814d619e66e92113542acf7b24b0e",
    }),
    Campus.create({
      name: "Brakebills South",
      address: "Undisclosed, North Pole",
      description: "Brakebills Satellite...",
      imageUrl: "https://i.redd.it/8tf149hlbdb41.jpg",
    }),
  ]);
  return Promise.all([
    Student.create({
      firstName: "Harry",
      lastName: "Potter",
      email: "hp@hogwarts.edu",
      gpa: 3,
      campusId: hogwarts.id,
      imageUrl:
        "https://media.harrypotterfanzone.com/harry-potter-goblet-of-fire-first-task-portrait.jpg",
    }),
    Student.create({
      firstName: "Hermione",
      lastName: "Granger",
      email: "hg@hogwarts.edu",
      gpa: 4,
      campusId: hogwarts.id,
      imageUrl:
        "http://images4.fanpop.com/image/photos/24400000/Hermione-Granger-Wallpaper-hermione-granger-24489407-1024-768.jpg",
    }),
    Student.create({
      firstName: "Ron",
      lastName: "Weasley",
      email: "rw@hogwarts.edu",
      gpa: 2,
      campusId: hogwarts.id,
      imageUrl:
        "https://media.harrypotterfanzone.com/ron-weasley-order-of-the-phoenix-portrait.jpg",
    }),
    Student.create({
      firstName: "Victor",
      lastName: "Krum",
      email: "vk@durmstrung.edu",
      gpa: 3,
      campusId: durmstrung.id,
      imageUrl:
        "https://openpsychometrics.org/tests/characters/test-resources/pics/HP/15.jpg",
    }),
    Student.create({
      firstName: "Fleur",
      lastName: "Delacour",
      email: "fd@beauxbatons.edu",
      gpa: 4,
      campusId: beauxbatons.id,
      imageUrl:
        "https://media.harrypotterfanzone.com/fleur-delacour-goblet-of-fire-third-task-portrait-3.jpg",
    }),
    Student.create({
      firstName: "Cedric",
      lastName: "Diggory",
      email: "cd@hogwarts.edu",
      campusId: null,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8uB9XDBdLioDJTwdSxh6wMAuG-0PPWyELIg&usqp=CAU",
    }),
  ]);
};

module.exports = {
  db,
  seed,
  Student,
  Campus,
};
