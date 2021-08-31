import * as express from 'express';
import {Application} from 'express';

import { getProducts } from './products';

const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

app.route('/api/products').get(getProducts);

const httpServer = app.listen(9000, () => {
    console.log('Server running at http://localhost:9000');
});