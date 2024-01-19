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
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.clientId);

const signupProcess = async (req, res) => {
  const findUser = await findUserDetails(req.body.email);
  if (findUser) {
    res.status(403).json(generateResponse(200, 'User already exists', findUser._id));
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
      let token = jwt.sign({ data }, 'Auth_token', { expiresIn: '1d' });
      res.json(
        generateResponse(200, 'User created Successfully', {
          token,
          ...newUser._doc,
        }),
      );
    } else {
      res.json(generateResponse(500, 'Something went wrong, Try again later.', null));
    }
  }
};

const loginProcess = async (req, res) => {
  const findUser = await findUserDetails(req.body.email);
  if (!findUser) {
    res.status(404).json(generateResponse(404, 'User not found'));
  } else {
    if (req.body.password === findUser.password) {
      let data = {};
      data.email = findUser.email;
      data._id = findUser._id;
      let token = await jwt.sign({ data }, 'Auth_token', { expiresIn: '1d' });
      console.log(token);
      res.status(200).json(
        generateResponse(200, 'Login Success', {
          token: token,
          user: { ...findUser._doc },
        }),
      );
    } else {
      res.json(generateResponse(403, 'Invalid credentials', null));
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

const googleLogin = async (req, res) => {
  const { tokenId } = req.body;
console.log("tttt",tokenId)
  client.verifyIdToken({ idToken: tokenId, audience: process.env.CLIENT_ID }).then(async (response) => {
    console.log("----",response)
    if (response) {
      const { email_verified, name, email } = response.payload;
      if (email_verified && email) {
        console.log('success');
        const user = await findUserDetails(email.toLowerCase());
        if (user) {
          let token = jwt.sign({ user }, 'App_token', { expiresIn: '1d' });
          return res.send(
            genRes.generateResponse(true, 'logged in successfully', 200, {...user, token}),
          );
        } else {
          return res.send(genRes.generateResponse(false, 'unauthorized', 401, null));
        }
      } else {
        return res.send(genRes.generateResponse(false, 'something went wrong try again', 400, null));
      }
    } else {
      return res.send(genRes.generateResponse(false, 'something went wrong try again', 400, null));
    }
  });
};

module.exports = {
  all_Users,
  single_Users,
  update_Users,
  delete_Users,
  signupProcess,
  loginProcess,
  googleLogin,
};
