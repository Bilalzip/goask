"use client";
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { uploadToS3 } from '@/lib/UploadFile';

type UserChat = { id: number; pdfName: string };

const ProfileDash = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [docs, setDocs] = useState<UserChat[]>([]);
  const [fullName, setFullName] = useState<string>("");
  const [locationField, setLocationField] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [pwdCurrent, setPwdCurrent] = useState("");
  const [pwdNew, setPwdNew] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [pwdSaving, setPwdSaving] = useState(false);
  const [delConfirm, setDelConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const e = localStorage.getItem('email');
    const u = localStorage.getItem('Uid');
    console.log('[ProfileDash] initial localStorage', { email: e, Uid: u });
    setEmail(e);
    setUid(u);
  }, []);

  useEffect(() => {
    const loadDocs = async () => {
      if (!uid) return;
      try {
        const res = await axios.post('/api/user/chats', { Uid: uid });
        console.log('[ProfileDash] loaded chats', res.data);
        setDocs(res.data?.chats || []);
      } catch (e) {
        console.error('Failed to load documents', e);
      }
    };
    const loadProfile = async () => {
      try {
        if (!uid) return;
        const res = await axios.get(`/api/profile?Uid=${uid}`);
        console.log('[ProfileDash] loaded profile', res.data);
        const p = res.data?.profile;
        if (p) {
          setFullName(p.fullName || "");
          setLocationField(p.location || "");
          setAbout(p.about || "");
          // avatar removed
        }
      } catch (e) {
        console.error('Failed to load profile', e);
      }
    };
    loadDocs();
    loadProfile();
  }, [uid]);

  // avatar upload removed

  return (
    <div className='flex flex-col gap-6 p-6 bg-gradient-to-br from-[#0b1020] to-[#1d2338] rounded-lg shadow-md'>
      <div className='md:block hidden'>
      <h1 className='text-2xl text-white'>Edit Profile</h1>
      </div>
     
      {/* Avatar section removed */}

      <div id='profile' className='form flex flex-col gap-6 bg-white/5 rounded-xl p-4 border border-white/10'>
        <div className="flex flex-col">
          <label className='text-white' htmlFor='full-name'>
            Full Name
          </label>
          <input
            id='full-name'
            type='text'
            className='p-2 rounded-md w-full mt-1 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none'
            placeholder='Enter your full name'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className='text-white' htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            type='email'
            className='p-2 rounded-md w-full mt-1 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none'
            placeholder='Enter your email address'
            value={email || ''}
            readOnly
          />
        </div>

        <div className="flex flex-col">
          <label className='text-white ' htmlFor='location'>
            Location
          </label>
          <input
            id='location'
            type='text'
            className='p-2 rounded-md w-full mt-1 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none'
            placeholder='Where are you located?'
            value={locationField}
            onChange={(e) => setLocationField(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className='text-white' htmlFor='about-you'>
            Tell us about yourself
          </label>
          <textarea
            id='about-you'
            className='p-2 rounded-md w-full h-28 mt-1 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none'
            placeholder='Tell us about yourself'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        <div className='flex flex-row gap-3'>
          <button className='font-bold text-black bg-white px-3 py-2 rounded-md' onClick={() => {
            // Reset to last loaded values by reloading from server
            if (!uid) return;
            axios.get(`/api/profile?Uid=${uid}`).then((res) => {
              const p = res.data?.profile || {};
              setFullName(p.fullName || "");
              setLocationField(p.location || "");
              setAbout(p.about || "");
            }).catch(()=>{});
          }}>
            Cancel
          </button>
          <button disabled={saving} className='font-bold bg-[#E7C200] px-3 py-2 rounded-md text-black' onClick={async () => {
            if (!uid) return;
            setSaving(true);
            try {
              await axios.patch('/api/profile', { Uid: uid, fullName, location: locationField, about });
              toast.success('Profile saved');
            } catch (e) {
              console.error('Save failed', e);
              toast.error('Failed to save');
            } finally {
              setSaving(false);
            }
          }}>
            {saving ? (<span className='flex gap-2 items-center'><Loader2 className='w-4 h-4 animate-spin'/> Saving...</span>) : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Security */}
      <div id='security' className='flex flex-col gap-4 bg-white/5 rounded-xl p-4 border border-white/10'>
        <h2 className='text-white text-xl'>Security</h2>
        <div className='grid md:grid-cols-3 gap-3'>
          <div className='flex flex-col'>
            <label className='text-white' htmlFor='pwd-current'>Current Password</label>
            <input id='pwd-current' type='password' className='p-2 rounded-md bg-white text-black mt-1' value={pwdCurrent} onChange={(e)=>setPwdCurrent(e.target.value)} />
          </div>
          <div className='flex flex-col'>
            <label className='text-white' htmlFor='pwd-new'>New Password</label>
            <input id='pwd-new' type='password' className='p-2 rounded-md bg-white text-black mt-1' value={pwdNew} onChange={(e)=>setPwdNew(e.target.value)} />
          </div>
          <div className='flex flex-col'>
            <label className='text-white' htmlFor='pwd-confirm'>Confirm New Password</label>
            <input id='pwd-confirm' type='password' className='p-2 rounded-md bg-white text-black mt-1' value={pwdConfirm} onChange={(e)=>setPwdConfirm(e.target.value)} />
          </div>
        </div>
        <div>
          <button disabled={pwdSaving} onClick={async ()=>{
            if (!uid) toast.error('Not logged in'); return;
            if (!pwdCurrent || !pwdNew) toast.error('Fill all fields'); return;
            if (pwdNew !== pwdConfirm) toast.error('New passwords do not match'); return;
            setPwdSaving(true);
            try {
              const res = await axios.post('/api/account/change-password', { Uid: uid, currentPassword: pwdCurrent, newPassword: pwdNew });
              toast.success('Password updated');
              setPwdCurrent(''); setPwdNew(''); setPwdConfirm('');
            } catch (e: any) {
              toast.error(e?.response?.data?.error || 'Failed to update password');
            } finally { setPwdSaving(false); }
          }} className='font-bold bg-yellow-400 hover:bg-yellow-300 px-3 py-2 rounded-md text-black transition'>
            {pwdSaving ? (<span className='flex gap-2 items-center'><Loader2 className='w-4 h-4 animate-spin'/> Saving...</span>) : 'Change Password'}
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div id='danger' className='flex flex-col gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4'>
        <h2 className='text-red-300 text-xl'>Danger Zone</h2>
        <p className='text-red-200 text-sm'>Deleting your account will remove your profile, chats, and messages. This action cannot be undone.</p>
        <div className='flex flex-col md:flex-row gap-3 items-start md:items-center'>
          <input type='text' placeholder='Type DELETE to confirm' className='p-2 rounded-md bg-white text-black placeholder-gray-500' value={delConfirm} onChange={(e)=>setDelConfirm(e.target.value)} />
          <button disabled={deleting || delConfirm !== 'DELETE'} onClick={async ()=>{
            if (!uid) toast.error('Not logged in'); return;
            if (delConfirm !== 'DELETE') return;
            const sure = confirm('Are you absolutely sure? This cannot be undone.');
            if (!sure) return;
            setDeleting(true);
            try {
              await axios.post('/api/account/delete', { Uid: uid, confirm: 'DELETE' });
              // clear local session
              if (typeof window !== 'undefined') {
                localStorage.clear();
              }
              toast.success('Account deleted');
              router.push('/');
            } catch (e: any) {
              toast.error(e?.response?.data?.error || 'Failed to delete account');
            } finally { setDeleting(false); }
          }} className='px-3 py-2 rounded-md bg-red-500 hover:bg-red-400 text-white font-bold disabled:opacity-50'>
            {deleting ? (<span className='flex gap-2 items-center'><Loader2 className='w-4 h-4 animate-spin'/> Deleting...</span>) : 'Delete Account'}
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-3 pt-4 border-t border-white/10'>
        <h2 className='text-white text-xl'>Your Documents</h2>
        <div className='flex flex-col gap-2 max-h-64 overflow-auto'>
          {docs.map((d) => (
            <a key={d.id} href={`/chat/${d.id}`} className='flex justify-between items-center bg-white/5 border border-white/10 rounded px-3 py-2 hover:bg-white/10 transition'>
              <span className='truncate'>{d.pdfName}</span>
              <span className='text-xs opacity-60'>Open</span>
            </a>
          ))}
          {docs.length === 0 && (
            <p className='text-sm text-white/70'>No documents yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDash;
