import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  Rocket, ArrowRight, MessageSquare, CheckCircle, RefreshCw, 
  Sparkles, ShieldAlert, Lock, DollarSign, Star, Check, ChevronDown, Globe
} from 'lucide-react';

interface AuthProps {
  onLogin: (user: UserProfile) => void;
}

const COUNTRIES = [
    { code: '+51', flag: '🇵🇪', name: 'Perú' },
    { code: '+52', flag: '🇲🇽', name: 'México' },
    { code: '+57', flag: '🇨🇴', name: 'Colombia' },
    { code: '+54', flag: '🇦🇷', name: 'Argentina' },
    { code: '+34', flag: '🇪🇸', name: 'España' },
    { code: '+56', flag: '🇨🇱', name: 'Chile' },
    { code: '+593', flag: '🇪🇨', name: 'Ecuador' },
    { code: '+502', flag: '🇬🇹', name: 'Guatemala' },
    { code: '+506', flag: '🇨🇷', name: 'Costa Rica' },
    { code: '+503', flag: '🇸🇻', name: 'El Salvador' },
    { code: '+507', flag: '🇵🇦', name: 'Panamá' },
    { code: '+591', flag: '🇧🇴', name: 'Bolivia' },
    { code: '+598', flag: '🇺🇾', name: 'Uruguay' },
    { code: '+58', flag: '🇻🇪', name: 'Venezuela' },
    { code: '+1', flag: '🇺🇸', name: 'USA' },
];

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<'CLIENT' | 'DEMO'>('CLIENT');
  const [loading, setLoading] = useState(false);
  
  // Login State
  const [loginStep, setLoginStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [countryCode, setCountryCode] = useState('+51');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  
  // God Mode State
  const [logoClicks, setLogoClicks] = useState(0);
  const [showGodMode, setShowGodMode] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');
  const [godError, setGodError] = useState('');

  const handleLogoClick = () => {
    setLogoClicks(prev => {
      const newCount = prev + 1;
      if (newCount === 4) {
        setShowGodMode(true);
        return 0;
      }
      return newCount;
    });
    setTimeout(() => setLogoClicks(0), 1000);
  };

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 4) return;
    setLoading(true);
    // Simulate API call to send WhatsApp
    setTimeout(() => {
      setLoading(false);
      setLoginStep('OTP');
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        if (activeTab === 'CLIENT') {
            // Existing Client Login
            onLogin({ id: `user-${phoneNumber}`, name: 'Emprendedor PosGo!', role: 'cashier' });
        } else {
            // Lead / Demo Login
            // We capture the number in the ID or Name to track the lead
            const fullPhone = `${countryCode} ${phoneNumber}`;
            onLogin({ 
                id: 'test-user-demo', 
                name: `Lead: ${fullPhone}`, 
                role: 'admin' 
            });
        }
    }, 1500);
  };

  // Reset flow when switching tabs
  const handleTabSwitch = (tab: 'CLIENT' | 'DEMO') => {
      setActiveTab(tab);
      setLoginStep('PHONE');
      setPhoneNumber('');
      setOtpCode('');
      setGodError('');
  };

  const handleGodModeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (masterPassword === 'Luis2021') {
       onLogin({ id: 'god-mode', name: 'Super Admin', role: 'admin' });
    } else {
       setGodError('Acceso Denegado');
       setMasterPassword('');
    }
  };

  const currentCountry = COUNTRIES.find(c => c.code === countryCode);

  return (
    <div className="min-h-screen flex bg-white font-inter overflow-hidden relative selection:bg-indigo-500 selection:text-white">
        
        {/* SOFTER PASTEL BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#f8fafc]">
            {/* Very Soft Teal Blob */}
            <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-teal-100/40 rounded-full blur-[120px] animate-blob mix-blend-multiply"></div>
            {/* Very Soft Indigo Blob */}
            <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-100/40 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
            {/* Very Soft Pink Blob */}
            <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-pink-100/40 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-multiply"></div>
        </div>

        {/* LEFT PANEL: INSPIRATION & GROWTH */}
        <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center items-center p-12">
             <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
                  
                  {/* Central Visual: The "Business Engine" */}
                  <div className="relative z-10 bg-white/60 backdrop-blur-xl p-8 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(99,102,241,0.1)] animate-float border border-white">
                      <div className="w-48 h-48 bg-gradient-to-tr from-indigo-400 to-violet-500 rounded-[2.5rem] flex items-center justify-center shadow-lg transform rotate-3 relative overflow-hidden">
                          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                          <Rocket className="w-24 h-24 text-white drop-shadow-md" />
                      </div>
                  </div>

                  {/* Floating Success Card 1 - Soft Mint */}
                  <div className="absolute top-20 right-0 bg-white/80 backdrop-blur-xl p-4 pr-8 rounded-3xl shadow-lg animate-float-slow animation-delay-2000 flex items-center gap-4 border border-white/50">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                          <DollarSign className="w-6 h-6 stroke-[3]"/>
                      </div>
                      <div>
                          <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Venta Exitosa</p>
                          <p className="text-xl font-black text-slate-700">+ S/ 150.00</p>
                      </div>
                  </div>

                  {/* Floating Success Card 2 - Soft Pink */}
                  <div className="absolute bottom-32 -left-8 bg-white/80 backdrop-blur-xl p-4 pr-8 rounded-3xl shadow-lg animate-float animation-delay-4000 flex items-center gap-4 border border-white/50">
                      <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500">
                          <Star className="w-6 h-6 fill-current"/>
                      </div>
                      <div>
                          <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Clientes Felices</p>
                          <p className="text-xl font-black text-slate-700">5.0 Estrellas</p>
                      </div>
                  </div>
             </div>

             <div className="mt-8 text-center max-w-md z-20">
                 <h1 className="text-5xl font-black text-slate-800 tracking-tight mb-4 leading-tight">
                     Haz Despegar <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600">Tu Negocio 🚀</span>
                 </h1>
                 <p className="text-slate-500 text-lg font-medium">
                     La herramienta favorita de los emprendedores para vender más y ordenarse mejor.
                 </p>
             </div>
        </div>

        {/* RIGHT PANEL: ACTION AREA */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 relative z-20">
            <div className="w-full max-w-[440px]">
                
                {/* Mobile Logo */}
                <div className="lg:hidden flex justify-center mb-10">
                    <button onClick={handleLogoClick} className="w-20 h-20 bg-white border border-slate-100 rounded-[2rem] flex items-center justify-center shadow-xl transform rotate-3">
                        <Rocket className="w-10 h-10 text-indigo-600"/>
                    </button>
                </div>

                {/* Login Card */}
                <div className="bg-white/70 backdrop-blur-2xl border border-white p-10 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
                    
                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-300 via-teal-300 to-indigo-300"></div>

                    <div className="text-center mb-8 mt-2">
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">
                            {activeTab === 'CLIENT' ? '¡Hola, Emprendedor! 👋' : 'Prueba Gratis 🚀'}
                        </h2>
                        <p className="text-slate-500 font-medium">
                            {activeTab === 'CLIENT' ? 'Ingresa a tu panel de control' : 'Regístrate y comienza tu demo'}
                        </p>
                    </div>

                    {/* PASTEL TABS */}
                    <div className="flex gap-4 mb-8">
                        <button 
                            onClick={() => handleTabSwitch('CLIENT')}
                            className={`flex-1 py-4 rounded-2xl text-sm font-black transition-all duration-300 border-2 flex flex-col items-center justify-center gap-1 ${
                                activeTab === 'CLIENT' 
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700 shadow-lg shadow-emerald-100/50 scale-105 transform' 
                                : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200 hover:text-slate-600'
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                Soy Cliente {activeTab === 'CLIENT' && <Check className="w-4 h-4"/>}
                            </span>
                        </button>
                        <button 
                            onClick={() => handleTabSwitch('DEMO')}
                            className={`flex-1 py-4 rounded-2xl text-sm font-black transition-all duration-300 border-2 flex flex-col items-center justify-center gap-1 ${
                                activeTab === 'DEMO' 
                                ? 'border-indigo-200 bg-indigo-50 text-indigo-700 shadow-lg shadow-indigo-100/50 scale-105 transform' 
                                : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200 hover:text-slate-600'
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <Sparkles className={`w-4 h-4 ${activeTab === 'DEMO' ? 'fill-current' : ''}`}/> 
                                Quiero Probar
                            </span>
                        </button>
                    </div>

                    {/* Form Area - UNIFIED FOR BOTH FLOWS */}
                    <div className="min-h-[260px]">
                       {loginStep === 'PHONE' ? (
                        <form onSubmit={handleSendCode} className="space-y-6 animate-fade-in">
                            <div className="space-y-3">
                                 <div className="flex justify-between items-center px-1">
                                     <label className={`text-[10px] font-black uppercase tracking-widest ${activeTab === 'CLIENT' ? 'text-emerald-600' : 'text-indigo-600'}`}>
                                        {activeTab === 'CLIENT' ? 'Tu Celular Registrado' : 'Tu WhatsApp (Para Activar)'}
                                     </label>
                                     <button type="button" onClick={handleLogoClick} className="w-2 h-2 rounded-full opacity-0 cursor-default">.</button>
                                 </div>
                                 <div className={`flex items-center gap-3 bg-white border-2 rounded-2xl p-2.5 transition-all shadow-sm ${activeTab === 'CLIENT' ? 'border-slate-100 focus-within:border-emerald-300 focus-within:ring-4 focus-within:ring-emerald-50' : 'border-slate-100 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50'}`}>
                                    
                                    {/* Country Selector */}
                                    <div className="relative pl-2 border-r border-slate-100 pr-2">
                                        <select 
                                            value={countryCode}
                                            onChange={(e) => setCountryCode(e.target.value)}
                                            className="appearance-none bg-transparent font-black text-slate-600 outline-none w-full h-full absolute inset-0 opacity-0 cursor-pointer"
                                        >
                                            {COUNTRIES.map(c => (
                                                <option key={c.code} value={c.code}>{c.flag} {c.name} ({c.code})</option>
                                            ))}
                                        </select>
                                        <div className="flex items-center gap-1 pointer-events-none">
                                            <span className="text-2xl">{currentCountry?.flag}</span>
                                            <span className="font-black text-slate-600 text-sm hidden sm:inline">{countryCode}</span>
                                            <ChevronDown className="w-3 h-3 text-slate-400"/>
                                        </div>
                                    </div>

                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                                        className="w-full bg-transparent outline-none font-black text-xl text-slate-800 placeholder:text-slate-300 h-full"
                                        placeholder="000 000 000"
                                        autoFocus
                                    />
                                 </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || phoneNumber.length < 4}
                                className={`w-full py-4 text-white rounded-2xl font-black text-base shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mt-4 group ${
                                    activeTab === 'CLIENT' 
                                    ? 'bg-slate-900 hover:bg-black hover:scale-[1.02]' 
                                    : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] shadow-indigo-200'
                                }`}
                            >
                                {loading ? <RefreshCw className="w-5 h-5 animate-spin"/> : (
                                    <>
                                        {activeTab === 'CLIENT' ? 'INGRESAR AHORA' : 'RECIBIR CÓDIGO'} 
                                        {activeTab === 'CLIENT' ? <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/> : <MessageSquare className="w-5 h-5"/>}
                                    </>
                                )}
                            </button>
                            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-4">
                                {activeTab === 'CLIENT' ? 'Te enviaremos un código SMS gratis' : 'Te enviaremos un código de activación al WhatsApp'}
                            </p>
                        </form>
                       ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-6 animate-fade-in">
                            <div className="text-center mb-8">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border shadow-sm ${activeTab === 'CLIENT' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                                    <MessageSquare className="w-7 h-7 fill-current"/>
                                </div>
                                <h3 className="font-bold text-slate-800 text-lg">
                                    {activeTab === 'CLIENT' ? 'Revisa tu SMS' : 'Revisa tu WhatsApp'}
                                </h3>
                                <p className="text-sm text-slate-500 mt-1 font-medium">
                                    Enviamos el código al <span className="font-black text-slate-800">{countryCode} {phoneNumber}</span>
                                </p>
                                <button type="button" onClick={() => setLoginStep('PHONE')} className={`text-xs font-bold hover:underline mt-3 transition-colors uppercase tracking-wider ${activeTab === 'CLIENT' ? 'text-emerald-500' : 'text-indigo-500'}`}>
                                    Corregir número
                                </button>
                            </div>
                            
                            <div className="flex justify-center">
                                <input
                                    type="text"
                                    maxLength={6}
                                    value={otpCode}
                                    onChange={(e) => setOtpCode(e.target.value)}
                                    className={`w-full text-center border-2 rounded-2xl py-4 font-black text-4xl tracking-[0.4em] text-slate-800 outline-none transition-all placeholder:text-slate-200 bg-white ${
                                        activeTab === 'CLIENT' 
                                        ? 'border-slate-100 focus:border-emerald-300' 
                                        : 'border-slate-100 focus:border-indigo-300'
                                    }`}
                                    placeholder="000000"
                                    autoFocus
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otpCode.length < 4}
                                className={`w-full py-4 text-white rounded-2xl font-bold text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2 ${
                                    activeTab === 'CLIENT' 
                                    ? 'bg-slate-900 hover:bg-black' 
                                    : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                            >
                                {loading ? <RefreshCw className="w-5 h-5 animate-spin"/> : <>VALIDAR Y ENTRAR <CheckCircle className="w-5 h-5"/></>}
                            </button>
                        </form>
                       )}
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-center gap-4">
                    <div className="flex gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <a href="#" className="hover:text-indigo-500 transition-colors">Términos</a>
                        <a href="#" className="hover:text-indigo-500 transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-indigo-500 transition-colors">Soporte</a>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">
                        Software desarrollado por <a href="https://gaorsystem.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-500 hover:text-indigo-600 transition-colors">GaorSystemPeru</a>
                    </p>
                </div>
            </div>
        </div>

        {/* GOD MODE MODAL */}
        {showGodMode && (
             <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6 animate-fade-in">
                 <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-fade-in-up text-center relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-rose-600"></div>
                     <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-100 rotate-12">
                         <ShieldAlert className="w-10 h-10 text-red-500 -rotate-12"/>
                     </div>
                     <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Super Admin</h2>
                     <p className="text-slate-500 text-sm mb-8 font-bold">Zona Restringida</p>
                     
                     <form onSubmit={handleGodModeLogin} className="space-y-4">
                        <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-red-500 transition-colors"/>
                            <input 
                                type="password" 
                                value={masterPassword}
                                onChange={e => setMasterPassword(e.target.value)}
                                className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold outline-none focus:border-red-500 focus:bg-white transition-all placeholder:text-slate-300 text-lg"
                                placeholder="Contraseña Maestra"
                                autoFocus
                            />
                        </div>
                        {godError && <p className="text-red-500 text-xs font-bold animate-pulse bg-red-50 py-2 rounded-lg">{godError}</p>}
                        
                        <div className="flex gap-3 mt-6">
                            <button type="button" onClick={() => setShowGodMode(false)} className="flex-1 py-4 text-slate-400 font-bold hover:bg-slate-100 rounded-2xl transition-colors">Salir</button>
                            <button type="submit" className="flex-1 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-red-200 transition-all">Acceder</button>
                        </div>
                     </form>
                 </div>
             </div>
        )}
    </div>
  );
};