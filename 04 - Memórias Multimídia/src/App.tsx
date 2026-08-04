import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BottomNav, type TabId } from '@/components/layout/BottomNav';
import { Toast, type ToastType } from '@/components/ui/Toast';
import { WelcomeScreen } from '@/screens/WelcomeScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { CreateMemoryScreen } from '@/screens/CreateMemoryScreen';
import { TimelineScreen } from '@/screens/TimelineScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { MemoryDetailScreen } from '@/screens/MemoryDetailScreen';
import { MemoryProvider, useMemories } from '@/contexts/MemoryContext';
import { hasSeenWelcome, markWelcomeSeen } from '@/lib/storage';


type Screen =
  | { type: 'tabs' }
  | { type: 'detail'; memoryId: string }
  | { type: 'edit'; memoryId: string };

function AppContent() {
  const [showWelcome, setShowWelcome] = useState(!hasSeenWelcome());
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [screen, setScreen] = useState<Screen>({ type: 'tabs' });
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: ToastType }>({
    visible: false,
    message: '',
    type: 'success',
  });

  const { getById } = useMemories();

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    setToast({ visible: true, message, type });
  }, []);

  const handleWelcomeComplete = useCallback(() => {
    markWelcomeSeen();
    setShowWelcome(false);
  }, []);

  const handleTabChange = useCallback((tab: TabId) => {
    setScreen({ type: 'tabs' });
    setActiveTab(tab);
  }, []);

  const handleNavigate = useCallback((tab: string) => {
    setScreen({ type: 'tabs' });
    setActiveTab(tab as TabId);
  }, []);

  const handleOpenMemory = useCallback((id: string) => {
    setScreen({ type: 'detail', memoryId: id });
  }, []);

  const handleCreateClose = useCallback(() => {
    setScreen({ type: 'tabs' });
    setActiveTab('home');
  }, []);

  const handleCreateSuccess = useCallback(() => {
    setScreen({ type: 'tabs' });
    setActiveTab('timeline');
    showToast('✨ Memória guardada com carinho!', 'success');
  }, [showToast]);

  const handleEditMemory = useCallback((id: string) => {
    setScreen({ type: 'edit', memoryId: id });
  }, []);

  const handleEditSuccess = useCallback(() => {
    const editScreen = screen as { type: 'edit'; memoryId: string };
    setScreen({ type: 'detail', memoryId: editScreen.memoryId });
    showToast('Memória atualizada!', 'success');
  }, [screen, showToast]);

  const handleDeletedMemory = useCallback(() => {
    setScreen({ type: 'tabs' });
    setActiveTab('timeline');
    showToast('Memória excluída', 'info');
  }, [showToast]);

  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  const editMemory = screen.type === 'edit' ? getById(screen.memoryId) : undefined;

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
        {screen.type === 'detail' ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10"
          >
            <MemoryDetailScreen
              memoryId={screen.memoryId}
              onBack={() => setScreen({ type: 'tabs' })}
              onEdit={handleEditMemory}
              onDeleted={handleDeletedMemory}
            />
          </motion.div>
        ) : screen.type === 'edit' && editMemory ? (
          <motion.div
            key="edit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10"
          >
            <CreateMemoryScreen
              onClose={() => setScreen({ type: 'detail', memoryId: screen.memoryId })}
              onSuccess={handleEditSuccess}
              editMemory={editMemory}
            />
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10"
          >
            {activeTab === 'home' && (
              <HomeScreen onNavigate={handleNavigate} onOpenMemory={handleOpenMemory} />
            )}
            {activeTab === 'create' && (
              <CreateMemoryScreen onClose={handleCreateClose} onSuccess={handleCreateSuccess} />
            )}
            {activeTab === 'timeline' && (
              <TimelineScreen onNavigate={handleNavigate} onOpenMemory={handleOpenMemory} />
            )}
            {activeTab === 'settings' && <SettingsScreen />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation — hide when not in tabs */}
      {screen.type === 'tabs' && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {/* Toast */}
      <Toast
        isVisible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </div>
  );
}

export default function App() {
  return (
    <MemoryProvider>
      <AppContent />
    </MemoryProvider>
  );
}
