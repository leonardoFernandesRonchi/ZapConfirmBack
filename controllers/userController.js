const { signUpService, signInService } = require("@services/userService");

const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    await signUpService({ username, email, password });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await signInService({ email, password });

    // cria cookie seguro HttpOnly
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // HTTPS
      sameSite: "Strict", // evita CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1 dia
    });

    // retorna apenas os dados do usuário
    res.status(200).json({ user: user, token: token });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn };
