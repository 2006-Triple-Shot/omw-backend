("use strict");
const pg = require("pg");
const Sequelize = require("sequelize");
const ddb = require("./ddb");
const { demoUser, demoEvent } = require("./models/demoModIndex");

const users = [
  {
    id: 4,
    lastName: "Wiegand",
    firstName: "Veronica",
    zip: "56494-3996",
    mobile: "1-838-380-0904 x840",
    longitude: 128.3922,
    latitude: 76.971199999999996,
    imageUrl: "https://s3.amazonaws.com/uifaces/faces/twitter/bboy1895/128.jpg",
    password: "guest4",
    isHost: false,
    isSharing: false,
    email: "Janice84@hotmail.com",
  },
  {
    id: 3,
    lastName: "Runolfsson",
    firstName: "Franco",
    zip: "02799-0500",
    mobile: "1-776-897-7426 x323",
    longitude: 98.041499999999999,
    latitude: 84.040999999999997,
    imageUrl:
      "https://s3.amazonaws.com/uifaces/faces/twitter/bpartridge/128.jpg",
    password: "guest3",
    isHost: false,
    isSharing: false,
    email: "Henriette_Toy@yahoo.com",
  },
  {
    id: 2,
    lastName: "Spencer",
    firstName: "Cortney",
    zip: "41302",
    mobile: "1-254-667-4335 x084",
    longitude: -29.0137,
    latitude: -59.294199999999996,
    imageUrl: "https://s3.amazonaws.com/uifaces/faces/twitter/macxim/128.jpg",
    password: "guest2",
    isHost: false,
    isSharing: false,
    email: "Raquel97@yahoo.com",
  },
  {
    id: 1,

    lastName: "Dickens",
    firstName: "Justina",
    zip: "68530",
    mobile: "1-779-620-3098",
    longitude: -85.741500000000002,
    latitude: 12.704499999999999,
    imageUrl:
      "https://s3.amazonaws.com/uifaces/faces/twitter/lonesomelemon/128.jpg",
    password: "guest1",
    isHost: true,
    isSharing: false,
    email: "Nayeli_Herzog42@yahoo.com",
  },
];

const launchDay = {
  latitude: 40.705286,
  longitude: -74.009233,
  date: "2020-09-17",
  time: "08:00:00",
  title: "Launch Day",
  description: "A big day for networking",
  status: "Inactive",
};

const seed = async () => {
  try {
    await ddb.sync({ force: true });
    console.log("demo db synced");
    const friends = users.map(async (user) => {
      const newUser = await demoUser.create(user);
    });
    const event = await demoEvent.create(launchDay);

    console.log(`seeded friends for launch day`);
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
    await ddb.close();
    console.log("db connection closed");
  }
};

runSeed();

module.exports = {
  seed,
  runSeed,
};
