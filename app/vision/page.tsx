import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Future of UK Cattle Farming | HerdBase',
  description: 'HerdBase is building the platform to power the biggest infrastructure change in UK cattle farming in 25 years. eID, IoT sensors, AI health prediction, and farm-to-fork provenance.',
};

/* ───────────────────────── SVG Illustrations ───────────────────────── */

function TimelineSVG() {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto" aria-label="Timeline showing paper to digital transition">
      {/* Background */}
      <rect x="0" y="0" width="600" height="320" rx="16" fill="#f0fdf4" />
      
      {/* Timeline line */}
      <line x1="60" y1="160" x2="540" y2="160" stroke="#059669" strokeWidth="3" strokeDasharray="8 4" />
      
      {/* Paper era */}
      <g transform="translate(100, 80)">
        <rect x="-30" y="-30" width="60" height="75" rx="4" fill="#fefce8" stroke="#d97706" strokeWidth="2" />
        <line x1="-18" y1="-15" x2="18" y2="-15" stroke="#d97706" strokeWidth="1.5" />
        <line x1="-18" y1="-5" x2="18" y2="-5" stroke="#d97706" strokeWidth="1.5" />
        <line x1="-18" y1="5" x2="12" y2="5" stroke="#d97706" strokeWidth="1.5" />
        <line x1="-18" y1="15" x2="18" y2="15" stroke="#d97706" strokeWidth="1.5" />
        <line x1="-18" y1="25" x2="8" y2="25" stroke="#d97706" strokeWidth="1.5" />
      </g>
      <circle cx="100" cy="160" r="10" fill="#d97706" />
      <text x="100" y="200" textAnchor="middle" className="text-xs" fill="#78716c" fontWeight="600" fontSize="12">CTS Era</text>
      <text x="100" y="218" textAnchor="middle" fill="#a8a29e" fontSize="10">Paper passports</text>
      
      {/* Arrow */}
      <g transform="translate(240, 140)">
        <polygon points="0,10 30,0 30,20" fill="#059669" opacity="0.5" />
        <polygon points="30,10 60,0 60,20" fill="#059669" opacity="0.7" />
        <polygon points="60,10 90,0 90,20" fill="#059669" opacity="0.9" />
      </g>
      
      {/* Digital era */}
      <g transform="translate(460, 80)">
        <rect x="-35" y="-35" width="70" height="80" rx="10" fill="#ecfdf5" stroke="#059669" strokeWidth="2.5" />
        <rect x="-25" y="-22" width="50" height="55" rx="4" fill="#d1fae5" />
        <circle cx="0" cy="0" r="12" fill="#059669" />
        <path d="M -5 0 L -1 4 L 7 -4" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="-20" y="18" width="40" height="4" rx="2" fill="#059669" opacity="0.4" />
        <rect x="-15" y="26" width="30" height="4" rx="2" fill="#059669" opacity="0.3" />
      </g>
      <circle cx="460" cy="160" r="10" fill="#059669" />
      <text x="460" y="200" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="12">LIS + eID</text>
      <text x="460" y="218" textAnchor="middle" fill="#6ee7b7" fontSize="10">Digital records</text>
      
      {/* 2026 marker */}
      <g transform="translate(280, 130)">
        <rect x="-28" y="-12" width="56" height="24" rx="12" fill="#059669" />
        <text x="0" y="4" textAnchor="middle" fill="white" fontWeight="700" fontSize="12">2026</text>
      </g>

      {/* 2027 marker */}
      <g transform="translate(380, 130)">
        <rect x="-28" y="-12" width="56" height="24" rx="12" fill="#047857" />
        <text x="0" y="4" textAnchor="middle" fill="white" fontWeight="700" fontSize="12">2027</text>
      </g>
      
      {/* HerdBase bridge */}
      <text x="300" y="270" textAnchor="middle" fill="#065f46" fontWeight="700" fontSize="14">HerdBase: the intelligence layer</text>
      <path d="M 130 240 Q 300 290 470 240" stroke="#059669" strokeWidth="2" fill="none" strokeDasharray="6 3" />
    </svg>
  );
}

function DigitalPassportSVG() {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-auto" aria-label="Digital cow passport on tablet with tag scanning">
      <defs>
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ecfdf5" />
          <stop offset="100%" stopColor="#d1fae5" />
        </linearGradient>
      </defs>
      
      {/* Tablet */}
      <rect x="140" y="30" width="320" height="340" rx="20" fill="#1f2937" />
      <rect x="155" y="50" width="290" height="300" rx="8" fill="url(#screenGrad)" />
      
      {/* Screen content - animal record */}
      <text x="180" y="80" fill="#065f46" fontWeight="700" fontSize="14">🐄 UK 123456 700001</text>
      <rect x="170" y="90" width="250" height="1" fill="#059669" opacity="0.3" />
      
      {/* Record fields */}
      <text x="180" y="115" fill="#6b7280" fontSize="10">Born</text>
      <text x="280" y="115" fill="#065f46" fontWeight="600" fontSize="10">14 Mar 2024</text>
      <text x="180" y="135" fill="#6b7280" fontSize="10">Breed</text>
      <text x="280" y="135" fill="#065f46" fontWeight="600" fontSize="10">Hereford × Angus</text>
      <text x="180" y="155" fill="#6b7280" fontSize="10">Dam</text>
      <text x="280" y="155" fill="#065f46" fontWeight="600" fontSize="10">UK 123456 500032</text>
      <text x="180" y="175" fill="#6b7280" fontSize="10">Weight</text>
      <text x="280" y="175" fill="#065f46" fontWeight="600" fontSize="10">487 kg ↑ +1.2 kg/day</text>
      <text x="180" y="195" fill="#6b7280" fontSize="10">Health</text>
      <text x="280" y="195" fill="#059669" fontWeight="700" fontSize="10">✓ Clear</text>
      
      {/* Mini chart */}
      <rect x="170" y="210" width="250" height="60" rx="6" fill="white" opacity="0.7" />
      <text x="180" y="228" fill="#6b7280" fontSize="9">Weight curve</text>
      <polyline points="185,260 210,255 235,248 260,242 285,235 310,225 335,218 360,212 385,208 405,205" stroke="#059669" strokeWidth="2" fill="none" />
      
      {/* Treatments log */}
      <rect x="170" y="280" width="250" height="55" rx="6" fill="white" opacity="0.7" />
      <text x="180" y="298" fill="#6b7280" fontSize="9">Recent treatments</text>
      <text x="180" y="315" fill="#065f46" fontSize="9">12 Feb — BVD vaccine (Bovilis)</text>
      <text x="180" y="328" fill="#065f46" fontSize="9">03 Jan — Wormer (Ivermectin)</text>
      
      {/* EID Tag scanning */}
      <g transform="translate(80, 150)">
        <ellipse cx="0" cy="0" rx="28" ry="16" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#92400e" fontWeight="700" fontSize="8">eID</text>
        {/* Signal waves */}
        <path d="M 30 -8 Q 45 0 30 8" stroke="#059669" strokeWidth="1.5" fill="none" opacity="0.4" />
        <path d="M 38 -14 Q 58 0 38 14" stroke="#059669" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M 46 -20 Q 72 0 46 20" stroke="#059669" strokeWidth="1.5" fill="none" opacity="0.8" />
      </g>
      
      {/* Scan label */}
      <text x="80" y="185" textAnchor="middle" fill="#d97706" fontWeight="600" fontSize="10">Scan tag</text>
      <path d="M 105 170 L 150 170" stroke="#059669" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowhead)" />
    </svg>
  );
}

