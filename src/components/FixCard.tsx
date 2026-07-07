import { useState } from 'react'
import type { Fix } from '../lib/types'

interface Props { fix: Fix; index: number }

const confidenceMeta = {
  high:   { color: 'var(--green)', bg: 'var(--green-bg)', label: '✓ High confidence' },
  medium: { color: 'var(--amber)', bg: 'var(--amber-bg)', label: '~ Medium confidence' },
  low:    { color: 'var(--text-light)', bg: 'var(--surface-2)', label: '? Low confidence' },
}

export default function FixCard({ fix, index }: Props) {
  const [copied, setCopied] = useState(false)
  const meta = confidenceMeta[fix.confidence]

  const copy = () => {
    navigator.clipboard.writeText(fix.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fix-card">
      <div className="fix-header">
        <div className="fix-number">Fix {index + 1}</div>
        <h4 className="fix-title">{fix.title}</h4>
        <span className="confidence-badge" style={{ color: meta.color, background: meta.bg }}>
          {meta.label}
        </span>
      </div>

      <p className="fix-explanation">{fix.explanation}</p>

      <div className="code-block-wrap">
        <div className="code-block-header">
          <span className="code-lang">{fix.language}</span>
          <button className="copy-btn" onClick={copy}>
            {copied ? '✅ Copied' : '📋 Copy'}
          </button>
        </div>
        <pre className="code-block"><code>{fix.code}</code></pre>
      </div>
    </div>
  )
}
