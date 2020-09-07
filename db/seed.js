const db = require("./db");
("use strict");
const Sequelize = require("sequelize");
const User = require("./models/User");
const Event = require("./models/Event");
const faker = require("faker");

const createUser = async () => {
  try {
    const user = await User.create({
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
    });
    return user;
  } catch (err) {
    console.error(err);
  }
};

const createEvent = async () => {
  try {
    const event = await Event.create({
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
      date: faker.date.future(),
      title: faker.random.word(),
      description: faker.lorem.paragraph(),
      status: "Inactive",
    });
    return event;
  } catch (err) {
    console.error(err);
  }
};

const generateData = async () => {
  const userArray = [];
  const eventsArray = [];
  const data = {};

  for (let i = 0; i < 20; i++) {
    const newUser = await createUser();
    userArray.push(newUser);
    if (i % 5 === 0) {
      const newEvent = await createEvent();
      eventsArray.push(newEvent);
    }
  }
  data.users = userArray;
  data.events = eventsArray;
  return data;
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
    const data = await generateData();
    const users = data.users;
    const events = data.events;
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