function IoTHubSVG() {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-auto" aria-label="Hub and spoke IoT sensor diagram">
      {/* Background circle */}
      <circle cx="300" cy="200" r="180" fill="#f0fdf4" stroke="#d1fae5" strokeWidth="2" />
      
      {/* Central hub */}
      <circle cx="300" cy="200" r="55" fill="#059669" />
      <circle cx="300" cy="200" r="45" fill="#047857" />
      <text x="300" y="192" textAnchor="middle" fill="white" fontWeight="700" fontSize="13">HerdBase</text>
      <text x="300" y="210" textAnchor="middle" fill="#a7f3d0" fontSize="10">IoT Hub</text>
      
      {/* Spokes and sensors */}
      {/* Rumen bolus - top */}
      <line x1="300" y1="145" x2="300" y2="60" stroke="#059669" strokeWidth="2" strokeDasharray="6 3" />
      <circle cx="300" cy="48" r="30" fill="white" stroke="#059669" strokeWidth="2" />
      <text x="300" y="44" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="9">Rumen</text>
      <text x="300" y="56" textAnchor="middle" fill="#065f46" fontSize="9">Bolus</text>
      <text x="300" y="90" textAnchor="middle" fill="#6b7280" fontSize="8">38.6°C • 520 min/day</text>
      
      {/* GPS Collar - top right */}
      <line x1="338" y1="158" x2="440" y2="80" stroke="#059669" strokeWidth="2" strokeDasharray="6 3" />
      <circle cx="455" cy="68" r="30" fill="white" stroke="#059669" strokeWidth="2" />
      <text x="455" y="64" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="9">GPS</text>
      <text x="455" y="76" textAnchor="middle" fill="#065f46" fontSize="9">Collar</text>
      <text x="455" y="110" textAnchor="middle" fill="#6b7280" fontSize="8">Location • Activity</text>
      
      {/* Weight scale - right */}
      <line x1="355" y1="200" x2="480" y2="200" stroke="#059669" strokeWidth="2" strokeDasharray="6 3" />
      <circle cx="498" cy="200" r="30" fill="white" stroke="#059669" strokeWidth="2" />
      <text x="498" y="196" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="9">Weight</text>
      <text x="498" y="208" textAnchor="middle" fill="#065f46" fontSize="9">Scale</text>
      <text x="498" y="242" textAnchor="middle" fill="#6b7280" fontSize="8">Auto-capture</text>
      
      {/* Weather - bottom right */}
      <line x1="338" y1="242" x2="440" y2="320" stroke="#059669" strokeWidth="2" strokeDasharray="6 3" />
      <circle cx="455" cy="335" r="30" fill="white" stroke="#059669" strokeWidth="2" />
      <text x="455" y="331" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="9">Weather</text>
      <text x="455" y="343" textAnchor="middle" fill="#065f46" fontSize="9">Station</text>
      
      {/* Camera - bottom */}
      <line x1="300" y1="255" x2="300" y2="340" stroke="#059669" strokeWidth="2" strokeDasharray="6 3" />
      <circle cx="300" cy="355" r="30" fill="white" stroke="#059669" strokeWidth="2" />
      <text x="300" y="351" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="9">Calving</text>
      <text x="300" y="363" textAnchor="middle" fill="#065f46" fontSize="9">Camera</text>
      
      {/* BLE Beacon - bottom left */}
      <line x1="262" y1="242" x2="160" y2="320" stroke="#059669" strokeWidth="2" strokeDasharray="6 3" />
      <circle cx="145" cy="335" r="30" fill="white" stroke="#059669" strokeWidth="2" />
      <text x="145" y="331" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="9">BLE</text>
      <text x="145" y="343" textAnchor="middle" fill="#065f46" fontSize="9">Beacon</text>
      
      {/* LoRaWAN gateway - left */}
      <line x1="245" y1="200" x2="120" y2="200" stroke="#059669" strokeWidth="2" strokeDasharray="6 3" />
      <circle cx="102" cy="200" r="30" fill="white" stroke="#059669" strokeWidth="2" />
      <text x="102" y="196" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="9">LoRa</text>
      <text x="102" y="208" textAnchor="middle" fill="#065f46" fontSize="9">Gateway</text>
      
      {/* EID reader - top left */}
      <line x1="262" y1="158" x2="160" y2="80" stroke="#059669" strokeWidth="2" strokeDasharray="6 3" />
      <circle cx="145" cy="68" r="30" fill="white" stroke="#059669" strokeWidth="2" />
      <text x="145" y="64" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="9">EID</text>
      <text x="145" y="76" textAnchor="middle" fill="#065f46" fontSize="9">Reader</text>
    </svg>
  );
}

