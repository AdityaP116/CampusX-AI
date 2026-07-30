"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

type Severity = "Urgent" | "Medium" | "Low";

interface Report {
  id: string;
  severity: Severity;
  title: string;
  subtitle: string;
  imageUrl?: string;
  icon?: string;
  reporter: string;
  reporterLevel: string;
  reason: string;
  status: string;
  description: string;
}

const MOCK_REPORTS: Report[] = [
  {
    id: "report_001",
    severity: "Urgent",
    title: "Suspicious Substance",
    subtitle: "Listing ID: #98321",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMwPsYqcjRziGj0PD8J_Ria6LCJ8Vy-dhiAX0H5SBLApJ3xy77AslwN70efqp_x_lQiKxRcrrLdDNoanpti9vm7cpgr3jusaodCQVEaczc53IaJ4SLbGi6MupvJGMPR6rcdkjz3paunvoso_Dx7c3yMcNVeE7P6XKuizjZ9lMwGblmnHnRKMTs9VM5VsvQTTBU0PGCMfCzOQ4L4bs7GmnqQjF2q2x3RJ6g-r_H8S-vYUY9QdOgHDq6pntNgdlaK1A5vhI6vj1yG4Sp",
    reporter: "Sarah Connor",
    reporterLevel: "LVL 4",
    reason: "Prohibited Item",
    status: "NEW",
    description: "Selling high quality white powder for research purposes. DM for pickup details on campus north lawn tonight."
  },
  {
    id: "report_002",
    severity: "Medium",
    title: "Alex_Trader99",
    subtitle: "User ID: #USR-772",
    icon: "person",
    reporter: "John Doe",
    reporterLevel: "LVL 2",
    reason: "Potential Scam",
    status: "REVIEWING",
    description: "This user has been asking for payments outside the platform before shipping the item."
  },
  {
    id: "report_003",
    severity: "Low",
    title: "Used Bio Textbook",
    subtitle: "Listing ID: #44012",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_GQj5BFjvACopB2xa9zNNUOs3jnjtIkuDyoMDF6pzaB_MR9-Ur7pJpcFN9kjeR5CFXJSRXwV1nHRJMnpsiF7NnU5--OVPq_b7M18KCA3c1B7mjGPRRvoGkdWLO_zRX0CveE1CmDKvTORCPefNqmpI7zasxqe29mU3hGRtIntO9w3frzyOEIoOrjFJKMiciyyAPizVJZMfVfXtwvT5GQ8eyJ-ZgGjmh0DPoWa8LyNycnVxfhkl8dBpl9wWjPd1aRKMpO6iVaaNpY0O",
    reporter: "Emily Blunt",
    reporterLevel: "LVL 1",
    reason: "Misleading Category",
    status: "REVIEWING",
    description: "Item listed under Electronics but it is clearly a textbook."
  }
];

