("use strict");
const db = require("./db");
const Sequelize = require("sequelize");
const { User, Event } = require("./models");
const faker = require("faker");

const createUser = () => {
  const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    mobile: `${faker.phone.phoneNumberFormat(10)}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
    imageUrl: faker.image.avatar(),
    zip: faker.address.zipCode(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    isHost: faker.random.boolean(),
    isSharing: faker.random.boolean(),
  };
  return user;
};

const createEvent = () => {
  const event = {
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    date: faker.date.future(),
    title: faker.random.word(),
    description: faker.lorem.paragraph(),
    status: "Inactive",
  };
  return event;
};

const generateUsers = async () => {
  const userArray = [];
  for (let i = 0; i < 20; i++) {
    const newUser = createUser();
    const newUserInstance = await User.create(newUser);

    userArray.push(newUser);
  }

  return userArray;
};
const generateEvents = async () => {
  const eventsArray = [];

  for (let i = 0; i < 5; i++) {
    const newEvent = createEvent();
    const newEventInstance = await Event.create(newEvent);
    eventsArray.push(newEvent);
  }
  return eventsArray;
};

const oneEvent = {
  location: {
    latitude: 40.705286,
    longitude: -74.009233,
  },
  date: "2020-09-17",
  time: "08:00:00",
  title: "Launch Day",
  description: "A big day for networking",
  status: "Inactive",
};

const seed = async () => {
  try {
    await db.sync({ force: true });
    console.log("db synced");
    const users = await generateUsers();
    const events = await generateEvents();
    console.log(`seeded ${users.length} users & ${events.length} events`);
    console.log(`seeded successfully`);
  } catch (err) {
    console.error(err);
  }
};

const runSeed = async () => {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
};

runSeed();

module.exports = {
  seed,
  runSeed,
};
