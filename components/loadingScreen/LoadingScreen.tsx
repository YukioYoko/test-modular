'use client';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-slate-900"
        >
          {/* Contenedor del Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.5, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
            className="relative"
          >
            {/* Círculo de luz detrás del logo */}
            <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-20 rounded-full scale-150"></div>
            
            <h1 className="text-5xl font-black text-white tracking-tighter relative">
              FOODLIFY<span className="text-orange-500">POS</span>
            </h1>
          </motion.div>

          {/* Barra de progreso minimalista */}
          <motion.div 
            className="mt-8 w-48 h-1 bg-slate-800 rounded-full overflow-hidden"
          >
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-orange-500"
            />
          </motion.div>

          <p className="mt-4 text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
            Cargando sistema...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}