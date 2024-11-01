'use client';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/firebaseClient';

const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      if (res?.user == null) {
        console.log('create user failed');
        return;
      }
      setClaims(res.user.uid, 'admin');
      console.log('res: ' + JSON.stringify(res));
      setEmail('');
      setPassword('');
      alert('Sign up Successful.');
    } catch (ex) {
      console.error(ex);
      alert('error occurred: ' + JSON.stringify(ex));
    }

    async function setClaims(uid: string, role: string) {
      try {
        const response = await fetch('/api/setCustomClaims', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid,
            claims: { role },
          }),
        });

        const result = await response.json();
        if (response.ok) {
          console.log(result.message);
        } else {
          console.error('Failed to set custom claims:', result.error);
        }
      } catch (error) {
        console.error('Error calling API:', error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900"> {/* Dark background */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96"> {/* Card style */}
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>
        <div className="mb-4">
          <label 
            className="block text-gray-300 text-sm font-bold mb-2" 
            htmlFor="email"
          >
            Email
          </label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="mb-6">
          <label 
            className="block text-gray-300 text-sm font-bold mb-2" 
            htmlFor="password"
          >
            Password
          </label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="********"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            onClick={handleSignUp}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
