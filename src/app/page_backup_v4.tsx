"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, LayoutDashboard, TrendingUp, Users, DollarSign, 
  Activity, ShieldAlert, Search, Bell, Settings, ArrowUpRight, 
  ArrowDownRight, Server, Clock, Briefcase, UserCheck, Terminal,
  CheckCircle2, XCircle, Loader2, Smartphone, Scale, Cpu, Globe, Target, Fingerprint
} from 'lucide-react';
import createGlobe from 'cobe';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, LineChart, Line, ReferenceLine, Label
} from 'recharts';

// --- PREMIUM GLASSMORPHISM BUTTON ---
const ActionButton = ({ onClick, children, color = "blue", className = "" }: any) => {
  const colorMap: any = {
    blue: "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
    red: "bg-red-500/20 text-red-300 hover:bg-red-500/30 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]",
    cyan: "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]",
    orange: "bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)]",
    pink: "bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.15)]",
    yellow: "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.15)]",
    slate: "bg-slate-500/20 text-slate-300 hover:bg-slate-500/30 border-slate-500/30 shadow-[0_0_15px_rgba(100,116,139,0.15)]",
    emerald: "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-5 py-2.5 rounded-lg font-bold text-xs tracking-wide border transition-all ${colorMap[color]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

// --- SPATIAL BENTO GLASS CARD ---
const SpatialCard = ({ children, gradientClass = "from-transparent to-transparent", delay = 0, className = "" }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, y: -4, zIndex: 10 }}
      className={`relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-black/60 backdrop-blur-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(255,255,255,0.05),_0_0_40px_rgba(0,0,0,0.8)] hover:border-white/20 transition-all duration-300 overflow-hidden cursor-default select-none ${className}`}
    >
      <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r ${gradientClass} opacity-70`}></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// --- VISION OS LIQUID FADE WRAPPER ---
const VisionOsFade = ({ children, keyName }: any) => (
  <motion.div
    key={keyName}
    initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.97 }}
    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
    exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.03 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="space-y-6 origin-center"
  >
    {children}
  </motion.div>
);

// --- INTERACTIVE WEBGL GLOBE ---
const CobeGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  
  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;
    
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 400 * 2,
      height: 400 * 2,
      phi: 0,
      theta: 0.15,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.2],
      markerColor: [1, 0.2, 0.2],
      glowColor: [0.1, 0.1, 0.4],
      markers: [
        { location: [37.7595, -122.4367], size: 0.05 }, // SF
        { location: [51.5074, -0.1278], size: 0.06 },   // London
        { location: [35.6895, 139.6917], size: 0.08 },  // Tokyo
        { location: [1.3521, 103.8198], size: 0.05 }    // Singapore
      ],
      onRender: (state) => {
        if (pointerInteracting.current === null) {
          phi += 0.003;
        }
        state.phi = phi + pointerInteractionMovement.current;
      }
    });
    
    return () => globe.destroy();
  }, []);
  
  return (
    <div style={{ width: '100%', maxWidth: 400, aspectRatio: 1, margin: 'auto', position: 'relative' }}>
      <canvas 
        ref={canvasRef} 
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.01;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.01;
          }
        }}
        style={{ width: '100%', height: '100%', opacity: 0.9, contain: 'layout paint size', cursor: 'grab' }} 
      />
      
      {/* Floating Telemetry Overlays */}
      <div className="absolute top-[30%] left-[20%] pointer-events-none flex flex-col items-center">
         <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)] animate-ping absolute"></span>
         <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)] relative"></span>
         <div className="mt-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-red-500/30 text-[8px] text-red-300 font-mono font-bold">NA-WEST: ACTIVE</div>
      </div>
      
      <div className="absolute top-[25%] right-[25%] pointer-events-none flex flex-col items-center">
         <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,1)] animate-ping absolute" style={{ animationDelay: '0.5s' }}></span>
         <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,1)] relative"></span>
         <div className="mt-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-purple-500/30 text-[8px] text-purple-300 font-mono font-bold">EU-CENTRAL: SYNCING</div>
      </div>

      <div className="absolute bottom-[35%] right-[20%] pointer-events-none flex flex-col items-center">
         <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)] animate-ping absolute" style={{ animationDelay: '1s' }}></span>
         <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)] relative"></span>
         <div className="mt-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/30 text-[8px] text-emerald-300 font-mono font-bold">AP-SOUTH: OPTIMAL</div>
      </div>
    </div>  );
};

const GlobalSectorHeatmap = () => {
  const sectors = ['TECH', 'ENRG', 'FINC', 'DFNS', 'HLTH', 'RETL', 'LOGS', 'MEDA', 'AGRI', 'AERO', 'CYBR', 'MNFG', 'BIOT', 'TELC', 'AUTO', 'CHEM'];
  const [tiles, setTiles] = useState<number[]>([]);

  useEffect(() => {
    setTiles(Array(16).fill(0).map(() => Math.random()));
    const interval = setInterval(() => {
      setTiles(prev => prev.map(val => {
        if (Math.random() > 0.8) return Math.random();
        return Math.max(0, Math.min(1, val + (Math.random() - 0.5) * 0.3));
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center p-6">
      <div className="grid grid-cols-4 gap-2 w-full max-w-[280px] mx-auto bg-black/40 p-2 rounded-xl border border-white/5 shadow-inner">
        {tiles.map((val, i) => {
          let bgColor = 'bg-blue-500/10 text-blue-500/40'; 
          let border = 'border-white/5';
          if (val > 0.75) { bgColor = 'bg-emerald-500/80 text-white shadow-[0_0_12px_rgba(16,185,129,0.8)] z-10 scale-105'; border = 'border-emerald-400'; }
          else if (val < 0.25) { bgColor = 'bg-red-500/80 text-white shadow-[0_0_12px_rgba(239,68,68,0.8)] z-10 scale-105'; border = 'border-red-400'; }
          
          return (
            <div 
              key={i} 
              className={`aspect-square rounded flex items-center justify-center ${bgColor} border ${border} transition-all duration-700 ease-in-out`}
            >
              <span className="text-[10px] font-extrabold tracking-wider">{sectors[i]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};



const ThreatRadar = () => {
  return (
    <div className="relative w-56 h-56 flex items-center justify-center rounded-full shadow-[0_0_40px_rgba(16,185,129,0.15)] overflow-hidden bg-[#020617] border-4 border-black border-t-emerald-500/30 border-r-emerald-500/10">
      {/* Grid rings */}
      <div className="absolute inset-4 border border-emerald-500/20 rounded-full"></div>
      <div className="absolute inset-12 border border-emerald-500/20 rounded-full border-dashed"></div>
      <div className="absolute inset-20 border border-emerald-500/30 rounded-full"></div>
      
      {/* Crosshairs */}
      <div className="absolute w-full h-[1px] bg-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
      <div className="absolute h-full w-[1px] bg-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>

      {/* Sweeping Sonar Beam */}
      <div className="absolute inset-0 rounded-full animate-[spin_3s_linear_infinite]" style={{ background: 'conic-gradient(from 0deg, transparent 60%, rgba(16,185,129,0.15) 95%, rgba(16,185,129,0.8) 100%)' }}>
        <div className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-emerald-300 shadow-[0_0_15px_rgba(16,185,129,1)]"></div>
      </div>

      {/* Threats / Blips */}
      <div className="absolute top-[35%] left-[28%] w-2 h-2 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,1)]" style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
      <div className="absolute top-[35%] left-[28%] w-2 h-2 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,1)] relative z-10"></div>
      
      <div className="absolute bottom-[20%] right-[35%] w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,1)]" style={{ animation: 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s' }}></div>
      <div className="absolute bottom-[20%] right-[35%] w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,1)] relative z-10"></div>

      {/* Core Node */}
      <div className="w-5 h-5 bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,1)] z-10 animate-pulse flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
      </div>
    </div>
  );
};


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
      const allowedEndpoints = ['overview', 'sales', 'hr', 'marketing', 'finance', 'engineering', 'legal', 'hq', 'secops'];
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

  const [liveData, setLiveData] = useState<any[]>([]);

    useEffect(() => {
    if (data?.chronos_data) {
      // Initialize with 20 real data points and pad the rest with empty data to create the "empty space" to the right
      const initialRealData = data.chronos_data.slice(0, 20);
      const paddedData = [...initialRealData];
      for (let i = 0; i < 20; i++) {
        paddedData.push({ name: '', price: null });
      }
      setLiveData(paddedData);

      const interval = setInterval(() => {
        setLiveData(prev => {
          if (!prev || prev.length === 0) return prev;
          const newArr = [...prev];
          
          const nextEmptyIndex = newArr.findIndex(item => item.price === null);
          const lastValidItem = nextEmptyIndex !== -1 ? newArr[nextEmptyIndex - 1] : newArr[newArr.length - 1];
          const lastVal = lastValidItem?.revenue || 30;
          
          const newPoint = { 
            name: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" }), 
            price: Math.max(10, Math.min(100, lastVal + (Math.random() * 20 - 10)))
          };

          if (nextEmptyIndex !== -1) {
            newArr[nextEmptyIndex] = newPoint;
          } else {
            newArr.shift();
            newArr.push(newPoint);
          }
          return newArr;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [data]);

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

  const MetricCard = ({ title, value, trend, isPositive, icon: Icon, colorClass, gradientClass, delay }: any) => {
    const SafeIcon = Icon || Activity;
    return (
      <SpatialCard delay={delay} gradientClass={gradientClass}>
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-2xl bg-black/40 border border-white/5 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)] ${colorClass}`}>
            <SafeIcon className="w-6 h-6 drop-shadow-lg" />
          </div>
          <span className={`flex items-center text-xs font-bold px-3 py-1.5 rounded-full border shadow-[inset_0_1px_3px_rgba(255,255,255,0.2)] ${
            isPositive ? 'bg-gradient-to-b from-green-500/20 to-green-600/10 text-green-400 border-green-500/30' : 'bg-gradient-to-b from-red-500/20 to-red-600/10 text-red-400 border-red-500/30'
          }`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1"/> : <ArrowDownRight className="w-3 h-3 mr-1"/>}
            {trend}
          </span>
        </div>
        <h3 className="text-gray-400 text-sm font-semibold mb-1 tracking-wide">{title}</h3>
        <span className="text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {loading ? <div className="h-10 w-24 bg-white/10 animate-pulse rounded mt-1"></div> : value}
        </span>
      </SpatialCard>
    );
  };

  const renderOverview = () => {
    const kpis = data?.kpis || [];
    const icons = [DollarSign, TrendingUp, Users, Server];
    const colors = ["text-emerald-400", "text-blue-400", "text-purple-400", "text-amber-400"];
    const gradients = ["from-transparent via-emerald-500 to-transparent", "from-transparent via-blue-500 to-transparent", "from-transparent via-purple-500 to-transparent", "from-transparent via-amber-500 to-transparent"];

    const lastValidItem = [...liveData].reverse().find(item => item.price !== null);
    const currentPrice = lastValidItem?.price;

    return (
      <VisionOsFade keyName="overview">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi: any, idx: number) => (
            <React.Fragment key={kpi.title}>{MetricCard({ title: kpi.title, value: kpi.value, trend: kpi.trend, isPositive: kpi.isPositive, icon: icons[idx], colorClass: colors[idx], gradientClass: gradients[idx], delay: idx * 0.1  })}</React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SpatialCard delay={0.4} className="lg:col-span-2 h-[450px] flex flex-col p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h2 className="text-xl font-extrabold text-white tracking-tight drop-shadow-md">Live Nexus Stock Price (NEX)</h2>
              <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs font-mono text-blue-400 flex items-center shadow-inner">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse shadow-[0_0_8px_rgba(59,130,246,1)]"></span> STREAMING
              </div>
            </div>
            <div className="w-full h-72 mt-2 relative z-10">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <BrainCircuit className="w-8 h-8 text-blue-500 animate-pulse" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={liveData.length > 0 ? liveData : (data?.chronos_data || [])} margin={{ top: 20 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0} />
                        <stop offset="70%" stopColor="#0ea5e9" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#fff" stopOpacity={1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} minTickGap={20} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dx={-10} tickFormatter={(val: any)=>`$${val}`} domain={['auto', 'auto']} />
                    <RechartsTooltip cursor={{stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '5 5'}} contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(14,165,233,0.3)', borderRadius: '12px', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0,0,0,0.8)' }} itemStyle={{ color: '#0ea5e9', fontWeight: 'bold' }} />
                    <ReferenceLine y={currentPrice} stroke="rgba(14,165,233,0.3)" strokeDasharray="3 3">
                      <Label value={`$${currentPrice?.toFixed(2) || '0.00'}`} position="insideRight" offset={10} fill="#fff" fontSize={14} fontWeight="bold" style={{ filter: 'drop-shadow(0px 0px 5px rgba(14,165,233,1))' }} />
                    </ReferenceLine>
                    <Line type="linear" isAnimationActive={false} dataKey="price" stroke="url(#colorRevenue)" strokeWidth={1.5} dot={false} activeDot={{ r: 5, fill: '#fff', stroke: '#0ea5e9', strokeWidth: 2 }} style={{ filter: 'drop-shadow(0px 0px 8px rgba(14,165,233,0.8))' }} />
                    
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </SpatialCard>

          <SpatialCard delay={0.5} className="lg:col-span-1 h-[450px] flex flex-col p-8 overflow-hidden">
            <h2 className="text-xl font-extrabold text-white tracking-tight drop-shadow-md mb-2 flex items-center">
              <Globe className="w-5 h-5 text-purple-400 mr-2" /> Global Sector Heatmap
            </h2>
            <p className="text-xs text-gray-400 mb-2">Real-time Wall Street matrix tracking global sector volatility.</p>
            
            <div className="flex-1 w-full relative flex items-center justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-600/20 rounded-full blur-[60px] pointer-events-none mix-blend-screen"></div>
              <GlobalSectorHeatmap />
            </div>
          </SpatialCard>
        </div>
      </VisionOsFade>
    );
  };

  const renderHQ = () => {
    const intel = data?.global_intel || [];
    const schedule = data?.ceo_schedule || [];
    const tasks = data?.cascading_tasks || [];

    return (
      <VisionOsFade keyName="hq">
        <SpatialCard className="flex items-center shadow-[0_0_30px_rgba(239,68,68,0.15)] border-red-500/20 p-4 rounded-2xl">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500 animate-pulse"></div>
          <div className="flex items-center text-red-500 font-extrabold text-xs tracking-widest mr-6 bg-red-500/10 px-4 py-2 rounded shadow-inner">
            <Globe className="w-4 h-4 mr-2" /> GLOBAL INTEL
          </div>
          <div className="flex-1 w-full relative h-auto min-h-[24px]">
            <div className="flex flex-wrap gap-x-8 gap-y-2 w-full">
              {intel.map((item: any, i: number) => (
                <div key={i} className="flex items-center text-sm whitespace-nowrap">
                  <span className="text-gray-500 font-mono mr-2">{item.time}</span>
                  <span className="text-gray-300 font-bold uppercase mr-2 bg-white/5 px-2 py-0.5 rounded">[{item.source}]</span>
                  <span className="text-white mr-2 tracking-wide truncate max-w-[400px]">{item.event}</span>
                  <span className="text-blue-400 italic">({item.impact})</span>
                </div>
              ))}
            </div>
          </div>
        </SpatialCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
<SpatialCard delay={0.2} className="p-8">
            <h2 className="text-xl font-extrabold text-white mb-8 flex items-center drop-shadow-md">
              <Clock className="w-6 h-6 text-purple-400 mr-3" /> Immersive Itinerary
            </h2>
            <div className="space-y-6">
              {schedule.map((meeting: any, i: number) => (
                <div key={i} className="relative pl-8 border-l-2 border-white/10 pb-4">
                  <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[9px] top-1 shadow-[0_0_15px_rgba(168,85,247,0.9),inset_0_2px_4px_rgba(255,255,255,0.6)] border border-white/20"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-bold text-lg">{meeting.title}</h3>
                    <span className="text-sm font-mono text-purple-300 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">{meeting.time}</span>
                  </div>
                  <div className="flex space-x-3 mb-4">
                    <span className="px-3 py-1 bg-black/40 border border-white/10 rounded-full text-xs text-gray-300 flex items-center shadow-inner"><Users className="w-3 h-3 mr-2"/> {meeting.attendees}</span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-inner ${meeting.threat.includes('High') ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-green-500/20 text-green-400 border border-green-500/40 shadow-[0_0_10px_rgba(34,197,94,0.3)]'}`}>Risk: {meeting.threat}</span>
                  </div>
                  <div className="p-4 bg-black/40 border border-white/10 rounded-xl shadow-inner relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                    <div className="absolute left-0 top-0 w-1 h-full bg-purple-500/50 group-hover:bg-purple-400 transition-colors"></div>
                    <h4 className="text-[10px] uppercase text-purple-400 font-extrabold mb-2 flex items-center"><BrainCircuit className="w-3 h-3 mr-1"/> AI Prep Notes</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{meeting.ai_note}</p>
                  </div>
                </div>
              ))}
            </div>
          </SpatialCard>
<SpatialCard delay={0.3} className="p-10 min-h-[600px]">
          <h2 className="text-3xl font-extrabold text-white mb-8 flex items-center drop-shadow-md">
            <Target className="w-8 h-8 text-blue-400 mr-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" /> Chain of Command Simulator
          </h2>
          <p className="text-gray-400 mb-10 text-sm">Visualizing the automated breakdown of executive vision into actionable sub-tasks across AI agents.</p>
          
          <div className="relative pl-6 pt-4 border-l-2 border-white/10">
            {tasks.map((ceoTask: any, i: number) => (
              <div key={i} className="mb-10 relative">
                {/* CEO Level Node */}
                <div className="absolute w-6 h-[2px] bg-blue-500/50 -left-[26px] top-6"></div>
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[31px] top-4 shadow-[0_0_15px_rgba(59,130,246,0.9),inset_0_2px_4px_rgba(255,255,255,0.6)] border border-white/20"></div>
                
                <div className="bg-black/40 border border-blue-500/30 rounded-2xl p-6 shadow-inner relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded shadow-inner">{ceoTask.role}</span>
                  <h3 className="text-white text-xl font-bold mt-4 mb-2 relative z-10 drop-shadow">"{ceoTask.directive}"</h3>
                </div>
                
                {/* VP Level Nodes */}
                <div className="mt-8 ml-8 space-y-8 relative border-l-2 border-white/10 pl-6">
                  {ceoTask.children?.map((vpTask: any, j: number) => (
                    <div key={j} className="relative">
                      <div className="absolute w-6 h-[2px] bg-purple-500/50 -left-[26px] top-6"></div>
                      <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[29px] top-[21px] shadow-[0_0_10px_rgba(168,85,247,0.8),inset_0_2px_2px_rgba(255,255,255,0.5)] border border-white/20"></div>
                      
                      <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-purple-500/30 transition-all shadow-lg group">
                         <span className="text-xs text-purple-400 font-mono bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">{vpTask.role}</span>
                         <p className="text-sm text-gray-200 mt-3">{vpTask.directive}</p>
                      </div>

                      {/* Manager/Junior Level Nodes */}
                      <div className="mt-6 ml-8 space-y-4 relative border-l-2 border-white/10 pl-6">
                        {vpTask.children?.map((juniorTask: any, k: number) => (
                          <div key={k} className="relative">
                            <div className="absolute w-6 h-[2px] bg-emerald-500/50 -left-[26px] top-4"></div>
                            <div className="absolute w-2 h-2 bg-emerald-500 rounded-full -left-[27px] top-[15px] shadow-[0_0_10px_rgba(16,185,129,0.8)] border border-white/20"></div>
                            
                            <div className="bg-black/50 border border-white/5 rounded-lg p-3 hover:border-emerald-500/30 transition-all flex items-center justify-between group cursor-pointer">
                               <div>
                                 <span className="text-[10px] text-gray-500 font-mono mr-3">{juniorTask.role}</span>
                                 <span className="text-xs text-gray-300">{juniorTask.directive}</span>
                               </div>
                               <span className={`text-[9px] uppercase font-extrabold px-2 py-0.5 rounded shadow-inner ${juniorTask.status === 'in_progress' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>{juniorTask.status}</span>
                            </div>
                            <div className="mt-3"><ActionButton color="blue" onClick={() => executeAction("approve cascade task")}>Approve / Override</ActionButton></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SpatialCard>
</div>
      </VisionOsFade>
    );
  };

  const renderSales = () => {
    const kpis = data?.kpis || [];
    const icons = [Users, TrendingUp, Clock];
    const colors = ["text-cyan-400", "text-emerald-400", "text-rose-400"];
    const gradients = ["from-transparent via-cyan-500 to-transparent", "from-transparent via-emerald-500 to-transparent", "from-transparent via-rose-500 to-transparent"];
    const sdr = data?.autonomous_sdr;

    return (
      <VisionOsFade keyName="sales">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi: any, idx: number) => (
            <React.Fragment key={kpi.title}>{MetricCard({ title: kpi.title, value: kpi.value, trend: kpi.trend, isPositive: kpi.isPositive, icon: icons[idx], colorClass: colors[idx], gradientClass: gradients[idx], delay: idx * 0.1  })}</React.Fragment>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpatialCard delay={0.2} className="p-8">
            <h2 className="text-xl font-extrabold text-white mb-8 flex items-center drop-shadow-md">
              <Activity className="w-6 h-6 text-cyan-400 mr-3" /> Live Deal Velocity
            </h2>
            <div className="space-y-8">
              {data?.pipeline_data?.map((stage: any, idx: number) => (
                <div key={stage.name} className="relative">
                  <div className="flex justify-between text-sm font-bold text-gray-300 mb-3">
                    <span className="uppercase tracking-widest">{stage.name}</span>
                    <span className="text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">${stage.val}k</span>
                  </div>
                  <div className="h-2.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/5 shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(stage.val / 400) * 100}%` }}
                      transition={{ duration: 1.5, delay: idx * 0.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-300 shadow-[0_0_20px_rgba(34,211,238,0.8)] relative"
                    >
                      <div className="absolute inset-0 bg-white/20 w-full h-full animate-[pulse_2s_ease-in-out_infinite]"></div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </SpatialCard>

          <SpatialCard delay={0.3} className="p-8 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <h2 className="text-xl font-extrabold text-white mb-2 flex items-center drop-shadow-md">
              <Search className="w-6 h-6 text-cyan-400 mr-3" /> Autonomous SDR Leads
            </h2>
            <p className="text-sm text-gray-400 mb-8 font-medium">AI generated {sdr?.leads_found} hyper-targeted leads while you were asleep.</p>
            
            <div className="flex-1 space-y-4 overflow-y-auto pr-2 relative z-10">
              {sdr?.leads?.map((lead: any, i: number) => (
                <div key={i} className="p-5 bg-black/40 border border-white/10 rounded-2xl shadow-inner hover:border-cyan-500/30 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-white font-bold text-lg">{lead.company}</h3>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-[10px] font-bold rounded uppercase tracking-wider border border-cyan-500/20">{lead.source}</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed border-l-2 border-cyan-500/50 pl-4">{lead.rationale}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-white/10">
               <ActionButton color="cyan" onClick={() => executeAction("approve lead sequence")} className="w-full py-4 text-sm">
                 Approve & Transfer to Sales Manager
               </ActionButton>
            </div>
          </SpatialCard>
        </div>
      </VisionOsFade>
    );
  };
  const renderMarketing = () => {
    const kpis = data?.kpis || [];
    const icons = [Users, TrendingUp, DollarSign];
    const colors = ["text-pink-400", "text-emerald-400", "text-rose-400"];
    const gradients = ["from-transparent via-pink-500 to-transparent", "from-transparent via-emerald-500 to-transparent", "from-transparent via-rose-500 to-transparent"];
    const analysis = data?.viral_analysis || {};

    return (
      <VisionOsFade keyName="marketing">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi: any, idx: number) => (
            <React.Fragment key={kpi.title}>{MetricCard({ title: kpi.title, value: kpi.value, trend: kpi.trend, isPositive: kpi.isPositive, icon: icons[idx], colorClass: colors[idx], gradientClass: gradients[idx], delay: idx * 0.1  })}</React.Fragment>
          ))}
        </div>
        <SpatialCard delay={0.2} className="p-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <h2 className="text-xl font-extrabold text-white mb-8 flex items-center drop-shadow-md">
            <BrainCircuit className="w-6 h-6 text-pink-400 mr-3" /> AI Viral Media Analyzer
          </h2>
          <div className="space-y-4 relative z-10">
            {loading ? (
              <div className="h-40 flex items-center justify-center"><BrainCircuit className="w-10 h-10 text-pink-500 animate-pulse" /></div>
            ) : (
              <div className="p-8 bg-black/40 border border-white/10 rounded-3xl shadow-inner hover:border-pink-500/30 transition-colors">
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-white/10">
                  <h4 className="text-white font-extrabold text-2xl tracking-wide">{analysis.platform || "Analysis Engine"}</h4>
                  <span className="px-4 py-1.5 bg-pink-500/20 text-pink-300 text-sm font-extrabold rounded-lg shadow-[0_0_15px_rgba(236,72,153,0.4)] border border-pink-500/30">{analysis.views} Views</span>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="text-xs text-pink-400 uppercase font-extrabold tracking-widest mb-2 flex items-center"><Search className="w-3 h-3 mr-2"/> Deconstruction (Why it went viral)</h5>
                    <p className="text-gray-200 text-base leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">{analysis.hook_analysis}</p>
                  </div>
                  <div>
                    <h5 className="text-xs text-blue-400 uppercase font-extrabold tracking-widest mb-2 flex items-center"><Target className="w-3 h-3 mr-2"/> AI Recommendation (Next Action)</h5>
                    <p className="text-gray-200 text-base leading-relaxed border-l-4 border-blue-500/50 bg-blue-500/5 pl-4 py-3 rounded-r-xl">{analysis.next_idea}</p>
                  </div>
                </div>
                
                <div className="mt-8 flex space-x-4">
                  <ActionButton color="pink" onClick={() => executeAction("auto-generate script")}>Auto-Generate Script</ActionButton>
                  <ActionButton color="slate" onClick={() => executeAction("approve campaign spend")}>Approve Campaign Spend</ActionButton>
                </div>
              </div>
            )}
          </div>
        </SpatialCard>
      </VisionOsFade>
    );
  };
  const renderHR = () => {
    const kpis = data?.kpis || [];
    const icons = [Briefcase, ShieldAlert, UserCheck];
    const colors = ["text-blue-400", "text-orange-400", "text-emerald-400"];
    const gradients = ["from-transparent via-blue-500 to-transparent", "from-transparent via-orange-500 to-transparent", "from-transparent via-emerald-500 to-transparent"];

    return (
      <VisionOsFade keyName="hr">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi: any, idx: number) => (
            <React.Fragment key={kpi.title}>{MetricCard({ title: kpi.title, value: kpi.value, trend: kpi.trend, isPositive: kpi.isPositive, icon: icons[idx], colorClass: colors[idx], gradientClass: gradients[idx], delay: idx * 0.1  })}</React.Fragment>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpatialCard delay={0.2} className="p-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <h2 className="text-xl font-extrabold text-white mb-8 flex items-center drop-shadow-md">
              <BrainCircuit className="w-6 h-6 text-orange-400 mr-3" /> AI Flight Risk Analysis
            </h2>
            <div className="space-y-4 relative z-10">
              <div className="p-6 bg-black/40 border border-white/10 rounded-2xl shadow-inner hover:border-orange-500/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-white font-bold text-lg tracking-wide">Senior DevOps Engineer - EMEA</h4>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-[10px] font-extrabold tracking-widest rounded border border-orange-500/40 shadow-[0_0_10px_rgba(249,115,22,0.3)]">HIGH RISK</span>
                </div>
                <p className="text-gray-300 text-sm mt-3 leading-relaxed">AI detected 30% drop in Slack activity and skipped 2 consecutive 1:1s. Current compensation is 15% below updated market rate.</p>
                <div className="mt-6">
                  <ActionButton color="orange" onClick={() => executeAction("draft retention package")}>Draft Retention Package</ActionButton>
                </div>
              </div>
            </div>
          </SpatialCard>

          <SpatialCard delay={0.3} className="p-8">
            <h2 className="text-xl font-extrabold text-white mb-8 flex items-center drop-shadow-md">
              <Users className="w-6 h-6 text-emerald-400 mr-3" /> Candidate Pipeline
            </h2>
            <div className="space-y-4">
              {data?.candidates?.map((cand: any, i: number) => (
                <div key={i} className="p-5 bg-black/40 border border-white/10 rounded-2xl shadow-inner hover:border-emerald-500/30 transition-all group">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="text-white font-bold text-lg">{cand.name}</h4>
                      <p className="text-xs text-emerald-400 font-mono bg-emerald-500/10 inline-block px-2 py-0.5 rounded border border-emerald-500/20 mt-1">{cand.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-emerald-500 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]">{cand.match}</div>
                      <div className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">AI Match</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed mb-5 italic border-l-2 border-emerald-500/30 pl-4">"{cand.resume}"</p>
                  <ActionButton color="emerald" onClick={() => executeAction(`approve candidate ${cand.name}`)}>Approve for Interview</ActionButton>
                </div>
              ))}
            </div>
          </SpatialCard>
        </div>
      </VisionOsFade>
    );
  };
  const renderEngineering = () => {
    const kpis = data?.kpis || [];
    const icons = [Cpu, ShieldAlert, Activity];
    const colors = ["text-cyan-400", "text-red-400", "text-blue-400"];
    const gradients = ["from-transparent via-cyan-500 to-transparent", "from-transparent via-red-500 to-transparent", "from-transparent via-blue-500 to-transparent"];
    const health = data?.system_health || {};

    return (
      <VisionOsFade keyName="engineering">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi: any, idx: number) => (
            <React.Fragment key={kpi.title}>{MetricCard({ title: kpi.title, value: kpi.value, trend: kpi.trend, isPositive: kpi.isPositive, icon: icons[idx], colorClass: colors[idx], gradientClass: gradients[idx], delay: idx * 0.1  })}</React.Fragment>
          ))}
        </div>
        <SpatialCard delay={0.2} className="p-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <h2 className="text-xl font-extrabold text-white mb-8 flex items-center drop-shadow-md">
            <BrainCircuit className="w-6 h-6 text-cyan-400 mr-3" /> AI Architecture Guard
          </h2>
          <div className="space-y-4 relative z-10">
            {loading ? (
              <div className="h-40 flex items-center justify-center"><BrainCircuit className="w-10 h-10 text-cyan-500 animate-pulse" /></div>
            ) : (
              <div className="p-8 bg-black/40 border border-cyan-500/30 rounded-3xl shadow-inner">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-white font-bold text-xl tracking-wide">{health.incident}</h4>
                  <span className="px-4 py-1.5 bg-orange-500/20 text-orange-400 text-xs font-extrabold tracking-widest rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.4)] border border-orange-500/40 animate-pulse">PREDICTIVE ALERT</span>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300 text-base leading-relaxed bg-white/5 p-4 rounded-xl">{health.impact}</p>
                </div>
                <div className="mt-8">
                  <ActionButton color="cyan" onClick={() => executeAction("rollback commit")}>{health.action}</ActionButton>
                </div>
              </div>
            )}
          </div>
        </SpatialCard>
      </VisionOsFade>
    );
  };
  const renderLegal = () => {
    const kpis = data?.kpis || [];
    const icons = [Scale, CheckCircle2, DollarSign];
    const colors = ["text-slate-400", "text-emerald-400", "text-red-400"];
    const gradients = ["from-transparent via-slate-500 to-transparent", "from-transparent via-emerald-500 to-transparent", "from-transparent via-red-500 to-transparent"];
    const contract = data?.contract_analysis || {};

    return (
      <VisionOsFade keyName="legal">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi: any, idx: number) => (
            <React.Fragment key={kpi.title}>{MetricCard({ title: kpi.title, value: kpi.value, trend: kpi.trend, isPositive: kpi.isPositive, icon: icons[idx], colorClass: colors[idx], gradientClass: gradients[idx], delay: idx * 0.1  })}</React.Fragment>
          ))}
        </div>
        <SpatialCard delay={0.2} className="p-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-slate-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <h2 className="text-xl font-extrabold text-white mb-8 flex items-center drop-shadow-md">
            <BrainCircuit className="w-6 h-6 text-slate-400 mr-3" /> AI Legal Risk Analyzer
          </h2>
          <div className="space-y-4 relative z-10">
            {loading ? (
              <div className="h-40 flex items-center justify-center"><BrainCircuit className="w-10 h-10 text-slate-500 animate-pulse" /></div>
            ) : (
              <div className="p-8 bg-black/40 border border-slate-500/30 rounded-3xl shadow-inner">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-white font-bold text-xl tracking-wide">{contract.document}</h4>
                  <span className="px-4 py-1.5 bg-red-500/20 text-red-400 text-xs font-extrabold tracking-widest rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.5)] border border-red-500/40">EXTREME RISK</span>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300 text-base leading-relaxed bg-white/5 p-4 rounded-xl border-l-4 border-red-500">{contract.findings}</p>
                </div>
                <div className="mt-8">
                  <ActionButton color="slate" onClick={() => executeAction("reject contract")}>{contract.action}</ActionButton>
                </div>
              </div>
            )}
          </div>
        </SpatialCard>
      </VisionOsFade>
    );
  };

  const renderFinance = () => {
    const kpis = data?.kpis || [];
    const icons = [DollarSign, TrendingUp, Activity];
    const colors = ["text-yellow-400", "text-red-400", "text-emerald-400"];
    const gradients = ["from-transparent via-yellow-500 to-transparent", "from-transparent via-red-500 to-transparent", "from-transparent via-emerald-500 to-transparent"];
    const pnl = data?.pnl || [];
    const maRadar = data?.ma_radar || [];

    return (
      <VisionOsFade keyName="finance">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi: any, idx: number) => (
            <React.Fragment key={kpi.title}>{MetricCard({ title: kpi.title, value: kpi.value, trend: kpi.trend, isPositive: kpi.isPositive, icon: icons[idx], colorClass: colors[idx], gradientClass: gradients[idx], delay: idx * 0.1  })}</React.Fragment>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpatialCard delay={0.2} className="p-8">
            <h2 className="text-xl font-extrabold text-white mb-8 flex items-center drop-shadow-md">
              <Activity className="w-6 h-6 text-emerald-400 mr-3" /> Live Profit & Loss Stream
            </h2>
            <div className="space-y-3 bg-black/40 p-6 rounded-2xl border border-white/5 shadow-inner">
               {pnl.map((item: any, i: number) => (
                 <div key={i} className={`flex justify-between p-4 rounded-xl border ${item.amount < 0 ? 'bg-red-500/5 border-red-500/10 text-red-300' : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-300'} font-mono text-sm shadow-sm`}>
                   <span className="font-bold tracking-wide">{item.category}</span>
                   <span className="font-bold text-base">{item.amount < 0 ? '-' : ''}${Math.abs(item.amount).toLocaleString()}</span>
                 </div>
               ))}
               <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center text-white font-bold text-2xl">
                 <span className="tracking-wider">NET PROFIT</span>
                 <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)] bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">$480,000</span>
               </div>
            </div>
          </SpatialCard>

          <SpatialCard delay={0.3} className="p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <h2 className="text-xl font-extrabold text-white mb-8 flex items-center drop-shadow-md">
              <Search className="w-6 h-6 text-cyan-400 mr-3" /> AI M&A Radar
            </h2>
            <p className="text-sm text-gray-400 mb-6">Autonomous scan of vulnerable competitors for strategic acquisition.</p>
            
            <div className="space-y-4 relative z-10">
              {maRadar.map((target: any, i: number) => (
                <div key={i} className="p-5 bg-black/40 border border-white/10 rounded-2xl hover:border-cyan-500/40 transition-colors shadow-inner">
                   <div className="flex justify-between items-center mb-2">
                     <h4 className="text-white font-bold text-lg">{target.target}</h4>
                     <span className="text-cyan-400 font-mono font-bold bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/20">{target.valuation}</span>
                   </div>
                   <div className="flex items-center mb-4">
                     <span className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded mr-3 border border-white/5">Synergy Match:</span>
                     <span className="text-emerald-400 font-bold">{target.fit}</span>
                   </div>
                   <p className="text-sm text-gray-300 border-l-2 border-cyan-500/50 pl-3 italic">"{target.rationale}"</p>
                   <div className="mt-5">
                     <ActionButton color="cyan" onClick={() => executeAction(`initiate buyout protocol ${target.target}`)}>Draft Buyout LOI</ActionButton>
                   </div>
                </div>
              ))}
            </div>
          </SpatialCard>
        </div>
      </VisionOsFade>
    );
  };

  const renderSecOps = () => {
    const kpis = data?.kpis || [];
    const icons = [ShieldAlert, Fingerprint, Activity];
    const colors = ["text-red-400", "text-emerald-400", "text-blue-400"];
    const gradients = ["from-transparent via-red-500 to-transparent", "from-transparent via-emerald-500 to-transparent", "from-transparent via-blue-500 to-transparent"];
    const threats = data?.threats || [];

    return (
      <VisionOsFade keyName="secops">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi: any, idx: number) => (
            <React.Fragment key={kpi.title}>{MetricCard({ title: kpi.title, value: kpi.value, trend: kpi.trend, isPositive: kpi.isPositive, icon: icons[idx], colorClass: colors[idx], gradientClass: gradients[idx], delay: idx * 0.1  })}</React.Fragment>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <SpatialCard delay={0.2} className="lg:col-span-3 p-10 min-h-[500px]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <h2 className="text-2xl font-extrabold text-white mb-8 flex items-center drop-shadow-md">
            <ShieldAlert className="w-8 h-8 text-red-500 mr-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" /> Active Threat Radar
          </h2>
          
          <div className="overflow-x-auto relative z-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Source IP</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Attack Vector</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Region</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">AI Response</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {threats.map((threat: any, i: number) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-sm text-gray-300">{threat.ip}</td>
                    <td className="p-4 font-bold text-red-400 text-sm flex items-center"><XCircle className="w-4 h-4 mr-2"/> {threat.type}</td>
                    <td className="p-4 text-sm text-gray-300">{threat.region}</td>
                    <td className="p-4">
                      <span className={`text-[10px] uppercase font-extrabold px-3 py-1 rounded shadow-inner ${threat.status === 'Neutralized' || threat.status === 'Blocked' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'}`}>
                        {threat.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SpatialCard>

          <SpatialCard delay={0.3} className="lg:col-span-1 p-6 flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none"></div>
             <h2 className="text-[14px] font-extrabold text-white mb-10 tracking-widest uppercase drop-shadow-md text-center w-full relative z-10 flex items-center justify-center">
               <Activity className="w-5 h-5 text-emerald-400 inline mr-2" />
               Cyberpunk Sonar
             </h2>
             <ThreatRadar />
             <div className="mt-10 flex flex-col items-center w-full">
               <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">Scanning Sector</div>
               <div className="text-emerald-400 font-mono text-sm font-bold bg-emerald-500/10 px-4 py-1.5 rounded shadow-inner border border-emerald-500/20 w-full text-center">
                 ACTIVE
               </div>
             </div>
          </SpatialCard>
        </div>
      </VisionOsFade>
    );
  }

  const renderOverwatch = () => (
    <VisionOsFade keyName="overwatch">
      <SpatialCard delay={0} className="p-10 min-h-[700px] border-purple-500/20 shadow-[0_0_50px_rgba(168,85,247,0.1)]">
        <div className="flex justify-between items-center mb-10 pb-8 border-b border-white/10">
          <div>
            <h2 className="text-3xl font-extrabold text-white flex items-center drop-shadow-lg">
              <Terminal className="w-8 h-8 text-purple-400 mr-4 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" /> Command Overwatch
            </h2>
            <p className="text-sm text-gray-400 mt-2 font-medium tracking-wide">Immutable ledger of all autonomous actions and human overrides.</p>
          </div>
          <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-extrabold flex items-center shadow-[0_0_20px_rgba(168,85,247,0.3)] tracking-widest">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse mr-3 shadow-[0_0_10px_rgba(168,85,247,1)]"></span>
            LIVE AUDIT TRAIL
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence>
            {ledger.map((entry) => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, x: -30, filter: 'blur(10px)', height: 0 }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)', height: 'auto' }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                className={`p-6 rounded-2xl border backdrop-blur-md shadow-lg transition-colors ${
                  entry.status === 'rejected' ? 'bg-red-500/5 border-red-500/30' : 
                  entry.requires_approval ? 'bg-blue-500/5 border-blue-500/30' : 
                  'bg-green-500/5 border-green-500/30'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-5">
                    <div className="text-sm font-mono text-gray-400 w-20">{entry.timestamp}</div>
                    <div className="text-xs font-bold text-gray-200 bg-white/10 px-3 py-1 rounded-lg border border-white/10 shadow-inner">{entry.user}</div>
                    <div className="text-base text-white font-semibold italic tracking-wide">"{entry.command}"</div>
                  </div>
                  {entry.status === 'rejected' && <XCircle className="w-6 h-6 text-red-500 drop-shadow-md" />}
                  {entry.status === 'approved' && <CheckCircle2 className="w-6 h-6 text-green-500 drop-shadow-md" />}
                  {entry.status === 'pending' && <Loader2 className="w-6 h-6 text-blue-500 animate-spin drop-shadow-md" />}
                </div>
                
                <div className="ml-[170px] pl-5 border-l-2 border-white/10 space-y-3">
                  <div className={`text-sm font-extrabold uppercase tracking-wider ${entry.status === 'rejected' ? 'text-red-400' : 'text-blue-400'}`}>
                    ↳ {entry.action}
                  </div>
                  <p className="text-sm text-gray-300 font-mono leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5">{entry.log}</p>
                  
                  {entry.requires_approval && entry.status === 'pending' && (
                    <div className="flex space-x-4 mt-5 pt-3">
                      <ActionButton color="blue" onClick={() => executeAction(`approve ${entry.command}`)}>Approve Execution</ActionButton>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SpatialCard>
    </VisionOsFade>
  );

  return (
    <div className="flex w-full h-screen overflow-hidden font-sans selection:bg-blue-500/30 bg-[#020617]">
      <aside className="w-72 border-r border-white/10 bg-black/50 backdrop-blur-3xl flex flex-col justify-between z-20 shadow-[8px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-8">
          <div className="flex items-center space-x-4 mb-14">
            <BrainCircuit className="w-10 h-10 text-nexus-gold drop-shadow-[0_0_15px_rgba(240,185,11,0.8)]" />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent tracking-widest">NEXUS</span>
          </div>
          <nav className="space-y-2">
            {[
              { name: 'HQ', icon: Globe },
              { name: 'Overview', icon: LayoutDashboard },
              { name: 'Finance', icon: DollarSign },
              { name: 'SecOps', icon: ShieldAlert },
              { name: 'Sales', icon: TrendingUp },
              { name: 'Marketing', icon: Smartphone },
              { name: 'Engineering', icon: Cpu },
              { name: 'Legal', icon: Scale },
              { name: 'HR', icon: Users },
              { name: 'Overwatch', icon: Terminal },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center space-x-4 px-5 py-3.5 rounded-2xl transition-all duration-300 font-bold ${
                  activeTab === item.name 
                    ? 'bg-gradient-to-r from-blue-500/20 to-transparent text-blue-300 border-l-4 border-blue-500 shadow-[inset_0_0_20px_rgba(59,130,246,0.15)]' 
                    : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.name && item.name === 'Overwatch' ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : ''} ${activeTab === item.name && item.name === 'SecOps' ? 'text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : ''}`} />
                <span className="text-sm tracking-wide">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-x-hidden">
        {/* Deep Spatial Background Gradients */}
        <div className="absolute top-[-10%] right-[10%] w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[180px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

        <header className="h-24 border-b border-white/5 bg-transparent flex items-center justify-between px-10 z-10">
          <div className={`flex items-center w-[40rem] bg-black/40 backdrop-blur-xl rounded-2xl px-5 py-3 border transition-all duration-300 shadow-[inset_0_2px_10px_rgba(255,255,255,0.02)] ${
            isAiProcessing ? 'border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'border-white/10 focus-within:border-blue-500/50 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.2)]'
          }`}>
            {isAiProcessing ? (
              <Loader2 className="w-5 h-5 text-purple-400 mr-4 animate-spin" />
            ) : (
              <BrainCircuit className="w-5 h-5 text-gray-400 mr-4" />
            )}
            <input 
              type="text" 
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={handleAiSubmit}
              disabled={isAiProcessing}
              placeholder={isAiProcessing ? "AI Agent is processing command..." : "Ask Nexus AI to generate a report, analyze a reel, or take action..."}
              className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-gray-500 disabled:opacity-50 font-medium tracking-wide"
            />
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="relative text-gray-400 hover:text-white transition-colors bg-white/5 p-3 rounded-xl border border-white/5 hover:border-white/20 shadow-inner">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black shadow-[0_0_10px_rgba(239,68,68,1)]"></span>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors bg-white/5 p-3 rounded-xl border border-white/5 hover:border-white/20 shadow-inner"><Settings className="w-5 h-5" /></button>
          </div>
        </header>

        <div className="flex-1 p-10 overflow-y-auto z-10 relative scroll-smooth">
          <div className="mb-10 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight drop-shadow-md">{activeTab}</h1>
              <p className="text-gray-400 text-sm flex items-center font-bold tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-3 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                Connected to Nexus AI Engine (Live)
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'HQ' && <React.Fragment key="hq">{renderHQ()}</React.Fragment>}
            {activeTab === 'Overview' && <React.Fragment key="overview">{renderOverview()}</React.Fragment>}
            {activeTab === 'Finance' && <React.Fragment key="finance">{renderFinance()}</React.Fragment>}
            {activeTab === 'SecOps' && <React.Fragment key="secops">{renderSecOps()}</React.Fragment>}
            {activeTab === 'Sales' && <React.Fragment key="sales">{renderSales()}</React.Fragment>}
            {activeTab === 'Marketing' && <React.Fragment key="marketing">{renderMarketing()}</React.Fragment>}
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
