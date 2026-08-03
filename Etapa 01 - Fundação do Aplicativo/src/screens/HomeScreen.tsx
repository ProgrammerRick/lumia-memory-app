import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { ScreenContainer } from "../components/ScreenContainer";
import { MemoryCard } from "../components/MemoryCard";
import { EmptyState } from "../components/EmptyState";
import { useMemories } from "../hooks/useMemories";
import { useNavigation } from "../navigation/NavigationContext";
import { staggerContainer, staggerItem } from "../animations/variants";

export function HomeScreen() {
  const { memories, isLoading } = useMemories();
  const { navigate } = useNavigation();

  const recent = memories.slice(0, 3);

  return (
    <ScreenContainer className="pb-32 pt-14">
      <motion.div variants={staggerItem} initial="initial" animate="animate">
        <p className="text-[12px] uppercase tracking-[0.18em] text-[#F5C177]">
          Bem-vindo(a) de volta
        </p>
        <h1
          className="mt-1 text-[28px] font-semibold text-[#F8F4EE]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Sua história vive aqui
        </h1>
      </motion.div>

      <motion.div
        variants={staggerItem}
        initial="initial"
        animate="animate"
        className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 p-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(91,58,122,0.55) 0%, rgba(14,10,26,0.4) 100%)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] text-[#C9C2DA]">Memórias guardadas</p>
            <p
              className="mt-1 text-[32px] font-semibold text-[#F8F4EE]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {isLoading ? "—" : memories.length}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <Sparkles size={22} className="text-[#F5C177]" />
          </div>
        </div>
        <button
          onClick={() => navigate("CreateMemory")}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white/10 py-3 text-[13px] font-semibold text-[#F8F4EE] transition hover:bg-white/15"
        >
          <Plus size={16} />
          Guardar nova memória
        </button>
      </motion.div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-[#F8F4EE]">
          Recentes
        </h2>
        {memories.length > 0 && (
          <button
            onClick={() => navigate("Timeline")}
            className="text-[12px] font-medium text-[#F5C177]"
          >
            Ver tudo
          </button>
        )}
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="mt-4"
      >
        {recent.length === 0 && !isLoading ? (
          <EmptyState
            icon={<Sparkles size={26} />}
            title="Nenhuma memória ainda"
            description="Comece guardando o seu primeiro momento especial. Ele ficará para sempre aqui."
          />
        ) : (
          recent.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))
        )}
      </motion.div>
    </ScreenContainer>
  );
}
