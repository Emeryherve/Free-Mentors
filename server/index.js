import express from 'express';
import dotenv from 'dotenv';
import bodyParse from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { NOT_FOUND } from './helpers/status_codes';
import userRoute from './routes/user_route';
import sessionRoute from './routes/session_route';
import swaggerDocument from '../app.json';

dotenv.config();
const app = express();
app.use(bodyParse.json());
app.use('/api/v2', userRoute);
app.use('/api/v1/sessions', sessionRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', (req, res) => res.status(NOT_FOUND).send({
  status: NOT_FOUND,
  message: 'No specific route found!',
}));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
