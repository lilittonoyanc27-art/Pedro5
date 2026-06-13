import { useState, useEffect, useRef, useMemo } from "react";
import { 
  Volume2, 
  VolumeX, 
  Award, 
  Sparkles, 
  Heart, 
  Play, 
  ArrowRight, 
  BookOpen, 
  MessageSquare, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Compass, 
  Zap, 
  RotateCcw, 
  BrainCircuit,
  BookmarkCheck,
  MapPin,
  Flame,
  Check,
  Send,
  Sparkle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { QUESTS, Question } from "./questions";

// Web Audio API Sound System
function playSound(type: "success" | "fail" | "move" | "fanfare" | "click") {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    
    if (type === "success") {
      // High cheerful Spanish-style arpeggio
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        
        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
        
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.4);
      });
    } else if (type === "fail") {
      // Downward dramatic slide
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.45);
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === "move") {
      // Quick satisfying click/whoosh
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.08);
      
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === "click") {
      // Tiny mechanical click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "fanfare") {
      // Retro triumphant chord march
      const chord = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.1, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
        
        osc.start(now + idx * 0.05);
        osc.stop(now + 1.1);
      });
    }
  } catch (e) {
    console.warn("AudioContext standard blocked by browser browser policy.", e);
  }
}

// señor pedro de ramirez interactive responsive avatar
function SenorPedroAvatar({ expression }: { expression: "neutral" | "happy" | "thinking" | "sad" }) {
  const mustacheClass = 
    expression === "happy" ? "animate-bounce origin-center scale-x-110 translate-y-[-1px] rotate-2" : 
    expression === "sad" ? "translate-y-2.5 scale-y-105 transition-all duration-300" : 
    expression === "thinking" ? "rotate-[-5deg] translate-y-[-1px] translate-x-[-1px] transition-all" : 
    "hover:translate-x-[1px] hover:-rotate-1 transition-all";

  const eyesClass = 
    expression === "happy" ? "translate-y-[-1px] scale-y-90" :
    expression === "sad" ? "translate-y-1 opacity-70" :
    expression === "thinking" ? "translate-y-[-2px] translate-x-[-1px]" : 
    "";

  return (
    <svg viewBox="0 0 160 160" className="w-24 h-24 md:w-32 md:h-32 mx-auto drop-shadow-md select-none">
      {/* Background Yellow Glow */}
      <circle cx="80" cy="80" r="74" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2.5" />
      
      {/* Hair & Sideburns */}
      <circle cx="43" cy="85" r="11" fill="#1F2937" />
      <circle cx="117" cy="85" r="11" fill="#1F2937" />
      <rect x="40" y="80" width="8" height="15" fill="#1F2937" />
      <rect x="112" y="80" width="8" height="15" fill="#1F2937" />

      {/* Ears */}
      <circle cx="41" cy="86" r="6.5" fill="#FDBA74" />
      <circle cx="119" cy="86" r="6.5" fill="#FDBA74" />

      {/* Face Skin */}
      <circle cx="80" cy="87" r="37" fill="#FDBA74" />

      {/* Red sombrerito ribbon and hat */}
      <path d="M 32 60 Q 80 48 128 60 L 122 53 Q 80 38 38 53 Z" fill="#111827" />
      <path d="M 52 51 Q 80 18 108 51 Z" fill="#111827" />
      <path d="M 52 51 Q 80 44 108 51 L 107 48 Q 80 41 53 48 Z" fill="#DC2626" />

      {/* Rosy blush cheeks */}
      <circle cx="55" cy="94" r="7" fill="#F87171" opacity="0.35" />
      <circle cx="105" cy="94" r="7" fill="#F87171" opacity="0.35" />

      {/* Eyes section */}
      <g className={`transition-transform duration-300 ${eyesClass}`}>
        {expression === "happy" ? (
          <>
            <path d="M 56 84 Q 64 76 72 84" stroke="#111827" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <path d="M 88 84 Q 96 76 104 84" stroke="#111827" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          </>
        ) : expression === "sad" ? (
          <>
            <path d="M 56 83 Q 64 89 72 83" stroke="#1F2937" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 88 83 Q 96 89 104 83" stroke="#1F2937" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="68" cy="95" r="3" fill="#60A5FA" className="animate-pulse" />
          </>
        ) : (
          <>
            <circle cx="64" cy="81" r="4" fill="#111827" />
            <circle cx="96" cy="81" r="4" fill="#111827" />
            <circle cx="65" cy="79.5" r="1.2" fill="#FFFFFF" />
            <circle cx="97" cy="79.5" r="1.2" fill="#FFFFFF" />
          </>
        )}
      </g>

      {/* Eyebrows */}
      <g className="transition-all">
        <path d="M 53 73 Q 64 70 73 74" stroke="#111827" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M 87 74 Q 96 70 107 73" stroke="#111827" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      </g>

      {/* Cute orange round nose */}
      <path d="M 76 83 Q 80 91 84 83" stroke="#D97706" strokeWidth="2.5" fill="none" />

      {/* Mouth under mustache */}
      {expression === "happy" ? (
        <path d="M 70 92 Q 80 102 90 92" stroke="#DC2626" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      ) : expression === "sad" ? (
        <path d="M 72 96 Q 80 89 88 96" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M 73 94 Q 80 96 87 94" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}

      {/* MUSTACHE OF SEÑOR PEDRO (Handlebar vintage curves) */}
      <g className={`transition-transform duration-300 ${mustacheClass}`}>
        {/* Left Side */}
        <path d="M 80 92 Q 42 82 36 97 Q 31 106 43 102 Q 58 98 73 95" fill="#111827" stroke="#000000" strokeWidth="1.2" />
        {/* Right Side */}
        <path d="M 80 92 Q 118 82 124 97 Q 129 106 117 102 Q 102 98 87 95" fill="#111827" stroke="#000000" strokeWidth="1.2" />
        {/* Chin patch */}
        <polygon points="76,102 84,102 80,109" fill="#111827" />
      </g>
    </svg>
  );
}// Pedro's Sombrero Vector Illustration for Puzzle Pieces
function MasterPedroHat() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hatGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#78350f" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1e1e24" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      <circle cx="150" cy="150" r="130" fill="url(#hatGlow)" />
      <circle cx="150" cy="150" r="115" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="2" strokeDasharray="6 8" fill="none" />

      {/* Behind background feathers */}
      <path d="M 85 105 C 50 60, 45 30, 75 10 C 85 30, 105 70, 95 110 Z" fill="#b91c1c" opacity="0.9" />
      <path d="M 95 110 Q 70 50 75 10" fill="none" stroke="#fca5a5" strokeWidth="1.5" />

      <path d="M 100 115 C 65 75, 60 45, 90 25 C 100 45, 120 80, 110 120 Z" fill="#ea580c" opacity="0.95" />
      <path d="M 110 120 Q 85 65 90 25" fill="none" stroke="#fed7aa" strokeWidth="1.5" />

      <path d="M 115 125 C 80 85, 75 55, 105 35 C 115 55, 135 90, 125 130 Z" fill="#eab308" opacity="0.95" />
      <path d="M 125 130 Q 100 75 105 35" fill="none" stroke="#fef08a" strokeWidth="1.5" />

      {/* Sombrero High Crown */}
      <path d="M 100 170 Q 150 48 200 170 Z" fill="#0f0f13" />
      <path d="M 105 168 Q 150 50 195 168 Z" fill="#1e1b4b" stroke="#d97706" strokeWidth="3" />
      
      {/* Horizontal decorative luxury gold lines on Crown */}
      <path d="M 120 135 Q 150 115 180 135" fill="none" stroke="#f59e0b" strokeWidth="2" />
      <path d="M 125 115 Q 150 95 175 115" fill="none" stroke="#fbbf24" strokeWidth="2" />
      <path d="M 130 95 Q 150 78 170 95" fill="none" stroke="#fcd34d" strokeWidth="1.5" />

      {/* Sombrero Red Ribbon with high detailed buckle */}
      <path d="M 104 163 Q 150 148 196 163 L 194 172 Q 150 156 106 172 Z" fill="#dc2626" />
      <rect x="142" y="152" width="16" height="15" rx="3" fill="#f59e0b" stroke="#fff" strokeWidth="1" />
      <rect x="146" y="156" width="8" height="7" rx="1" fill="#7f1d1d" />

      {/* Shiny star embroidery sparkle on crown */}
      <path d="M 150 72 L 152 78 L 158 80 L 152 82 L 150 88 L 148 82 L 142 80 L 148 78 Z" fill="#fff" />

      {/* Very Wide Spanish Sombrero Brim */}
      <path d="M 35 195 Q 150 148 265 195 Q 285 205 265 218 Q 150 175 35 218 Q 15 205 35 195 Z" fill="#111827" stroke="#d97706" strokeWidth="4.5" />
      
      {/* Outer Golden Border with dotted fancy details */}
      <path d="M 40 200 Q 150 155 260 200" fill="none" stroke="#fbbf24" strokeWidth="2" />
      <path d="M 42 201 Q 150 156 258 201" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="3 4" opacity="0.8" />
      <path d="M 48 207 Q 150 165 252 207" fill="none" stroke="#ea580c" strokeWidth="1.5" />

      {/* Decorative mini-pom-poms/mustaches charms */}
      <line x1="65" y1="207" x2="65" y2="222" stroke="#fbbf24" strokeWidth="2.5" />
      <circle cx="65" cy="224" r="5" fill="#dc2626" />
      <path d="M 59 229 Q 65 224 71 229" stroke="#fbbf24" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      <line x1="105" y1="211" x2="105" y2="226" stroke="#fbbf24" strokeWidth="2" />
      <circle cx="105" cy="228" r="4" fill="#fbbf24" />
      <path d="M 99 233 Q 105 228 111 233" stroke="#f59e0b" strokeWidth="2" fill="none" strokeLinecap="round" />

      <line x1="195" y1="211" x2="195" y2="226" stroke="#fbbf24" strokeWidth="2" />
      <circle cx="195" cy="228" r="4" fill="#fbbf24" />
      <path d="M 189 233 Q 195 228 201 233" stroke="#f59e0b" strokeWidth="2" fill="none" strokeLinecap="round" />

      <line x1="235" y1="207" x2="235" y2="222" stroke="#fbbf24" strokeWidth="2.5" />
      <circle cx="235" cy="224" r="5" fill="#dc2626" />
      <path d="M 229 229 Q 235 224 241 229" stroke="#fbbf24" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Decorative Elegant Spanish Banner Badge */}
      <rect x="110" y="244" width="80" height="20" rx="6" fill="#121217" stroke="#d97706" strokeWidth="1.5" />
      <text x="150" y="258" fill="#fbbf24" fontSize="10.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SOMBRERO</text>
    </svg>
  );
}

