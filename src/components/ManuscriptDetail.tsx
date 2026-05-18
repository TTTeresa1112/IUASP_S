import React, { useState } from 'react';
import { 
  FileText, 
  User, 
  Mail, 
  MessageSquare, 
  CornerUpLeft, 
  Settings, 
  Ban, 
  UserPlus,
  CheckCircle,
  XCircle,
  Edit3,
  UserCheck,
  File,
  Download,
  Eye,
  ChevronDown,
  History,
  Send,
  AlertCircle,
  Check
} from 'lucide-react';
import ModifyWorkflowModal from './ModifyWorkflowModal';

interface ManuscriptDetailProps {
  onBack: () => void;
}

export default function ManuscriptDetail({ onBack }: ManuscriptDetailProps) {
  const [activeVersion, setActiveVersion] = useState(' Original Version');
  const [showModifyWorkflowModal, setShowModifyWorkflowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Basic Information');
  const versions = [' Original Version', 'Revision 1', 'Revision 2'];

  const tabs = [
    { id: 'Basic Information', label: 'Basic Information', icon: FileText },
    { id: 'Manuscript Details', label: 'Manuscript Details', icon: File },
    { id: 'Reviewer Comments', label: 'Reviewer Comments', icon: MessageSquare },
    { id: 'Correspondence History', label: 'Correspondence History', icon: History }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-full flex flex-col font-['Helvetica_Neue',_Helvetica,_Arial,_sans-serif]">
      {/* Header bar with primary actions */}
      <div className="bg-white border-b border-[#e2e8f0] px-8 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-lg hover:bg-[#f1f5f9] text-[#64748b] transition-colors"
          >
            <CornerUpLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[20px] font-bold text-[#1e293b]">MS-2026-0102</h1>
              <span className="px-2.5 py-1 bg-[#f0f9ff] border border-[#bae6fd] text-[#0369a1] text-[12px] font-bold rounded-md">
                Pending ME Initial Check
              </span>
            </div>
            <div className="text-[14px] text-[#64748b] mt-1 space-x-2">
              <span>Science</span>
              <span>•</span>
              <span>CRISPR-Cas9 off-target effects mitigation</span>
            </div>
          </div>
        </div>

        {/* Global Toolbar Actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#e2e8f0] rounded-md text-[13px] font-medium text-[#475569] hover:bg-[#f8fafc] transition-colors shadow-sm">
            <Mail size={16} className="text-[#64748b]"/> Contact
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#e2e8f0] rounded-md text-[13px] font-medium text-[#475569] hover:bg-[#f8fafc] transition-colors shadow-sm">
            <MessageSquare size={16} className="text-[#64748b]"/> Comments
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#e2e8f0] rounded-md text-[13px] font-medium text-[#475569] hover:bg-[#f1f5f9] transition-colors shadow-sm">
            <CornerUpLeft size={16} className="text-[#64748b]"/> Cancel
          </button>
          <button 
            onClick={() => setShowModifyWorkflowModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#e2e8f0] rounded-md text-[13px] font-medium text-[#475569] hover:bg-[#f8fafc] transition-colors shadow-sm"
          >
            <Settings size={16} className="text-[#64748b]"/> Modify Work Flow
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#fecaca] rounded-md text-[13px] font-medium text-[#b91c1c] hover:bg-[#fef2f2] transition-colors shadow-sm">
            <Ban size={16}/> Withdraw
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] text-white rounded-md text-[13px] font-medium hover:bg-[#1d4ed8] transition-colors shadow-sm">
            <UserPlus size={16}/> Invite Reviewers
          </button>
        </div>
      </div>

      <div className="flex-1 p-8 grid grid-cols-1 xl:grid-cols-4 gap-8 items-start max-w-[1600px] mx-auto w-full">
        {/* Main Content Area */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* Workflow Stepper */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-5 relative overflow-hidden">
            <div className="flex items-center justify-between relative z-10">
              {[
                { id: 1, label: 'Submission', desc: '稿件提交', status: 'completed' },
                { id: 2, label: 'Initial Check', desc: '初审', status: 'current' },
                { id: 3, label: 'Peer Review', desc: '同行评议', status: 'pending' },
                { id: 4, label: 'Archived', desc: '归档', status: 'pending' },
              ].map((step, index, arr) => (
                <div key={step.id} className="flex flex-col items-center flex-1 relative group">
                  {/* Progress Line */}
                  {index < arr.length - 1 && (
                    <div className={`absolute top-[14px] left-[50%] w-full h-[2px] ${
                      step.status === 'completed' ? 'bg-[#22c55e]' : 'bg-[#e2e8f0]'
                    }`}></div>
                  )}
                  {/* Step Circle */}
                  <div className={`relative flex items-center justify-center w-7 h-7 rounded-full text-[13px] font-bold border-2 bg-white z-10 transition-colors
                    ${step.status === 'completed' ? 'border-[#22c55e] text-[#22c55e]' : 
                      step.status === 'current' ? 'border-[#2563eb] text-[#2563eb] ring-4 ring-[#eff6ff]' : 
                      'border-[#e2e8f0] text-[#94a3b8]'}`}>
                    {step.status === 'completed' ? <Check size={14} strokeWidth={3} /> : step.id}
                  </div>
                  {/* Step Text */}
                  <div className="mt-3 text-center">
                    <div className={`text-[13px] font-bold ${step.status === 'pending' ? 'text-[#94a3b8]' : 'text-[#1e293b]'}`}>
                      {step.label}
                    </div>
                    <div className={`text-[12px] mt-0.5 ${step.status === 'pending' ? 'text-[#cbd5e1]' : 'text-[#64748b]'}`}>
                      {step.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="bg-white border text-[#334155] border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden flex items-center justify-between px-2">
             <div className="flex overflow-x-auto no-scrollbar">
               {tabs.map((tab) => {
                 const Icon = tab.icon;
                 const isActive = activeTab === tab.id;
                 return (
                   <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={`flex items-center gap-2 px-5 py-4 text-[14px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                       isActive 
                         ? 'border-[#2563eb] text-[#2563eb]' 
                         : 'border-transparent text-[#64748b] hover:text-[#1e293b] hover:border-[#cbd5e1]'
                     }`}
                   >
                     <Icon size={16} className={isActive ? 'text-[#2563eb]' : 'text-[#94a3b8]'} />
                     {tab.label}
                   </button>
                 );
               })}
             </div>
             
             {/* Version Selector (only show if applicable) */}
             <div className="px-4 border-l border-[#e2e8f0] py-2 shrink-0">
               <select 
                 value={activeVersion}
                 onChange={(e) => setActiveVersion(e.target.value)}
                 className="text-[13px] border border-[#e2e8f0] rounded-md px-3 py-1.5 bg-[#f8fafc] text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
               >
                 {versions.map(v => <option key={v} value={v}>{v}</option>)}
               </select>
             </div>
          </div>

          {/* 1. 稿件基本信息 */}
          {activeTab === 'Basic Information' && (
          <section className="bg-white border text-[#334155] border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-[14px]">
              <div className="space-y-1">
                <span className="text-[#64748b] text-[13px] font-medium uppercase tracking-wide">Journal / Special Issue</span>
                <p className="font-semibold text-[#1e293b]">Science</p>
              </div>
              <div className="space-y-1">
                <span className="text-[#64748b] text-[13px] font-medium uppercase tracking-wide">Manuscript ID</span>
                <p className="font-semibold text-[#1e293b]">MS-2026-0102</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <span className="text-[#64748b] text-[13px] font-medium uppercase tracking-wide">Manuscript Title</span>
                <p className="font-semibold text-[#1e293b] text-[16px]">CRISPR-Cas9 off-target effects mitigation strategies in mammalian cell lines</p>
              </div>
              
              <div className="space-y-1 md:col-span-2">
                <span className="text-[#64748b] text-[13px] font-medium uppercase tracking-wide">Author Information</span>
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-3 space-y-2 mt-2">
                  <div className="flex items-center gap-2 justify-between">
                    <div>
                      <p className="font-medium text-[#1e293b]">Dr. Jane Doe <span className="text-[12px] bg-[#2563eb] text-white px-2 py-0.5 rounded ml-2">Corresponding Author</span></p>
                      <p className="text-[#64748b] text-[13px]">Massachusetts Institute of Technology (MIT)</p>
                    </div>
                  </div>
                  <div className="h-[1px] bg-[#e2e8f0]"></div>
                  <div className="flex items-center gap-2 justify-between">
                    <div>
                      <p className="font-medium text-[#1e293b]">Dr. John Smith</p>
                      <p className="text-[#64748b] text-[13px]">Harvard University</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[#64748b] text-[13px] font-medium uppercase tracking-wide">EIC (Editor in Chief)</span>
                <p className="font-medium text-[#1e293b] flex items-center gap-1.5"><User size={16} className="text-[#64748b]"/> Alice Eic</p>
              </div>
              <div className="space-y-1">
                <span className="text-[#64748b] text-[13px] font-medium uppercase tracking-wide">AE (Academic Editor)</span>
                <p className="font-medium text-[#1e293b] flex items-center gap-1.5"><User size={16} className="text-[#64748b]"/> Bob Ae</p>
              </div>
              <div className="space-y-1">
                <span className="text-[#64748b] text-[13px] font-medium uppercase tracking-wide">ME (Managing Editor)</span>
                <p className="font-medium text-[#1e293b] flex items-center gap-1.5"><User size={16} className="text-[#64748b]"/> Charlie Me (You)</p>
              </div>
              <div></div> {/* Empty for grid alignment */}

              <div className="space-y-1">
                <span className="text-[#64748b] text-[13px] font-medium uppercase tracking-wide">Manuscript Type</span>
                <p className="font-medium text-[#1e293b]">Original Research</p>
              </div>
              <div className="space-y-1">
                <span className="text-[#64748b] text-[13px] font-medium uppercase tracking-wide">Manuscript Section</span>
                <p className="font-medium text-[#1e293b]">Bio-engineering</p>
              </div>
              
              <div className="space-y-1 md:col-span-2">
                <span className="text-[#64748b] text-[13px] font-medium uppercase tracking-wide">Key Words</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {['CRISPR', 'Gene Editing', 'Off-target effects', 'Mammalian Cell Lines'].map(kw => (
                    <span key={kw} className="px-2.5 py-1 bg-[#f1f5f9] border border-[#e2e8f0] text-[#475569] text-[13px] rounded-md">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1 md:col-span-2 mt-2">
                <span className="text-[#64748b] text-[13px] font-medium uppercase tracking-wide">Abstract</span>
                <p className="text-[#334155] leading-relaxed bg-[#f8fafc] p-4 rounded-lg border border-[#e2e8f0]">
                  This study presents a novel mitigation strategy for CRISPR-Cas9 off-target effects. By engineering high-fidelity variants of the Cas9 nuclease and utilizing predictive modeling, we demonstrate a 95% reduction in off-target cleavages across diverse mammalian cell lines while maintaining on-target efficiency. These findings have significant implications for therapeutic gene editing applications.
                </p>
              </div>
            </div>
          </section>
          )}

          {/* 2. 稿件详情 */}
          {activeTab === 'Manuscript Details' && (
          <section className="bg-white border text-[#334155] border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-6">
               <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
                 <h3 className="text-[14px] font-bold text-[#1e293b] mb-4">Author Uploaded Materials ({activeVersion})</h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Material Item */}
                    <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 flex items-start gap-4 hover:border-[#94a3b8] transition-colors">
                      <div className="w-10 h-10 bg-[#fee2e2] text-[#ef4444] rounded flex items-center justify-center shrink-0">
                        <FileText size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-[#1e293b] text-[14px] truncate">Main_Manuscript_V1.pdf</p>
                        <p className="text-[#64748b] text-[12px] mt-0.5">PDF Document • 4.2 MB</p>
                        <div className="flex gap-3 mt-3">
                           <button className="text-[#2563eb] text-[13px] font-medium hover:underline flex items-center gap-1"><Eye size={14}/> Preview</button>
                           <button className="text-[#2563eb] text-[13px] font-medium hover:underline flex items-center gap-1"><Download size={14}/> Download</button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 flex items-start gap-4 hover:border-[#94a3b8] transition-colors">
                      <div className="w-10 h-10 bg-[#dbeafe] text-[#2563eb] rounded flex items-center justify-center shrink-0">
                        <File size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-[#1e293b] text-[14px] truncate">Supplementary_Data.zip</p>
                        <p className="text-[#64748b] text-[12px] mt-0.5">ZIP Archive • 12.5 MB</p>
                        <div className="flex gap-3 mt-3">
                           <button className="text-[#2563eb] text-[13px] font-medium hover:underline flex items-center gap-1"><Download size={14}/> Download</button>
                        </div>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </section>
          )}

          {/* 3. 审稿人意见 */}
          {activeTab === 'Reviewer Comments' && (
          <section className="bg-white border text-[#334155] border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-6">
              {activeVersion === ' Original Version' ? (
                <div className="text-center py-8">
                  <div className="text-[40px] mb-3">💬</div>
                  <p className="text-[15px] font-medium text-[#475569]">No reviewer comments available for the original version yet.</p>
                  <p className="text-[13px] text-[#94a3b8] mt-1">Comments will appear here once the peer review process begins.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Mock Reviewer */}
                  <div className="border border-[#e2e8f0] rounded-xl overflow-hidden">
                    <div className="bg-[#f8fafc] px-4 py-3 border-b border-[#e2e8f0] flex items-center justify-between">
                       <span className="font-bold text-[#1e293b] flex items-center gap-2">
                         <User size={16} /> Prof. Alan Turing <span className="text-[12px] font-normal text-[#64748b]">(Reviewer 1)</span>
                       </span>
                       <span className="text-[12px] bg-[#dcfce7] text-[#166534] px-2 py-0.5 rounded font-medium border border-[#bbf7d0]">Accepted with minor revisions</span>
                    </div>
                    <div className="p-4 text-[14px] text-[#334155] bg-white leading-relaxed">
                      "The methodology is solid, but the predictive modeling section could use more clarification regarding the hyperparameter tuning. Overall a strong paper."
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
          )}

          {/* 4. 通信记录 */}
          {activeTab === 'Correspondence History' && (
          <section className="bg-white border text-[#334155] border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-6">
               <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#e2e8f0] before:to-transparent">
                  
                  {/* Timeline Item */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#2563eb] text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                      <Send size={16} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-[#e2e8f0] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-[#1e293b] text-[14px]">Manuscript Submission Received</h4>
                        <time className="text-[12px] text-[#94a3b8]">Oct 24, 2026 09:12 AM</time>
                      </div>
                      <p className="text-[13px] text-[#64748b]">System auto-reply sent to Dr. Jane Doe confirming receipt of MS-2026-0102.</p>
                      <button className="text-[#2563eb] text-[12px] font-medium mt-2 hover:underline">View Email details</button>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#f8fafc] border-[#e2e8f0] text-[#64748b] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                      <AlertCircle size={16} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc]">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-[#1e293b] text-[14px]">Status Changed</h4>
                        <time className="text-[12px] text-[#94a3b8]">Oct 24, 2026 09:15 AM</time>
                      </div>
                      <p className="text-[13px] text-[#64748b]">Status updated to "Pending ME Initial Check".</p>
                    </div>
                  </div>

               </div>
            </div>
          </section>
          )}

        </div>

        {/* Sidebar / Context actions specific to state */}
        <div className="space-y-6 sticky top-24">
           
           <div className="bg-white border text-[#334155] border-[#e2e8f0] rounded-xl shadow-sm p-5 relative overflow-hidden">
             
             {/* decorative blob */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563eb] opacity-[0.03] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

             <h3 className="text-[13px] font-bold text-[#64748b] uppercase tracking-wider mb-4 border-b border-[#f1f5f9] pb-2">
               Next Actions (处理操作)
             </h3>

             <div className="space-y-3">
               <span className="block text-[12px] font-medium text-[#475569] mb-1">Make a Decision</span>
               <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-lg font-bold text-[14px] transition-colors shadow-sm">
                 <CheckCircle size={18} /> Accept
               </button>
               <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#ef4444] hover:bg-[#dc2626] text-white rounded-lg font-bold text-[14px] transition-colors shadow-sm">
                 <XCircle size={18} /> Reject
               </button>
               <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#f59e0b] hover:bg-[#d97706] text-white rounded-lg font-bold text-[14px] transition-colors shadow-sm">
                 <Edit3 size={18} /> Require Revision
               </button>
             </div>

             <div className="h-px bg-[#e2e8f0] my-5"></div>
             
             <div className="space-y-3">
               <span className="block text-[12px] font-medium text-[#475569] mb-1">Workflow Assignment</span>
               <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-[#e2e8f0] text-[#1e293b] hover:bg-[#f8fafc] rounded-lg font-bold text-[13px] transition-colors">
                 <UserCheck size={16} className="text-[#2563eb]" /> Assign EIC
               </button>
               <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-[#e2e8f0] text-[#1e293b] hover:bg-[#f8fafc] rounded-lg font-bold text-[13px] transition-colors">
                 <UserCheck size={16} className="text-[#2563eb]" /> Assign AE
               </button>
             </div>
           </div>

           <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl p-5">
             <div className="flex items-start gap-3 text-[#0369a1]">
                <Settings className="mt-0.5 shrink-0" size={18} />
                <div>
                  <h4 className="font-bold text-[14px] mb-1">Workflow Note</h4>
                  <p className="text-[13px] opacity-90 leading-relaxed">
                    This manuscript is pending your initial check. Make sure the basic requirements are met before assigning it to an Editor-in-Chief.
                  </p>
                </div>
             </div>
           </div>

        </div>
      </div>
      
      {showModifyWorkflowModal && (
        <ModifyWorkflowModal onClose={() => setShowModifyWorkflowModal(false)} />
      )}
    </div>
  );
}
