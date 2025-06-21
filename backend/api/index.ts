import { app, } from "../src/app";
import dotenv from "dotenv";

dotenv.config();

console.clear();

const PORT = process.env.PORT || 3001;

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, async () => {
  console.log("Server is running on port:", PORT);
});

export default app;