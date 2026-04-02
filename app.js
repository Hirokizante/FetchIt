const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const db = require('./data/db');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Body parser for JSON and URL-encoded forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration for cart persistence
app.use(session({
  secret: process.env.SESSION_SECRET || 'fetchit-cart-secret-key-2024',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
}));

const shopRoutes = require('./routes/shop');
app.use(shopRoutes);

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { pageTitle: 'Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});