import React, { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import { api } from '../lib/api';
import { Lock, LogOut, CheckCircle, Trash2, Edit3, Plus } from 'lucide-react';

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem('adminToken') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'blog' | 'logs' | 'ama'>('projects');

  // Logs state
  const [logText, setLogText] = useState('');
  const [logColor, setLogColor] = useState<'amber' | 'teal' | 'rose'>('amber');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/admin/login', { username, password });
      const jwtToken = res.data.token;
      localStorage.setItem('adminToken', jwtToken);
      setToken(jwtToken);
    } catch {
      // Mock login for offline demonstration
      if (username === 'admin' && password === 'admin') {
        const mockToken = 'mock_jwt_token';
        localStorage.setItem('adminToken', mockToken);
        setToken(mockToken);
      } else {
        alert('Invalid login credentials. (Demo: admin/admin)');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
  };

  const handleCreateLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logText) return;
    try {
      await api.post('/admin/logs', { content: logText, accentColor: logColor });
      alert('Log created!');
      setLogText('');
    } catch {
      alert('Created log (Demo Mode).');
      setLogText('');
    }
  };

  if (!token) {
    return (
      <PageWrapper>
        <div className="max-w-[400px] mx-auto py-20 flex flex-col items-center select-none">
          <div className="w-12 h-12 rounded-full border border-border bg-surface flex items-center justify-center text-text3 mb-6">
            <Lock size={18} />
          </div>
          <h2 className="text-xl font-semibold text-text1 text-center mb-1">
            Admin Authentication
          </h2>
          <p className="text-xs text-text3 text-center mb-6">
            Protected CMS access.
          </p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-[9px] font-mono tracking-wider text-text3 uppercase mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="bg-surface2 border border-border rounded-lg px-3 py-2 text-xs text-text2 outline-none focus:border-text3"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[9px] font-mono tracking-wider text-text3 uppercase mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-surface2 border border-border rounded-lg px-3 py-2 text-xs text-text2 outline-none focus:border-text3"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-text1 text-bg text-xs font-semibold tracking-wider rounded-full py-2.5 mt-2 hover:bg-text2 transition-all uppercase"
            >
              Sign In
            </button>
          </form>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* CMS Header */}
      <div className="flex justify-between items-center mb-8 border-b border-border/40 pb-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-text3 uppercase">CONTROL CENTER</span>
          <h1 className="text-2xl font-bold text-text1 mt-1">Admin Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 border border-border text-text3 hover:text-text1 hover:bg-surface2 px-3.5 py-1.5 rounded-full text-xs transition-all uppercase"
        >
          <LogOut size={12} /> Sign Out
        </button>
      </div>

      {/* Nav Tabs */}
      <div className="flex border-b border-border/60 pb-3 gap-2">
        {(['projects', 'blog', 'logs', 'ama'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
              activeTab === tab
                ? 'bg-text1 text-bg'
                : 'text-text3 hover:text-text1'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="mt-8 w-full select-none">
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-semibold text-text1 uppercase tracking-wider">Manage Projects</h3>
              <button className="inline-flex items-center gap-1 text-[10px] font-semibold bg-surface border border-border hover:border-text3 text-text2 hover:text-text1 px-3 py-1 rounded-full uppercase">
                <Plus size={10} /> Add Project
              </button>
            </div>
            <div className="text-xs text-text3 text-center py-10 border border-dashed border-border rounded-xl">
              Projects CRUD tables loaded here.
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-semibold text-text1 uppercase tracking-wider">Manage Blog Posts</h3>
              <button className="inline-flex items-center gap-1 text-[10px] font-semibold bg-surface border border-border hover:border-text3 text-text2 hover:text-text1 px-3 py-1 rounded-full uppercase">
                <Plus size={10} /> New Article
              </button>
            </div>
            <div className="text-xs text-text3 text-center py-10 border border-dashed border-border rounded-xl">
              Monaco markdown editor and blog posts listings.
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-semibold text-text1 uppercase tracking-wider">Create Micro Log</h3>
            <form onSubmit={handleCreateLog} className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-[10px] font-mono tracking-wider text-text3 uppercase mb-1">Content</label>
                <textarea
                  value={logText}
                  onChange={(e) => setLogText(e.target.value)}
                  placeholder="What is the latest update?"
                  rows={3}
                  className="bg-surface2 border border-border rounded-lg p-3 text-xs text-text2 outline-none focus:border-text3 resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-text3 uppercase">Color Accent:</span>
                  <div className="flex gap-2">
                    {(['amber', 'teal', 'rose'] as const).map((color) => (
                      <button
                        type="button"
                        key={color}
                        onClick={() => setLogColor(color)}
                        className={`w-4 h-4 rounded-full border transition-all ${
                          color === 'amber' ? 'bg-amber' : color === 'teal' ? 'bg-teal' : 'bg-rose'
                        } ${logColor === color ? 'border-text1 scale-125' : 'border-transparent'}`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-text1 text-bg text-[10px] font-bold tracking-wider px-5 py-2 rounded-full uppercase hover:bg-text2 transition-all"
                >
                  Create Log Entry
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'ama' && (
          <div>
            <h3 className="text-sm font-semibold text-text1 uppercase tracking-wider mb-6">Unanswered Question Queue</h3>
            <div className="text-xs text-text3 text-center py-10 border border-dashed border-border rounded-xl">
              Questions submitted via AMA page will load here for admin responses.
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
