
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Puzzle } from '../data/puzzles';

interface ResultsProps {
  puzzles: Puzzle[];
  answers: number[];
  onRestart: () => void;
}

export default function Results({ puzzles, answers, onRestart }: ResultsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const correctCount = answers.reduce((acc, current, idx) => {
    return current === puzzles[idx].correctAnswer ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((correctCount / puzzles.length) * 100);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        <div className="md:col-span-2 bento-card p-10 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">Analisis <span className="text-bento-accent">Sistem Selesai</span></h1>
          <p className="text-bento-muted text-lg max-w-md">
            Simulasi logika telah berakhir. Skor Anda: <span className="text-white font-bold">{puzzles.length} soal, {correctCount} benar.</span>
          </p>
          <button
            onClick={onRestart}
            className="mt-8 flex items-center gap-3 px-8 py-3 bg-white text-bento-bg rounded-xl font-bold hover:bg-slate-200 transition-all uppercase tracking-wider text-sm shadow-xl shadow-white/5"
          >
            <RotateCcw className="w-4 h-4" />
            Coba Lagi
          </button>
        </div>

        <div className="bento-card p-10 flex flex-col items-center justify-center bg-bento-accent/10 border-bento-accent/30 relative overflow-hidden group">
          <div className="absolute inset-0 bg-bento-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 text-center">
            <div className="text-6xl font-bold text-white mb-2">{percentage}%</div>
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-bento-accent font-bold">Accuracy</div>
            <div className="mt-6 text-bento-muted text-sm italic">
              {correctCount} / {puzzles.length} Skor Akhir
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex justify-between items-center mb-6 border-b border-bento-border/50 pb-2">
        <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-bento-muted flex items-center gap-4 flex-grow">
          <span className="shrink-0">Koreksi & Penjelasan</span>
          <div className="h-px w-full bg-bento-border/50" />
        </h3>
        <span className="text-[9px] font-mono text-bento-accent animate-pulse whitespace-nowrap ml-4">
          KLIK UNTUK DETAIL ↓
        </span>
      </div>
      
      <div className="space-y-4">
        {puzzles.map((puzzle, idx) => {
          const isCorrect = answers[idx] === puzzle.correctAnswer;
          const isExpanded = expandedIndex === idx;

          return (
            <div 
              key={puzzle.id}
              className={`bento-card overflow-hidden transition-all duration-300 ${
                isCorrect ? 'border-emerald-500/30' : 'border-rose-500/30'
              } ${isExpanded ? 'ring-2 ring-white/10' : ''}`}
            >
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="w-full flex items-center justify-between p-6 bg-bento-card hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                    isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-mono text-bento-muted uppercase tracking-widest mb-0.5">Level: {puzzle.difficulty}</div>
                    <div className="font-bold text-lg text-white">{puzzle.title}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`hidden sm:inline text-xs font-mono font-bold ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {isCorrect ? 'BENAR' : 'SALAH'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-bento-muted" /> : <ChevronDown className="w-5 h-5 text-bento-muted" />}
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 pt-0 space-y-6 text-sm border-t border-bento-border/50">
                      <div className="mt-6">
                        <span className="text-bento-muted block mb-3 uppercase text-[10px] font-bold tracking-widest">Analisis Kode:</span>
                        <div className="rounded-xl overflow-hidden border border-bento-border bg-bento-code">
                          <pre className="p-6 text-emerald-400/80 overflow-x-auto code-font">
                            <code>{puzzle.code}</code>
                          </pre>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 rounded-xl bg-bento-bg/50 border border-bento-border">
                          <span className="text-bento-muted block mb-1 uppercase text-[10px] font-bold">Kunci Jawaban:</span>
                          <span className="text-emerald-400 font-mono font-bold text-lg">{puzzle.options[puzzle.correctAnswer]}</span>
                        </div>
                        <div className={`p-4 rounded-xl border ${isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
                          <span className="text-bento-muted block mb-1 uppercase text-[10px] font-bold">Jawaban Anda:</span>
                          <span className={`font-mono font-bold text-lg ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>{puzzle.options[answers[idx]]}</span>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl bg-bento-accent/5 border border-bento-accent/20">
                        <h4 className="text-bento-accent font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3" />
                          Penjelasan Detail ({puzzle.difficulty})
                        </h4>
                        <p className="text-slate-300 leading-relaxed italic text-base whitespace-pre-line">
                          {puzzle.explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
