"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, LayoutDashboard, TrendingUp, Users, DollarSign, 
  Activity, ShieldAlert, Search, Bell, Settings, ArrowUpRight, 
  ArrowDownRight, Server, Clock, Briefcase, UserCheck, Terminal,
  CheckCircle2, XCircle, Loader2, Smartphone, Scale, Cpu, Globe, Target
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar
} from 'recharts';

export default function NexusDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [aiQuery, setAiQuery] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [ledger, setLedger] = useState<any[]>([
    { id: 'init', user: 'System', command: 'Initialize AOS', action: 'System Boot', log: 'Nexus AOS v1.0 online. All security protocols engaged.', requires_approval: false, status: 'approved', timestamp: '08:00:00' }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const allowedEndpoints = ['overview', 'sales', 'hr', 'marketing', 'finance', 'engineering', 'legal', 'hq'];
      if (!allowedEndpoints.includes(activeTab.toLowerCase())) return;
      
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/v1/metrics/${activeTab.toLowerCase()}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Nexus backend offline or unreachable", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  const executeAction = async (commandString: string) => {
    setIsAiProcessing(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/ai/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: commandString })
      });
      if (res.ok) {
        const result = await res.json();
        if (commandString.toLowerCase().includes('approve') || commandString.toLowerCase().includes('modify')) {
          setLedger(prev => {
            const updated = prev.map(entry => entry.status === 'pending' ? { ...entry, status: 'approved' } : entry);
            return [result, ...updated];
          });
        } else {
          setLedger(prev => [result, ...prev]);
        }
        setActiveTab('Overwatch');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiProcessing(false);
    }
  };

  const handleAiSubmit = async (e: any) => {
    if (e.key === 'Enter' && aiQuery.trim() !== '') {
      const query = aiQuery;
      setAiQuery(''); 
      executeAction(query);
    }
  };

  const MetricCard = ({ title, value, trend, isPositive, icon: Icon, colorClass, gradientClass, delay }) => {
    const SafeIcon = Icon || Activity;
    return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-black/20 backdrop-blur-xl p-6 cursor-pointer group"
    >
      <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r ${gradientClass} opacity-50`}></div>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${colorClass}`}>
          <SafeIcon className="w-5 h-5" />
        </div>
        <span className={`flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${
          isPositive ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]' : 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
        }`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1"/> : <ArrowDownRight className="w-3 h-3 mr-1"/>}
          {trend}
        </span>
      </div>
      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <span className="text-3xl font-bold text-white tracking-tight">
        {loading ? <div className="h-8 w-24 bg-white/10 animate-pulse rounded mt-1"></div> : value}
      </span>
    </motion.div>
  );
  };

  const renderOverview = () => {
    const kpis = data?.kpis || [];
    const icons = [DollarSign, TrendingUp, Users, Server];
    const colors = ["text-emerald-400", "text-blue-400", "text-purple-400", "text-amber-400"];
    const gradients = ["from-transparent via-emerald-500 to-transparent", "from-transparent via-blue-500 to-transparent", "from-transparent via-purple-500 to-transparent", "from-transparent via-amber-500 to-transparent"];

    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi: any, idx: number) => (
            <MetricCard key={kpi.title} title={kpi.title} value={kpi.value} trend={kpi.trend} isPositive={kpi.isPositive} icon={icons[idx]} colorClass={colors[idx]} gradientClass={gradients[idx]} delay={idx * 0.1} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="lg:col-span-2 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-black/40 backdrop-blur-xl p-6 h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">Revenue Velocity (Chronos)</h2>
            </div>
            <div className="flex-1 w-full">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <BrainCircuit className="w-8 h-8 text-nexus-gold animate-pulse" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.chronos_data || []}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                    <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} dx={-10} tickFormatter={(val)=>`$${val}k`} />
                    <RechartsTooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(8px)' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    <Area type="monotone" dataKey="target" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" fillOpacity={0} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  const renderHQ = () => {
    const intel = data?.global_intel || [];
    const schedule = data?.ceo_schedule || [];
    const tasks = data?.cascading_tasks || [];

    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
        
        {/* Global Intel Ticker */}
        <div className="rounded-2xl border border-red-500/20 bg-black/60 backdrop-blur-xl p-4 flex items-center shadow-[0_0_20px_rgba(239,68,68,0.1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500 animate-pulse"></div>
          <div className="flex items-center text-red-500 font-bold text-xs tracking-widest mr-6 bg-red-500/10 px-3 py-1.5 rounded">
            <Globe className="w-4 h-4 mr-2" /> GLOBAL INTEL
          </div>
          <div className="flex-1 overflow-x-hidden relative h-6">
            <div className="flex space-x-12 absolute whitespace-nowrap animate-[pulse_4s_linear_infinite]">
              {intel.map((item: any, i: number) => (
                <div key={i} className="flex items-center text-sm">
                  <span className="text-gray-500 font-mono mr-2">{item.time}</span>
                  <span className="text-gray-400 font-bold uppercase mr-2">[{item.source}]</span>
                  <span className="text-white mr-2">{item.event}</span>
                  <span className="text-blue-400 italic">({item.impact})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CEO Schedule */}
          <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-black/40 backdrop-blur-xl p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center">
              <Clock className="w-5 h-5 text-purple-400 mr-2" /> Immersive Itinerary
            </h2>
            <div className="space-y-4">
              {schedule.map((meeting: any, i: number) => (
                <div key={i} className="relative pl-6 border-l-2 border-white/10 pb-4">
                  <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[7px] top-1 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-bold">{meeting.title}</h3>
                    <span className="text-xs font-mono text-gray-500">{meeting.time}</span>
                  </div>
                  <div className="flex space-x-2 mb-3">
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs text-gray-400 flex items-center"><Users className="w-3 h-3 mr-1"/> {meeting.attendees}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${meeting.threat.includes('High') ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>Risk: {meeting.threat}</span>
                  </div>
                  <div className="p-3 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                    <h4 className="text-[10px] uppercase text-purple-400 font-bold mb-1">AI Prep Notes</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{meeting.ai_note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cascading Tasks */}
          <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-black/40 backdrop-blur-xl p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center">
              <Target className="w-5 h-5 text-blue-400 mr-2" /> Cascading Task Engine
            </h2>
            {tasks.map((task: any, i: number) => (
              <div key={i} className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-400">{task.level}</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,1)]"></span>
                </div>
                <h3 className="text-white text-lg font-bold mb-6">"{task.directive}"</h3>
                
                <div className="space-y-4 pl-4 border-l border-blue-500/20 relative">
                  {task.children?.map((child: any, j: number) => (
                    <div key={j} className="relative">
                      <div className="absolute w-4 h-[1px] bg-blue-500/20 -left-4 top-4"></div>
                      <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-white/20 transition cursor-pointer group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-400 font-mono">{child.level}</span>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${child.status === 'in_progress' ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-500/20 text-gray-400'}`}>{child.status}</span>
                        </div>
                        <p className="text-sm text-gray-300">{child.directive}</p>
                        <button onClick={() => executeAction("approve cascade task")} className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded">Modify / Approve</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderSales = () => {
    const kpis = data?.kpis || [];
    const icons = [Users, TrendingUp, Clock];
    const colors = ["text-cyan-400", "text-emerald-400", "text-rose-400"];
    const gradients = ["from-transparent via-cyan-500 to-transparent", "from-transparent via-emerald-500 to-transparent", "from-transparent via-rose-500 to-transparent"];
    
    const sdr = data?.autonomous_sdr;

    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi: any, idx: number) => (
            <MetricCard key={kpi.title} title={kpi.title} value={kpi.value} trend={kpi.trend} isPositive={kpi.isPositive} icon={icons[idx]} colorClass={colors[idx]} gradientClass={gradients[idx]} delay={idx * 0.1} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-black/40 backdrop-blur-xl p-6">
            <h2 className="text-lg font-bold text-white mb-8 flex items-center">
              <Activity className="w-5 h-5 text-cyan-400 mr-2" /> Live Deal Velocity
            </h2>
            <div className="space-y-6">
              {data?.pipeline_data?.map((stage: any, idx: number) => (
                <div key={stage.name} className="relative">
                  <div className="flex justify-between text-xs font-medium text-gray-400 mb-2">
                    <span className="uppercase tracking-widest">{stage.name}</span>
                    <span className="text-cyan-400 font-mono">${stage.val}k</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(stage.val / 400) * 100}%` }}
                      transition={{ duration: 1.5, delay: idx * 0.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-300 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-black/40 backdrop-blur-xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <h2 className="text-lg font-bold text-white mb-2 flex items-center">
              <Search className="w-5 h-5 text-cyan-400 mr-2" /> Autonomous SDR Leads
            </h2>
            <p className="text-xs text-gray-400 mb-6">AI generated {sdr?.leads_found} hyper-targeted leads while you were asleep.</p>
            
            <div className="flex-1 space-y-4 overflow-y-auto pr-2 relative z-10">
              {sdr?.leads?.map((lead: any, i: number) => (
                <div key={i} className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white font-bold">{lead.company}</h3>
                    <span className="px-2 py-1 bg-white/10 text-gray-300 text-[10px] rounded border border-white/10">{lead.source}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed border-l-2 border-cyan-500/30 pl-3">{lead.rationale}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
               <button onClick={() => executeAction("approve lead sequence")} className="w-full py-3 bg-cyan-500/20 text-cyan-300 text-sm font-bold rounded-lg hover:bg-cyan-500/30 border border-cyan-500/30 transition shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                 Approve & Transfer to Sales Manager
               </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderHR = () => {
    const kpis = data?.kpis || [];
    const icons = [Briefcase, ShieldAlert, UserCheck];
    const colors = ["text-blue-400", "text-orange-400", "text-emerald-400"];
    const gradients = ["from-transparent via-blue-500 to-transparent", "from-transparent via-orange-500 to-transparent", "from-transparent via-emerald-500 to-transparent"];

    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi: any, idx: number) => (
            <MetricCard key={kpi.title} title={kpi.title} value={kpi.value} trend={kpi.trend} isPositive={kpi.isPositive} icon={icons[idx]} colorClass={colors[idx]} gradientClass={gradients[idx]} delay={idx * 0.1} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-black/40 backdrop-blur-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center">
              <BrainCircuit className="w-5 h-5 text-orange-400 mr-2" /> AI Flight Risk Analysis
            </h2>
            <div className="space-y-4 relative z-10">
              <div className="p-5 bg-orange-500/5 border border-orange-500/20 rounded-xl hover:border-orange-500/40 transition-colors">
                <div className="flex justify-between items-start">
                  <h4 className="text-orange-400 font-bold text-sm tracking-wide">Senior DevOps Engineer - EMEA</h4>
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-[10px] font-bold rounded">HIGH RISK</span>
                </div>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">AI detected 30% drop in Slack activity and skipped 2 consecutive 1:1s. Current compensation is 15% below updated market rate.</p>
                <div className="mt-4 flex space-x-3">
                  <button onClick={() => executeAction("draft retention package")} className="px-5 py-2 bg-orange-500/20 text-orange-300 text-xs font-bold rounded-lg hover:bg-orange-500/30 border border-orange-500/30 transition shadow-[0_0_10px_rgba(249,115,22,0.15)]">Draft Retention Package</button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-black/40 backdrop-blur-xl p-6 relative overflow-hidden">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center">
              <Users className="w-5 h-5 text-emerald-400 mr-2" /> Candidate Pipeline (Manager View)
            </h2>
            <div className="space-y-4">
              {data?.candidates?.map((cand: any, i: number) => (
                <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h4 className="text-white font-bold">{cand.name}</h4>
                      <p className="text-xs text-emerald-400 font-mono">{cand.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">{cand.match}</div>
                      <div className="text-[10px] uppercase text-gray-500 font-bold">AI Match</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">"{cand.resume}"</p>
                  <button onClick={() => executeAction(`approve candidate ${cand.name}`)} className="text-xs px-3 py-1 bg-white/10 text-gray-300 rounded hover:bg-white/20 transition">Approve for Interview</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderMarketing = () => {
    const kpis = data?.kpis || [];
    const icons = [Users, TrendingUp, DollarSign];
    const colors = ["text-pink-400", "text-emerald-400", "text-rose-400"];
    const gradients = ["from-transparent via-pink-500 to-transparent", "from-transparent via-emerald-500 to-transparent", "from-transparent via-rose-500 to-transparent"];
    const analysis = data?.viral_analysis || {};

    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi: any, idx: number) => (
            <MetricCard key={kpi.title} title={kpi.title} value={kpi.value} trend={kpi.trend} isPositive={kpi.isPositive} icon={icons[idx]} colorClass={colors[idx]} gradientClass={gradients[idx]} delay={idx * 0.1} />
          ))}
        </div>
        <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-black/40 backdrop-blur-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <BrainCircuit className="w-5 h-5 text-pink-400 mr-2" /> AI Viral Media Analyzer
          </h2>
          <div className="space-y-4 relative z-10">
            {loading ? (
              <div className="h-40 flex items-center justify-center"><BrainCircuit className="w-8 h-8 text-pink-500 animate-pulse" /></div>
            ) : (
              <div className="p-6 bg-pink-500/5 border border-pink-500/20 rounded-xl hover:border-pink-500/40 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-pink-400 font-bold text-lg tracking-wide">{analysis.platform || "Analysis Engine"}</h4>
                  <span className="px-3 py-1 bg-pink-500/20 text-pink-300 text-xs font-bold rounded shadow-[0_0_10px_rgba(236,72,153,0.3)]">{analysis.views} Views</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Deconstruction (Why it went viral)</h5>
                    <p className="text-gray-300 text-sm leading-relaxed">{analysis.hook_analysis}</p>
                  </div>
                  <div>
                    <h5 className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">AI Recommendation (Next Action)</h5>
                    <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-pink-500/50 pl-3 py-1">{analysis.next_idea}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <button onClick={() => executeAction("auto-generate script")} className="px-5 py-2.5 bg-pink-500/20 text-pink-300 text-xs font-bold rounded-lg hover:bg-pink-500/30 border border-pink-500/30 transition shadow-[0_0_15px_rgba(236,72,153,0.2)]">Auto-Generate Script</button>
                  <button onClick={() => executeAction("approve campaign spend")} className="px-5 py-2.5 bg-white/5 text-gray-300 text-xs font-bold rounded-lg hover:bg-white/10 border border-white/10 transition">Approve Campaign Spend</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderFinance = () => {
    const kpis = data?.kpis || [];
    const icons = [DollarSign, TrendingUp, Activity];
    const colors = ["text-yellow-400", "text-red-400", "text-emerald-400"];
    const gradients = ["from-transparent via-yellow-500 to-transparent", "from-transparent via-red-500 to-transparent", "from-transparent via-emerald-500 to-transparent"];
    const anomaly = data?.anomaly || {};
    const pnl = data?.pnl || [];

    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi: any, idx: number) => (
            <MetricCard key={kpi.title} title={kpi.title} value={kpi.value} trend={kpi.trend} isPositive={kpi.isPositive} icon={icons[idx]} colorClass={colors[idx]} gradientClass={gradients[idx]} delay={idx * 0.1} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-black/40 backdrop-blur-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center">
              <BrainCircuit className="w-5 h-5 text-yellow-400 mr-2" /> AI Sentinel
            </h2>
            <div className="space-y-4 relative z-10">
              <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-xl hover:border-yellow-500/40 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-yellow-400 font-bold text-lg tracking-wide">{anomaly.type}</h4>
                  <span className="px-3 py-1 bg-red-500/20 text-red-300 text-xs font-bold rounded shadow-[0_0_10px_rgba(239,68,68,0.3)]">CRITICAL LEAK</span>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{anomaly.details}</p>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button onClick={() => executeAction("freeze instances")} className="px-5 py-2.5 bg-yellow-500/20 text-yellow-300 text-xs font-bold rounded-lg hover:bg-yellow-500/30 border border-yellow-500/30 transition shadow-[0_0_15px_rgba(234,179,8,0.2)]">{anomaly.action}</button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-black/40 backdrop-blur-xl p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center">
              <Activity className="w-5 h-5 text-emerald-400 mr-2" /> Live Profit & Loss (P&L) Stream
            </h2>
            <div className="space-y-2">
               {pnl.map((item: any, i: number) => (
                 <div key={i} className={`flex justify-between p-3 rounded-lg border ${item.amount < 0 ? 'bg-red-500/5 border-red-500/10 text-red-300' : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-300'} font-mono text-sm`}>
                   <span>{item.category}</span>
                   <span className="font-bold">{item.amount < 0 ? '-' : ''}${Math.abs(item.amount).toLocaleString()}</span>
                 </div>
               ))}
               <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-white font-bold text-xl">
                 <span>NET PROFIT (EBITDA)</span>
                 <span className="text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]">$480,000</span>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderEngineering = () => {
    const kpis = data?.kpis || [];
    const icons = [Cpu, ShieldAlert, Activity];
    const colors = ["text-cyan-400", "text-red-400", "text-blue-400"];
    const gradients = ["from-transparent via-cyan-500 to-transparent", "from-transparent via-red-500 to-transparent", "from-transparent via-blue-500 to-transparent"];
    const health = data?.system_health || {};

    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi: any, idx: number) => (
            <MetricCard key={kpi.title} title={kpi.title} value={kpi.value} trend={kpi.trend} isPositive={kpi.isPositive} icon={icons[idx]} colorClass={colors[idx]} gradientClass={gradients[idx]} delay={idx * 0.1} />
          ))}
        </div>
        <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-black/40 backdrop-blur-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <BrainCircuit className="w-5 h-5 text-cyan-400 mr-2" /> AI Architecture Guard
          </h2>
          <div className="space-y-4 relative z-10">
            {loading ? (
              <div className="h-40 flex items-center justify-center"><BrainCircuit className="w-8 h-8 text-cyan-500 animate-pulse" /></div>
            ) : (
              <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-xl hover:border-cyan-500/40 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-cyan-400 font-bold text-lg tracking-wide">{health.incident}</h4>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs font-bold rounded shadow-[0_0_10px_rgba(249,115,22,0.3)]">PREDICTIVE ALERT</span>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{health.impact}</p>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button onClick={() => executeAction("rollback commit")} className="px-5 py-2.5 bg-cyan-500/20 text-cyan-300 text-xs font-bold rounded-lg hover:bg-cyan-500/30 border border-cyan-500/30 transition shadow-[0_0_15px_rgba(6,182,212,0.2)]">{health.action}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderLegal = () => {
    const kpis = data?.kpis || [];
    const icons = [Scale, CheckCircle2, DollarSign];
    const colors = ["text-slate-400", "text-emerald-400", "text-red-400"];
    const gradients = ["from-transparent via-slate-500 to-transparent", "from-transparent via-emerald-500 to-transparent", "from-transparent via-red-500 to-transparent"];
    const contract = data?.contract_analysis || {};

    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi: any, idx: number) => (
            <MetricCard key={kpi.title} title={kpi.title} value={kpi.value} trend={kpi.trend} isPositive={kpi.isPositive} icon={icons[idx]} colorClass={colors[idx]} gradientClass={gradients[idx]} delay={idx * 0.1} />
          ))}
        </div>
        <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-black/40 backdrop-blur-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <BrainCircuit className="w-5 h-5 text-slate-400 mr-2" /> AI Legal Risk Analyzer
          </h2>
          <div className="space-y-4 relative z-10">
            {loading ? (
              <div className="h-40 flex items-center justify-center"><BrainCircuit className="w-8 h-8 text-slate-500 animate-pulse" /></div>
            ) : (
              <div className="p-6 bg-slate-500/5 border border-slate-500/20 rounded-xl hover:border-slate-500/40 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-slate-300 font-bold text-lg tracking-wide">{contract.document}</h4>
                  <span className="px-3 py-1 bg-red-500/20 text-red-300 text-xs font-bold rounded shadow-[0_0_10px_rgba(239,68,68,0.3)]">{contract.risk_level}</span>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{contract.findings}</p>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button onClick={() => executeAction("reject contract")} className="px-5 py-2.5 bg-slate-500/20 text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-500/30 border border-slate-500/30 transition shadow-[0_0_15px_rgba(100,116,139,0.2)]">{contract.action}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderOverwatch = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
      <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-black/40 backdrop-blur-xl p-8 min-h-[600px]">
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Terminal className="w-6 h-6 text-purple-400 mr-3" /> Command Overwatch
            </h2>
            <p className="text-sm text-gray-400 mt-1">Immutable ledger of all autonomous actions and human overrides.</p>
          </div>
          <div className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-bold flex items-center shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse mr-2"></span>
            LIVE AUDIT TRAIL
          </div>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {ledger.map((entry) => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                className={`p-5 rounded-xl border backdrop-blur-sm transition-colors ${
                  entry.status === 'rejected' ? 'bg-red-500/5 border-red-500/20' : 
                  entry.requires_approval ? 'bg-blue-500/5 border-blue-500/20' : 
                  'bg-green-500/5 border-green-500/20'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="text-xs font-mono text-gray-500 w-16">{entry.timestamp}</div>
                    <div className="text-xs font-bold text-gray-300 bg-white/10 px-2 py-0.5 rounded border border-white/5">{entry.user}</div>
                    <div className="text-sm text-white font-medium italic">"{entry.command}"</div>
                  </div>
                  {entry.status === 'rejected' && <XCircle className="w-5 h-5 text-red-500" />}
                  {entry.status === 'approved' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  {entry.status === 'pending' && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
                </div>
                
                <div className="ml-[140px] pl-4 border-l-2 border-white/10 space-y-2">
                  <div className={`text-sm font-bold ${entry.status === 'rejected' ? 'text-red-400' : 'text-blue-400'}`}>
                    ↳ {entry.action}
                  </div>
                  <p className="text-xs text-gray-400 font-mono leading-relaxed">{entry.log}</p>
                  
                  {entry.requires_approval && entry.status === 'pending' && (
                    <div className="flex space-x-3 mt-4 pt-2">
                      <button onClick={() => executeAction(`approve ${entry.command}`)} className="px-4 py-1.5 bg-blue-500/20 text-blue-300 text-xs font-bold rounded border border-blue-500/30 hover:bg-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.15)] transition">Approve Execution</button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex w-full h-screen overflow-hidden font-sans selection:bg-blue-500/30">
      <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-3xl flex flex-col justify-between z-20">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-12">
            <BrainCircuit className="w-8 h-8 text-nexus-gold drop-shadow-[0_0_12px_rgba(240,185,11,0.6)]" />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent tracking-widest">NEXUS</span>
          </div>
          <nav className="space-y-1.5">
            {[
              { name: 'HQ', icon: Globe },
              { name: 'Overview', icon: LayoutDashboard },
              { name: 'Sales', icon: TrendingUp },
              { name: 'Marketing', icon: Smartphone },
              { name: 'Finance', icon: DollarSign },
              { name: 'Engineering', icon: Cpu },
              { name: 'Legal', icon: Scale },
              { name: 'HR', icon: Users },
              { name: 'Overwatch', icon: Terminal },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === item.name 
                    ? 'bg-gradient-to-r from-blue-500/20 to-transparent text-blue-400 border-l-2 border-blue-500 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]' 
                    : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.name && item.name === 'Overwatch' ? 'text-purple-400' : ''}`} />
                <span className="font-medium text-sm">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-x-hidden bg-[#030712]">
        <div className="absolute top-0 right-[20%] w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

        <header className="h-20 border-b border-white/5 bg-transparent flex items-center justify-between px-8 z-10">
          <div className={`flex items-center w-[35rem] bg-black/40 backdrop-blur-md rounded-xl px-4 py-2.5 border transition-all duration-300 shadow-inner ${
            isAiProcessing ? 'border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'border-white/5 focus-within:border-blue-500/50'
          }`}>
            {isAiProcessing ? (
              <Loader2 className="w-4 h-4 text-purple-400 mr-3 animate-spin" />
            ) : (
              <BrainCircuit className="w-4 h-4 text-gray-500 mr-3" />
            )}
            <input 
              type="text" 
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={handleAiSubmit}
              disabled={isAiProcessing}
              placeholder={isAiProcessing ? "AI Agent is processing command..." : "Ask Nexus AI to generate a report, analyze a reel, or take action..."}
              className="bg-transparent border-none outline-none text-sm w-full text-gray-200 placeholder-gray-600 disabled:opacity-50"
            />
          </div>
          
          <div className="flex items-center space-x-5">
            <button className="relative text-gray-500 hover:text-white transition">
              <Bell className="w-5 h-5" />
              <span className="absolute 1 top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-black shadow-[0_0_10px_rgba(239,68,68,1)]"></span>
            </button>
            <button className="text-gray-500 hover:text-white transition"><Settings className="w-5 h-5" /></button>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto z-10 relative scroll-smooth">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{activeTab}</h1>
              <p className="text-gray-400 text-sm flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                Connected to Nexus AI Engine (Live)
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'HQ' && <React.Fragment key="hq">{renderHQ()}</React.Fragment>}
            {activeTab === 'Overview' && <React.Fragment key="overview">{renderOverview()}</React.Fragment>}
            {activeTab === 'Sales' && <React.Fragment key="sales">{renderSales()}</React.Fragment>}
            {activeTab === 'Marketing' && <React.Fragment key="marketing">{renderMarketing()}</React.Fragment>}
            {activeTab === 'Finance' && <React.Fragment key="finance">{renderFinance()}</React.Fragment>}
            {activeTab === 'Engineering' && <React.Fragment key="engineering">{renderEngineering()}</React.Fragment>}
            {activeTab === 'Legal' && <React.Fragment key="legal">{renderLegal()}</React.Fragment>}
            {activeTab === 'HR' && <React.Fragment key="hr">{renderHR()}</React.Fragment>}
            {activeTab === 'Overwatch' && <React.Fragment key="overwatch">{renderOverwatch()}</React.Fragment>}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
