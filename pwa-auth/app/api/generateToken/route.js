// app/api/generateToken/route.js
import {adminAuth} from '../../firebase/adminConfig';


export async function POST(request) {
  try {
    const { uid } = await request.json();  // Get the UID from the request body
    console.log('hit api');
    // Generate a custom access token using the user's UID
    const customToken = await adminAuth.createCustomToken(uid);

    // Return the custom token as the response
    return new Response(JSON.stringify({ customToken }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating custom token:', error);
    return new Response(JSON.stringify({ error: 'Error generating custom token' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
