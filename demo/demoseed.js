("use strict");
const pg = require("pg");
const Sequelize = require("sequelize");
const ddb = require("./ddb");
const axios = require("axios");
const {baseUrl} = "https://onmyway-api.herokuapp.com"
const { demoUser, demoEvent } = require("./models/demoModIndex");
// const faker = require("faker");
const users = [
  {
    id: 5,
    lastName: "test",
    firstName: "test",
    zip: "56494-3996",
    mobile: "1-838-380-0904 x840",
    longitude: 128.3922,
    latitude: 76.971199999999996,
    imageUrl: "https://s3.amazonaws.com/uifaces/faces/twitter/bboy1895/128.jpg",
    password: "test",
    isHost: true,
    email: "test@gmail.com",
    // eventId: 1
  },
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
    isHost: true,
    email: "Janice84@hotmail.com",
    // eventId: 1
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
    email: "Henriette_Toy@yahoo.com",
    // eventId: 1
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
    isHost: true,
    email: "Raquel97@yahoo.com",
    // eventId: 2
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
    email: "Nayeli_Herzog42@yahoo.com",
    // eventId: 2
  },
];

const events = [
  {
    latitude: 40.705286,
    longitude: -74.009233,
    date: "2020-09-17",
    time: "08:00:00",
    title: "Launch Day",
    description: "A big day for networking",
    status: "Inactive",
    hostId: 1,
  },
  {
    latitude: 40.703286,
    longitude: -73.009233,
    date: "2020-09-17",
    time: "08:00:00",
    title: "Graduation Party",
    description: "Come celebrate our Fullstack Graduation!",
    status: "Inactive",
    hostId: 1,
  },
  {
    latitude: 40.703286,
    longitude: -73.009233,
    date: "2020-09-17",
    time: "08:00:00",
    title: "Bring your Cody to work day",
    description: "Everyone has a pug to share",
    status: "Inactive",
    hostId: 1,
  },
  {
    latitude: 40.703286,
    longitude: -73.009233,
    date: "2020-09-17",
    time: "08:00:00",
    title: "The Apocalypse",
    description: "The end is nigh! Bring your friends!",
    status: "Inactive",
    hostId: 1,
  },
];


const associate = async () => {
  try {
    const config = {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.TmF5ZWxpX0hlcnpvZzQyQHlhaG9vLmNvbQ.h2BXyk7RBRsI5eQoE7R-iArXxfVBQMlSbXBCIcLRHCg",
      },
    };

    const reqBody = {
      contacts: [
        {
          id: 4,
          updatedAt: "2020-09-13 01:29:51.021-04",
          lastName: "Wiegand",
          firstName: "Veronica",
          zip: "56494-3996",
          mobile: "1-838-380-0904 x840",
          longitude: 128.3922,
          latitude: 76.971199999999996,
          imageUrl:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bboy1895/128.jpg",
          password:
            "156147ee8fc38919e1b2dedf377bc35d2450b36a0bf7f32cc503350d90e9e65a",
          salt: "BtfUUOKGE9TgWv+iWshZlg==",
          isHost: true,
          isSharing: true,
          email: "Janice84@hotmail.com",
          createdAt: "2020-09-13 01:29:51.021-04",
        },
        {
          id: 3,
          updatedAt: "2020-09-13 01:29:51.022-04",
          lastName: "Runolfsson",
          firstName: "Franco",
          zip: "02799-0500",
          mobile: "1-776-897-7426 x323",
          longitude: 98.041499999999999,
          latitude: 84.040999999999997,
          imageUrl:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bpartridge/128.jpg",
          password:
            "3cd0f1a81a2f85eb33693d0dca6e73c53cf92da162bf0f78cae8a5540b10dbbd",
          salt: "BhCfkSCK8hOYZjGLF/bgkQ==",
          isHost: false,
          isSharing: true,
          email: "Henriette_Toy@yahoo.com",
          createdAt: "2020-09-13 01:29:51.022-04",
        },
        {
          id: 2,
          updatedAt: "2020-09-13 01:29:51.022-04",
          lastName: "Spencer",
          firstName: "Cortney",
          zip: "41302",
          mobile: "1-254-667-4335 x084",
          longitude: -29.0137,
          latitude: -59.294199999999996,
          imageUrl:
            "https://s3.amazonaws.com/uifaces/faces/twitter/macxim/128.jpg",
          password:
            "75646e64b1d4d4da7447a7f7e40c9438f393703de14423bd9e8c9d5a75a4b4e5",
          salt: "YW9tPd9KO5f0pbR7ktNPfg==",
          isHost: true,
          isSharing: true,
          email: "Raquel97@yahoo.com",
          createdAt: "2020-09-13 01:29:51.022-04",
        },
        {
          id: 1,
          updatedAt: "2020-09-13 01:29:51.022-04",
          lastName: "Dickens",
          firstName: "Justina",
          zip: "68530",
          mobile: "1-779-620-3098",
          longitude: -85.741500000000002,
          latitude: 12.704499999999999,
          imageUrl:
            "https://s3.amazonaws.com/uifaces/faces/twitter/lonesomelemon/128.jpg",
          password:
            "f2e05b607999fd85f12234cc71b5e51027568f91342cf4da587f4a2faa9500ef",
          salt: "f63R3EZB1uxmh5X7HrgsVA==",
          isHost: true,
          isSharing: true,
          email: "Nayeli_Herzog42@yahoo.com",
          createdAt: "2020-09-13 01:29:51.022-04",
        },
      ],
      email: "test@gmail.com",
    };
    const req = await axios.put(`${baseUrl}/id/5/add`, reqBody, config);
    console.log("eager load success");
  } catch (err) {
    console.log(err);
  }
}

// couple more events ASSOCIATE WITH HOST

const seed = async () => {
  try {
    await ddb.sync({ force: true });
    console.log("demo db synced");

    const friends = await Promise.all(
      users.map(async user => {
        const newUser = await demoUser.create(user);
        const toAdd = await demoUser.findByPk(2)
        const friend = await newUser.addContact(toAdd);
      })
    );

    const eventArr = await Promise.all(events.map(async (event) => {
      const newEvent = await demoEvent.create(event);
      // console.log("Just created event");
      const user = await demoUser.findByPk(1);
      // console.log("Try to add person");

      const addUs = await newEvent.addGuest(user);
    }))


    // const associateUsersWithEvents = await demoUser.findAll({
    //   where: {
    //     isHost: true,
    //   },
    // });

    // console.log(associateUsersWithEvents);

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
    await associate();
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
  associate
};
