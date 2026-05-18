import React, { useState } from 'react';
import { X, User, CheckCircle2, Clock, Plus, ChevronRight } from 'lucide-react';

interface WorkflowNode {
  id: string;
  type: 'initiator' | 'approver';
  role: string;
  name: string;
  status: 'completed' | 'current' | 'pending';
  multiple?: { name: string }[];
}

interface ModifyWorkflowModalProps {
  onClose: () => void;
}

export default function ModifyWorkflowModal({ onClose }: ModifyWorkflowModalProps) {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { 
      id: '1', 
      type: 'initiator', 
      role: '发起人 (Initiator)', 
      name: 'Charlie Me (Managing Editor)', 
      status: 'completed' 
    },
    { 
      id: '2', 
      type: 'approver', 
      role: '审批人 (EIC)', 
      name: 'Alice Eic', 
      status: 'current' 
    },
    { 
      id: '3', 
      type: 'approver', 
      role: '审批人 (AE)', 
      name: 'Bob Ae', 
      status: 'pending' 
    },
    {
      id: '4',
      type: 'approver',
      role: '审批人 (SubME)',
      name: '请选择审批人',
      status: 'pending'
    }
  ]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-[2px] transition-opacity">
      <div className="bg-white w-full max-w-[600px] h-full shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
          <h2 className="text-[18px] font-bold text-[#1e293b]">详情</h2>
          <button 
            onClick={onClose}
            className="p-1 -mr-1 rounded text-[#94a3b8] hover:text-[#475569] hover:bg-[#f1f5f9] transition-colors cursor-pointer"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="mb-8 border-b border-[#e2e8f0] pb-6">
            <h3 className="text-[20px] font-bold text-[#1e293b] mb-2">修改工作流 (Modify Work Flow)</h3>
            <div className="text-[13px] text-[#64748b] flex gap-2 items-center">
              <span>审批编号: MS-2026-0102</span>
            </div>
            
            <div className="mt-6 space-y-4">
              {/* Optional Form Fields placeholder inspired by screenshot */}
              <div className="flex items-center gap-4">
                <div className="w-24 text-[13px] text-[#64748b] shrink-0 text-right"><span className="text-[#ef4444] mr-1">*</span>修改说明</div>
                <input type="text" className="flex-1 border border-[#e2e8f0] rounded pl-3 py-1.5 focus:outline-none focus:border-[#3b82f6] text-[13px]" placeholder="需上级审核通过，方能更改最终负责人" />
              </div>
            </div>
          </div>

          <div className="space-y-0 relative">
            {nodes.map((node, index) => {
              const isLast = index === nodes.length - 1;
              
              return (
                <div key={node.id} className="flex gap-4 relative">
                  {/* Timeline Column */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded text-white flex items-center justify-center shrink-0 z-10 ${
                      node.status === 'completed' ? 'bg-[#3b82f6]' : 
                      node.status === 'current' ? 'bg-[#3b82f6]' : 
                      'bg-[#94a3b8]'
                    }`}>
                      <User size={20} />
                    </div>
                    {/* Status Icon Overlay */}
                    {node.status === 'completed' && (
                      <div className="absolute top-6 ml-6 bg-white rounded-full">
                        <CheckCircle2 size={14} className="text-[#22c55e]" />
                      </div>
                    )}
                    {node.status === 'current' && (
                      <div className="absolute top-6 ml-6 bg-white rounded-full">
                        <Clock size={14} className="text-[#f59e0b]" />
                      </div>
                    )}

                    {!isLast && (
                      <div className="w-px h-full bg-[#cbd5e1] my-2"></div>
                    )}
                  </div>

                  {/* Content Column */}
                  <div className={`pb-10 pt-1 ${isLast ? '' : ''} flex-1`}>
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-[15px] font-bold text-[#1e293b]">{node.role}</span>
                       {node.status === 'completed' && <span className="text-[12px] text-[#94a3b8]">2026-10-24 09:12</span>}
                    </div>
                    
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded p-3 hover:border-[#bfdbfe] transition-colors cursor-pointer group">
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                           <span className={`text-[14px] ${node.status === 'pending' && node.name === '请选择审批人' ? 'text-[#3b82f6]' : 'text-[#334155]'}`}>
                             {node.name} {node.status === 'current' && <span className="text-[#f59e0b] text-[13px] ml-1">(审批中)</span>}
                           </span>
                         </div>
                         {node.status !== 'completed' && (
                           <ChevronRight size={16} className="text-[#94a3b8] group-hover:text-[#3b82f6] transition-colors" />
                         )}
                       </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-t border-[#e2e8f0] bg-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex gap-2">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-[#334155] font-medium text-[14px] hover:bg-[#f1f5f9] rounded transition-colors"
            >
              取消
            </button>
            <button className="px-4 py-2 text-[#3b82f6] font-medium text-[14px] hover:bg-[#eff6ff] rounded transition-colors flex items-center gap-1">
              加签 (加节点)
            </button>
            <button className="px-4 py-2 text-[#334155] font-medium text-[14px] hover:bg-[#f1f5f9] rounded transition-colors">
              退回
            </button>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-[#3b82f6] text-white font-medium text-[14px] hover:bg-[#2563eb] rounded transition-colors"
            >
              同意提交
            </button>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}} />
    </div>
  );
}
