import { useState, useEffect } from 'react';
import {
  Anchor, Waves, Wind, Thermometer, CloudRain, Compass, Gauge,
  ShoppingCart, Package, Search, MapPin, AlertTriangle, CheckCircle, XCircle,
  Phone, MessageCircle, Settings, Plus, Trash2, Edit, Lock, Unlock,
  Smartphone, Monitor, Droplets, Ship, Zap, Activity, Navigation,
  Calendar, Percent, X, Check, Home, Wrench, Bell, ChevronRight
} from 'lucide-react';

// ==================== DATA ====================
const PUERTOS_DATA = [
  { id: 1, nombre: 'Puerto Montt', region: 'Los Lagos', lat: -41.47, lon: -72.94, esSalmonero: true, temp: 12, viento: 15, dirViento: 225, rafagas: 28, estadoMar: 'Picado', oleaje: 1.2, lluvia: false, mareas: [{hora:'06:23',tipo:'Pleamar',altura:3.8},{hora:'12:45',tipo:'Bajamar',altura:0.9},{hora:'18:52',tipo:'Pleamar',altura:4.1},{hora:'01:10',tipo:'Bajamar',altura:0.7}] },
  { id: 2, nombre: 'Ancud', region: 'Los Lagos', lat: -41.85, lon: -73.83, esSalmonero: true, temp: 11, viento: 22, dirViento: 270, rafagas: 35, estadoMar: 'Agitado', oleaje: 2.1, lluvia: true, mareas: [{hora:'06:40',tipo:'Pleamar',altura:3.6},{hora:'13:02',tipo:'Bajamar',altura:1.1},{hora:'19:15',tipo:'Pleamar',altura:3.9},{hora:'01:28',tipo:'Bajamar',altura:0.8}] },
  { id: 3, nombre: 'Castro', region: 'Los Lagos', lat: -42.48, lon: -73.77, esSalmonero: true, temp: 10, viento: 18, dirViento: 315, rafagas: 30, estadoMar: 'Marejada', oleaje: 1.8, lluvia: true, mareas: [{hora:'06:55',tipo:'Pleamar',altura:3.5},{hora:'13:18',tipo:'Bajamar',altura:1.0},{hora:'19:30',tipo:'Pleamar',altura:3.7},{hora:'01:42',tipo:'Bajamar',altura:0.9}] },
  { id: 4, nombre: 'Quellón', region: 'Los Lagos', lat: -43.11, lon: -73.61, esSalmonero: true, temp: 9, viento: 25, dirViento: 200, rafagas: 40, estadoMar: 'Fuerte Marejada', oleaje: 2.5, lluvia: false, mareas: [{hora:'07:10',tipo:'Pleamar',altura:3.4},{hora:'13:35',tipo:'Bajamar',altura:1.2},{hora:'19:48',tipo:'Pleamar',altura:3.6},{hora:'01:58',tipo:'Bajamar',altura:0.8}] },
  { id: 5, nombre: 'Chaitén', region: 'Los Lagos', lat: -42.92, lon: -72.64, esSalmonero: true, temp: 11, viento: 12, dirViento: 180, rafagas: 20, estadoMar: 'Rizado', oleaje: 0.8, lluvia: false, mareas: [{hora:'06:15',tipo:'Pleamar',altura:3.2},{hora:'12:30',tipo:'Bajamar',altura:0.9},{hora:'18:40',tipo:'Pleamar',altura:3.5},{hora:'00:55',tipo:'Bajamar',altura:0.7}] },
  { id: 6, nombre: 'Melinka', region: 'Aysén', lat: -43.89, lon: -73.73, esSalmonero: true, temp: 8, viento: 30, dirViento: 250, rafagas: 45, estadoMar: 'Gruesa', oleaje: 3.2, lluvia: true, mareas: [{hora:'07:25',tipo:'Pleamar',altura:3.1},{hora:'13:50',tipo:'Bajamar',altura:1.3},{hora:'20:05',tipo:'Pleamar',altura:3.3},{hora:'02:15',tipo:'Bajamar',altura:0.9}] },
  { id: 7, nombre: 'Puerto Cisnes', region: 'Aysén', lat: -44.73, lon: -72.69, esSalmonero: false, temp: 7, viento: 20, dirViento: 290, rafagas: 32, estadoMar: 'Agitado', oleaje: 2.0, lluvia: false, mareas: [{hora:'07:40',tipo:'Pleamar',altura:3.0},{hora:'14:05',tipo:'Bajamar',altura:1.1},{hora:'20:22',tipo:'Pleamar',altura:3.2},{hora:'02:30',tipo:'Bajamar',altura:0.8}] },
  { id: 8, nombre: 'Puerto Chacabuco', region: 'Aysén', lat: -45.48, lon: -72.33, esSalmonero: false, temp: 6, viento: 14, dirViento: 160, rafagas: 22, estadoMar: 'Marejada', oleaje: 1.5, lluvia: false, mareas: [{hora:'07:55',tipo:'Pleamar',altura:2.9},{hora:'14:20',tipo:'Bajamar',altura:1.0},{hora:'20:38',tipo:'Pleamar',altura:3.1},{hora:'02:48',tipo:'Bajamar',altura:0.7}] },
  { id: 9, nombre: 'Caleta Tortel', region: 'Aysén', lat: -47.78, lon: -73.56, esSalmonero: false, temp: 5, viento: 28, dirViento: 240, rafagas: 42, estadoMar: 'Gruesa', oleaje: 3.0, lluvia: true, mareas: [{hora:'08:10',tipo:'Pleamar',altura:2.8},{hora:'14:38',tipo:'Bajamar',altura:1.2},{hora:'20:55',tipo:'Pleamar',altura:3.0},{hora:'03:05',tipo:'Bajamar',altura:0.9}] },
  { id: 10, nombre: 'Puerto Natales', region: 'Magallanes', lat: -51.73, lon: -72.51, esSalmonero: false, temp: 4, viento: 35, dirViento: 270, rafagas: 50, estadoMar: 'Gruesa', oleaje: 3.5, lluvia: false, mareas: [{hora:'08:25',tipo:'Pleamar',altura:4.2},{hora:'14:55',tipo:'Bajamar',altura:0.8},{hora:'21:10',tipo:'Pleamar',altura:4.5},{hora:'03:22',tipo:'Bajamar',altura:0.6}] },
  { id: 11, nombre: 'Punta Arenas', region: 'Magallanes', lat: -53.16, lon: -70.91, esSalmonero: false, temp: 3, viento: 40, dirViento: 285, rafagas: 55, estadoMar: 'Tempestuoso', oleaje: 4.0, lluvia: false, mareas: [{hora:'08:40',tipo:'Pleamar',altura:4.5},{hora:'15:12',tipo:'Bajamar',altura:0.7},{hora:'21:28',tipo:'Pleamar',altura:4.8},{hora:'03:40',tipo:'Bajamar',altura:0.5}] },
  { id: 12, nombre: 'Puerto Williams', region: 'Magallanes', lat: -54.93, lon: -67.61, esSalmonero: false, temp: 1, viento: 45, dirViento: 300, rafagas: 60, estadoMar: 'Tempestuoso', oleaje: 4.5, lluvia: true, mareas: [{hora:'08:55',tipo:'Pleamar',altura:3.8},{hora:'15:30',tipo:'Bajamar',altura:0.9},{hora:'21:45',tipo:'Pleamar',altura:4.0},{hora:'03:58',tipo:'Bajamar',altura:0.7}] },
];

