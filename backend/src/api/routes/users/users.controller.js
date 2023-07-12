const usersModel = require('../../models/users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const refreshTokensModel = require('../../models/refreshTokens.model')

const getAllUsers = (req, res) => {
    res.status(200).json({ user: 1 })
}

const signupUser = async (req, res) => {
    const data = { ...req.body }
    const { email, firstName, lastName, password } = data

    // Validate form fields
    if (!email || !firstName || !lastName || !password) {
        return res.status(400).json({ error: "Please specify all fields" })
    }

    // Validate user email
    const doesUserExist = (await usersModel.getUserByEmail(email)).length !== 0
    if (doesUserExist) {
        return res.status(400).json({ error: "Email already exists" })
    }

    const saltRounds = 8
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    data.password = hash
    const newUser = await usersModel.createUser(data)
    return res.status(201).json(newUser)
}

const loginUser = async (req, res) => {
    const data = { ...req.body }
    const { email, password } = data

    // Validate form fields
    if (!email || !password) {
        return res.status(400).json({ error: "Please specify all fields" })
    }

    // Validate user email
    const [user] = await usersModel.getUserByEmail(email)
    if (!user) {
        return res.status(400).json({ error: "Invalid credentials" })
    }

    // Validate user password
    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ error: "Invalid credentials" })
    }

    // Generate token and refresh token
    const token = jwt.sign(
        { uid: user.uid },
        process.env.DEV_JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );

    const refreshToken = jwt.sign(
        { uid: user.uid },
        process.env.DEV_JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    // Add refresh token to database if user does not have refresh token or update existing refresh token
    const doesRefreshTokenExist = (await refreshTokensModel.getRefreshTokenByUid(user.uid)).length !== 0
    const refreshTokenData = { uid: user.uid, refreshToken }

    if (!doesRefreshTokenExist) {
        await refreshTokensModel.createRefreshToken(refreshTokenData)
    } else {
        await refreshTokensModel.updateRefreshToken(refreshTokenData)
    }

    return res.status(200).json({ token, refreshToken })
}

const refreshAccessToken = async (req, res) => {
    // Take in refresh token from body
    const data = { ...req.body }
    const { refreshToken } = data

    if (!refreshToken) {
        return res.status(400).json({ error: "Please specify all fields" })
    }

    // Handle case where token is some random string or expired
    let uid;
    try {
        const decoded = jwt.verify(refreshToken, process.env.DEV_JWT_SECRET)
        uid = decoded.uid
    } catch (err) {
        return res.status(400).json({ error: "Invalid or expired refresh token" })
    }

    // Handle case where token has been revoked - deleted from db - even though it technically still has not expired
    const [existingRefreshToken] = await refreshTokensModel.getRefreshTokenByUid(uid)

    if (!existingRefreshToken) {
        return res.status(400).json({ error: "Revoked refresh token" })
    }

    const token = jwt.sign(
        { uid },
        process.env.DEV_JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
    return res.status(200).json({ token })
}

const logoutUser = async (req, res) => {
    // Take in refresh token from body
    const data = { ...req.body }
    const { refreshToken } = data

    if (!refreshToken) {
        return res.status(400).json({ error: "Please specify all fields" })
    }

    // Handle case where token is some random string or expired
    let uid;
    try {
        const decoded = jwt.verify(refreshToken, process.env.DEV_JWT_SECRET)
        uid = decoded.uid
    } catch (err) {
        return res.status(400).json({ error: "Invalid or expired refresh token" })
    }

    // Handle case where token has been revoked - deleted from db - so it makes no sense to log out again
    const [existingRefreshToken] = await refreshTokensModel.getRefreshTokenByUid(uid)

    if (!existingRefreshToken) {
        return res.status(400).json({ error: "Already signed out" })
    }

    const deletedRefreshToken = await refreshTokensModel.deleteRefreshTokenByUid(uid)
    return res.status(200).json(deletedRefreshToken)
}

module.exports = {
    getAllUsers,
    signupUser,
    loginUser,
    refreshAccessToken,
    logoutUser
}