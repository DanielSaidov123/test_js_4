import { readUsers, validateUser, writeUsers } from "../utils/index.js";

export const CreateUser = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ err: "missing username or password" });
    }

    const userslist = await readUsers();

    const user =  userslist.find((u)=>u.username===req.body.username)
    if(user){
        return res.status(401).send({ err: "There is already such a user. " });
     };
    const newuser = {
      username: req.body.username,
      password: req.body.password,
    };

    userslist.push(newuser);
    await writeUsers(userslist);

    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};
