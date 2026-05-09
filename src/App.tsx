/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { puzzles, Difficulty, Category, Puzzle } from './data/puzzles';
import LevelSelect from './components/LevelSelect';
import PuzzleCard from './components/PuzzleCard';
import Results from './components/Results';
import { Code2 } from 'lucide-react';

type GameState = 'SELECT' | 'PLAYING' | 'RESULTS';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('SELECT');
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const filteredPuzzles = useMemo(() => {
    if (!difficulty || !category) return [];
    return puzzles.filter(p => p.difficulty === difficulty && p.category === category);
  }, [difficulty, category]);

  const handleLevelSelect = (cat: Category, diff: Difficulty) => {
    setCategory(cat);
    setDifficulty(diff);
    setCurrentIndex(0);
    setUserAnswers([]);
    setGameState('PLAYING');
  };

  const handleAnswer = (answerIdx: number) => {
    const newAnswers = [...userAnswers, answerIdx];
    setUserAnswers(newAnswers);

    if (currentIndex + 1 < filteredPuzzles.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setGameState('RESULTS');
    }
  };

  const handleRestart = () => {
    setGameState('SELECT');
    setDifficulty(null);
    setCategory(null);
    setCurrentIndex(0);
    setUserAnswers([]);
  };

  return (
    <div className="min-h-screen selection:bg-bento-accent/30 flex flex-col bg-bento-bg text-slate-200">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-end border-b border-bento-border/50">
        <div>
          <button 
            onClick={handleRestart}
            className="text-3xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            C++ <span className="text-bento-accent">LogicMaster</span>
          </button>
          <p className="text-bento-muted text-sm mt-1">Asah logika coding kamu dengan tantangan interaktif</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-bento-card/50 px-4 py-2 rounded-lg border border-bento-border">
            <span className="text-[10px] uppercase tracking-widest text-bento-muted block font-bold">Quest Mode</span>
            <span className="text-lg font-mono text-bento-accent leading-none">
              {gameState === 'SELECT' ? 'Idle' : gameState === 'PLAYING' ? 'Active' : 'Completed'}
            </span>
          </div>
          <div className="bg-bento-card/50 px-4 py-2 rounded-lg border border-bento-border">
            <span className="text-[10px] uppercase tracking-widest text-bento-muted block font-bold">Category</span>
            <span className="text-lg font-mono text-orange-400 leading-none">{category || 'None'}</span>
          </div>
        </div>
      </header>

      <main className="flex-grow p-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          {gameState === 'SELECT' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="h-full py-12"
            >
              <LevelSelect onSelect={handleLevelSelect} />
            </motion.div>
          )}

          {gameState === 'PLAYING' && filteredPuzzles.length > 0 && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full"
            >
              <PuzzleCard 
                puzzle={filteredPuzzles[currentIndex]}
                currentIndex={currentIndex}
                total={filteredPuzzles.length}
                onAnswer={handleAnswer}
              />
            </motion.div>
          )}

          {gameState === 'RESULTS' && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <Results 
                puzzles={filteredPuzzles}
                answers={userAnswers}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 flex justify-between items-center text-[10px] text-bento-muted border-t border-bento-border/50 uppercase tracking-widest font-mono">
        <div className="flex gap-6">
          <span>Language: <strong>Bahasa Indonesia</strong></span>
          <span>Status: <strong>System Ready</strong></span>
        </div>
        <div>
          © 2024 C++ LogicMaster • Build 1.0.4
        </div>
      </footer>
    </div>
  );
}

