const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const fs = require('fs');
const os = require('os');

// Data persistence fallback (when MongoDB is not available)
const DATA_DIR = path.join(__dirname, 'data');
const SKILLS_FILE = path.join(DATA_DIR, 'skills.json');
const CERTIFICATES_FILE = path.join(DATA_DIR, 'certificates.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
const CHATS_FILE = path.join(DATA_DIR, 'chats.json');

const ensureDataDir = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
};

const readJson = (filePath, fallback = []) => {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading JSON file', filePath, err);
    return fallback;
  }
};

const writeJson = (filePath, data) => {
  try {
    ensureDataDir();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing JSON file', filePath, err);
  }
};

const generateId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

let useMongo = false;
let contactsData = readJson(CONTACTS_FILE);
let skillsData = readJson(SKILLS_FILE);
let certificatesData = readJson(CERTIFICATES_FILE);
let chatsData = readJson(CHATS_FILE);

// Admin Credentials (Hidden in comments for convenience)
// Username: admin_himanshu
// Password: portfolio2025!secure
// Note: Change these credentials in production for security

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
 // Change to your MongoDB URI                                                  mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  useMongo = true;
})
.catch(err => {
  console.log('MongoDB connection error:', err);
  useMongo = false;
});

// Contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Skill schema
const skillSchema = new mongoose.Schema({
  name: String,
  percentage: Number,
  date: { type: Date, default: Date.now }
});

const Skill = mongoose.model('Skill', skillSchema);

// Certificate schema
const certificateSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  date: { type: Date, default: Date.now }
});

const Certificate = mongoose.model('Certificate', certificateSchema);

