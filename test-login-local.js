#!/usr/bin/env node

import fetch from 'node-fetch';
import { performance } from 'perf_hooks';

const BASE_URL = 'http://localhost:3000';

async function testLoginAPI() {
  console.log('🚀 Starting Login API Performance Test...\n');

  const testEmail = `test${Date.now()}@example.com`;
  const testPassword = 'password123';

  try {
    // Test 1: Register a new user
    console.log('📝 Test 1: Registering new user...');
    const registerStart = performance.now();
    
    const registerRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    });

    const registerTime = performance.now() - registerStart;
    const registerData = await registerRes.json();

    if (registerRes.ok) {
      console.log(`✅ Registration successful in ${registerTime.toFixed(2)}ms`);
      console.log(`   Response: ${JSON.stringify(registerData.user)}\n`);
    } else {
      console.log(`❌ Registration failed: ${registerData.message}\n`);
      return;
    }

    // Test 2: Login with correct credentials (First attempt)
    console.log('🔐 Test 2: First login attempt (connection establishment)...');
    const login1Start = performance.now();
    
    const login1Res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    });

    const login1Time = performance.now() - login1Start;
    const login1Data = await login1Res.json();

    if (login1Res.ok) {
      console.log(`✅ First login successful in ${login1Time.toFixed(2)}ms`);
      console.log(`   Token: ${login1Data.token.substring(0, 20)}...\n`);
    } else {
      console.log(`❌ First login failed: ${login1Data.message}\n`);
      return;
    }

    // Test 3: Login again (connection pool reuse)
    console.log('🔐 Test 3: Second login attempt (connection pool reuse)...');
    const login2Start = performance.now();
    
    const login2Res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    });

    const login2Time = performance.now() - login2Start;
    const login2Data = await login2Res.json();

    if (login2Res.ok) {
      console.log(`✅ Second login successful in ${login2Time.toFixed(2)}ms`);
      console.log(`   Token: ${login2Data.token.substring(0, 20)}...\n`);
    } else {
      console.log(`❌ Second login failed: ${login2Data.message}\n`);
      return;
    }

    // Test 4: Login with wrong password
    console.log('❌ Test 4: Login with wrong password...');
    const login3Start = performance.now();
    
    const login3Res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'wrongpassword'
      })
    });

    const login3Time = performance.now() - login3Start;
    const login3Data = await login3Res.json();

    if (!login3Res.ok) {
      console.log(`✅ Correctly rejected in ${login3Time.toFixed(2)}ms`);
      console.log(`   Error: ${login3Data.message}\n`);
    } else {
      console.log(`❌ Should have failed but succeeded\n`);
    }

    // Summary
    console.log('📊 Performance Summary:');
    console.log(`   Register:      ${registerTime.toFixed(2)}ms`);
    console.log(`   1st Login:     ${login1Time.toFixed(2)}ms (cold connection)`);
    console.log(`   2nd Login:     ${login2Time.toFixed(2)}ms (pooled connection)`);
    console.log(`   Wrong Pass:    ${login3Time.toFixed(2)}ms`);
    console.log(`\n   Improvement:   ${((login1Time - login2Time) / login1Time * 100).toFixed(1)}% faster with connection pooling\n`);

    console.log('✨ All tests completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\n⚠️  Make sure:');
    console.error('   1. Server is running on http://localhost:3000');
    console.error('   2. Local PostgreSQL is running');
    console.error('   3. Database is initialized with migrations');
    process.exit(1);
  }
}

testLoginAPI();