function AIHealthSVG() {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-auto" aria-label="Cow silhouette with health data overlay">
      <defs>
        <linearGradient id="healthGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <rect x="20" y="20" width="560" height="360" rx="16" fill="url(#healthGlow)" />
      
      {/* Cow silhouette */}
      <g transform="translate(180, 100)">
        {/* Body */}
        <ellipse cx="100" cy="120" rx="110" ry="65" fill="#1f2937" opacity="0.15" />
        {/* Head */}
        <circle cx="-10" cy="95" r="38" fill="#1f2937" opacity="0.15" />
        {/* Legs */}
        <rect x="20" y="175" width="8" height="50" rx="4" fill="#1f2937" opacity="0.12" />
        <rect x="60" y="178" width="8" height="47" rx="4" fill="#1f2937" opacity="0.12" />
        <rect x="130" y="178" width="8" height="47" rx="4" fill="#1f2937" opacity="0.12" />
        <rect x="170" y="175" width="8" height="50" rx="4" fill="#1f2937" opacity="0.12" />
        {/* Horns */}
        <path d="M -30 65 Q -45 45 -35 35" stroke="#1f2937" strokeWidth="4" fill="none" opacity="0.12" />
        <path d="M 10 65 Q 25 45 15 35" stroke="#1f2937" strokeWidth="4" fill="none" opacity="0.12" />
      </g>
      
      {/* Data overlay points */}
      {/* Temperature */}
      <g transform="translate(200, 160)">
        <circle cx="0" cy="0" r="8" fill="#ef4444" opacity="0.8">
          <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
        </circle>
        <line x1="8" y1="-4" x2="60" y2="-30" stroke="#ef4444" strokeWidth="1.5" />
        <rect x="60" y="-48" width="120" height="36" rx="6" fill="white" stroke="#ef4444" strokeWidth="1" />
        <text x="72" y="-30" fill="#ef4444" fontWeight="700" fontSize="11">🌡 38.8°C</text>
        <text x="72" y="-18" fill="#6b7280" fontSize="9">Rumen temp ↑ 0.3°</text>
      </g>
      
      {/* Activity */}
      <g transform="translate(340, 130)">
        <circle cx="0" cy="0" r="8" fill="#f59e0b" opacity="0.8">
          <animate attributeName="r" values="8;11;8" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <line x1="8" y1="-4" x2="50" y2="-25" stroke="#f59e0b" strokeWidth="1.5" />
        <rect x="50" y="-42" width="130" height="36" rx="6" fill="white" stroke="#f59e0b" strokeWidth="1" />
        <text x="62" y="-24" fill="#f59e0b" fontWeight="700" fontSize="11">🏃 Activity: Low</text>
        <text x="62" y="-12" fill="#6b7280" fontSize="9">↓ 40% vs 7-day avg</text>
      </g>
      
      {/* Rumination */}
      <g transform="translate(260, 210)">
        <circle cx="0" cy="0" r="8" fill="#059669" opacity="0.8">
          <animate attributeName="r" values="8;11;8" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <line x1="8" y1="6" x2="50" y2="30" stroke="#059669" strokeWidth="1.5" />
        <rect x="50" y="15" width="140" height="36" rx="6" fill="white" stroke="#059669" strokeWidth="1" />
        <text x="62" y="33" fill="#059669" fontWeight="700" fontSize="11">🔄 Rumination</text>
        <text x="62" y="45" fill="#6b7280" fontSize="9">480 min/day (normal)</text>
      </g>
      
      {/* Weight */}
      <g transform="translate(310, 250)">
        <circle cx="0" cy="0" r="8" fill="#6366f1" opacity="0.8">
          <animate attributeName="r" values="8;11;8" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <line x1="8" y1="6" x2="45" y2="25" stroke="#6366f1" strokeWidth="1.5" />
        <rect x="45" y="12" width="130" height="36" rx="6" fill="white" stroke="#6366f1" strokeWidth="1" />
        <text x="57" y="30" fill="#6366f1" fontWeight="700" fontSize="11">⚖️ 492 kg</text>
        <text x="57" y="42" fill="#6b7280" fontSize="9">DLWG: +1.1 kg/day</text>
      </g>
      
      {/* Alert badge */}
      <g transform="translate(80, 50)">
        <rect x="0" y="0" width="180" height="50" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
        <text x="15" y="22" fill="#dc2626" fontWeight="700" fontSize="12">⚠️ Early Warning</text>
        <text x="15" y="38" fill="#ef4444" fontSize="10">Possible illness in 4-6 days</text>
      </g>
    </svg>
  );
}

function VirtualFencingSVG() {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-auto" aria-label="Aerial paddock view with virtual fence lines">
      <defs>
        <pattern id="grass" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="#d1fae5" />
          <circle cx="5" cy="5" r="1" fill="#a7f3d0" />
        </pattern>
      </defs>
      
      {/* Farm boundary */}
      <rect x="40" y="30" width="520" height="340" rx="8" fill="url(#grass)" stroke="#065f46" strokeWidth="2" />
      
      {/* Paddock 1 - top left */}
      <rect x="50" y="40" width="240" height="150" rx="6" fill="#bbf7d0" fillOpacity="0.5" stroke="#059669" strokeWidth="2" strokeDasharray="10 5" />
      <text x="170" y="70" textAnchor="middle" fill="#065f46" fontWeight="700" fontSize="13">Paddock A</text>
      <text x="170" y="88" textAnchor="middle" fill="#047857" fontSize="10">12 hectares • 8 days rest</text>
      {/* Cow dots */}
      <circle cx="120" cy="120" r="6" fill="#065f46" opacity="0.7" />
      <circle cx="145" cy="135" r="6" fill="#065f46" opacity="0.7" />
      <circle cx="180" cy="115" r="6" fill="#065f46" opacity="0.7" />
      <circle cx="200" cy="140" r="6" fill="#065f46" opacity="0.7" />
      <circle cx="160" cy="155" r="6" fill="#065f46" opacity="0.7" />
      
      {/* Paddock 2 - top right */}
      <rect x="310" y="40" width="240" height="150" rx="6" fill="#fef9c3" fillOpacity="0.4" stroke="#059669" strokeWidth="2" strokeDasharray="10 5" />
      <text x="430" y="70" textAnchor="middle" fill="#065f46" fontWeight="700" fontSize="13">Paddock B</text>
      <text x="430" y="88" textAnchor="middle" fill="#047857" fontSize="10">9 hectares • Resting</text>
      <text x="430" y="130" textAnchor="middle" fill="#78716c" fontSize="11">🌱 Regrowth: 14 days</text>
      
      {/* Paddock 3 - bottom left */}
      <rect x="50" y="210" width="240" height="150" rx="6" fill="#fef9c3" fillOpacity="0.4" stroke="#059669" strokeWidth="2" strokeDasharray="10 5" />
      <text x="170" y="240" textAnchor="middle" fill="#065f46" fontWeight="700" fontSize="13">Paddock C</text>
      <text x="170" y="258" textAnchor="middle" fill="#047857" fontSize="10">15 hectares • Next rotation</text>
      
      {/* Paddock 4 - bottom right */}
      <rect x="310" y="210" width="240" height="150" rx="6" fill="#bbf7d0" fillOpacity="0.3" stroke="#059669" strokeWidth="2" strokeDasharray="10 5" />
      <text x="430" y="240" textAnchor="middle" fill="#065f46" fontWeight="700" fontSize="13">Paddock D</text>
      <text x="430" y="258" textAnchor="middle" fill="#047857" fontSize="10">10 hectares • Silage cut</text>
      
      {/* Virtual fence indicators */}
      <g transform="translate(290, 40)">
        <line x1="0" y1="0" x2="0" y2="150" stroke="#f59e0b" strokeWidth="3" />
        <circle cx="0" cy="30" r="5" fill="#f59e0b" />
        <circle cx="0" cy="75" r="5" fill="#f59e0b" />
        <circle cx="0" cy="120" r="5" fill="#f59e0b" />
      </g>
      <g transform="translate(290, 210)">
        <line x1="0" y1="0" x2="0" y2="150" stroke="#f59e0b" strokeWidth="3" />
        <circle cx="0" cy="30" r="5" fill="#f59e0b" />
        <circle cx="0" cy="75" r="5" fill="#f59e0b" />
        <circle cx="0" cy="120" r="5" fill="#f59e0b" />
      </g>
      <g transform="translate(50, 195)">
        <line x1="0" y1="0" x2="500" y2="0" stroke="#f59e0b" strokeWidth="3" />
        <circle cx="80" cy="0" r="5" fill="#f59e0b" />
        <circle cx="250" cy="0" r="5" fill="#f59e0b" />
        <circle cx="420" cy="0" r="5" fill="#f59e0b" />
      </g>
      
      {/* Legend */}
      <g transform="translate(420, 310)">
        <circle cx="0" cy="0" r="4" fill="#f59e0b" />
        <text x="12" y="4" fill="#78716c" fontSize="10">Virtual fence</text>
        <circle cx="0" cy="18" r="4" fill="#065f46" opacity="0.7" />
        <text x="12" y="22" fill="#78716c" fontSize="10">Animal (GPS)</text>
      </g>
    </svg>
  );
}

