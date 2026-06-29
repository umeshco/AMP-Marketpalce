import React, { useState } from 'react';
import { MessageSquare, Send, User, ChevronRight, MessageCircle, Shield } from 'lucide-react';
import { ChatMessage, Order, User as UserType } from '../types';

interface ChatsViewProps {
  user: UserType;
  orders: Order[];
  chats: ChatMessage[];
  onSendMessage: (room: string, text: string) => void;
  activeRoomId: string | null;
  onSetActiveRoomId: (id: string | null) => void;
  users?: UserType[];
}

export default function ChatsView({
  user,
  orders,
  chats,
  onSendMessage,
  activeRoomId,
  onSetActiveRoomId,
  users = []
}: ChatsViewProps) {
  const [inputText, setInputText] = useState('');
  const [chatTypeTab, setChatTypeTab] = useState<'orders' | 'dms'>('orders');

  // Filter orders appropriate for the user
  const visibleOrders = orders.filter(o => {
    if (user.role === 'admin') return true;
    if (user.role === 'advertiser') return o.advertiser === user.id || o.advertiser === user.email;
    if (user.role === 'publisher') return o.publisher === user.id || o.publisher === user.email;
    return false;
  });

  // Calculate DM Rooms
  // For Admin: list all registered clients (publishers and advertisers) to DM them
  // For Clients: there is a single DM room with Admin (room: dm_clientEmail)
  const clientUsers = users.filter(u => u.role !== 'admin');

  // Set default active room if null
  if (!activeRoomId) {
    if (chatTypeTab === 'orders' && visibleOrders.length > 0) {
      onSetActiveRoomId(visibleOrders[0].id);
    } else if (chatTypeTab === 'dms') {
      if (user.role === 'admin' && clientUsers.length > 0) {
        onSetActiveRoomId(`dm_${clientUsers[0].email}`);
      } else if (user.role !== 'admin') {
        onSetActiveRoomId(`dm_${user.email}`);
      }
    }
  }

  const isDm = activeRoomId ? activeRoomId.startsWith('dm_') : false;
  const activeOrder = !isDm ? orders.find(o => o.id === activeRoomId) : null;

  // Find DM recipient metadata
  let dmRecipientName = 'System Support desk';
  let dmRecipientRole = 'admin';
  let dmRecipientEmail = 'support@authorityplacement.com';

  if (isDm && activeRoomId) {
    const targetEmail = activeRoomId.replace('dm_', '');
    if (user.role === 'admin') {
      const targetUser = users.find(u => u.email === targetEmail);
      if (targetUser) {
        dmRecipientName = targetUser.name;
        dmRecipientRole = targetUser.role;
        dmRecipientEmail = targetUser.email;
      } else {
        dmRecipientName = targetEmail;
        dmRecipientRole = 'user';
        dmRecipientEmail = targetEmail;
      }
    } else {
      dmRecipientName = 'Platform Admin';
      dmRecipientRole = 'admin';
      dmRecipientEmail = 'authorityplacement@gmail.com';
    }
  }

  const roomMessages = chats.filter(m => m.room === activeRoomId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeRoomId) return;
    onSendMessage(activeRoomId, inputText.trim());
    setInputText('');
  };

  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
      
      {/* Rooms list panel */}
      <div className="md:col-span-4 border-r border-slate-100 flex flex-col bg-slate-50">
        
        {/* Toggle between Order Placements and Direct Support DMs */}
        <div className="p-4 border-b border-slate-200 bg-white space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-extrabold text-slate-900">Communication Center</h4>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setChatTypeTab('orders');
                if (visibleOrders.length > 0) {
                  onSetActiveRoomId(visibleOrders[0].id);
                } else {
                  onSetActiveRoomId(null);
                }
              }}
              className={`flex-1 text-center font-bold text-[10px] uppercase py-1.5 rounded-lg transition-all cursor-pointer ${
                chatTypeTab === 'orders'
                  ? 'bg-white text-indigo-750 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              💼 Order Rooms
            </button>
            <button
              type="button"
              onClick={() => {
                setChatTypeTab('dms');
                if (user.role === 'admin') {
                  if (clientUsers.length > 0) {
                    onSetActiveRoomId(`dm_${clientUsers[0].email}`);
                  } else {
                    onSetActiveRoomId(null);
                  }
                } else {
                  onSetActiveRoomId(`dm_${user.email}`);
                }
              }}
              className={`flex-1 text-center font-bold text-[10px] uppercase py-1.5 rounded-lg transition-all cursor-pointer ${
                chatTypeTab === 'dms'
                  ? 'bg-white text-indigo-750 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              💬 Direct DMs
            </button>
          </div>
        </div>

        {/* Room items scroll container */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 max-h-[440px]">
          {chatTypeTab === 'orders' ? (
            <>
              {visibleOrders.map(ord => {
                const isSelected = activeRoomId === ord.id;
                const lastMsg = chats.filter(c => c.room === ord.id).pop();
                return (
                  <div
                    key={ord.id}
                    onClick={() => onSetActiveRoomId(ord.id)}
                    className={`p-3.5 rounded-xl cursor-pointer transition-all border text-left ${
                      isSelected
                        ? 'bg-white border-indigo-200 shadow-sm'
                        : 'border-transparent hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-800 uppercase">{ord.id}</span>
                      <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                        ord.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-150'
                          : ord.status === 'in_progress'
                          ? 'bg-indigo-50 text-indigo-600 border border-indigo-150'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {ord.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 truncate mt-1 font-semibold">
                      Outlet: {ord.site}
                    </div>
                    {lastMsg ? (
                      <p className="text-[10px] text-slate-400 mt-1 truncate italic">
                        {lastMsg.senderName}: "{lastMsg.text}"
                      </p>
                    ) : (
                      <p className="text-[10px] text-slate-400 mt-1 truncate italic">
                        No communications entered yet.
                      </p>
                    )}
                  </div>
                );
              })}

              {visibleOrders.length === 0 && (
                <div className="text-slate-400 text-xs px-4 py-12 text-center flex flex-col items-center gap-1.5">
                  <MessageSquare size={20} className="text-slate-300" />
                  <span>No order placement channels active.</span>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Direct message users selection (Admin view) */}
              {user.role === 'admin' ? (
                <>
                  {clientUsers.map(client => {
                    const roomKey = `dm_${client.email}`;
                    const isSelected = activeRoomId === roomKey;
                    const dmMsgs = chats.filter(c => c.room === roomKey);
                    const lastMsg = dmMsgs.pop();

                    return (
                      <div
                        key={client.id}
                        onClick={() => onSetActiveRoomId(roomKey)}
                        className={`p-3.5 rounded-xl cursor-pointer transition-all border text-left ${
                          isSelected
                            ? 'bg-white border-indigo-200 shadow-sm'
                            : 'border-transparent hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-extrabold text-slate-800 truncate max-w-[140px]">{client.name}</span>
                          <span className={`text-[8px] uppercase font-black tracking-wider px-1.5 py-0.2 rounded border ${
                            client.role === 'publisher'
                              ? 'bg-indigo-50 border-indigo-150 text-indigo-600'
                              : 'bg-emerald-50 border-emerald-150 text-emerald-600'
                          }`}>
                            {client.role}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 truncate mt-0.5 font-mono">
                          {client.email}
                        </div>
                        {lastMsg ? (
                          <p className="text-[10px] text-slate-500 mt-1.5 truncate font-medium">
                            <span className="font-bold">{lastMsg.senderRole === 'admin' ? 'You' : lastMsg.senderName}:</span> "{lastMsg.text}"
                          </p>
                        ) : (
                          <p className="text-[10px] text-slate-400 mt-1.5 truncate italic">
                            No direct messages exchanged.
                          </p>
                        )}
                      </div>
                    );
                  })}

                  {clientUsers.length === 0 && (
                    <div className="text-slate-400 text-xs px-4 py-12 text-center flex flex-col items-center gap-1.5">
                      <MessageSquare size={20} className="text-slate-300" />
                      <span>No client accounts registered to message.</span>
                    </div>
                  )}
                </>
              ) : (
                /* Client view (Publisher or Advertiser has a direct line to Admin) */
                <div
                  onClick={() => onSetActiveRoomId(`dm_${user.email}`)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all border text-left ${
                    activeRoomId === `dm_${user.email}`
                      ? 'bg-white border-indigo-200 shadow-sm'
                      : 'border-transparent hover:bg-slate-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                      🛡️ System Administrator
                    </span>
                    <span className="text-[8px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900 text-white">
                      Support
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate mt-1">
                    Direct message channel with help desk & audit admin.
                  </div>
                  {chats.filter(c => c.room === `dm_${user.email}`).length > 0 ? (
                    <p className="text-[10px] text-indigo-650 mt-1.5 font-semibold truncate italic">
                      Last Message: "{chats.filter(c => c.room === `dm_${user.email}`).pop()?.text}"
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-400 mt-1.5 truncate italic">
                      Click to initiate a secure direct conversation.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Message Chat feed */}
      <div className="md:col-span-8 flex flex-col bg-white">
        {activeRoomId ? (
          <>
            {/* Header info */}
            <div className="p-4 border-b border-slate-100 flex justify-between items-center shadow-sm text-left">
              {isDm ? (
                <div>
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <span>💬 Direct Support: {dmRecipientName}</span>
                    <span className={`text-[9px] uppercase font-black tracking-wider px-1.5 py-0.2 rounded border ${
                      dmRecipientRole === 'admin'
                        ? 'bg-slate-900 text-white border-slate-850'
                        : dmRecipientRole === 'publisher'
                        ? 'bg-indigo-50 border-indigo-150 text-indigo-700'
                        : 'bg-emerald-50 border-emerald-150 text-emerald-700'
                    }`}>
                      {dmRecipientRole}
                    </span>
                  </h4>
                  <p className="text-[10.5px] text-slate-500 mt-0.5">
                    Direct contact endpoint: <span className="font-mono font-bold">{dmRecipientEmail}</span> • End-to-end audit enabled.
                  </p>
                </div>
              ) : activeOrder ? (
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Room: {activeOrder.id} Discussion</h4>
                  <p className="text-[11px] text-slate-500">
                    Site placement: <span className="font-bold">{activeOrder.site}</span> • Anchor: "{activeOrder.anchorText}"
                  </p>
                </div>
              ) : (
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Room Communications</h4>
                </div>
              )}

              {!isDm && activeOrder && (
                <span className="text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded border border-slate-200 font-semibold">
                  Placing Price: ${activeOrder.amount.toFixed(2)}
                </span>
              )}
            </div>

            {/* Chat list */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[360px] min-h-[300px]">
              {roomMessages.map((msg) => {
                const isMe = msg.senderId === user.id || msg.senderId === user.email || (msg.senderRole === user.role && msg.senderName === user.name);
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl p-3.5 text-xs text-left ${
                      isMe
                        ? 'bg-indigo-650 text-white rounded-br-none shadow-sm shadow-indigo-950/10'
                        : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-150'
                    }`}>
                      <div className="flex items-center gap-1.5 pb-1 opacity-70 text-[10px] font-bold">
                        <span>{msg.senderName}</span>
                        <span className="uppercase text-[8px] bg-slate-300/40 px-1 py-0.2 rounded">
                          {msg.senderRole}
                        </span>
                      </div>
                      <p className="leading-relaxed break-words">{msg.text}</p>
                      <span className="block text-right text-[8px] opacity-50 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {roomMessages.length === 0 && (
                <div className="text-center text-slate-400 py-24 text-xs flex flex-col items-center gap-1.5">
                  <MessageCircle size={32} className="text-slate-300" />
                  <span className="font-extrabold text-slate-700">No message history found</span>
                  <p className="max-w-xs text-[11px] text-slate-400">
                    {isDm 
                      ? "Send an individual support inquiry, general feedback, or editorial modification note directly."
                      : "Send a message to introduce yourself and establish anchor expectations."}
                  </p>
                </div>
              )}
            </div>

            {/* Input field */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 bg-slate-50 flex gap-2">
              <input
                type="text"
                placeholder={isDm ? "Type your private direct message to user..." : "Type your editorial notes or backlink updates..."}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1 transition-all cursor-pointer shadow-md shadow-indigo-900/10"
              >
                Send <Send size={11} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-400 min-h-[440px]">
            <MessageSquare size={48} className="text-slate-200 mb-2 animate-bounce" />
            <h5 className="font-bold text-sm text-slate-600">Select Communication Room</h5>
            <p className="text-xs text-slate-500">Pick a room or direct user on the left side to review chats.</p>
          </div>
        )}
      </div>

    </div>
  );
}
