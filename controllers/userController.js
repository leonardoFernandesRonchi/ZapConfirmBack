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
    const user = await signInService({ email, password });
    res.status(200).json({ user: user });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn };
