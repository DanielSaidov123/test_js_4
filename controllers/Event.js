import { readEvents, validateUser, writeEvents } from "../utils/index.js";

export const CreateEvent = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ err: "missing username or password" });
    }

    const user = await validateUser(req.body.username, req.body.password);

    if (!user) {
      return res
        .status(401)
        .send({ err: "username or password is not good. try again" });
    }
    const eventlist = await readEvents();

    const newevent = {
      eventName: req.body.eventName,
      ticketsForSale: req.body.ticketsForSale,
      username: req.body.username,
    };

    eventlist.push(newevent);
    await writeEvents(eventlist);

    res.status(201).send({ message: "Event created successfully" });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};
