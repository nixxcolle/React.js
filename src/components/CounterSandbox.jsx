import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, RotateCcw, Copy, Check } from 'lucide-react';

export default function CounterSandbox() {
  const [numberCount, setNumberCount] = useState(0);
  const [flashingState, setFlashingState] = useState(false);
  const [copied_status, setCopied_status] = useState(false);

  useEffect(() => {
    // flash the border when the number changes
    if (numberCount === 0) {
      if (!flashingState) {
        return;
      }
    }
    setFlashingState(true);
    const timer = setTimeout(() => {
      setFlashingState(false)
    }, 500);
    return () => clearTimeout(timer);
  }, [numberCount]);

  const copy_code_to_clipboard = () => {
    const codeText = `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(${numberCount});

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className="counter">
      <h2>Interactive Counter</h2>
      <p>Count: <strong>{count}</strong></p>
      <button onClick={increment}>Click Me!</button>
    </div>
  );
}`;

    navigator.clipboard.writeText(codeText).then(() => {
      setCopied_status(true);
      setTimeout(() => {
        setCopied_status(false)
      }, 1500);
    });
  };

  // set the colors for borders/text based on copy state
  let copyColor = ""
  if (copied_status) {
    copyColor = 'var(--color-success)'
  }

  return (
    <div className="sandbox-widget">
      <div className="widget-header">
        <span className="widget-badge" style={{ backgroundColor: 'var(--color-react-glow)', color: 'var(--color-react)' }}>Interactive Sandbox</span>
        <h3 className="widget-title">Live React State Sandbox</h3>
        <p className="widget-desc">Click the preview controls to update the component's state. Watch the state values and markup change dynamically inside the corresponding JSX code.</p>
      </div>
      
      <div className="sandbox-layout">
        {/* Preview Screen */}
        <div className="sandbox-preview">
          <div className="preview-badge">Component UI Preview</div>
          
          <AnimatePresence mode="popLayout">
            <motion.div 
              key={numberCount}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="counter-value"
            >
              {numberCount}
            </motion.div>
          </AnimatePresence>

          <div className="counter-controls">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-counter" 
              onClick={function() { setNumberCount(numberCount - 1) }}
              aria-label="Decrement"
            >
              <Minus className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-counter btn-reset" 
              onClick={() => { setNumberCount(0) }}
              aria-label="Reset"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              <span>Reset</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-counter" 
              onClick={() => setNumberCount(numberCount + 1)}
              aria-label="Increment"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
        
        {/* Dynamic Code Block */}
        <div className="sandbox-code">
          <div className="code-header">
            <span className="code-lang">Counter.jsx</span>
            <button 
              className="btn-copy" 
              onClick={copy_code_to_clipboard}
              style={{
                borderColor: copyColor,
                color: copyColor
              }}
            >
              {copied_status ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
              {copied_status ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre style={{ padding: '1.25rem', overflowX: 'auto', margin: 0 }}>
            <code>
{`import React, { useState } from 'react';

function Counter() {
  // Hook initializes state variable at `}
<span className={`token number ${flashingState ? 'flash-highlight' : ''}`}>{numberCount}</span>
{`
  const [count, setCount] = `}
<span className={`token function ${flashingState ? 'flash-highlight' : ''}`}>useState({numberCount})</span>
{`;

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className="counter">
      <h2>Interactive Counter</h2>
      <p>Count: <strong>`}
<span className={`token number ${flashingState ? 'flash-highlight' : ''}`}>{numberCount}</span>
{`</strong></p>
      <button onClick={increment}>Click Me!</button>
    </div>
  );
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