// Chat messages schema (for virtual assistant and admin logs)
const chatSchema = new mongoose.Schema({
  message: String,
  date: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Admin login route
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  // Admin credentials (same as in comments above)
  const adminUsername = 'admin_himanshu';
  const adminPassword = 'portfolio2025!secure';

  if (username === adminUsername && password === adminPassword) {
    res.json({
      success: true,
      message: 'Login successful!',
      redirect: '/admin/dashboard'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// Admin dashboard route
app.get('/admin/dashboard', (req, res) => {
  // In a real application, you'd check for authentication here
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">  
        <title>Admin Dashboard - Himanshu Saini</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootst
rap.min.css" rel="stylesheet">                                                      </head>
    <body>
        <div class="container mt-5">
            <h1>Admin Dashboard</h1>
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">Contact Messages</div>
                        <div class="card-body">
                            <p>View and manage contact form submissions</p>     
                            <a href="/admin/contacts" class="btn btn-primary">Vi
ew Contacts</a>                                                                                         </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">Chat Messages</div>
                        <div class="card-body">
                            <p>View virtual assistant chat logs</p>
                            <a href="/admin/chats" class="btn btn-primary">View 
Chats</a>                                                                                               </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">Edit Skills</div>
                        <div class="card-body">
                            <p>Update your skills section</p>
                            <a href="/admin/edit-skills" class="btn btn-primary"
>Edit Skills</a>                                                                                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Edit Certificates</div>        
                        <div class="card-body">
                            <p>Manage your certificates</p>
                            <a href="/admin/edit-certificates" class="btn btn-pr
imary">Edit Certificates</a>                                                                            </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Site Settings</div>
                        <div class="card-body">
                            <p>Configure website settings</p>
                            <a href="/admin/settings" class="btn btn-primary">Se
ttings</a>                                                                                              </div>
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <a href="/" class="btn btn-secondary">Back to Website</a>       
            </div>
        </div>
    </body>
    </html>
  `);
});

// Admin contacts route
app.get('/admin/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Admin - Contact Messages</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/boot
strap.min.css" rel="stylesheet">                                                      </head>
      <body>
          <div class="container mt-5">
              <h1>Contact Messages</h1>
              <a href="/admin/dashboard" class="btn btn-secondary mb-3">Back to 
Dashboard</a>                                                                                 <div class="table-responsive">
                  <table class="table table-striped">
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Message</th>
                              <th>Date</th>
                          </tr>
                      </thead>
                      <tbody>
    `;

    contacts.forEach(contact => {
      html += `
        <tr>
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.message}</td>
            <td>${contact.date.toLocaleDateString()}</td>
        </tr>
      `;
    });

    html += `
                      </tbody>
                  </table>
              </div>
          </div>
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    res.status(500).send('Error loading contacts');
  }
});

// Admin chats route
app.get('/admin/chats', async (req, res) => {
  try {
    const chats = useMongo ? await Chat.find().sort({ date: -1 }) : chatsData;  

    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Admin - Chat Messages</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/boot
strap.min.css" rel="stylesheet">                                                      </head>
      <body>
          <div class="container mt-5">
              <h1>Chat Messages</h1>
              <a href="/admin/dashboard" class="btn btn-secondary mb-3">Back to 
Dashboard</a>                                                                                 <div class="table-responsive">
                  <table class="table table-striped">
                      <thead>
                          <tr>
                              <th>Message</th>
                              <th>Date</th>
                          </tr>
                      </thead>
                      <tbody>
    `;

    chats.forEach(chat => {
      const date = chat.date ? new Date(chat.date) : new Date();
      html += `
        <tr>
            <td>${chat.message}</td>
            <td>${date.toLocaleDateString()}</td>
        </tr>
      `;
    });

    html += `
                      </tbody>
                  </table>
              </div>
          </div>
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    res.status(500).send('Error loading chats');
  }
});

// Admin edit skills route
app.get('/admin/edit-skills', async (req, res) => {
  try {
    const skills = useMongo ? await Skill.find().sort({ date: -1 }) : skillsData
;                                                                                   let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Admin - Edit Skills</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/boot
strap.min.css" rel="stylesheet">                                                      </head>
      <body>
          <div class="container mt-5">
              <h1>Edit Skills</h1>
              <a href="/admin/dashboard" class="btn btn-secondary mb-3">Back to 
Dashboard</a>                                                                                 <form action="/admin/add-skill" method="POST" class="mb-4">       
                  <div class="row">
                      <div class="col-md-6">
                          <input type="text" name="name" class="form-control" pl
aceholder="Skill Name" required>                                                                      </div>
                      <div class="col-md-4">
                          <input type="number" name="percentage" class="form-con
trol" placeholder="Percentage" min="0" max="100" required>                                            </div>
                      <div class="col-md-2">
                          <button type="submit" class="btn btn-success">Add Skil
l</button>                                                                                            </div>
                  </div>
              </form>
              <h3>Current Skills</h3>
              <div class="table-responsive">
                  <table class="table table-striped">
                      <thead>
                          <tr>
                              <th>Skill</th>
                              <th>Percentage</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
    `;

    skills.forEach(skill => {
      const id = skill._id || skill.id;
      html += `
        <tr>
            <td>${skill.name}</td>
            <td>${skill.percentage}%</td>
            <td>
                <a href="/admin/delete-skill/${id}" class="btn btn-danger btn-sm
">Delete</a>                                                                                </td>
        </tr>
      `;
    });

    html += `
                      </tbody>
                  </table>
              </div>
          </div>
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    res.status(500).send('Error loading skills');
  }
});

// Add skill route
app.post('/admin/add-skill', async (req, res) => {
  try {
    const { name, percentage } = req.body;
    const percent = parseInt(percentage);

    if (useMongo) {
      const newSkill = new Skill({ name, percentage: percent });
      await newSkill.save();
    } else {
      const newSkill = { _id: generateId(), name, percentage: percent, date: new
 Date() };                                                                            skillsData.unshift(newSkill);
      writeJson(SKILLS_FILE, skillsData);
    }

    res.redirect('/admin/edit-skills');
  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).send('Error adding skill');
  }
});

// Delete skill route
app.get('/admin/delete-skill/:id', async (req, res) => {
  try {
    if (useMongo) {
      await Skill.findByIdAndDelete(req.params.id);
    } else {
      skillsData = skillsData.filter(skill => (skill._id || skill.id) !== req.pa
rams.id);                                                                             writeJson(SKILLS_FILE, skillsData);
    }
    res.redirect('/admin/edit-skills');
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).send('Error deleting skill');
  }
});

// Admin edit certificates route
app.get('/admin/edit-certificates', async (req, res) => {
  try {
    const certificates = useMongo ? await Certificate.find().sort({ date: -1 }) 
: certificatesData;                                                                 let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Admin - Edit Certificates</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/boot
strap.min.css" rel="stylesheet">                                                      </head>
      <body>
          <div class="container mt-5">
              <h1>Edit Certificates</h1>
              <a href="/admin/dashboard" class="btn btn-secondary mb-3">Back to 
Dashboard</a>                                                                                 <form action="/admin/add-certificate" method="POST" class="mb-4"> 
                  <div class="mb-3">
                      <input type="text" name="title" class="form-control" place
holder="Certificate Title" required>                                                              </div>
                  <div class="mb-3">
                      <textarea name="description" class="form-control" placehol
der="Description" rows="3" required></textarea>                                                   </div>
                  <div class="mb-3">
                      <input type="url" name="imageUrl" class="form-control" pla
ceholder="Image URL" required>                                                                    </div>
                  <button type="submit" class="btn btn-success">Add Certificate<
/button>                                                                                      </form>
              <h3>Current Certificates</h3>
              <div class="table-responsive">
                  <table class="table table-striped">
                      <thead>
                          <tr>
                              <th>Title</th>
                              <th>Description</th>
                              <th>Image</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
    `;

    certificates.forEach(cert => {
      const id = cert._id || cert.id;
      html += `
        <tr>
            <td>${cert.title}</td>
            <td>${cert.description}</td>
            <td><img src="${cert.imageUrl}" alt="${cert.title}" style="width: 50
px; height: 50px;"></td>                                                                    <td>
                <a href="/admin/delete-certificate/${id}" class="btn btn-danger 
btn-sm">Delete</a>                                                                          </td>
        </tr>
      `;
    });

    html += `
                      </tbody>
                  </table>
              </div>
          </div>
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    res.status(500).send('Error loading certificates');
  }
});

// Add certificate route
app.post('/admin/add-certificate', async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;

    if (useMongo) {
      const newCert = new Certificate({ title, description, imageUrl });        
      await newCert.save();
    } else {
      const newCert = { _id: generateId(), title, description, imageUrl, date: n
ew Date() };                                                                          certificatesData.unshift(newCert);
      writeJson(CERTIFICATES_FILE, certificatesData);
    }

    res.redirect('/admin/edit-certificates');
  } catch (error) {
    console.error('Error adding certificate:', error);
    res.status(500).send('Error adding certificate');
  }
});

// Delete certificate route
app.get('/admin/delete-certificate/:id', async (req, res) => {
  try {
    if (useMongo) {
      await Certificate.findByIdAndDelete(req.params.id);
    } else {
      const id = req.params.id;
      const index = certificatesData.findIndex((c) => c._id === id || c.id === i
d);                                                                                   if (index !== -1) {
        certificatesData.splice(index, 1);
        writeJson(CERTIFICATES_FILE, certificatesData);
      }
    }

    res.redirect('/admin/edit-certificates');
  } catch (error) {
    console.error('Error deleting certificate:', error);
    res.status(500).send('Error deleting certificate');
  }
});

// Admin settings route
app.get('/admin/settings', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">  
        <title>Admin - Settings</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootst
rap.min.css" rel="stylesheet">                                                      </head>
    <body>
        <div class="container mt-5">
            <h1>Site Settings</h1>
            <a href="/admin/dashboard" class="btn btn-secondary mb-3">Back to Da
shboard</a>                                                                                 <div class="alert alert-info">
                <strong>Admin Credentials:</strong><br>
                Username: admin_himanshu<br>
                Password: portfolio2025!secure<br>
                <small class="text-muted">Change these in the server.js file for
 security.</small>                                                                          </div>
            <div class="alert alert-warning">
                <strong>Note:</strong> To fully control the website content, use
 the Edit Skills and Edit Certificates sections. The frontend currently shows static content, but you can manage data here for future dynamic updates.                      </div>
        </div>
    </body>
    </html>
  `);
});

app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (useMongo) {
      const newContact = new Contact({ name, email, message });
      await newContact.save();
    } else {
      const newContact = { _id: generateId(), name, email, message, date: new Da
te() };                                                                               contactsData.unshift(newContact);
      writeJson(CONTACTS_FILE, contactsData);
    }

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ success: false, message: 'Error sending message' }); 
  }
});

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (useMongo) {
      const newChat = new Chat({ message });
      await newChat.save();
    } else {
      const newChat = { _id: generateId(), message, date: new Date() };
      chatsData.unshift(newChat);
      writeJson(CHATS_FILE, chatsData);
    }

    res.json({ success: true, message: 'Chat message saved!' });
  } catch (error) {
    console.error('Error saving chat:', error);
    res.status(500).json({ success: false, message: 'Error saving chat' });     
  }
});

// API routes for dynamic content
app.get('/api/skills', async (req, res) => {
  try {
    const skills = useMongo ? await Skill.find().sort({ date: -1 }) : skillsData
;                                                                                   res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching skills' });
  }
});

app.get('/api/certificates', async (req, res) => {
  try {
    const certificates = useMongo ? await Certificate.find().sort({ date: -1 }) 
: certificatesData;                                                                 res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching certificates' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});