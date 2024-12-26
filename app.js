const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bookRoutes = require('./routes/bookroutes');
const authorRoutes = require('./routes/authorRoutes');
const borrowerRoutes = require('./routes/borrowerRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Serve static files from the "public" folder

mongoose.connect('mongodb://localhost:27017/library', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/borrowers', borrowerRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Serve homepage
});

app.listen(3000, () => 
    console.log(`Server running on http://localhost:3000/`)
);