function FarmToForkSVG() {
  return (
    <svg viewBox="0 0 600 300" className="w-full h-auto" aria-label="Supply chain flow from birth to retail">
      {/* Chain links */}
      {/* Birth */}
      <g transform="translate(50, 100)">
        <circle cx="30" cy="30" r="30" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
        <text x="30" y="28" textAnchor="middle" fill="#059669" fontSize="20">🐄</text>
        <text x="30" y="42" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="8">Birth</text>
      </g>
      <line x1="110" y1="130" x2="140" y2="130" stroke="#059669" strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* Rearing */}
      <g transform="translate(140, 100)">
        <circle cx="30" cy="30" r="30" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
        <text x="30" y="28" textAnchor="middle" fill="#059669" fontSize="20">🌾</text>
        <text x="30" y="42" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="8">Rearing</text>
      </g>
      <line x1="200" y1="130" x2="230" y2="130" stroke="#059669" strokeWidth="2" />
      
      {/* Health */}
      <g transform="translate(230, 100)">
        <circle cx="30" cy="30" r="30" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
        <text x="30" y="28" textAnchor="middle" fill="#059669" fontSize="20">💉</text>
        <text x="30" y="42" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="8">Health</text>
      </g>
      <line x1="290" y1="130" x2="320" y2="130" stroke="#059669" strokeWidth="2" />
      
      {/* Movement */}
      <g transform="translate(320, 100)">
        <circle cx="30" cy="30" r="30" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
        <text x="30" y="28" textAnchor="middle" fill="#059669" fontSize="20">🚛</text>
        <text x="30" y="42" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="8">Movement</text>
      </g>
      <line x1="380" y1="130" x2="410" y2="130" stroke="#059669" strokeWidth="2" />
      
      {/* Processing */}
      <g transform="translate(410, 100)">
        <circle cx="30" cy="30" r="30" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
        <text x="30" y="28" textAnchor="middle" fill="#059669" fontSize="20">🏭</text>
        <text x="30" y="42" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="8">Processing</text>
      </g>
      <line x1="470" y1="130" x2="500" y2="130" stroke="#059669" strokeWidth="2" />
      
      {/* QR / Retail */}
      <g transform="translate(500, 85)">
        <rect x="0" y="0" width="60" height="60" rx="8" fill="white" stroke="#059669" strokeWidth="2" />
        {/* QR code pattern */}
        <rect x="8" y="8" width="12" height="12" fill="#065f46" />
        <rect x="24" y="8" width="4" height="4" fill="#065f46" />
        <rect x="32" y="8" width="4" height="4" fill="#065f46" />
        <rect x="40" y="8" width="12" height="12" fill="#065f46" />
        <rect x="8" y="24" width="4" height="4" fill="#065f46" />
        <rect x="16" y="24" width="4" height="4" fill="#065f46" />
        <rect x="28" y="24" width="8" height="4" fill="#065f46" />
        <rect x="40" y="24" width="4" height="4" fill="#065f46" />
        <rect x="8" y="32" width="4" height="4" fill="#065f46" />
        <rect x="20" y="32" width="4" height="4" fill="#065f46" />
        <rect x="32" y="32" width="4" height="4" fill="#065f46" />
        <rect x="44" y="32" width="4" height="4" fill="#065f46" />
        <rect x="8" y="40" width="12" height="12" fill="#065f46" />
        <rect x="24" y="44" width="4" height="4" fill="#065f46" />
        <rect x="36" y="40" width="4" height="8" fill="#065f46" />
        <rect x="44" y="44" width="8" height="8" fill="#065f46" />
        <text x="30" y="72" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="9">Scan me</text>
      </g>
      
      {/* eID thread running through */}
      <line x1="30" y1="180" x2="570" y2="180" stroke="#059669" strokeWidth="1.5" strokeDasharray="8 4" />
      <text x="300" y="200" textAnchor="middle" fill="#059669" fontWeight="600" fontSize="11">eID: tamper-proof chain of custody</text>
      
      {/* Labels */}
      <text x="300" y="250" textAnchor="middle" fill="#065f46" fontWeight="700" fontSize="14">No blockchain — audited immutable event log</text>
      <text x="300" y="270" textAnchor="middle" fill="#6b7280" fontSize="11">Red Tractor • Organic certifiers • Premium retailers</text>
    </svg>
  );
}

function CarbonSVG() {
  return (
    <svg viewBox="0 0 600 350" className="w-full h-auto" aria-label="Carbon and methane tracking graphic">
      {/* Background */}
      <rect x="20" y="20" width="560" height="310" rx="16" fill="#f0fdf4" />
      
      {/* Left side - inputs */}
      <g transform="translate(80, 60)">
        <text x="0" y="0" fill="#065f46" fontWeight="700" fontSize="14">Data Inputs</text>
        
        <rect x="0" y="15" width="140" height="35" rx="8" fill="white" stroke="#059669" strokeWidth="1.5" />
        <text x="15" y="38" fill="#065f46" fontSize="11">🌾 Feed data</text>
        
        <rect x="0" y="60" width="140" height="35" rx="8" fill="white" stroke="#059669" strokeWidth="1.5" />
        <text x="15" y="83" fill="#065f46" fontSize="11">⚖️ Weight data</text>
        
        <rect x="0" y="105" width="140" height="35" rx="8" fill="white" stroke="#059669" strokeWidth="1.5" />
        <text x="15" y="128" fill="#065f46" fontSize="11">🌱 Grazing patterns</text>
        
        <rect x="0" y="150" width="140" height="35" rx="8" fill="white" stroke="#059669" strokeWidth="1.5" />
        <text x="15" y="173" fill="#065f46" fontSize="11">🐄 Herd size</text>
      </g>
      
      {/* Arrows */}
      <line x1="230" y1="140" x2="280" y2="140" stroke="#059669" strokeWidth="2" />
      <polygon points="280,135 290,140 280,145" fill="#059669" />
      <line x1="230" y1="180" x2="280" y2="180" stroke="#059669" strokeWidth="2" />
      <polygon points="280,175 290,180 280,185" fill="#059669" />
      
      {/* Central processing */}
      <g transform="translate(290, 100)">
        <rect x="0" y="0" width="130" height="120" rx="12" fill="#047857" />
        <text x="65" y="35" textAnchor="middle" fill="white" fontWeight="700" fontSize="12">HerdBase</text>
        <text x="65" y="55" textAnchor="middle" fill="#a7f3d0" fontSize="10">Carbon Engine</text>
        <rect x="15" y="68" width="100" height="2" fill="#a7f3d0" opacity="0.3" />
        <text x="65" y="90" textAnchor="middle" fill="#d1fae5" fontSize="9">kg CO₂e per head</text>
        <text x="65" y="105" textAnchor="middle" fill="#d1fae5" fontSize="9">per year</text>
      </g>
      
      {/* Output arrows */}
      <line x1="430" y1="140" x2="460" y2="100" stroke="#059669" strokeWidth="2" />
      <line x1="430" y1="160" x2="460" y2="180" stroke="#059669" strokeWidth="2" />
      <line x1="430" y1="180" x2="460" y2="250" stroke="#059669" strokeWidth="2" />
      
      {/* Right side - outputs */}
      <g transform="translate(465, 70)">
        <rect x="0" y="0" width="110" height="50" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
        <text x="55" y="22" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="10">ELMS</text>
        <text x="55" y="38" textAnchor="middle" fill="#059669" fontSize="9">Compliance ✓</text>
      </g>
      
      <g transform="translate(465, 150)">
        <rect x="0" y="0" width="110" height="50" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
        <text x="55" y="22" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="10">Net Zero</text>
        <text x="55" y="38" textAnchor="middle" fill="#059669" fontSize="9">Reporting 📊</text>
      </g>
      
      <g transform="translate(465, 230)">
        <rect x="0" y="0" width="110" height="50" rx="8" fill="#fef9c3" stroke="#d97706" strokeWidth="1.5" />
        <text x="55" y="22" textAnchor="middle" fill="#92400e" fontWeight="600" fontSize="10">Carbon Credits</text>
        <text x="55" y="38" textAnchor="middle" fill="#d97706" fontSize="9">£ Revenue</text>
      </g>
      
      {/* Leaf decoration */}
      <g transform="translate(50, 270)">
        <path d="M 0 30 Q 15 0 40 5 Q 25 20 15 30 Z" fill="#059669" opacity="0.3" />
        <path d="M 35 25 Q 50 -5 75 0 Q 60 15 50 25 Z" fill="#059669" opacity="0.2" />
      </g>
    </svg>
  );
}

