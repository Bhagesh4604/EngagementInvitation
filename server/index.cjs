const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'engagement_website',
  port: process.env.DB_PORT || 3306
};

console.log('Using database config:', dbConfig);

const db = mysql.createConnection(dbConfig);

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// --- API Endpoints ---

// Get all content
app.get('/api/content', (req, res) => {
  db.query('SELECT * FROM content', (err, result) => {
    if (err) {
      console.error('Error fetching content:', err);
      res.status(500).send(err);
    } else {
      res.send(result[0]);
    }
  });
});

// Update content
app.put('/api/content', (req, res) => {
  const content = req.body;
  const sql = `UPDATE content SET ? WHERE id = 1`;
  db.query(sql, content, (err, result) => {
    if (err) {
      console.error('Error updating content:', err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

// Get all timeline items
app.get('/api/timeline', (req, res) => {
  db.query('SELECT * FROM timeline', (err, result) => {
    if (err) {
      console.error('Error fetching timeline:', err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

// Add a timeline item
app.post('/api/timeline', (req, res) => {
  const newItem = req.body;
  const sql = `INSERT INTO timeline SET ?`;
  db.query(sql, newItem, (err, result) => {
    if (err) {
      console.error('Error adding timeline item:', err);
      res.status(500).send(err);
    } else {
      res.send({ id: result.insertId, ...newItem });
    }
  });
});

// Update a timeline item
app.put('/api/timeline/:id', (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  const sql = `UPDATE timeline SET ? WHERE id = ?`;
  db.query(sql, [updatedItem, id], (err, result) => {
    if (err) {
      console.error('Error updating timeline item:', err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

// Delete a timeline item
app.delete('/api/timeline/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM timeline WHERE id = ?`;
  db.query(sql, id, (err, result) => {
    if (err) {
      console.error('Error deleting timeline item:', err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

// Get all wishes
app.get('/api/wishes', (req, res) => {
  db.query('SELECT * FROM wishes ORDER BY timestamp DESC', (err, result) => {
    if (err) {
      console.error('Error fetching wishes:', err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

// Add a wish
app.post('/api/wishes', (req, res) => {
  const newWish = req.body;
  newWish.timestamp = Date.now();
  const sql = `INSERT INTO wishes SET ?`;
  db.query(sql, newWish, (err, result) => {
    if (err) {
      console.error('Error adding wish:', err);
      res.status(500).send(err);
    } else {
      res.send({ id: result.insertId, ...newWish });
    }
  });
});

// Delete a wish
app.delete('/api/wishes/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM wishes WHERE id = ?`;
    db.query(sql, id, (err, result) => {
        if (err) {
            console.error('Error deleting wish:', err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

// Get all gallery items
app.get('/api/gallery', (req, res) => {
  db.query('SELECT * FROM gallery', (err, result) => {
    if (err) {
      console.error('Error fetching gallery:', err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

// Upload a gallery item
app.post('/api/gallery', (req, res) => {
  const newItem = req.body;
  newItem.timestamp = Date.now();
  const sql = `INSERT INTO gallery SET ?`;
  db.query(sql, newItem, (err, result) => {
    if (err) {
      console.error('Error uploading gallery item:', err);
      res.status(500).send(err);
    } else {
      res.send({ id: result.insertId, ...newItem });
    }
  });
});

// Update a gallery item (for approving photos)
app.put('/api/gallery/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const sql = `UPDATE gallery SET ? WHERE id = ?`;
    db.query(sql, [updatedItem, id], (err, result) => {
        if (err) {
            console.error('Error updating gallery item:', err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

// Delete a gallery item
app.delete('/api/gallery/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM gallery WHERE id = ?`;
    db.query(sql, id, (err, result) => {
        if (err) {
            console.error('Error deleting gallery item:', err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
