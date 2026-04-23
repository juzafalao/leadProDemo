import { useState } from 'react';
import { Zap, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('carlos@leadcapture.pro');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-400/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-300/5 rounded-full blur-[120px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#26BBA1 1px, transparent 1px), linear-gradient(90deg, #26BBA1 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">LeadCapture</h1>
              <p className="text-[10px] text-brand-600 font-semibold tracking-[0.2em] uppercase">PRO</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Capture leads com
              <br />
              <span className="text-brand-500">inteligência</span> e
              <br />
              escala real.
            </h2>
            <p className="text-gray-500 mt-4 text-lg leading-relaxed max-w-md">
              Plataforma SaaS multi-tenant para captura e qualificação de leads em redes de franquias.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              { label: 'Multi-marcas', desc: 'Cada tenant gerencia N marcas com leads separados' },
              { label: 'Tempo real', desc: 'Dashboard com métricas ao vivo via WebSocket' },
              { label: 'Rankings', desc: 'Visibilidade total da equipe de vendas' },
            ].map((feature, i) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                className="flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-brand-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{feature.label}</p>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400">© 2025 LeadCapture Pro. Todos os direitos reservados.</p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">LeadCapture</h1>
              <p className="text-[10px] text-brand-600 font-semibold tracking-[0.2em] uppercase">PRO</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">Bem-vindo de volta</h3>
              <p className="text-sm text-gray-500 mt-1">Entre na sua conta para continuar</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-600 font-medium mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-sm text-gray-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-gray-400"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium mb-1.5 block">Senha</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-sm text-gray-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-gray-400 pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded border-gray-300 accent-brand-500" />
                  <span className="text-xs text-gray-600">Lembrar de mim</span>
                </label>
                <button className="text-xs text-brand-600 hover:text-brand-700 transition-colors font-medium">Esqueceu a senha?</button>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-3 rounded-xl brand-gradient text-sm font-semibold text-white hover:shadow-lg hover:shadow-brand-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Entrar <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">Não tem uma conta? <button className="text-brand-600 hover:text-brand-700 transition-colors font-medium">Solicitar acesso</button></p>
            </div>
          </div>

          {/* Demo Info */}
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-[10px] text-amber-700 text-center">
              🎯 Demo: Use as credenciais pré-preenchidas para explorar o sistema
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