function MarketplaceSVG() {
  return (
    <svg viewBox="0 0 600 380" className="w-full h-auto" aria-label="Livestock marketplace listing card">
      {/* Card */}
      <rect x="100" y="20" width="400" height="340" rx="16" fill="white" stroke="#e5e7eb" strokeWidth="2" />
      
      {/* Header bar */}
      <rect x="100" y="20" width="400" height="50" rx="16" fill="#065f46" />
      <rect x="100" y="50" width="400" height="20" fill="#065f46" />
      <text x="300" y="50" textAnchor="middle" fill="white" fontWeight="700" fontSize="14">HerdBase Marketplace</text>
      <text x="300" y="64" textAnchor="middle" fill="#a7f3d0" fontSize="10">Verified livestock listings</text>
      
      {/* Listing card */}
      <rect x="120" y="85" width="360" height="255" rx="10" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" />
      
      {/* Animal image placeholder */}
      <rect x="135" y="100" width="120" height="90" rx="8" fill="#d1fae5" />
      <text x="195" y="140" textAnchor="middle" fill="#065f46" fontSize="28">🐄</text>
      <text x="195" y="160" textAnchor="middle" fill="#065f46" fontSize="9">Verified photo</text>
      
      {/* Listing details */}
      <text x="275" y="115" fill="#1f2937" fontWeight="700" fontSize="13">Aberdeen Angus Heifer</text>
      <text x="275" y="133" fill="#6b7280" fontSize="10">Born: 15 Mar 2024 • UK 987654 300012</text>
      
      <text x="275" y="155" fill="#6b7280" fontSize="9">Sire:</text>
      <text x="305" y="155" fill="#065f46" fontWeight="600" fontSize="9">Blelack Dorado (EBV: +48)</text>
      
      <text x="275" y="170" fill="#6b7280" fontSize="9">Weight:</text>
      <text x="315" y="170" fill="#065f46" fontWeight="600" fontSize="9">465 kg (DLWG: +1.3 kg/d)</text>
      
      <text x="275" y="185" fill="#6b7280" fontSize="9">Health:</text>
      <text x="313" y="185" fill="#059669" fontWeight="600" fontSize="9">✓ BVD free • TB clear</text>
      
      {/* Stats bar */}
      <rect x="135" y="205" width="330" height="45" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="1" />
      <g transform="translate(155, 220)">
        <text x="0" y="0" fill="#6b7280" fontSize="8">Finish date</text>
        <text x="0" y="14" fill="#065f46" fontWeight="700" fontSize="11">Aug 2026</text>
      </g>
      <g transform="translate(245, 220)">
        <text x="0" y="0" fill="#6b7280" fontSize="8">Grade pred.</text>
        <text x="0" y="14" fill="#065f46" fontWeight="700" fontSize="11">R4L</text>
      </g>
      <g transform="translate(335, 220)">
        <text x="0" y="0" fill="#6b7280" fontSize="8">Genetics</text>
        <text x="0" y="14" fill="#065f46" fontWeight="700" fontSize="11">Top 20%</text>
      </g>
      
      {/* Weight curve mini */}
      <rect x="135" y="260" width="155" height="60" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="1" />
      <text x="145" y="278" fill="#6b7280" fontSize="8">Weight curve (verified)</text>
      <polyline points="145,305 165,300 185,294 205,287 225,280 245,274 265,269 275,266" stroke="#059669" strokeWidth="2" fill="none" />
      
      {/* Price */}
      <rect x="305" y="260" width="160" height="60" rx="6" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
      <text x="385" y="285" textAnchor="middle" fill="#065f46" fontWeight="700" fontSize="20">£1,850</text>
      <text x="385" y="305" textAnchor="middle" fill="#059669" fontWeight="600" fontSize="10">Contact seller →</text>
      
      {/* Verified badge */}
      <g transform="translate(430, 95)">
        <rect x="0" y="0" width="40" height="18" rx="9" fill="#059669" />
        <text x="20" y="13" textAnchor="middle" fill="white" fontWeight="700" fontSize="8">✓ DATA</text>
      </g>
    </svg>
  );
}

