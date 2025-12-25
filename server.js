import express from "express";
import users from "./routes/users.js"
import creator from "./routes/event.js"

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// ================== ROUTES ===================
app.get("/", async (req, res) => {
  res.json({
    message: "Welcome to Event Ticket Server API",
    version: "1.0.0",
  });
});



app.use("/users", users);
app.use("/creator", creator);



 


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});