const INITIAL_PRODUCTS = [
  { id: 1, nombre: 'Traje Neopreno 7mm Henderson', categoria: 'Trajes', precioVenta: 450000, precioArriendo: 15000, stock: 12, imagen: 'https://image.qwenlm.ai/generated-images/54835510-0583-4204-b9e0-572ab9dcb867/_result.png', descripcion: 'Traje húmedo 7mm para aguas frías del sur de Chile. Costuras selladas, capucha integrada.' },
  { id: 2, nombre: 'Ordenador Cressi Giotto', categoria: 'Electrónica', precioVenta: 380000, precioArriendo: 12000, stock: 8, imagen: 'https://image.qwenlm.ai/generated-images/cdfa54ec-ddd2-49df-a337-1a9cf2bda3ba/_result.png', descripcion: 'Ordenador de buceo con algoritmo RGBM, 3 modos de operación, nitrox compatible.' },
  { id: 3, nombre: 'Chicote Profesional 12m', categoria: 'Reguladores', precioVenta: 120000, precioArriendo: 5000, stock: 25, imagen: 'https://image.qwenlm.ai/generated-images/544a4cc0-ee75-473e-81e8-7c814d5ed7c0/_result.png', descripcion: 'Chicote reforzado de 12 metros con conectores DIN, manguera de alta presión.' },
  { id: 4, nombre: 'Regulador Apeks MTX-R', categoria: 'Reguladores', precioVenta: 520000, precioArriendo: 18000, stock: 6, imagen: 'https://image.qwenlm.ai/generated-images/4ffa3511-9727-472a-8a5b-f8ee886973ee/_result.png', descripcion: 'Regulador de doble etapa para buceo comercial, primera etapa compensada.' },
  { id: 5, nombre: 'Aceite Coltri 1.5L', categoria: 'Compresores', precioVenta: 85000, precioArriendo: 0, stock: 40, imagen: 'https://image.qwenlm.ai/generated-images/18a47774-5d9c-4ce9-8bdc-2c5367ac4827/_result.png', descripcion: 'Aceite sintético para compresores Coltri, cambio cada 100 horas de uso.' },
  { id: 6, nombre: 'Cilindro O2 Medicinal 3L', categoria: 'Cilindros', precioVenta: 280000, precioArriendo: 8000, stock: 15, imagen: 'https://image.qwenlm.ai/generated-images/b414f931-b49d-4af9-9649-193e33b29261/_result.png', descripcion: 'Cilindro de aluminio 3 litros para oxígeno medicinal, válvula DIN.' },
  { id: 7, nombre: 'Arnés de Seguridad Industrial', categoria: 'Seguridad', precioVenta: 95000, precioArriendo: 4000, stock: 20, imagen: 'https://image.qwenlm.ai/generated-images/3d822e42-44be-498b-a2dd-3759e9b1279a/_result.png', descripcion: 'Arnés de cuerpo completo certificado para trabajos subacuáticos.' },
  { id: 8, nombre: 'Casco Kirby Morgan 48', categoria: 'Equipos', precioVenta: 3500000, precioArriendo: 85000, stock: 3, imagen: 'https://image.qwenlm.ai/generated-images/a8d38bda-d420-4ee0-a18b-8b086866e4d8/_result.png', descripcion: 'Casco de buceo comercial con sistema de comunicaciones integrado.' },
];

const INITIAL_PLANS = [
  { id: 1, nombre: 'Plan Flota Mayorista', descuento: 25, dias: 0, tipo: 'venta', descripcion: 'Descuento por volumen para compras sobre 5 unidades' },
  { id: 2, nombre: 'Plan Descuento Volumen', descuento: 10, dias: 0, tipo: 'venta', descripcion: '10% descuento compras sobre $500.000 CLP' },
];

const ORDENES_TALLER = [
  { id: 'GERD-8942-PM', cilindro: 'Cilindro O2 3L #2847', cliente: 'Salmones Austral S.A.', paso: 4, fecha: '2024-01-15' },
  { id: 'GERD-7631-AN', cilindro: 'Cilindro Aire 6L #1523', cliente: 'Multiexport Foods', paso: 6, fecha: '2024-01-10' },
  { id: 'GERD-9105-CT', cilindro: 'Cilindro O2 3L #3102', cliente: 'Marine Harvest Chile', paso: 2, fecha: '2024-01-18' },
  { id: 'GERD-6548-QU', cilindro: 'Cilindro Mezcla 10L #892', cliente: 'Pesquera Montt', paso: 5, fecha: '2024-01-12' },
  { id: 'GERD-4421-PM', cilindro: 'Cilindro O2 6L #4401', cliente: 'AquaChile S.A.', paso: 1, fecha: '2024-01-20' },
];

const PASOS_TALLER = [
  { nombre: 'Recepción', icon: '📥', desc: 'Ingreso y registro del cilindro' },
  { nombre: 'Desvalvulado', icon: '🔧', desc: 'Retiro de válvula e inspección' },
  { nombre: 'Prueba Hidrostática', icon: '💧', desc: 'Prueba a 300 bar según norma' },
  { nombre: 'Secado', icon: '☀️', desc: 'Secado con nitrógeno' },
  { nombre: 'Carga O2', icon: '🫧', desc: 'Carga de O2 medicinal a 200 bar' },
  { nombre: 'Listo para retiro', icon: '✅', desc: 'Certificado y despachado' },
];

// ==================== UTILITIES ====================
function getRecomendacionInmersion(oleaje: number, viento: number) {
  if (oleaje <= 1.0 && viento <= 15) return { texto: 'Óptimo', color: 'emerald', icon: CheckCircle };
  if (oleaje <= 2.0 && viento <= 25) return { texto: 'Precaución', color: 'amber', icon: AlertTriangle };
  return { texto: 'Riesgo Alto', color: 'rose', icon: XCircle };
}

