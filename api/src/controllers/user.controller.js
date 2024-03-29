const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, billingService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getUserByUsername = catchAsync(async (req, res) => {
  const user = await userService.getUserByUsername(req.params.username);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getMe = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const uploadAvatar = catchAsync(async (req, res) => {
  const file = pick(req.file, ['buffer', 'mimetype']);
  const user = await userService.uploadAvatar(req.user.id, file);
  res.status(httpStatus.CREATED).send(user);
});

const removeAvatar = catchAsync(async (req, res) => {
  const user = await userService.deleteAvatar(req.user.id);
  res.send(user);
});

const upgradeBilling = catchAsync(async (req, res) => {
  const { priceId } = pick(req.query, ['priceId']);
  const session = await billingService.upgradeBilling(req.user, priceId);
  res.send(session);
});

const manageBilling = catchAsync(async (req, res) => {
  const url = await billingService.manageBilling(req.user.id);
  res.send({ url });
});

module.exports = {
  createUser,
  deleteUser,
  getMe,
  getUser,
  getUserByUsername,
  getUsers,
  manageBilling,
  removeAvatar,
  updateUser,
  upgradeBilling,
  uploadAvatar,
};
