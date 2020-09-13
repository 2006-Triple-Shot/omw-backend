const users = require("express").Router();
const { demoUser } = require("../../models/demoModIndex");
const ddb = require("../../ddb");


/* ************************************** */
/* USER ROUTES ************************** */
/* ************************************** */

/* GET ALL USERS ************************** */
users.get("/", async (req, res, next) => {
  try {
    const allUsers = await demoUser.findAll();
    const details = allUsers.map((user) => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        imageUrl: user.imageUrl,
      };
    });
    res.json(details);
  } catch (err) {
    next(err);
  }
});

/* GET SINGLE USER ************************** */
// This route will either find By Primary Key or use custom parameters: email, or firstName
const isNum = (input) => {
  if (!isNaN(input)) return true;
  else return false;
};

users.get("/:param", async (req, res, next) => {
  try {
    let id;
    let user;
    const param = req.params.param;
    if (isNum(param)) {
      try {
        const userPk = await demoUser.findByPk(param);
        res.status(200).json({
          id: userPk.dataValues.id,
          firstName: userPk.dataValues.firstName,
          email: userPk.dataValues.email,
          latitude: userPk.dataValues.latitude,
          longitude: userPk.dataValues.longitude,
          imageUrl: userPk.dataValues.imageUrl,
        });
      } catch (err) {
        next(err);
      }
    } else {
      try {
        const userByName = await demoUser.findOne({
          where: {
            firstName: param,
          },
        });
        if (userByName) {
          user = userByName;
          id = user.dataValues.id;
          res.status(200).json({ userId: id });
        } else {
          const userByEmail = await demoUser.findOne({
            where: {
              email: param,
            },
          });
          if (userByEmail) {
            user = userByEmail;
            id = user.dataValues.id;
            res.status(200).json(userByEmail);
          }
        }
      } catch (err) {
        next(err);
      }
    }
  } catch (err) {
    next(err);
  }
});


/* ************************************** */
/* CONTACT ROUTES ************************** */
/* ************************************** */



/* GET MY CONTACTS ************************** */
users.get("/id/:userId/contacts", async (req, res, next) => {
  try {
    const {email} = req.body;
    const user = await demoUser.findOne({
      where: {
        email: email,
      },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "latitude",
        "longitude",
      ],
      include: [
        {
          model: demoUser,
          as: "contact",
          attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "latitude",
            "longitude",
          ],
          through: { attributes: [] }, //  <== Here
          required: true,
        },
      ],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// /* GET CONTACTS ************************** */
// users.get("/id/:userId/contacts", async (req, res, next) => {
//   try {
//     const {requestedContacts, currentUserId} = req.body;

//     const userRequesting = await demoUser.findByPk(currentUserId);
//     const reqId = userRequesting.id;

//     const contactList = await Promise.all(requestedContacts.map(async (contact) => {
//       const contactId = contact.id
//       const connection = await demoUser.findOne({
//         where: {
//           id: reqId,
//         },
//         include: [
//           {
//             model: demoUser,
//             as: "contact",
//             attributes: [
//               "id",
//               "firstName",
//               "lastName",
//               "email",
//               "latitude",
//               "longitude",
//             ],

//             through: "contacts", //  <== Here

//           },
//         ],
//       });

//     }))
//     res.status(200).json({contacts: contactList})
//   } catch (err) {
//     next(err);
//   }
// });

/* REQUEST CONNECTION ************************** */
users.put("/id/:userId/add", async (req, res, next) => {
  try {
    const { email, contacts} = req.body; // append User through hostId
    const user = await demoUser.findOne({
      where: {
        email: email
      }
    })
    const addFriends = await Promise.all(
      contacts.map(async contact => {
        const contactToAdd = await demoUser.findByPk(contact.id);
        const add = await user.addContact(contactToAdd);
        console.log(add);
      })
    );

    const updatedUser = await demoUser.findOne({
      where: {
        email: email,
      },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "latitude",
        "longitude",
      ],
      include: [
        {
          model: demoUser,
          as: "contact",
          attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "latitude",
            "longitude",
          ],
          through: { attributes: [] }, //  <== Here
          required: true,
        },
      ],
    });
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

/* RECEIVE CONNECTION ************************** */
users.put("/id/:userId/contreq", async (req, res, next) => {
  try {
    const { id } = req.params.userId;
    const { status, requestingId } = req.body;
    const userReceiving = await demoUser.findByPk(id);
    const userRequesting = await demoUser.findByPk(requestingId);
    const connection = await Contact.findOne({
      where: {
        userId: userReceiving.id,
        contactId: userRequesting.id
      }
    })
    if (status === "accepted") {
      const complete = connection.update({
        accepted: true
      })
      res.status(201).json({ msg: "request accepted", user: userReceiving });
    } else if (status === "denied") {
        const complete = await connection.update({
          accepted: false
        })
        const remove = await connection.destroy()
        res.status(303).json({ msg: "request denied" });
    }
  } catch (err) {
    next(err);
  }
});





module.exports = users;
