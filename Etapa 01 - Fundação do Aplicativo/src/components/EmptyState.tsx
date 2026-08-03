import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      animate="animate"
      className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center"
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-[#F5C177]">
        {icon}
      </div>
      <h3
        className="mb-2 text-[18px] font-semibold text-[#F8F4EE]"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {title}
      </h3>
      <p className="max-w-[240px] text-[13.5px] leading-relaxed text-[#8A83A0]">
        {description}
      </p>
    </motion.div>
  );
}
