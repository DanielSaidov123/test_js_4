import { readReceipts, readUsers, writeUsers } from "../utils/index.js";

export const CreateUser = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ err: "missing username or password" });
    }

    const userslist = await readUsers();

    const user = userslist.find((u) => u.username === req.body.username);
    if (user) {
      return res.status(401).send({ err: "There is already such a user. " });
    }
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

export const UserPurchaseSummary = async (req, res) => {
  try {
    const receiptslist = await readReceipts();
 
    
    const user = receiptslist.find((r) => r.username === req.params.username);
    
    if (!user) {
      return res.status(401).send({ err: "There is already such a user. " });
    }
    
    const receiptsBYusername = receiptslist.filter(
      (r) => r.username === req.params.username
    );
    if (receiptsBYusername.length === 0) {
      const obj = {
        totalTicketsBought: 0,
        events: ["event name", "event name"],
        averageTicketsPerEvent: 0,
      };
      return res.status(200).send(obj);
    }
    let sum = 0;
    const arrnameevent=[]
    for (let i = 0; i < receiptsBYusername.length; i++) {
      sum += receiptsBYusername[i].icketsBought;
      console.log(arrnameevent.includes(receiptsBYusername.eventName));
      console.log(receiptsBYusername.eventName);
      
      if(!arrnameevent.includes(receiptsBYusername[i].eventName)) {
        arrnameevent.push(receiptsBYusername[i].eventName)
      }
    }
    for (let i = 0; i <arrnameevent.length ; i++) {

     }
    return res.status(200).send({totalTicketsBought:sum,events:arrnameevent,averageTicketsPerEvent:sum/arrnameevent.length});
  
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};
