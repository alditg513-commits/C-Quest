
import { motion } from 'motion/react';
import { Terminal, Cpu, Database, Wifi, Zap, CircuitBoard } from 'lucide-react';
import { Difficulty, Category } from '../data/puzzles';

interface LevelSelectProps {
  onSelect: (category: Category, difficulty: Difficulty) => void;
}

export default function LevelSelect({ onSelect }: LevelSelectProps) {
  const levels: { type: Difficulty; icon: any; desc: string; color: string; accent: string }[] = [
    { 
      type: 'Mudah', 
      icon: Terminal, 
      desc: 'Konsep dasar, output, dan logika simpel.', 
      color: 'border-emerald-500/20 bg-emerald-500/5',
      accent: 'text-emerald-400'
    },
    { 
      type: 'Menengah', 
      icon: Cpu, 
      desc: 'Pointer, referensi, dan struktur data STL.', 
      color: 'border-bento-accent/20 bg-bento-accent/5',
      accent: 'text-bento-accent'
    },
    { 
      type: 'Sulit', 
      icon: Database, 
      desc: 'Memori, template, dan konsep OOP tingkat lanjut.', 
      color: 'border-rose-500/20 bg-rose-500/5',
      accent: 'text-rose-400'
    }
  ];

  const iotLevels: { type: Difficulty; icon: any; desc: string; color: string; accent: string }[] = [
    { 
      type: 'Mudah', 
      icon: Zap, 
      desc: 'Setup GPIO, digital write, dan dasar perkabelan.', 
      color: 'border-amber-500/20 bg-amber-500/5',
      accent: 'text-amber-400'
    },
    { 
      type: 'Menengah', 
      icon: Wifi, 
      desc: 'Sensor analog, PWM, dan konektivitas dasar.', 
      color: 'border-sky-500/20 bg-sky-500/5',
      accent: 'text-sky-400'
    },
    { 
      type: 'Sulit', 
      icon: CircuitBoard, 
      desc: 'Protokol I2C, SPI, Interrupts, dan optimasi daya.', 
      color: 'border-purple-500/20 bg-purple-500/5',
      accent: 'text-purple-400'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 w-full space-y-24">
      {/* General Section */}
      <section>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter text-white">
            SISTEM <span className="text-bento-accent">TERDEFRAGMENTASI</span>
          </h2>
          <p className="text-bento-muted text-lg max-w-2xl mx-auto">
            Pilih modul simulasi untuk memulai pengujian logika C++. Setiap modul berisi kumpulan teka-teki teknis yang dirancang untuk mengasah ketajaman debugging Anda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map((level, idx) => (
            <motion.button
              key={`gen-${level.type}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onSelect('General', level.type)}
              className={`flex flex-col p-8 border rounded-3xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-left group relative overflow-hidden ${level.color} border-bento-border hover:border-bento-accent/50 shadow-2xl`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <level.icon className="w-24 h-24 -mr-8 -mt-8 rotate-12" />
              </div>
              
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-bento-border bg-bento-bg group-hover:border-bento-accent transition-colors ${level.accent}`}>
                <level.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white">{level.type}</h3>
              <p className="text-sm text-bento-muted leading-relaxed mb-8">{level.desc}</p>
              
              <div className="mt-auto flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-white group-hover:text-bento-accent transition-colors">
                Muat Modul <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* IoT Section */}
      <section>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold tracking-[0.2em] uppercase">
            Expansion Pack
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter text-white">
            C++ UNTUK <span className="text-orange-500">IOT (PERKABELAN)</span>
          </h2>
          <p className="text-bento-muted text-lg max-w-2xl mx-auto">
            Masuki dunia perangkat keras. Tantangan logika C++ yang difokuskan pada manipulasi pin, sensor, dan protokol komunikasi mikrokontroler.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {iotLevels.map((level, idx) => (
            <motion.button
              key={`iot-${level.type}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onSelect('IoT', level.type)}
              className={`flex flex-col p-8 border rounded-3xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-left group relative overflow-hidden ${level.color} border-bento-border hover:border-orange-500/50 shadow-2xl`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <level.icon className="w-24 h-24 -mr-8 -mt-8 rotate-12" />
              </div>
              
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-bento-border bg-bento-bg group-hover:border-orange-500 transition-colors ${level.accent}`}>
                <level.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white">{level.type}</h3>
              <p className="text-sm text-bento-muted leading-relaxed mb-8">{level.desc}</p>
              
              <div className="mt-auto flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-white group-hover:text-orange-500 transition-colors">
                Muat Modul IoT <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}
