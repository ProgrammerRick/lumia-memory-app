import { motion } from "framer-motion";
import { Camera, Type, Mic, Video } from "lucide-react";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { GlassCard } from "../components/ui/GlassCard";

const MEMORY_TYPES = [
  { icon: Camera, label: "Foto" },
  { icon: Video, label: "Vídeo" },
  { icon: Mic, label: "Áudio" },
  { icon: Type, label: "Texto" },
];

/**
 * Tela Criar Memória — nesta fase é apenas uma prévia visual dos formatos
 * de memória que existirão futuramente (foto, vídeo, áudio, texto).
 * Nenhuma captura real ainda acontece.
 */
export function CreateMemoryScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenHeader
        eyebrow="Novo momento"
        title="Criar memória"
        subtitle="Escolha, em breve, como você quer guardar este instante."
      />

      <div className="flex flex-1 flex-col justify-center px-6 pb-10">
        <div className="grid grid-cols-2 gap-4">
          {MEMORY_TYPES.map(({ icon: Icon, label }, index) => (
            <GlassCard
              key={label}
              interactive
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
              className="flex aspect-square flex-col items-center justify-center gap-3 opacity-95"
            >
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-lumia-gold">
                <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-lumia-gold/10 blur-md" />
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <span className="text-[13px] font-medium text-lumia-ink-muted">{label}</span>
            </GlassCard>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center text-[13px] leading-relaxed text-lumia-ink-faint"
        >
          Em breve você poderá capturar cada um destes formatos diretamente
          aqui.
        </motion.p>
      </div>
    </div>
  );
}
