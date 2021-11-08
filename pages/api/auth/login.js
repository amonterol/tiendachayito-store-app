/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Users from "../../../models/User";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../utils/generateToken";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email)
      return res.status(400).json({ err: "El EMAIL es un campo requerido." });
    if (!password)
      return res
        .status(400)
        .json({ err: "El PASSWORD es un campo requerido." });
    if (password.length < 6)
      return res.status(400).json({
        err: "El número de caracteres del password es inferior al requerido.",
      });

    const user = await Users.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ err: "El usuario no esta registrado en la base de datos." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ err: "La contraseña es incorrecta." });

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    res.json({
      msg: "Sessión iniciada!",
      refresh_token,
      access_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
