import React, { useState } from 'react';
import { Filter, Check, Bell, Eye, EyeOff, AlertCircle, Clock, FileCheck, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ManuscriptDetail from './components/ManuscriptDetail';

type Stage = '初审' | 'In Process' | '归档' | '后处理';
type RoleView = 'ME' | 'EIC' | 'AE' | 'RE' | 'AU' | 'LIST';

interface Manuscript {
  id: string;
  journal: string;
  title: string;
  subStatus: string;
  reviewers: string;
  comments: number | string;
  revision: string;
  status: string;
  stage: Stage;
  reInvitationStatus?: 'Pending' | 'Accepted';
  unreadComments?: number;
  unreadType?: '稿件消息' | 'EIC消息' | 'AE消息' | 'RE消息' | '编辑部消息' | 'ME消息';
}

const meMockData: Manuscript[] = [
  // 初审 (Primary Review)
  { id: 'MS-2026-0101', journal: 'Nature', title: 'Quantum Computing Advancements in AGI', subStatus: 'Pending ME Acceptance', reviewers: '- / -', comments: 0, revision: 'R0', status: 'ME Initial Check', stage: '初审' },
  { id: 'MS-2026-0102', journal: 'Science', title: 'CRISPR-Cas9 off-target effects mitigation', subStatus: 'Pending ME Initial Check', reviewers: '- / -', comments: 0, revision: 'R0', status: 'ME Initial Check', stage: '初审', unreadComments: 1, unreadType: '稿件消息' },
  { id: 'MS-2026-0103', journal: 'Cell', title: 'Epigenetic clocks and longevity', subStatus: 'Pending AE Acceptance', reviewers: '- / -', comments: 0, revision: 'R0', status: 'ME Initial Check', stage: '初审' },
  { id: 'MS-2026-0105', journal: 'JAMA', title: 'AI in diagnostic radiology', subStatus: 'Pending EIC Acceptance', reviewers: '- / -', comments: 0, revision: 'R0', status: 'EIC Initial Check', stage: '初审' },
  { id: 'MS-2026-0106', journal: 'Nature Medicine', title: 'mRNA vaccine efficacy across variants', subStatus: 'Pending ME Initial Check', reviewers: '- / -', comments: 0, revision: 'R0', status: 'EIC Initial Check', stage: '初审', unreadComments: 1, unreadType: 'EIC消息' },
  { id: 'MS-2026-0107', journal: 'Cell Reports', title: 'Novel metabolic pathways in T-cells', subStatus: 'Pending AE Acceptance', reviewers: '- / -', comments: 0, revision: 'R0', status: 'EIC Initial Check', stage: '初审' },
  { id: 'MS-2026-0108', journal: 'BMJ', title: 'Healthcare policy impact on regional mortality', subStatus: 'Pending EIC Initial Check', reviewers: '- / -', comments: 0, revision: 'R0', status: 'EIC Initial Check', stage: '初审' },
  { id: 'MS-2026-0109', journal: 'Nature', title: 'Climate change impact on marine biodiversity', subStatus: 'Pending AE Initial Check', reviewers: '- / -', comments: 0, revision: 'R0', status: 'AE Initial Check', stage: '初审' },
  { id: 'MS-2026-0110', journal: 'Cell', title: 'Microbiome influence on cognitive decline', subStatus: 'Pending ME Initial Check', reviewers: '- / -', comments: 0, revision: 'R0', status: 'AE Initial Check', stage: '初审', unreadComments: 1, unreadType: 'AE消息' },
  { id: 'MS-2026-0111', journal: 'Science', title: 'Graphene superconductors at room temp', subStatus: 'Send Back to Author(s)', reviewers: '- / -', comments: 1, revision: 'R1', status: 'Author(s) Revise', stage: '初审' },
  
  // In Process (Peer Review)
  { id: 'MS-2026-0085', journal: 'Cell', title: 'Novel metabolic pathways in T-cells', subStatus: 'Pending Reviewer(s) Invitation', reviewers: '0 / 10', comments: '0 / 0', revision: 'R0', status: 'Reviewer(s) Check', stage: 'In Process' },
  { id: 'MS-2026-0087', journal: 'Science', title: 'Deep learning for protein folding', subStatus: 'Pending Reviewer(s) Acceptance', reviewers: '0 / 10', comments: '0 / 0', revision: 'R1', status: 'Reviewer(s) Check', stage: 'In Process', unreadComments: 1, unreadType: 'RE消息' },
  { id: 'MS-2026-0088', journal: 'Lancet', title: 'Long COVID epidemiological study', subStatus: 'Pending Reviewer(s) Check', reviewers: '1 / 10', comments: '1 / 3', revision: 'R1', status: 'Reviewer(s) Check', stage: 'In Process', unreadComments: 1, unreadType: 'RE消息' },
  { id: 'MS-2026-0072', journal: 'JAMA', title: 'AI in diagnostic radiology', subStatus: 'Pending AE Acceptance', reviewers: '5 / 20', comments: '3 / 5', revision: 'R1', status: 'Reviewer(s) Check', stage: 'In Process', unreadComments: 3, unreadType: 'RE消息' },
  { id: 'MS-2026-0073', journal: 'Nature Medicine', title: 'mRNA vaccine efficacy across variants', subStatus: 'Pending AE Recommendation', reviewers: '5 / 20', comments: '3 / 5', revision: 'R0', status: 'AE Recommendation', stage: 'In Process' },
  { id: 'MS-2026-0069', journal: 'Nature', title: 'Climate change models on biodiversity', subStatus: 'Pending ME Decision', reviewers: '5 / 20', comments: '3 / 5', revision: 'R1', status: 'AE Recommendation', stage: 'In Process', unreadComments: 1, unreadType: 'AE消息' },
  { id: 'MS-2026-0064', journal: 'Cell', title: 'Microbiome influence on cognitive decline', subStatus: 'Pending ME Decision', reviewers: '5 / 20', comments: '3 / 5', revision: 'R1', status: 'ME Decision', stage: 'In Process', unreadComments: 1, unreadType: '稿件消息' },
  { id: 'MS-2026-0065', journal: 'Science', title: 'Graphene superconductors at room temp', subStatus: 'Pending AE Acceptance', reviewers: '5 / 20', comments: '3 / 5', revision: 'R2', status: 'ME Decision', stage: 'In Process' },
  { id: 'MS-2026-0060', journal: 'Nature', title: 'Quantum error correction protocols', subStatus: 'Pending EIC Decision', reviewers: '5 / 20', comments: '3 / 5', revision: 'R1', status: 'EIC Decision', stage: 'In Process' },
  { id: 'MS-2026-0061', journal: 'Science', title: 'Dark matter detection algorithms', subStatus: 'Pending ME Decision', reviewers: '5 / 20', comments: '3 / 5', revision: 'R2', status: 'EIC Decision', stage: 'In Process', unreadComments: 1, unreadType: 'EIC消息' },
  { id: 'MS-2026-0062', journal: 'Cell', title: 'CRISPR base editing in vivo', subStatus: 'Pending AE Acceptance', reviewers: '5 / 20', comments: '3 / 5', revision: 'R2', status: 'EIC Decision', stage: 'In Process' },
  { id: 'MS-2026-0059', journal: 'JAMA', title: 'Author revision on deep learning', subStatus: 'Send Back to Author(s)', reviewers: '5 / 20', comments: '3 / 5', revision: 'R1', status: 'Author(s) Revise', stage: 'In Process' },
  { id: 'MS-2026-0058', journal: 'Lancet', title: 'New treatment for XYZ', subStatus: 'Pending ME Decision', reviewers: '5 / 20', comments: '3 / 5', revision: 'R2', status: 'ME Pre-Acceptance', stage: 'In Process' },

  // 归档 (Archiving)
  { id: 'MS-2025-1102', journal: 'Science', title: 'Graphene superconductors at room temp', subStatus: 'Accepted', reviewers: '3 / 3', comments: 3, revision: 'R3', status: 'Accepted', stage: '归档' },
  { id: 'MS-2025-1088', journal: 'Nature', title: 'Deep learning for protein folding', subStatus: 'Reject', reviewers: '2 / 2', comments: 2, revision: 'R0', status: 'Reject', stage: '归档' },
  { id: 'MS-2025-1045', journal: 'Cell', title: 'Microbiome influence on cognitive decline', subStatus: 'Retraction', reviewers: '1 / 3', comments: 0, revision: 'R1', status: 'Accepted', stage: '归档' },
  { id: 'MS-2025-1200', journal: 'BMJ', title: 'AI-based early cancer detection in clinical settings', subStatus: 'Corrected', reviewers: '2 / 3', comments: 1, revision: 'R2', status: 'Accepted', stage: '归档' },

  // 后处理 (Post-Publication)
  { id: 'MS-2024-0120', journal: 'Lancet', title: 'Adverse effects reports on new drug', subStatus: 'Corrected', reviewers: '- / -', comments: '-', revision: 'R0', status: 'Accepted', stage: '后处理', unreadComments: 1, unreadType: '稿件消息' },
  { id: 'MS-2024-0345', journal: 'Nature', title: 'Correction on CRISPR data', subStatus: 'Retraction', reviewers: '- / -', comments: '-', revision: 'R0', status: 'Accepted', stage: '后处理' },
];

const auMockData: Manuscript[] = [
  // 初审 (Primary Review)
  { id: 'MS-2026-0101', journal: 'Nature', title: 'Quantum Computing Advancements in AGI', subStatus: 'Pending Editor Initial Check', reviewers: '- / -', comments: 0, revision: 'R0', status: 'Editor Initial Check', stage: '初审' },
  { id: 'MS-2026-0102', journal: 'Science', title: 'CRISPR-Cas9 off-target effects mitigation', subStatus: 'Send Back to Author(s)', reviewers: '- / -', comments: 1, revision: 'R1', status: 'Author(s) Revise', stage: '初审', unreadComments: 1, unreadType: '编辑部消息' },
  
  // In Process (Peer Review)
  { id: 'MS-2026-0085', journal: 'Cell', title: 'Novel metabolic pathways in T-cells', subStatus: 'Pending Reviewer(s) Invitation', reviewers: '0 / 10', comments: 0, revision: 'R0', status: 'Reviewer(s) Check', stage: 'In Process' },
  { id: 'MS-2026-0087', journal: 'Science', title: 'Deep learning for protein folding', subStatus: 'Pending Reviewer(s) Acceptance', reviewers: '0 / 10', comments: 0, revision: 'R1', status: 'Reviewer(s) Check', stage: 'In Process' },
  { id: 'MS-2026-0088', journal: 'Lancet', title: 'Long COVID epidemiological study', subStatus: 'Pending Reviewer(s) Check', reviewers: '5 / 20', comments: 3, revision: 'R1', status: 'Reviewer(s) Check', stage: 'In Process' },
  { id: 'MS-2026-0072', journal: 'JAMA', title: 'AI in diagnostic radiology', subStatus: 'Pending Editor Decision', reviewers: '5 / 20', comments: 3, revision: 'R1', status: 'Editor Decision', stage: 'In Process' },
  { id: 'MS-2026-0059', journal: 'Nature', title: 'Author revision on deep learning', subStatus: 'Send Back to Author(s)', reviewers: '5 / 20', comments: '3 / 5', revision: 'R1', status: 'Author(s) Revise', stage: 'In Process', unreadComments: 1, unreadType: '编辑部消息' },
  { id: 'MS-2026-0058', journal: 'Lancet', title: 'New treatment for XYZ', subStatus: 'Pending Editor Decision', reviewers: '5 / 20', comments: 3, revision: 'R2', status: 'ME Pre-Acceptance', stage: 'In Process' },

  // 归档 (Archiving)
  { id: 'MS-2025-1102', journal: 'Science', title: 'Graphene superconductors at room temp', subStatus: 'Accept', reviewers: '3 / 3', comments: 3, revision: 'R3', status: 'Accept', stage: '归档' },
  { id: 'MS-2025-1088', journal: 'Nature', title: 'Deep learning for protein folding', subStatus: 'Reject', reviewers: '2 / 2', comments: 2, revision: 'R0', status: 'Reject', stage: '归档' },
  { id: 'MS-2025-1045', journal: 'Cell', title: 'Microbiome influence on cognitive decline', subStatus: 'Retraction', reviewers: '1 / 3', comments: 0, revision: 'R1', status: 'Retraction', stage: '归档' },
  { id: 'MS-2025-0991', journal: 'Lancet', title: 'Global burden of cardiovascular diseases', subStatus: 'Accept', reviewers: '4 / 4', comments: 5, revision: 'R2', status: 'Accept', stage: '归档' },

  // 后处理 (Post-Publication)
  { id: 'MS-2024-0120', journal: 'Lancet', title: 'Adverse effects reports on new drug', subStatus: 'Corrected', reviewers: '5 / 20', comments: 3, revision: 'R0', status: 'Accept', stage: '后处理' },
  { id: 'MS-2024-0345', journal: 'Nature', title: 'Correction on CRISPR data', subStatus: 'Retraction', reviewers: '5 / 20', comments: '3 / 5', revision: 'R0', status: 'Accept', stage: '后处理', unreadComments: 1, unreadType: '编辑部消息' }
];

const reMockData: Manuscript[] = [
  // In Process (Peer Review)
  { id: 'REV-2026-0085', journal: 'Cell', title: 'Novel metabolic pathways in T-cells', subStatus: '', reviewers: '', comments: 0, revision: 'R1', status: 'Pending Peer Review', stage: 'In Process', reInvitationStatus: 'Pending' },
  { id: 'REV-2026-0086', journal: 'Nature', title: 'Climate change impact on marine biodiversity', subStatus: '', reviewers: '', comments: 0, revision: 'R1', status: 'Pending Peer Review', stage: 'In Process', reInvitationStatus: 'Accepted' },
  { id: 'REV-2026-0087', journal: 'Science', title: 'Deep learning for protein folding', subStatus: '', reviewers: '', comments: 0, revision: 'R1', status: 'Pending Peer Review', stage: 'In Process', reInvitationStatus: 'Pending' },
  { id: 'REV-2026-0088', journal: 'Lancet', title: 'Long COVID epidemiological study', subStatus: '', reviewers: '', comments: 0, revision: 'R1', status: 'Pending Peer Review', stage: 'In Process', reInvitationStatus: 'Accepted' },

  // 归档 (Archiving)
  { id: 'REV-2025-1102', journal: 'Science', title: 'Graphene superconductors at room temp', subStatus: '', reviewers: '', comments: 0, revision: 'R3', status: 'Done', stage: '归档', reInvitationStatus: 'Accepted' },
  { id: 'REV-2025-1088', journal: 'Nature', title: 'Deep learning for protein folding', subStatus: '', reviewers: '', comments: 0, revision: 'R0', status: 'Declined', stage: '归档', reInvitationStatus: 'Accepted' },
  { id: 'REV-2025-1050', journal: 'Cell', title: 'Expired review invitation test', subStatus: '', reviewers: '', comments: 0, revision: 'R1', status: 'Expired', stage: '归档', reInvitationStatus: 'Accepted' },
];

const meTabs: { name: Stage; count: number }[] = [
  { name: '初审', count: 12 },
  { name: 'In Process', count: 45 },
  { name: '归档', count: 128 },
  { name: '后处理', count: 3 },
];

const reTabs: { name: Stage; count: number }[] = [
  { name: 'In Process', count: 8 },
  { name: '归档', count: 2 },
];

const auTabs: { name: Stage; count: number }[] = [
  { name: '初审', count: 12 },
  { name: 'In Process', count: 45 },
  { name: '归档', count: 128 },
];

const eicMockData: Manuscript[] = [
  // 初审 (Primary Review) - EIC View Specific
  { id: 'MS-2026-0101', journal: 'Nature', title: 'Quantum Computing Advancements in AGI', subStatus: 'Pending ME Initial Check', reviewers: '- / -', comments: 0, revision: 'R0', status: 'ME Initial Check', stage: '初审' },
  { id: 'MS-2026-0103', journal: 'Cell', title: 'Epigenetic clocks and longevity', subStatus: 'Pending AE Acceptance', reviewers: '- / -', comments: 0, revision: 'R0', status: 'ME Initial Check', stage: '初审' },
  
  { id: 'MS-2026-0105', journal: 'JAMA', title: 'AI in diagnostic radiology', subStatus: 'Pending EIC Acceptance', reviewers: '- / -', comments: 0, revision: 'R0', status: 'EIC Initial Check', stage: '初审', unreadComments: 1, unreadType: 'ME消息' },
  { id: 'MS-2026-0108', journal: 'BMJ', title: 'Healthcare policy impact on regional mortality', subStatus: 'Pending EIC Initial Check', reviewers: '- / -', comments: 0, revision: 'R0', status: 'EIC Initial Check', stage: '初审' },
  { id: 'MS-2026-0106', journal: 'Nature Medicine', title: 'mRNA vaccine efficacy across variants', subStatus: 'Pending ME Initial Check', reviewers: '- / -', comments: 0, revision: 'R0', status: 'EIC Initial Check', stage: '初审' },
  { id: 'MS-2026-0107', journal: 'Cell Reports', title: 'Novel metabolic pathways in T-cells', subStatus: 'Pending AE Acceptance', reviewers: '- / -', comments: 0, revision: 'R0', status: 'EIC Initial Check', stage: '初审' },
  
  { id: 'MS-2026-0109', journal: 'Nature', title: 'Climate change impact on marine biodiversity', subStatus: 'Pending AE Initial Check', reviewers: '- / -', comments: 0, revision: 'R0', status: 'AE Initial Check', stage: '初审' },
  { id: 'MS-2026-0110', journal: 'Cell', title: 'Microbiome influence on cognitive decline', subStatus: 'Pending ME Initial Check', reviewers: '- / -', comments: 0, revision: 'R0', status: 'AE Initial Check', stage: '初审' },
  
  { id: 'MS-2026-0111', journal: 'Science', title: 'Graphene superconductors at room temp', subStatus: 'Send Back to Author(s)', reviewers: '- / -', comments: 1, revision: 'R1', status: 'Author(s) Revise', stage: '初审' },

  // In Process (Peer Review) - EIC View Specific
  { id: 'MS-2026-0085', journal: 'Cell', title: 'Novel metabolic pathways in T-cells', subStatus: 'Pending Reviewer(s) Invitation', reviewers: '0 / 10', comments: '0 / 0', revision: 'R0', status: 'Reviewer(s) Check', stage: 'In Process' },
  { id: 'MS-2026-0087', journal: 'Science', title: 'Deep learning for protein folding', subStatus: 'Pending Reviewer(s) Acceptance', reviewers: '0 / 10', comments: '0 / 0', revision: 'R1', status: 'Reviewer(s) Check', stage: 'In Process' },
  { id: 'MS-2026-0088', journal: 'Lancet', title: 'Long COVID epidemiological study', subStatus: 'Pending Reviewer(s) Check', reviewers: '1 / 10', comments: '1 / 3', revision: 'R1', status: 'Reviewer(s) Check', stage: 'In Process' },
  { id: 'MS-2026-0072', journal: 'JAMA', title: 'AI in diagnostic radiology', subStatus: 'Pending AE Acceptance', reviewers: '5 / 20', comments: '3 / 5', revision: 'R1', status: 'Reviewer(s) Check', stage: 'In Process' },
  
  { id: 'MS-2026-0073', journal: 'Nature Medicine', title: 'mRNA vaccine efficacy across variants', subStatus: 'Pending AE Recommendation', reviewers: '5 / 20', comments: '3 / 5', revision: 'R0', status: 'AE Recommendation', stage: 'In Process' },
  { id: 'MS-2026-0069', journal: 'Nature', title: 'Climate change models on biodiversity', subStatus: 'Pending ME Decision', reviewers: '5 / 20', comments: '3 / 5', revision: 'R1', status: 'AE Recommendation', stage: 'In Process' },
  
  { id: 'MS-2026-0064', journal: 'Cell', title: 'Microbiome influence on cognitive decline', subStatus: 'Pending ME Decision', reviewers: '5 / 20', comments: '3 / 5', revision: 'R1', status: 'ME Decision', stage: 'In Process' },
  { id: 'MS-2026-0065', journal: 'Science', title: 'Graphene superconductors at room temp', subStatus: 'Pending AE Acceptance', reviewers: '5 / 20', comments: '3 / 5', revision: 'R2', status: 'ME Decision', stage: 'In Process' },
  
  { id: 'MS-2026-0060', journal: 'Nature', title: 'Quantum error correction protocols', subStatus: 'Pending EIC Decision', reviewers: '5 / 20', comments: '3 / 5', revision: 'R1', status: 'EIC Decision', stage: 'In Process', unreadComments: 1, unreadType: 'ME消息' },
  { id: 'MS-2026-0061', journal: 'Science', title: 'Dark matter detection algorithms', subStatus: 'Pending ME Decision', reviewers: '5 / 20', comments: '3 / 5', revision: 'R2', status: 'EIC Decision', stage: 'In Process' },
  { id: 'MS-2026-0062', journal: 'Cell', title: 'CRISPR base editing in vivo', subStatus: 'Pending AE Acceptance', reviewers: '5 / 20', comments: '3 / 5', revision: 'R2', status: 'EIC Decision', stage: 'In Process' },
  
  { id: 'MS-2026-0059', journal: 'JAMA', title: 'Author revision on deep learning', subStatus: 'Send Back to Author(s)', reviewers: '5 / 20', comments: '3 / 5', revision: 'R1', status: 'Author(s) Revise', stage: 'In Process' },
  { id: 'MS-2026-0058', journal: 'Lancet', title: 'New treatment for XYZ', subStatus: 'Pending ME Decision', reviewers: '5 / 20', comments: '3 / 5', revision: 'R2', status: 'ME Pre-Acceptance', stage: 'In Process' },

  // Other stages copied from ME for fallback
  ...meMockData.filter(item => item.stage !== '初审' && item.stage !== 'In Process')
];
const aeMockData: Manuscript[] = [
  // 初审 (Primary Review) - AE View Specific
  // ME Initial Check
  { id: 'MS-2026-0201', journal: 'Nature', title: 'Quantum Computing Advancements in AGI', subStatus: 'Pending ME Initial Check', reviewers: '- / -', comments: 0, revision: 'R0', status: 'ME Initial Check', stage: '初审' },
  { id: 'MS-2026-0202', journal: 'Cell', title: 'Epigenetic clocks and longevity', subStatus: 'Pending AE Acceptance', reviewers: '- / -', comments: 0, revision: 'R0', status: 'ME Initial Check', stage: '初审', unreadComments: 1, unreadType: 'ME消息' },
  
  // EIC Initial Check
  { id: 'MS-2026-0203', journal: 'JAMA', title: 'AI in diagnostic radiology', subStatus: 'Pending AE Acceptance', reviewers: '- / -', comments: 0, revision: 'R0', status: 'EIC Initial Check', stage: '初审', unreadComments: 1, unreadType: 'EIC消息' },
  
  // AE Initial Check
  { id: 'MS-2026-0204', journal: 'Nature', title: 'Climate change impact on marine biodiversity', subStatus: 'Pending AE Initial Check', reviewers: '- / -', comments: 0, revision: 'R0', status: 'AE Initial Check', stage: '初审' },
  { id: 'MS-2026-0205', journal: 'Cell', title: 'Microbiome influence on cognitive decline', subStatus: 'Pending ME Initial Check', reviewers: '- / -', comments: 0, revision: 'R0', status: 'AE Initial Check', stage: '初审' },
  
  // Author(s) Revise
  { id: 'MS-2026-0206', journal: 'Science', title: 'Graphene superconductors at room temp', subStatus: 'Send Back to Author(s)', reviewers: '- / -', comments: 1, revision: 'R1', status: 'Author(s) Revise', stage: '初审' },

  // In Process (Peer Review) - AE View Specific
  // Reviewer(s) Check
  { id: 'MS-2026-0211', journal: 'Nature', title: 'Quantum Computing Peer Review', subStatus: 'Pending Reviewer(s) Invitation', reviewers: '0 / 10', comments: '0 / 0', revision: 'R0', status: 'Reviewer(s) Check', stage: 'In Process' },
  { id: 'MS-2026-0212', journal: 'Cell', title: 'Epigenetic clocks check', subStatus: 'Pending Reviewer(s) Acceptance', reviewers: '0 / 10', comments: '0 / 0', revision: 'R0', status: 'Reviewer(s) Check', stage: 'In Process' },
  { id: 'MS-2026-0213', journal: 'Nature Medicine', title: 'mRNA vaccines check', subStatus: 'Pending Reviewer(s) Check', reviewers: '2 / 10', comments: '1 / 2', revision: 'R0', status: 'Reviewer(s) Check', stage: 'In Process' },
  { id: 'MS-2026-0214', journal: 'JAMA', title: 'AI radiology check', subStatus: 'Pending AE Acceptance', reviewers: '5 / 10', comments: '2 / 5', revision: 'R0', status: 'Reviewer(s) Check', stage: 'In Process', unreadComments: 3, unreadType: 'RE消息' },

  // AE Recommendation
  { id: 'MS-2026-0215', journal: 'Science', title: 'Deep learning protein recommendation', subStatus: 'Pending AE Recommendation', reviewers: '5 / 10', comments: '5 / 5', revision: 'R0', status: 'AE Recommendation', stage: 'In Process' },
  { id: 'MS-2026-0216', journal: 'Lancet', title: 'Long COVID recommendation', subStatus: 'Pending ME Decision', reviewers: '5 / 10', comments: '5 / 5', revision: 'R0', status: 'AE Recommendation', stage: 'In Process' },

  // ME Decision
  { id: 'MS-2026-0217', journal: 'Cell Reports', title: 'Metabolic pathways decision', subStatus: 'Pending ME Decision', reviewers: '5 / 10', comments: '5 / 5', revision: 'R0', status: 'ME Decision', stage: 'In Process' },
  { id: 'MS-2026-0218', journal: 'Nature', title: 'Climate models decision', subStatus: 'Pending AE Acceptance', reviewers: '5 / 10', comments: '5 / 5', revision: 'R0', status: 'ME Decision', stage: 'In Process', unreadComments: 1, unreadType: 'ME消息' },

  // EIC Decision
  { id: 'MS-2026-0219', journal: 'BMJ', title: 'Mortality impact decision', subStatus: 'Pending EIC Decision', reviewers: '5 / 10', comments: '5 / 5', revision: 'R0', status: 'EIC Decision', stage: 'In Process' },
  { id: 'MS-2026-0220', journal: 'Science', title: 'Dark matter decision', subStatus: 'Pending ME Decision', reviewers: '5 / 10', comments: '5 / 5', revision: 'R0', status: 'EIC Decision', stage: 'In Process' },
  { id: 'MS-2026-0221', journal: 'Cell', title: 'CRISPR base editing acceptance', subStatus: 'Pending AE Acceptance', reviewers: '5 / 10', comments: '5 / 5', revision: 'R0', status: 'EIC Decision', stage: 'In Process', unreadComments: 1, unreadType: 'EIC消息' },

  // Author(s) Revise and ME Pre-Acceptance
  { id: 'MS-2026-0222', journal: 'Lancet', title: 'New treatment revise', subStatus: 'Send Back to Author(s)', reviewers: '5 / 10', comments: '3 / 5', revision: 'R1', status: 'Author(s) Revise', stage: 'In Process' },
  { id: 'MS-2026-0223', journal: 'Nature Medicine', title: 'Vaccine pre-acceptance', subStatus: 'Pending ME Decision', reviewers: '5 / 10', comments: '5 / 5', revision: 'R1', status: 'ME Pre-Acceptance', stage: 'In Process' },

  // Other stages copied from ME for fallback
  ...meMockData.filter(item => item.stage !== '初审' && item.stage !== 'In Process')
];

const eicTabs: { name: Stage; count: number }[] = JSON.parse(JSON.stringify(meTabs));
const aeTabs: { name: Stage; count: number }[] = JSON.parse(JSON.stringify(meTabs));

export default function App() {
  const [roleView, setRoleView] = useState<RoleView>('ME');
  const [activeTab, setActiveTab] = useState<Stage>('初审');
  const [activeSubTab, setActiveSubTab] = useState<'ALL' | 'TO DO' | 'WAITING'>('ALL');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [subStatusFilter, setSubStatusFilter] = useState<string | null>(null);
  const [openFilter, setOpenFilter] = useState<'status' | 'subStatus' | null>(null);
  const [showSimpleList, setShowSimpleList] = useState<boolean>(true);
  const [simpleListPage, setSimpleListPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'LIST' | 'DETAIL'>('LIST');

  const handleRoleChange = (role: RoleView) => {
    setRoleView(role);
    setStatusFilter(null);
    setSubStatusFilter(null);
    setActiveSubTab('ALL');
    if (role !== 'LIST') {
      setShowSimpleList(false);
    }
    if (role === 'RE' && (activeTab === '初审' || activeTab === '后处理')) {
      setActiveTab('In Process');
    }
  };

  const handleTabChange = (tab: Stage) => {
    setActiveTab(tab);
    setStatusFilter(null);
    setSubStatusFilter(null);
    setActiveSubTab('ALL');
    setSimpleListPage(1);
  };

  const currentTabs = roleView === 'ME' ? meTabs : roleView === 'EIC' ? eicTabs : roleView === 'AE' ? aeTabs : roleView === 'RE' ? reTabs : auTabs;
  const currentMockData = roleView === 'ME' ? meMockData : roleView === 'EIC' ? eicMockData : roleView === 'AE' ? aeMockData : roleView === 'RE' ? reMockData : auMockData;
  let baseFilteredData = currentMockData.filter((item) => item.stage === activeTab);

  // Sub-tab logic for ME
  const isTodo = (item: Manuscript, role?: RoleView) => {
    const s = item.subStatus.toLowerCase();
    const currentRole = role || roleView;
    const effectiveRole = currentRole === 'LIST' ? 'ME' : currentRole;

    if (effectiveRole === 'ME') {
      return (
        s === 'pending me acceptance' ||
        s === 'pending me initial check' ||
        s === 'pending reviewer(s) invitation' ||
        s === 'pending me decision'
      );
    }
    if (effectiveRole === 'EIC') {
      if (item.stage === '初审') {
        return s === 'pending eic acceptance' || s === 'pending eic initial check';
      }
      if (item.stage === 'In Process') {
        return s === 'pending eic decision';
      }
    }
    if (effectiveRole === 'AE') {
      if (item.stage === '初审') {
        return s === 'pending ae acceptance' || s === 'pending ae initial check';
      }
      if (item.stage === 'In Process') {
        return (
          s === 'pending ae acceptance' ||
          s === 'pending reviewer(s) invitation' ||
          s === 'pending ae recommendation'
        );
      }
    }
    if (effectiveRole === 'RE') {
      if (item.stage === 'In Process') {
        return item.reInvitationStatus === 'Pending' || item.reInvitationStatus === 'Accepted';
      }
    }
    return false;
  };

  if (['ME', 'EIC', 'AE'].includes(roleView)) {
    baseFilteredData = baseFilteredData.filter(item => {
      if (activeSubTab === 'ALL') return true;
      if (activeSubTab === 'TO DO') return isTodo(item);
      return !isTodo(item);
    });
  }

  const availableStatusOptions = Array.from(new Set(
    baseFilteredData
      .filter(item => !subStatusFilter || item.subStatus === subStatusFilter)
      .map(item => item.status)
  ));

  const availableSubStatusOptions = Array.from(new Set(
    baseFilteredData
      .filter(item => !statusFilter || item.status === statusFilter)
      .map(item => item.subStatus)
  ));

  let filteredData = baseFilteredData;
  if (statusFilter) filteredData = filteredData.filter(item => item.status === statusFilter);
  if (subStatusFilter) filteredData = filteredData.filter(item => item.subStatus === subStatusFilter);

  if (viewMode === 'DETAIL') {
    return <ManuscriptDetail onBack={() => setViewMode('LIST')} />;
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-['Helvetica_Neue',_Helvetica,_Arial,_sans-serif] flex flex-col">
      {openFilter && (
        <div className="fixed inset-0 z-10" onClick={() => setOpenFilter(null)}></div>
      )}
      {/* Header */}
      <header className="bg-white h-16 border-b border-[#e2e8f0] px-8 flex items-center shrink-0">
        <div className="flex items-center mr-12">
          <h1 className="text-[18px] font-bold text-[#1e293b] tracking-tight">
            {roleView}页面
          </h1>
        </div>

        {/* Tabs moved to header to match target layout for tabs */}
        <nav className="flex h-full gap-8">
          {currentTabs.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => handleTabChange(tab.name)}
                className={`flex items-center h-full text-[15px] transition-colors border-b-2 ${
                  isActive
                    ? 'border-[#2563eb] text-[#2563eb] font-semibold'
                    : 'border-transparent text-[#64748b] hover:text-[#1e293b]'
                }`}
              >
                {tab.name}
                <span
                  className={`ml-1.5 px-2 py-0.5 rounded-full text-[12px] font-normal ${
                    isActive ? 'bg-[#e2e8f0] text-[#475569]' : 'bg-[#f1f5f9] text-[#64748b]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <div className="bg-[#f1f5f9] p-1 rounded-md flex">
            <button 
              onClick={() => handleRoleChange('ME')}
              className={`px-3 py-1 text-[13px] rounded-sm font-medium transition-colors ${roleView === 'ME' ? 'bg-white shadow-sm text-[#1e293b]' : 'text-[#64748b] hover:text-[#1e293b]'}`}
            >
              ME视角
            </button>
            <button 
              onClick={() => handleRoleChange('EIC')}
              className={`px-3 py-1 text-[13px] rounded-sm font-medium transition-colors ${roleView === 'EIC' ? 'bg-white shadow-sm text-[#1e293b]' : 'text-[#64748b] hover:text-[#1e293b]'}`}
            >
              EIC视角
            </button>
            <button 
              onClick={() => handleRoleChange('AE')}
              className={`px-3 py-1 text-[13px] rounded-sm font-medium transition-colors ${roleView === 'AE' ? 'bg-white shadow-sm text-[#1e293b]' : 'text-[#64748b] hover:text-[#1e293b]'}`}
            >
              AE视角
            </button>
            <button 
              onClick={() => handleRoleChange('RE')}
              className={`px-3 py-1 text-[13px] rounded-sm font-medium transition-colors ${roleView === 'RE' ? 'bg-white shadow-sm text-[#1e293b]' : 'text-[#64748b] hover:text-[#1e293b]'}`}
            >
              RE视角
            </button>
            <button 
              onClick={() => handleRoleChange('AU')}
              className={`px-3 py-1 text-[13px] rounded-sm font-medium transition-colors ${roleView === 'AU' ? 'bg-white shadow-sm text-[#1e293b]' : 'text-[#64748b] hover:text-[#1e293b]'}`}
            >
              AU视角
            </button>
            <button 
              onClick={() => handleRoleChange('LIST')}
              className={`px-3 py-1 text-[13px] rounded-sm font-medium transition-colors ${roleView === 'LIST' ? 'bg-white shadow-sm text-[#1e293b]' : 'text-[#64748b] hover:text-[#1e293b]'}`}
            >
              List视角
            </button>
          </div>
          <button
            onClick={() => {
              if (showSimpleList) {
                setShowSimpleList(false);
                setRoleView('ME');
              } else {
                setShowSimpleList(true);
                setRoleView('LIST');
                setSimpleListPage(1);
              }
            }}
            className={`ml-2 px-3 py-1.5 rounded-lg text-[14px] font-bold transition-all flex items-center gap-1.5 ${
              showSimpleList
                ? 'bg-[#fef3c7] text-[#92400e] border border-[#fcd34d] hover:bg-[#fde68a]'
                : 'bg-[#f1f5f9] text-[#64748b] border border-[#e2e8f0] hover:bg-[#e2e8f0]'
            }`}
            title={showSimpleList ? '切换到专业视图' : '切换到简易视图'}
          >
            {showSimpleList ? <EyeOff size={16} /> : <Eye size={16} />}
            {showSimpleList ? '简易模式' : '专业模式'}
          </button>
          <button
            onClick={() => {
              setRoleView('ME');
              setViewMode('DETAIL');
            }}
            className="ml-2 px-3 py-1.5 rounded-lg text-[14px] font-bold transition-all flex items-center gap-1.5 bg-[#eff6ff] text-[#1e40af] border border-[#bfdbfe] hover:bg-[#dbeafe]"
          >
            <FileCheck size={16} />
            详情页示例 (ME待办)
          </button>
          <div className="w-8 h-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[12px] font-bold ml-2">
            JD
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col max-w-full w-full mx-auto">
        {roleView === 'LIST' ? (
          showSimpleList ? (
            /* ========== 简易模式：爷爷奶奶友好版 ========== */
             (() => {
               const ITEMS_PER_PAGE = 5;
               const simpleData = meMockData.filter(m => m.stage === activeTab);
               const totalPages = Math.max(1, Math.ceil(simpleData.length / ITEMS_PER_PAGE));
               const currentPage = Math.min(simpleListPage, totalPages);
               const pagedData = simpleData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
               const totalTodo = simpleData.filter(m => isTodo(m, 'ME')).length;

               const getSimpleStatus = (item: Manuscript) => {
                 const s = item.subStatus.toLowerCase();
                 const st = item.status;
                 if (s.includes('send back') || s.includes('返修') || st.includes('Author')) {
                   return { label: '需要你修改', color: 'bg-[#fff7ed] border-[#fdba74] text-[#c2410c]', icon: <AlertCircle size={20} className="text-[#ea580c]" /> };
                 }
                 if (st.includes('Accept') || s.includes('接收') || s.includes('出版')) {
                   return { label: '已通过', color: 'bg-[#f0fdf4] border-[#86efac] text-[#166534]', icon: <FileCheck size={20} className="text-[#16a34a]" /> };
                 }
                 if (st.includes('Reject') || s.includes('拒稿') || s.includes('撤稿') || st.includes('Retraction')) {
                   return { label: '未通过', color: 'bg-[#f9fafb] border-[#d1d5db] text-[#6b7280]', icon: <AlertCircle size={20} className="text-[#9ca3af]" /> };
                 }
                 if (s.includes('pending') || st.includes('Check') || st.includes('Decision') || st.includes('Recommendation')) {
                   return { label: '等待处理', color: 'bg-[#fffbeb] border-[#fcd34d] text-[#92400e]', icon: <Clock size={20} className="text-[#d97706]" /> };
                 }
                 return { label: '进行中', color: 'bg-[#eff6ff] border-[#93c5fd] text-[#1e40af]', icon: <Clock size={20} className="text-[#3b82f6]" /> };
               };

               const stageLabels: Record<Stage, string> = {
                 '初审': '正在初步审查中',
                 'In Process': '专家正在评审',
                 '归档': '流程已结束',
                 '后处理': '出版后续处理',
               };

               return (
                 <div className="space-y-6">
                   {/* ===== 顶部问候和摘要 ===== */}
                   <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
                     <div className="flex items-center gap-4 flex-wrap">
                       <div className="w-14 h-14 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[22px] font-bold shrink-0">
                         👋
                       </div>
                       <div className="flex-1 min-w-0">
                         <h2 className="text-[22px] font-bold text-[#1e293b] leading-tight">
                           你好！你有 <span className="text-[#dc2626]">{totalTodo}</span> 篇稿件需要处理
                         </h2>
                         <p className="text-[#64748b] text-[16px] mt-1">
                           当前阶段：{activeTab} · 共 {simpleData.length} 篇
                         </p>
                       </div>
                       <button
                         onClick={() => { setShowSimpleList(false); setRoleView('ME'); }}
                         className="px-4 py-2.5 bg-white border-2 border-[#e2e8f0] rounded-xl text-[14px] font-medium text-[#64748b] hover:border-[#94a3b8] hover:text-[#475569] transition-all flex items-center gap-2"
                       >
                         <Eye size={16} />
                         切换到专业视图
                       </button>
                     </div>
                   </div>

                   {/* ===== 阶段标签（大号） ===== */}
                   <div className="flex gap-3 flex-wrap">
                     {(['初审', 'In Process', '归档', '后处理'] as Stage[]).map(stage => {
                       const count = meMockData.filter(m => m.stage === stage).length;
                       const isActive = activeTab === stage;
                       const todoCount = meMockData.filter(m => m.stage === stage && isTodo(m, 'ME')).length;
                       return (
                         <button
                           key={stage}
                           onClick={() => handleTabChange(stage)}
                           className={`px-5 py-3 rounded-xl text-[16px] font-bold transition-all flex items-center gap-3 ${
                             isActive
                               ? 'bg-[#2563eb] text-white shadow-lg shadow-[#2563eb]/25 scale-105'
                               : 'bg-white border-2 border-[#e2e8f0] text-[#475569] hover:border-[#94a3b8] hover:scale-102'
                           }`}
                         >
                           {stage}
                           <span className={`px-2.5 py-1 rounded-full text-[14px] font-semibold ${
                             isActive ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'
                           }`}>
                             {count}
                           </span>
                           {todoCount > 0 && (
                             <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] animate-pulse" title={`${todoCount}篇待办`} />
                           )}
                         </button>
                       );
                     })}
                   </div>

                   {/* ===== 阶段说明 ===== */}
                   <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl px-5 py-3">
                     <p className="text-[15px] text-[#0369a1]">
                       📌 {stageLabels[activeTab]}
                     </p>
                   </div>

                   {/* ===== 稿件卡片列表 ===== */}
                   <div className="space-y-4">
                     {pagedData.length === 0 ? (
                       <div className="bg-white border border-[#e2e8f0] rounded-2xl p-12 text-center">
                         <div className="text-[64px] mb-4">📭</div>
                         <p className="text-[18px] font-bold text-[#475569]">这里没有稿件</p>
                         <p className="text-[15px] text-[#94a3b8] mt-1">当前阶段没有需要你查看的稿件</p>
                       </div>
                     ) : (
                       pagedData.map((item) => {
                         const st = getSimpleStatus(item);
                         const highlight = st.label === '需要你修改' || st.label === '等待处理';
                         return (
                           <div
                             key={item.id}
                             className={`bg-white border-2 rounded-2xl p-5 transition-all hover:shadow-md group ${
                               highlight ? 'border-[#fcd34d] shadow-[0_0_0_4px_rgba(251,191,36,0.1)]' : 'border-[#e2e8f0]'
                             }`}
                           >
                             <div className="flex items-start gap-4">
                               {/* 左侧状态图标 */}
                               <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${st.color.split(' ')[0]} border-2 ${st.color.split(' ')[1] || 'border-transparent'}`}>
                                 {st.icon}
                               </div>

                               {/* 中间内容 */}
                               <div className="flex-1 min-w-0">
                                 <h3 className="text-[18px] font-bold text-[#1e293b] leading-snug line-clamp-2">
                                   {item.title}
                                 </h3>
                                 <div className="flex items-center gap-3 mt-2 flex-wrap">
                                   <span className="text-[14px] text-[#64748b]">{item.journal}</span>
                                   <span className="text-[14px] text-[#94a3b8]">{item.id}</span>
                                   {item.unreadComments && item.unreadComments > 0 && (
                                     <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#fef2f2] text-[#dc2626] text-[13px] font-bold">
                                       <Bell size={14} />
                                       {item.unreadComments}条新消息
                                     </span>
                                   )}
                                 </div>
                                 {/* 大白话状态 */}
                                 <div className={`mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[15px] font-bold border ${st.color.split(' ')[1] || 'border-[#e2e8f0]'} ${st.color.split(' ')[0]} ${st.color.split('text-')[1] ? 'text-' + st.color.split('text-')[1] : ''}`}>
                                   {st.icon}
                                   <span>{st.label}</span>
                                 </div>
                               </div>

                               {/* 右侧操作按钮 */}
                               <div className="flex flex-col items-end gap-2 shrink-0">
                                 <button 
                                   onClick={() => setViewMode('DETAIL')}
                                   className="px-5 py-3 bg-[#2563eb] text-white rounded-xl text-[15px] font-bold hover:bg-[#1d4ed8] transition-colors shadow-sm flex items-center gap-2 min-w-[120px] justify-center"
                                 >
                                   查看详情
                                   <ArrowRight size={18} />
                                 </button>
                                 <span className="text-[13px] text-[#94a3b8]">{item.revision}</span>
                               </div>
                             </div>
                           </div>
                         );
                       })
                     )}
                   </div>

                   {/* ===== 分页 ===== */}
                   {simpleData.length > ITEMS_PER_PAGE && (
                     <div className="flex items-center justify-center gap-4 pt-2">
                       <button
                         onClick={() => setSimpleListPage(p => Math.max(1, p - 1))}
                         disabled={currentPage <= 1}
                         className="px-5 py-3 rounded-xl border-2 border-[#e2e8f0] bg-white text-[16px] font-bold text-[#475569] hover:bg-[#f8fafc] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                       >
                         <ChevronLeft size={20} />
                         上一页
                       </button>
                       <span className="text-[16px] font-semibold text-[#64748b] px-4">
                         第 {currentPage} / {totalPages} 页
                       </span>
                       <button
                         onClick={() => setSimpleListPage(p => Math.min(totalPages, p + 1))}
                         disabled={currentPage >= totalPages}
                         className="px-5 py-3 rounded-xl border-2 border-[#e2e8f0] bg-white text-[16px] font-bold text-[#475569] hover:bg-[#f8fafc] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                       >
                         下一页
                         <ChevronRight size={20} />
                       </button>
                     </div>
                   )}

                   {/* ===== 底部提示 ===== */}
                   <div className="text-center text-[14px] text-[#94a3b8] pt-2">
                     有疑问？请联系编辑部获取帮助
                   </div>
                 </div>
               );
             })()
          ) : (
            /* ========== 专业模式：原工作流仪表盘 ========== */
            <div className="space-y-6">
            {/* Top Stage Summary Bar */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
              {(['初审', 'In Process', '归档'] as Stage[]).map(stage => {
                const stageData = meMockData.filter(m => m.stage === stage);
                const todoCount = stageData.filter(m => isTodo(m, 'ME')).length;
                return (
                  <div key={stage} className="bg-white border border-[#e2e8f0] px-4 py-3 rounded-lg flex items-center gap-4 shadow-sm min-w-[200px]">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] ${todoCount > 0 ? 'bg-[#fee2e2] text-[#ef4444]' : 'bg-[#f1f5f9] text-[#64748b]'}`}>
                      {stage.substring(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1e293b] text-[14px]">{stage}</h4>
                      <p className="text-[#64748b] text-[12px] flex items-center gap-2">
                        <span>共 {stageData.length}</span>
                        {todoCount > 0 && <span className="text-[#ef4444] font-bold">({todoCount} 待办)</span>}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Workflow Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {(['初审', 'In Process', '归档'] as Stage[]).map((stage) => {
                const stageData = meMockData.filter(m => m.stage === stage);
                const statuses = Array.from(new Set(stageData.map(m => m.status)));
                
                return (
                  <div key={stage} className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <h3 className="text-[16px] font-bold text-[#334155] border-l-4 border-[#2563eb] pl-3 leading-tight">{stage}</h3>
                      <span className="text-[11px] text-[#94a3b8] font-medium uppercase tracking-wider">Step by Step</span>
                    </div>
                    
                    <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-sm">
                      <div className="divide-y divide-[#f1f5f9]">
                        {statuses.map((status, idx) => {
                          const statusItems = stageData.filter(m => m.status === status);
                          const todoCount = statusItems.filter(m => isTodo(m, 'ME')).length;
                          const subStatuses = Array.from(new Set(statusItems.map(m => m.subStatus)));

                          return (
                            <div key={status} className="p-3 hover:bg-[#f8fafc] group transition-colors relative">
                              {/* Connector line for sequence feel */}
                              {idx < statuses.length - 1 && (
                                <div className="absolute left-[23px] top-[36px] w-[1px] h-[calc(100%-8px)] bg-[#e2e8f0] z-0"></div>
                              )}
                              
                              <div className="flex gap-3 relative z-10">
                                <div className={`w-[21px] h-[21px] rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 border-2 ${todoCount > 0 ? 'bg-[#ef4444] border-[#ef4444] text-white shadow-[0_0_8px_rgba(239,68,68,0.3)]' : 'bg-white border-[#cbd5e1] text-[#94a3b8]'}`}>
                                  {idx + 1}
                                </div>
                                
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className={`text-[13px] font-bold ${todoCount > 0 ? 'text-[#1e293b]' : 'text-[#64748b]'}`}>
                                      {status}
                                    </span>
                                    <span className="text-[11px] font-semibold text-[#94a3b8]">
                                      {statusItems.length}
                                    </span>
                                  </div>

                                  <div className="flex flex-wrap gap-1.5">
                                    {subStatuses.map(sub => {
                                      const subItems = statusItems.filter(m => m.subStatus === sub);
                                      const isSubTodo = isTodo(subItems[0], 'ME');
                                      return (
                                        <button 
                                          key={sub}
                                          className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                                            isSubTodo 
                                              ? 'bg-[#fee2e2] text-[#b91c1c] border border-[#fecaca] hover:bg-[#fecaca]' 
                                              : 'bg-[#f1f5f9] text-[#64748b] border border-transparent hover:border-[#cbd5e1]'
                                          }`}
                                        >
                                          {sub}
                                          <span className="ml-1 opacity-70">({subItems.length})</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          )
        ) : (
          /* Original Table View */
          <div className="bg-white border text-[#334155] border-[#e2e8f0] rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col flex-1 overflow-hidden">
          
          {/* Sub Tabs for ME, EIC, AE */}
          {['ME', 'EIC', 'AE'].includes(roleView) && (
            <div className="flex border-b border-[#e2e8f0] bg-[#f8fafc] px-4 py-2 gap-4 shrink-0">
              {(['ALL', 'TO DO', 'WAITING'] as const).map((sub) => {
                const isActive = activeSubTab === sub;
                const stageBaseData = currentMockData.filter((item) => item.stage === activeTab);
                let count = 0;
                let label = '';
                
                if (sub === 'ALL') {
                  count = stageBaseData.length;
                  label = 'ALL (全部)';
                } else if (sub === 'TO DO') {
                  count = stageBaseData.filter(m => isTodo(m)).length;
                  label = 'TO DO (待办)';
                } else {
                  count = stageBaseData.length - stageBaseData.filter(m => isTodo(m)).length;
                  label = 'WAITING (等待)';
                }
                
                return (
                  <button
                    key={sub}
                    onClick={() => setActiveSubTab(sub)}
                    className={`flex items-center gap-2 py-1.5 px-3 rounded-md text-[13px] transition-all font-medium ${
                      isActive 
                        ? 'bg-white shadow-sm text-[#2563eb] ring-1 ring-[#e2e8f0]' 
                        : 'text-[#64748b] hover:text-[#1e293b] hover:bg-[#f1f5f9]'
                    }`}
                  >
                    <span>{label}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[11px] ${
                      isActive ? 'bg-[#dbeafe] text-[#2563eb]' : 'bg-[#e2e8f0] text-[#64748b]'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-[13px] whitespace-nowrap border-collapse">
              <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#64748b] text-[13px] font-semibold uppercase tracking-[0.025em]">
                {['ME', 'EIC', 'AE'].includes(roleView) ? (
                  <tr>
                    <th className="px-4 py-3.5 w-[120px]">稿件号</th>
                    <th className="px-4 py-3.5 w-[140px]">期刊</th>
                    <th className="px-4 py-3.5 w-full min-w-[300px]">标题</th>
                    <th className="px-4 py-3.5 w-[140px]">
                      <div className="flex items-center gap-1.5 relative z-20">
                        主状态
                        <div>
                          <button 
                            onClick={() => setOpenFilter(openFilter === 'status' ? null : 'status')}
                            className={`p-1 rounded hover:bg-[#e2e8f0] transition-colors ${statusFilter ? 'text-[#2563eb]' : 'text-[#94a3b8]'}`}
                            title="筛选主状态"
                          >
                            <Filter size={14} />
                          </button>
                          {openFilter === 'status' && (
                            <div className="absolute top-full mt-1 left-0 bg-white border border-[#e2e8f0] shadow-lg rounded-md py-1 z-30 min-w-[200px] font-normal text-[#334155] normal-case tracking-normal">
                              <div
                                className={`px-3 py-1.5 text-[13px] cursor-pointer hover:bg-[#f8fafc] ${!statusFilter ? 'text-[#2563eb] font-medium' : ''}`}
                                onClick={() => { setStatusFilter(null); setOpenFilter(null); }}
                              >
                                全部选项
                              </div>
                              {availableStatusOptions.map(opt => (
                                <div
                                  key={opt}
                                  className={`px-3 py-1.5 text-[13px] cursor-pointer hover:bg-[#f8fafc] flex items-center justify-between gap-2 ${statusFilter === opt ? 'text-[#2563eb] font-medium' : ''}`}
                                  onClick={() => { setStatusFilter(opt); setOpenFilter(null); }}
                                >
                                  {opt}
                                  {statusFilter === opt && <Check size={14} />}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                    {activeTab !== '初审' && activeTab !== '归档' && (
                      <>
                        <th className="px-4 py-3.5 w-[160px]">已接收邀请 / 要求</th>
                        <th className="px-4 py-3.5 w-[160px] text-center">已采纳/总审稿意见</th>
                      </>
                    )}
                    {activeTab !== '归档' && (
                      <th className="px-4 py-3.5 w-[120px] text-center text-[#ef4444]">
                        待办 / 消息
                      </th>
                    )}
                    {activeTab !== '归档' && (
                      <th className="px-4 py-3.5 w-[100px] text-center">修稿轮次</th>
                    )}
                    <th className="px-4 py-3.5 w-[140px]">
                      <div className="flex items-center gap-1.5 relative z-20">
                        子状态
                        <div>
                          <button 
                            onClick={() => setOpenFilter(openFilter === 'subStatus' ? null : 'subStatus')}
                            className={`p-1 rounded hover:bg-[#e2e8f0] transition-colors ${subStatusFilter ? 'text-[#2563eb]' : 'text-[#94a3b8]'}`}
                            title="筛选状态"
                          >
                            <Filter size={14} />
                          </button>
                          {openFilter === 'subStatus' && (
                            <div className="absolute top-full right-0 mt-1 bg-white border border-[#e2e8f0] shadow-lg rounded-md py-1 z-30 min-w-[240px] font-normal text-[#334155] normal-case tracking-normal">
                              <div
                                className={`px-3 py-1.5 text-[13px] cursor-pointer hover:bg-[#f8fafc] ${!subStatusFilter ? 'text-[#2563eb] font-medium' : ''}`}
                                onClick={() => { setSubStatusFilter(null); setOpenFilter(null); }}
                              >
                                全部选项
                              </div>
                              {availableSubStatusOptions.map(opt => (
                                <div
                                  key={opt}
                                  className={`px-3 py-1.5 text-[13px] cursor-pointer hover:bg-[#f8fafc] flex items-center justify-between gap-2 ${subStatusFilter === opt ? 'text-[#2563eb] font-medium' : ''}`}
                                  onClick={() => { setSubStatusFilter(opt); setOpenFilter(null); }}
                                >
                                  {opt}
                                  {subStatusFilter === opt && <Check size={14} />}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                  </tr>
                ) : roleView === 'AU' ? (
                  <tr>
                    <th className="px-4 py-3.5 w-[120px]">稿件号</th>
                    <th className="px-4 py-3.5 w-[140px]">期刊</th>
                    <th className="px-4 py-3.5 w-full min-w-[300px]">标题</th>
                    {activeTab !== '初审' && activeTab !== '归档' && (
                      <th className="px-4 py-3.5 w-[160px]">已接收邀请 / 要求</th>
                    )}
                    {activeTab !== '归档' && (
                      <th className="px-4 py-3.5 w-[120px] text-center text-[#ef4444]">
                        待办 / 消息
                      </th>
                    )}
                    {activeTab !== '归档' && (
                      <th className="px-4 py-3.5 w-[100px] text-center">修稿轮次</th>
                    )}
                    <th className="px-4 py-3.5 w-[140px]">
                      <div className="flex items-center gap-1.5 relative z-20">
                        子状态
                        <div>
                          <button 
                            onClick={() => setOpenFilter(openFilter === 'subStatus' ? null : 'subStatus')}
                            className={`p-1 rounded hover:bg-[#e2e8f0] transition-colors ${subStatusFilter ? 'text-[#2563eb]' : 'text-[#94a3b8]'}`}
                            title="筛选状态"
                          >
                            <Filter size={14} />
                          </button>
                          {openFilter === 'subStatus' && (
                            <div className="absolute top-full right-0 mt-1 bg-white border border-[#e2e8f0] shadow-lg rounded-md py-1 z-30 min-w-[240px] font-normal text-[#334155] normal-case tracking-normal">
                              <div
                                className={`px-3 py-1.5 text-[13px] cursor-pointer hover:bg-[#f8fafc] ${!subStatusFilter ? 'text-[#2563eb] font-medium' : ''}`}
                                onClick={() => { setSubStatusFilter(null); setOpenFilter(null); }}
                              >
                                全部选项
                              </div>
                              {availableSubStatusOptions.map(opt => (
                                <div
                                  key={opt}
                                  className={`px-3 py-1.5 text-[13px] cursor-pointer hover:bg-[#f8fafc] flex items-center justify-between gap-2 ${subStatusFilter === opt ? 'text-[#2563eb] font-medium' : ''}`}
                                  onClick={() => { setSubStatusFilter(opt); setOpenFilter(null); }}
                                >
                                  {opt}
                                  {subStatusFilter === opt && <Check size={14} />}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                  </tr>
                ) : (
                  <tr>
                    <th className="px-4 py-3.5 w-[120px]">稿件号</th>
                    <th className="px-4 py-3.5 w-[140px]">期刊</th>
                    <th className="px-4 py-3.5 w-full min-w-[300px]">标题</th>
                    {activeTab !== '归档' && (
                      <th className="px-4 py-3.5 w-[100px] text-center">修稿轮次</th>
                    )}
                    <th className="px-4 py-3.5 w-[140px]">
                      <div className="flex items-center gap-1.5 relative z-20">
                        子状态
                        <div>
                          <button 
                            onClick={() => setOpenFilter(openFilter === 'status' ? null : 'status')}
                            className={`p-1 rounded hover:bg-[#e2e8f0] transition-colors ${statusFilter ? 'text-[#2563eb]' : 'text-[#94a3b8]'}`}
                            title="筛选状态"
                          >
                            <Filter size={14} />
                          </button>
                          {openFilter === 'status' && (
                            <div className="absolute top-full mt-1 left-0 bg-white border border-[#e2e8f0] shadow-lg rounded-md py-1 z-30 min-w-[200px] font-normal text-[#334155] normal-case tracking-normal">
                              <div
                                className={`px-3 py-1.5 text-[13px] cursor-pointer hover:bg-[#f8fafc] ${!statusFilter ? 'text-[#2563eb] font-medium' : ''}`}
                                onClick={() => { setStatusFilter(null); setOpenFilter(null); }}
                              >
                                全部选项
                              </div>
                              {availableStatusOptions.map(opt => (
                                <div
                                  key={opt}
                                  className={`px-3 py-1.5 text-[13px] cursor-pointer hover:bg-[#f8fafc] flex items-center justify-between gap-2 ${statusFilter === opt ? 'text-[#2563eb] font-medium' : ''}`}
                                  onClick={() => { setStatusFilter(opt); setOpenFilter(null); }}
                                >
                                  {opt}
                                  {statusFilter === opt && <Check size={14} />}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                    <th className="px-4 py-3.5 w-[240px]">审稿任务</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row) => {
                    if (['ME', 'EIC', 'AE'].includes(roleView)) {
                      // Helper for 子状态 (Status), categorized by processing Role or end state
                      const getRoleStatusColor = (status: string) => {
                        const s = status.toUpperCase();
                        if (s.includes('ME ') || s === 'ME' || s === 'ME 预接收') return 'bg-[#f3e8ff] text-[#7e22ce]'; // Purple for ME
                        if (s.includes('EIC ')) return 'bg-[#e0e7ff] text-[#4338ca]'; // Indigo for EIC
                        if (s.includes('AE ')) return 'bg-[#e0f2fe] text-[#0369a1]'; // Sky Blue for AE
                        if (s.includes('RE ')) return 'bg-[#ccfbf1] text-[#0f766e]'; // Teal for RE
                        if (s.includes('AU ') || s.includes('AUTHOR')) return 'bg-[#ffedd5] text-[#c2410c]'; // Orange for AU
                        if (s.includes('ACCEPT')) return 'bg-[#dcfce7] text-[#166534]'; // Green
                        if (s.includes('REJECT') || s.includes('REACTION') || s.includes('RETRACTION')) return 'bg-[#fee2e2] text-[#991b1b]'; // Red
                        if (s.includes('CORRECTION')) return 'bg-[#fef3c7] text-[#d97706]'; // Amber
                        return 'bg-[#e2e8f0] text-[#475569]'; // Default Gray
                      };

                      // Helper for 主状态 (subStatus), using a dot and text to differentiate visually from the solid pills
                      const getSubStatusIndicator = (subStatus: string) => {
                        const s = subStatus.toLowerCase();
                        let dotClass = 'bg-[#94a3b8]'; // Default Gray
                        let textClass = 'text-[#475569]';

                        // ME View logic
                        if (roleView === 'ME') {
                          if (s === 'pending me acceptance') {
                            return (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 bg-[#fef2f2] border border-[#fecaca] px-2 py-0.5 rounded text-[#b91c1c] font-bold text-[10px] animate-pulse">
                                  NEW TASK
                                </div>
                                <span className="font-semibold text-[12px] whitespace-nowrap text-[#b91c1c]">{subStatus}</span>
                              </div>
                            );
                          }

                          if (s === 'pending me initial check' || s === 'pending reviewer(s) invitation' || s === 'pending me decision') {
                            return (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 bg-[#f0f9ff] border border-[#bae6fd] px-2 py-0.5 rounded text-[#0369a1] font-bold text-[10px]">
                                  TO PROCESS
                                </div>
                                <span className="font-semibold text-[12px] whitespace-nowrap text-[#0369a1]">{subStatus}</span>
                              </div>
                            );
                          }
                        }

                        // EIC View logic
                        if (roleView === 'EIC') {
                          if (s === 'pending eic acceptance' && activeTab === '初审') {
                            return (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 bg-[#fef2f2] border border-[#fecaca] px-2 py-0.5 rounded text-[#b91c1c] font-bold text-[10px] animate-pulse">
                                  NEW TASK
                                </div>
                                <span className="font-semibold text-[12px] whitespace-nowrap text-[#b91c1c]">{subStatus}</span>
                              </div>
                            );
                          }

                          if ((s === 'pending eic initial check' && activeTab === '初审') || (s === 'pending eic decision' && activeTab === 'In Process')) {
                            return (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 bg-[#f0f9ff] border border-[#bae6fd] px-2 py-0.5 rounded text-[#0369a1] font-bold text-[10px]">
                                  TO PROCESS
                                </div>
                                <span className="font-semibold text-[12px] whitespace-nowrap text-[#0369a1]">{subStatus}</span>
                              </div>
                            );
                          }
                        }

                        // AE View logic
                        if (roleView === 'AE') {
                          if (s === 'pending ae acceptance' && (activeTab === '初审' || activeTab === 'In Process')) {
                            return (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 bg-[#fef2f2] border border-[#fecaca] px-2 py-0.5 rounded text-[#b91c1c] font-bold text-[10px] animate-pulse">
                                  NEW TASK
                                </div>
                                <span className="font-semibold text-[12px] whitespace-nowrap text-[#b91c1c]">{subStatus}</span>
                              </div>
                            );
                          }

                          if ((s === 'pending ae initial check' && activeTab === '初审') || 
                              ((s === 'pending reviewer(s) invitation' || s === 'pending ae recommendation') && activeTab === 'In Process')) {
                            return (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 bg-[#f0f9ff] border border-[#bae6fd] px-2 py-0.5 rounded text-[#0369a1] font-bold text-[10px]">
                                  TO PROCESS
                                </div>
                                <span className="font-semibold text-[12px] whitespace-nowrap text-[#0369a1]">{subStatus}</span>
                              </div>
                            );
                          }
                        }

                        if (s.includes('pending') || ['等待主编分配', '待修回', '修回审查', '等待审稿人接受', '等待裁决'].includes(subStatus)) {
                          dotClass = 'bg-[#eab308]'; // Yellow
                          textClass = 'text-[#854d0e]';
                        } else if (s.includes('send back') || s.includes('返修')) {
                          dotClass = 'bg-[#f97316]'; // Orange
                          textClass = 'text-[#c2410c]';
                        } else if (s.includes('接收') || s.includes('出版') || s.includes('完成') || s.includes('通过')) {
                          dotClass = 'bg-[#22c55e]'; // Green
                          textClass = 'text-[#166534]';
                        } else if (s.includes('拒稿') || s.includes('撤稿') || s.includes('reject')) {
                          dotClass = 'bg-[#ef4444]'; // Red
                          textClass = 'text-[#991b1b]';
                        } else if (s.includes('外审中') || s.includes('审稿中') || s.includes('预审中') || s.includes('分配') || s.includes('审查中')) {
                          dotClass = 'bg-[#3b82f6]'; // Blue
                          textClass = 'text-[#1e40af]';
                        }

                        return (
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${dotClass} shrink-0`}></span>
                            <span className={`font-medium text-[12px] whitespace-nowrap ${textClass}`}>{subStatus}</span>
                          </div>
                        );
                      };

                      return (
                        <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors border-b border-[#f1f5f9] last:border-b-0">
                          <td className="px-4 py-3.5 text-[#334155] align-middle">{row.id}</td>
                          <td className="px-4 py-3.5 text-[#334155] align-middle">{row.journal}</td>
                          <td className="px-4 py-3.5 font-medium text-[#1e293b] align-middle whitespace-normal break-words line-clamp-1">
                            {row.title}
                          </td>
                          <td className="px-4 py-3.5 align-middle">
                            <span className={`px-2.5 py-1 rounded text-[12px] font-medium inline-block whitespace-nowrap ${getRoleStatusColor(row.status)}`}>
                              {row.status}
                            </span>
                          </td>
                          {activeTab !== '初审' && activeTab !== '归档' && (
                            <>
                              <td className="px-4 py-3.5 align-middle">
                                <span className={`${row.reviewers !== '- / -' && parseInt(row.reviewers.split(' / ')[0]) >= 3 ? 'text-[#166534] font-semibold bg-[#dcfce7] px-1.5 py-0.5 rounded' : (row.reviewers !== '- / -' && parseInt(row.reviewers.split(' / ')[0]) < 3 ? 'text-[#991b1b] font-semibold bg-[#fee2e2] px-1.5 py-0.5 rounded' : 'text-[#334155]')}`}>
                                  {row.reviewers}
                                </span>
                              </td>
                              <td className="px-4 py-3.5 text-center align-middle">
                                {(() => {
                                  const c = row.comments;
                                  const count = typeof c === 'string' ? parseInt(c.split(' / ')[0]) || 0 : c;
                                  return (
                                    <span className={`${count >= 3 ? 'text-[#166534] font-semibold bg-[#dcfce7] px-1.5 py-0.5 rounded' : (row.reviewers !== '- / -' && count < 3 ? 'text-[#991b1b] font-semibold bg-[#fee2e2] px-1.5 py-0.5 rounded' : 'text-[#334155]')}`}>
                                      {c}
                                    </span>
                                  );
                                })()}
                              </td>
                            </>
                          )}
                          {activeTab !== '归档' && (
                            <td className="px-4 py-3.5 text-center align-middle">
                              {row.unreadComments && row.unreadComments > 0 ? (
                                <div className="inline-flex items-center justify-center gap-1.5 px-2 py-1 rounded-md bg-[#fef2f2] border border-[#fecaca] text-[#dc2626] shadow-[0_1px_2px_rgba(220,38,38,0.1)]">
                                  <Bell size={13} className="text-[#ef4444]" />
                                  <span className="font-semibold text-[11px] whitespace-nowrap">
                                    {row.unreadComments}条{row.unreadType ? ` ${row.unreadType}` : '新留言'}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-[#94a3b8]">-</span>
                              )}
                            </td>
                          )}
                          {activeTab !== '归档' && (
                            <td className="px-4 py-3.5 text-center text-[#334155] align-middle">
                              {row.revision}
                            </td>
                          )}
                          <td className="px-4 py-3.5 align-middle">
                            {getSubStatusIndicator(row.subStatus)}
                          </td>
                        </tr>
                      );
                    } else if (roleView === 'AU') {
                      // AU rendering
                      const getRoleStatusColor = (status: string) => {
                        const s = status.toUpperCase();
                        if (s.includes('ME ') || s === 'ME' || s === 'ME 预接收') return 'bg-[#f3e8ff] text-[#7e22ce]'; // Purple for ME
                        if (s.includes('EIC ')) return 'bg-[#e0e7ff] text-[#4338ca]'; // Indigo for EIC
                        if (s.includes('AE ')) return 'bg-[#e0f2fe] text-[#0369a1]'; // Sky Blue for AE
                        if (s.includes('RE ')) return 'bg-[#ccfbf1] text-[#0f766e]'; // Teal for RE
                        if (s.includes('AU ') || s.includes('AUTHOR')) return 'bg-[#ffedd5] text-[#c2410c]'; // Orange for AU
                        if (s.includes('ACCEPT')) return 'bg-[#dcfce7] text-[#166534]'; // Green
                        if (s.includes('REJECT') || s.includes('REACTION') || s.includes('RETRACTION')) return 'bg-[#fee2e2] text-[#991b1b]'; // Red
                        if (s.includes('CORRECTION')) return 'bg-[#fef3c7] text-[#d97706]'; // Amber
                        return 'bg-[#e2e8f0] text-[#475569]'; // Default Gray
                      };

                      // Helper for 主状态 (subStatus), using a dot and text to differentiate visually from the solid pills
                      const getSubStatusIndicator = (subStatus: string) => {
                        const s = subStatus.toLowerCase();
                        let dotClass = 'bg-[#94a3b8]'; // Default Gray
                        let textClass = 'text-[#475569]';

                        if (s === 'send back to author(s)') {
                          return (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1.5 bg-[#f0f9ff] border border-[#bae6fd] px-2 py-0.5 rounded text-[#0369a1] font-bold text-[10px]">
                                TO PROCESS
                              </div>
                              <span className="font-semibold text-[12px] whitespace-nowrap text-[#0369a1]">{subStatus}</span>
                            </div>
                          );
                        }

                        if (s.includes('pending') || ['等待主编分配', '待修回', '修回审查', '等待审稿人接受', '等待裁决'].includes(subStatus)) {
                          dotClass = 'bg-[#eab308]'; // Yellow
                          textClass = 'text-[#854d0e]';
                        } else if (s.includes('send back') || s.includes('返修')) {
                          dotClass = 'bg-[#f97316]'; // Orange
                          textClass = 'text-[#c2410c]';
                        } else if (s.includes('接收') || s.includes('出版') || s.includes('完成') || s.includes('通过')) {
                          dotClass = 'bg-[#22c55e]'; // Green
                          textClass = 'text-[#166534]';
                        } else if (s.includes('拒稿') || s.includes('撤稿') || s.includes('reject')) {
                          dotClass = 'bg-[#ef4444]'; // Red
                          textClass = 'text-[#991b1b]';
                        } else if (s.includes('外审中') || s.includes('审稿中') || s.includes('预审中') || s.includes('分配') || s.includes('审查中')) {
                          dotClass = 'bg-[#3b82f6]'; // Blue
                          textClass = 'text-[#1e40af]';
                        }

                        return (
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${dotClass} shrink-0`}></span>
                            <span className={`font-medium text-[12px] whitespace-nowrap ${textClass}`}>{subStatus}</span>
                          </div>
                        );
                      };

                      return (
                        <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors border-b border-[#f1f5f9] last:border-b-0">
                          <td className="px-4 py-3.5 text-[#334155] align-middle">{row.id}</td>
                          <td className="px-4 py-3.5 text-[#334155] align-middle">{row.journal}</td>
                          <td className="px-4 py-3.5 font-medium text-[#1e293b] align-middle whitespace-normal break-words line-clamp-1">
                            {row.title}
                          </td>
                          {activeTab !== '初审' && activeTab !== '归档' && (
                            <td className="px-4 py-3.5 align-middle">
                              <span className={`${row.reviewers !== '- / -' && parseInt(row.reviewers.split(' / ')[0]) >= 3 ? 'text-[#166534] font-semibold bg-[#dcfce7] px-1.5 py-0.5 rounded' : (row.reviewers !== '- / -' && parseInt(row.reviewers.split(' / ')[0]) < 3 ? 'text-[#991b1b] font-semibold bg-[#fee2e2] px-1.5 py-0.5 rounded' : 'text-[#334155]')}`}>
                                {row.reviewers}
                              </span>
                            </td>
                          )}
                          {activeTab !== '归档' && (
                            <td className="px-4 py-3.5 text-center align-middle">
                              {row.unreadComments && row.unreadComments > 0 ? (
                                <div className="inline-flex items-center justify-center gap-1.5 px-2 py-1 rounded-md bg-[#fef2f2] border border-[#fecaca] text-[#dc2626] shadow-[0_1px_2px_rgba(220,38,38,0.1)]">
                                  <Bell size={13} className="text-[#ef4444]" />
                                  <span className="font-semibold text-[11px] whitespace-nowrap">
                                    {row.unreadComments}条{row.unreadType ? ` ${row.unreadType}` : '新留言'}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-[#94a3b8]">-</span>
                              )}
                            </td>
                          )}
                          {activeTab !== '归档' && (
                            <td className="px-4 py-3.5 text-center text-[#334155] align-middle">
                              {row.revision}
                            </td>
                          )}
                          <td className="px-4 py-3.5 align-middle">
                            {getSubStatusIndicator(row.subStatus)}
                          </td>
                        </tr>
                      );
                    } else {
                      // RE rendering
                      const renderREStatus = (status: string) => {
                        let dotClass = 'bg-[#94a3b8]';
                        let textClass = 'text-[#475569]';
                        const s = status.toUpperCase();
                        
                        if (status === 'Under Review') {
                          dotClass = 'bg-[#eab308]'; // Yellow dot
                          textClass = 'text-[#854d0e]'; // Ordinary yellow/brown text
                        } else if (status === 'Done' || s.includes('ACCEPT')) {
                          dotClass = 'bg-[#22c55e]'; // Green dot
                          textClass = 'text-[#166534]'; // Green text
                        } else if (status === 'Cancelled' || s.includes('REJECT') || s.includes('RETRACTION') || s.includes('WITHDRAW')) {
                          dotClass = 'bg-[#ef4444]'; // Red dot
                          textClass = 'text-[#991b1b]'; // Red text
                        }

                        return (
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${dotClass} shrink-0`}></span>
                            <span className={`font-medium text-[12px] whitespace-nowrap ${textClass}`}>{status}</span>
                          </div>
                        );
                      };

                      return (
                        <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors border-b border-[#f1f5f9] last:border-b-0">
                          <td className="px-4 py-3.5 text-[#334155] align-middle">{row.id}</td>
                          <td className="px-4 py-3.5 text-[#334155] align-middle">{row.journal}</td>
                          <td className="px-4 py-3.5 font-medium text-[#1e293b] align-middle whitespace-normal break-words line-clamp-1">
                            {row.title}
                          </td>
                          {activeTab !== '归档' && (
                            <td className="px-4 py-3.5 text-center text-[#334155] align-middle">
                              {row.revision}
                            </td>
                          )}
                          <td className="px-4 py-3.5 align-middle">
                            {renderREStatus(row.status)}
                          </td>
                          <td className="px-4 py-3.5 align-middle">
                            {row.stage === 'In Process' ? (
                              row.reInvitationStatus === 'Pending' ? (
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1.5 bg-[#fef2f2] border border-[#fecaca] px-2 py-1 rounded text-[#991b1b] font-medium text-[12px]">
                                    <span className="flex h-1.5 w-1.5 relative">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                                    </span>
                                    新邀请
                                  </div>
                                  <div className="flex gap-1.5">
                                    <button className="px-3 py-1.5 bg-[#2563eb] text-white rounded-[4px] text-[12px] font-medium hover:bg-[#1d4ed8] transition-colors shadow-sm">接受</button>
                                    <button className="px-3 py-1.5 bg-white border border-[#e2e8f0] text-[#475569] rounded-[4px] text-[12px] font-medium hover:bg-[#f8fafc] transition-colors shadow-sm">拒绝</button>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-[#64748b] text-[12px] flex items-center gap-1.5">
                                  <Check size={14} className="text-[#10b981]" />
                                  <span>已接受，待提交意见</span>
                                </div>
                              )
                            ) : (
                              <span className="text-[#94a3b8]">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    }
                  })
                ) : (
                   <tr>
                     <td colSpan={['ME', 'EIC', 'AE'].includes(roleView) ? 9 : 6} className="px-4 py-8 text-center text-[#64748b]">
                       暂无数据
                     </td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
        
        {roleView !== 'LIST' && (
          <footer className="mt-4 flex items-center justify-between text-[13px] text-[#64748b]">
            <div>
              显示 1 - {filteredData.length} 条，共 {currentTabs.find(t => t.name === activeTab)?.count || 0} 条数据
            </div>
            <div className="flex gap-2">
              <button disabled className="px-3 py-1.5 border border-[#e2e8f0] rounded bg-white text-[#94a3b8] cursor-not-allowed transition-colors">上一页</button>
              <button className="px-3 py-1.5 border border-[#e2e8f0] rounded bg-white text-[#475569] hover:bg-[#f8fafc] transition-colors">1</button>
              <button className="px-3 py-1.5 border border-[#e2e8f0] rounded bg-white text-[#475569] hover:bg-[#f8fafc] transition-colors">2</button>
              <button className="px-3 py-1.5 border border-[#e2e8f0] rounded bg-white text-[#475569] hover:bg-[#f8fafc] transition-colors">下一页</button>
            </div>
          </footer>
        )}
      </main>
    </div>
  );
}

