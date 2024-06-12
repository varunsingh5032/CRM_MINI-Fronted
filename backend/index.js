const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const customersRouter = require('./routes/customers');
const ordersRouter = require('./routes/orders');
const audiencesRouter = require('./routes/audiences');
const campaignsRouter = require('./routes/campaigns');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(express.json());
app.use('/api/customers', customersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/audiences', audiencesRouter);
app.use('/api/campaigns', campaignsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
