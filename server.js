const mongoose = require("mongoose");
const app = require("./app");

async function ConnectDb() {
  await mongoose.connect("mongodb://localhost:27017/connectionmadesuccess");
  console.log("connection done");
}

ConnectDb();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});