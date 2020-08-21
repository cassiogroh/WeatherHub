import express from 'express';

import homePage from './routes';

const app = express();

app.get('/', homePage )



const port = process.env.PORT || 3333;

app.listen(port, () => `Server running on port ${port}`);


