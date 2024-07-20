import express from 'express'
import expressWs from 'express-ws';
import '@/config/database';

// Create an express application
const app = express();
expressWs(app);

import mainRouter from '@/routes/routes';

// Add static path, json, and urlencoded middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the main router
app.use(mainRouter)

// Listen on the port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});