function HardwareReaderSVG() {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-auto" aria-label="HerdBase EID reader device">
      {/* Device body */}
      <g transform="translate(200, 30)">
        {/* Handle */}
        <rect x="70" y="200" width="60" height="140" rx="12" fill="#374151" />
        <rect x="75" y="210" width="50" height="120" rx="8" fill="#4b5563" />
        {/* Grip texture */}
        <line x1="80" y1="230" x2="120" y2="230" stroke="#6b7280" strokeWidth="1" />
        <line x1="80" y1="245" x2="120" y2="245" stroke="#6b7280" strokeWidth="1" />
        <line x1="80" y1="260" x2="120" y2="260" stroke="#6b7280" strokeWidth="1" />
        <line x1="80" y1="275" x2="120" y2="275" stroke="#6b7280" strokeWidth="1" />
        <line x1="80" y1="290" x2="120" y2="290" stroke="#6b7280" strokeWidth="1" />
        <line x1="80" y1="305" x2="120" y2="305" stroke="#6b7280" strokeWidth="1" />
        
        {/* Reader head */}
        <rect x="30" y="10" width="140" height="200" rx="16" fill="#1f2937" />
        <rect x="40" y="20" width="120" height="130" rx="8" fill="#111827" />
        
        {/* Screen */}
        <rect x="50" y="30" width="100" height="80" rx="6" fill="#065f46" />
        <text x="100" y="55" textAnchor="middle" fill="#a7f3d0" fontWeight="600" fontSize="9">HerdBase Reader</text>
        <text x="100" y="72" textAnchor="middle" fill="white" fontWeight="700" fontSize="11">UK 123456 700001</text>
        <text x="100" y="88" textAnchor="middle" fill="#6ee7b7" fontSize="8">✓ Tag scanned</text>
        <text x="100" y="100" textAnchor="middle" fill="#d1fae5" fontSize="7">Hereford × • 487 kg • Clear</text>
        
        {/* Buttons */}
        <circle cx="65" cy="135" r="8" fill="#374151" stroke="#4b5563" strokeWidth="1" />
        <circle cx="100" cy="135" r="12" fill="#059669" />
        <text x="100" y="139" textAnchor="middle" fill="white" fontWeight="700" fontSize="8">SCAN</text>
        <circle cx="135" cy="135" r="8" fill="#374151" stroke="#4b5563" strokeWidth="1" />
        
        {/* HerdBase branding */}
        <rect x="55" y="165" width="90" height="30" rx="6" fill="#047857" />
        <text x="100" y="184" textAnchor="middle" fill="white" fontWeight="700" fontSize="11">HerdBase</text>
        
        {/* Signal waves from top */}
        <path d="M 80 5 Q 100 -15 120 5" stroke="#059669" strokeWidth="2" fill="none" opacity="0.4" />
        <path d="M 70 0 Q 100 -25 130 0" stroke="#059669" strokeWidth="2" fill="none" opacity="0.3" />
        <path d="M 60 -5 Q 100 -35 140 -5" stroke="#059669" strokeWidth="2" fill="none" opacity="0.2" />
      </g>
      
      {/* Feature callouts */}
      <g transform="translate(420, 80)">
        <circle cx="0" cy="0" r="4" fill="#059669" />
        <line x1="-30" y1="0" x2="4" y2="0" stroke="#059669" strokeWidth="1" />
        <text x="12" y="4" fill="#065f46" fontWeight="600" fontSize="11">Rugged IP67</text>
      </g>
      <g transform="translate(420, 140)">
        <circle cx="0" cy="0" r="4" fill="#059669" />
        <line x1="-50" y1="0" x2="4" y2="0" stroke="#059669" strokeWidth="1" />
        <text x="12" y="4" fill="#065f46" fontWeight="600" fontSize="11">Bluetooth + USB</text>
      </g>
      <g transform="translate(420, 200)">
        <circle cx="0" cy="0" r="4" fill="#059669" />
        <line x1="-50" y1="0" x2="4" y2="0" stroke="#059669" strokeWidth="1" />
        <text x="12" y="4" fill="#065f46" fontWeight="600" fontSize="11">12-hour battery</text>
      </g>
      <g transform="translate(420, 260)">
        <circle cx="0" cy="0" r="4" fill="#059669" />
        <line x1="-50" y1="0" x2="4" y2="0" stroke="#059669" strokeWidth="1" />
        <text x="12" y="4" fill="#065f46" fontWeight="600" fontSize="11">Phone or standalone</text>
      </g>
      
      {/* Price badge */}
      <g transform="translate(420, 310)">
        <rect x="-10" y="-15" width="130" height="35" rx="10" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
        <text x="55" y="5" textAnchor="middle" fill="#065f46" fontWeight="700" fontSize="12">From £199</text>
      </g>
    </svg>
  );
}

function RoadmapSVG() {
  return (
    <svg viewBox="0 0 900 200" className="w-full h-auto" aria-label="Product roadmap timeline">
      {/* Timeline track */}
      <rect x="40" y="88" width="820" height="24" rx="12" fill="#d1fae5" />
      
      {/* Progress fill - current */}
      <rect x="40" y="88" width="100" height="24" rx="12" fill="#059669" />
      
      {/* NOW */}
      <g transform="translate(80, 55)">
        <circle cx="0" cy="45" r="16" fill="#059669" stroke="white" strokeWidth="3" />
        <text x="0" y="49" textAnchor="middle" fill="white" fontWeight="700" fontSize="10">✓</text>
        <rect x="-55" y="-45" width="110" height="42" rx="8" fill="#059669" />
        <text x="0" y="-28" textAnchor="middle" fill="white" fontWeight="700" fontSize="10">NOW</text>
        <text x="0" y="-14" textAnchor="middle" fill="#a7f3d0" fontSize="8">Herd Management</text>
        <text x="0" y="120" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="9">8 modules live</text>
      </g>
      
      {/* 2026 */}
      <g transform="translate(260, 55)">
        <circle cx="0" cy="45" r="16" fill="white" stroke="#059669" strokeWidth="3" />
        <text x="0" y="49" textAnchor="middle" fill="#059669" fontWeight="700" fontSize="10">2</text>
        <rect x="-60" y="-45" width="120" height="42" rx="8" fill="white" stroke="#059669" strokeWidth="1.5" />
        <text x="0" y="-28" textAnchor="middle" fill="#065f46" fontWeight="700" fontSize="10">Summer 2026</text>
        <text x="0" y="-14" textAnchor="middle" fill="#059669" fontSize="8">LIS + Digital Passport</text>
        <text x="0" y="120" textAnchor="middle" fill="#6b7280" fontSize="9">CTS replacement</text>
      </g>
      
      {/* 2027 */}
      <g transform="translate(440, 55)">
        <circle cx="0" cy="45" r="16" fill="white" stroke="#059669" strokeWidth="3" />
        <text x="0" y="49" textAnchor="middle" fill="#059669" fontWeight="700" fontSize="10">3</text>
        <rect x="-65" y="-45" width="130" height="42" rx="8" fill="white" stroke="#059669" strokeWidth="1.5" />
        <text x="0" y="-28" textAnchor="middle" fill="#065f46" fontWeight="700" fontSize="10">2027</text>
        <text x="0" y="-14" textAnchor="middle" fill="#059669" fontSize="8">EID Reader + IoT Hub</text>
        <text x="0" y="120" textAnchor="middle" fill="#6b7280" fontSize="9">eID mandate starts</text>
      </g>
      
      {/* 2028 */}
      <g transform="translate(620, 55)">
        <circle cx="0" cy="45" r="16" fill="white" stroke="#a7f3d0" strokeWidth="3" />
        <text x="0" y="49" textAnchor="middle" fill="#a7f3d0" fontWeight="700" fontSize="10">4</text>
        <rect x="-70" y="-45" width="140" height="42" rx="8" fill="white" stroke="#a7f3d0" strokeWidth="1.5" />
        <text x="0" y="-28" textAnchor="middle" fill="#065f46" fontWeight="700" fontSize="10">2028</text>
        <text x="0" y="-14" textAnchor="middle" fill="#6b7280" fontSize="8">AI Health + Virtual Fencing</text>
        <text x="0" y="120" textAnchor="middle" fill="#6b7280" fontSize="9">Predictive platform</text>
      </g>
      
      {/* 2029 */}
      <g transform="translate(800, 55)">
        <circle cx="0" cy="45" r="16" fill="white" stroke="#a7f3d0" strokeWidth="3" />
        <text x="0" y="49" textAnchor="middle" fill="#a7f3d0" fontWeight="700" fontSize="10">5</text>
        <rect x="-70" y="-45" width="140" height="42" rx="8" fill="white" stroke="#a7f3d0" strokeWidth="1.5" />
        <text x="0" y="-28" textAnchor="middle" fill="#065f46" fontWeight="700" fontSize="10">2029</text>
        <text x="0" y="-14" textAnchor="middle" fill="#6b7280" fontSize="8">Provenance + Marketplace</text>
        <text x="0" y="120" textAnchor="middle" fill="#6b7280" fontSize="9">Full ecosystem</text>
      </g>
    </svg>
  );
}

