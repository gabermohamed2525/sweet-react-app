import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-sweetPrimary font-semibold uppercase tracking-wider text-sm">Get in Touch</span>
        <h1 className="text-4xl font-extrabold text-gray-900">We Would Love to Hear From You</h1>
        <p className="text-gray-500">Have questions about custom cakes, orders, or catering? Reach out to us anytime.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info Box */}
        <div className="bg-slate-900 text-white p-10 rounded-3xl space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Contact Information</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fill out the form or contact us directly through phone, email, or visit our main boutique bakery.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="bg-rose-500/20 text-rose-400 p-3 rounded-xl"><Phone className="w-5 h-5" /></div>
                <span>01025134834</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="bg-rose-500/20 text-rose-400 p-3 rounded-xl"><Mail className="w-5 h-5" /></div>
                <span>support@sweesweets.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="bg-rose-500/20 text-rose-400 p-3 rounded-xl"><MapPin className="w-5 h-5" /></div>
                <span>Main Street, Sweet City, Egypt</span>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-800 text-xs text-gray-500">
            Working hours: Every day from 9:00 AM to 11:00 PM.
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <h3 className="text-2xl font-bold text-gray-900">Message Sent Successfully!</h3>
              <p className="text-gray-500">Thank you for reaching out. Our team will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Send Us a Message</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe" 
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-sweetPrimary text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com" 
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-sweetPrimary text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  rows="4" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message here..." 
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-sweetPrimary text-sm"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-sweetPrimary hover:bg-rose-700 text-white font-bold py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}