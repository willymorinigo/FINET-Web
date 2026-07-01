import React, { useState } from 'react';
import { Question, AssessmentResult } from '../types';
import { 
  Heart, 
  TrendingUp, 
  ShieldCheck, 
  Brain, 
  Sparkles, 
  Compass, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  Lock, 
  Printer, 
  BookOpen, 
  CheckCircle,
  FileText
} from 'lucide-react';

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "¿Qué sentís cuando lográs guardar algo de dinero a fin de mes?",
    options: [
      { value: "a", text: "Tranquilidad y orden: lo destino con calma a un plan pensado para el futuro.", score: 4, category: "autonomia" },
      { value: "b", text: "Un deseo de gastarlo: siento que me esforcé mucho y que merezco disfrutarlo ahora mismo.", score: 1, category: "inercia" },
      { value: "c", text: "Alivio, pero lo dejo quieto en mi cuenta bancaria por miedo a perderlo, aunque sé que pierde valor con el tiempo.", score: 2, category: "miedo" },
      { value: "d", text: "Ganas de multiplicarlo rápido: busco alguna inversión de moda para entrar ya mismo.", score: 3, category: "impaciencia" }
    ]
  },
  {
    id: 2,
    text: "Si tus ahorros invertidos bajan un poco de valor temporalmente debido a la situación de la economía...",
    options: [
      { value: "a", text: "Me tiento a cambiar de rumbo o a mover el dinero rápido para tratar de recuperar lo perdido.", score: 3, category: "impaciencia" },
      { value: "b", text: "Mantengo la calma: entiendo que el dinero tiene subas y bajas naturales y que el tiempo juega a mi favor.", score: 4, category: "autonomia" },
      { value: "c", text: "Siento temor inmediato y me dan ganas de retirar todo para no perder lo que me queda.", score: 1, category: "miedo" },
      { value: "d", text: "Me genera una preocupación constante y no puedo evitar revisar mi saldo todos los días con frustración.", score: 2, category: "ansiedad" }
    ]
  },
  {
    id: 3,
    text: "Para vos, ¿cuál es el principal objetivo de empezar a poner a trabajar tus ahorros?",
    options: [
      { value: "a", text: "Solo proteger mi dinero para que no pierda valor frente al costo de vida diario, sin complicarme.", score: 2, category: "miedo" },
      { value: "b", text: "Quiero que alguien de total confianza maneje todo por mí para no tener que pensar en eso.", score: 3, category: "dependencia" },
      { value: "c", text: "Comprar mi libertad y tiempo en el futuro, creando estabilidad e independencia paso a paso.", score: 4, category: "autonomia" },
      { value: "d", text: "Ganar mucho dinero rápido para saldar deudas o darme un gusto grande de inmediato.", score: 1, category: "impaciencia" }
    ]
  },
  {
    id: 4,
    text: "Cuando tenés que tomar una decisión importante con tu dinero, ¿en qué te apoyás?",
    options: [
      { value: "a", text: "Pienso con calma en mis metas reales y elijo pensando en cómo afectará mi tranquilidad a largo plazo.", score: 4, category: "autonomia" },
      { value: "b", text: "Me cuesta decidir y suelo postergar la decisión por miedo a equivocarme o elegir mal.", score: 2, category: "miedo" },
      { value: "c", text: "Busco oportunidades que prometan ganancias veloces para no quedarme afuera de lo que todos comentan.", score: 3, category: "impaciencia" },
      { value: "d", text: "En el consejo rápido del momento, lo que sugieren en las redes sociales o lo que me dice un amigo entusiasmado.", score: 1, category: "inercia" }
    ]
  },
  {
    id: 5,
    text: "¿Cómo te gustaría que sea tu camino para aprender a manejar tus finanzas?",
    options: [
      { value: "a", text: "Prefiero no confiar en nadie y guardar el dinero en casa donde nadie lo toque.", score: 2, category: "miedo" },
      { value: "b", text: "Un proceso donde pueda aprender paso a paso, entender mis decisiones y ser cada vez más independiente.", score: 4, category: "autonomia" },
      { value: "c", text: "Que me den recomendaciones constantes para mover el dinero rápido según lo que pase en la semana.", score: 3, category: "impaciencia" },
      { value: "d", text: "Que un experto me diga exactamente qué hacer sin que yo tenga que entender cómo funciona.", score: 1, category: "dependencia" }
    ]
  }
];

export default function SocioFinancialSurvey() {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0: Intro, 1-5: Questions, 6: Loading, 7: Result
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, { text: string; score: number; optionText: string }>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("Iniciando análisis...");
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startSurvey = () => {
    setSelectedAnswers({});
    setError(null);
    setCurrentStep(1);
  };

  const handleOptionSelect = (questionId: number, score: number, optionText: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: {
        text: QUESTIONS[questionId - 1].text,
        score,
        optionText
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      submitSurvey();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      setCurrentStep(0);
    }
  };

  const submitSurvey = async () => {
    setCurrentStep(6);
    setIsLoading(true);
    setError(null);

    const messages = [
      "Escuchando tus respuestas en calma...",
      "Analizando tus patrones inconscientes de ahorro...",
      "Identificando tu nivel de tolerancia al parpadeo de pantalla...",
      "Evaluando tu relación entre el dinero, el tiempo y las emociones...",
      "Estructurando tu arquetipo socio-financiero personalizado..."
    ];

    let msgIndex = 0;
    const msgInterval = setInterval(() => {
      if (msgIndex < messages.length - 1) {
        msgIndex++;
        setLoadingMessage(messages[msgIndex]);
      }
    }, 1500);

    try {
      const payloadAnswers = Object.keys(selectedAnswers).map(key => {
        const qId = parseInt(key);
        return {
          questionId: qId,
          questionText: selectedAnswers[qId].text,
          selectedOptionText: selectedAnswers[qId].optionText
        };
      });

      const response = await fetch('/api/analyze-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers: payloadAnswers })
      });

      if (!response.ok) {
        let errMsg = "No se pudo completar el análisis socio-financiero.";
        try {
          const errData = await response.json();
          errMsg = errData.error || errMsg;
        } catch (jsonErr) {
          try {
            const rawText = await response.text();
            if (rawText && rawText.length < 200) {
              errMsg = rawText;
            } else {
              errMsg = `Error del servidor (${response.status}): ${response.statusText || 'Error desconocido'}`;
            }
          } catch (textErr) {
            errMsg = `Error de red o de servidor (${response.status})`;
          }
        }
        throw new Error(errMsg);
      }

      const data = await response.json();
      setResult(data);
      setCurrentStep(7);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ocurrió un error al contactar al servidor. Por favor, verificá tu conexión.");
      setCurrentStep(1); // Volver al inicio del cuestionario
    } finally {
      clearInterval(msgInterval);
      setIsLoading(false);
    }
  };

  const resetSurvey = () => {
    setSelectedAnswers({});
    setResult(null);
    setError(null);
    setCurrentStep(0);
  };

  return (
    <div id="survey-section" className="w-full max-w-4xl mx-auto bg-white border border-brand-border rounded-3xl p-6 md:p-12 shadow-3xs transition-all duration-300">
      
      {/* INTRO SCREEN (Step 0) */}
      {currentStep === 0 && (
        <div className="text-center py-6">
          <div className="inline-flex p-3 bg-brand-muted border border-brand-border rounded-2xl text-brand-accent mb-6">
            <Brain className="w-8 h-8" />
          </div>
          <span className="block text-xs font-mono font-bold text-brand-accent uppercase tracking-widest mb-2">
            Diagnóstico de Mentalidad
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-brand-charcoal tracking-tight mb-4">
            Autoevaluación de Relación con el Dinero
          </h2>
          <p className="text-brand-charcoal/80 text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-light">
            Las finanzas saludables no dependen solo de balances o ecuaciones matemáticas. Nacen de tus miedos, expectativas, hábitos e inteligencia emocional. 
            Te invitamos a responder estas <strong className="font-bold text-brand-charcoal">5 preguntas conceptuales</strong> en calma para descubrir tu perfil socio-financiero y recibir una reflexión personalizada.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={startSurvey}
              className="px-8 py-4 bg-brand-charcoal text-white font-serif font-bold rounded-full hover:bg-brand-accent hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2 shadow-sm cursor-pointer"
              id="btn-start-survey"
            >
              Comenzar Autoevaluación
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs text-brand-charcoal/50 font-mono">
              <Lock className="w-3.5 h-3.5 text-brand-accent" />
              Respuestas 100% privadas
            </div>
          </div>
        </div>
      )}

      {/* QUESTION SCREENS (Steps 1 to 5) */}
      {currentStep >= 1 && currentStep <= 5 && (
        <div>
          {/* Header metadata */}
          <div className="flex justify-between items-center mb-8 border-b border-brand-border pb-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-brand-muted text-brand-charcoal border border-brand-border rounded-lg">
                <Compass className="w-4 h-4 text-brand-accent" />
              </span>
              <span className="text-sm font-serif font-bold text-brand-charcoal">FINET Orientación</span>
            </div>
            <div className="text-sm font-mono text-brand-accent/80 font-bold">
              Pregunta <span className="text-brand-charcoal font-bold font-mono">{currentStep}</span> de 5
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-brand-muted h-2 rounded-full mb-8 overflow-hidden border border-brand-border/40">
            <div 
              className="bg-brand-accent h-full transition-all duration-300" 
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="mb-8">
            <h3 className="font-serif text-xl md:text-2xl font-normal text-brand-charcoal leading-tight">
              {QUESTIONS[currentStep - 1].text}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="space-y-4 mb-10">
            {QUESTIONS[currentStep - 1].options.map((option, index) => {
              const isSelected = selectedAnswers[currentStep]?.score === option.score && selectedAnswers[currentStep]?.optionText === option.text;
              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(currentStep, option.score, option.text)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer ${
                    isSelected 
                      ? 'border-brand-accent bg-brand-muted/40 text-brand-charcoal shadow-3xs font-medium' 
                      : 'border-brand-border hover:border-brand-accent/50 bg-white text-brand-charcoal/95 hover:bg-brand-muted/25 font-light'
                  }`}
                  id={`opt-q${currentStep}-${index}`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 transition-colors border ${
                    isSelected ? 'bg-brand-accent text-white border-brand-accent' : 'bg-brand-muted text-brand-charcoal/70 border-brand-border'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-base md:text-md leading-relaxed">{option.text}</span>
                </button>
              );
            })}
          </div>

          {/* Footer Navigation */}
          <div className="flex justify-between items-center border-t border-brand-border pt-6">
            <button
              onClick={handleBack}
              className="px-5 py-2.5 text-brand-charcoal/70 hover:text-brand-charcoal font-medium rounded-xl hover:bg-brand-muted transition-all inline-flex items-center gap-2 text-sm cursor-pointer"
              id="btn-survey-back"
            >
              <ArrowLeft className="w-4 h-4" />
              Atrás
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedAnswers[currentStep]}
              className={`px-6 py-3 font-medium rounded-full transition-all duration-200 inline-flex items-center gap-2 text-sm shadow-3xs ${
                selectedAnswers[currentStep]
                  ? 'bg-brand-charcoal text-white hover:bg-brand-accent hover:-translate-y-0.5 cursor-pointer'
                  : 'bg-brand-muted text-brand-charcoal/30 cursor-not-allowed border border-brand-border/40'
              }`}
              id="btn-survey-next"
            >
              {currentStep === 5 ? 'Finalizar y Analizar' : 'Siguiente pregunta'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* LOADING SCREEN (Step 6) */}
      {currentStep === 6 && (
        <div className="text-center py-16 flex flex-col items-center justify-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-brand-border border-t-brand-accent rounded-full animate-spin" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-brand-accent">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <h4 className="font-serif text-xl font-bold text-brand-charcoal mb-2">
            Compilando Perfil Socio-Financiero
          </h4>
          <p className="text-brand-charcoal/70 text-md font-mono font-bold animate-pulse-subtle max-w-md">
            {loadingMessage}
          </p>
          <div className="mt-8 text-xs text-brand-charcoal/50 max-w-sm font-light">
            Nuestra IA está integrando la teoría de psicología del comportamiento y educación financiera de largo plazo para darte un reporte auténtico.
          </div>
        </div>
      )}

      {/* RESULT SCREEN (Step 7) */}
      {currentStep === 7 && result && (
        <div className="animate-fade-in">
          
          {/* Header Action Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 border-b border-brand-border pb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-muted border border-brand-border text-brand-accent text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-brand-accent" /> Reporte Personalizado
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-normal text-brand-charcoal tracking-tight">
                Tu Diagnóstico FINET
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="p-2.5 text-brand-charcoal/70 hover:text-brand-charcoal hover:bg-brand-muted rounded-xl border border-brand-border transition-all cursor-pointer inline-flex items-center gap-1.5 text-sm"
                title="Imprimir diagnóstico"
                id="btn-print-survey"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline font-mono font-bold text-xs">Imprimir</span>
              </button>
              <button
                onClick={resetSurvey}
                className="px-4 py-2.5 bg-brand-muted hover:bg-brand-border/40 text-brand-charcoal border border-brand-border font-serif font-bold rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 text-sm"
                id="btn-survey-restart"
              >
                <RefreshCw className="w-4 h-4" />
                Hacer otra vez
              </button>
            </div>
          </div>

          {/* Primary Profile Card */}
          <div className="bg-brand-charcoal text-white rounded-3xl p-6 md:p-10 mb-8 relative overflow-hidden shadow-3xs border border-brand-border">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-white pointer-events-none">
              <Brain className="w-48 h-48" />
            </div>
            
            <span className="text-xs font-mono text-brand-accent uppercase tracking-widest block mb-1 font-bold">
              Arquetipo Socio-Financiero
            </span>
            <h3 className="font-serif text-2xl md:text-4.5xl font-bold tracking-tight text-white mb-2 leading-none">
              {result.archetype}
            </h3>
            <p className="text-brand-accent/90 font-serif text-lg italic font-light mb-6">
              "{result.subtitle}"
            </p>
            <div className="w-12 h-0.5 bg-brand-accent mb-6" />
            <p className="text-white/90 text-base md:text-lg leading-relaxed font-light max-w-3xl">
              {result.summary}
            </p>
          </div>

          {/* Strengths & Challenges columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-brand-muted/25 border border-brand-border rounded-3xl p-6 md:p-8 shadow-3xs">
              <div className="flex items-center gap-3 text-brand-charcoal mb-4 font-serif font-bold text-lg">
                <div className="p-1.5 bg-brand-accent/25 text-brand-accent border border-brand-border/40 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-brand-charcoal" />
                </div>
                Tus Fortalezas
              </div>
              <ul className="space-y-3.5">
                {result.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-brand-charcoal/85 leading-relaxed text-sm md:text-md font-light">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/20 border border-amber-200/50 rounded-3xl p-6 md:p-8 shadow-3xs">
              <div className="flex items-center gap-3 text-brand-charcoal mb-4 font-serif font-bold text-lg">
                <div className="p-1.5 bg-amber-100 text-amber-800 border border-amber-200 rounded-xl">
                  <Heart className="w-5 h-5" />
                </div>
                Desafíos Emocionales
              </div>
              <ul className="space-y-3.5">
                {result.challenges.map((cha, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-brand-charcoal/85 leading-relaxed text-sm md:text-md font-light">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0" />
                    <span>{cha}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Philosophical Reflection Section */}
          <div className="bg-brand-muted/10 border border-brand-border rounded-3xl p-6 md:p-10 mb-8 shadow-3xs">
            <h4 className="font-serif font-bold text-brand-charcoal text-lg md:text-xl mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-brand-accent" />
              La Mirada Socio-Financiera de FINET
            </h4>
            <div className="text-brand-charcoal/85 leading-relaxed text-md space-y-4 font-light">
              <p>{result.philosophicalReflection}</p>
            </div>
            <div className="mt-6 p-4 bg-white rounded-2xl border border-brand-border flex items-center gap-4 text-xs text-brand-charcoal/65 font-mono">
              <BookOpen className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Te sugerimos explorar los artículos de nuestra biblioteca, especialmente sobre <strong className="font-bold text-brand-charcoal">volatilidad y el interés compuesto</strong>.</span>
            </div>
          </div>

          {/* Concrete Actions */}
          <div className="border border-brand-border rounded-3xl p-6 md:p-8 shadow-3xs">
            <h4 className="font-serif font-bold text-brand-charcoal text-lg mb-5 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-charcoal" />
              Tus Próximos Pasos Recomendados
            </h4>
            <div className="space-y-4">
              {result.nextSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start p-4 bg-brand-muted/20 rounded-2xl border border-brand-border/60">
                  <span className="w-8 h-8 rounded-full bg-brand-charcoal border border-brand-border text-brand-accent font-mono font-bold flex items-center justify-center shrink-0 text-sm">
                    {idx + 1}
                  </span>
                  <p className="text-brand-charcoal/85 leading-relaxed text-sm md:text-md pt-0.5 font-light">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action focused on booking */}
          <div className="mt-10 text-center bg-brand-muted border border-brand-border rounded-3xl p-6 md:p-10 shadow-3xs">
            <h4 className="font-serif font-bold text-brand-charcoal text-xl mb-2">
              ¿Querés que analicemos este diagnóstico en calma?
            </h4>
            <p className="text-brand-charcoal/85 text-sm md:text-md max-w-xl mx-auto mb-6 font-light">
              Agendá una primera reunión inicial con nuestro equipo. No es para venderte nada, es para conocernos, repasar tus objetivos socio-financieros y responder dudas.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="#contact-section"
                className="px-6 py-3 bg-brand-charcoal text-white text-sm font-serif font-bold rounded-full hover:bg-brand-accent hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2 shadow-sm"
              >
                Agendar Reunión Inicial
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={resetSurvey}
                className="text-brand-charcoal/70 hover:text-brand-charcoal text-sm font-semibold hover:underline cursor-pointer"
              >
                Hacer el test con otras respuestas
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Handle error gracefully */}
      {error && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-center text-sm">
          <p className="font-semibold mb-1">No pudimos procesar tu análisis:</p>
          <p className="text-amber-800 mb-3">{error}</p>
          <button 
            onClick={startSurvey} 
            className="px-4 py-2 bg-brand-charcoal text-white rounded-lg text-xs font-semibold hover:bg-brand-accent transition cursor-pointer"
          >
            Reintentar cuestionario
          </button>
        </div>
      )}

    </div>
  );
}
