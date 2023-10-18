//Login Flow Starts
const {
  findUserDetails,
  createNewUser,
  getAllUser,
  updateUser,
  findUserById,
  deleteUser,
  getSingleUser,
} = require('../../helpers/auth');
const { generateResponse } = require('../../utils/response');
const jwt = require('jsonwebtoken');

const signupProcess = async (req, res) => {
  const findUser = await findUserDetails(req.body.email);
  if (findUser) {
    res.send(generateResponse(true, 'User already exists', 200, findUser._id));
  } else {
    const payload = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      avatar: req.body.avatar,
      address: req.body.address,
      cart: [],
      password: req.body.password,
    };
    if (req.body.role) {
      payload.role = req.body.role;
    } else {
      payload.role = 'User';
    }
    const newUser = await createNewUser(payload);
    if (newUser) {
      let data = {};
      data.email = newUser.email;
      data._id = newUser._id;
      data.role = newUser.role;
      let token = jwt.sign({ data }, 'My_new_token', { expiresIn: '1d' });
      res.json(
        generateResponse(true, 'User created Successfully', 200, {
          token,
          ...newUser._doc,
        }),
      );
    } else {
      res.json(generateResponse(true, 'Something went wrong, Try again later.', 403, null));
    }
  }
};

const loginProcess = async (req, res) => {
  const findUser = await findUserDetails(req.query.email);
  if (!findUser) {
    res.json(generateResponse(true, 'User not found', 403, null));
  } else {
    if (req.query.password === findUser.password) {
      let data = {};
      data.email = findUser.email;
      data._id = findUser._id;
      let token = jwt.sign({ data }, 'My_new_token', { expiresIn: '1d' });
      res.json(
        generateResponse(true, 'Login Success.', 200, {
          token,
          ...findUser._doc,
        }),
      );
    } else {
      res.json(generateResponse(true, 'Invalid credentials', 403, null));
    }
  }
};
// Get All user
const all_Users = async (req, res) => {
  const user = await getAllUser();
  if (user.length > 0) {
    res.json(generateResponse(true, 'All user data fetched successfully', 200, user));
  } else {
    res.json(generateResponse(true, 'Something went wrong', 403, null));
  }
};

// Single product
const single_Users = async (req, res) => {
  const users = await getSingleUser(req.query.email);
  if (users) {
    res.json(generateResponse(true, 'User data fetched successfully', 200, users));
  } else {
    res.json(generateResponse(true, 'Something went wrong', 403, null));
  }
};

// Add New users

// Update product
const update_Users = async (req, res) => {
  try {
    const payload = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      avatar: req.body.avatar,
      address: req.body.address,
    };

    const updatedProduct = await updateUser(req.body._id, payload);
    const newData = await findUserById(req.body._id);
    res.json(newData);
  } catch (error) {
    res.json({ message: error });
  }
};

// Delete product
const delete_Users = async (req, res) => {
  try {
    const removeProduct = await deleteUser(req.query.id);
    res.json(removeProduct);
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = {
  all_Users,
  single_Users,
  update_Users,
  delete_Users,
  signupProcess,
  loginProcess,
};
