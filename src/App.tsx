import { useState } from 'react'
import ApiKeyInput from './components/ApiKeyInput'
import ErrorInput from './components/ErrorInput'
import RootCause from './components/RootCause'
import FixSuggestions from './components/FixSuggestions'
import ErrorHistory from './components/ErrorHistory'
import { analyzeStackTrace } from './lib/groq'
import { detectFramework } from './lib/detectLanguage'
import type { BugAnalysis, AppStep, HistoryItem, Framework } from './lib/types'

export default function App() {
  const [apiKey, setApiKey]         = useState(() => sessionStorage.getItem('groq_key') ?? '')
  const [stackTrace, setStackTrace] = useState('')
  const [codeContext, setCodeContext] = useState('')
  const [framework, setFramework]   = useState<Framework>('unknown')
  const [step, setStep]             = useState<AppStep>('input')
  const [result, setResult]         = useState<BugAnalysis | null>(null)
  const [error, setError]           = useState<string | null>(null)
  const [history, setHistory]       = useState<HistoryItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('bughunter_history') ?? '[]') } catch { return [] }
  })

  const handleApiKey = (k: string) => { setApiKey(k); sessionStorage.setItem('groq_key', k) }

  const canAnalyze = apiKey.trim() && stackTrace.trim().length > 20

  const analyze = async () => {
    setError(null)
    setStep('analyzing')
    try {
      const fw = framework === 'unknown' ? detectFramework(stackTrace) : framework
      const analysis = await analyzeStackTrace(apiKey, stackTrace, codeContext, fw)
      setResult(analysis)

      // Save to history
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        errorSnippet: stackTrace.split('\n')[0].slice(0, 80),
        errorType: analysis.errorType,
        framework: analysis.framework,
        analysis,
      }
      const updated = [newItem, ...history].slice(0, 8)
      setHistory(updated)
      localStorage.setItem('bughunter_history', JSON.stringify(updated))

      setStep('results')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Analysis failed. Please try again.')
      setStep('input')
    }
  }

  const reset = () => {
    setStep('input')
    setResult(null)
    setError(null)
    setStackTrace('')
    setCodeContext('')
    setFramework('unknown')
  }

  const loadFromHistory = (item: HistoryItem) => {
    setResult(item.analysis)
    setStackTrace(item.errorSnippet)
    setStep('results')
  }

  // ─── Analyzing ────────────────────────────────────────────────────────────
  if (step === 'analyzing') return (
    <div className="app">
      <header className="app-header">
        <div className="logo">Bug<span>Hunter</span> AI</div>
      </header>
      <div className="analyzing-screen">
        <div className="bug-anim">🐛</div>
        <h2>Hunting the bug…</h2>
        <p>Groq LLaMA is analyzing your stack trace…</p>
        <div className="analyzing-steps">
          <span>Detecting error type…</span>
          <span>Finding root cause…</span>
          <span>Generating fixes…</span>
        </div>
      </div>
    </div>
  )

  // ─── Results ─────────────────────────────────────────────────────────────
  if (step === 'results' && result) return (
    <div className="app">
      <header className="app-header">
        <div className="logo">Bug<span>Hunter</span> AI</div>
        <button className="btn-secondary" onClick={reset}>← New Debug</button>
      </header>
      <main className="results-main">
        <RootCause analysis={result} />
        <FixSuggestions fixes={result.fixes} docsLinks={result.docsLinks} />
        <div className="results-footer">
          <button className="btn-secondary" onClick={reset}>← Debug Another Error</button>
        </div>
      </main>
    </div>
  )

  // ─── Input ────────────────────────────────────────────────────────────────
  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">Bug<span>Hunter</span> AI</div>
      </header>
      <main className="input-main">
        <div className="hero">
          <div className="hero-badge">AI-Powered Debugger</div>
          <h1>Stop staring at stack traces.</h1>
          <p>Paste any error from JS, Python, .NET, Java, Go or Rust. Get the root cause, a plain-English explanation, and ranked fixes with code — in seconds.</p>
        </div>

        <ApiKeyInput value={apiKey} onChange={handleApiKey} />

        {error && <div className="error-banner">⚠ {error}</div>}

        <ErrorInput
          stackTrace={stackTrace}
          codeContext={codeContext}
          framework={framework}
          onStackTrace={setStackTrace}
          onCodeContext={setCodeContext}
          onFramework={setFramework}
        />

        <button
          className="btn-primary"
          disabled={!canAnalyze}
          onClick={analyze}
        >
          {canAnalyze ? '🔍 Find Root Cause' : 'Add your Groq key and paste a stack trace above'}
        </button>

        <ErrorHistory
          history={history}
          onSelect={loadFromHistory}
          onClear={() => { setHistory([]); localStorage.removeItem('bughunter_history') }}
        />
      </main>

      <footer className="app-footer">
        <p>Built with Groq LLaMA 3.3 70B · Supports JS, Python, .NET, Java, Go, Rust · Free · Open source</p>
        <a href="https://console.groq.com" target="_blank" rel="noreferrer">Get free Groq API key →</a>
      </footer>
    </div>
  )
}
