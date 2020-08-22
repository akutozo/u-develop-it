const express = require('express');
const db = require('./db/database');

const PORT = process.env.PORT || 3001;
const app = express();

//Routing
const apiRoutes = require('./routes/apiRoutes');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other requests(Not Found) Catch all
// Note: This must be last to prevent override.

app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection (12.2.3)
db.on('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });