# Deployment Guide - Himanshu Saini Portfolio

This guide provides step-by-step instructions for deploying the portfolio website to various platforms.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - Project name: `portfolio-himanshu-saini-complete`
   - Framework: "Other"
   - Root directory: `./`
   - Build command: Leave empty
   - Output directory: Leave empty

3. **Environment Variables** (Optional)
   - `MONGO_URI`: Your MongoDB connection string
   - `PORT`: `3000` (default)

4. **Deploy**
   - Click "Deploy"
   - Wait for build completion
   - Get your live URL

### Option 2: Netlify

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "New site from Git"
   - Choose your repository

2. **Build Settings**
   - Branch: `main`
   - Build command: `npm start`
   - Publish directory: `./`

3. **Environment Variables**
   - Add `MONGO_URI` if using MongoDB
   - Add `PORT` if needed

4. **Deploy**
   - Click "Deploy site"
   - Wait for deployment

### Option 3: Heroku

1. **Create Heroku App**
   ```bash
   heroku create portfolio-himanshu-saini
   ```

2. **Set Environment Variables**
   ```bash
   heroku config:set MONGO_URI="your_mongodb_uri"
   heroku config:set NODE_ENV="production"
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

4. **Open App**
   ```bash
   heroku open
   ```

### Option 4: Railway

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project"
   - Choose "Deploy from GitHub repo"

2. **Configure**
   - Select your repository
   - Environment variables added automatically
   - Deploy automatically

### Option 5: Render

1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect GitHub repository

2. **Configure Service**
   - Name: `portfolio-himanshu-saini`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables**
   - Add `MONGO_URI` and other variables

4. **Deploy**
   - Click "Create Web Service"

## 🔧 Manual Deployment

### Local Development Server

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or start production server
npm start
```

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run**
   ```bash
   docker build -t portfolio .
   docker run -p 3000:3000 portfolio
   ```

## 🌐 Domain Configuration

### Custom Domain on Vercel

1. **Add Domain**
   - Go to project settings
   - Click "Domains"
   - Add your custom domain

2. **DNS Configuration**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or A records for apex domain

### Custom Domain on Netlify

1. **Domain Management**
   - Go to site settings
   - Click "Domain management"
   - Add custom domain

2. **DNS Setup**
   - Follow Netlify's DNS instructions
   - Update nameservers or add records

## 🔒 Environment Variables

### Required Variables

```env
# MongoDB (optional - falls back to JSON)
MONGO_URI=mongodb://localhost:27017/portfolio

# Server Port (optional - defaults to 3000)
PORT=3000

# Node Environment
NODE_ENV=production
```

### Platform-Specific Setup

**Vercel:**
- Add variables in project settings
- No `.env` file needed

**Netlify:**
- Add in build settings
- Accessible in build process

**Heroku:**
- Use `heroku config:set KEY=value`
- Or set in dashboard

## 📊 Database Setup

### MongoDB Atlas (Cloud)

1. **Create Cluster**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create free cluster

2. **Whitelist IP**
   - Add `0.0.0.0/0` for all IPs (development)
   - Add specific IPs for production

3. **Create Database User**
   - Go to Database Access
   - Create user with read/write permissions

4. **Get Connection String**
   - Go to Clusters → Connect
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` and `<database>`

### Local MongoDB

```bash
# Install MongoDB locally
# Ubuntu/Debian
sudo apt install mongodb

# macOS with Homebrew
brew install mongodb-community

# Start MongoDB
mongod
```

## 🔍 Testing Deployment

### Health Checks

1. **Basic Functionality**
   - Load homepage
   - Test navigation
   - Check responsive design

2. **Forms**
   - Contact form submission
   - Admin login
   - Virtual assistant

3. **Dynamic Content**
   - Skills loading
   - Certificates display
   - Admin panel access

4. **External Links**
   - Social media links
   - WhatsApp integration
   - GitHub repository

### Performance Testing

```bash
# Use Lighthouse
# Chrome DevTools → Lighthouse

# Or online tools:
# - webpagetest.org
# - gtmetrix.com
# - pagespeed.web.dev
```

## 🐛 Troubleshooting

### Common Issues

**Build Failures**
- Check Node.js version compatibility
- Verify all dependencies in package.json
- Check build logs for specific errors

**Database Connection**
- Verify MongoDB URI format
- Check network connectivity
- Ensure database user permissions

**Static Files Not Loading**
- Check file paths in HTML
- Verify Base64 encoding for images
- Clear browser cache

**Admin Panel Not Working**
- Check credentials in server.js
- Verify session handling
- Test API endpoints

**HTTPS Issues**
- Ensure SSL certificate on hosting platform
- Update all internal links to HTTPS
- Check mixed content warnings

### Logs and Debugging

**Vercel:**
- Check deployment logs in dashboard
- Use Vercel CLI: `vercel logs`

**Netlify:**
- View build logs in deployment history
- Check function logs for serverless functions

**Heroku:**
- `heroku logs --tail`
- View logs in dashboard

## 🔄 Updates and Maintenance

### Automatic Updates

**GitHub Integration:**
- Push changes to main branch
- Automatic deployment on supported platforms
- Monitor deployment status

### Manual Updates

```bash
# Update dependencies
git pull origin main
npm update

# Test locally
npm start

# Deploy
# Follow platform-specific deployment steps
```

### Backup Strategy

1. **Code Backup**
   - GitHub repository
   - Regular commits
   - Branch protection

2. **Database Backup**
   - MongoDB Atlas automated backups
   - Local JSON file fallbacks
   - Export data regularly

## 📈 Monitoring and Analytics

### Vercel Analytics
- Automatic setup with deployment
- Real-time metrics
- Performance insights

### Google Analytics (Optional)

1. **Add Tracking Code**
   ```html
   <!-- Add to <head> -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

2. **Configure Goals**
   - Contact form submissions
   - Admin panel access
   - Social media clicks

## 🚨 Security Considerations

### Before Going Live

1. **Change Admin Credentials**
   ```javascript
   // In server.js
   const adminUsername = 'your_username';
   const adminPassword = 'your_secure_password';
   ```

2. **Environment Variables**
   - Never commit secrets to Git
   - Use platform environment variables
   - Rotate credentials regularly

3. **HTTPS Enforcement**
   - Enable HTTPS on all platforms
   - Redirect HTTP to HTTPS
   - Update all links

4. **Firewall Rules**
   - Restrict database access
   - Use VPN for admin access
   - Implement rate limiting

### Ongoing Security

- Regular dependency updates
- Security audits
- Monitor for vulnerabilities
- Backup regularly

## 📞 Support

### Platform Support

**Vercel:** [vercel.com/docs](https://vercel.com/docs)
**Netlify:** [docs.netlify.com](https://docs.netlify.com)
**Heroku:** [devcenter.heroku.com](https://devcenter.heroku.com)
**Railway:** [docs.railway.app](https://docs.railway.app)
**Render:** [docs.render.com](https://docs.render.com)

### Getting Help

- Check deployment logs
- Review error messages
- Test locally first
- Search platform documentation
- Create GitHub issues for bugs

---

**Need help?** Contact: himanshu.saini@example.com