import express from 'express';
import dotenv from 'dotenv'
import bodyParse from 'body-parser';
import userRoute from './routes/user_route';
import sessionRoute from './routes/session_route';

dotenv.config();
const app = express();
app.use(bodyParse.json());
app.use('/api/v1', userRoute);
app.use('/api/v1/sessions', sessionRoute);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
