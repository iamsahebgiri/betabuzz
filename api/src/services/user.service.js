const sharp = require('sharp');
const httpStatus = require('http-status');
const config = require('../config/config');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const strings = require('../utils/strings');
const uploadService = require('./upload.service');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Create a user via google
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUserViaGoogle = async (userBody) => {
  const user = await User.findOneAndUpdate(
    {
      email: userBody.email,
    },
    {
      ...userBody,
    },
    {
      upsert: true,
      new: true,
    },
  );
  return user;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Get user by username
 * @param {string} username
 * @returns {Promise<User>}
 */
const getUserByUsername = async (username) => {
  return User.findOne({ username });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const payload = { ...updateBody };
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (updateBody.username && (await User.isEmailTaken(updateBody.username, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }
  if (updateBody.email) {
    payload.avatar = `https://api.dicebear.com/6.x/avataaars/svg?seed=${updateBody.email}&backgroundColor=b6e3f4,c0aede,d1d4f9,fda4af,f0abfc,67e8f9,a7f3d0`;
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.delete();
  return user;
};

/**
 * Upload avatar
 * @param {ObjectId} userId
 * @param {Object} file
 * @returns {Promise<User>}
 */
const uploadAvatar = async (userId, file) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const name = strings.generateFileName();
  const fileBuffer = await sharp(file.buffer).resize({ height: 256, width: 256 }).toBuffer();
  await uploadService.uploadFile({
    ...file,
    buffer: fileBuffer,
    key: name,
  });
  const avatarUrl = `https://${config.aws.s3.bucketName}.s3.${config.aws.s3.bucketRegion}.amazonaws.com/${name}`;
  user.avatar = avatarUrl;
  await user.save();
  return user;
};

/**
 * Remove avatar
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteAvatar = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (user.avatar !== null && user.avatar.includes('amazonaws.com')) {
    const key = user.avatar.split('/').pop();
    await uploadService.deleteFile(key);
  }
  user.avatar = `https://api.dicebear.com/6.x/avataaars/svg?seed=${user.email}&backgroundColor=b6e3f4,c0aede,d1d4f9,fda4af,f0abfc,67e8f9,a7f3d0`;
  await user.save();
  return user;
};

module.exports = {
  createUserViaGoogle,
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  updateUserById,
  deleteUserById,
  uploadAvatar,
  deleteAvatar,
};