function getBeaufort(nudos: number) {
  if (nudos < 1) return { escala: 0, descripcion: 'Calma' };
  if (nudos < 4) return { escala: 1, descripcion: 'Ventolina' };
  if (nudos < 7) return { escala: 2, descripcion: 'Brisa muy débil' };
  if (nudos < 11) return { escala: 3, descripcion: 'Brisa débil' };
  if (nudos < 17) return { escala: 4, descripcion: 'Brisa moderada' };
  if (nudos < 22) return { escala: 5, descripcion: 'Brisa fresca' };
  if (nudos < 28) return { escala: 6, descripcion: 'Brisa fuerte' };
  if (nudos < 34) return { escala: 7, descripcion: 'Viento fuerte' };
  if (nudos < 41) return { escala: 8, descripcion: 'Temporal' };
  if (nudos < 48) return { escala: 9, descripcion: 'Temporal fuerte' };
  if (nudos < 56) return { escala: 10, descripcion: 'Temporal muy fuerte' };
  if (nudos < 64) return { escala: 11, descripcion: 'Borrasca' };
  return { escala: 12, descripcion: 'Huracán' };
}

function getDireccionCardinal(grados: number) {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
  return dirs[Math.round(grados / 22.5) % 16];
}

function formatCLP(amount: number) {
  return '$' + amount.toLocaleString('es-CL');
}

