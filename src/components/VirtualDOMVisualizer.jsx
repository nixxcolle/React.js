import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, RefreshCw, Eye, Sparkles } from 'lucide-react';

const names_list = ["Sarah", "Guest", "developer", "learner", "Alex"];

export default function VirtualDOMVisualizer() {
  const [idx_val, setIdx_val] = useState(0);
  const [vdom_string, setVdom_string] = useState('Greeting: Hello, Alex!');
  const [rdomText, setRdomText] = useState('Greeting: Hello, Alex!');
  const [isVisualizing, setIsVisualizing] = useState(false);
  
  // log array state
  const [logArray, setLogArray] = useState([
    { text: 'Visualizer ready. Click the state update button to begin comparison.', type: 'info' }
  ]);

  const [vdomFlash, setVdomFlash] = useState(false);
  const [rdomFlash, setRdomFlash] = useState(false);
  
  const consolePanelRef = useRef(null);

  useEffect(() => {
    if (consolePanelRef.current) {
      consolePanelRef.current.scrollTop = consolePanelRef.current.scrollHeight;
    }
  }, [logArray]);

  const add_new_log = (txt, logType) => {
    // copy logs and add new one
    let temp = logArray.slice();
    temp.push({ text: txt, type: logType });
    setLogArray(temp);
  };

  const start_vdom_simulation = () => {
    if (isVisualizing) {
      return;
    }
    setIsVisualizing(true);

    let nextName = names_list[idx_val];
    // update current index
    let nextIdx = (idx_val + 1) % names_list.length;
    setIdx_val(nextIdx);

    const targetVal = `Greeting: Hello, ${nextName}!`;

    // step 1: log update
    add_new_log(`App State triggered update: username = "${nextName}"`, 'info');

    // step 2: update virtual dom
    setTimeout(() => {
      setVdom_string(targetVal);
      setVdomFlash(true);
      add_new_log(`Virtual DOM tree constructed. Node <UserGreeting /> updated to "${targetVal}"`, 'info');

      // step 3: run diffing comparison
      setTimeout(() => {
        setVdomFlash(false);
        add_new_log(`Diffing: Virtual DOM compared with snapshot. Detected textual node difference at greeting child.`, 'diff');

        // step 4: reconciliation (re-paint real DOM)
        setTimeout(() => {
          setRdomText(targetVal);
          setRdomFlash(true);
          add_new_log(`Reconciliation: Applied batch update. Modified exactly 1 text node in browser DOM.`, 'paint');

          // step 5: finish
          setTimeout(() => {
            setRdomFlash(false);
            setIsVisualizing(false);
            add_new_log(`Process complete. Browser reflow/repaint minimized.`, 'info');
          }, 800);

        }, 1000);

      }, 1000);

    }, 600);
  };

  return (
    <div className="vdom-widget">
      <div className="widget-header">
        <span className="widget-badge" style={{ backgroundColor: 'var(--color-react-glow)', color: 'var(--color-react)' }}>DOM Comparison Visualizer</span>
        <h3 className="widget-title">How Virtual DOM Diffing Works</h3>
        <p className="widget-desc">Click the trigger button to update the state. Watch how React instantly highlights the Virtual DOM, compares the changes, and applies updates *only* to the changed node in the Real DOM.</p>
      </div>
      
      <div className="vdom-grid">
        <div className="vdom-column">
          <div className="vdom-col-title vdom-title">
            <svg width="16" height="16" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" style={{ animation: 'rotateLogo 20s linear infinite' }}>
              <circle cx="0" cy="0" r="2.05"/>
              <g stroke="currentColor" stroke-width="1" fill="none">
                <ellipse rx="11" ry="4.2"/>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
              </g>
            </svg>
            <span>Virtual DOM</span>
          </div>
          <div className="dom-tree-viz">
            <div className="dom-node v-node">&lt;App /&gt;</div>
            <div className="dom-node v-node">&lt;UserGreeting /&gt;</div>
            <motion.div 
              animate={vdomFlash ? { scale: [1, 1.08, 1], borderColor: 'var(--color-react)' } : {}}
              className={`dom-node v-node ${vdomFlash ? 'flash-blue' : ''}`}
            >
              {vdom_string}
            </motion.div>
          </div>
        </div>
        
        <div className="vdom-column">
          <div className="vdom-col-title rdom-title">
            <Eye className="w-4.5 h-4.5 text-[var(--color-success)] mr-1" />
            <span>Real Browser DOM</span>
          </div>
          <div className="dom-tree-viz">
            <div className="dom-node r-node">&lt;div id="root"&gt;</div>
            <div className="dom-node r-node">&lt;h2 class="greet"&gt;</div>
            <motion.div 
              animate={rdomFlash ? { scale: [1, 1.08, 1], borderColor: 'var(--color-success)' } : {}}
              className={`dom-node r-node ${rdomFlash ? 'flash-green' : ''}`}
            >
              {rdomText}
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="vdom-actions">
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="btn-vdom" 
          onClick={start_vdom_simulation}
          disabled={isVisualizing}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <RefreshCw className={`w-4.5 h-4.5 ${isVisualizing ? 'animate-spin' : ''}`} />
          <span>{isVisualizing ? 'Visualizing...' : 'Simulate State Update'}</span>
        </motion.button>
      </div>
      
      <div className="vdom-log-panel relative" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="absolute top-2 right-3 flex items-center gap-1 text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider">
          <Terminal className="w-3.5 h-3.5" />
          <span>Console Logs</span>
        </div>
        <div ref={consolePanelRef} style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '4px' }}>
          <AnimatePresence>
            {logArray.map((log, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className={`log-entry ${log.type}`}
                style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}
              >
                &gt; {log.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
