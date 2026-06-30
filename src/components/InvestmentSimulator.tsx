import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Home, 
  Clock, 
  DollarSign, 
  HelpCircle, 
  ChevronRight, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

export default function InvestmentSimulator() {
  const [initialCapital, setInitialCapital] = useState<number>(5000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200);
  const [annualRate, setAnnualRate] = useState<number>(7); // Default moderate rate of return (7%)
  const [years, setYears] = useState<number>(20);

  // Inflation rate assumed for the purchase-power loss demonstration (e.g. 3.5% average global USD inflation)
  const inflationRate = 3.5;

  const simulationData = useMemo(() => {
    let totalInvested = initialCapital;
    let compoundedBalance = initialCapital;
    let standardSavingsNominal = initialCapital;
    let inflationAdjustedCash = initialCapital;

    const yearlyData = [];

    for (let year = 1; year <= years; year++) {
      // 12 monthly cycles per year
      for (let month = 1; month <= 12; month++) {
        // Compound interest calculated monthly
        compoundedBalance = (compoundedBalance + monthlyContribution) * (1 + (annualRate / 100) / 12);
        totalInvested += monthlyContribution;
        standardSavingsNominal += monthlyContribution;
        inflationAdjustedCash = (inflationAdjustedCash + monthlyContribution) * (1 - (inflationRate / 100) / 12);
      }

      yearlyData.push({
        year,
        totalInvested: Math.round(totalInvested),
        compoundedBalance: Math.round(compoundedBalance),
        standardSavingsNominal: Math.round(standardSavingsNominal),
        inflationAdjustedCash: Math.round(inflationAdjustedCash > 0 ? inflationAdjustedCash : 0),
        interestGained: Math.round(compoundedBalance - totalInvested)
      });
    }

    return {
      yearlyData,
      finalInvested: Math.round(totalInvested),
      finalCompounded: Math.round(compoundedBalance),
      finalCashInflationLoss: Math.round(standardSavingsNominal - inflationAdjustedCash),
      finalInflationAdjusted: Math.round(inflationAdjustedCash),
      finalInterest: Math.round(compoundedBalance - totalInvested),
      // Estimated monthly rental equivalent (calculating 5% yearly cashflow distribution)
      monthlyRentEquivalent: Math.round((compoundedBalance * 0.05) / 12)
    };
  }, [initialCapital, monthlyContribution, annualRate, years]);

  // Format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="w-full bg-white border border-brand-border rounded-3xl p-6 md:p-10 shadow-3xs">
      <div className="flex items-center gap-3 mb-6 border-b border-brand-border pb-4">
        <div className="p-2 bg-brand-charcoal text-white rounded-xl border border-brand-border">
          <Calculator className="w-5 h-5 text-brand-accent" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-brand-charcoal text-lg md:text-xl">
            Simulador de Crecimiento del Tiempo (Bola de Nieve)
          </h3>
          <p className="text-brand-accent text-xs font-mono font-bold uppercase tracking-wider">
            Estrategia de largo plazo e interés compuesto vs. inercia del ahorro estático
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sliders Control Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Initial Capital */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-brand-charcoal font-semibold">Monto Inicial (Capital)</span>
              <span className="text-brand-accent font-bold font-mono">{formatCurrency(initialCapital)}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="100000" 
              step="500"
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value))}
              className="w-full accent-brand-accent cursor-pointer"
            />
            <div className="flex justify-between text-2xs text-brand-charcoal/50 font-mono">
              <span>$ 500</span>
              <span>$ 100.000</span>
            </div>
          </div>

          {/* Monthly Savings */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-brand-charcoal font-semibold">Ahorro Mensual Recurrente</span>
              <span className="text-brand-accent font-bold font-mono">{formatCurrency(monthlyContribution)}</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="5000" 
              step="50"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full accent-brand-accent cursor-pointer"
            />
            <div className="flex justify-between text-2xs text-brand-charcoal/50 font-mono">
              <span>$ 50</span>
              <span>$ 5.000</span>
            </div>
          </div>

          {/* Expected Return Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-brand-charcoal font-semibold">Tasa de Rentabilidad Anual Estimada</span>
              <span className="text-brand-accent font-bold font-mono">{annualRate}% anual</span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="15" 
              step="0.5"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full accent-brand-accent cursor-pointer"
            />
            <div className="flex justify-between text-2xs text-brand-charcoal/50 font-mono">
              <span>2% (Muy Conservadora)</span>
              <span>15% (Especulativa Máxima)</span>
            </div>
          </div>

          {/* Horizon (Years) */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-brand-charcoal font-semibold">Horizonte Temporal (Paciencia)</span>
              <span className="text-brand-accent font-bold font-mono">{years} años</span>
            </div>
            <input 
              type="range" 
              min="3" 
              max="40" 
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-brand-accent cursor-pointer"
            />
            <div className="flex justify-between text-2xs text-brand-charcoal/50 font-mono">
              <span>3 años</span>
              <span>40 años</span>
            </div>
          </div>

          {/* Education Box */}
          <div className="bg-brand-muted/35 border border-brand-border rounded-2xl p-4 space-y-3 shadow-3xs">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider font-mono">
                  La Octava Maravilla
                </span>
                <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light">
                  Observá cómo en los primeros años el crecimiento parece lineal, pero luego del año 10 la "bola de nieve" de intereses ganados supera con creces lo que vos depositaste de tu bolsillo. Eso es el interés compuesto trabajando en calma.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Visual Charts and Metaphors */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            
            <div className="bg-white p-4 rounded-2xl border border-brand-border shadow-3xs">
              <span className="block text-2xs font-mono font-bold text-brand-accent uppercase">
                Ahorrado por vos
              </span>
              <span className="text-lg font-bold text-brand-charcoal font-mono">
                {formatCurrency(simulationData.finalInvested)}
              </span>
              <span className="block text-3xs text-brand-charcoal/55 mt-1 font-light">
                Capital acumulado sin invertir
              </span>
            </div>

            <div className="bg-brand-muted/30 p-4 rounded-2xl border border-brand-border shadow-3xs">
              <span className="block text-2xs font-mono font-bold text-brand-accent uppercase">
                Interés Compuesto Generado
              </span>
              <span className="text-lg font-bold text-brand-charcoal font-mono flex items-center gap-1">
                +{formatCurrency(simulationData.finalInterest)}
                <TrendingUp className="w-3.5 h-3.5 text-brand-accent" />
              </span>
              <span className="block text-3xs text-brand-accent font-bold mt-1">
                Dinero creado por el tiempo
              </span>
            </div>

            <div className="bg-brand-charcoal text-white p-4 rounded-2xl border border-brand-border shadow-3xs">
              <span className="block text-2xs font-mono font-bold text-brand-accent uppercase">
                Valor Total Futuro
              </span>
              <span className="text-xl font-bold text-brand-accent font-mono">
                {formatCurrency(simulationData.finalCompounded)}
              </span>
              <span className="block text-3xs text-white/50 mt-1 font-light">
                Tu patrimonio total al final
              </span>
            </div>

          </div>

          {/* Simple visual bar comparison of results */}
          <div className="space-y-4 bg-brand-muted/10 p-5 rounded-2xl border border-brand-border mb-6">
            <span className="text-xs font-bold text-brand-charcoal block">
              Comparación de Poder de Compra Final tras {years} años:
            </span>

            {/* Compound Investment */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-brand-charcoal flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-accent" />
                  Cartera Diversificada (FINET)
                </span>
                <span className="font-bold text-brand-charcoal font-mono">{formatCurrency(simulationData.finalCompounded)}</span>
              </div>
              <div className="w-full bg-brand-muted h-6 rounded-lg overflow-hidden flex border border-brand-border/40">
                <div className="bg-brand-accent h-full text-3xs text-brand-charcoal flex items-center pl-2 font-mono font-bold whitespace-nowrap" style={{ width: '100%' }}>
                  100% (Capital + Bola de Nieve)
                </div>
              </div>
            </div>

            {/* Cash nominal */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-brand-charcoal/70 flex items-center gap-1 font-light">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-charcoal/60" />
                  Ahorro en Caja de Ahorro Nominal
                </span>
                <span className="font-semibold text-brand-charcoal/80 font-mono">{formatCurrency(simulationData.finalInvested)}</span>
              </div>
              <div className="w-full bg-brand-muted h-6 rounded-lg overflow-hidden border border-brand-border/40">
                <div 
                  className="bg-brand-charcoal/60 h-full text-3xs text-white flex items-center pl-2 font-mono whitespace-nowrap" 
                  style={{ width: `${Math.max(15, (simulationData.finalInvested / simulationData.finalCompounded) * 100)}%` }}
                >
                  {Math.round((simulationData.finalInvested / simulationData.finalCompounded) * 100)}% del total posible
                </div>
              </div>
            </div>

            {/* Cash inflation loss */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-brand-charcoal/70 flex items-center gap-1 font-light">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-charcoal/30" />
                  Poder de Compra Real del Ahorro Estático (Inflación {inflationRate}%)
                </span>
                <span className="font-bold text-brand-charcoal font-mono">{formatCurrency(simulationData.finalInflationAdjusted)}</span>
              </div>
              <div className="w-full bg-brand-muted h-6 rounded-lg overflow-hidden border border-brand-border/40 relative flex items-center">
                <div 
                  className="bg-brand-charcoal/30 h-full text-3xs text-white flex items-center pl-2 font-mono font-bold whitespace-nowrap" 
                  style={{ width: `${Math.max(10, (simulationData.finalInflationAdjusted / simulationData.finalCompounded) * 100)}%` }}
                >
                  {Math.round((simulationData.finalInflationAdjusted / simulationData.finalCompounded) * 100)}%
                </div>
              </div>
              <p className="text-3xs text-brand-charcoal/65 pl-3 leading-relaxed font-light">
                * Pérdida real de <strong className="font-semibold text-brand-charcoal font-mono">{formatCurrency(simulationData.finalCashInflationLoss)}</strong> de poder adquisitivo por inercia inflacionaria.
              </p>
            </div>

          </div>

          {/* Core Metaphor: The Real Estate Analogy of FINET */}
          <div className="bg-brand-charcoal text-white p-5 rounded-2xl relative overflow-hidden border border-brand-border">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/10 text-brand-accent rounded-xl mt-0.5 border border-white/10">
                <Home className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-2xs font-mono text-brand-accent uppercase tracking-widest block font-bold">
                  La Analogía Inmobiliaria
                </span>
                <h4 className="font-serif font-bold text-white text-md">
                  Tu cartera se comporta como un inmueble de renta
                </h4>
                <p className="text-white/80 text-xs leading-relaxed font-light">
                  Si tu patrimonio total de <strong className="text-white font-mono">{formatCurrency(simulationData.finalCompounded)}</strong> fuera un departamento para alquilar, te generaría una renta mensual aproximada de <strong className="text-brand-accent font-mono">{formatCurrency(simulationData.monthlyRentEquivalent)}</strong> (calculado al 5% anual de distribución). 
                </p>
                <p className="text-white/40 text-xs italic leading-relaxed pt-1 border-t border-white/10 mt-2 font-light">
                  "No llamarías a un tasador de propiedades cada 5 minutos para ver si tu casa subió o bajó un peso hoy. No sufras el parpadeo diario de la pantalla. Enfocate en la renta y dejá actuar al tiempo."
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
