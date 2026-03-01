const { User } = require("../models");
const { jwtSign } = require("../helpers/jwt");
const {bcryptHash, bcryptCompare} = require("../helpers/bcrypt");
const {FieldRequiredError, AlreadyTakenError} = require("../helpers/customErrors")

async function signUpService({username, email, password}) {
    if (!username) throw new FieldRequiredError(`A username`);
    if (!email) throw new FieldRequiredError(`An email`);
    if (!password) throw new FieldRequiredError(`A password`);

     const userExists = await User.findOne({
      where: { email: email },
    });
    if (userExists) throw new AlreadyTakenError("Email", "try logging in");
    const newUser = await User.create({
      email: email,
      username: username,
      password: await bcryptHash(password),
    });
    newUser.dataValues.token = await jwtSign({
    id: newUser?.id,
    email: newUser?.email,
    })
    return {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        token: newUser.dataValues.token
    }
}

async function signInService({email, password}) {
  if (!email) throw new FieldRequiredError(`An email`);
  if (!password) throw new FieldRequiredError(`A password`);

  const user = await User.findOne({ where: {email: email}})

  if (!user) {
    throw new Error('Invalid credentials');
  }

  if (!(await bcryptCompare(password, user.password))) {
    throw new Error('Invalid credentials');
}
  user.dataValues.token = await jwtSign({
  id: user?.id,
  email: user?.email,
});

  return {
    id: user?.id,
    email: user?.email,
    username: user?.username,
    token: user?.dataValues.token
  }
}

module.exports = {signUpService, signInService}