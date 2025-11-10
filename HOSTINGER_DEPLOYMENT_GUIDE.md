# Hostinger Deployment Guide for SK Enterprise

This guide provides step-by-step instructions for deploying your SK Enterprise website to Hostinger hosting.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Building the Application](#building-the-application)
3. [Preparing for Deployment](#preparing-for-deployment)
4. [Uploading to Hostinger](#uploading-to-hostinger)
5. [Configuring URL Rewriting](#configuring-url-rewriting)
6. [Environment Variables](#environment-variables)
7. [Testing Your Deployment](#testing-your-deployment)
8. [Troubleshooting](#troubleshooting)
9. [Updating Your Site](#updating-your-site)

---

## Prerequisites

Before you begin, ensure you have:

- **Hostinger Account**: Active hosting plan (Business or higher recommended for better performance)
- **Node.js**: Version 18 or higher installed on your local machine
- **FTP/SFTP Client**: FileZilla, Cyberduck, or use Hostinger's File Manager
- **SSH Access** (Optional): For command-line deployment
- **Lovable Cloud Backend**: Already configured (this project uses it)

---

## Building the Application

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

Or if you're using bun (faster alternative):

```bash
bun install
```

### Step 2: Build for Production

Create the production build:

```bash
npm run build
```

Or with bun:

```bash
bun run build
```

This creates a `dist` folder containing your optimized production files.

### Step 3: Verify the Build

Check that the `dist` folder contains:
- `index.html`
- `assets/` folder (with CSS and JS files)
- `favicon.png`
- Other static assets

---

## Preparing for Deployment

### Important Files to Check

1. **Environment Variables**: Ensure your `.env` file has correct Supabase credentials:
   ```
   VITE_SUPABASE_PROJECT_ID=iqqevudaddrhxrhiyrce
   VITE_SUPABASE_PUBLISHABLE_KEY=your_key_here
   VITE_SUPABASE_URL=https://iqqevudaddrhxrhiyrce.supabase.co
   ```
   These are already embedded in the build, so no additional configuration needed.

2. **Base Path**: If deploying to a subdirectory (e.g., `yourdomain.com/skenterprise`), update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/skenterprise/', // Add this line
     // ... rest of config
   });
   ```
   Then rebuild the application.

---

## Uploading to Hostinger

### Method 1: Using Hostinger File Manager (Easiest)

1. **Log in to Hostinger Control Panel**
   - Go to https://hpanel.hostinger.com/
   - Sign in with your credentials

2. **Navigate to File Manager**
   - Click on "Files" → "File Manager"
   - Navigate to `public_html` directory (or your domain's root folder)

3. **Clear Existing Files** (if any)
   - Delete all existing files in `public_html`
   - Keep `.htaccess` if it exists (we'll modify it later)

4. **Upload Your Files**
   - Click "Upload Files"
   - Select ALL files from your `dist` folder
   - Upload them directly to `public_html`
   
   **Important**: Upload the **contents** of the `dist` folder, not the folder itself!

5. **Verify Structure**
   Your `public_html` should now contain:
   ```
   public_html/
   ├── index.html
   ├── assets/
   ├── favicon.png
   ├── products/
   ├── partner_logos_hd_transparent/
   └── robots.txt
   ```

### Method 2: Using FTP/SFTP (FileZilla)

1. **Get Your FTP Credentials**
   - In Hostinger Control Panel, go to "Files" → "FTP Accounts"
   - Note your hostname, username, and password

2. **Connect via FileZilla**
   - Host: `ftp.yourdomain.com` (or IP provided by Hostinger)
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (FTP) or 22 (SFTP)

3. **Upload Files**
   - Navigate to `public_html` on the remote side
   - Navigate to your `dist` folder on the local side
   - Select all files in `dist` and drag them to `public_html`

### Method 3: Using SSH (Advanced)

If you have SSH access enabled:

```bash
# Connect to your server
ssh username@yourdomain.com

# Navigate to web directory
cd public_html

# Remove old files
rm -rf *

# Exit SSH
exit

# Upload from local machine using SCP
scp -r dist/* username@yourdomain.com:~/public_html/
```

---

## Configuring URL Rewriting

React Router requires special configuration to work correctly on traditional hosting.

### Step 1: Create .htaccess File

In your `public_html` directory, create or edit the `.htaccess` file with the following content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Handle trailing slashes
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_URI} !(.*)/$
  RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1/ [L,R=301]
  
  # Redirect all requests to index.html
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 year"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  
  # CORS for Supabase
  Header set Access-Control-Allow-Origin "*"
  Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
  Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>

# Prevent directory listing
Options -Indexes

# Error pages (optional)
ErrorDocument 404 /index.html
</IfModule>
```

### Step 2: Verify .htaccess is Active

- Check that `mod_rewrite` is enabled on your Hostinger plan
- Most Hostinger plans have this enabled by default
- If not working, contact Hostinger support

---

## Environment Variables

Your application uses Lovable Cloud (Supabase) for backend functionality. The environment variables are already compiled into your build.

### Production Environment Check

1. **Supabase Connection**: Already configured via `.env`
2. **API Keys**: Public keys are safe in frontend code
3. **Service Role Keys**: Never exposed to frontend (handled by backend)

### If You Need Custom Environment Variables

If you add new environment variables:

1. Add them to `.env` file (prefixed with `VITE_`)
2. Rebuild the application
3. Redeploy to Hostinger

---

## Testing Your Deployment

### Step 1: Basic Functionality Test

Visit your domain and check:

- ✅ Homepage loads correctly
- ✅ Navigation menu works
- ✅ All routes work (Products, Services, About, Contact)
- ✅ Images load properly
- ✅ Styling appears correct
- ✅ Mobile responsiveness works

### Step 2: Backend Functionality Test

Test features that use the database:

- ✅ Admin login (if implemented)
- ✅ Product data loads from database
- ✅ Forms submit successfully
- ✅ File uploads work (if applicable)

### Step 3: Performance Test

Use tools to verify performance:

- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- Check load times are under 3 seconds

### Step 4: Browser Compatibility

Test on multiple browsers:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Troubleshooting

### Issue 1: Blank White Page

**Symptoms**: Website shows blank page or loading spinner indefinitely

**Solutions**:
1. Check browser console for errors (F12 → Console)
2. Verify all files uploaded correctly
3. Check `.htaccess` is in place
4. Clear browser cache (Ctrl+Shift+Delete)
5. Verify environment variables are correct in build

### Issue 2: 404 Errors on Page Refresh

**Symptoms**: Direct URLs or page refresh shows "Not Found"

**Solutions**:
1. Verify `.htaccess` file exists in `public_html`
2. Check `mod_rewrite` is enabled
3. Verify `.htaccess` content matches the guide above
4. Contact Hostinger to enable `mod_rewrite` if needed

### Issue 3: Broken Images or Assets

**Symptoms**: Images don't load, CSS missing, or JavaScript errors

**Solutions**:
1. Check file paths are correct (case-sensitive on Linux servers)
2. Verify `assets` folder uploaded correctly
3. Check `products` and `partner_logos_hd_transparent` folders exist
4. Verify file permissions (should be 644 for files, 755 for directories)

### Issue 4: Backend Connection Errors

**Symptoms**: "Failed to fetch" or API errors in console

**Solutions**:
1. Verify Supabase credentials are correct
2. Check CORS settings in `.htaccess`
3. Verify Supabase project is active
4. Check network requests in browser DevTools (F12 → Network)
5. Ensure Supabase project allows requests from your domain

### Issue 5: Admin Panel Not Working

**Symptoms**: Can't log in or admin features broken

**Solutions**:
1. Verify authentication is configured in Lovable Cloud
2. Check user roles are set correctly in database
3. Clear browser storage and try again
4. Check browser console for specific errors

### Issue 6: Slow Loading Times

**Solutions**:
1. Verify `.htaccess` compression is working
2. Enable Hostinger's LiteSpeed Cache (if available)
3. Optimize images before deployment
4. Consider upgrading Hostinger plan for better performance
5. Enable Cloudflare (free CDN available through Hostinger)

---

## Updating Your Site

### For Content Changes Only

If you've only updated content (text, images, etc.) through the admin panel:
- **No redeployment needed!** Changes are stored in the database.

### For Code Changes

When you've modified the application code:

1. **Pull latest changes** (if using version control)
2. **Rebuild the application**:
   ```bash
   npm run build
   ```
3. **Upload new files**:
   - Connect via FTP/File Manager
   - Upload only changed files from `dist` folder
   - Or upload entire `dist` folder contents to replace all

4. **Clear cache**:
   - Clear browser cache
   - If using Cloudflare, purge CDN cache
   - Clear Hostinger cache (if LiteSpeed Cache enabled)

### Quick Update Script

Create a file named `deploy.sh` for faster updates:

```bash
#!/bin/bash

echo "Building application..."
npm run build

echo "Uploading to Hostinger..."
scp -r dist/* username@yourdomain.com:~/public_html/

echo "Deployment complete!"
```

Make it executable:
```bash
chmod +x deploy.sh
```

Run it:
```bash
./deploy.sh
```

---

## Performance Optimization Tips

### 1. Enable LiteSpeed Cache (Hostinger Feature)

In Hostinger Control Panel:
- Go to "Advanced" → "LiteSpeed Cache"
- Enable caching for static files
- Set appropriate cache TTL

### 2. Enable Cloudflare CDN

Hostinger offers free Cloudflare integration:
- Go to "Advanced" → "Cloudflare"
- Enable Cloudflare CDN
- Configure caching rules

### 3. Optimize Images

Before deployment:
- Compress images using TinyPNG or similar
- Convert to WebP format where possible
- Use appropriate dimensions

### 4. Database Optimization

- Index frequently queried fields in Lovable Cloud
- Implement pagination for large datasets
- Cache frequent queries

---

## Security Best Practices

1. **Keep Dependencies Updated**
   ```bash
   npm update
   npm audit fix
   ```

2. **HTTPS/SSL Certificate**
   - Hostinger provides free SSL certificates
   - Enable in Control Panel → "Security" → "SSL"
   - Force HTTPS in `.htaccess`

3. **Secure Admin Access**
   - Use strong passwords
   - Consider IP whitelisting for admin routes
   - Enable 2FA on Supabase

4. **Regular Backups**
   - Hostinger provides automatic backups
   - Download manual backups weekly
   - Export database from Lovable Cloud regularly

---

## Getting Help

### Hostinger Support
- **Live Chat**: Available 24/7 in Hostinger Control Panel
- **Tutorials**: https://support.hostinger.com/
- **Email**: support@hostinger.com

### Lovable Support
- **Documentation**: https://docs.lovable.dev/
- **Discord Community**: Check Lovable dashboard for invite link

### Common Resources
- **React Router Docs**: https://reactrouter.com/
- **Vite Docs**: https://vitejs.dev/
- **Supabase Docs**: https://supabase.com/docs

---

## Checklist for First Deployment

Use this checklist to ensure everything is ready:

- [ ] Node.js and npm installed locally
- [ ] All dependencies installed (`npm install`)
- [ ] Production build created (`npm run build`)
- [ ] `dist` folder contains all necessary files
- [ ] Hostinger account active with appropriate plan
- [ ] FTP/SFTP credentials obtained
- [ ] `public_html` directory cleared of old files
- [ ] All files from `dist` uploaded to `public_html`
- [ ] `.htaccess` file created with correct content
- [ ] SSL certificate enabled for HTTPS
- [ ] Domain DNS properly configured
- [ ] Homepage loads without errors
- [ ] All routes accessible (no 404 errors)
- [ ] Backend features working (if applicable)
- [ ] Mobile responsiveness verified
- [ ] Browser compatibility tested
- [ ] Performance checked with PageSpeed Insights

---

## Frequently Asked Questions

### Q: Can I deploy to a subdirectory instead of root?

**A**: Yes, update `vite.config.ts`:
```typescript
base: '/subdirectory/',
```
Then rebuild and upload to `public_html/subdirectory/`

### Q: Do I need to rebuild for every change?

**A**: 
- **Code changes**: Yes, rebuild required
- **Content changes via admin**: No rebuild needed

### Q: How do I set up a custom domain?

**A**: In Hostinger Control Panel:
1. Go to "Domains" → "Add Domain"
2. Follow the wizard to connect your domain
3. Update DNS records as instructed

### Q: Will my Lovable Cloud backend work on Hostinger?

**A**: Yes! The backend runs on Supabase cloud, separate from your hosting. Your Hostinger site communicates with it via API calls.

### Q: Can I use GitHub for deployment?

**A**: Hostinger doesn't have native GitHub integration, but you can:
1. Use GitHub Actions to build and FTP deploy
2. Or manually deploy after pushing to GitHub

---

## Conclusion

You've successfully deployed your SK Enterprise website to Hostinger! Your site is now live and accessible to customers worldwide.

For any issues or questions, refer to the troubleshooting section or contact support.

**Happy hosting! 🚀**
