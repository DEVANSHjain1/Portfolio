# Deployment Guide: Devansh Jain's Portfolio

This guide provides a clear, step-by-step process for deploying your portfolio website. The recommended method uses **GitHub** for version control and **Netlify** for hosting, which offers a fast, free, and automated workflow.

## 🚀 Part 1: Pushing Your Code to GitHub

Your code needs to live in a GitHub repository before it can be deployed.

### Step 1: Create a GitHub Repository
1.  Go to [GitHub](https://github.com) and log in.
2.  Click the **+** icon in the top-right corner and select **"New repository"**.
3.  **Name your repository:** `portfolio-website` (or any name you prefer).
4.  **Choose visibility:** "Public" is recommended for a portfolio.
5.  Click **"Create repository"**.

### Step 2: Connect and Push Your Local Code
Open your terminal in the project's root folder (`F:/Portfolio/portfolio_copy/Devansh_portfolio`) and run these commands one by one.

```sh
# 1. Initialize a Git repository if you haven't already
git init -b main

# 2. Add all your files to be tracked by Git
git add .

# 3. Create your first commit (a snapshot of your code)
git commit -m "Initial commit of portfolio website"

# 4. Connect your local repository to the one on GitHub
# Replace <your-github-username> with your actual username
git remote set-url origin https://github.com/<your-github-username>/portfolio-website.git

# 5. Push your code to GitHub
git push -u origin main
```
**Success!** Your code is now securely stored on GitHub.

---

## 🌐 Part 2: Deploying to Netlify

Netlify will automatically build and host your website from your GitHub repository.

### Step 1: Sign Up for Netlify
1.  Go to [Netlify.com](https://www.netlify.com) and click **"Sign up"**.
2.  Choose to **sign up with your GitHub account**. This is the easiest way to connect your projects.

### Step 2: Import and Deploy Your Project
1.  From your Netlify dashboard, click **"Add new site"** -> **"Import an existing project"**.
2.  Choose **"GitHub"** as your provider and authorize Netlify if prompted.
3.  Select your `portfolio-website` repository from the list.

### Step 3: Configure Build Settings
Netlify is smart and will likely detect that you are using Vite. Confirm the settings are as follows:
-   **Build command:** `npm run build`
-   **Publish directory:** `dist`

You do **not** need to configure any advanced settings or environment variables for this project.

### Step 4: Deploy!
Click the **"Deploy site"** button.

Netlify will now:
1.  Pull the latest code from your `main` branch on GitHub.
2.  Run the `npm run build` command to create an optimized, production-ready version of your site.
3.  Publish the contents of the `dist` folder to its global network.

After a minute or two, your site will be live! Netlify will provide a temporary URL (like `random-name-12345.netlify.app`).

---

## 🛠️ Part 3: Next Steps

### Custom Domain
You can easily add a custom domain to your site in the Netlify dashboard under **"Domain settings"**.

### Automatic Redeploys
From now on, every time you `git push` new changes to your `main` branch on GitHub, Netlify will automatically rebuild and redeploy your site with the updates. This creates a seamless workflow for making changes.

### Pre-deployment Checklist
Before pushing major changes, it's good practice to:
- [ ] Run `npm run build` locally to ensure the project builds without errors.
- [ ] Test the site on different screen sizes to check for responsiveness.
- [ ] Fill in all placeholder text (like in the `Education.tsx` component).
- [ ] Update the `README.md` with your final project details and live URL.
