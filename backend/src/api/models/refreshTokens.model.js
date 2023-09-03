const {db} = require('../../../db/db');

const createRefreshToken = async ({uid, refreshToken}) => {
  const newRefreshToken = await db('refresh_tokens')
      .insert({uid, refresh_token: refreshToken})
      .returning('*');

  return newRefreshToken;
};

const updateRefreshToken = async ({uid, refreshToken}) => {
  const updatedRefreshToken = await db('refresh_tokens')
      .where({uid})
      .update('refresh_token', refreshToken)
      .returning('*');

  return updatedRefreshToken;
};

const getRefreshTokenByUid = async (uid) => {
  const [refreshToken] = await db('refresh_tokens').where({uid}).select('*')
  return refreshToken;
};

const deleteRefreshTokenByUid = async (uid) => {
  return await db('refresh_tokens').where({uid}).del().returning('*');
};

module.exports = {
  createRefreshToken,
  updateRefreshToken,
  getRefreshTokenByUid,
  deleteRefreshTokenByUid,
};
