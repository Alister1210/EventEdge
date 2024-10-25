import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

app.get('/', (req, res) => {
    res.send('Hello from Express.js!');
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server listening at port ${process.env.PORT || 4000}`);
});
