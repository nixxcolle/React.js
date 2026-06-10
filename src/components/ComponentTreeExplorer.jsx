import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Layers } from 'lucide-react';

export default function ComponentTreeExplorer() {
  const [nameVal, setNameVal] = useState('Alex');
  const [flash_flag, setFlash_flag] = useState(false);

  useEffect(() => {
    // flash target node when state changes
    setFlash_flag(true);
    const timer = setTimeout(() => {
      setFlash_flag(false)
    }, 600);
    return () => clearTimeout(timer);
  }, [nameVal]);

  const preset_clicked_handler = (chosen_name) => {
    setNameVal(chosen_name);
  };

  // build buttons with map but junior-ish callback
  const quickNames = ['Alex', 'Sarah', 'Guest'];
  const nameButtons = [];
  for (let i = 0; i < quickNames.length; i = i + 1) {
    let n = quickNames[i];
    nameButtons.push(
      <button 
        key={n}
        className={`btn-control ${nameVal === n ? 'active' : ''}`}
        onClick={() => preset_clicked_handler(n)}
      >
        {n}
      </button>
    );
  }

  return (
    <div className="component-explorer-widget">
      <div className="widget-header">
        <span className="widget-badge" style={{ backgroundColor: 'var(--color-purple-glow)', color: 'var(--color-purple)' }}>Interactive Demo</span>
        <h3 className="widget-title">Visualizing Component Hierarchy & Props</h3>
        <p className="widget-desc">Change the Parent State below to see how data flows downward to child components as "Props", triggering a targeted re-render of only the affected nodes.</p>
      </div>
      
      <div className="explorer-content">
        <div className="explorer-controls">
          <div className="control-group">
            <label className="control-label" htmlFor="username-input">Parent State (username)</label>
            <input 
              type="text" 
              id="username-input" 
              className="control-input" 
              value={nameVal}
              onChange={(e) => setNameVal(e.target.value)}
              placeholder="Enter username..."
            />
          </div>
          <div className="control-group">
            <label className="control-label">Quick Presets</label>
            <div className="btn-group">
              {nameButtons}
            </div>
          </div>
          <div className="text-xs text-[var(--text-muted)] mt-2 border-l-2 border-[var(--border-color)] pl-3 leading-relaxed">
            <span className="text-[var(--text-primary)] font-semibold">Live Update:</span> The <span className="font-mono text-[var(--color-react)]">App</span> component's local state is passed down to <span className="font-mono text-purple-400">UserGreeting</span>. The static component remains untouched.
          </div>
        </div>
        
        <div className="tree-container">
          {/* Visual Component Tree */}
          <motion.div 
            animate={flash_flag ? { scale: [1, 1.04, 1] } : {}}
            transition={{ duration: 0.4 }}
            className={`tree-node ${flash_flag ? 'highlight-pulse' : ''}`} 
            id="node-app"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
          >
            <div className="tree-node-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>App Component</span>
            </div>
            <div className="tree-node-info">state: username = "{nameVal}"</div>
          </motion.div>
          
          <div className={`tree-branch ${flash_flag ? 'active' : ''}`} id="branch-1"></div>
          
          <div className="tree-children">
            <motion.div 
              animate={flash_flag ? { scale: [1, 1.05, 1], y: [0, -3, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`tree-node ${flash_flag ? 'highlight-pulse' : ''}`} 
              id="node-greeting"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
            >
              <div className="tree-node-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span>UserGreeting</span>
              </div>
              <div className="tree-node-info" id="node-greeting-props">props: username = "{nameVal}"</div>
            </motion.div>
            
            <div className="tree-node" id="node-counter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', opacity: 0.85 }}>
              <div className="tree-node-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Cpu className="w-3.5 h-3.5 text-slate-400" />
                <span>CounterComponent</span>
              </div>
              <div className="tree-node-info">props: None</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