export default function AdminReportsPage() {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const selectedReport = MOCK_REPORTS.find((r) => r.id === selectedReportId);

  return (
    <div className="flex h-full -m-container-margin md:-m-8">
      {/* Reports Table Section */}
      <section className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="font-bold text-h3 text-[#0b1c30]">Flagged Content</h1>
            <p className="text-small text-[#565e74] mt-1">Reviewing 24 active community reports</p>
          </div>
          <div className="flex gap-2">
            <div className="flex bg-[#dce9ff] rounded-lg p-1">
              <button className="px-4 py-1.5 font-semibold text-small bg-[#ffffff] text-[#0b1c30] rounded-md shadow-sm">All</button>
              <button className="px-4 py-1.5 font-semibold text-small text-[#565e74] hover:text-[#0b1c30]">Urgent</button>
              <button className="px-4 py-1.5 font-semibold text-small text-[#565e74] hover:text-[#0b1c30]">New</button>
            </div>
          </div>
        </div>

        {/* Modern Bento Data Table */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="bg-[#ffffff] border border-[#c7c4d8] rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eff4ff] border-b border-[#c7c4d8]">
                <th className="px-6 py-4 font-bold text-[11px] tracking-widest text-[#777587] uppercase">Severity</th>
                <th className="px-6 py-4 font-bold text-[11px] tracking-widest text-[#777587] uppercase">Reported Item / User</th>
                <th className="px-6 py-4 font-bold text-[11px] tracking-widest text-[#777587] uppercase">Reporter</th>
                <th className="px-6 py-4 font-bold text-[11px] tracking-widest text-[#777587] uppercase">Reason</th>
                <th className="px-6 py-4 font-bold text-[11px] tracking-widest text-[#777587] uppercase">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-[#464555]">
              {MOCK_REPORTS.map((report) => (
                <motion.tr 
                  variants={fadeInUp} 
                  key={report.id}
                  onClick={() => setSelectedReportId(report.id)}
                  className={`cursor-pointer transition-colors border-b border-[#c7c4d8]/50 hover:bg-[#f1f5f9] ${selectedReportId === report.id ? 'bg-[#f1f5f9]' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1 h-6 rounded-full ${report.severity === 'Urgent' ? 'bg-[#ba1a1a]' : report.severity === 'Medium' ? 'bg-[#4b4dd8]' : 'bg-[#565e74]'}`}></div>
                      <span className={`font-bold px-2 py-0.5 rounded text-[11px] uppercase tracking-tighter ${
                        report.severity === 'Urgent' ? 'bg-[#ffdad6] text-[#93000a]' : 
                        report.severity === 'Medium' ? 'bg-[#e5eeff] text-[#07006c]' : 
                        'bg-[#e5eeff] text-[#565e74]'
                      }`}>
                        {report.severity}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {report.imageUrl ? (
                        <div className="w-10 h-10 rounded bg-[#d3e4fe] overflow-hidden">
                          <Image src={report.imageUrl} alt={report.title} width={40} height={40} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#dce9ff] flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#3525cd]">{report.icon}</span>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-small text-[#0b1c30]">{report.title}</p>
                        <p className="text-[11px] text-[#777587]">{report.subtitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#0b1c30]">{report.reporter}</span>
                      <span className="text-[10px] bg-[#dce9ff] px-1.5 py-0.5 rounded">{report.reporterLevel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={report.severity === 'Urgent' ? 'text-[#ba1a1a] font-medium' : ''}>{report.reason}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full font-semibold text-[11px] ${
                      report.status === 'NEW' ? 'bg-[#dce9ff] text-[#464555]' : 'bg-[#e2dfff] text-[#0f0069]'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="material-symbols-outlined text-[#777587]">chevron_right</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-[#eff4ff] flex justify-between items-center border-t border-[#c7c4d8]">
            <p className="text-[13px] text-[#777587]">Showing 1-3 of 24 reports</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-[#c7c4d8] rounded hover:bg-[#ffffff] transition-colors"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
              <button className="px-3 py-1 border border-[#c7c4d8] rounded hover:bg-[#ffffff] transition-colors"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Side Panel for Quick Details */}
      <AnimatePresence>
        {selectedReport && (
          <motion.aside 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="w-full max-w-md border-l border-[#c7c4d8] bg-[#ffffff] h-full overflow-y-auto shrink-0 flex flex-col"
          >
            <div className="p-6 border-b border-[#c7c4d8] flex justify-between items-center bg-[#eff4ff]/50">
              <h3 className="font-bold text-[18px] text-[#0b1c30]">Report Details</h3>
              <button className="p-1 hover:bg-[#e5eeff] rounded-full text-[#777587] hover:text-[#0b1c30]" onClick={() => setSelectedReportId(null)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-8 flex-1">
              {/* Moderation Priority Card */}
              {selectedReport.severity === "Urgent" && (
                <div className="p-4 rounded-xl border-l-4 border-[#ba1a1a] bg-[#ffdad6]/30 flex gap-4">
                  <div className="w-12 h-12 bg-[#ffdad6] text-[#93000a] rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-small text-[#93000a]">Critical Violation</h4>
                    <p className="text-[13px] text-[#93000a]/80 mt-1">This report is flagged as &apos;{selectedReport.reason}&apos;. Immediate action is recommended per safety protocol V2.</p>
                  </div>
                </div>
              )}

              {/* Reported Entity */}
              <div className="space-y-4">
                <h5 className="font-bold text-[11px] text-[#777587] tracking-wider uppercase">Reported Entity</h5>
                <div className="p-4 rounded-lg bg-[#f8f9ff] border border-[#c7c4d8] flex gap-4 items-center">
                  {selectedReport.imageUrl ? (
                    <div className="w-16 h-16 rounded bg-[#d3e4fe] overflow-hidden shrink-0">
                      <Image src={selectedReport.imageUrl} alt={selectedReport.title} width={64} height={64} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-[#dce9ff] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[#3525cd] text-h2">{selectedReport.icon}</span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-small text-[#0b1c30]">{selectedReport.title}</h4>
                    <p className="text-[13px] text-[#565e74] mt-1">{selectedReport.subtitle}</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-[#eff4ff] border border-[#c7c4d8]/50">
                  <p className="text-[13px] text-[#0b1c30] italic">&quot;{selectedReport.description}&quot;</p>
                </div>
              </div>

              {/* Reporter Info */}
              <div className="space-y-3">
                <h5 className="font-bold text-[11px] text-[#777587] tracking-wider uppercase">Reporter Evidence</h5>
                <div className="flex items-center justify-between p-3 border border-[#c7c4d8] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#dce9ff] flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm">person</span>
                    </div>
                    <span className="font-semibold text-small text-[#0b1c30]">{selectedReport.reporter}</span>
                  </div>
                  <span className="text-[13px] text-[#565e74]">15m ago</span>
                </div>
                <p className="text-small text-[#0b1c30]">&quot;This looks extremely suspicious and likely violates the drug paraphernalia policy. The user is also asking for off-platform meetings.&quot;</p>
              </div>

              {/* Action Controls */}
              <div className="pt-6 border-t border-[#c7c4d8] space-y-3">
                <button className="w-full bg-[#ba1a1a] text-white font-semibold text-small py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all">
                  <span className="material-symbols-outlined">delete_forever</span>
                  Delete Item &amp; Notify User
                </button>
                <button className="w-full bg-[#213145] text-white font-semibold text-small py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all">
                  <span className="material-symbols-outlined">person_off</span>
                  Suspend User Account
                </button>
                <button className="w-full bg-[#ffffff] border border-[#777587] text-[#464555] font-semibold text-small py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#eff4ff] active:scale-[0.98] transition-all">
                  <span className="material-symbols-outlined">close</span>
                  Dismiss Report
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
