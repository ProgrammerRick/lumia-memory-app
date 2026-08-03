import { motion } from 'framer-motion';
import { Home, PlusCircle, Clock, Settings } from 'lucide-react';
import { cn } from '@/utils/cn';

export type TabId = 'home' | 'create' | 'timeline' | 'settings';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Início', icon: Home },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'create', label: 'Criar', icon: PlusCircle },
  { id: 'settings', label: 'Ajustes', icon: Settings },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <motion.nav
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-50 safe-bottom"
    >
      <div className="glass-strong border-t border-white/[0.06]">
        <div className="flex items-center justify-around px-2 py-1 max-w-lg mx-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const isCreate = tab.id === 'create';
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'relative flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all duration-250 cursor-pointer',
                  'focus:outline-none active:scale-95',
                  isCreate
                    ? 'px-4'
                    : isActive
                    ? 'text-lumia-400'
                    : 'text-text-muted hover:text-text-secondary'
                )}
              >
                {isCreate ? (
                  <div className="relative -mt-4">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300',
                        'bg-gradient-to-br from-lumia-500 to-lumia-400 shadow-glow-sm',
                        isActive && 'shadow-glow-md scale-110'
                      )}
                    >
                      <Icon className="w-5 h-5 text-night-950" strokeWidth={2.5} />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      <Icon
                        className={cn(
                          'w-5 h-5 transition-all duration-250',
                          isActive && 'scale-110'
                        )}
                        strokeWidth={isActive ? 2.5 : 1.8}
                      />
                      {isActive && (
                        <motion.div
                          layoutId="navIndicator"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-lumia-400"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-[10px] font-medium transition-all duration-250',
                        isActive ? 'text-lumia-400' : 'text-text-muted'
                      )}
                    >
                      {tab.label}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
