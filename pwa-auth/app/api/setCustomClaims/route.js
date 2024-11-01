import {adminAuth} from '../../firebase/adminConfig';

export async function POST(req) {
    try {
      const { uid, claims } = await req.json(); // Parse JSON request body
  
      // Validate uid and claims are not null
      if (!uid || !claims) {
        return new Response(JSON.stringify({ error: 'UID and claims are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      // Set custom claims for the specified user
      await adminAuth.setCustomUserClaims(uid, claims);
  
      return new Response(JSON.stringify({ message: `Custom claims set for user ${uid}` }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error setting custom claims:', error);
      return new Response(JSON.stringify({ error: 'Failed to set custom claims' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }