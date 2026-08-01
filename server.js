const mongoose = require("mongoose");
const app = require("./app");

async function ConnectDb() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/connectionmadesuccess";
  await mongoose.connect(uri);
  console.log("connection done");
}

ConnectDb();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});