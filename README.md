# Himanshu Saini - Portfolio Website

A modern, responsive portfolio website showcasing full-stack development skills, projects, and expertise. Built with Node.js, Express, MongoDB, and featuring dynamic content management.

## 🌟 Features

- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Dynamic Content**: Skills and certificates loaded from database
- **Admin Panel**: Secure dashboard for content management
- **Contact System**: Form submissions with database storage
- **Virtual Assistant**: Interactive chatbot with predefined responses
- **Theme Toggle**: Light/dark mode support
- **WhatsApp Integration**: Direct messaging capability
- **SEO Optimized**: Meta tags and structured data
- **Analytics**: Vercel Analytics integration

## 🚀 Live Demo

Visit the live portfolio: [https://himanshu925.github.io/portfolio-himanshu-saini-complete/](https://himanshu925.github.io/portfolio-himanshu-saini-complete/)

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (optional - falls back to JSON files)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Himanshu925/portfolio-himanshu-saini-complete.git
   cd portfolio-himanshu-saini-complete
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup (Optional)**
   ```bash
   # Create .env file for MongoDB
   echo "MONGO_URI=mongodb://localhost:27017/portfolio" > .env
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Access the website**
   - Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Configuration

### Admin Access
- **Username**: `admin_himanshu`
- **Password**: `portfolio2025!secure`
- **Admin URL**: `http://localhost:3000/admin/dashboard`

### Database Options
- **MongoDB**: Set `MONGO_URI` in `.env` file
- **JSON Files**: Automatic fallback if MongoDB unavailable

## 📁 Project Structure

```
portfolio-himanshu-saini-complete/
├── server.js              # Main server file
├── index.html             # Main portfolio page
├── about.html             # About page
├── contact.html           # Contact page
├── privacy.html           # Privacy policy
├── terms.html             # Terms of service
├── package.json           # Dependencies
├── vercel.json            # Deployment config
├── .gitignore             # Git ignore rules
├── ads.txt                # AdSense configuration
├── sainihimanshu.jpg      # Profile image
├── data/                  # JSON fallback storage
│   ├── skills.json
│   ├── certificates.json
│   ├── contacts.json
│   └── chats.json
└── README.md
```

## 🎨 Customization

### Changing Admin Credentials
Edit `server.js` lines containing:
```javascript
const adminUsername = 'admin_himanshu';
const adminPassword = 'portfolio2025!secure';
```

### Updating Content
- **Skills**: Use admin panel or edit `data/skills.json`
- **Certificates**: Use admin panel or edit `data/certificates.json`
- **Profile Image**: Replace `sainihimanshu.jpg`
- **Contact Info**: Update in HTML files and server.js

### Styling
- Main styles in `index.html` `<style>` section
- Consistent across all pages
- CSS variables for easy theme customization

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Deploy automatically on push
3. Environment variables set in Vercel dashboard

### Heroku
1. Create Heroku app
2. Set environment variables
3. Deploy via Git or GitHub integration

### Netlify
1. Connect repository
2. Set build command: `npm start`
3. Configure environment variables

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🔒 Security Features

- Admin authentication with secure credentials
- Input validation on forms
- CORS enabled for API access
- No sensitive data in client-side code
- Secure headers and practices

## 📊 Analytics

Integrated with Vercel Analytics for:
- Page views and user interactions
- Performance metrics
- Geographic data
- Device and browser statistics

## 🤖 Virtual Assistant

Pre-configured responses for:
- About inquiries
- Skills and experience questions
- Contact information
- Project discussions
- Hiring opportunities

## 📱 Responsive Design

- Mobile-first approach
- Bootstrap 5 grid system
- Optimized for all screen sizes
- Touch-friendly interactions

## 🛡️ Privacy & Legal

- Comprehensive privacy policy
- Terms of service
- GDPR compliant practices
- Cookie-free (except analytics)
- Data retention policies

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Check `MONGO_URI` in `.env`
- Ensure MongoDB is running
- Falls back to JSON automatically

**Admin Login Not Working**
- Verify credentials in `server.js`
- Check browser console for errors
- Ensure cookies are enabled

**Images Not Loading**
- Check file paths
- Verify Base64 encoding for profile image
- Clear browser cache

**Contact Form Not Working**
- Check server logs
- Verify MongoDB/JSON permissions
- Test API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: himanshu.saini@example.com
- **GitHub Issues**: [Create an issue](https://github.com/Himanshu925/portfolio-himanshu-saini-complete/issues)
- **LinkedIn**: [Himanshu Saini](https://linkedin.com/in/himanshu-saini-925)

## 🙏 Acknowledgments

- Bootstrap 5 for responsive framework
- Font Awesome for icons
- AOS for animations
- Vercel for hosting and analytics
- MongoDB for database

---

**Built with ❤️ by Himanshu Saini**