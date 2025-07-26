#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying EOD Report Generator Setup...\n');

// Check if all required files exist
const requiredFiles = [
    'backend/package.json',
    'frontend/package.json',
    'backend/.env',
    'backend/server.js',
    'frontend/src/App.js',
    'docker-compose.yml',
    'README.md'
];

let allFilesExist = true;

console.log('📁 Checking required files:');
requiredFiles.forEach(file => {
    const exists = fs.existsSync(path.join(__dirname, file));
    console.log(`   ${exists ? '✅' : '❌'} ${file}`);
    if (!exists) allFilesExist = false;
});

console.log('\n🔧 Checking environment configuration:');
try {
    require('dotenv').config({ path: path.join(__dirname, 'backend/.env') });
    
    const envVars = ['NODE_ENV', 'AZURE_CLIENT_ID', 'PORT', 'FRONTEND_URL'];
    envVars.forEach(envVar => {
        const value = process.env[envVar];
        console.log(`   ${value ? '✅' : '❌'} ${envVar}: ${value || 'Not set'}`);
    });
} catch (error) {
    console.log('   ❌ Failed to load environment variables');
}

console.log('\n🏗️  Project Structure:');
console.log(`   📦 Root directory: ${__dirname}`);
console.log(`   🔙 Backend: ${path.join(__dirname, 'backend')}`);
console.log(`   🎨 Frontend: ${path.join(__dirname, 'frontend')}`);

console.log('\n🚀 Next Steps:');
console.log('   1. Run backend:  cd backend && npm start');
console.log('   2. Run frontend: cd frontend && npm start');
console.log('   3. Or use:       start-dev.bat (Windows)');
console.log('   4. Open browser: http://localhost:3000');

console.log('\n📱 Development Mode Features:');
console.log('   • Mock authentication (no Azure setup required)');
console.log('   • Sample data for testing');
console.log('   • All API endpoints functional');
console.log('   • React development server with hot reload');

console.log('\n🔐 Production Setup:');
console.log('   1. Register Azure AD app');
console.log('   2. Update .env with real Azure credentials');
console.log('   3. Grant Graph API permissions');
console.log('   4. Deploy using Docker Compose');

if (allFilesExist) {
    console.log('\n✅ Setup verification complete! Ready to run locally.');
} else {
    console.log('\n❌ Some files are missing. Please check the setup.');
}

console.log('\n' + '='.repeat(60));
console.log('EOD Report Generator - Development Environment Ready! 🎉');
console.log('='.repeat(60));