import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />
      <div className={`relative w-full ${maxWidth} overflow-hidden rounded-3xl bg-white shadow-2xl border border-emerald-950/10 z-10 max-h-[90vh] flex flex-col`}>
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#0a2d21] to-[#0e3b2c] text-white flex items-center justify-between border-b border-emerald-900/50">
          <h3 className="text-base font-bold tracking-tight text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
