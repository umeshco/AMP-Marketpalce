import React, { useState, useEffect, useRef } from 'react';
import { Eye, ShieldCheck, ShieldAlert, Loader2, RefreshCcw, ScrollText, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { Order } from '../types';

interface BacklinkScannerProps {
  order: Order;
  onScanComplete: (updatedOrder: Order) => void;
}

export default function BacklinkScanner({ order, onScanComplete }: BacklinkScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [scanSteps, setScanSteps] = useState<{ time: string; msg: string }[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [successStatus, setSuccessStatus] = useState<"success" | "pending" | "failed" | null>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Parse existing backlink logs if present
  const existingLogs = order.backlinkLogs ? JSON.parse(order.backlinkLogs) : [];

  // Function to run scanner simulation triggered by backend API
  const runLiveScanner = async () => {
    setScanning(true);
    setSuccessStatus(null);
    setScanSteps([]);
    setCurrentStepIndex(-1);

    try {
      // Trigger live backend scan
      const response = await fetch('/api/check-backlink', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id })
      });
      const data = await response.json();
      
      if (data.success) {
        // Step-by-step playback effect to feel interactive and professional
        let stepIndex = 0;
        const interval = setInterval(() => {
          if (stepIndex < data.logs.length) {
            setScanSteps(prev => [...prev, data.logs[stepIndex]]);
            setCurrentStepIndex(stepIndex);
            stepIndex++;
          } else {
            clearInterval(interval);
            setScanning(false);
            setSuccessStatus(data.order.backlinkStatus);
            onScanComplete(data.order);
          }
        }, 800); // 800ms increments
      } else {
        setScanning(false);
        setScanSteps([{ time: new Date().toISOString(), msg: `Scan error: ${data.error || 'Server error occurred'}` }]);
      }
    } catch (e: any) {
      setScanning(false);
      setScanSteps([{ time: new Date().toISOString(), msg: `Scanner connection error: ${e.message}` }]);
    }
  };

  // Scroll to bottom of log terminal
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [scanSteps]);

  return (
    <div className="border border-slate-200/80 rounded-xl bg-white shadow-sm overflow-hidden p-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
            Live Link Report Tracker
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-1.5">
            Automated Backlink Verification: {order.id}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time server scanning for anchors, do-follow links, and active SSL headers.
          </p>
        </div>

        <button
          type="button"
          disabled={scanning}
          onClick={runLiveScanner}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all shadow-sm"
        >
          {scanning ? <Loader2 size={14} className="animate-spin" /> : <RefreshCcw size={14} />}
          {scanning ? 'Verifying Live Outlets...' : 'Run Automated Scan'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Placement parameters info */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3.5">
          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Target Check Parameters</span>
          
          <div className="grid grid-cols-2 gap-3.5 text-xs">
            <div>
              <span className="block text-slate-400 font-medium">Domain Outlet</span>
              <span className="font-bold text-slate-800">{order.site}</span>
            </div>
            <div>
              <span className="block text-slate-400 font-medium">Placed Status</span>
              <span className={`font-bold capitalize inline-flex items-center gap-1 ${
                order.backlinkStatus === 'success' ? 'text-emerald-600' : 'text-amber-500'
              }`}>
                {order.backlinkStatus === 'success' ? <ShieldCheck size={12} /> : <Loader2 size={12} className="animate-spin" />}
                {order.backlinkStatus === 'success' ? 'Verified Live' : 'Checking pending'}
              </span>
            </div>
            <div className="col-span-2">
              <span className="block text-slate-400 font-medium mb-0.5">Target Destination URL</span>
              <span className="font-semibold text-indigo-650 bg-indigo-50/50 px-2 py-1 rounded border border-indigo-100/60 block truncate select-all">
                {order.targetUrl}
              </span>
            </div>
            <div className="col-span-2">
              <span className="block text-slate-400 font-medium mb-0.5">Required Anchor Text</span>
              <span className="font-bold text-slate-800 bg-white px-2 py-1 rounded border border-slate-200 block truncate">
                "{order.anchorText}"
              </span>
            </div>
            <div className="col-span-2">
              <span className="block text-slate-400 font-medium mb-0.5">Reported Published URL</span>
              {order.publishedUrl ? (
                <a
                  href={order.publishedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1 underline break-all"
                >
                  {order.publishedUrl}
                  <ExternalLink size={12} />
                </a>
              ) : (
                <span className="text-amber-600 font-medium italic block bg-amber-50 rounded px-2.5 py-1">
                  Awaiting publisher live link submission...
                </span>
              )}
            </div>
            {order.lastChecked && (
              <div className="col-span-2 border-t border-slate-150 pt-2 text-[10px] text-slate-400">
                Last checked: {new Date(order.lastChecked).toLocaleString()}
              </div>
            )}
          </div>
        </div>

        {/* Live scanner log viewer */}
        <div className="lg:col-span-7 flex flex-col h-full bg-slate-900 text-slate-300 font-mono rounded-xl p-4 shadow-inner min-h-[220px]">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800 mb-2">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
              <ScrollText size={12} className="text-indigo-400" />
              Diagnostics Log Terminal
            </span>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></span>
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
            </div>
          </div>

          <div
            ref={logContainerRef}
            className="flex-1 overflow-y-auto max-h-[160px] text-[11px] leading-relaxed space-y-1.5 pr-2"
          >
            {scanSteps.map((step, idx) => (
              <div key={idx} className="flex gap-2 items-start hover:bg-slate-800/40 py-0.5 px-1 rounded">
                <span className="text-emerald-500/80">
                  [{new Date(step.time).toLocaleTimeString(undefined, { hour12: false })}]
                </span>
                <span className="text-slate-105 flex-1">{step.msg}</span>
              </div>
            ))}

            {!scanning && scanSteps.length === 0 && existingLogs.length > 0 && (
              <div className="text-slate-500">
                <p className="font-bold underline mb-1">Previous Scan History:</p>
                {existingLogs.map((log: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-start py-0.5 opacity-65">
                    <span className="text-slate-500">[{new Date(log.time).toLocaleTimeString(undefined, { hour12: false })}]</span>
                    <span className="text-slate-350">{log.msg}</span>
                  </div>
                ))}
              </div>
            )}

            {!scanning && scanSteps.length === 0 && existingLogs.length === 0 && (
              <div className="text-slate-600 text-center py-10">
                Terminal idle. Click "Run Automated Scan" to handshake outlet.
              </div>
            )}

            {scanning && (
              <div className="flex items-center gap-2 text-indigo-400 text-xs py-1 animate-pulse">
                <Loader2 size={12} className="animate-spin" />
                Interrogating host headers...
              </div>
            )}
          </div>

          {/* Verification summary block */}
          {successStatus === 'success' && (
            <div className="mt-3.5 bg-emerald-950/60 border border-emerald-900/60 p-3 rounded-lg flex items-center gap-3">
              <CheckCircle2 className="text-emerald-400 shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold text-emerald-305">VERIFICATION PASSED</p>
                <p className="text-[10px] text-emerald-400">Backlink is live on page & successfully detected anchor text.</p>
              </div>
            </div>
          )}

          {successStatus === 'failed' && (
            <div className="mt-3.5 bg-red-950/60 border border-red-900/60 p-3 rounded-lg flex items-center gap-3">
              <AlertTriangle className="text-red-400 shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold text-red-305">VERIFICATION FAILED</p>
                <p className="text-[10px] text-red-400">Could not identify live link matching parameters. Review required.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
