import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User, IUser } from "../models/users"
import { Owner } from "../models/owners"
import { isEmpty, accronym } from "../services/common"
import { Request, Response } from 'express'

require('dotenv').config(); 

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

export const login = async (req: Request, res: Response) => { 
  try {
    const cookies = req.cookies
    const {email, password} = <IUser>req.body;

    if (await isEmpty(Object.values(req.body))) return res.status(400).json({message: "All fields are required"})

    const user = await User.findOne({ email }).exec();

    if (!user || !user.status) return res.status(400).json({message: "Unauthorized"})
    const match = user.isValidPassword(password);

    if (!match) return res.status(400).json({message: "Unauthorized"})

    if(!user.status && !user.role) return res.status(400).json({message: "Unauthorized"})

    const token = jwt.sign(
      {
          id: user._id,
          email: user.email,
          role: user.role,
          owner: user.owner
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    const refreshToken = jwt.sign(
      { email: user.email },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    let newRefreshTokens = !cookies.jwt ? user.refresh_token : user.refresh_token.filter(x => x !== cookies.jwt)

    if(cookies.jwt) {
      const refreshToken = cookies.jwt
      const foundToken = await User.findOne({ refresh_token: refreshToken }).exec()

      // found reuse refresh token and clear all the previous refresh token
      if(!foundToken) newRefreshTokens = []
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    }

    user.refresh_token = [...newRefreshTokens, refreshToken]
    await user.save();

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, // accessible only on web server
      secure: true, // https to be change
      sameSite: "None", // cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry set to match refreshToken
    });

    // send token containing id, email, role, owner id
    res.json({ token });
  } catch (err) {
    res.sendStatus(400)
  }
};

/**
 * @desc Registration
 * @route Post /auth/register
 * @access Public
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, contact_number, status, password } =
      req.body;

      if(!contact_number) delete req.body.contact_number
    // check if body contains undefined, null or empty
    if (await isEmpty(Object.values(req.body))) return res.status(400).json({message: "All fields are required"})

    const duplicateEmail = await Owner.findOne({ email }).lean().exec();
    if (duplicateEmail) return res.status(409).json({message: "Duplicate email"});

    // check if db already exist from collection
    const database = await checkDatabaseExist(name)
  
    const ownerObject = {
      name,
      email,
      contact_number: null,
      database,
      status
    }
    const owner = await Owner.create(ownerObject)

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    delete req.body.password;

    const userObject = {
      ...req.body,
      owner: owner._id,
      password: hashPassword
    };

    // create and store new user
    const user = await User.create(userObject);

    if (!user) return res.status(500).json({message: "Server Error"})

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        owner: owner._id
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    const refreshToken = jwt.sign(
      { email: user.email },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    user.refresh_token = [refreshToken]
    await user.save()


    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, // accessible only on web server
      secure: true, // https to be change
      sameSite: "None", // cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry set to match refreshToken
    });

    // send token containing name, email username and role
    res.status(200).json({ token });
  } catch (err) {
    res.sendStatus(400)
  }
};

/**
 * @desc Refresh Token
 * @route Post /auth/refresh
 * @access Public
 */
export const refreshToken = async(req: Request, res: Response) => {
  const cookies = req.cookies
  if(!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt
  res.clearCookie("jwt", { httpOnly: true, sameSite: 'None', secure: true })
  const userFound = await User.findOne({ refresh_token: refreshToken }).exec()
  // found refresh token reuse
  if(!userFound) {
    jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET,
      async(err, decoded) => {
        if(err) return res.sendStatus(403)
        const unauthorizedUser = <IUser> await User.findOne({ email: decoded.email }).exec()
        unauthorizedUser.refresh_token = []
        await unauthorizedUser.save()
      }
    )
    return res.sendStatus(403)
  }

  const newRefreshTokens = userFound.refresh_token.filter(x => x! == refreshToken)
  //  evaluate jwt
  jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET,
    async(err, decoded) => {
      if(err) {
        userFound.refresh_token = [...newRefreshTokens]
        await userFound.save()
      }
      if(err || userFound.email !== decoded.email) return res.sendStatus(403)
      // Refresh token was still valid

      const token = jwt.sign(
        {
          id: userFound._id,
          email: userFound.email,
          role: userFound.role,
          owner: userFound.owner
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );
  
      const newRefreshToken = jwt.sign(
        { email: userFound.email },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      // saving new refresh token with current user
      userFound.refresh_token = [...newRefreshTokens, newRefreshToken]
      await userFound.save()

      // create secure cookie with refresh token
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true, // accessible only on web server
        secure: true, // https to be change
        sameSite: "None", // cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry set to match refreshToken
      });

      res.status(200).json({ token });

    }
  )
}

/**
 * @desc Logout
 * @route Post /auth/logout
 * @access Public
 */
export const logout = async(req: Request, res: Response) => {
  // delete accessToken
  const cookies = req.cookies
  if(!cookies.jwt) return res.sendStatus(204) // no content
  const refreshToken = cookies.jwt
  
  const userFound = await User.findOne({ refresh_token: refreshToken }).exec()
  if(!userFound) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);
  }

  userFound.refresh_token = userFound.refresh_token.filter(x => x !== refreshToken)
  await userFound.save()

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.sendStatus(204)
}



const checkDatabaseExist = async (value: string) => {
  // generate database name
  const database = await accronym(value)
  
  // check if database already exist
  const exist = await Owner.find({ database })
  // generate new database name if new with new parameter of 1
  if(exist.length > 0) return checkDatabaseExist(`${value}_${exist.length}`)

  return database
}

let auth = {
  login,
  register,
  refreshToken,
  logout
}

export default auth