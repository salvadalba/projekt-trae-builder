#!/usr/bin/env node

/**
 * Portfolio Setup Validator
 * Checks if all necessary files and configurations are in place before deployment
 */

const fs = require('fs');
const path = require('path');

const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';

// Required files
const REQUIRED_FILES = [
    'index.html',
    'projects.html',
    'about.html',
    'contact.html',
    'css/main.css',
    'css/components.css',
    'css/responsive.css',
    'js/main.js',
    'js/navigation.js',
    'js/particles.js',
    'js/contact-form.js',
    'js/projects-filter.js',
    'vercel.json',
    'README.md',
    'DEPLOYMENT.md',
    '.env.example',
];

// Required directories
const REQUIRED_DIRS = [
    'css',
    'js',
    'images',
    '.github/workflows',
];

// Optional files
const OPTIONAL_FILES = [
    '.gitignore',
    '.env.local',
    '.env.production',
];

function log(message, type = 'info') {
    const prefix = {
        success: `${GREEN}✓${RESET}`,
        error: `${RED}✗${RESET}`,
        warning: `${YELLOW}⚠${RESET}`,
        info: `${BLUE}ℹ${RESET}`,
    };

    console.log(`${prefix[type] || prefix.info} ${message}`);
}

function checkFiles() {
    console.log(`\n${BLUE}═══ Checking Required Files${RESET}\n`);
    let allPresent = true;

    REQUIRED_FILES.forEach(file => {
        const filePath = path.join(process.cwd(), file);
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            const size = (stats.size / 1024).toFixed(2);
            log(`${file} (${size}KB)`, 'success');
        } else {
            log(`${file} - NOT FOUND`, 'error');
            allPresent = false;
        }
    });

    return allPresent;
}

function checkDirectories() {
    console.log(`\n${BLUE}═══ Checking Directories${RESET}\n`);
    let allPresent = true;

    REQUIRED_DIRS.forEach(dir => {
        const dirPath = path.join(process.cwd(), dir);
        if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
            log(`${dir}/`, 'success');
        } else {
            log(`${dir}/ - NOT FOUND`, 'error');
            allPresent = false;
        }
    });

    return allPresent;
}

function checkOptionalFiles() {
    console.log(`\n${BLUE}═══ Checking Optional Files${RESET}\n`);

    OPTIONAL_FILES.forEach(file => {
        const filePath = path.join(process.cwd(), file);
        if (fs.existsSync(filePath)) {
            log(`${file}`, 'success');
        } else {
            log(`${file} - Not configured (optional)`, 'warning');
        }
    });
}

function checkContent() {
    console.log(`\n${BLUE}═══ Checking Content Quality${RESET}\n`);

    const indexPath = path.join(process.cwd(), 'index.html');
    if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, 'utf8');
        
        // Check for placeholder content
        const placeholders = [
            { text: 'John Doe', warning: 'Found placeholder name - update to your name' },
            { text: 'YOUR_SUPABASE_FUNCTIONS_URL', warning: 'Found Supabase placeholder' },
        ];

        placeholders.forEach(({ text, warning }) => {
            if (content.includes(text)) {
                log(warning, 'warning');
            }
        });

        // Check for images
        if (content.includes('images/project')) {
            log('Project images referenced', 'success');
        } else {
            log('No project images found - add to /images/', 'warning');
        }
    }
}

function checkConfiguration() {
    console.log(`\n${BLUE}═══ Checking Configuration${RESET}\n`);

    const vercelJsonPath = path.join(process.cwd(), 'vercel.json');
    const envExamplePath = path.join(process.cwd(), '.env.example');
    const envLocalPath = path.join(process.cwd(), '.env.local');

    if (fs.existsSync(vercelJsonPath)) {
        try {
            const config = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
            log('vercel.json is valid', 'success');
        } catch (e) {
            log('vercel.json has syntax errors', 'error');
        }
    }

    if (fs.existsSync(envExamplePath)) {
        log('.env.example configured', 'success');
    } else {
        log('.env.example not found', 'error');
    }

    if (fs.existsSync(envLocalPath)) {
        log('.env.local exists (development)', 'success');
    } else {
        log('.env.local not found - create from .env.example', 'warning');
    }

    const gitHubWorkflow = path.join(process.cwd(), '.github/workflows/deploy.yml');
    if (fs.existsSync(gitHubWorkflow)) {
        log('GitHub Actions workflow configured', 'success');
    }
}

function generateReport() {
    console.log(`\n${BLUE}═══ Validation Summary${RESET}\n`);

    const filesOk = checkFiles();
    const dirsOk = checkDirectories();
    checkOptionalFiles();
    checkContent();
    checkConfiguration();

    console.log(`\n${BLUE}═══ Deployment Checklist${RESET}\n`);

    const checklist = [
        { text: 'Update portfolio name', done: false },
        { text: 'Add project images to /images/', done: false },
        { text: 'Configure .env.local with Supabase credentials', done: false },
        { text: 'Test theme switching locally', done: false },
        { text: 'Test form validation locally', done: false },
        { text: 'Verify all links work', done: false },
        { text: 'Set up Vercel project', done: false },
        { text: 'Configure GitHub secrets for CI/CD', done: false },
        { text: 'Test deployment to Vercel', done: false },
    ];

    checklist.forEach(({ text }) => {
        log(`[ ] ${text}`, 'warning');
    });

    console.log(`\n${BLUE}═══ Next Steps${RESET}\n`);
    console.log(`${GREEN}1.${RESET} Complete the deployment checklist above`);
    console.log(`${GREEN}2.${RESET} Read DEPLOYMENT.md for detailed instructions`);
    console.log(`${GREEN}3.${RESET} Set up environment variables locally`);
    console.log(`${GREEN}4.${RESET} Push to GitHub to trigger CI/CD`);
    console.log(`${GREEN}5.${RESET} Monitor deployment on Vercel dashboard\n`);

    if (filesOk && dirsOk) {
        console.log(`${GREEN}✓ All required files present!${RESET}\n`);
        return 0;
    } else {
        console.log(`${RED}✗ Some required files are missing!${RESET}\n`);
        return 1;
    }
}

// Run validation
process.exit(generateReport());
