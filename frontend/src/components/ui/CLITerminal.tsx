import React, { useState, useEffect, useRef } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useNavigate } from 'react-router-dom';
import { Terminal, X } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error';
}

const helpText = `Available commands:
  whoami        - Display identity profile details
  ls            - List portfolio directory routes
  neofetch      - Render system statistics & ASCII banner
  cat resume    - Open resume PDF in a new window
  open <route>  - Navigate (e.g. open projects, open blog)
  clear         - Clear console screen buffer
  help          - List all command keywords
  exit          - Close this CLI session`;

const whoamiText = `Geetika Vasistha (geekykunoichi)
----------------------------------
Role: AI Engineer & Data Scientist
Focus: Machine Learning Systems, Spatial Data Pipelines, Quadrupeds CV
Socials:
  - Github: github.com/geetikavasistha-01
  - LinkedIn: linkedin.com/in/geetikavasisthampy`;

const asciiArt = `   /\\_/\\
  ( o.o )   geekykunoichi
   > ^ <    -------------
            OS: GV_OS v2.6.0
            Host: SRM Incubator Laptop
            Uptime: 2026 hours
            Kernel: DataScience-Hybrid
            Shell: zsh-kunoichi
            Stack: Python, FastAPI, ML, Go`;

export default function CLITerminal() {
  const { cliOpen, setCliOpen } = useUIStore();
  const navigate = useNavigate();
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'GV_OS (v2.6) Command Console. Type "help" for a list of targets.', type: 'output' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Global key listener to trigger CLI
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if the user is typing inside an input/textarea
      const active = document.activeElement;
      const isInput = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || (active as HTMLElement).isContentEditable);
      
      if (isInput) return;

      if (e.key === '/' || e.key === '>') {
        e.preventDefault();
        setCliOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCliOpen]);

  // Focus input when opened
  useEffect(() => {
    if (cliOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [cliOpen]);

  // Scroll to bottom on history change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    const args = cleanCmd.split(' ');
    const base = args[0];

    const lines: TerminalLine[] = [{ text: `geekykunoichi ~ $ ${cmdStr}`, type: 'input' }];

    switch (base) {
      case '':
        break;
      case 'help':
        lines.push({ text: helpText, type: 'output' });
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        setCliOpen(false);
        return;
      case 'whoami':
        lines.push({ text: whoamiText, type: 'output' });
        break;
      case 'neofetch':
        lines.push({ text: asciiArt, type: 'output' });
        break;
      case 'ls':
        lines.push({ text: "portfolio/\n├── home/\n├── work/\n├── about/\n├── projects/\n└── blog/", type: 'output' });
        break;
      case 'cat':
        if (args[1] === 'resume') {
          window.open('https://cloudinary.com', '_blank');
          lines.push({ text: 'Opening resume PDF...', type: 'output' });
        } else {
          lines.push({ text: `Usage: cat resume`, type: 'error' });
        }
        break;
      case 'open':
        const target = args[1];
        if (!target) {
          lines.push({ text: 'Usage: open <page_name> (e.g. open projects, open work)', type: 'error' });
        } else if (['projects', 'work', 'about', 'blog', 'shelf', 'ama', 'contact'].includes(target)) {
          navigate(target === 'home' ? '/' : `/${target}`);
          setCliOpen(false);
        } else {
          lines.push({ text: `Target directory "/${target}" not found.`, type: 'error' });
        }
        break;
      default:
        lines.push({ text: `shell: command not found: ${base}. Type "help" for instructions.`, type: 'error' });
        break;
    }

    setHistory((prev) => [...prev, ...lines]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(inputValue);
    setInputValue('');
  };

  if (!cliOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 select-none">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={() => setCliOpen(false)} />

      {/* Terminal Window */}
      <div className="relative bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 w-full max-w-[560px] shadow-2xl flex flex-col h-[380px] z-10 text-green-400 font-mono text-[12px] sm:text-xs">
        {/* Terminal Header */}
        <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-4 select-none">
          <div className="flex items-center gap-2 text-zinc-400">
            <Terminal size={14} />
            <span>GV_OS Terminal</span>
          </div>
          <button
            onClick={() => setCliOpen(false)}
            className="text-zinc-500 hover:text-zinc-300 p-1 rounded-md transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Console logs */}
        <div ref={containerRef} className="flex-1 overflow-y-auto pr-2 space-y-2.5 leading-relaxed select-text">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={
                line.type === 'input'
                  ? 'text-zinc-200'
                  : line.type === 'error'
                  ? 'text-rose-400'
                  : 'text-green-400 whitespace-pre-wrap'
              }
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Input prompt */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4 pt-3 border-t border-zinc-900">
          <span className="text-zinc-400">geekykunoichi ~ $</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-transparent border-none outline-none text-zinc-200 w-full font-mono text-xs"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