// ==================== MAIN APP ====================
export default function App() {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [activeModule, setActiveModule] = useState('inicio');
  const [cart, setCart] = useState<any[]>([]);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [showCart, setShowCart] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const modules = [
    { id: 'inicio', nombre: 'Inicio', icon: Home },
    { id: 'clima', nombre: 'Clima', icon: CloudRain },
    { id: 'convertidor', nombre: 'Conversor', icon: Gauge },
    { id: 'catalogo', nombre: 'Catálogo', icon: Package },
    { id: 'taller', nombre: 'Taller', icon: Wrench },
    { id: 'admin', nombre: 'Admin', icon: Settings },
  ];

  if (showSplash) {
    return <SplashScreen viewMode={viewMode} setViewMode={setViewMode} onEnter={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 font-[Inter] text-white">
      {viewMode === 'mobile' ? (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="w-[390px] h-[844px] bg-slate-900 rounded-[3rem] border-4 border-slate-700 shadow-2xl shadow-cyan-500/10 overflow-hidden relative flex flex-col">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-2xl z-50" />
            <Header viewMode={viewMode} setViewMode={setViewMode} cartCount={cart.length} onCartClick={() => setShowCart(true)} />
            <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
              <ModuleRenderer module={activeModule} cart={cart} setCart={setCart} setActive={setActiveModule} products={products} setProducts={setProducts} />
            </div>
            <BottomNav active={activeModule} setActive={setActiveModule} modules={modules} />
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen">
          <DesktopSidebar active={activeModule} setActive={setActiveModule} modules={modules} viewMode={viewMode} setViewMode={setViewMode} cartCount={cart.length} onCartClick={() => setShowCart(true)} />
          <div className="flex-1 overflow-y-auto bg-slate-950">
            <ModuleRenderer module={activeModule} cart={cart} setCart={setCart} setActive={setActiveModule} products={products} setProducts={setProducts} />
          </div>
        </div>
      )}
      {showCart && <CartModal cart={cart} setCart={setCart} onClose={() => setShowCart(false)} />}
    </div>
  );
}

// ==================== SPLASH SCREEN ====================
function SplashScreen({ viewMode, setViewMode, onEnter }: any) {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnter = () => {
    setIsLoading(true);
    setTimeout(() => onEnter(), 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-[Inter] text-white relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20">
          <svg className="absolute bottom-0 w-full h-32 animate-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C150,90 350,30 500,60 C650,90 850,30 1000,60 C1150,90 1200,60 1200,60 L1200,120 L0,120 Z" fill="url(#wave-gradient-1)" />
          </svg>
          <svg className="absolute bottom-0 w-full h-24 animate-wave-slow" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,80 C200,50 400,110 600,80 C800,50 1000,110 1200,80 L1200,120 L0,120 Z" fill="url(#wave-gradient-2)" />
          </svg>
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </div>
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float-particle" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s` }} />
          ))}
        </div>
      </div>

      <div className="absolute top-6 right-6 z-50">
        <button onClick={() => setViewMode(viewMode === 'mobile' ? 'desktop' : 'mobile')} className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-full hover:bg-slate-700/80 transition-all">
          {viewMode === 'mobile' ? <Monitor size={16} className="text-cyan-400" /> : <Smartphone size={16} className="text-cyan-400" />}
          <span className="text-xs text-slate-300">{viewMode === 'mobile' ? 'Escritorio' : 'Móvil'}</span>
        </button>
      </div>

      <div className={`relative z-10 text-center px-6 max-w-lg transition-all duration-700 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="mb-8 relative">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-3xl blur-2xl opacity-30 animate-pulse" />
            <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-cyan-400 via-cyan-500 to-emerald-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/50 animate-float">
              <Anchor size={64} className="text-slate-950" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-shimmer-text">GERDIVER</h1>
        
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400" />
          <p className="text-sm font-semibold text-cyan-400 tracking-widest uppercase">Chile</p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400" />
        </div>

        <p className="text-slate-400 text-sm mb-2 leading-relaxed">Buceo Comercial & Servicios Marítimos</p>
        <p className="text-slate-500 text-xs mb-8">Puerto Montt • Servicios de inmersión, acuícola-salmonero, equipos marinos y taller especializado</p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 hover:border-cyan-500/50 transition-all">
            <CloudRain size={20} className="text-cyan-400 mx-auto mb-1" />
            <p className="text-[10px] text-slate-400">Clima & Mareas</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 hover:border-emerald-500/50 transition-all">
            <Package size={20} className="text-emerald-400 mx-auto mb-1" />
            <p className="text-[10px] text-slate-400">Catálogo</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 hover:border-amber-500/50 transition-all">
            <Wrench size={20} className="text-amber-400 mx-auto mb-1" />
            <p className="text-[10px] text-slate-400">Taller</p>
          </div>
        </div>

        <button onClick={handleEnter} disabled={isLoading} className="group relative w-full max-w-xs mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-bold rounded-2xl text-lg shadow-xl group-hover:shadow-2xl group-hover:shadow-cyan-500/50 transition-all group-hover:scale-105">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Ingresando...</span>
              </>
            ) : (
              <>
                <span>Ingresar</span>
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </div>
        </button>

        <div className="mt-8 flex items-center justify-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span>Puerto Montt</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone size={12} />
            <span>+569 8889 2747</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== HEADER ====================
function Header({ viewMode, setViewMode, cartCount, onCartClick }: any) {
  return (
    <div className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-8 pb-3 flex items-center justify-between z-40">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
          <Anchor size={16} className="text-slate-950" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-white leading-tight">GERDIVER</h1>
          <p className="text-[9px] text-cyan-400 leading-tight">Chile • Puerto Montt</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => setViewMode(viewMode === 'mobile' ? 'desktop' : 'mobile')} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
          {viewMode === 'mobile' ? <Monitor size={14} className="text-cyan-400" /> : <Smartphone size={14} className="text-cyan-400" />}
        </button>
        <button onClick={onCartClick} className="relative p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
          <ShoppingCart size={14} className="text-cyan-400" />
          {cartCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[9px] flex items-center justify-center font-bold">{cartCount}</span>}
        </button>
      </div>
    </div>
  );
}

// ==================== DESKTOP SIDEBAR ====================
function DesktopSidebar({ active, setActive, modules, viewMode, setViewMode, cartCount, onCartClick }: any) {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
            <Anchor size={20} className="text-slate-950" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">GERDIVER</h1>
            <p className="text-xs text-cyan-400">Chile • Puerto Montt</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {modules.map((m: any) => (
          <button key={m.id} onClick={() => setActive(m.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active === m.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <m.icon size={18} />
            <span className="text-sm font-medium">{m.nombre}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800 space-y-3">
        <button onClick={() => setViewMode(viewMode === 'mobile' ? 'desktop' : 'mobile')} className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
          {viewMode === 'mobile' ? <Monitor size={16} /> : <Smartphone size={16} />}
          <span className="text-xs">Cambiar a {viewMode === 'mobile' ? 'Escritorio' : 'Móvil'}</span>
        </button>
        <button onClick={onCartClick} className="w-full flex items-center gap-3 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <ShoppingCart size={16} />
          <span className="text-xs">Carrito ({cartCount})</span>
        </button>
      </div>
    </div>
  );
}

// ==================== BOTTOM NAV ====================
function BottomNav({ active, setActive, modules }: any) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 px-2 pb-4 pt-2">
      <div className="flex justify-around">
        {modules.map((m: any) => (
          <button key={m.id} onClick={() => setActive(m.id)} className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all ${active === m.id ? 'text-cyan-400' : 'text-slate-500'}`}>
            <m.icon size={18} />
            <span className="text-[9px] font-medium">{m.nombre}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ==================== MODULE RENDERER ====================
function ModuleRenderer({ module, cart, setCart, setActive, products, setProducts }: any) {
  switch (module) {
    case 'inicio': return <InicioModule setActive={setActive} />;
    case 'clima': return <ClimaModule />;
    case 'convertidor': return <ConversorModule />;
    case 'catalogo': return <CatalogoModule cart={cart} setCart={setCart} products={products} />;
    case 'taller': return <TallerModule />;
    case 'admin': return <AdminModule products={products} setProducts={setProducts} />;
    default: return <InicioModule setActive={setActive} />;
  }
}

// ==================== INICIO MODULE ====================
function InicioModule({ setActive }: any) {
  return (
    <div className="p-4 space-y-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/20 via-slate-800 to-emerald-500/20 p-6 border border-cyan-500/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Ship size={20} className="text-cyan-400" />
            <span className="text-xs text-cyan-400 font-medium">Bienvenido a Gerdiver</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Buceo Comercial & Servicios Marítimos</h2>
          <p className="text-sm text-slate-400">Puerto Montt, Chile • Servicios de inmersión, acuícola-salmonero y taller especializado</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <QuickCard icon={CloudRain} title="Clima & Mareas" subtitle="SHOA / DIRECTEMAR" color="cyan" onClick={() => setActive('clima')} />
        <QuickCard icon={Gauge} title="Conversor KT" subtitle="Nudos & Brújula" color="emerald" onClick={() => setActive('convertidor')} />
        <QuickCard icon={Package} title="Catálogo" subtitle="Equipos de Buceo" color="amber" onClick={() => setActive('catalogo')} />
        <QuickCard icon={Wrench} title="Taller" subtitle="Prueba Hidrostática" color="rose" onClick={() => setActive('taller')} />
      </div>

      <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Bell size={16} className="text-amber-400" />
          <span className="text-sm font-semibold text-white">Alertas Operativas</span>
        </div>
        <div className="space-y-2">
          <AlertItem severity="warning" text="Puerto Williams: Vientos 45 KT - Riesgo alto de inmersión" />
          <AlertItem severity="danger" text="Melinka: Lluvia activa - Revisar condiciones antes de zarpar" />
          <AlertItem severity="info" text="Puerto Montt: Condiciones óptimas para inmersión" />
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Activity size={16} className="text-emerald-400" />
          <span className="text-sm font-semibold text-white">Servicios Destacados</span>
        </div>
        <div className="space-y-2">
          <ServiceItem icon="🤿" text="Buceo Comercial e Industrial" />
          <ServiceItem icon="🐟" text="Servicios Acuícola-Salmoneros" />
          <ServiceItem icon="🔧" text="Taller & Prueba Hidrostática" />
          <ServiceItem icon="🫧" text="Oxígeno Medicinal Certificado" />
        </div>
      </div>
    </div>
  );
}

function QuickCard({ icon: Icon, title, subtitle, color, onClick }: any) {
  const colors: any = {
    cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 text-cyan-400',
    emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-400',
    amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-400',
    rose: 'from-rose-500/20 to-rose-500/5 border-rose-500/20 text-rose-400',
  };
  return (
    <div onClick={onClick} className={`bg-gradient-to-br ${colors[color]} rounded-xl p-4 border cursor-pointer hover:scale-[1.02] transition-transform active:scale-95`}>
      <Icon size={20} className="mb-2" />
      <p className="text-xs font-semibold text-white">{title}</p>
      <p className="text-[10px] text-slate-400">{subtitle}</p>
    </div>
  );
}

function AlertItem({ severity, text }: any) {
  const colors: any = { warning: 'text-amber-400 bg-amber-400/10', danger: 'text-rose-400 bg-rose-400/10', info: 'text-emerald-400 bg-emerald-400/10' };
  return (
    <div className={`flex items-start gap-2 p-2 rounded-lg ${colors[severity]}`}>
      <AlertTriangle size={12} className="mt-0.5 shrink-0" />
      <span className="text-[11px]">{text}</span>
    </div>
  );
}

function ServiceItem({ icon, text }: any) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/50">
      <span className="text-sm">{icon}</span>
      <span className="text-xs text-slate-300">{text}</span>
    </div>
  );
}

