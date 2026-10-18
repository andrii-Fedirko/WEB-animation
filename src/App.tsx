import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import './App.css';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'success' | 'error'>('idle');
  const shouldReduceMotion = useReducedMotion();

  const fadeInVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.8, transition: { duration: 0.2 } },
  };

  const triggerFeedback = (type: 'success' | 'error') => {
    setFeedbackState(type);
    setTimeout(() => setFeedbackState('idle'), 3000);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        style={{ marginBottom: '30px', textAlign: 'center' }}
      >
        <h1>Практична 4.7: Анімація та UX Взаємодії</h1>
        <p style={{ color: '#94a3b8' }}>
          Демонстрація Framer Motion, AnimatePresence та Micro-interactions
        </p>
      </motion.header>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        style={{ background: '#1e293b', padding: '24px', borderRadius: '12px', color: '#fff', marginBottom: '24px' }}
      >
        <h2>1. Мікровзаємодії та Зворотний Зв'язок</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
          <motion.button
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            onClick={() => setIsModalOpen(true)}
            style={{ padding: '10px 20px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Відкрити модальне вікно
          </motion.button>

          <motion.button
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            onClick={() => triggerFeedback('success')}
            style={{ padding: '10px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Успішна дія
          </motion.button>

          <motion.button
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            onClick={() => triggerFeedback('error')}
            style={{ padding: '10px 20px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Симуляція помилки
          </motion.button>
        </div>

        <AnimatePresence>
          {feedbackState !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                marginTop: '16px',
                padding: '12px',
                borderRadius: '8px',
                background: feedbackState === 'success' ? '#065f46' : '#991b1b',
                color: '#fff',
              }}
            >
              {feedbackState === 'success' ? '✅ Операція успішно виконана!' : '❌ Сталася помилка при обробці запиту!'}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#0f172a',
                padding: '30px',
                borderRadius: '16px',
                maxWidth: '400px',
                width: '100%',
                color: '#fff',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
              }}
            >
              <h3>Анімоване Модальне Вікно</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Плавна поява та зникнення реалізовані за допомогою Framer Motion & AnimatePresence.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(false)}
                style={{
                  marginTop: '20px',
                  padding: '8px 16px',
                  background: '#64748b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Закрити
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}