const Menu = require("../model/MenuModel");
const moment = require('moment');

// Create or update menu for a user

// exports.createOrUpdateMenu = async (req, res) => {
//   const { name, email, phone, menu, AlltotalAmount } = req.body;

//   try {
//       // Check if either email or phone is provided
//       if (!email && !phone) {
//           return res.status(400).json({ message: 'Email or phone number is required' });
//       }

//       let existingMenu;

//       if (email) {
//           existingMenu = await Menu.findOneAndUpdate(
//               { email },
//               { $setOnInsert: { name, email, phone }, $inc: { AlltotalAmount: AlltotalAmount }, $push: { menu: { $each: menu } } },
//               { upsert: true, new: true }
//           );
//       } else {
//           existingMenu = await Menu.findOneAndUpdate(
//               { phone },
//               { $setOnInsert: { name, email, phone }, $inc: { AlltotalAmount: AlltotalAmount }, $push: { menu: { $each: menu } } },
//               { upsert: true, new: true }
//           );
//       }

//       res.status(201).json(existingMenu);
//   } catch (err) {
//       res.status(400).json({ message: err.message });
//   }
// };



exports.createOrUpdateMenu = async (req, res) => {
  const { name, email, phone, menu } = req.body;

  try {
    // Check if phone number is provided
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    // Check if user with the given phone number already exists
    let existingMenu = await Menu.findOne({ phone });

    // Calculate purchaseAmount for each menu and AlltotalAmount
    let AlltotalAmount = 0;
    const currentTime = moment().utc(true); // Get current time using Moment.js
    for (const menuItem of menu) {
      let purchaseAmount = 0;
      for (const item of menuItem.items) {
        item.Amount = item.price * item.Quantity;
        purchaseAmount += item.Amount;
      }
      menuItem.purchaseAmount = purchaseAmount;
      AlltotalAmount += purchaseAmount;
      menuItem.purchasedate = currentTime; // Update purchase date for each menu item
    }
    const UserCreatedDate = currentTime;

    if (existingMenu) {
      // If user already exists, update the email address and menu
      existingMenu.email = email;
      existingMenu.menu.push(...menu); // Append new menu items
      existingMenu.AlltotalAmount += AlltotalAmount; // Update total amount
      await existingMenu.save();
    } else {
      // If user does not exist, create a new user
      existingMenu = await Menu.create({
        name,
        email,
        phone,
        menu,
        AlltotalAmount
      });
    }

    res.status(201).json(existingMenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.searchMenu = async (req, res) => {
  try {
    const { query } = req.query;

    const regexQuery = new RegExp(query, 'i'); // 'i' flag for case-insensitive matching

    const filter = {
      $or: [
        { name: { $regex: regexQuery } },
        { phone: query } // You can also search for exact phone numbers
      ]
    };
    // console.log('filter :>> ', filter);
    const menu = await Menu.find(filter);

    if (!menu || menu.length === 0) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    res.status(200).json(menu);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.searchMenuById = async (req, res) => {
  try {
    const { id } = req.params;

    // Search for the menu based on id
    const menu = await Menu.findOne({ _id: id });
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    res.status(200).json(menu);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// app.get('/menu/:email', async (req, res) => {
exports.getMenu = async (req, res) => {

  const email = req.params.email;

  try {
    const menu = await Menu.findOne({ email });

    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
