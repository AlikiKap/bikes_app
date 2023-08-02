import app from './app';
require('dotenv').config();

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
