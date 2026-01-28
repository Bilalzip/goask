'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Pencil, Trash2, Check } from 'lucide-react';
import { ChevronLeft, Cross } from 'lucide-react';
import { useRouter } from 'next/navigation';

type ChatItem = { id: number; pdfName: string };
interface TrunkType {
  str: string;
  length: number;
}

const truncate = ({ str, length }: TrunkType): string => {
  if (str.length > length) {
    return str.slice(0, length) + '...';
  }
  return str;
};

const DocumentItem = ({
  pdfName,
  isActive,
  onClick,
  onRename,
  onDelete,
  editing,
  editValue,
  onEditChange,
  onEditSubmit,
  onEditCancel,
}: {
  pdfName: string;
  isActive: boolean;
  onClick: () => void;
  onRename: () => void;
  onDelete: () => void;
  editing?: boolean;
  editValue?: string;
  onEditChange?: (v: string) => void;
  onEditSubmit?: () => void;
  onEditCancel?: () => void;
}) => (
  <div className={`group w-full flex items-center justify-between gap-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition ${isActive ? 'ring-2 ring-yellow-400/40' : ''}`}>
    <div className="flex-1 flex flex-row gap-3 items-center">
      <button onClick={onClick} className="shrink-0">
        <div className="bg-white/90 rounded-full flex justify-center items-center w-10 h-10 text-black font-semibold">
          {pdfName.trim().charAt(0).toUpperCase()}
        </div>
      </button>
      {!editing ? (
        <button onClick={onClick} className="flex flex-col gap-1 text-left flex-1">
          <span className="text-sm opacity-80">{truncate({ str: pdfName.trim(), length: 24 })}</span>
          <span className="font-semibold">{truncate({ str: pdfName, length: 24 })}</span>
        </button>
      ) : (
        <div className="flex items-center gap-2 flex-1">
          <input
            autoFocus
            value={editValue || ''}
            onChange={(e) => onEditChange && onEditChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onEditSubmit && onEditSubmit();
              if (e.key === 'Escape') onEditCancel && onEditCancel();
            }}
            className="flex-1 bg-white/10 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="button"
            onClick={() => onEditSubmit && onEditSubmit()}
            className="p-1 rounded bg-yellow-400 text-black hover:bg-yellow-300"
            title="Save name"
            aria-label="Save name"
          >
            <Check size={16} />
          </button>
        </div>
      )}
    </div>
    {!editing && (
      <div className="flex gap-2 opacity-80">
        <button onClick={onRename} className="p-1 rounded hover:bg-white/10" title="Rename">
          <Pencil size={16} />
        </button>
        <button onClick={onDelete} className="p-1 rounded hover:bg-white/10" title="Delete">
          <Trash2 size={16} />
        </button>
      </div>
    )}
  </div>
);

const DocumentList = ({ showdoc, setshowdoc, Chats, activeChatId, onChatsChange }: { showdoc: boolean; setshowdoc: (v: boolean) => void; Chats: ChatItem[]; activeChatId?: number; onChatsChange?: (next: ChatItem[]) => void }) => {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");

  const handleNewchat = () => {
    router.push('/upload-pdf');
  };

  const handleSection = () => {
    setshowdoc(!showdoc);
  };

  return (
    <div
      className={`md:bg-gradient-to-r from-[#F3F4F660] via-[#F3F4F660] to-[#8E8F9080] bg-black rounded-md w-full md:w-1/4 flex flex-col h-98 ${
        showdoc ? 'md:block hidden' : 'block'
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl">Recent Documents</h1>
          <button onClick={handleSection} className="md:hidden block">
            <ChevronLeft size={20} color="#00C308" />
          </button>
        </div>
        {/* Set a fixed height and enable overflow-y */}
        <div className="mt-4 flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-600"
             style={{ scrollbarColor: '#101010 #E7C200C7', scrollbarWidth: 'thin' }}>
          {Chats.map((chat) => (
            <DocumentItem
              key={chat.id}
              pdfName={chat.pdfName}
              isActive={activeChatId === chat.id}
              onClick={() => router.push(`/chat/${chat.id}`)}
              onRename={() => {
                setEditingId(chat.id);
                setEditingValue(chat.pdfName);
              }}
              onDelete={async () => {
                const Uid = typeof window !== 'undefined' ? localStorage.getItem('Uid') : null;
                const ok = typeof window !== 'undefined' ? confirm('Delete this chat?') : false;
                if (!Uid || !ok) return;
                try {
                  await axios.delete(`/api/chats/${chat.id}`, { data: { Uid } });
                  if (onChatsChange) {
                    const next = Chats.filter(c => c.id !== chat.id);
                    onChatsChange(next);
                    if (activeChatId === chat.id) {
                      if (next.length) router.push(`/chat/${next[0].id}`);
                      else router.push('/');
                    }
                  }
                } catch (e) {
                  console.error('Delete failed', e);
                  toast.error('Failed to delete chat');
                }
              }}
              editing={editingId === chat.id}
              editValue={editingId === chat.id ? editingValue : undefined}
              onEditChange={(v) => setEditingValue(v)}
              onEditSubmit={async () => {
                if (editingId !== chat.id) return;
                const name = editingValue?.trim();
                if (!name || name === chat.pdfName) {
                  setEditingId(null);
                  return;
                }
                const Uid = typeof window !== 'undefined' ? localStorage.getItem('Uid') : null;
                if (!Uid) {
                  setEditingId(null);
                  return;
                }
                try {
                  const res = await axios.patch(`/api/chats/${chat.id}`, { Uid, pdfName: name });
                  if (res.data?.chat && onChatsChange) {
                    onChatsChange(Chats.map(c => c.id === chat.id ? { ...c, pdfName: res.data.chat.pdfName } : c));
                  }
                } catch (e) {
                  console.error('Rename failed', e);
                  toast.error('Failed to rename chat');
                } finally {
                  setEditingId(null);
                }
              }}
              onEditCancel={() => setEditingId(null)}
            />
          ))}
        </div>
      </div>
      <div className="md:hidden w-full fixed bottom-0 left-1">
        <div className="flex justify-center items-center border-t-2 border-[#FFFFFF1A]">
          <button
            onClick={handleNewchat}
            className="p-8 mt-4 mb-2 rounded-lg flex flex-row gap-2 justify-center items-center px-4 py-2 bg-yellow-400 text-black font-bold"
          >
            <Cross size={20} /> Start New Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentList;
