'use client'
import { useState } from 'react';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/firebaseClient'
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter()

  const handleSignIn = async () => {
    try {
        const res = await signInWithEmailAndPassword(email, password);
//Sign in has the ID token and it has the custom claims which we have added. 

if(res?.user  != null)
  alert('sign in successful');
else
   {
    alert('Sign in Unsuccessful, check browser logs.');
    return;
   }
       const uid = res.user.uid;
        const idToken = res.user.getIdToken();
        console.log(idToken);


        // Send the UID to the API route to generate a custom access token, however access token doesnt have the claims, duno why??
        //so generally id tokens are sufficient in firebase. more analysis required on this space
        
        const response = await fetch('/api/generateToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid }),  // Pass UID to the server
        });
  
        const data = await response.json();

        console.log(JSON.stringify(data));
          
        console.log({res});
        sessionStorage.setItem('user', true)
        setEmail('');
        setPassword('');
   
        router.push('/')
    }catch(e){
        console.error(e)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign In</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button 
          onClick={handleSignIn}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;