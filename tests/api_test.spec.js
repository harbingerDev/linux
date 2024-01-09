const { test, expect } = require('@playwright/test');
 import { faker } from '@faker-js/faker';
 const Ajv = require('ajv');
 const ajv = new Ajv(); 

test('Combined Test', async ({ request }) => {
  // OAuth 2.0 Authorization
  const tokenResponse = await request.post('https://ebs-v80-qa-20-sso.fischeridentitydev.com/auth/realms/qa/protocol/openid-connect/token', {
    data: `grant_type=client_credentials&client_id=identity-api-server-tes&client_secret=327f9a9c-f959-4d27-bd60-c4ded5c49e50`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

   const tokenjsonResponse = await tokenResponse.json();    const token = tokenjsonResponse.access_token;

  // GET https://ebs-v80-qa-api.fischeridentitydev.com/api/v1/runtime/users
  await test.step(`Make request for API:1 and check status code `, async () => {
          const response1 = await request.get('https://ebs-v80-qa-api.fischeridentitydev.com/api/v1/runtime/users', {
    headers: {"Authorization":`Bearer ${token}`,"X-Fii-UserId":"-81126430295779360995295669317416234544"},
  });

const temp = response1.status(); 

    await test.step(`Expected Status Code: 200  Received Status Code: ${temp}`, async () => {

      expect(response1.status()).toBe(200);

      console.log('Status code of response1 is:', response1.status());

    }); 

  });});

