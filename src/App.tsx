import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Compass, 
  TrendingUp, 
  BookOpen, 
  UserCheck, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Heart, 
  Activity, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  Menu, 
  X, 
  ShieldCheck, 
  Award,
  Sparkles,
  Users,
  CheckCircle,
  Eye,
  ChevronRight
} from 'lucide-react';

import { articles } from './data/articles';
import { Article } from './types';
import SocioFinancialSurvey from './components/SocioFinancialSurvey';
import InvestmentSimulator from './components/InvestmentSimulator';
import ArticleModal from './components/ArticleModal';
import ContactForm from './components/ContactForm';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [blogFilter, setBlogFilter] = useState<'todos' | 'mentalidad' | 'psicologia' | 'estrategia'>('todos');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeProcessStep, setActiveProcessStep] = useState<number>(1);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const sections = [
      'about-section',
      'process-section',
      'philosophy-section',
      'pathway-section',
      'articles-section',
      'faq-section'
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // FAQ Data
  const faqs = [
    {
      q: "¿Cómo empiezo?",
      a: "El punto de partida es agendar una conversación inicial sin costo. En este encuentro en calma escuchamos tus metas y evaluamos tu relación con el dinero. Luego, si sentís que es tu momento, avanzamos con el diseño de tu estrategia."
    },
    {
      q: "¿Necesito experiencia previa en finanzas?",
      a: "No, en absoluto. De hecho, preferimos que no la tengas si eso significa estar libre de malas mañas del mercado o ideas especulativas rápidas. Parte fundamental de nuestro rol es la educación continua para que desarrolles autonomía total paso a paso."
    },
    {
      q: "¿Qué es una cuenta comitente?",
      a: "Es la cuenta regulada oficial que necesitás para poder operar activos financieros (como bonos, fondos, acciones). Se abre a tu nombre en un Agente de Liquidación y Compensación (ALyC) autorizado. Nosotros te ayudamos a abrirla o vincular una existente, pero vos mantenés el control total."
    },
    {
      q: "¿FINET administra directamente mi dinero?",
      a: "No. El dinero siempre permanece bajo la custodia de la cuenta comitente abierta a tu nombre. FINET actúa exclusivamente como asesor y orientador. Cada decisión se conversa, se educa y se ejecuta con tu consentimiento explícito."
    },
    {
      q: "¿Cuánto dura el acompañamiento?",
      a: "No creemos en contratos obligatorios. El acompañamiento socio-financiero dura el tiempo que consideres necesario para sentirte autónomo. De hecho, uno de nuestros objetivos fundamentales es educarte para que con el tiempo nos necesites cada vez menos."
    },
    {
      q: "¿Cómo cobran por sus servicios?",
      a: "Cobramos bajo un esquema de honorarios transparente y alineado con tus objetivos. No cobramos comisiones ocultas por mover activos constantemente, ya que nuestra filosofía premia el largo plazo y la inacción inteligente en momentos de volatilidad."
    },
    {
      q: "¿Qué pasa si quiero retirar mis fondos?",
      a: "Al estar depositados en una cuenta comitente a tu nombre con activos hiperlíquidos globales, podés vender tus posiciones y solicitar el retiro a tu cuenta bancaria de origen en el momento que lo decidas, sin penalidades de salida."
    }
  ];

  // Filtering articles based on tab select
  const filteredArticles = articles.filter(art => {
    if (blogFilter === 'todos') return true;
    return art.category === blogFilter;
  });

  // Toggle FAQ collapse
  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-charcoal font-sans antialiased selection:bg-brand-charcoal selection:text-white">
      
      {/* HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 bg-brand-bg/85 backdrop-blur-md border-b border-brand-border shrink-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-3 select-none group">
            {/* Square Logo with F */}
            <div className="h-[48px] w-[48px] bg-black rounded-[7px] flex items-center justify-center shrink-0 border border-brand-border/20 shadow-xs">
              <span className="text-[#cccc00] font-serif font-bold text-[37px] leading-none select-none">
                F
              </span>
            </div>
            
            <div className="flex flex-col justify-center text-left">
              <span 
                className="font-serif font-bold tracking-tight text-brand-charcoal group-hover:text-brand-accent transition"
                style={{ fontSize: '36px', lineHeight: '36px' }}
              >
                FINET
              </span>
              <span 
                className="tracking-widest uppercase"
                style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', lineHeight: '14px', fontSize: '10px', color: '#686868' }}
              >
                Socio-Finanzas
              </span>
            </div>
          </a>

          {/* Desktop Navigation Link list */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-wider font-bold text-brand-charcoal/70">
            <a 
              href="#about-section" 
              className={`hover:text-brand-charcoal transition py-1 border-b-2 ${activeSection === 'about-section' ? 'text-brand-charcoal border-[#cccc00]' : 'border-transparent'}`}
            >
              ¿Qué es?
            </a>
            <a 
              href="#process-section" 
              className={`hover:text-brand-charcoal transition py-1 border-b-2 ${activeSection === 'process-section' ? 'text-brand-charcoal border-[#cccc00]' : 'border-transparent'}`}
            >
              Cómo trabajamos
            </a>
            <a 
              href="#philosophy-section" 
              className={`hover:text-brand-charcoal transition py-1 border-b-2 ${activeSection === 'philosophy-section' ? 'text-brand-charcoal border-[#cccc00]' : 'border-transparent'}`}
            >
              Filosofía
            </a>
            <a 
              href="#pathway-section" 
              className={`hover:text-brand-charcoal transition py-1 border-b-2 ${activeSection === 'pathway-section' ? 'text-brand-charcoal border-[#cccc00]' : 'border-transparent'}`}
            >
              El Camino
            </a>
            <a 
              href="#articles-section" 
              className={`hover:text-brand-charcoal transition py-1 border-b-2 ${activeSection === 'articles-section' ? 'text-brand-charcoal border-[#cccc00]' : 'border-transparent'}`}
            >
              Biblioteca
            </a>
            <a 
              href="#faq-section" 
              className={`hover:text-brand-charcoal transition py-1 border-b-2 ${activeSection === 'faq-section' ? 'text-brand-charcoal border-[#cccc00]' : 'border-transparent'}`}
            >
              Preguntas
            </a>
          </nav>

          {/* Desktop Call to action buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="#survey-section" 
              className="px-4 py-2 bg-brand-muted border border-brand-border text-brand-charcoal text-xs font-semibold rounded-full hover:bg-brand-border/40 transition inline-flex items-center gap-1.5 font-serif"
            >
              <Compass className="w-3.5 h-3.5 text-brand-accent" />
              Autoevaluación
            </a>
            <a 
              href="#contact-section" 
              className="px-5 py-2.5 bg-brand-charcoal text-white text-xs font-semibold rounded-full hover:bg-brand-charcoal/90 transition font-serif"
            >
              Agendar Reunión
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-brand-charcoal hover:text-brand-accent transition"
            aria-label="Abrir menú móvil"
            id="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-brand-border bg-brand-bg px-6 py-6 space-y-4 animate-fade-in">
            <div className="flex flex-col gap-4 font-mono text-xs uppercase tracking-wider font-bold text-brand-charcoal/70">
              <a 
                href="#about-section" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1 transition ${activeSection === 'about-section' ? 'text-brand-charcoal border-l-2 border-[#cccc00] pl-2 font-bold' : 'hover:text-brand-charcoal'}`}
              >
                ¿Qué es?
              </a>
              <a 
                href="#process-section" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1 transition ${activeSection === 'process-section' ? 'text-brand-charcoal border-l-2 border-[#cccc00] pl-2 font-bold' : 'hover:text-brand-charcoal'}`}
              >
                Cómo trabajamos
              </a>
              <a 
                href="#philosophy-section" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1 transition ${activeSection === 'philosophy-section' ? 'text-brand-charcoal border-l-2 border-[#cccc00] pl-2 font-bold' : 'hover:text-brand-charcoal'}`}
              >
                Filosofía
              </a>
              <a 
                href="#pathway-section" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1 transition ${activeSection === 'pathway-section' ? 'text-brand-charcoal border-l-2 border-[#cccc00] pl-2 font-bold' : 'hover:text-brand-charcoal'}`}
              >
                El Camino
              </a>
              <a 
                href="#articles-section" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1 transition ${activeSection === 'articles-section' ? 'text-brand-charcoal border-l-2 border-[#cccc00] pl-2 font-bold' : 'hover:text-brand-charcoal'}`}
              >
                Biblioteca
              </a>
              <a 
                href="#faq-section" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1 transition ${activeSection === 'faq-section' ? 'text-brand-charcoal border-l-2 border-[#cccc00] pl-2 font-bold' : 'hover:text-brand-charcoal'}`}
              >
                Preguntas
              </a>
            </div>
            
            <div className="flex flex-col gap-3 pt-4 border-t border-brand-border">
              <a 
                href="#survey-section" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 bg-brand-muted border border-brand-border text-brand-charcoal text-sm font-semibold rounded-xl text-center flex items-center justify-center gap-2 font-serif"
              >
                <Compass className="w-4 h-4 text-brand-accent" />
                Autoevaluación
              </a>
              <a 
                href="#contact-section" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 bg-brand-charcoal text-white text-sm font-semibold rounded-xl text-center font-serif"
              >
                Agendar Reunión
              </a>
            </div>
          </div>
        )}
      </header>


      {/* MAIN LAYOUT */}
      <main>

        {/* HERO SECTION */}
        <section id="hero-section" className="relative overflow-hidden pt-24 pb-0 bg-brand-bg border-b border-brand-border w-full">
          <div className="max-w-7xl mx-auto px-6 relative text-center flex flex-col items-center">
            
            {/* Philosophical tag line */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-muted text-brand-charcoal text-xs font-mono rounded-full uppercase tracking-wider border border-brand-border mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              No somos inversores tradicionales. Somos socio-finanzas.
            </div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-brand-charcoal leading-none max-w-5xl mb-8">
              Una nueva forma de <i className="font-serif italic font-normal text-[#cccc00]">relacionarte</i> con tu dinero.
            </h1>

            <p className="text-brand-charcoal/80 text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-3xl mb-10">
              No administramos solamente inversiones. Acompañamos personas que quieren construir independencia financiera con una mirada de <strong className="font-semibold text-brand-charcoal">largo plazo, educación y equilibrio emocional</strong>.
            </p>

            {/* Primary/Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-16 w-full sm:w-auto">
              <a 
                href="#survey-section" 
                className="px-10 py-5 bg-brand-charcoal text-white font-medium rounded-full hover:bg-brand-charcoal/90 transition-all duration-200 text-center flex items-center justify-center gap-3 font-serif text-base tracking-tight shadow-md"
              >
                Hacer Autoevaluación
                <ArrowRight className="w-5 h-5 text-brand-accent" />
              </a>
              <a 
                href="#contact-section" 
                className="px-10 py-5 bg-transparent text-brand-charcoal font-medium border border-brand-border rounded-full hover:bg-brand-muted transition text-center font-serif text-base tracking-tight"
              >
                Agendar una reunión
              </a>
            </div>

            {/* Micro social proof / security */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-16 text-xs text-brand-charcoal/60 font-mono">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-accent" />
                Sin manejo de fondos directos
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-brand-accent" />
                Educación personalizada libre de deudas
              </div>
            </div>

          </div>

          {/* INFINITE RUNNING MARQUEE - MINIMALIST AND HIGH IMPACT */}
          <div className="w-full bg-brand-charcoal py-7 border-t border-brand-border/20 overflow-hidden relative select-none">
            {/* Absolute side fades for elegant entry/exit of text */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-charcoal to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-charcoal to-transparent z-10 pointer-events-none" />
            
            <div className="animate-marquee whitespace-nowrap flex items-center gap-16 text-white font-serif uppercase tracking-wider text-xl md:text-2xl lg:text-3xl">
              {/* Loop 1 */}
              <span className="flex items-center gap-4">
                TEMPLANZA <span className="text-[#cccc00] font-bold font-sans">★</span>
              </span>
              <span className="flex items-center gap-4">
                AUTONOMÍA FINANCIERA <span className="text-[#cccc00] font-bold font-sans">★</span>
              </span>
              <span className="flex items-center gap-4">
                EDUCACIÓN CON PROPÓSITO <span className="text-[#cccc00] font-bold font-sans">★</span>
              </span>
              <span className="flex items-center gap-4">
                INVERSIÓN DE LARGO PLAZO <span className="text-[#cccc00] font-bold font-sans">★</span>
              </span>
              <span className="flex items-center gap-4">
                PSICOLOGÍA DEL DINERO <span className="text-[#cccc00] font-bold font-sans">★</span>
              </span>
              <span className="flex items-center gap-4">
                MENTALIDAD DE CRECIMIENTO <span className="text-[#cccc00] font-bold font-sans">★</span>
              </span>
              
              {/* Loop 2 (exact duplicate for seamless wrap) */}
              <span className="flex items-center gap-4">
                TEMPLANZA <span className="text-[#cccc00] font-bold font-sans">★</span>
              </span>
              <span className="flex items-center gap-4">
                AUTONOMÍA FINANCIERA <span className="text-[#cccc00] font-bold font-sans">★</span>
              </span>
              <span className="flex items-center gap-4">
                EDUCACIÓN CON PROPÓSITO <span className="text-[#cccc00] font-bold font-sans">★</span>
              </span>
              <span className="flex items-center gap-4">
                INVERSIÓN DE LARGO PLAZO <span className="text-[#cccc00] font-bold font-sans">★</span>
              </span>
              <span className="flex items-center gap-4">
                PSICOLOGÍA DEL DINERO <span className="text-[#cccc00] font-bold font-sans">★</span>
              </span>
              <span className="flex items-center gap-4">
                MENTALIDAD DE CRECIMIENTO <span className="text-[#cccc00] font-bold font-sans">★</span>
              </span>
            </div>
          </div>
        </section>

        {/* SECCION 2: ¿QUÉ ES FINET? */}
        <section id="about-section" className="py-24 bg-brand-muted border-b border-brand-border w-full">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest">
                  Comunidad Orientativa
                </span>
                <h2 className="font-serif text-3xl md:text-4.5xl font-normal tracking-tight text-brand-charcoal leading-tight">
                  ¿Qué es FINET?
                </h2>
                <p className="text-brand-charcoal/80 text-md md:text-lg leading-relaxed font-light font-serif">
                  FINET es una <strong className="font-semibold text-brand-charcoal">comunidad de orientación socio-financiera</strong>. Creemos que las buenas inversiones de largo plazo nacen de buenas decisiones, y las buenas decisiones requieren algo más que meros conocimientos técnicos de mercado.
                </p>
                <p className="text-brand-charcoal/80 text-md leading-relaxed font-light">
                  No somos un broker de bolsa frío, ni consultores transaccionales. Integramos al inversor con su propia realidad de vida para desactivar la inercia del día a día y construir templanza.
                </p>

                <div className="p-6 md:p-8 bg-brand-charcoal text-white rounded-3xl border border-brand-border">
                  <p className="text-sm md:text-base font-light leading-relaxed font-serif">
                    "Nuestro objetivo no es solamente ayudarte a invertir mejor. <br />
                    <strong className="text-brand-accent font-serif italic font-normal">Es ayudarte a desarrollar una relación más sana y madura con tu capital de reserva.</strong>"
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <span className="text-sm font-semibold text-brand-charcoal block border-b border-brand-border pb-2 font-serif">
                  Por eso combinamos de forma integrada:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* 1. Estrategia */}
                  <div className="p-5 bg-white rounded-2xl border border-brand-border hover:border-brand-accent transition-all duration-200">
                    <div className="w-8 h-8 rounded-lg bg-brand-charcoal text-white flex items-center justify-center mb-3 text-xs font-mono font-bold">
                      01
                    </div>
                    <h4 className="font-serif font-bold text-brand-charcoal text-sm mb-1 uppercase tracking-wider">
                      Estrategia Financiera
                    </h4>
                    <p className="text-brand-charcoal/70 text-xs leading-relaxed font-light">
                      Diseño de carteras equilibradas, diversificadas y pensadas bajo el principio inmobiliario de renta recurrente.
                    </p>
                  </div>

                  {/* 2. Educación */}
                  <div className="p-5 bg-white rounded-2xl border border-brand-border hover:border-brand-accent transition-all duration-200">
                    <div className="w-8 h-8 rounded-lg bg-brand-charcoal text-white flex items-center justify-center mb-3 text-xs font-mono font-bold">
                      02
                    </div>
                    <h4 className="font-serif font-bold text-brand-charcoal text-sm mb-1 uppercase tracking-wider">
                      Educación Continua
                    </h4>
                    <p className="text-brand-charcoal/70 text-xs leading-relaxed font-light">
                      Queremos que entiendas a fondo cada activo financiero que compone tu cartera para darte autonomía absoluta de largo plazo.
                    </p>
                  </div>

                  {/* 3. Acompañamiento */}
                  <div className="p-5 bg-white rounded-2xl border border-brand-border hover:border-brand-accent transition-all duration-200">
                    <div className="w-8 h-8 rounded-lg bg-brand-charcoal text-white flex items-center justify-center mb-3 text-xs font-mono font-bold">
                      03
                    </div>
                    <h4 className="font-serif font-bold text-brand-charcoal text-sm mb-1 uppercase tracking-wider">
                      Acompañamiento Humano
                    </h4>
                    <p className="text-brand-charcoal/70 text-xs leading-relaxed font-light">
                      No estás solo frente a la pantalla y al ruido del mercado. Te acompañamos en cada rebalanceo de tu capital.
                    </p>
                  </div>

                  {/* 4. Desarrollo de Hábitos */}
                  <div className="p-5 bg-white rounded-2xl border border-brand-border hover:border-brand-accent transition-all duration-200">
                    <div className="w-8 h-8 rounded-lg bg-brand-charcoal text-white flex items-center justify-center mb-3 text-xs font-mono font-bold">
                      04
                    </div>
                    <h4 className="font-serif font-bold text-brand-charcoal text-sm mb-1 uppercase tracking-wider">
                      Desarrollo de Hábitos
                    </h4>
                    <p className="text-brand-charcoal/70 text-xs leading-relaxed font-light">
                      Identificamos y rompemos de raíz la inercia invisibilizada del consumo impulsivo y los gastos hormiga inútiles.
                    </p>
                  </div>

                  {/* 5. Inteligencia Emocional */}
                  <div className="sm:col-span-2 p-5 bg-brand-muted rounded-2xl border border-brand-border hover:border-brand-accent transition-all duration-200">
                    <div className="w-8 h-8 rounded-lg bg-brand-accent text-white flex items-center justify-center mb-3 text-xs font-mono font-bold">
                      ★
                    </div>
                    <h4 className="font-serif font-bold text-brand-charcoal text-sm mb-1 uppercase tracking-wider">
                      Inteligencia Emocional Aplicada
                    </h4>
                    <p className="text-brand-charcoal/80 text-xs leading-relaxed font-light">
                      El miedo y la ansiedad causan pérdidas de patrimonio real mucho más profundas que las caídas de las acciones. Ejercitamos la templanza necesaria para decidir siempre en calma absoluta.
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </section>


        {/* SECCION 3: INVERTIR TAMBIÉN ES UN PROCESO PERSONAL */}
        <section className="py-24 bg-brand-charcoal border-b border-brand-border/20 w-full text-white">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest">
                Ejes Conceptuales
              </span>
              <h2 className="font-serif text-3xl md:text-4.5xl font-normal text-white tracking-tight leading-tight">
                Invertir también es un proceso personal.
              </h2>
              <p className="text-white/70 text-sm md:text-base font-light">
                La madurez como inversor no se alcanza sumando complejas fórmulas matemáticas o algoritmos rápidos, sino reestructurando la forma en que pensás tu vida.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Estrategia */}
              <div className="bg-black/30 p-6 rounded-3xl border border-brand-border/15 shadow-3xs hover:border-brand-accent transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="p-2.5 bg-brand-accent text-brand-charcoal rounded-xl inline-flex">
                    <TrendingUp className="w-5 h-5" />
                  </span>
                  <h3 className="font-serif font-bold text-white text-lg">
                    Invertimos con estrategia
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed font-light">
                    No perseguimos resultados extraordinarios de casino ni modas de trading diario. Buscamos construir patrimonio consistente de manera orgánica.
                  </p>
                </div>
                <div className="pt-6 border-t border-brand-border/15 text-2xs font-mono text-brand-accent mt-6 uppercase font-bold">
                  #Coherencia #LargoPlazo
                </div>
              </div>

              {/* Card 2: Educamos */}
              <div className="bg-black/30 p-6 rounded-3xl border border-brand-border/15 shadow-3xs hover:border-brand-accent transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="p-2.5 bg-brand-accent text-brand-charcoal rounded-xl inline-flex">
                    <BookOpen className="w-5 h-5" />
                  </span>
                  <h3 className="font-serif font-bold text-white text-lg">
                    Educamos
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed font-light">
                    Queremos que entiendas cada decisión de cartera que tomamos. El conocimiento desarma los mitos y te otorga libertad para operar de forma independiente.
                  </p>
                </div>
                <div className="pt-6 border-t border-brand-border/15 text-2xs font-mono text-brand-accent mt-6 uppercase font-bold">
                  #Autonomía #Claridad
                </div>
              </div>

              {/* Card 3: Acompañamos */}
              <div className="bg-black/30 p-6 rounded-3xl border border-brand-border/15 shadow-3xs hover:border-brand-accent transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="p-2.5 bg-brand-accent text-brand-charcoal rounded-xl inline-flex">
                    <Users className="w-5 h-5" />
                  </span>
                  <h3 className="font-serif font-bold text-white text-lg">
                    Acompañamos
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed font-light">
                    No estás solo frente a cada parpadeo de precios o pánico del mercado global. Te guiamos para sostener el rumbo del plan inicial.
                  </p>
                </div>
                <div className="pt-6 border-t border-brand-border/15 text-2xs font-mono text-brand-accent mt-6 uppercase font-bold">
                  #SocioFiel #EnCalma
                </div>
              </div>

              {/* Card 4: Emociones */}
              <div className="bg-black/30 p-6 rounded-3xl border border-brand-border/15 shadow-3xs hover:border-brand-accent transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="p-2.5 bg-brand-accent text-brand-charcoal rounded-xl inline-flex">
                    <Heart className="w-5 h-5" />
                  </span>
                  <h3 className="font-serif font-bold text-white text-lg">
                    Trabajamos las emociones
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed font-light">
                    Porque el miedo y la ansiedad suelen hacer más daño que una mala inversión. La templanza intelectual es nuestra mayor virtud.
                  </p>
                </div>
                <div className="pt-6 border-t border-brand-border/15 text-2xs font-mono text-brand-accent mt-6 uppercase font-bold">
                  #Templanza #Control
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* INTERACTIVE COMPENSATED SIMULATION PORTFOLIO */}
        <section className="py-20 bg-brand-muted border-b border-brand-border w-full">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest">
                Educación Matemática
              </span>
              <h2 className="font-serif text-2xl md:text-3.5xl font-normal text-brand-charcoal mt-1 mb-3">
                ¿Por qué el tiempo y la paciencia son tus mayores aliados?
              </h2>
              <p className="text-brand-charcoal/70 text-sm md:text-md font-light">
                Interactúa con nuestro simulador para comprender cómo cambia el patrimonio bajo el efecto multiplicador de la reinversión constante (interes compuesto) y la analogía inmobiliaria, en contraste con el ahorro inactivo.
              </p>
            </div>
            
            <InvestmentSimulator />
          </div>
        </section>


        {/* SECCION 4: EL CAMINO HACIA LA INDEPENDENCIA FINANCIERA */}
        <section id="pathway-section" className="py-24 bg-brand-bg border-b border-brand-border w-full">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
              <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest">
                Hoja de Ruta de Vida
              </span>
              <h2 className="font-serif text-3xl md:text-4.5xl font-normal text-brand-charcoal tracking-tight leading-tight">
                El camino hacia la independencia financiera
              </h2>
              <p className="text-brand-charcoal/70 text-sm md:text-base font-light">
                La identidad de FINET se sostiene en recorrer ordenadamente estas cinco estaciones vitales. Cada paso consolida el siguiente.
              </p>
            </div>

            {/* Timeline of 5 Steps */}
            <div className="relative border-l-2 border-brand-border ml-4 md:ml-12 space-y-12">
              
              {/* Step 1 */}
              <div className="relative pl-8 md:pl-12 group">
                <span className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-brand-charcoal text-white font-mono font-extrabold flex items-center justify-center text-sm ring-4 ring-white shadow-xs group-hover:bg-brand-accent transition">
                  1
                </span>
                <div className="space-y-2 bg-white rounded-2xl p-5 border border-brand-border hover:border-brand-accent hover:shadow-3xs transition-all duration-200">
                  <span className="text-xs font-mono font-semibold text-brand-accent uppercase">Fase de Decisión</span>
                  <h3 className="font-serif font-bold text-brand-charcoal text-md md:text-lg">
                    Tomar una decisión diferente para el destino de los ahorros.
                  </h3>
                  <p className="text-brand-charcoal/80 text-xs md:text-sm leading-relaxed max-w-3xl font-light">
                    Decidir voluntariamente salir del conformismo inerte de la caja de ahorro estéril o el gasto inconsciente de corto plazo. Reclamar el poder sobre tu excedente financiero.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative pl-8 md:pl-12 group">
                <span className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-brand-charcoal text-white font-mono font-extrabold flex items-center justify-center text-sm ring-4 ring-white shadow-xs group-hover:bg-brand-accent transition">
                  2
                </span>
                <div className="space-y-2 bg-white rounded-2xl p-5 border border-brand-border hover:border-brand-accent hover:shadow-3xs transition-all duration-200">
                  <span className="text-xs font-mono font-semibold text-brand-accent uppercase">Fase de Consistencia</span>
                  <h3 className="font-serif font-bold text-brand-charcoal text-md md:text-lg">
                    Construir una rentabilidad sostenible.
                  </h3>
                  <p className="text-brand-charcoal/80 text-xs md:text-sm leading-relaxed max-w-3xl font-light">
                    Establecer una cartera de activos diversificados regulados que madure en el tiempo de manera orgánica. No perseguimos ganancias mágicas de trading efímero, sino rentabilidad real sostenida.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative pl-8 md:pl-12 group">
                <span className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-brand-charcoal text-white font-mono font-extrabold flex items-center justify-center text-sm ring-4 ring-white shadow-xs group-hover:bg-brand-accent transition">
                  3
                </span>
                <div className="space-y-2 bg-white rounded-2xl p-5 border border-brand-border hover:border-brand-accent hover:shadow-3xs transition-all duration-200">
                  <span className="text-xs font-mono font-semibold text-brand-accent uppercase">Fase de Bienestar</span>
                  <h3 className="font-serif font-bold text-brand-charcoal text-md md:text-lg">
                    Mejorar la calidad de vida.
                  </h3>
                  <p className="text-brand-charcoal/80 text-xs md:text-sm leading-relaxed max-w-3xl font-light">
                    La tranquilidad de contar con activos robustos trabajando te libera de la ansiedad habitual. Empezás a dormir en paz sabiendo que tu capital de reserva está seguro de la erosión inflacionaria.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative pl-8 md:pl-12 group">
                <span className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-brand-charcoal text-white font-mono font-extrabold flex items-center justify-center text-sm ring-4 ring-white shadow-xs group-hover:bg-brand-accent transition">
                  4
                </span>
                <div className="space-y-2 bg-white rounded-2xl p-5 border border-brand-border hover:border-brand-accent hover:shadow-3xs transition-all duration-200">
                  <span className="text-xs font-mono font-semibold text-brand-accent uppercase">Fase de Flujo de Fondos</span>
                  <h3 className="font-serif font-bold text-brand-charcoal text-md md:text-lg">
                    Complementar los ingresos con el rendimiento de las inversiones.
                  </h3>
                  <p className="text-brand-charcoal/80 text-xs md:text-sm leading-relaxed max-w-3xl font-light">
                    Las inversiones comienzan a dar frutos regulares en forma de dividendos, intereses o rentas. Tu salario o ingreso activo deja de ser tu única y precaria fuente de sustento vital.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative pl-8 md:pl-12 group">
                <span className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-brand-accent text-white font-mono font-extrabold flex items-center justify-center text-sm ring-4 ring-white shadow-xs transition animate-pulse-subtle">
                  5
                </span>
                <div className="space-y-2 bg-brand-muted/80 rounded-2xl p-5 border border-brand-border hover:border-brand-accent hover:shadow-3xs transition-all duration-200">
                  <span className="text-xs font-mono font-bold text-brand-accent uppercase">Objetivo Supremo</span>
                  <h3 className="font-serif font-bold text-brand-charcoal text-md md:text-lg">
                    Alcanzar la independencia financiera.
                  </h3>
                  <p className="text-brand-charcoal/80 text-xs md:text-sm leading-relaxed max-w-3xl font-light">
                    Tus rentas pasivas e inversiones cubren tu costo de vida. Sos dueño total de tus mañanas y de tus tardes, libre para decidir en qué usar la porción de vida terrenal que te pertenece.
                  </p>
                </div>
              </div>

            </div>

            {/* Inspirational Quote Card underneath */}
            <div className="mt-16 bg-brand-charcoal text-white rounded-3xl p-6 md:p-12 text-center relative overflow-hidden border border-brand-border">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-brand-accent/10 pointer-events-none select-none">
                <Compass className="w-64 h-64" />
              </div>
              <blockquote className="relative z-10 text-lg md:text-2xl font-light italic leading-relaxed max-w-3xl mx-auto font-serif">
                "No importa cuánto tardes en recorrer el camino. <br />
                Lo importante es empezar y sostener el proceso en calma."
              </blockquote>
            </div>

          </div>
        </section>


        {/* SECCION 5: NUESTRA FILOSOFÍA */}
        <section id="philosophy-section" className="py-24 bg-brand-muted border-b border-brand-border w-full">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
              <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest">
                Pilares Fundamentales
              </span>
              <h2 className="font-serif text-3xl md:text-4.5xl font-normal text-brand-charcoal tracking-tight leading-tight">
                Nuestra filosofía
              </h2>
              <p className="text-brand-charcoal/70 text-sm md:text-base font-light">
                Destilamos los principios de templanza y constancia acumulados en años de orientación socio-financiera.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Quote 1 */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-border shadow-3xs hover:shadow-2xs transition hover:-translate-y-1 duration-200">
                <span className="text-xs font-mono font-bold text-brand-accent uppercase block mb-3">01 / El factor tiempo</span>
                <h3 className="font-serif font-bold text-brand-charcoal text-md md:text-lg mb-2">
                  El tiempo es nuestro principal aliado.
                </h3>
                <p className="text-brand-charcoal/70 text-xs md:text-sm leading-relaxed font-light">
                  No perseguimos ganancias rápidas de casino ni modas efímeras de redes sociales. Construimos patrimonio robusto con paciencia y constancia.
                </p>
              </div>

              {/* Quote 2 */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-border shadow-3xs hover:shadow-2xs transition hover:-translate-y-1 duration-200">
                <span className="text-xs font-mono font-bold text-brand-accent uppercase block mb-3">02 / Fluctuación natural</span>
                <h3 className="font-serif font-bold text-brand-charcoal text-md md:text-lg mb-2">
                  La volatilidad no es el problema.
                </h3>
                <p className="text-brand-charcoal/70 text-xs md:text-sm leading-relaxed font-light">
                  Es el precio de admisión que pagamos de forma voluntaria para crecer en el largo plazo. Confundirla con pérdida real es el error clásico del principiante.
                </p>
              </div>

              {/* Quote 3 */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-border shadow-3xs hover:shadow-2xs transition hover:-translate-y-1 duration-200">
                <span className="text-xs font-mono font-bold text-brand-accent uppercase block mb-3">03 / Templanza emocional</span>
                <h3 className="font-serif font-bold text-brand-charcoal text-md md:text-lg mb-2">
                  Las decisiones importantes se toman en calma.
                </h3>
                <p className="text-brand-charcoal/70 text-xs md:text-sm leading-relaxed font-light">
                  Nunca en momentos de euforia desmedida ni de miedo paralizante por titulares de prensa. El silencio intelectual protege tu capital financiero.
                </p>
              </div>

              {/* Quote 4 */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-border shadow-3xs hover:shadow-2xs transition hover:-translate-y-1 duration-200">
                <span className="text-xs font-mono font-bold text-brand-accent uppercase block mb-3">04 / Sabiduría vs Recomendación</span>
                <h3 className="font-serif font-bold text-brand-charcoal text-md md:text-lg mb-2">
                  La educación vale más que una recomendación.
                </h3>
                <p className="text-brand-charcoal/70 text-xs md:text-sm leading-relaxed font-light">
                  Queremos formar inversores conscientes y autónomos, no dependencias que tengan que llamarnos para cada movimiento. Libertad mutua es el pacto.
                </p>
              </div>

              {/* Quote 5 */}
              <div className="md:col-span-2 bg-brand-charcoal text-white p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-sm flex flex-col justify-between border border-brand-border">
                <div className="absolute top-0 right-0 p-6 text-brand-accent opacity-20 pointer-events-none">
                  <Award className="w-24 h-24" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-wider block">05 / Cambio mental definitivo</span>
                  <h3 className="font-serif font-bold text-white text-lg md:text-xl">
                    La independencia financiera comienza mucho antes que el dinero.
                  </h3>
                  <p className="text-white/85 text-xs md:text-sm leading-relaxed max-w-xl font-light">
                    No empieza cuando lográs amasar una gran fortuna en la cuenta. Empieza en el momento exacto en que cambia tu manera de pensar, tus hábitos cotidianos y tu relación psicológica con el capital.
                  </p>
                </div>
                <div className="mt-6 flex justify-between items-center text-3xs font-mono text-brand-accent tracking-wider font-bold">
                  <span>METODOLOGÍA INTEGRAL FINET</span>
                  <span>ESTÁNDAR SOCIO-FINANCIO</span>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* SECCION 6: CÓMO TRABAJAMOS */}
        <section id="process-section" className="py-24 bg-brand-charcoal border-b border-brand-border/20 w-full text-white">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest">
                  Metodología Paso a Paso
                </span>
                <h2 className="font-serif text-3xl md:text-4.5xl font-normal text-white tracking-tight leading-tight">
                  Cómo trabajamos
                </h2>
                <p className="text-white/80 text-sm md:text-md leading-relaxed font-light">
                  Creemos en los procesos estructurados que transmiten orden y seguridad de largo plazo. No hay improvisación en el cuidado del futuro de las personas.
                </p>
              </div>
              
              {/* Horizontal step selector for interactive demonstration */}
              <div className="lg:col-span-6 flex flex-wrap gap-2 justify-start lg:justify-end">
                {[1, 2, 3, 4, 5].map((step) => (
                  <button
                    key={step}
                    onClick={() => setActiveProcessStep(step)}
                    className={`w-10 h-10 rounded-xl font-mono font-bold text-xs transition-all cursor-pointer ${
                      activeProcessStep === step 
                        ? 'bg-brand-accent text-brand-charcoal scale-115 shadow-sm' 
                        : 'bg-black/30 border border-brand-border/20 text-white/50 hover:text-white hover:border-brand-accent'
                    }`}
                    id={`btn-step-selector-${step}`}
                  >
                    0{step}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Step Panel */}
            <div className="bg-black/30 border border-brand-border/20 rounded-3xl p-6 md:p-10 shadow-3xs">
              
              {activeProcessStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center animate-fade-in">
                  <div className="md:col-span-4 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-brand-accent text-brand-charcoal font-serif font-bold text-3xl flex items-center justify-center">
                      01
                    </div>
                  </div>
                  <div className="md:col-span-8 space-y-3">
                    <span className="text-2xs font-mono text-brand-accent uppercase tracking-widest font-bold">Paso Inicial</span>
                    <h3 className="font-serif font-bold text-white text-xl">
                      Reunión inicial en calma.
                    </h3>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
                      Nos sentamos de forma virtual o física a conversar sin el apuro ni la histeria del mercado bursátil. El objetivo es conocer de cerca tu realidad actual, tus objetivos vitales, tus miedos ante la fluctuación y responder en calma tus dudas primordiales.
                    </p>
                    <span className="inline-flex text-xs font-mono font-bold text-brand-accent">
                      → Foco: Escuchar antes de recomendar
                    </span>
                  </div>
                </div>
              )}

              {activeProcessStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center animate-fade-in">
                  <div className="md:col-span-4 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-brand-accent text-brand-charcoal font-serif font-bold text-3xl flex items-center justify-center">
                      02
                    </div>
                  </div>
                  <div className="md:col-span-8 space-y-3">
                    <span className="text-2xs font-mono text-brand-accent uppercase tracking-widest font-bold">Infraestructura y Seguridad</span>
                    <h3 className="font-serif font-bold text-white text-xl">
                      Abrimos o vinculamos tu cuenta comitente.
                    </h3>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
                      Te asistimos en la apertura o vinculación de tu cuenta de inversiones regulada oficial en los agentes de bolsa (ALyC) más seguros del país. Vos sos el único titular de tus activos; nosotros solo actuamos como asesores externos bajo estrictos protocolos.
                    </p>
                    <span className="inline-flex text-xs font-mono font-bold text-brand-accent">
                      → Foco: Absoluta seguridad jurídica de tu capital
                    </span>
                  </div>
                </div>
              )}

              {activeProcessStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center animate-fade-in">
                  <div className="md:col-span-4 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-brand-accent text-brand-charcoal font-serif font-bold text-3xl flex items-center justify-center">
                      03
                    </div>
                  </div>
                  <div className="md:col-span-8 space-y-3">
                    <span className="text-2xs font-mono text-brand-accent uppercase tracking-widest font-bold">Personalización</span>
                    <h3 className="font-serif font-bold text-white text-xl">
                      Diseñamos una estrategia a medida.
                    </h3>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
                      Con tu perfil de riesgo socio-financiero analizado, estructuramos una cartera diversificada de activos de renta para el mediano y largo plazo. Ajustada a tu necesidad de flujos futuros e inmunizada ante ruidos de noticias transitorias.
                    </p>
                    <span className="inline-flex text-xs font-mono font-bold text-brand-accent">
                      → Foco: Consistencia y balance de activos reales
                    </span>
                  </div>
                </div>
              )}

              {activeProcessStep === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center animate-fade-in">
                  <div className="md:col-span-4 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-brand-accent text-brand-charcoal font-serif font-bold text-3xl flex items-center justify-center">
                      04
                    </div>
                  </div>
                  <div className="md:col-span-8 space-y-3">
                    <span className="text-2xs font-mono text-brand-accent uppercase tracking-widest font-bold">Soporte Continuo</span>
                    <h3 className="font-serif font-bold text-white text-xl">
                      Acompañamos la evolución de la cartera.
                    </h3>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
                      Los mercados cambian, y tu vida también. Monitoreamos con regularidad tus activos, realizamos rebalanceos conscientes y, sobre todo, conversamos en calma ante cualquier eventualidad o tormenta del mercado para cuidar el rumbo.
                    </p>
                    <span className="inline-flex text-xs font-mono font-bold text-brand-accent">
                      → Foco: Equilibrio emocional frente al parpadeo
                    </span>
                  </div>
                </div>
              )}

              {activeProcessStep === 5 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center animate-fade-in">
                  <div className="md:col-span-4 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-brand-accent text-brand-charcoal font-serif font-bold text-3xl flex items-center justify-center animate-pulse-subtle">
                      05
                    </div>
                  </div>
                  <div className="md:col-span-8 space-y-3">
                    <span className="text-2xs font-mono text-brand-accent uppercase tracking-widest font-bold font-semibold">La Meta Final</span>
                    <h3 className="font-serif font-bold text-white text-xl">
                      Trabajamos para que cada vez nos necesites menos.
                    </h3>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
                      Nuestra mayor victoria es tu autonomía intelectual. Con cada decisión te educamos, explicándote el porqué. Queremos formar inversores tranquilos y maduros que tomen las riendas de su propio destino en plena libertad.
                    </p>
                    <span className="inline-flex text-xs font-mono font-bold text-brand-accent">
                      → Foco: Independencia de criterio y libertad vital
                    </span>
                  </div>
                </div>
              )}

            </div>

            {/* Micro sequence flow tracker below */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-8 text-center text-xs font-mono font-bold">
              <button onClick={() => setActiveProcessStep(1)} className={`p-3 rounded-xl border transition cursor-pointer font-serif ${activeProcessStep === 1 ? 'border-brand-accent bg-brand-accent text-brand-charcoal' : 'border-brand-border/20 bg-black/30 text-white/70 hover:text-white hover:border-brand-accent'}`}>
                1. Conversar
              </button>
              <button onClick={() => setActiveProcessStep(2)} className={`p-3 rounded-xl border transition cursor-pointer font-serif ${activeProcessStep === 2 ? 'border-brand-accent bg-brand-accent text-brand-charcoal' : 'border-brand-border/20 bg-black/30 text-white/70 hover:text-white hover:border-brand-accent'}`}>
                2. Vincular
              </button>
              <button onClick={() => setActiveProcessStep(3)} className={`p-3 rounded-xl border transition cursor-pointer font-serif ${activeProcessStep === 3 ? 'border-brand-accent bg-brand-accent text-brand-charcoal' : 'border-brand-border/20 bg-black/30 text-white/70 hover:text-white hover:border-brand-accent'}`}>
                3. Diseñar
              </button>
              <button onClick={() => setActiveProcessStep(4)} className={`p-3 rounded-xl border transition cursor-pointer font-serif ${activeProcessStep === 4 ? 'border-brand-accent bg-brand-accent text-brand-charcoal' : 'border-brand-border/20 bg-black/30 text-white/70 hover:text-white hover:border-brand-accent'}`}>
                4. Sostener
              </button>
              <button onClick={() => setActiveProcessStep(5)} className={`p-3 rounded-xl border transition cursor-pointer font-serif ${activeProcessStep === 5 ? 'border-brand-accent bg-brand-accent text-brand-charcoal' : 'border-brand-border/20 bg-black/30 text-white/70 hover:text-white hover:border-brand-accent'}`}>
                5. Emancipar
              </button>
            </div>

          </div>
        </section>


        {/* SECCION 7: ¿POR QUÉ SOCIO-FINANZAS? */}
        <section className="py-24 bg-brand-charcoal text-white overflow-hidden relative border-b border-brand-border">
          
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest">
                  La Categoría Propia
                </span>
                <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-tight leading-tight text-white">
                  ¿Por qué socio-finanzas?
                </h2>
                <div className="w-16 h-0.5 bg-brand-accent" />
                <p className="text-white/85 text-base md:text-lg leading-relaxed font-light font-serif">
                  Durante décadas, la cultura de consumo tradicional nos enseñó únicamente a hablar de mercados, cotizaciones y balances abstractos.
                </p>
                <p className="text-white/85 text-base md:text-lg leading-relaxed font-light font-light">
                  En FINET entendemos que las inversiones no dependen únicamente de gráficos estadísticos complejos. Dependen sobre todo de nuestros <strong>miedos, expectativas, hábitos invisibles, frustraciones familiares y toma de decisiones en el día a día</strong>.
                </p>
              </div>

              <div className="lg:col-span-6 bg-brand-muted/10 border border-white/10 rounded-3xl p-6 md:p-10 space-y-6">
                <p className="text-white/90 font-light text-md leading-relaxed font-serif">
                  "Por eso desarrollamos una mirada socio-financiera inédita que integra el conocimiento técnico elemental con el crecimiento humano fundamental."
                </p>
                <div className="border-t border-white/10 pt-6 space-y-4 text-xs font-mono text-brand-accent">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                    <span className="text-white/80">Inversión como vehículo de autonomía vital</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                    <span className="text-white/80">Educación permanente como proceso emancipador</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                    <span className="text-white/80">Inteligencia emocional para domar la volatilidad</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* CORE INTERACTIVE GEMINI ASSESSMENT MODULE */}
        <section className="py-24 bg-brand-muted border-b border-brand-border w-full">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono font-semibold text-brand-charcoal uppercase tracking-widest bg-white px-2.5 py-1.5 rounded-full inline-block border border-brand-border">
                Inteligencia Emocional
              </span>
              <h2 className="font-serif text-3xl md:text-4.5xl font-normal text-brand-charcoal mt-3 mb-2">
                Transformá tu relación con el dinero
              </h2>
              <p className="text-brand-charcoal/70 text-sm md:text-base font-light font-light">
                Respondé la autoevaluación debajo para recibir un diagnóstico completo sobre tu arquetipo y mentalidad financiera, con recomendaciones elaboradas a tu medida.
              </p>
            </div>
            
            <SocioFinancialSurvey />
          </div>
        </section>


        {/* SECCION 9: BIBLIOTECA DE ARTÍCULOS */}
        <section id="articles-section" className="py-24 bg-brand-bg border-b border-brand-border w-full">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
              <div className="space-y-4 max-w-xl text-left">
                <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest">
                  Bitácora de Pensamientos
                </span>
                <h2 className="font-serif text-3xl md:text-4.5xl font-normal text-brand-charcoal tracking-tight leading-tight">
                  La biblioteca de FINET
                </h2>
                <p className="text-brand-charcoal/70 text-sm font-light">
                  Destilamos ideas, reflexiones y guías prácticas que publicamos durante estos años, organizadas de forma interactiva para formarte en calma.
                </p>
              </div>
              
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 text-xs font-mono font-bold shrink-0">
                <button 
                  onClick={() => setBlogFilter('todos')}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition ${blogFilter === 'todos' ? 'bg-brand-charcoal text-white font-serif' : 'bg-white border border-brand-border hover:bg-brand-muted text-brand-charcoal'}`}
                  id="btn-filter-all"
                >
                  Todos
                </button>
                <button 
                  onClick={() => setBlogFilter('mentalidad')}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition ${blogFilter === 'mentalidad' ? 'bg-brand-charcoal text-white font-serif' : 'bg-white border border-brand-border hover:bg-brand-muted text-brand-charcoal'}`}
                  id="btn-filter-mindset"
                >
                  Mentalidad del inversor
                </button>
                <button 
                  onClick={() => setBlogFilter('psicologia')}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition ${blogFilter === 'psicologia' ? 'bg-brand-charcoal text-white font-serif' : 'bg-white border border-brand-border hover:bg-brand-muted text-brand-charcoal'}`}
                  id="btn-filter-psychology"
                >
                  Psicología financiera
                </button>
                <button 
                  onClick={() => setBlogFilter('estrategia')}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition ${blogFilter === 'estrategia' ? 'bg-brand-charcoal text-white font-serif' : 'bg-white border border-brand-border hover:bg-brand-muted text-brand-charcoal'}`}
                  id="btn-filter-strategy"
                >
                  Estrategia
                </button>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <article 
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white border border-brand-border rounded-3xl p-6 shadow-3xs hover:shadow-xs transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                  id={`article-card-${article.id}`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-3xs font-mono text-brand-accent font-bold uppercase">
                      <span className="font-sans text-[17px] leading-[21px]">{article.categoryLabel}</span>
                      <span className="flex items-center gap-1 font-light" style={{ fontSize: '12px', width: '180.828px', height: '41px', color: '#686868', lineHeight: '18px' }}>
                        <Clock className="w-3 h-3 text-[#686868]" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-brand-charcoal text-md md:text-lg leading-snug group-hover:text-brand-accent transition">
                      {article.title}
                    </h3>
                    <p className="text-brand-charcoal/70 text-xs md:text-sm leading-relaxed line-clamp-3 font-light">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-brand-border flex justify-between items-center text-xs font-semibold text-brand-charcoal">
                    <span className="font-mono text-3xs text-[#939393] font-normal">{article.date}</span>
                    <span className="inline-flex items-center gap-1 text-brand-charcoal font-bold group-hover:translate-x-1 group-hover:text-brand-accent transition-all font-serif">
                      Leer artículo 
                      <ChevronRight className="w-4 h-4 text-brand-accent" />
                    </span>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>


        {/* SECCION 8: PREGUNTAS FRECUENTES (FAQ) */}
        <section id="faq-section" className="py-24 bg-brand-muted border-b border-brand-border w-full">
          <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest">
              Dudas Comunes
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl font-normal text-brand-charcoal tracking-tight leading-tight">
              Preguntas frecuentes
            </h2>
            <p className="text-brand-charcoal/70 text-sm md:text-base font-light">
              Creemos en la transparencia absoluta de procesos. Respondemos todas tus dudas fundamentales de antemano.
            </p>
          </div>

          {/* Accordion Layout */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-brand-border rounded-2xl bg-white overflow-hidden transition-all duration-300 shadow-3xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 hover:bg-brand-muted/30 transition cursor-pointer"
                    id={`btn-faq-trigger-${idx}`}
                  >
                    <span className="font-serif font-semibold text-brand-charcoal text-base md:text-md">
                      {faq.q}
                    </span>
                    <span className={`p-1 bg-brand-muted rounded-lg text-brand-charcoal/70 shrink-0`}>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-brand-charcoal/80 text-sm md:text-md leading-relaxed border-t border-brand-border bg-brand-muted/10 font-light animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          </div>
        </section>


        {/* LLAMADO FINAL Y FORMULARIO DE REUNIONES */}
        <section className="py-24 bg-brand-bg relative w-full">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              <div className="lg:col-span-6 space-y-8 text-left lg:sticky lg:top-28">
                
                <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest">
                  Llamado Final
                </span>

                <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-tight text-brand-charcoal leading-tight">
                  La independencia financiera no empieza cuando tenés más dinero.
                </h2>

                <p className="text-brand-charcoal/80 text-lg leading-relaxed font-light font-light">
                  Empieza en el momento en que decidís cambiar la forma en que tomás tus decisiones y reestructurás tu relación psicológica con el capital de reserva.
                </p>

                <blockquote className="text-brand-charcoal/80 italic text-md leading-relaxed border-l-2 border-brand-accent pl-4 font-serif">
                  "Te invitamos a recorrer ese camino socio-financiero con nosotros. En calma, con paciencia y con metas de vida reales."
                </blockquote>

                <div className="flex flex-wrap items-center gap-6 text-xs text-brand-accent font-mono font-bold">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-brand-accent" />
                    Educación Emancipadora
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-brand-accent" />
                    Estrategia Inmobiliaria de Cartera
                  </div>
                </div>

              </div>

              <div className="lg:col-span-6">
                <ContactForm origin="Formulario Final Landing Page" />
              </div>

            </div>

          </div>
        </section>

      </main>


      {/* FOOTER */}
      <footer className="bg-brand-charcoal text-white py-16 border-t border-brand-border shrink-0">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
            
            {/* Left side brand column */}
            <div className="md:col-span-5 space-y-4 text-left">
              <div className="flex items-center gap-3">
                {/* Square Logo with F */}
                <div className="h-[44px] w-[44px] bg-black rounded-lg flex items-center justify-center shrink-0 border border-white/10 shadow-xs">
                  <span className="text-[#cccc00] font-serif font-bold text-xl leading-none select-none">
                    F
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-serif font-bold text-2xl tracking-tight text-white leading-none">
                    FINET
                  </span>
                  <span className="font-mono text-3xs text-brand-accent tracking-widest uppercase mt-0.5 font-bold">
                    Socio-Finanzas
                  </span>
                </div>
              </div>
              <p className="text-white/70 text-xs md:text-sm max-w-sm leading-relaxed font-light font-light">
                Transformamos la relación de las personas con el dinero para que puedan alcanzar su tranquilidad e independencia financiera genuina en el largo plazo.
              </p>
            </div>

            {/* Middle navigation links */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4 text-left">
              <div className="space-y-3">
                <span className="text-3xs font-mono text-brand-accent uppercase tracking-widest font-bold">Explorá</span>
                <ul className="space-y-2 text-xs text-white/70 font-light">
                  <li><a href="#about-section" className="hover:text-brand-accent transition">¿Qué es?</a></li>
                  <li><a href="#process-section" className="hover:text-brand-accent transition">Cómo trabajamos</a></li>
                  <li><a href="#philosophy-section" className="hover:text-brand-accent transition">Nuestra Filosofía</a></li>
                  <li><a href="#pathway-section" className="hover:text-brand-accent transition">El Camino de los 5 Pasos</a></li>
                </ul>
              </div>

              <div className="space-y-3">
                <span className="text-3xs font-mono text-brand-accent uppercase tracking-widest font-bold">Recursos</span>
                <ul className="space-y-2 text-xs text-white/70 font-light">
                  <li><a href="#survey-section" className="hover:text-brand-accent transition">Autoevaluación de Mentalidad</a></li>
                  <li><a href="#articles-section" className="hover:text-brand-accent transition">Biblioteca de Ensayos</a></li>
                  <li><a href="#faq-section" className="hover:text-brand-accent transition">Preguntas Frecuentes</a></li>
                  <li><a href="#contact-section" className="hover:text-brand-accent transition">Agendar una Reunión</a></li>
                </ul>
              </div>
            </div>

            {/* Right side contact data */}
            <div className="md:col-span-3 space-y-3 text-left text-xs text-white/70 font-mono font-light">
              <span className="text-3xs font-mono text-brand-accent uppercase tracking-widest font-bold block">Contacto</span>
              <p>Buenos Aires, Argentina (Servicio Global)</p>
              <p>Email: soporte@finet.com.ar</p>
              <div className="pt-2">
                <span className="inline-flex px-3 py-1 bg-white/5 border border-white/10 rounded-md text-3xs text-brand-accent font-mono font-bold">
                  ● ATENCIÓN EN CALMA ACTIVA
                </span>
              </div>
            </div>

          </div>

          {/* Legal Footnote copies */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-3xs text-white/40 text-center font-mono">
            <div className="text-center text-[13px] text-[#b6b6b6]">
              &copy; {new Date().getFullYear()} FINET Orientación Socio-Financiera. Todos los derechos reservados.
            </div>
            <div className="max-w-2xl text-justify leading-relaxed font-light font-sans text-[14px]">
              Descargo de responsabilidad: La orientación financiera y educación provista por FINET no constituye asesoramiento financiero regulado de intermediación bursátil directa. FINET no es un fondo de inversión ni recibe fondos de terceros en administración directa. Las inversiones financieras conllevan riesgos de mercado inherentes; los rendimientos históricos simulados no aseguran ni garantizan resultados futuros consistentes. Se sugerimos operar con cautela e informarse adecuadamente.
            </div>
          </div>

        </div>
      </footer>


      {/* BLOG ARTICLE READER MODAL OVERLAY */}
      <ArticleModal 
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

    </div>
  );
}
