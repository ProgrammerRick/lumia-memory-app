import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BottomNav, type TabId } from '@/components/layout/BottomNav';
import { WelcomeScreen } from '@/screens/WelcomeScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { CreateMemoryScreen } from '@/screens/CreateMemoryScreen';
import { TimelineScreen } from '@/screens/TimelineScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>('home');

  const handleWelcomeComplete = useCallback(() => {
    setShowWelcome(false);
  }, []);

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
  }, []);

  const handleNavigate = useCallback((tab: string) => {
    setActiveTab(tab as TabId);
  }, []);

  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  return (
    <div className="relative min-h-screen bg-night-950">
      {/* Ambient background gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-30"
          style={{
            background:
              'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(255,170,62,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Screen Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10"
        >
          {activeTab === 'home' && <HomeScreen onNavigate={handleNavigate} />}
          {activeTab === 'create' && <CreateMemoryScreen />}
          {activeTab === 'timeline' && <TimelineScreen />}
          {activeTab === 'settings' && <SettingsScreen />}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
