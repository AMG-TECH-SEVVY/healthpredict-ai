import { useState, useRef } from 'react';
import { Send, Video, VideoOff, Phone, PhoneOff, Minimize2, Maximize2, Mic, MicOff } from 'lucide-react';
import { useRole } from '../../hooks/useRole';
import type { UserRole } from '../../types';
import { mockMessages } from '../../lib/mock-data';

const roleNames: Record<UserRole, string> = {
  doctor: 'Dr. Fatou Diallo',
  nurse: 'Aminata Ndiaye',
  admin: 'Mamadou Sow',
  analyst: 'Dr. Khady Ba',
  patient: 'Ousmane Diop',
};

const contactsByRole: Record<UserRole, { id: string; name: string; role: string; online: boolean }[]> = {
  doctor: [
    { id: 'p1', name: 'Ousmane Diop', role: 'Patient', online: true },
    { id: '2', name: 'Aminata Ndiaye', role: 'Infirmiere', online: true },
    { id: 'p2', name: 'Mariama Fall', role: 'Patient', online: false },
    { id: 'p4', name: 'Yacine Mboup', role: 'Patient', online: true },
  ],
  nurse: [
    { id: '1', name: 'Dr. Fatou Diallo', role: 'Medecin', online: true },
    { id: 'p1', name: 'Ousmane Diop', role: 'Patient', online: true },
    { id: 'p2', name: 'Mariama Fall', role: 'Patient', online: false },
  ],
  admin: [
    { id: '1', name: 'Dr. Fatou Diallo', role: 'Medecin', online: true },
    { id: '2', name: 'Aminata Ndiaye', role: 'Infirmiere', online: true },
    { id: '4', name: 'Dr. Khady Ba', role: 'Analyste', online: false },
  ],
  analyst: [
    { id: '1', name: 'Dr. Fatou Diallo', role: 'Medecin', online: true },
    { id: '3', name: 'Mamadou Sow', role: 'Admin', online: true },
  ],
  patient: [
    { id: '1', name: 'Dr. Fatou Diallo', role: 'Medecin', online: true },
    { id: '2', name: 'Aminata Ndiaye', role: 'Infirmiere', online: true },
  ],
};

export default function Messaging() {
  const { role } = useRole();
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState(contactsByRole[role][0]);
  const [videoCall, setVideoCall] = useState(false);
  const [audioOnly, setAudioOnly] = useState(false);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const myId = role === 'patient' ? 'p1' : role === 'doctor' ? '1' : role === 'nurse' ? '2' : role === 'admin' ? '3' : '4';

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const msg = {
      id: `msg-${Date.now()}`,
      sender_id: myId,
      sender_name: roleNames[role],
      sender_role: role.charAt(0).toUpperCase() + role.slice(1),
      receiver_id: selectedContact.id,
      content: newMessage,
      is_read: true,
      sent_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage('');
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  const contacts = contactsByRole[role];
  const filteredMessages = messages.filter(
    (m) =>
      (m.sender_id === myId && m.receiver_id === selectedContact.id) ||
      (m.sender_id === selectedContact.id && m.receiver_id === myId) ||
      (selectedContact.id === '1' && m.sender_role === 'Medecin') ||
      (selectedContact.id === 'p1' && m.sender_role === 'Patient')
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Messages & Appels</h1>
        <p className="mt-1 text-sm text-slate-500">Communiquez avec votre equipe et passez des appels video</p>
      </div>

      <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${fullscreen ? 'fixed inset-4 z-50 rounded-2xl' : ''}`}>
        <div className="flex h-[600px]">
          {/* Contacts Sidebar */}
          <div className="w-64 border-r border-slate-200 bg-slate-50 flex-shrink-0 hidden sm:block">
            <div className="p-4 border-b border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">Conversations</h3>
            </div>
            <div className="overflow-y-auto">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    selectedContact.id === contact.id ? 'bg-blue-50 border-r-2 border-blue-600' : 'hover:bg-slate-100'
                  }`}
                >
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-700">{contact.name.split(' ').map((n) => n[0]).join('')}</span>
                    </div>
                    {contact.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{contact.name}</p>
                    <p className="text-[10px] text-slate-500">{contact.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="px-5 py-3 border-b border-slate-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-700">{selectedContact.name.split(' ').map((n) => n[0]).join('')}</span>
                  </div>
                  {selectedContact.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{selectedContact.name}</p>
                  <p className="text-xs text-green-600 font-medium">{selectedContact.online ? 'En ligne' : 'Hors ligne'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setAudioOnly(false); setVideoCall(true); }}
                  className="p-2 rounded-lg hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition-colors"
                  title="Appel video"
                >
                  <Video size={18} />
                </button>
                <button
                  onClick={() => { setAudioOnly(true); setVideoCall(true); }}
                  className="p-2 rounded-lg hover:bg-green-50 text-slate-500 hover:text-green-600 transition-colors"
                  title="Appel vocal"
                >
                  <Phone size={18} />
                </button>
                <button
                  onClick={() => setFullscreen(!fullscreen)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                  title="Plein ecran"
                >
                  {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
              </div>
            </div>

            {/* Video Call Overlay */}
            {videoCall && (
              <div className="relative bg-slate-900 flex items-center justify-center" style={{ height: audioOnly ? '80px' : '300px' }}>
                {audioOnly ? (
                  <div className="flex items-center gap-4 py-4">
                    <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center">
                      <Phone size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Appel vocal en cours...</p>
                      <p className="text-slate-400 text-xs">{selectedContact.name}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-4">
                      <Video size={32} className="text-blue-400" />
                    </div>
                    <p className="text-white font-semibold">{selectedContact.name}</p>
                    <p className="text-slate-400 text-sm mt-1">Appel video en cours...</p>
                    <div className="absolute bottom-4 right-4 w-32 h-24 rounded-xl bg-slate-700 border-2 border-slate-600 flex items-center justify-center">
                      <span className="text-xs text-slate-400">Vous</span>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                  <button
                    onClick={() => setMuted(!muted)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${muted ? 'bg-red-500 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
                  >
                    {muted ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                  <button
                    onClick={() => setVideoCall(false)}
                    className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <PhoneOff size={20} />
                  </button>
                  {!audioOnly && (
                    <button
                      onClick={() => setAudioOnly(true)}
                      className="w-10 h-10 rounded-full bg-slate-700 text-white flex items-center justify-center hover:bg-slate-600 transition-colors"
                    >
                      <VideoOff size={18} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
              {filteredMessages.map((msg) => {
                const isMine = msg.sender_id === myId;
                return (
                  <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-2.5 max-w-[80%] ${isMine ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                        isMine ? 'bg-blue-100 text-blue-700' : 'bg-teal-100 text-teal-700'
                      }`}>
                        {msg.sender_name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                          isMine
                            ? 'bg-blue-600 text-white rounded-tr-sm'
                            : 'bg-white text-slate-900 rounded-tl-sm border border-slate-200'
                        }`}>
                          {msg.content}
                        </div>
                        <p className={`text-[10px] text-slate-400 mt-1 ${isMine ? 'text-right' : ''}`}>
                          {msg.sender_name} - {formatTime(msg.sent_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-5 py-3 border-t border-slate-200 bg-white">
              <form onSubmit={handleSend} className="flex items-center gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ecrivez votre message..."
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 flex-shrink-0"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
