import React, { useState } from 'react';
import { supabase } from "../lib/supabase";
import { useNavigate } from 'react-router-dom';
import { CakeSlice, Lock, Mail, UserPlus, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isSignUp) {
        // 1. إنشاء الحساب في نظام الـ Auth
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        // 2. إدخال سجل للمستخدم في جدول profiles الجديد في السوبابيز
        if (data?.user) {
          await supabase.from('profiles').insert([
            { id: data.user.id, email: email, full_name: email.split('@')[0] }
          ]);
        }

        alert('Check your email for verification link or login now!');
        setIsSignUp(false);
      } else {
        // تسجيل الدخول
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/');
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex bg-rose-50 p-3 rounded-2xl text-sweetPrimary mb-2">
            <CakeSlice className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h1>
          <p className="text-sm text-gray-500">
            {isSignUp ? 'Sign up to start ordering luxury sweets' : 'Login to your SweeSweets account'}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 text-sweetPrimary p-3 rounded-xl text-xs font-medium text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com" 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-sweetPrimary text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-sweetPrimary text-sm"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-sweetPrimary bg-rose-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : (isSignUp ? <><UserPlus className="w-4 h-4" /> Sign Up</> : <><LogIn className="w-4 h-4" /> Login</>)}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gray-100">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs font-semibold text-sweetPrimary hover:underline"
          >
            {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}