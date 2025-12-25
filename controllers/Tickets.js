import {
  readEvents,
  readReceipts,
  validateUser,
  writeEvents,
  writeReceipts,
} from "../utils/index.js";

export const CreateTickets = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ err: "missing username or password" });
    }
    const Intquantity = parseInt(req.body.quantity);
    if (isNaN(Intquantity)) throw new Error("Invalid quantity, please use an integer.");

    const user = await validateUser(req.body.username, req.body.password);
    if (!user) {
      return res
        .status(401)
        .send({ err: "username or password is not good. try again" });
    }

    const eventlist = await readEvents();
    const event = eventlist.find((e) => e.eventName == req.body.eventName);
    if (!event) {
      return res.status(401).send({ err: "event is Not found" });
    }
    console.log(Intquantity);
    
    if (event.ticketsForSale < Intquantity) {
        return res.status(401).send({ err: "quantity > ticketsForSale" });
    }
    const listReceipts=await readReceipts()
    
    const newticets={
      username:req.body.username,
      eventName : req.body.eventName,
      icketsBought:Intquantity
    }

    listReceipts.push(newticets);
    await writeReceipts(listReceipts)
    event.ticketsForSale-=Intquantity
    await writeEvents(eventlist);

    res.status(201).send({ message: "Event created successfully" });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};
