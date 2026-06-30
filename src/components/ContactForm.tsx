import React, { useState } from 'react';
import { Calendar, Mail, User, Phone, MessageSquare, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface ContactFormProps {
  initialMessage?: string;
  origin?: string;
}

export default function ContactForm({ initialMessage = "", origin = "Formulario Web" }: ContactFormProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>(initialMessage);
  const [datePreference, setDatePreference] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMessage("Por favor, completá los campos obligatorios: Nombre y Correo electrónico.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/book-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          datePreference,
          origin
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Ocurrió un error al registrar la solicitud.");
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      
      // Clear fields
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setDatePreference("");
    } catch (err: any) {
      setErrorMessage(err.message || "Error de conexión. Por favor reintentá en unos momentos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-section" className="bg-white border border-brand-border rounded-3xl p-6 md:p-10 shadow-3xs">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-muted text-brand-charcoal border border-brand-border text-xs font-mono font-bold rounded-full uppercase tracking-wider mb-2">
          Contacto en Calma
        </span>
        <h3 className="font-serif font-bold text-brand-charcoal text-xl md:text-2xl tracking-tight">
          Agendá una Reunión Inicial
        </h3>
        <p className="text-brand-charcoal/70 text-sm leading-relaxed mt-1 font-light">
          Nuestra primera conversación tiene como único fin conocernos, escuchar tus metas y temores socio-financieros. No hay compromisos de inversión ni discursos comerciales.
        </p>
      </div>

      {successMessage ? (
        <div className="bg-brand-muted/40 border border-brand-border p-6 md:p-8 rounded-2xl text-center animate-fade-in">
          <div className="inline-flex p-3 bg-white text-brand-accent rounded-full border border-brand-border shadow-3xs mb-4">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h4 className="font-serif font-bold text-brand-charcoal text-lg mb-2">
            ¡Reunión Solicitada Exitosamente!
          </h4>
          <p className="text-brand-charcoal/80 text-sm md:text-md leading-relaxed max-w-md mx-auto font-light">
            {successMessage}
          </p>
          <div className="mt-6 pt-4 border-t border-brand-border/50 flex justify-center items-center gap-2 text-2xs text-brand-accent font-mono">
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <span className="font-bold">Un asesor se comunicará en calma</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-charcoal font-mono block">
                Nombre Completo *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-charcoal/50 pointer-events-none">
                  <User className="w-4 h-4" />
                </span>
                <input 
                  type="text"
                  required
                  placeholder="Ej: Marcelo Pérez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-brand-muted/10 border border-brand-border focus:border-brand-accent focus:bg-white rounded-xl text-sm transition-all outline-none text-brand-charcoal"
                  id="contact-name"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-charcoal font-mono block">
                Correo Electrónico *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-charcoal/50 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  type="email"
                  required
                  placeholder="Ej: marcelo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-brand-muted/10 border border-brand-border focus:border-brand-accent focus:bg-white rounded-xl text-sm transition-all outline-none text-brand-charcoal"
                  id="contact-email"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Phone and Time Preference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-charcoal font-mono block">
                Teléfono / WhatsApp (Opcional)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-charcoal/50 pointer-events-none">
                  <Phone className="w-4 h-4" />
                </span>
                <input 
                  type="tel"
                  placeholder="Ej: +54 9 11 2345 6789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-brand-muted/10 border border-brand-border focus:border-brand-accent focus:bg-white rounded-xl text-sm transition-all outline-none text-brand-charcoal"
                  id="contact-phone"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-charcoal font-mono block">
                Preferencia de Horario
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-charcoal/50 pointer-events-none">
                  <Clock className="w-4 h-4" />
                </span>
                <select 
                  value={datePreference}
                  onChange={(e) => setDatePreference(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-brand-muted/10 border border-brand-border focus:border-brand-accent focus:bg-white rounded-xl text-sm transition-all outline-none text-brand-charcoal appearance-none cursor-pointer font-light"
                  id="contact-schedule"
                >
                  <option value="">Cualquier momento</option>
                  <option value="mañana">Mañana (09:00 a 13:00)</option>
                  <option value="tarde">Tarde (14:00 a 18:00)</option>
                  <option value="fin-semana">Fin de semana</option>
                </select>
              </div>
            </div>
          </div>

          {/* Textarea: Message / Objectives */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-brand-charcoal font-mono block">
              Tus objetivos o reflexiones (Opcional)
            </label>
            <div className="relative">
              <span className="absolute top-3.5 left-3.5 text-brand-charcoal/50 pointer-events-none">
                <MessageSquare className="w-4 h-4" />
              </span>
              <textarea 
                rows={3}
                placeholder="Ej: Quiero empezar a armar mi cartera diversificada a largo plazo y aprender sobre el interés compuesto. Me preocupa la volatilidad..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-brand-muted/10 border border-brand-border focus:border-brand-accent focus:bg-white rounded-xl text-sm transition-all outline-none text-brand-charcoal resize-none font-light"
                id="contact-message"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 bg-brand-charcoal text-white font-serif font-bold text-sm rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 ${
              isSubmitting ? 'bg-brand-charcoal/70 cursor-not-allowed' : 'hover:bg-brand-accent hover:-translate-y-0.5 cursor-pointer'
            }`}
            id="btn-contact-submit"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Registrando en calma...
              </>
            ) : (
              <>
                Solicitar Encuentro Socio-Financiero
              </>
            )}
          </button>

          <div className="flex justify-center items-center gap-1.5 text-3xs text-brand-charcoal/60 font-mono text-center pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-accent shrink-0" />
            <span>Al enviar autorizás a FINET a responderte de forma personalizada y segura.</span>
          </div>

        </form>
      )}
    </div>
  );
}
