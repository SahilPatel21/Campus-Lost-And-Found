// server/test-all-apis.js
// Automated verification script to test all 11 API endpoints end-to-end.
const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5000/api';

const request = (method, urlPath, headers = {}, body = null) => {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(BASE_URL + urlPath);
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname + parsedUrl.search,
      method: method,
      headers: headers,
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
};

const runTests = async () => {
  console.log('========================================================');
  console.log('   RUNNING COMPLETE SYSTEM & API HEALTH AUDIT');
  console.log('========================================================\n');

  let passed = 0;
  let total = 0;

  const test = (name, condition, details = '') => {
    total++;
    if (condition) {
      passed++;
      console.log(`✅ [PASS] ${name}`);
    } else {
      console.log(`❌ [FAIL] ${name} -> ${details}`);
    }
  };

  try {
    // 1. Health Check
    const health = await request('GET', '/health');
    test('1. Server Health Check (GET /api/health)', health.status === 200 && health.data.success);

    // 2. User Registration
    const rand = Math.floor(Math.random() * 100000);
    const regPayload = {
      name: 'Verification Bot',
      email: `audit_bot_${rand}@college.edu`,
      password: 'password123',
      confirmPassword: 'password123',
      role: 'STUDENT',
    };
    const reg = await request('POST', '/auth/register', { 'Content-Type': 'application/json' }, regPayload);
    test('2. User Registration (POST /api/auth/register)', reg.status === 201 && reg.data.token);
    const token = reg.data.token;

    // 3. User Login
    const loginPayload = { email: regPayload.email, password: regPayload.password };
    const login = await request('POST', '/auth/login', { 'Content-Type': 'application/json' }, loginPayload);
    test('3. User Login (POST /api/auth/login)', login.status === 200 && login.data.token);

    // 4. Protected Profile Check
    const me = await request('GET', '/auth/me', { Authorization: `Bearer ${token}` });
    test('4. Protected Profile (GET /api/auth/me)', me.status === 200 && me.data.user.email === regPayload.email);

    // 5. Create Lost Item
    const item1Payload = {
      title: 'Automated Audit Wallet',
      description: 'Test wallet for full system verification check.',
      category: 'Bags & Wallets',
      type: 'Lost',
      location: 'Central Library Floor 2',
      date: '2026-11-01',
      contact: 'Tester 9999999999',
      status: 'Open',
    };
    const item1 = await request('POST', '/items', { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, item1Payload);
    test('5. Create Lost Item (POST /api/items)', item1.status === 201 && item1.data.data._id);
    const itemId = item1.data.data ? item1.data.data._id : null;

    // 6. Create Found Item
    const item2Payload = {
      title: 'Automated Audit Keys',
      description: 'Ring of 2 keys found in parking lot.',
      category: 'Keys',
      type: 'Found',
      location: 'Sports Ground',
      date: '2026-11-01',
      contact: 'Security Desk',
      status: 'Open',
    };
    const item2 = await request('POST', '/items', { 'Content-Type': 'application/json' }, item2Payload);
    test('6. Create Found Item (POST /api/items)', item2.status === 201 && item2.data.data._id);

    // 7. Get All Items
    const allItems = await request('GET', '/items');
    test('7. Get All Items (GET /api/items)', allItems.status === 200 && allItems.data.data.length >= 2);

    // 8. Search Items by Title
    const searchRes = await request('GET', '/items?search=Audit%20Wallet');
    test('8. Search Items by Keyword (GET /api/items?search=...)', searchRes.status === 200 && searchRes.data.data.length >= 1);

    // 9. Filter Items by Type & Status
    const filterRes = await request('GET', '/items?type=Lost&status=Open');
    test('9. Filter Items by Type & Status (GET /api/items?type=Lost&status=Open)', filterRes.status === 200 && filterRes.data.data.length >= 1);

    // 10. Get Single Item by ID
    const single = await request('GET', `/items/${itemId}`);
    test('10. Get Single Item by ID (GET /api/items/:id)', single.status === 200 && single.data.data.title === item1Payload.title);

    // 11. Update Item / Mark as Returned
    const updated = await request('PUT', `/items/${itemId}`, { 'Content-Type': 'application/json' }, { status: 'Returned' });
    test('11. Update Item Status (PUT /api/items/:id)', updated.status === 200 && updated.data.data.status === 'Returned');

    // 12. Get My Reported Items (User Dashboard)
    const myItems = await request('GET', '/items/my-items', { Authorization: `Bearer ${token}` });
    test('12. Get User Dashboard Items (GET /api/items/my-items)', myItems.status === 200 && myItems.data.data.length >= 1);

    // 13. Delete Item
    const deleted = await request('DELETE', `/items/${itemId}`);
    test('13. Delete Item (DELETE /api/items/:id)', deleted.status === 200 && deleted.data.success);

    console.log('\n========================================================');
    console.log(`   AUDIT COMPLETE: ${passed} / ${total} TESTS PASSED`);
    console.log('========================================================');

    if (passed === total) {
      console.log('🎉 ALL BACKEND APIS & DATABASE CONNECTIONS ARE 100% OPERATIONAL!\n');
    }
  } catch (error) {
    console.error('Audit Error:', error.message);
  }
};

runTests();
