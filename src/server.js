import "dotenv/config";
import app from "./app.js";

app.get("/", (req, res) => {
  res.send("Kolo API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});