import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Check, X } from "lucide-react";
import { ScreenContainer } from "../components/ScreenContainer";
import { PrimaryButton } from "../components/PrimaryButton";
import { useMemories } from "../hooks/useMemories";
import { useNavigation } from "../navigation/NavigationContext";
import type { MemoryAccent } from "../types/memory";
import { fadeUp } from "../animations/variants";

const ACCENTS: { key: MemoryAccent; color: string }[] = [
  { key: "gold", color: "linear-gradient(135deg, #F7D9A3, #F2A65A)" },
  { key: "coral", color: "linear-gradient(135deg, #F2A65A, #E8879A)" },
  { key: "lavender", color: "linear-gradient(135deg, #B9A6E0, #7C6BA8)" },
  { key: "rose", color: "linear-gradient(135deg, #E8A0BF, #B9749A)" },
];

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function CreateMemoryScreen() {
  const { createMemory } = useMemories();
  const { navigate } = useNavigation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [occurredAt, setOccurredAt] = useState(todayIso());
  const [accentColor, setAccentColor] = useState<MemoryAccent>("gold");
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handlePickPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoUri(reader.result as string);
    reader.readAsDataURL(file);
  };

  const canSave = title.trim().length > 0;

  const handleSave = async () => {
    if (!canSave || isSaving) return;
    setIsSaving(true);
    await createMemory({
      title,
      description,
      occurredAt: new Date(occurredAt).toISOString(),
      accentColor,
      photoUri,
    });
    setIsSaving(false);
    setSavedFeedback(true);
    setTimeout(() => {
      setTitle("");
      setDescription("");
      setPhotoUri(undefined);
      setOccurredAt(todayIso());
      setSavedFeedback(false);
      navigate("Timeline");
    }, 700);
  };

  return (
    <ScreenContainer className="pb-32 pt-14">
      <p className="text-[12px] uppercase tracking-[0.18em] text-[#F5C177]">
        Novo capítulo
      </p>
      <h1
        className="mt-1 text-[28px] font-semibold text-[#F8F4EE]"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Guardar memória
      </h1>

      <div className="mt-6 space-y-5">
        {/* Foto */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePickPhoto}
          />
          {photoUri ? (
            <div className="relative h-40 w-full overflow-hidden rounded-3xl border border-white/10">
              <img
                src={photoUri}
                alt="Prévia"
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => setPhotoUri(undefined)}
                className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white"
                aria-label="Remover foto"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex h-40 w-full flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-white/15 bg-white/5 text-[#8A83A0] transition hover:bg-white/8"
            >
              <Camera size={24} />
              <span className="text-[13px]">Adicionar uma foto (opcional)</span>
            </button>
          )}
        </div>

        {/* Título */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-[#8A83A0]">
            Título
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Viagem à praia com a família"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-[14.5px] text-[#F8F4EE] placeholder:text-[#726C8A] outline-none focus:border-[#F5C177]/50"
          />
        </div>

        {/* Data */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-[#8A83A0]">
            Quando aconteceu
          </label>
          <input
            type="date"
            value={occurredAt}
            onChange={(e) => setOccurredAt(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-[14.5px] text-[#F8F4EE] outline-none focus:border-[#F5C177]/50 [color-scheme:dark]"
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-[#8A83A0]">
            Conte essa história
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="O que tornou esse momento especial?"
            rows={4}
            className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-[14.5px] text-[#F8F4EE] placeholder:text-[#726C8A] outline-none focus:border-[#F5C177]/50"
          />
        </div>

        {/* Cor de destaque */}
        <div>
          <label className="mb-2 block text-[12px] font-medium text-[#8A83A0]">
            Cor de destaque
          </label>
          <div className="flex gap-3">
            {ACCENTS.map(({ key, color }) => (
              <button
                key={key}
                onClick={() => setAccentColor(key)}
                className="relative h-10 w-10 rounded-full"
                style={{ background: color }}
                aria-label={key}
              >
                {accentColor === key && (
                  <motion.div
                    layoutId="accent-ring"
                    className="absolute -inset-1 rounded-full border-2 border-[#F8F4EE]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div variants={fadeUp} initial="initial" animate="animate" className="mt-8">
        <PrimaryButton
          onPress={handleSave}
          disabled={!canSave || isSaving}
          icon={savedFeedback ? <Check size={18} /> : undefined}
        >
          {savedFeedback ? "Memória guardada!" : "Guardar para sempre"}
        </PrimaryButton>
      </motion.div>
    </ScreenContainer>
  );
}