export default function App() {
  // Navigation & Game Modes
  // 'intro' (Main Welcome) | 'guide' (Interactive Reference manual) | 'playing' (Pedro's Hat Puzzle) | 'scorecard' (Results)
  const [mode, setMode] = useState<"intro" | "guide" | "playing" | "scorecard">("intro");
  
  // Game states
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [highestStreak, setHighestStreak] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(3);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<"siesta" | "hidalgo" | "fiesta">("hidalgo");
  
  // Animation/Expression helper for Pedro
  const [pedroExpression, setPedroExpression] = useState<"neutral" | "happy" | "thinking" | "sad">("neutral");
  
  // Interactive 3x3 Puzzle tiles state space
  const [puzzleTiles, setPuzzleTiles] = useState<Array<{
    id: number;
    row: number;
    col: number;
    question: Question;
    solved: boolean;
  }>>([]);
  const [activeTileId, setActiveTileId] = useState<number>(0);

  // Review & scoring feedback states
  const [isReviewPause, setIsReviewPause] = useState<boolean>(false);
  const [lastAttemptType, setLastAttemptType] = useState<"correct" | "incorrect">("correct");

  // Grammar Trainer Sandbox states (The Academy panel)
  const [sandboxSubject, setSandboxSubject] = useState<string>("Yo");
  const [sandboxVerb, setSandboxVerb] = useState<string>("comer");

  // Get active tile state values
  const activeTile = useMemo(() => {
    return puzzleTiles.find(t => t.id === activeTileId) || null;
  }, [puzzleTiles, activeTileId]);

  // Current Active Question values based on active grid cell selection
  const currentQuestion: Question = useMemo(() => {
    return activeTile ? activeTile.question : QUESTS[0];
  }, [activeTile]);

  // Sound play wrapper
  const triggerSound = (type: "success" | "fail" | "move" | "fanfare" | "click") => {
    if (!isMuted) {
      playSound(type);
    }
  };

  // Handle option select check puzzle logic
  const handleSelectOption = (selectedOpt: string) => {
    if (isReviewPause || !activeTile) return;
    
    const isCorrect = selectedOpt === currentQuestion.correctAnswer;
    setIsReviewPause(true);
    
    if (isCorrect) {
      setPuzzleTiles(prev => 
        prev.map(t => t.id === activeTileId ? { ...t, solved: true } : t)
      );
      // Give score bonuses depending on selected difficulty modes!
      const bonusMulti = difficulty === "fiesta" ? 1.5 : difficulty === "siesta" ? 0.8 : 1.0;
      const pointsAdded = Math.round((100 + streak * 10) * bonusMulti);
      setScore(prev => prev + pointsAdded);
      setStreak(prev => {
        const next = prev + 1;
        if (next > highestStreak) setHighestStreak(next);
        return next;
      });
      setPedroExpression("happy");
      setLastAttemptType("correct");
      triggerSound("success");
    } else {
      setHearts(prev => {
        const next = prev - 1;
        if (next <= 0) {
          setPedroExpression("sad");
        } else {
          setPedroExpression("sad");
        }
        return next;
      });
      setStreak(0);
      setLastAttemptType("incorrect");
      triggerSound("fail");
    }
  };

  // Handle proceed next step
  const handleProceedNext = () => {
    triggerSound("click");
    setIsReviewPause(false);
    setPedroExpression("neutral");
    
    if (hearts <= 0) {
      // Out of health!
      setMode("scorecard");
      triggerSound("fanfare");
      return;
    }

    // Check if the puzzle is completely solved!
    const allSolved = puzzleTiles.every(t => t.solved);
    if (allSolved) {
      setMode("scorecard");
      triggerSound("fanfare");
      return;
    }

    // Try finding the next unsolved tile to focus on automatically
    const nextUnsolved = puzzleTiles.find(t => !t.solved);
    if (nextUnsolved) {
      setActiveTileId(nextUnsolved.id);
    } else {
      setMode("scorecard");
      triggerSound("fanfare");
    }
  };

  // Re-start game state machine and configure new random 3x3 puzzle tiles!
  const handleStartGame = () => {
    triggerSound("click");
    setScore(0);
    setStreak(0);
    setHighestStreak(0);
    setHearts(3);
    
    // Pick 9 unique random questions from the QUESTS pool to set up the 3x3 hat pieces
    const shuffledQuestions = [...QUESTS].sort(() => 0.5 - Math.random()).slice(0, 9);
    const newTiles = shuffledQuestions.map((q, idx) => ({
      id: idx,
      row: Math.floor(idx / 3),
      col: idx % 3,
      question: q,
      solved: false
    }));

    setPuzzleTiles(newTiles);
    setActiveTileId(0);
    setIsReviewPause(false);
    setMode("playing");
    setPedroExpression("neutral");
  };

  // Handle grammar builder sandboxing in the manual Guide tab
  const computedSandboxForm = useMemo(() => {
    const haberForms: Record<string, string> = {
      "Yo": "he",
      "Tú": "has",
      "Él/Ella/Usted": "ha",
      "Nosotros": "hemos",
      "Vosotros": "habéis",
      "Ellos/Ellas/Ustedes": "han"
    };
    
    const irregularParticiples: Record<string, string> = {
      "hacer": "hecho",
      "escribir": "escrito",
      "ver": "visto",
      "volver": "vuelto",
      "abrir": "abierto",
      "romper": "roto",
      "decir": "dicho",
      "poner": "puesto",
      "resolver": "resuelto"
    };

    const isIrreg = irregularParticiples[sandboxVerb] !== undefined;
    const participle = irregularParticiples[sandboxVerb] || 
      (sandboxVerb.endsWith("ar") ? sandboxVerb.slice(0, -2) + "ado" : sandboxVerb.slice(0, -2) + "ido");
    
    const aux = haberForms[sandboxSubject];
    return {
      aux,
      participle,
      fullText: `${aux} ${participle}`,
      isIrreg
    };
  }, [sandboxSubject, sandboxVerb]);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#e0e0e0] font-sans flex flex-col antialiased selection:bg-amber-500/20 selection:text-amber-200">
      
      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-[#121217]/95 backdrop-blur-md border-b border-[#2a2a35] px-6 py-4 shadow-2xl shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setMode("intro")}>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-700 rounded-full flex items-center justify-center text-2xl border-2 border-amber-200/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              🇪🇸
            </div>
            <div>
              <h1 className="text-xs font-bold tracking-[0.2em] text-amber-500 uppercase flex items-center gap-1">
                Señor Pedro de Ramirez <Sparkle className="w-3.5 h-3.5 text-amber-400 fill-amber-500/30" />
              </h1>
              <p className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">ARM System v4.2 // Spanish Master</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Realtime Cyber Stats HUD */}
            <div className="hidden md:flex space-x-6 text-[11px] font-mono tracking-widest mr-4">
              <div className="text-green-400"><span className="opacity-50 text-gray-400">SCORE:</span> {score}</div>
              <div className="text-orange-400"><span className="opacity-50 text-gray-400">COMBO:</span> x{streak}</div>
              <div className="text-blue-400"><span className="opacity-50 text-gray-400">RANK:</span> {score >= 1200 ? "CONQUISTADOR" : score >= 700 ? "CABALLERO" : "HIDALGO"}</div>
            </div>

            <button 
              onClick={() => { triggerSound("click"); setIsMuted(!isMuted); }}
              className="p-2.5 rounded-xl bg-[#1a1a24] hover:bg-[#252535] text-gray-400 hover:text-white border border-[#30303f] transition"
              title={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col justify-center relative">
        <AnimatePresence mode="wait">          {/* 1. INTRO / WELCOME VIEW */}
          {mode === "intro" && (
            <motion.div 
              key="intro-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6"
            >
              <div className="lg:col-span-5 text-center lg:text-left flex flex-col justify-center items-center lg:items-start">
                <div className="mb-4">
                  <SenorPedroAvatar expression={pedroExpression} />
                </div>
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-950/40 text-amber-500 font-mono text-[10px] tracking-widest font-bold mb-4 border border-amber-500/30 uppercase">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" /> SEÑOR PEDRO DE RAMIREZ
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4 font-sans">
                  Սանձի՛ր 3D Բեղերը և տիրապետի՛ր Pretérito Perfecto-ին:
                </h1>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
                  Ողջո՛ւյն, բարեկամ: Իմ փառահեղ իսպանական գլխարկը (Sombrero) բաժանվել է 9 թանգարանային մասնիկների: Յուրաքանչյուր մասնիկ պարունակում է **Pretérito Perfecto** (անցյալ ժամանակաձևի) մի հանելուկ: Լուծի՛ր դրանք, հավաքի՛ր իմ գլխարկը և ստացի՛ր ոսկե բեղերի տիտղոս:
                </p>
                
                {/* Control selections */}
                <div className="w-full max-w-sm mb-6 bg-[#121217] p-5 rounded-2xl border border-[#2a2a35] shadow-2xl">
                  <span className="block text-xs font-bold text-gray-400 font-mono uppercase tracking-wider mb-3">ԸՆՏՐԻ՛Ր ԽԱՂԻ ԲԱՐԴՈՒԹՅՈՒՆԸ.</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: "siesta", label: "💤 Սիեստա", color: "border-emerald-500 bg-emerald-950/30 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]" },
                      { key: "hidalgo", label: "🐴 Հիդալգո", color: "border-amber-500 bg-amber-950/30 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.1)]" },
                      { key: "fiesta", label: "🔥 Ֆիեստա!", color: "border-red-500 bg-red-950/30 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.1)]" }
                    ].map(opt => (
                      <button
                        key={opt.key}
                        onClick={() => { triggerSound("click"); setDifficulty(opt.key as any); }}
                        className={`text-xs font-bold py-2.5 px-1 rounded-xl border transition-all ${
                          difficulty === opt.key ? `${opt.color} border-2 scale-102` : "border-[#30303f] bg-[#1a1a24] text-gray-400 hover:border-gray-500 hover:text-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                  <button
                    onClick={handleStartGame}
                    className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 text-white font-bold flex items-center justify-center gap-2 transition duration-300 shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:shadow-[0_0_35px_rgba(245,158,11,0.4)] active:scale-98 cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-white" /> ՍԿՍԵ՛Լ ՓԱԶԼԸ
                  </button>
                  <button
                    onClick={() => { triggerSound("click"); setMode("guide"); }}
                    className="py-4 px-6 rounded-2xl bg-[#1a1a24] hover:bg-[#222232] text-amber-500 font-bold border border-[#30303f] hover:border-amber-500/50 flex items-center justify-center gap-2 transition duration-300 cursor-pointer"
                  >
                    <BookOpen className="w-5 h-5" /> ԲԵՂԵՐԻ ԱԿԱԴԵՄԻԱ
                  </button>
                </div>
              </div>

              {/* Character dialog bubble comic layout */}
              <div className="lg:col-span-7 bg-[#121217] rounded-3xl p-6 md:p-8 border border-[#2a2a35] shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 text-amber-500/5 font-mono text-9xl select-none font-bold">🇪🇸</div>
                
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-amber-500" /> Սենյոր Պեդրոյի համառոտ ելույթը.
                </h3>
                
                <div className="space-y-4 text-gray-300 text-sm">
                  <p className="bg-[#0c0c10] border border-[#2a2a35] p-3.5 rounded-xl italic text-amber-200/90 leading-relaxed shadow-sm">
                    "Pretérito Perfecto-ն արտահայտում է անցյալում կատարված գործողություն, որի ժամանակահատվածը դեռ չի ավարտվել (օրինակ՝ այս առավոտ, այս տարի, վերջերս, հենց այսօր):"
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#1a1a24] p-4 rounded-xl border border-[#30303f]">
                      <span className="block font-bold text-amber-500 text-xs mb-1 font-mono uppercase tracking-wider">1. ՕԺԱՆԴԱԿ ԲԱՅ (HABER):</span>
                      <p className="font-semibold text-gray-200 mb-2 font-sans flex items-center gap-1.5"><Sparkle className="w-3.5 h-3.5 text-amber-500" /> Haber (Օժանդակ բայ)</p>
                      <p className="text-xs font-mono leading-relaxed bg-black/50 p-2.5 rounded-lg border border-[#2a2a35] text-amber-100">
                        Yo <strong>he</strong> | Tú <strong>has</strong> | Él <strong>ha</strong><br />
                        Nosotros <strong>hemos</strong> | Vosotros <strong>habéis</strong> | Ellos <strong>han</strong>
                      </p>
                    </div>

                    <div className="bg-[#1a1a24] p-4 rounded-xl border border-[#30303f]">
                      <span className="block font-bold text-amber-500 text-xs mb-1 font-mono uppercase tracking-wider">2. ԲԱՅԻ ԴԵՐԲԱՅԸ (PARTICIPIO):</span>
                      <p className="font-semibold text-gray-200 mb-2 font-sans flex items-center gap-1.5"><Sparkle className="w-3.5 h-3.5 text-amber-500" /> Բայի հիմք + վերջավորություն</p>
                      <p className="text-xs leading-relaxed bg-black/50 p-2.5 rounded-lg border border-[#2a2a35] font-mono text-gray-300">
                        -AR ➔ <strong className="text-amber-500">-ado</strong> (hablar ➔ hablado)<br />
                        -ER/IR ➔ <strong className="text-amber-500">-ido</strong> (comer ➔ comido)<br />
                        <span className="text-red-400 font-semibold">Անկանոններ:</span> escrito, hecho, visto...
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-amber-950/20 text-amber-400 text-xs rounded-xl border border-amber-500/20 border-dashed leading-relaxed flex items-center gap-3">
                    <span className="text-2xl">🎓</span>
                    <span><strong>Ինչպե՞ս խաղալ.</strong> Կտտացրո՛ւ 3x3 ցանցի վրա գտնվող գլխարկի ցանկացած անավարտ հատվածի վրա, պատասխանի՛ր տրված հարցին և այդ հատվածը կներկվի վառ գույներով:</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. GRAMMAR REFERENCE GUIDE GRID (THE ACADEMIA) */}
          {mode === "guide" && (
            <motion.div 
              key="guide-screen"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="space-y-6 py-4"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#121217] p-6 rounded-2xl border border-[#2a2a35] shadow-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-amber-500" /> Սենյոր Պեդրոյի Քերականական Ակադեմիա
                  </h2>
                  <p className="text-gray-400 text-sm">Կառուցի՛ր կատարյալ խոնարհումը հենց այստեղ և անգիր սովորի՛ր բացառությունները նախքան փազլը սկսելը:</p>
                </div>
                <button
                  onClick={() => { triggerSound("click"); setMode("intro"); }}
                  className="px-4 py-2 bg-[#1a1a24] hover:bg-[#252535] text-gray-300 border border-[#30303f] hover:border-gray-500 rounded-xl font-bold text-sm transition cursor-pointer"
                >
                  Վերադառնալ սկիզբ
                </button>
              </div>

              {/* Interactive Formula Playground (Sandbox) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-[#121217] p-6 rounded-2xl border border-[#2a2a35] shadow-2xl space-y-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-1.5 border-b border-[#2a2a35] pb-3 font-sans">
                    <Zap className="w-5 h-5 text-amber-500" /> Բայերի ինտերակտիվ կոնստրուկտոր
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase font-mono tracking-wider mb-3">ԳՈՐԾՈՂՈՒԹՅԱՆ ԵՆԹԱԿԱՆ (Sujeto):</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Yo (Ես)", "Tú (Դու)", "Él/Ella/Ud (Նա/Դուք)", "Nosotros (Մենք)", "Vosotros (Դուք)", "Ellos/Ellas/Uds (Նրանք)"].map(sub => (
                          <button
                            key={sub}
                            onClick={() => { triggerSound("click"); setSandboxSubject(sub.split(" ")[0]); }}
                            className={`p-2.5 text-xs font-bold rounded-xl border transition duration-200 cursor-pointer ${
                              sandboxSubject === sub.split(" ")[0] 
                                ? "border-amber-500 bg-amber-950/40 text-amber-400 font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)]" 
                                : "border-[#30303f] bg-[#1a1a24] text-gray-400 hover:border-gray-500 hover:text-white"
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase font-mono tracking-wider mb-3">ԲԱՅԻ ԱՆՈՐՈՇ ՁԵՎԸ (Infinitivo):</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { key: "hablar", desc: "Կանոնավոր -AR", color: "" },
                          { key: "comer", desc: "Կանոնավոր -ER", color: "" },
                          { key: "vivir", desc: "Կանոնավոր -IR", color: "" },
                          { key: "hacer", desc: "⚠️ Անկանոն!", color: "text-red-400 font-semibold" },
                          { key: "abrir", desc: "⚠️ Անկանոն!", color: "text-red-400 font-semibold" },
                          { key: "escribir", desc: "⚠️ Անկանոն!", color: "text-red-400 font-semibold" },
                          { key: "ver", desc: "⚠️ Անկանոն!", color: "text-red-400 font-semibold" },
                          { key: "poner", desc: "⚠️ Անկանոն!", color: "text-red-400 font-semibold" },
                          { key: "resolver", desc: "⚠️ Անկանոն!", color: "text-red-400 font-semibold" }
                        ].map(vb => (
                          <button
                            key={vb.key}
                            onClick={() => { triggerSound("click"); setSandboxVerb(vb.key); }}
                            className={`p-2 text-xs rounded-xl border text-center transition duration-200 flex flex-col justify-center items-center cursor-pointer ${
                              sandboxVerb === vb.key 
                                ? "border-amber-500 bg-amber-950/40 text-amber-400 font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)]" 
                                : "border-[#30303f] bg-[#1a1a24] text-gray-400 hover:border-gray-500 hover:text-white"
                            }`}
                          >
                            <span className="font-bold">{vb.key}</span>
                            <span className="text-[9px] text-gray-500 mt-0.5">{vb.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Result Display Card */}
                  <div className="bg-[#0c0c10] p-6 rounded-2xl border-2 border-dashed border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_20px_rgba(245,158,11,0.03)]">
                    <div>
                      <span className="text-xs font-bold text-amber-500 font-mono uppercase tracking-widest block mb-2">ԲԵՂԵՐԻ ԳԵՆԵՐԱՏՈՐԻ ԱՐՏԱԾՈՒՄԸ.</span>
                      <div className="flex items-baseline gap-2 mt-1 flex-wrap">
                        <span className="text-xl md:text-2xl font-extrabold text-gray-200 tracking-tight">
                          {sandboxSubject} <span className="text-amber-400 bg-amber-950/50 px-3 py-1.5 rounded-lg border border-amber-500/30 font-semibold">{computedSandboxForm.aux}</span> <span className="text-white bg-[#1a1a24] shadow-md px-3 py-1.5 rounded-lg border border-[#30303f] font-semibold">{computedSandboxForm.participle}</span>
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#121217] p-4 rounded-xl border border-[#2a2a35] text-xs text-gray-400 max-w-sm w-full">
                      <p className="font-bold text-white mb-1.5 flex items-center gap-1.5">
                        {computedSandboxForm.isIrreg ? (
                          <><span className="text-red-400 font-bold">⚠️ Սա անկանոն բայ է:</span></>
                        ) : (
                          <><span className="text-emerald-400 font-bold">✅ Կատարելապես համապատասխանեցված է, հիանալի՛ բեղ:</span></>
                        )}
                      </p>
                      <p className="leading-relaxed">
                        {computedSandboxForm.isIrreg ? (
                          <span><strong>{sandboxVerb}</strong> բայի դերբայը անկանոն է և չի հետևում կանոնին: Այն խոնարհվում է որպես <strong className="text-amber-400 font-mono font-bold">{computedSandboxForm.participle}</strong>:</span>
                        ) : (
                          <span>Կանոնավոր <strong className="text-gray-200">{sandboxVerb}</strong> բայի համար, որն ավարտվում է {sandboxVerb.endsWith("ar") ? "-ar" : "-er/-ir"}-ով, օգտագործվում է ստանդարտ <strong className="text-amber-400 font-mono font-bold">{sandboxVerb.endsWith("ar") ? "-ado" : "-ido"}</strong> վերջավորությունը:</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Irregulars Table panel */}
                <div className="lg:col-span-4 bg-[#121217] p-5 rounded-2xl border border-[#2a2a35] shadow-2xl space-y-4">
                  <h3 className="text-md font-bold text-white flex items-center gap-2 border-b border-[#2a2a35] pb-3">
                    <Award className="w-5 h-5 text-amber-500" /> Կարևորագույն անկանոն դերբայներ
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Այս դերբայներն օգտագործվում են շատ հաճախ և բացարձակ բացառություններ են: Սովորի՛ր դրանք անգիր.
                  </p>
                  <div className="space-y-2 h-[280px] overflow-y-auto pr-1">
                    {[
                      { inf: "hacer", part: "hecho", mean: "hacer" },
                      { inf: "escribir", part: "escrito", mean: "escribir" },
                      { inf: "ver", part: "visto", mean: "ver" },
                      { inf: "abrir", part: "abierto", mean: "abrir" },
                      { inf: "volver", part: "vuelto", mean: "volver" },
                      { inf: "romper", part: "roto", mean: "romper" },
                      { inf: "decir", part: "dicho", mean: "decir" },
                      { inf: "poner", part: "puesto", mean: "poner" },
                      { inf: "resolver", part: "resuelto", mean: "resolver" },
                      { inf: "morir", part: "muerto", mean: "morir" }
                    ].map(item => (
                      <div key={item.inf} className="flex justify-between items-center text-xs p-2.5 bg-[#1a1a24] rounded-lg border border-[#30303f] hover:border-gray-500 transition duration-150">
                        <span className="font-bold text-gray-300">{item.inf}</span>
                        <span className="font-mono bg-red-950/50 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-md font-semibold text-[11px]">➔ {item.part}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleStartGame}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition text-sm active:scale-97 shadow-[0_0_15px_rgba(245,158,11,0.15)] cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" /> ՍԿՍԵ՛Լ ՓԱԶԼԸ
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. INTERACTIVE GRAMMAR PUZZLE GAME VIEW */}
          {mode === "playing" && (
            <motion.div 
              key="playing-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 py-2"
            >
              {/* Top Stats dashboard HUD */}
              <div className="bg-[#121217] rounded-3xl border border-[#2a2a35] p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="font-mono text-xs text-gray-400">
                    ԲԱՐԴՈՒԹՅՈՒՆ. 
                    <span className="text-amber-500 font-bold ml-1 uppercase">
                      {difficulty === "siesta" ? "Սիեստա" : difficulty === "fiesta" ? "Ֆիեստա" : "Հիդալգո"}
                    </span>
                  </div>
                  {streak > 0 && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-950/50 border border-orange-500/30 text-orange-400 font-bold text-xs animate-pulse">
                      <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-500" />
                      <span>{streak} Շարք!</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-gray-500 block uppercase tracking-wider">ԸՆԹԱՑԻԿ ՄԻԱՎՈՐՆԵՐ</span>
                    <span className="text-xl font-black text-amber-500 font-mono tracking-tight">{score}</span>
                  </div>

                  <div className="flex items-center gap-1 bg-red-950/30 px-3 py-2 rounded-2xl border border-red-500/20 shadow-md">
                    {[1, 2, 3].map(hVal => (
                      <Heart 
                        key={hVal} 
                        className={`w-5 h-5 transition-transform duration-300 ${
                          hVal <= hearts ? "text-red-500 fill-red-500 scale-102" : "text-gray-700 fill-zinc-900"
                        }`} 
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Game Arena Setup */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Column: Señor Pedro Live expression container */}
                <div className="lg:col-span-5 bg-[#121217] rounded-3xl p-6 border border-[#2a2a35] shadow-2xl flex flex-col items-center text-center space-y-4">
                  <SenorPedroAvatar expression={pedroExpression} />
                  
                  <div>
                    <h4 className="text-amber-500 font-bold text-xs font-mono uppercase tracking-widest">
                      ՄԱՐԶԻՉ ՍԵՆՅՈՐ ՊԵԴՐՈ
                    </h4>
                    <h3 className="text-white text-lg font-bold font-sans mt-0.5">
                      Հավաքի՛ր իսպանական գլխարկը
                    </h3>
                  </div>

                  <p className="text-gray-300 text-xs leading-relaxed italic bg-[#0c0c10] border border-[#2a2a35] p-3.5 rounded-xl shadow-inner max-w-sm">
                    "Կտտացրո՛ւ գլխարկի ցանկացած անավարտ հատվածի վրա, լուծի՛ր Pretérito Perfecto-ի քերականական հանելուկը և տես, թե ինչպես է իմ գեղեցիկ գլխարկը լցվում ոսկյա թելերով և փետուրներով:"
                  </p>

                  {/* High quality dynamic progress bar */}
                  <div className="w-full bg-[#1b1b24] p-3.5 rounded-xl border border-[#30303f] space-y-1.5 text-left">
                    <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                      <span>ԳԼԽԱՐԿԻ ԱՎԱՐՏՎԱԾՈՒԹՅՈՒՆ.</span>
                      <span className="text-amber-400 font-bold">
                        {Math.round((puzzleTiles.filter(t => t.solved).length / 9) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-[#0c0c10] h-2 rounded-full overflow-hidden border border-[#2a2a35]">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-orange-600 h-full transition-all duration-500"
                        style={{ width: `${(puzzleTiles.filter(t => t.solved).length / 9) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Pedro's Hat 3x3 Puzzle Interactive Board */}
                <div className="lg:col-span-7 bg-[#121217] rounded-3xl p-6 border border-[#2a2a35] shadow-2xl flex flex-col justify-center items-center space-y-4 relative">
                  <div className="text-center">
                    <h3 className="text-md font-bold text-white flex items-center justify-center gap-1.5 font-sans">
                      <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                      ՊԵԴՐՈ - ՔԵՐԱԿԱՆԱԿԱՆ ՓԱԶԼ
                    </h3>
                    <p className="text-gray-400 text-[10px] font-mono uppercase tracking-wider mt-0.5">
                      ԼՐԱՑՐՈՒ ԲՈԼՈՐ 9 ԲԱԺԻՆՆԵՐԸ՝ ՀԱՂԹԵԼՈՒ ՀԱՄԱՐ
                    </p>
                  </div>

                  {/* 3x3 Interactive Sombrero Grid */}
                  <div className="grid grid-cols-3 gap-3 w-full max-w-[340px] aspect-square bg-[#0c0c10] p-3 rounded-2xl border border-[#2a2a35] shadow-inner relative">
                    {puzzleTiles.map((tile) => {
                      const isActive = tile.id === activeTileId;
                      return (
                        <button
                          key={tile.id}
                          onClick={() => {
                            if (!isReviewPause && !tile.solved) {
                              triggerSound("click");
                              setActiveTileId(tile.id);
                            }
                          }}
                          disabled={isReviewPause || tile.solved}
                          className={`relative aspect-square rounded-lg overflow-hidden border transition-all duration-300 ${
                            tile.solved
                              ? "border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.2)] bg-[#10b981]/5 cursor-default"
                              : isActive
                              ? "border-amber-500 ring-2 ring-amber-500/30 scale-102 z-10 shadow-[0_0_15px_rgba(245,158,11,0.25)] cursor-default"
                              : "border-[#2a2a35] hover:border-gray-500 bg-[#0c0c10] active:scale-95"
                          }`}
                        >
                          {/* Pedro's Hat Clipped rendering */}
                          <div 
                            className={`absolute w-[300%] h-[300%] transition-all duration-500 ${
                              tile.solved 
                                ? "opacity-100 saturate-100" 
                                : "opacity-20 saturate-0 contrast-125"
                            }`}
                            style={{ 
                              left: `-${tile.col * 100}%`, 
                              top: `-${tile.row * 100}%` 
                            }}
                          >
                            <MasterPedroHat />
                          </div>

                          {/* Status Indicators overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            {tile.solved ? (
                              <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 p-1.5 rounded-full shadow-lg animate-bounce">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            ) : isActive ? (
                              <div className="bg-amber-950/80 border border-amber-500/40 text-amber-500 text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded font-black font-sans uppercase tracking-wider animate-pulse shadow-md">
                                ԱԿՏԻՎ
                              </div>
                            ) : (
                              <span className="text-[10px] sm:text-xs font-mono font-bold text-gray-500 select-none bg-black/50 w-5 h-5 rounded-full flex items-center justify-center border border-gray-800">
                                {tile.id + 1}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="text-center py-1 font-mono text-[10px] tracking-widest text-amber-400/80 uppercase">
                    {puzzleTiles.filter(t => t.solved).length} / 9 ԲԱԺԻՆՆԵՐԸ ԿԱՏԱՐՎԱԾ ԵՆ
                  </div>

                </div>
              </div>

              {/* Lower Section: Question Card & Interactive Choices inside playing mode */}
              <div className="bg-[#121217] rounded-3xl border border-[#2a2a35] p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 text-amber-500/5 font-mono text-7xl select-none font-bold">🇪🇸</div>

                {/* Prompt Details */}
                <div className="text-center md:text-left space-y-2 mb-6">
                  <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-md bg-[#1a1a24] text-amber-500 text-xs font-mono font-bold uppercase tracking-wider border border-[#30303f]">
                      Մասնիկ {activeTileId + 1} - Քերականական հանելուկ
                    </span>
                    {currentQuestion.isIrregular && (
                      <span className="px-3 py-1 rounded-md bg-red-950/40 text-red-400 text-xs font-bold uppercase font-mono border border-red-500/30 flex items-center gap-0.5 shadow-lg">
                        ⚠️ ԱՆԿԱՆՈՆ
                      </span>
                    )}
                  </div>

                  {/* Fill in the blank sentence phrase */}
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    {currentQuestion.sentence.split("________")[0]}
                    <span className="text-amber-500 border-b-4 border-amber-500 bg-amber-950/30 px-3 mx-1">________</span>
                    {currentQuestion.sentence.split("________")[1]}
                  </h3>

                  <div className="text-xs text-gray-400 leading-relaxed font-mono">
                    <span className="text-gray-500">Դեմք / Խոնարհում.</span> <strong className="text-amber-500 text-sm font-sans font-bold">{currentQuestion.subject}</strong> + <strong className="text-[#e2e2e2] text-sm font-sans font-bold">{currentQuestion.verb}</strong> <span className="text-gray-600">({currentQuestion.meaning})</span>
                    <p className="text-gray-400 font-sans mt-1 text-[11px] leading-relaxed italic">📝 {currentQuestion.context}</p>
                  </div>
                </div>

                {/* Grid layout of 4 Answer Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {currentQuestion.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(opt)}
                      disabled={isReviewPause}
                      className="p-4 rounded-2xl bg-[#1a1a24] hover:bg-[#222232] text-gray-200 border border-[#30303f] hover:border-amber-500/50 transition duration-300 text-left cursor-pointer active:scale-98 select-none flex items-center justify-between group shadow-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-[#121217] text-amber-500 font-mono text-xs font-bold flex items-center justify-center border border-[#30303f] group-hover:border-amber-500/30">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="font-semibold tracking-wide text-sm">{opt}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-amber-500 transition-colors" />
                    </button>
                  ))}
                </div>

                {/* Review result modal overlay */}
                <AnimatePresence>
                  {isReviewPause && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 bg-[#0a0a0c]/95 backdrop-blur-md flex items-center justify-center p-4 z-20"
                    >
                      <div className="bg-[#0d0d12] border-2 border-[#2a2a35] rounded-3xl p-6 max-w-lg w-full shadow-2xl flex flex-col sm:flex-row gap-6 items-center shadow-[0_0_50px_rgba(0,0,0,0.9)]">
                        <div className="shrink-0">
                          <SenorPedroAvatar expression={pedroExpression} />
                        </div>
                        
                        <div className="space-y-4 flex-1 text-center sm:text-left">
                          <div>
                            {lastAttemptType === "correct" ? (
                              <div className="inline-flex items-center gap-1.5 bg-emerald-950/50 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-950" /> ՃԻՇՏ ՊԱՏԱՍԽԱՆ!
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 bg-red-950/50 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                                <XCircle className="w-3.5 h-3.5 text-red-400 fill-red-950" /> ՍԽԱԼ ՊԱՏԱՍԽԱՆ!
                              </div>
                            )}

                            <h4 className="text-xl font-black text-white mt-1.5 font-sans">
                              {lastAttemptType === "correct" ? "Գերազա՛նց է, բարեկամ:" : "Սայթաքեցի՛նք անցյալի դաշտերում:"}
                            </h4>
                          </div>

                          <p className="text-xs text-gray-300 leading-relaxed bg-[#121217] border border-[#2a2a35] p-3.5 rounded-xl shadow-inner italic">
                            {currentQuestion.explanation}
                          </p>

                          <div className="text-gray-400 font-mono text-[11px] tracking-wide">
                            Ճիշտ ձևը. <span className="font-sans font-bold text-amber-400 text-base">{currentQuestion.correctAnswer}</span>
                          </div>

                          <button
                            onClick={handleProceedNext}
                            className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold rounded-2xl flex items-center justify-center gap-1.5 transition text-sm shadow-[0_0_20px_rgba(244,63,94,0.1)] active:scale-97 cursor-pointer"
                          >
                            <span>ՇԱՐՈՒՆԱԿԵԼ ՓԱԶԼԸ</span> <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          )}

          {/* 4. VICTORY / GAMEOVER SCOREBOARD STATS SHOWCASE */}
          {mode === "scorecard" && (
            <motion.div 
              key="scorecard-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto py-6"
            >
              <div className="bg-[#121217] rounded-3xl p-8 border border-[#2a2a35] shadow-2xl text-center space-y-6 relative overflow-hidden">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl opacity-30" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl opacity-30" />
 
                <div className="relative">
                  <SenorPedroAvatar expression={hearts > 0 ? "happy" : "sad"} />
                </div>
 
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold tracking-widest text-amber-500 uppercase bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/30">
                    ԽԱՂՆ ԱՎԱՐՏՎԵՑ
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    {hearts > 0 ? "Փառահե՛ղ է, Սենյո՛ր:" : "Քո բեղերն ընթացքում թուլացան:"}
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base max-w-sm mx-auto">
                    {hearts > 0 
                      ? "Դու հաջողությամբ հավաքեցիր Պեդրոյի Գլխարկը և դարձար Pretérito Perfecto-ի գրոսմայստեր!" 
                      : "Դու սպառեցիր քո բոլոր կյանքերը, բայց բեղերդ չեն հանձնվում: Փորձի՛ր կրկին:"}
                  </p>
                </div>
 
                {/* Score Stats strip Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#111115] p-5 rounded-2xl border border-[#30303f]">
                  <div className="space-y-1">
                    <span className="text-xxs font-mono text-gray-400 block uppercase tracking-wider">Ընդհանուր միավորներ.</span>
                    <span className="text-2xl font-black text-amber-500 font-mono">{score}</span>
                  </div>
 
                  <div className="space-y-1">
                    <span className="text-xxs font-mono text-gray-400 block uppercase tracking-wider">Մաքսիմում Կոմբո.</span>
                    <span className="text-2xl font-black text-amber-500 font-mono">{highestStreak}</span>
                  </div>
 
                  <div className="space-y-1">
                    <span className="text-xxs font-mono text-gray-400 block uppercase tracking-wider">Բարդություն:</span>
                    <span className="text-sm font-black text-white font-sans uppercase mt-1 block">
                      {difficulty === "siesta" ? "Սիեստա" : difficulty === "fiesta" ? "Ֆիեստա" : "Հիդալգո"}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xxs font-mono text-gray-400 block uppercase tracking-wider">Բեղերի տիտղոս:</span>
                    <span className="text-sm font-black text-amber-400 font-sans uppercase mt-1 block">
                      {score >= 800 ? "Ոսկե բեղ" : score >= 500 ? "Կաբալյերո" : "Սիեստադոր"}
                    </span>
                  </div>
                </div>

                {/* Correct Answers tracker details listing */}
                <div className="bg-[#0c0c10] p-4.5 rounded-xl border border-amber-500/20 border-dashed text-left space-y-3.5">
                  <h4 className="text-xs font-bold font-mono tracking-widest text-amber-500 uppercase flex items-center gap-1.5 border-b border-[#2a2a35] pb-2">
                    <BookmarkCheck className="w-4 h-4" /> Կատարված վերլուծություն.
                  </h4>
                  <div className="text-xs text-gray-300 leading-relaxed space-y-1.5 font-sans">
                    <p>✓ <strong>Pretérito Perfecto</strong>-ն միշտ կազմվում է <strong className="text-white">haber</strong> օժանդակ բայով + <strong className="text-white">դերբայով (-ado / -ido)</strong>:</p>
                    <p>✓ Անկանոն բայերն ունեն հաստատուն և անփոփոխ դերբայներ, որոնք դու հաջողությամբ հավաքեցիր փազլի տախտակում:</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleStartGame}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-400 hover:to-orange-600 text-white font-bold flex items-center justify-center gap-2 transition duration-300 shadow-[0_0_20px_rgba(245,158,11,0.25)] active:scale-97 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" /> ԽԱՂԱԼ ՆՈՐԻՑ
                  </button>
                  <button
                    onClick={() => { triggerSound("click"); setMode("intro"); }}
                    className="py-3.5 px-6 rounded-2xl bg-[#1a1a24] hover:bg-[#252535] text-amber-500 font-bold border border-[#30303f] transition duration-300 text-sm flex items-center justify-center cursor-pointer"
                  >
                    Վերադառնալ գլխավոր էկրան
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 py-6 px-4 font-mono text-center text-[11px] border-t border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 Սենյոր Պեդրո Ռամիրեսի Ակադեմիա: Տիրապետի՛ր իսպաներենի Pretérito Perfecto-ին:</p>
          <div className="flex gap-4">
            <span className="text-yellow-500 font-bold">100% OFFLINE PERSISTENCE 3D ENGINE</span>
            <span>|</span>
            <span>GEMINI POWERED SPANISH LEARNING</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