// ==================== CLIMA MODULE ====================
function ClimaModule() {
  const [selectedPuerto, setSelectedPuerto] = useState(PUERTOS_DATA[0]);
  const [regionFilter, setRegionFilter] = useState('Todas');
  const [soloSalmonero, setSoloSalmonero] = useState(false);
  const [soloLluvia, setSoloLluvia] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filtered = PUERTOS_DATA.filter(p => {
    if (regionFilter !== 'Todas' && p.region !== regionFilter) return false;
    if (soloSalmonero && !p.esSalmonero) return false;
    if (soloLluvia && !p.lluvia) return false;
    if (searchText && !p.nombre.toLowerCase().includes(searchText.toLowerCase())) return false;
    return true;
  });

  const recomendacion = getRecomendacionInmersion(selectedPuerto.oleaje, selectedPuerto.viento);
  const beaufort = getBeaufort(selectedPuerto.viento);
  const dirCardinal = getDireccionCardinal(selectedPuerto.dirViento);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <CloudRain size={20} className="text-cyan-400" />
        <h2 className="text-lg font-bold text-white">Clima & Mareas</h2>
      </div>
      <p className="text-xs text-slate-400 -mt-2">Datos SHOA / DIRECTEMAR - Sur de Chile</p>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Buscar puerto..." className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {['Todas', 'Los Lagos', 'Aysén', 'Magallanes'].map(r => (
          <button key={r} onClick={() => setRegionFilter(r)} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${regionFilter === r ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>{r}</button>
        ))}
        <button onClick={() => setSoloSalmonero(!soloSalmonero)} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${soloSalmonero ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>🐟 Salmoneros</button>
        <button onClick={() => setSoloLluvia(!soloLluvia)} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${soloLluvia ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>🌧️ Lluvia</button>
      </div>

      <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-hide">
        {filtered.map(p => (
          <button key={p.id} onClick={() => setSelectedPuerto(p)} className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${selectedPuerto.id === p.id ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800'}`}>
            <div className="flex items-center gap-2">
              <MapPin size={12} className={selectedPuerto.id === p.id ? 'text-cyan-400' : 'text-slate-500'} />
              <span className="text-xs font-medium text-white">{p.nombre}</span>
              {p.esSalmonero && <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full">Salmonero</span>}
            </div>
            <div className="flex items-center gap-2">
              {p.lluvia && <CloudRain size={12} className="text-blue-400" />}
              <span className="text-[10px] text-slate-400">{p.temp}°C</span>
            </div>
          </button>
        ))}
      </div>

      {selectedPuerto.lluvia && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-center gap-2">
          <AlertTriangle size={16} className="text-amber-400 shrink-0" />
          <p className="text-xs text-amber-300"><strong>⚠️ Alerta Operativa:</strong> Lluvia activa en {selectedPuerto.nombre}. Verificar condiciones antes de inmersión.</p>
        </div>
      )}

      <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">{selectedPuerto.nombre}</h3>
            <p className="text-[11px] text-slate-400">{selectedPuerto.region} • {selectedPuerto.lat.toFixed(2)}°, {selectedPuerto.lon.toFixed(2)}°</p>
          </div>
          <div className={`px-3 py-1 rounded-lg text-${recomendacion.color}-400 bg-${recomendacion.color}-400/10 border border-${recomendacion.color}-400/20`}>
            <span className="text-[11px] font-bold">{recomendacion.texto}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-900/50 rounded-xl p-3 text-center">
            <Thermometer size={16} className="text-rose-400 mx-auto mb-1" />
            <p className="text-lg font-bold text-white">{selectedPuerto.temp}°</p>
            <p className="text-[9px] text-slate-500">Temperatura</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-3 text-center">
            <Wind size={16} className="text-cyan-400 mx-auto mb-1" />
            <p className="text-lg font-bold text-white">{selectedPuerto.viento}</p>
            <p className="text-[9px] text-slate-500">Nudos (KT)</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-3 text-center">
            <Waves size={16} className="text-emerald-400 mx-auto mb-1" />
            <p className="text-lg font-bold text-white">{selectedPuerto.oleaje}m</p>
            <p className="text-[9px] text-slate-500">Oleaje</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900/50 rounded-xl p-3">
            <p className="text-[10px] text-slate-500 mb-1">Viento</p>
            <p className="text-sm font-semibold text-white">{selectedPuerto.viento} KT</p>
            <p className="text-[10px] text-slate-400">{(selectedPuerto.viento * 1.852).toFixed(1)} km/h • {(selectedPuerto.viento * 0.5144).toFixed(1)} m/s</p>
            <p className="text-[10px] text-slate-400">Ráfagas: {selectedPuerto.rafagas} KT</p>
            <p className="text-[10px] text-cyan-400">Beaufort {beaufort.escala}: {beaufort.descripcion}</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-3">
            <p className="text-[10px] text-slate-500 mb-1">Estado del Mar</p>
            <p className="text-sm font-semibold text-white">{selectedPuerto.estadoMar}</p>
            <p className="text-[10px] text-slate-400">Oleaje: {selectedPuerto.oleaje}m</p>
            <p className="text-[10px] text-slate-400">Dir. Viento: {selectedPuerto.dirViento}° ({dirCardinal})</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <WindDial degrees={selectedPuerto.dirViento} />
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Droplets size={16} className="text-cyan-400" />
          <span className="text-sm font-semibold text-white">Mareas del Día</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {selectedPuerto.mareas.map((m: any, i: number) => (
            <div key={i} className={`p-3 rounded-xl ${m.tipo === 'Pleamar' ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-slate-900/50 border border-slate-700'}`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400">{m.tipo}</span>
                <span className="text-[10px] text-slate-500">{m.hora} hrs</span>
              </div>
              <p className="text-lg font-bold text-white mt-1">{m.altura}m</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WindDial({ degrees }: { degrees: number }) {
  return (
    <div className="relative w-32 h-32">
      <div className="absolute inset-0 rounded-full border-2 border-slate-700 bg-slate-900/50">
        {['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'].map((dir, i) => {
          const angle = i * 45;
          const rad = (angle - 90) * (Math.PI / 180);
          const x = 50 + 42 * Math.cos(rad);
          const y = 50 + 42 * Math.sin(rad);
          return <span key={dir} className="absolute text-[8px] text-slate-500 font-medium" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>{dir}</span>;
        })}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border border-slate-700 bg-slate-800/50 flex items-center justify-center">
          <Navigation size={14} className="text-cyan-400" style={{ transform: `rotate(${degrees}deg)` }} />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent origin-center" style={{ transform: `rotate(${degrees}deg)` }} />
      </div>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-slate-800 px-2 py-0.5 rounded-full">
        <span className="text-[9px] font-bold text-cyan-400">{degrees}° {getDireccionCardinal(degrees)}</span>
      </div>
    </div>
  );
}

// ==================== CONVERSOR MODULE ====================
function ConversorModule() {
  const [nudos, setNudos] = useState(15);
  const [compassAngle, setCompassAngle] = useState(0);
  const [useGyroscope, setUseGyroscope] = useState(false);
  const beaufort = getBeaufort(nudos);
  const kmh = (nudos * 1.852).toFixed(1);
  const ms = (nudos * 0.5144).toFixed(2);

  useEffect(() => {
    if (useGyroscope) {
      const handler = (e: any) => {
        if (e.webkitCompassHeading !== undefined) {
          setCompassAngle(Math.round(e.webkitCompassHeading));
        } else if (e.alpha !== null) {
          setCompassAngle(Math.round(360 - e.alpha));
        }
      };
      window.addEventListener('deviceorientation', handler);
      return () => window.removeEventListener('deviceorientation', handler);
    }
  }, [useGyroscope]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Gauge size={20} className="text-emerald-400" />
        <h2 className="text-lg font-bold text-white">Conversor & Brújula</h2>
      </div>

      <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 space-y-4">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-amber-400" />
          <span className="text-sm font-semibold text-white">Transformador Marítimo</span>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 uppercase tracking-wider">Velocidad en Nudos (KT)</label>
          <input type="range" min="0" max="80" value={nudos} onChange={e => setNudos(Number(e.target.value))} className="w-full mt-2 accent-cyan-400" />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-slate-500">0 KT</span>
            <span className="text-lg font-bold text-cyan-400">{nudos} KT</span>
            <span className="text-[10px] text-slate-500">80 KT</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-900/50 rounded-xl p-3 text-center">
            <p className="text-[9px] text-slate-500 uppercase">Nudos</p>
            <p className="text-lg font-bold text-cyan-400">{nudos}</p>
            <p className="text-[9px] text-slate-500">KT</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-3 text-center">
            <p className="text-[9px] text-slate-500 uppercase">Km/h</p>
            <p className="text-lg font-bold text-emerald-400">{kmh}</p>
            <p className="text-[9px] text-slate-500">km/h</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-3 text-center">
            <p className="text-[9px] text-slate-500 uppercase">Metros/s</p>
            <p className="text-lg font-bold text-amber-400">{ms}</p>
            <p className="text-[9px] text-slate-500">m/s</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-xl p-3 border border-cyan-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400">Escala Beaufort</p>
              <p className="text-sm font-bold text-white">Fuerza {beaufort.escala}: {beaufort.descripcion}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center">
              <span className="text-lg font-bold text-cyan-400">{beaufort.escala}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass size={16} className="text-cyan-400" />
            <span className="text-sm font-semibold text-white">Brújula Digital</span>
          </div>
          <button onClick={() => setUseGyroscope(!useGyroscope)} className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${useGyroscope ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-400'}`}>
            {useGyroscope ? '📱 Giroscopio ON' : '📱 Giroscopio OFF'}
          </button>
        </div>

        <div className="flex justify-center py-4">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 rounded-full border-4 border-slate-700 bg-slate-900/80" style={{ transform: `rotate(-${compassAngle}deg)`, transition: useGyroscope ? 'none' : 'transform 0.3s ease' }}>
              {['N', 'E', 'S', 'O'].map((dir, i) => {
                const angle = i * 90;
                const rad = (angle - 90) * (Math.PI / 180);
                const x = 50 + 38 * Math.cos(rad);
                const y = 50 + 38 * Math.sin(rad);
                return <span key={dir} className="absolute text-xs font-bold" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', color: dir === 'N' ? '#f43f5e' : '#94a3b8' }}>{dir}</span>;
              })}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-400/20">
                <div className="text-center">
                  <p className="text-lg font-bold text-cyan-400">{compassAngle}°</p>
                  <p className="text-[8px] text-slate-400">{getDireccionCardinal(compassAngle)}</p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent border-t-rose-500" />
            </div>
          </div>
        </div>

        {!useGyroscope && (
          <div>
            <label className="text-[10px] text-slate-400 uppercase tracking-wider">Control Manual</label>
            <input type="range" min="0" max="360" value={compassAngle} onChange={e => setCompassAngle(Number(e.target.value))} className="w-full mt-2 accent-cyan-400" />
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-slate-500">0°</span>
              <span className="text-[10px] text-slate-500">360°</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== CATALOGO MODULE ====================
function CatalogoModule({ cart, setCart, products }: any) {
  const [plans] = useState(INITIAL_PLANS);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.categoria)))];

  const filtered = products.filter(p => {
    if (catFilter !== 'Todos' && p.categoria !== catFilter) return false;
    if (search && !p.nombre.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const addToCart = () => {
    if (!selectedProduct) return;
    const item = {
      product: selectedProduct,
      mode: 'comprar',
      quantity,
      days: 0,
      plan: selectedPlan,
      id: Date.now(),
    };
    setCart([...cart, item]);
    setSelectedProduct(null);
    setQuantity(1);
    setSelectedPlan(null);
  };

  const getPrice = () => {
    if (!selectedProduct) return 0;
    let base = selectedProduct.precioVenta * quantity;
    if (selectedPlan) base = base * (1 - selectedPlan.descuento / 100);
    return Math.round(base);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Package size={20} className="text-amber-400" />
        <h2 className="text-lg font-bold text-white">Catálogo Gerdiver</h2>
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar producto..." className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map(c => (
          <button key={c} onClick={() => setCatFilter(c)} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${catFilter === c ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>{c}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(p => (
          <div key={p.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-amber-500/30 transition-all">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 rounded-xl bg-slate-900 overflow-hidden flex-shrink-0 flex items-center justify-center">
                {p.imagen && p.imagen.startsWith('http') ? (
                  <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">{p.imagen || '📦'}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">{p.nombre}</h3>
                <p className="text-[10px] text-slate-400">{p.categoria} • Stock: {p.stock}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-bold text-emerald-400">{formatCLP(p.precioVenta)}</span>
                </div>
              </div>
              <button onClick={() => setSelectedProduct(p)} className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 text-[11px] font-medium hover:bg-amber-500/20 transition-all">
                Ver
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="w-full max-w-[390px] bg-slate-900 rounded-t-3xl border-t border-slate-700 max-h-[85vh] overflow-y-auto">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">{selectedProduct.nombre}</h3>
                <button onClick={() => setSelectedProduct(null)} className="p-1 rounded-lg bg-slate-800"><X size={16} className="text-slate-400" /></button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-24 h-24 rounded-xl bg-slate-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {selectedProduct.imagen && selectedProduct.imagen.startsWith('http') ? (
                    <img src={selectedProduct.imagen} alt={selectedProduct.nombre} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl">{selectedProduct.imagen || '📦'}</span>
                  )}
                </div>
                <div>
                  <p className="text-xs text-slate-400">{selectedProduct.categoria}</p>
                  <p className="text-sm text-slate-300 mt-1">{selectedProduct.descripcion}</p>
                </div>
              </div>

              <div>
                <button className="w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950">
                  💰 Comprar
                </button>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">Planes de Descuento</p>
                <div className="space-y-2">
                  {plans.filter(pl => pl.tipo === 'venta').map(pl => (
                    <button key={pl.id} onClick={() => setSelectedPlan(selectedPlan?.id === pl.id ? null : pl)} className={`w-full p-3 rounded-xl text-left transition-all ${selectedPlan?.id === pl.id ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-slate-800 border border-slate-700'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-white">{pl.nombre}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full">-{pl.descuento}%</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">{pl.descripcion}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400">Cantidad</label>
                <div className="flex items-center gap-2 mt-1">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center">-</button>
                  <span className="text-sm font-bold text-white w-8 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center">+</button>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Total</span>
                  <span className="text-xl font-bold text-emerald-400">{formatCLP(getPrice())}</span>
                </div>
                {selectedPlan && <p className="text-[10px] text-cyan-400 mt-1">Plan aplicado: {selectedPlan.nombre} (-{selectedPlan.descuento}%)</p>}
              </div>

              <button onClick={addToCart} className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold rounded-xl text-sm hover:opacity-90 transition-opacity">
                <ShoppingCart size={16} className="inline mr-2" />Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== TALLER MODULE ====================
function TallerModule() {
  const [searchCode, setSearchCode] = useState('');
  const [selectedOrden, setSelectedOrden] = useState(ORDENES_TALLER[0]);

  const filtered = ORDENES_TALLER.filter(o =>
    o.id.toLowerCase().includes(searchCode.toLowerCase()) ||
    o.cilindro.toLowerCase().includes(searchCode.toLowerCase()) ||
    o.cliente.toLowerCase().includes(searchCode.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Wrench size={20} className="text-rose-400" />
        <h2 className="text-lg font-bold text-white">Trazabilidad de Taller</h2>
      </div>
      <p className="text-xs text-slate-400 -mt-2">Prueba Hidrostática de Cilindros</p>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input value={searchCode} onChange={e => setSearchCode(e.target.value)} placeholder="Buscar por código (ej: GERD-8942-PM)..." className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none" />
      </div>

      <div className="space-y-2">
        {filtered.map(o => (
          <button key={o.id} onClick={() => setSelectedOrden(o)} className={`w-full p-3 rounded-xl text-left transition-all ${selectedOrden.id === o.id ? 'bg-rose-500/10 border border-rose-500/30' : 'bg-slate-800/50 border border-slate-700/50'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">{o.id}</p>
                <p className="text-[10px] text-slate-400">{o.cilindro}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-rose-400">Paso {o.paso}/6</p>
                <p className="text-[9px] text-slate-500">{o.fecha}</p>
              </div>
            </div>
            <div className="mt-2 w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-rose-500 to-amber-400 rounded-full transition-all" style={{ width: `${(o.paso / 6) * 100}%` }} />
            </div>
          </button>
        ))}
      </div>

      {selectedOrden && (
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">{selectedOrden.id}</h3>
              <p className="text-[10px] text-slate-400">{selectedOrden.cliente} • {selectedOrden.cilindro}</p>
            </div>
            <span className="text-[10px] px-2 py-1 bg-rose-500/20 text-rose-400 rounded-full">Paso {selectedOrden.paso}/6</span>
          </div>

          <div className="space-y-0">
            {PASOS_TALLER.map((paso, i) => {
              const isCompleted = i < selectedOrden.paso;
              const isCurrent = i === selectedOrden.paso - 1;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${isCompleted ? 'bg-emerald-500/20 border-2 border-emerald-400' : isCurrent ? 'bg-amber-500/20 border-2 border-amber-400 animate-pulse' : 'bg-slate-800 border border-slate-700'}`}>
                      {isCompleted ? '✓' : paso.icon}
                    </div>
                    {i < PASOS_TALLER.length - 1 && <div className={`w-0.5 h-8 ${isCompleted ? 'bg-emerald-400' : 'bg-slate-700'}`} />}
                  </div>
                  <div className="pt-1">
                    <p className={`text-xs font-medium ${isCompleted ? 'text-emerald-400' : isCurrent ? 'text-amber-400' : 'text-slate-500'}`}>{paso.nombre}</p>
                    <p className="text-[10px] text-slate-500">{paso.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== ADMIN MODULE ====================
function AdminModule({ products, setProducts }: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    precioVenta: 0,
    precioArriendo: 0,
    stock: 0,
    imagen: '',
    descripcion: ''
  });

  const handleLogin = () => {
    if (pin === '1234') setIsAuthenticated(true);
  };

  const saveProduct = () => {
    if (!formData.nombre || !formData.categoria) return;
    
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...formData, id: p.id } : p));
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingProduct(null);
    setFormData({ nombre: '', categoria: '', precioVenta: 0, precioArriendo: 0, stock: 0, imagen: '', descripcion: '' });
  };

  const editProduct = (product: any) => {
    setEditingProduct(product);
    setFormData({
      nombre: product.nombre,
      categoria: product.categoria,
      precioVenta: product.precioVenta,
      precioArriendo: product.precioArriendo,
      stock: product.stock,
      imagen: product.imagen,
      descripcion: product.descripcion
    });
    setShowForm(true);
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 w-full max-w-xs text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto">
            <Lock size={24} className="text-rose-400" />
          </div>
          <h2 className="text-lg font-bold text-white">Panel Admin</h2>
          <p className="text-xs text-slate-400">Ingrese PIN de acceso</p>
          <input type="password" value={pin} onChange={e => setPin(e.target.value)} placeholder="PIN (1234)" className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-center text-lg text-white tracking-widest focus:border-rose-500 focus:outline-none" onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          <button onClick={handleLogin} className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-bold rounded-xl text-sm">
            <Unlock size={16} className="inline mr-2" />Acceder
          </button>
          <p className="text-[10px] text-slate-500">Demo: PIN 1234</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Settings size={20} className="text-rose-400" />
          <h2 className="text-lg font-bold text-white">Admin</h2>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="px-3 py-1.5 bg-slate-800 rounded-lg text-[10px] text-slate-400 hover:text-white">
          <Lock size={12} className="inline mr-1" />Salir
        </button>
      </div>

      {/* Stats */}
      <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
        <p className="text-[10px] text-slate-500">Total Productos</p>
        <p className="text-2xl font-bold text-white">{products.length}</p>
      </div>

      {/* Title */}
      <div className="flex items-center gap-2">
        <Package size={16} className="text-rose-400" />
        <h3 className="text-sm font-semibold text-white">Gestión de Productos</h3>
      </div>

      <div className="space-y-3">
        <button onClick={() => { setShowForm(true); setEditingProduct(null); setFormData({ nombre: '', categoria: '', precioVenta: 0, precioArriendo: 0, stock: 0, imagen: '', descripcion: '' }); }} className="w-full py-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-semibold">
          <Plus size={14} className="inline mr-1" />Nuevo Producto
        </button>

        {products.map(p => (
          <div key={p.id} className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-slate-900 overflow-hidden flex-shrink-0 flex items-center justify-center">
                {p.imagen && p.imagen.startsWith('http') ? (
                  <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lg">{p.imagen || '📦'}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{p.nombre}</p>
                <p className="text-[10px] text-slate-400">{p.categoria} • Stock: {p.stock}</p>
                <p className="text-[10px] text-emerald-400">{formatCLP(p.precioVenta)}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => editProduct(p)} className="p-1.5 rounded-lg bg-slate-700 text-slate-400 hover:text-white">
                  <Edit size={12} />
                </button>
                <button onClick={() => deleteProduct(p.id)} className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="w-full max-w-[390px] bg-slate-900 rounded-t-3xl border-t border-slate-700 max-h-[90vh] overflow-y-auto">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                <button onClick={() => { setShowForm(false); setEditingProduct(null); }} className="p-1 rounded-lg bg-slate-800">
                  <X size={16} className="text-slate-400" />
                </button>
              </div>

              {/* Image Preview */}
              {formData.imagen && formData.imagen.startsWith('http') && (
                <div className="w-full h-48 rounded-xl bg-slate-800 overflow-hidden border border-slate-700">
                  <img src={formData.imagen} alt="Vista previa" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 block">Nombre del producto *</label>
                  <input
                    value={formData.nombre}
                    onChange={e => setFormData({...formData, nombre: e.target.value})}
                    placeholder="Ej: Traje Neopreno 7mm"
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 block">Categoría *</label>
                  <input
                    value={formData.categoria}
                    onChange={e => setFormData({...formData, categoria: e.target.value})}
                    placeholder="Ej: Trajes, Reguladores, Equipos"
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 block">URL de imagen</label>
                  <input
                    value={formData.imagen}
                    onChange={e => setFormData({...formData, imagen: e.target.value})}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                  <p className="text-[9px] text-slate-500 mt-1">Ingresa la URL de una imagen del producto</p>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 block">Descripción</label>
                  <textarea
                    value={formData.descripcion}
                    onChange={e => setFormData({...formData, descripcion: e.target.value})}
                    placeholder="Descripción detallada del producto, características técnicas, materiales, etc."
                    rows={4}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 resize-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 block">Precio Venta (CLP)</label>
                  <input
                    type="number"
                    value={formData.precioVenta || ''}
                    onChange={e => setFormData({...formData, precioVenta: Number(e.target.value)})}
                    placeholder="450000"
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 block">Stock disponible</label>
                  <input
                    type="number"
                    value={formData.stock || ''}
                    onChange={e => setFormData({...formData, stock: Number(e.target.value)})}
                    placeholder="10"
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <button
                onClick={saveProduct}
                disabled={!formData.nombre || !formData.categoria}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-bold rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check size={16} className="inline mr-2" />
                {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== CART MODAL ====================
function CartModal({ cart, setCart, onClose }: any) {
  const total = cart.reduce((sum: number, item: any) => {
    let price = item.product.precioVenta * item.quantity;
    if (item.plan) price = price * (1 - item.plan.descuento / 100);
    return sum + Math.round(price);
  }, 0);

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item: any) => item.id !== id));
  };

  const sendWhatsApp = () => {
    let msg = `🤿 *COTIZACIÓN GERDIVER CHILE*\n`;
    msg += `━━━━━━━━━━━━━━━━━━\n\n`;
    cart.forEach((item: any, i: number) => {
      const price = item.product.precioVenta * item.quantity;
      const finalPrice = item.plan ? price * (1 - item.plan.descuento / 100) : price;
      msg += `${i + 1}. *${item.product.nombre}*\n`;
      msg += `   Cantidad: ${item.quantity}\n`;
      if (item.plan) msg += `   Plan: ${item.plan.nombre} (-${item.plan.descuento}%)\n`;
      msg += `   Subtotal: ${formatCLP(Math.round(finalPrice))}\n\n`;
    });
    msg += `━━━━━━━━━━━━━━━━━━\n`;
    msg += `💵 *TOTAL: ${formatCLP(total)} CLP*\n\n`;
    msg += `📍 Puerto Montt, Chile\n`;
    msg += `📞 +569 8889 2747`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/56988892747?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center">
      <div className="w-full max-w-[390px] bg-slate-900 rounded-t-3xl border-t border-slate-700 max-h-[85vh] overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart size={18} className="text-cyan-400" />
              <h3 className="text-base font-bold text-white">Cotización</h3>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg bg-slate-800"><X size={16} className="text-slate-400" /></button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart size={40} className="text-slate-700 mx-auto mb-3" />
              <p className="text-sm text-slate-500">Carrito vacío</p>
              <p className="text-xs text-slate-600">Agrega productos desde el catálogo</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {cart.map((item: any) => {
                  const price = item.product.precioVenta * item.quantity;
                  const finalPrice = item.plan ? price * (1 - item.plan.descuento / 100) : price;
                  return (
                    <div key={item.id} className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-slate-900 overflow-hidden flex-shrink-0 flex items-center justify-center">
                            {item.product.imagen && item.product.imagen.startsWith('http') ? (
                              <img src={item.product.imagen} alt={item.product.nombre} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-lg">{item.product.imagen || '📦'}</span>
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">{item.product.nombre}</p>
                            <p className="text-[10px] text-slate-400">💰 Compra • Cant: {item.quantity}</p>
                            {item.plan && <p className="text-[10px] text-cyan-400">Plan: {item.plan.nombre}</p>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-emerald-400">{formatCLP(Math.round(finalPrice))}</p>
                          <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-rose-400 mt-1">Eliminar</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Total</span>
                  <span className="text-xl font-bold text-emerald-400">{formatCLP(total)} CLP</span>
                </div>
              </div>

              <button onClick={sendWhatsApp} className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <MessageCircle size={18} />
                Enviar Cotización por WhatsApp
              </button>
              <p className="text-center text-[10px] text-slate-500">Se enviará a +569 8889 2747</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
