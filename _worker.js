/**
 * IP SENTINEL - CYBERPUNK EDITION
 * 极致美化版 - 纯净中文
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 配置
    const config = {
      title: env.TITLE || "IP SENTINEL", // 建议保留英文标题更有科技感，或改为 "网络哨兵"
      footer: env.FOOTER || "SYSTEM ONLINE // READY",
    };

    // PWA Manifest
    if (url.pathname === "/manifest.json") {
      return new Response(JSON.stringify({
        "name": config.title,
        "short_name": "Sentinel",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#030712",
        "theme_color": "#030712",
        "icons": [{
          "src": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2306b6d4' stroke-width='2'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3Ccircle cx='12' cy='11' r='3'/%3E%3C/svg%3E",
          "type": "image/svg+xml",
          "sizes": "192x192"
        }]
      }), { headers: { "content-type": "application/json" }});
    }

    // IP 数据获取
    const cf = request.cf || {};
    const headers = request.headers;
    const clientIp = headers.get("cf-connecting-ip") || headers.get("x-forwarded-for") || "127.0.0.1";
    
    const initData = {
      ip: clientIp,
      country: cf.country || "UNK", 
      city: cf.city || "Unknown",
      region: cf.region || "",
      isp: cf.asOrganization || "ISP N/A",
      asn: cf.asn ? "AS" + cf.asn : "N/A",
      lat: Number(cf.latitude) || 0,
      lon: Number(cf.longitude) || 0,
      colo: cf.colo || "UNK",
      timezone: cf.timezone || "UTC",
      httpProtocol: cf.httpProtocol || "HTTP/2",
      tlsVersion: cf.tlsVersion || "TLS 1.3",
      userAgent: headers.get("user-agent") || ""
    };

    return new Response(renderHtml(initData, config), {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    });
  },
};

function renderHtml(initData, config) {
  return `
<!DOCTYPE html>
<html lang="zh-CN" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    <title>${config.title}</title>
    <meta name="theme-color" content="#030712" />
    <link rel="manifest" href="/manifest.json" />
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
    <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>

    <script>
      window.CF_DATA = ${JSON.stringify(initData)};
      window.SITE_CONFIG = ${JSON.stringify(config)};
      
      tailwind.config = {
        darkMode: 'class',
        theme: {
          extend: {
            fontFamily: { 
              sans: ['Rajdhani', 'sans-serif'], 
              mono: ['JetBrains Mono', 'monospace'],
              sci: ['Orbitron', 'sans-serif']
            },
            colors: { 
              cyber: { 
                base: '#030712', 
                panel: '#0b1121',
                cyan: '#06b6d4', 
                blue: '#3b82f6', 
                purple: '#8b5cf6',
                accent: '#22d3ee'
              } 
            },
            backgroundImage: {
              'grid-pattern': "linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)",
            },
            animation: {
              'scan': 'scan 3s linear infinite',
              'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
              scan: {
                '0%': { backgroundPosition: '0% 0%' },
                '100%': { backgroundPosition: '0% 100%' },
              }
            }
          }
        }
      }
    </script>
    <style>
      body { background-color: #030712; color: #e2e8f0; overflow-x: hidden; }
      
      /* 自定义滚动条 */
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #030712; }
      ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }
      ::-webkit-scrollbar-thumb:hover { background: #06b6d4; }

      /* 背景网格 */
      .bg-grid {
        background-size: 40px 40px;
        mask-image: linear-gradient(to bottom, transparent, 10%, white, 90%, transparent);
        opacity: 0.1;
      }

      /* 科技感边框卡片 */
      .tech-card {
        background: rgba(11, 17, 33, 0.6);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(34, 211, 238, 0.1);
        position: relative;
        overflow: hidden;
      }
      .tech-card::before {
        content: ''; position: absolute; top: 0; left: 0; width: 10px; height: 10px;
        border-top: 2px solid #06b6d4; border-left: 2px solid #06b6d4;
      }
      .tech-card::after {
        content: ''; position: absolute; bottom: 0; right: 0; width: 10px; height: 10px;
        border-bottom: 2px solid #06b6d4; border-right: 2px solid #06b6d4;
      }
      
      /* 地图滤镜 */
      .map-hacker { filter: invert(1) grayscale(1) contrast(1.5) brightness(0.7) hue-rotate(180deg); }
      
      /* 扫描线效果 */
      .scanline {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: linear-gradient(to bottom, transparent 50%, rgba(6, 182, 212, 0.05) 50%);
        background-size: 100% 4px;
        pointer-events: none;
        z-index: 10;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel" data-presets="react">
      const { useState, useEffect, useRef } = React;
      const { createRoot } = ReactDOM;

      // === 图标 ===
      const Icons = {
        Cpu: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>,
        Globe: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
        Wifi: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
        Shield: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
        Zap: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
        MapPin: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
        Eye: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
        EyeOff: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>,
        Terminal: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
      };

      // === 核心组件 ===

      const TechCard = ({ title, children, className = "", icon: Icon }) => (
        <div className={\`tech-card rounded-lg p-5 flex flex-col \${className}\`}>
          <div className="flex items-center gap-2 mb-4 border-b border-cyan-500/20 pb-2">
            {Icon && <Icon className="w-4 h-4 text-cyan-400" />}
            <h3 className="text-xs font-sci tracking-widest text-cyan-100/70 uppercase">{title}</h3>
            <div className="flex-grow"></div>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-cyan-500/50 rounded-full"></div>
            </div>
          </div>
          <div className="relative z-10 flex-grow">
            {children}
          </div>
        </div>
      );

      const DataField = ({ label, value, highlight = false, sub }) => (
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono mb-0.5">{label}</span>
          <div className="flex items-baseline gap-2">
            <span className={\`font-mono text-base md:text-lg truncate \${highlight ? 'text-cyan-300 font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]' : 'text-slate-200'}\`}>
              {value}
            </span>
            {sub && <span className="text-[10px] text-slate-500 font-mono border border-slate-700 px-1 rounded">{sub}</span>}
          </div>
        </div>
      );

      // 系统初始化动画
      const BootScreen = ({ onComplete }) => {
        const [lines, setLines] = useState([]);
        
        useEffect(() => {
          const logs = [
            "INITIALIZING KERNEL...",
            "LOADING NETWORK MODULES...",
            "ESTABLISHING SECURE CONNECTION...",
            "ANALYZING LATENCY...",
            "SYSTEM READY."
          ];
          let delay = 0;
          logs.forEach((log, i) => {
            delay += Math.random() * 300 + 100;
            setTimeout(() => setLines(prev => [...prev, log]), delay);
          });
          setTimeout(onComplete, delay + 500);
        }, []);

        return (
          <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center font-mono text-green-500 text-xs md:text-sm p-4">
             <div className="w-full max-w-md">
               {lines.map((l, i) => <div key={i} className="mb-1">> {l}</div>)}
               <div className="animate-pulse mt-2">_</div>
             </div>
          </div>
        );
      };

      const MainDashboard = ({ data, riskData }) => {
        const [isHidden, setIsHidden] = useState(false);
        const [score, setScore] = useState(0);

        useEffect(() => {
           if(riskData) {
             let s = 100;
             if(riskData.is_vpn) s-=20; if(riskData.is_proxy) s-=20; if(riskData.is_datacenter) s-=20;
             setScore(s);
           }
        }, [riskData]);

        const mask = (ip) => ip.replace(/\d+\.\d+$/, '***.***').replace(/:[\da-f]+:[\da-f]+$/, ':****:****');

        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 左侧核心状态 - 占据大图 */}
            <div className="lg:col-span-8 relative group">
               <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] rounded-full opacity-20 pointer-events-none"></div>
               
               <div className="tech-card rounded-xl border-cyan-500/30 h-full min-h-[300px] flex flex-col relative overflow-hidden">
                  <div className="scanline"></div>
                  
                  {/* 背景地图 */}
                  <div className="absolute inset-0 opacity-40 mix-blend-screen">
                     <iframe 
                        src={\`https://maps.google.com/maps?q=\${data.lat},\${data.lon}&z=5&output=embed\`}
                        className="w-full h-full object-cover map-hacker"
                        style={{pointerEvents: 'none'}}
                     ></iframe>
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0b1121] via-transparent to-transparent"></div>
                  </div>

                  {/* 核心内容浮层 */}
                  <div className="relative z-20 flex flex-col h-full justify-between p-2">
                     <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2 bg-black/40 backdrop-blur px-3 py-1 rounded border border-cyan-500/30">
                           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                           <span className="text-xs font-sci text-cyan-400">ONLINE</span>
                        </div>
                        <button onClick={() => setIsHidden(!isHidden)} className="p-2 hover:bg-cyan-900/30 rounded text-cyan-400 transition-colors">
                           {isHidden ? <Icons.EyeOff className="w-5 h-5"/> : <Icons.Eye className="w-5 h-5"/>}
                        </button>
                     </div>

                     <div className="mt-auto">
                        <div className="text-[10px] text-cyan-500 font-mono tracking-[0.2em] mb-1 opacity-70">CURRENT CONNECTION</div>
                        <h1 className="text-4xl md:text-6xl font-mono font-bold text-white tracking-tighter drop-shadow-2xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-300">
                           {isHidden ? mask(data.ip) : data.ip}
                        </h1>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-black/60 backdrop-blur-md p-4 rounded-lg border border-white/5">
                           <DataField label="LOCATION" value={data.country} sub={data.region} />
                           <DataField label="NETWORK" value={data.isp} highlight />
                           <DataField label="ASN" value={data.asn} />
                           <DataField label="COORDINATES" value={\`\${data.lat.toFixed(2)}, \${data.lon.toFixed(2)}\`} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* 右侧数据面板 */}
            <div className="lg:col-span-4 flex flex-col gap-4">
               {/* 风险评分环 */}
               <TechCard title="THREAT ANALYSIS" icon={Icons.Shield} className="flex-1">
                  <div className="flex items-center justify-between h-full">
                     <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                           <circle cx="48" cy="48" r="40" stroke="#1e293b" strokeWidth="8" fill="none"/>
                           <circle cx="48" cy="48" r="40" stroke={score > 80 ? "#10b981" : "#f59e0b"} strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - score/100)} className="transition-all duration-1000"/>
                        </svg>
                        <span className="absolute text-xl font-bold font-mono">{score}</span>
                     </div>
                     <div className="flex flex-col gap-2 text-right">
                        <div className="text-xs text-slate-400">RISK LEVEL</div>
                        <div className={\`text-lg font-bold \${score > 80 ? 'text-green-400' : 'text-yellow-400'}\`}>
                           {score > 80 ? 'SECURE' : 'CAUTION'}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                           PROXY: {riskData?.is_proxy ? 'YES' : 'NO'} <br/>
                           VPN: {riskData?.is_vpn ? 'YES' : 'NO'}
                        </div>
                     </div>
                  </div>
               </TechCard>

               {/* 环境信息 */}
               <TechCard title="SYSTEM ENV" icon={Icons.Terminal} className="flex-1">
                   <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                         <span className="text-xs text-slate-400">PROTOCOL</span>
                         <span className="text-xs font-mono text-cyan-300">{data.httpProtocol} / {data.tlsVersion}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                         <span className="text-xs text-slate-400">DATA CENTER</span>
                         <span className="text-xs font-mono text-purple-300">{data.colo}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-xs text-slate-400">TIMEZONE</span>
                         <span className="text-xs font-mono text-slate-200">{data.timezone}</span>
                      </div>
                   </div>
               </TechCard>
            </div>
          </div>
        );
      };

      const PingGrid = () => {
         const targets = [
            { name: "Google", url: "https://www.google.com" },
            { name: "GitHub", url: "https://github.com" },
            { name: "Cloudflare", url: "https://www.cloudflare.com" },
            { name: "Baidu", url: "https://www.baidu.com" },
         ];

         return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
               {targets.map(t => <PingItem key={t.name} target={t} />)}
            </div>
         );
      };

      const PingItem = ({ target }) => {
         const [ms, setMs] = useState(null);
         const [loading, setLoading] = useState(true);

         useEffect(() => {
            const start = performance.now();
            fetch(target.url, { mode: 'no-cors' }).then(() => {
               setMs(Math.round(performance.now() - start));
               setLoading(false);
            }).catch(() => setLoading(false));
         }, []);

         return (
            <div className="bg-[#0b1121]/50 border border-slate-800 p-3 rounded flex flex-col items-center justify-center relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
               <div className="text-[10px] text-slate-500 uppercase mb-1 z-10">{target.name}</div>
               <div className="text-xl font-mono font-bold z-10 flex items-center gap-1">
                  {loading ? <span className="animate-pulse text-slate-600">--</span> : 
                   <span className={ms < 200 ? "text-green-400" : "text-yellow-400"}>{ms}</span>}
                  <span className="text-[10px] text-slate-600">ms</span>
               </div>
               {/* 底部进度条装饰 */}
               <div className="absolute bottom-0 left-0 h-0.5 bg-cyan-500 transition-all duration-1000" style={{width: loading ? '0%' : '100%'}}></div>
            </div>
         );
      };

      const App = () => {
        const [booted, setBooted] = useState(false);
        const [riskData, setRiskData] = useState(null);
        
        useEffect(() => {
           fetch('https://api.ipapi.is').then(r => r.json()).then(setRiskData).catch(()=>{});
        }, []);

        if (!booted) return <BootScreen onComplete={() => setBooted(true)} />;

        return (
          <div className="min-h-screen bg-cyber-base bg-grid text-slate-300 font-sans selection:bg-cyan-500/30">
            
            {/* 顶部导航 */}
            <nav className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-40">
               <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/50 rounded flex items-center justify-center">
                        <Icons.Cpu className="w-5 h-5 text-cyan-400" />
                     </div>
                     <span className="font-sci font-bold text-xl text-white tracking-widest">
                        IP<span className="text-cyan-400">SENTINEL</span>
                     </span>
                  </div>
                  <div className="text-xs font-mono text-cyan-500/50 hidden md:block">
                     SYSTEM STATUS: NORMAL // {new Date().toLocaleTimeString()}
                  </div>
               </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-8 relative">
               {/* 装饰光效 */}
               <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none"></div>

               <MainDashboard data={window.CF_DATA} riskData={riskData} />
               
               <div className="mt-8">
                  <h3 className="flex items-center gap-2 text-sm font-sci text-cyan-100/70 mb-4">
                     <Icons.Zap className="w-4 h-4 text-yellow-400" /> 
                     NETWORK LATENCY
                  </h3>
                  <PingGrid />
               </div>

               <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TechCard title="IPv4 CONNECTIVITY" icon={Icons.Globe}>
                     <ConnectivityCheck type="IPv4" url="https://api-ipv4.ip.sb/geoip" />
                  </TechCard>
                  <TechCard title="IPv6 CONNECTIVITY" icon={Icons.Globe}>
                     <ConnectivityCheck type="IPv6" url="https://api-ipv6.ip.sb/geoip" />
                  </TechCard>
               </div>
            </main>

            <footer className="border-t border-white/5 mt-12 py-8 text-center">
               <div className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">
                  {window.SITE_CONFIG.footer}
               </div>
            </footer>
          </div>
        );
      };

      const ConnectivityCheck = ({ url }) => {
         const [data, setData] = useState(null);
         useEffect(() => {
            fetch(url).then(r=>r.json()).then(setData).catch(()=>setData({error:true}));
         }, [url]);

         if(!data) return <div className="h-16 flex items-center text-xs text-slate-500 font-mono animate-pulse">> PINGING GATEWAY...</div>;
         if(data.error) return <div className="h-16 flex items-center text-xs text-red-500 font-mono">> CONNECTION FAILED</div>;

         return (
            <div className="flex flex-col gap-1 mt-2">
               <div className="flex justify-between">
                  <span className="text-slate-500 text-xs font-mono">ADDR</span>
                  <span className="text-cyan-300 text-xs font-mono truncate ml-4">{data.ip}</span>
               </div>
               <div className="flex justify-between">
                  <span className="text-slate-500 text-xs font-mono">ISP</span>
                  <span className="text-slate-300 text-xs font-mono truncate">{data.isp}</span>
               </div>
            </div>
         );
      };

      const root = createRoot(document.getElementById('root'));
      root.render(<App />);
    </script>
  </body>
</html>
`;
}
