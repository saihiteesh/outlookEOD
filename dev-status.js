#!/usr/bin/env node

const http = require('http');

console.log('🚀 EOD Report Generator - Development Status\n');

function checkService(name, host, port, path = '/') {
    return new Promise((resolve) => {
        const req = http.request({
            hostname: host,
            port: port,
            path: path,
            method: 'GET',
            timeout: 3000
        }, (res) => {
            resolve({
                name,
                status: res.statusCode === 200 ? '✅ Running' : `❌ Error (${res.statusCode})`,
                url: `http://${host}:${port}${path}`
            });
        });

        req.on('error', () => {
            resolve({
                name,
                status: '❌ Not Running',
                url: `http://${host}:${port}${path}`
            });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({
                name,
                status: '⏱️ Timeout',
                url: `http://${host}:${port}${path}`
            });
        });

        req.end();
    });
}

async function checkAllServices() {
    const services = await Promise.all([
        checkService('Backend API', 'localhost', 3001, '/health'),
        checkService('Frontend App', 'localhost', 3000, '/'),
        checkService('Auth Endpoint', 'localhost', 3001, '/api/auth/login'),
    ]);

    console.log('📊 Service Status:');
    services.forEach(service => {
        console.log(`   ${service.status} ${service.name}`);
        console.log(`      URL: ${service.url}`);
    });

    console.log('\n🔗 Quick Links:');
    console.log('   Frontend:     http://localhost:3000');
    console.log('   Backend API:  http://localhost:3001/api');
    console.log('   Health Check: http://localhost:3001/health');
    console.log('   Mock Login:   http://localhost:3001/api/auth/login');

    console.log('\n📱 Development Features:');
    console.log('   • Mock authentication enabled');
    console.log('   • Sample data for testing');
    console.log('   • Hot reload for frontend');
    console.log('   • API endpoints with mock responses');

    console.log('\n🧪 Testing Commands:');
    console.log('   curl http://localhost:3001/health');
    console.log('   curl http://localhost:3001/api/auth/login');

    const allRunning = services.every(s => s.status.includes('✅'));
    
    if (allRunning) {
        console.log('\n🎉 All services are running! You can now:');
        console.log('   1. Open http://localhost:3000 in your browser');
        console.log('   2. Test the authentication flow');
        console.log('   3. Generate sample reports');
        console.log('   4. Configure settings');
    } else {
        console.log('\n⚠️  Some services may not be fully ready yet.');
        console.log('   Please wait a moment and try again.');
    }
}

checkAllServices().catch(console.error);