/* ───────────────────────── Section Component ───────────────────────── */

function SectionBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
      {label}
    </div>
  );
}

/* ───────────────────────── Main Page ───────────────────────── */

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header — matches homepage */}
      <header className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-emerald-900">HerdBase</h1>
              <p className="text-xs text-emerald-600">One system for your entire herd</p>
            </div>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/#features" className="text-gray-700 hover:text-emerald-700 transition">Features</Link>
            <Link href="/#pricing" className="text-gray-700 hover:text-emerald-700 transition">Pricing</Link>
            <Link href="/#testimonials" className="text-gray-700 hover:text-emerald-700 transition">Testimonials</Link>
            <Link href="/vision" className="text-emerald-700 font-semibold">Vision</Link>
          </nav>
          <Link href="/login" className="bg-emerald-700 text-white px-6 py-2 rounded-lg hover:bg-emerald-800 transition">
            Sign In
          </Link>
        </div>
      </header>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-700 text-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-full text-sm font-medium mb-8 text-emerald-100">
            📄 Vision Document — March 2026
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
            The Future of UK<br />Cattle Farming
          </h2>
          <p className="text-xl lg:text-2xl text-emerald-100 max-w-3xl mx-auto mb-12 leading-relaxed">
            The biggest infrastructure change in 25 years is coming. HerdBase is building the platform to power it.
          </p>

          {/* Stat callouts */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '85,000', label: 'UK livestock farms' },
              { value: '60%', label: 'still paper-based' },
              { value: '2027', label: 'eID mandatory' },
              { value: '£345M', label: 'government funding' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
                <div className="text-3xl lg:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-emerald-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 1: REGULATORY SHIFT ═══════════════ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionBadge label="01 — The Regulatory Shift" />
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                The Cattle Tracing System is being replaced. Everything changes.
              </h3>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  The <strong className="text-gray-900">Livestock Information Service (LIS)</strong> replaces the ageing Cattle Tracing System in <strong className="text-gray-900">summer 2026</strong>. From 2027, every newborn calf in England must carry an <strong className="text-gray-900">electronic ID (eID) ear tag</strong>. Paper passports are being phased out.
                </p>
                <p>
                  The NFU&apos;s primary ask is clear: LIS should provide statutory data <em>back</em> to keepers — not just collect it. But government systems deliver plumbing, not intelligence.
                </p>
                <p className="text-emerald-700 font-semibold text-xl">
                  HerdBase is the value-added intelligence layer on top of government plumbing.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {['LIS Integration', 'eID Ready', 'BCMS Compliant', 'APHA Connected'].map((tag) => (
                  <span key={tag} className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <TimelineSVG />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 2: DIGITAL COW PASSPORT ═══════════════ */}
      <section className="py-20 lg:py-24 bg-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <DigitalPassportSVG />
            </div>
            <div className="order-1 lg:order-2">
              <SectionBadge label="02 — Digital Cow Passport" />
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                One scan. Full life history.
              </h3>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Scan an eID tag and get the complete animal story: <strong className="text-gray-900">health records, movements, breeding history, treatments, weight curves</strong> — all in one living digital document.
                </p>
                <p>
                  Think of it as an <strong className="text-gray-900">HPI check for cattle</strong>. Every birth, treatment, movement, and sale recorded automatically. No more filing cabinets of A4 paper passports.
                </p>
                <p>
                  The digital cow passport travels with the animal for its entire life — a single source of truth that every participant in the supply chain can trust.
                </p>
              </div>
              <div className="mt-8 bg-white rounded-xl p-6 border border-emerald-100">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: '📋', text: 'Birth to death record' },
                    { icon: '💉', text: 'Treatment history' },
                    { icon: '🚛', text: 'Movement log' },
                    { icon: '📈', text: 'Weight curves' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm text-gray-700 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 3: IoT SENSOR HUB ═══════════════ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionBadge label="03 — IoT Sensor Hub" />
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                One dashboard for every device on your farm.
              </h3>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  There are dozens of sensor manufacturers — rumen boluses, GPS collars, weight scales, calving cameras — and <strong className="text-gray-900">none of them talk to each other</strong>.
                </p>
                <p>
                  HerdBase is a <strong className="text-gray-900">hardware-agnostic integration platform</strong>. A single pane of glass ingesting data via LoRaWAN, Bluetooth, and cellular — regardless of manufacturer.
                </p>
                <p className="text-emerald-700 font-semibold">
                  We don&apos;t manufacture hardware. We make everyone else&apos;s hardware useful.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { sensor: 'Rumen boluses', data: 'Temperature, rumination' },
                  { sensor: 'GPS collars', data: 'Location, activity' },
                  { sensor: 'Weight scales', data: 'Auto-capture' },
                ].map((item, i) => (
                  <div key={i} className="bg-emerald-50 rounded-lg p-4">
                    <div className="font-semibold text-emerald-900 text-sm">{item.sensor}</div>
                    <div className="text-emerald-600 text-xs mt-1">{item.data}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <IoTHubSVG />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 4: AI HEALTH PREDICTION ═══════════════ */}
      <section className="py-20 lg:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <AIHealthSVG />
            </div>
            <div className="order-1 lg:order-2">
              <SectionBadge label="04 — AI Health Prediction" />
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Know your cow is poorly before she shows it.
              </h3>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Sensor-detected behavioural changes appear <strong className="text-gray-900">4–6 days before clinical signs</strong>. By aggregating temperature, activity, rumination, and weight data per animal, HerdBase spots what humans can&apos;t.
                </p>
                <p>
                  We start with <strong className="text-gray-900">threshold alerts</strong> — simple but effective — and layer machine learning models as the dataset grows. The more animals on the platform, the better every prediction becomes.
                </p>
                <p className="text-emerald-700 font-semibold">
                  Network effect: more farms = better models = earlier detection = healthier herds.
                </p>
              </div>
              <div className="mt-8 bg-white rounded-xl p-6 border border-stone-200">
                <div className="text-sm text-gray-500 mb-3">Detection timeline</div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-3 bg-emerald-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-red-400 rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Sensor detects change</span>
                  <span className="text-gray-400">4–6 days</span>
                  <span>Clinical signs visible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 5: VIRTUAL FENCING ═══════════════ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionBadge label="05 — Virtual Fencing Integration" />
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Boundaries without fences. Compliance without effort.
              </h3>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Integrating with <strong className="text-gray-900">Nofence and Halter APIs</strong>, HerdBase shows grazing data alongside pasture management — where every animal is, where they&apos;ve been, and how long they&apos;ve grazed each paddock.
                </p>
                <p>
                  When animals cross holding boundaries, movements are <strong className="text-gray-900">auto-logged and fed directly into LIS compliance</strong>. No manual reporting, no missed movements, no fines.
                </p>
                <p>
                  Location data is tied to individual health records — correlating where animals graze with how they perform.
                </p>
              </div>
            </div>
            <div>
              <VirtualFencingSVG />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 6: FARM-TO-FORK ═══════════════ */}
      <section className="py-20 lg:py-24 bg-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionBadge label="06 — Farm-to-Fork Provenance" />
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight max-w-3xl mx-auto">
              From birth to shelf. Every step verified.
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The eID tag becomes the anchor for a <strong className="text-gray-900">tamper-proof chain of custody</strong>. Birth → rearing → health treatments → feed → movements → abattoir → retail. A consumer scans a QR code on packaging and sees the animal&apos;s full story.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <FarmToForkSVG />
          </div>
          <div className="mt-12 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { title: 'No blockchain needed', desc: 'Audited immutable event log — simpler, cheaper, proven.' },
              { title: 'Premium positioning', desc: 'Red Tractor, organic certifiers, and premium retailers would pay for verified provenance.' },
              { title: 'Consumer trust', desc: 'QR code on every pack. Complete transparency from field to fork.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-semibold text-gray-900 mb-2">{item.title}</div>
                <div className="text-gray-600 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 7: CARBON TRACKING ═══════════════ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <CarbonSVG />
            </div>
            <div className="order-1 lg:order-2">
              <SectionBadge label="07 — Carbon &amp; Methane Tracking" />
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Turn environmental compliance into revenue.
              </h3>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Feed data + weight data + grazing patterns = <strong className="text-gray-900">methane estimates per head</strong>. HerdBase calculates your herd&apos;s carbon footprint automatically, using data you&apos;re already collecting.
                </p>
                <p>
                  Meet <strong className="text-gray-900">ELMS compliance</strong> requirements and generate net-zero reports without hiring consultants. Better yet, improved management decisions informed by data can significantly accelerate your path to lower emissions.
                </p>
                <p className="text-emerald-700 font-semibold">
                  Carbon credit markets represent additional revenue for forward-thinking farmers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 8: MARKETPLACE ═══════════════ */}
      <section className="py-20 lg:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionBadge label="08 — Livestock Marketplace" />
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Autotrader for cattle. Every listing backed by real data.
              </h3>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Today, cattle are sold on visual assessment in an auction ring. Buyers guess. Sellers hope. Everyone loses money on information asymmetry.
                </p>
                <p>
                  HerdBase Marketplace gives every listing a <strong className="text-gray-900">full spec sheet backed by verified data</strong>: genetics, health history, weight curves, predicted finishing date, and grade prediction.
                </p>
                <p>
                  Buyers know exactly what they&apos;re getting. Sellers get fair value. The best animals command the best prices — <strong className="text-gray-900">because the data proves it</strong>.
                </p>
              </div>
            </div>
            <div>
              <MarketplaceSVG />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 9: HARDWARE ═══════════════ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <HardwareReaderSVG />
            </div>
            <div className="order-1 lg:order-2">
              <SectionBadge label="09 — The Hardware Play" />
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Every farm needs a reader from 2027. We&apos;ll be ready.
              </h3>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  A branded <strong className="text-gray-900">HerdBase EID reader</strong> — white-labelled from proven manufacturers like Agrident or Gallagher — rugged, affordable, and designed for daily farm use.
                </p>
                <p>
                  Phone-attached or handheld. Scan a tag → instant animal record → log treatments, weights, and movements on the spot. <strong className="text-gray-900">No connectivity required</strong> — syncs when back in range.
                </p>
                <p className="text-emerald-700 font-semibold">
                  Razors-and-blades model: affordable reader = HerdBase subscription. Every new EID mandate drives hardware adoption, which drives platform growth.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { metric: 'IP67', desc: 'Waterproof, dustproof' },
                  { metric: '12 hrs', desc: 'Battery life' },
                  { metric: '< 1 sec', desc: 'Scan time' },
                  { metric: '£199', desc: 'Starting price' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-xl font-bold text-emerald-700">{item.metric}</div>
                    <div className="text-gray-500 text-sm mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 10: ROADMAP ═══════════════ */}
      <section className="py-20 lg:py-24 bg-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge label="10 — Roadmap" />
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Built in stages. Each one unlocks the next.
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re not waiting for 2029 to start. The foundation is live today — with 8 modules already in farmers&apos; hands.
            </p>
          </div>
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[800px]">
              <RoadmapSVG />
            </div>
          </div>
          <div className="mt-12 grid sm:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {[
              { year: 'Now', items: ['Herd management', 'Health records', 'Breeding', 'Finance', 'Compliance'] },
              { year: '2026', items: ['LIS integration', 'Digital passport', 'eID tag support'] },
              { year: '2027', items: ['EID reader bundle', 'IoT sensor hub', 'LoRaWAN gateway'] },
              { year: '2028', items: ['AI health alerts', 'Virtual fencing', 'ML models'] },
              { year: '2029', items: ['Farm-to-fork', 'Marketplace', 'Carbon credits'] },
            ].map((phase, i) => (
              <div key={i} className={`rounded-xl p-4 ${i === 0 ? 'bg-emerald-700 text-white' : 'bg-white border border-emerald-100'}`}>
                <div className={`font-bold text-lg mb-2 ${i === 0 ? 'text-white' : 'text-emerald-900'}`}>{phase.year}</div>
                <ul className="space-y-1">
                  {phase.items.map((item, j) => (
                    <li key={j} className={`text-sm ${i === 0 ? 'text-emerald-100' : 'text-gray-600'}`}>
                      {i === 0 ? '✓' : '○'} {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="bg-emerald-900 py-20 lg:py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Get ready for the future
          </h2>
          <p className="text-xl text-emerald-200 mb-10 leading-relaxed max-w-2xl mx-auto">
            Start with HerdBase today and be compliant before the mandate hits. The farms that digitise first will lead the industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-white text-emerald-900 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition"
            >
              Start Free Trial
            </Link>
            <Link
              href="/#contact"
              className="border-2 border-white text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition"
            >
              Talk to Us
            </Link>
          </div>
          <p className="text-emerald-400 mt-6 text-sm">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">HerdBase</h3>
              <p className="text-sm">One system for your entire herd — records, health, breeding, and business.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="/#pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="/vision" className="hover:text-white transition">Vision</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">Help Centre</Link></li>
                <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition">Training</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">About</Link></li>
                <li><Link href="#" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 HerdBase by Data &amp; Digital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
