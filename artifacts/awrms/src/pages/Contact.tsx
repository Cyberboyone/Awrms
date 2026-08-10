import { TopNavLayout } from '../components/TopNavLayout';
import { useState } from 'react';
import { useToast } from '../hooks/use-toast';

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast({ title: 'Message Sent', description: 'Thank you! We will get back to you shortly.' });
    setForm({ name: '', email: '', subject: '', message: '' });
  }

  return (
    <TopNavLayout publicMode={true}>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-[#1B4332] mb-4">Contact Us</h1>
            <div className="w-16 h-1 bg-[#2D6A4F] mx-auto rounded-full mb-4"></div>
            <p className="text-slate-500 max-w-xl mx-auto">
              Have questions or suggestions? Reach out to us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center bg-[#F0FFF4] rounded-xl p-6 border border-[#C6E5D0]">
              <div className="w-12 h-12 rounded-full bg-[#1B4332] flex items-center justify-center mx-auto mb-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-5 w-5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 mb-1">Address</h3>
              <p className="text-sm text-slate-500">Sa'adu Zungur University,<br/>Bauchi, Nigeria</p>
            </div>
            <div className="text-center bg-[#F0FFF4] rounded-xl p-6 border border-[#C6E5D0]">
              <div className="w-12 h-12 rounded-full bg-[#1B4332] flex items-center justify-center mx-auto mb-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-5 w-5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 mb-1">Email</h3>
              <p className="text-sm text-slate-500">info@awrms.edu.ng</p>
            </div>
            <div className="text-center bg-[#F0FFF4] rounded-xl p-6 border border-[#C6E5D0]">
              <div className="w-12 h-12 rounded-full bg-[#1B4332] flex items-center justify-center mx-auto mb-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-5 w-5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 mb-1">Phone</h3>
              <p className="text-sm text-slate-500">+234 800 123 4567</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required type="text" placeholder="Enter your name" className="w-full px-4 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required type="email" placeholder="Enter your email" className="w-full px-4 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"/>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
              <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required type="text" placeholder="What is this about?" className="w-full px-4 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={5} placeholder="Write your message..." className="w-full px-4 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] resize-none"/>
            </div>
            <button type="submit" className="px-6 py-3 bg-[#1B4332] text-white font-semibold rounded-md hover:bg-[#153427] transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </TopNavLayout>
  );
}
