
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Info } from 'lucide-react';
import { Puzzle } from '../data/puzzles';

interface PuzzleCardProps {
  puzzle: Puzzle;
  currentIndex: number;
  total: number;
  onAnswer: (index: number) => void;
}

export default function PuzzleCard({ puzzle, currentIndex, total, onAnswer }: PuzzleCardProps) {
  const [showHint, setShowHint] = useState(false);

  // Reset hint when puzzle changes
  useEffect(() => {
    setShowHint(false);
  }, [puzzle.id]);
  return (
    <motion.div 
      key={puzzle.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {/* Level Info Card */}
      <div className="bg-bento-card border border-bento-border rounded-2xl p-6 flex flex-col justify-between shadow-xl">
        <div>
          <span className={`px-2 py-1 text-[10px] font-bold rounded border uppercase ${
            puzzle.difficulty === 'Mudah' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
            puzzle.difficulty === 'Menengah' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
            'bg-rose-500/10 text-rose-400 border-rose-500/20'
          }`}>
            {puzzle.difficulty}
          </span>
          <h2 className="text-2xl font-bold mt-4 leading-tight">{puzzle.title}</h2>
          <p className="text-bento-muted text-sm mt-3 leading-relaxed">
            {puzzle.question}
          </p>
        </div>
        
        <div className="mt-8 space-y-3">
          <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider">
            <span>Progress Misi</span>
            <span>{currentIndex + 1} / {total}</span>
          </div>
          <div className="w-full bg-bento-border/30 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-bento-accent h-full transition-all duration-500" 
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Code Area */}
      <div className="md:col-span-2 bg-bento-code border border-bento-border rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        <div className="bg-bento-card/50 px-4 py-2 border-b border-bento-border flex items-center justify-between">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40"></div>
          </div>
          <span className="text-[10px] font-mono text-bento-muted uppercase">solution.cpp</span>
        </div>
        <div className="flex-grow p-8 font-mono text-base md:text-lg overflow-auto">
          <pre className="text-emerald-400/90 leading-relaxed code-font">
            <code>
              {puzzle.code.split('\n').map((line, i) => (
                <div key={i} className="flex gap-6 group">
                  <span className="text-bento-muted/30 select-none text-right w-4">{i + 1}</span>
                  <span>{line}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>

      {/* Options Grid */}
      <div className="md:col-span-1 bg-bento-card border border-bento-border rounded-2xl p-6 shadow-xl">
        <h3 className="text-[10px] font-bold text-bento-muted uppercase tracking-[0.2em] mb-6">Pilih Output</h3>
        <div className="grid grid-cols-2 gap-3">
          {puzzle.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onAnswer(idx)}
              className="bg-bento-border/10 hover:bg-bento-accent hover:text-white border border-bento-border/50 py-5 rounded-xl font-mono text-xl transition-all active:scale-95 group relative overflow-hidden"
            >
               <span className="absolute top-2 left-2 text-[8px] opacity-30 group-hover:opacity-100">{String.fromCharCode(65 + idx)}</span>
               {option}
            </button>
          ))}
        </div>
      </div>

      {/* Logic for Hint and Instructions */}
      <div className="md:col-span-2 space-y-4">
        {/* Instructions/Hint Panel */}
        <div className="bg-[#161b22]/40 border border-bento-border rounded-2xl p-6 relative overflow-hidden transition-all">
          <div className="flex items-center gap-6 relative z-10">
            <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${showHint ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-bento-accent/10 border-bento-accent/20 text-bento-accent'}`}>
              {showHint ? <Lightbulb className="w-6 h-6" /> : <Info className="w-6 h-6" />}
            </div>
            <div className="flex-grow">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">
                {showHint ? 'Modul Petunjuk' : 'Instruksi Eksekusi'}
              </h4>
              <AnimatePresence mode="wait">
                <motion.p 
                  key={showHint ? 'hint' : 'instr'}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-bento-muted text-xs mt-1 leading-relaxed"
                >
                  {showHint 
                    ? puzzle.hint 
                    : "Bacalah potongan kode di atas dengan teliti. Perhatikan prioritas operator, scope variabel, dan tipe data yang digunakan untuk menentukan hasil akhir yang akan dicetak di konsol."
                  }
                </motion.p>
              </AnimatePresence>
            </div>
            <button
              onClick={() => setShowHint(!showHint)}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${
                showHint 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500/20' 
                  : 'bg-white/5 border-bento-border text-bento-muted hover:border-bento-accent hover:text-white'
              }`}
            >
              {showHint ? 'Sembunyikan' : 'Beri Petunjuk'}
            </button>
          </div>
          
          {showHint && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-amber-500/5 pointer-events-none"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
