import { useState } from 'react'
import type { Fix, DocLink } from '../lib/types'

interface Props {
  fixes: Fix[]
  docsLinks: DocLink[]
}

export default function FixSuggestions({ fixes, docsLinks }: Props) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [copied, setCopied] = useState(false)

  const active = fixes[activeIdx]

  const copy = () => {
    if (!active?.code) return
    navigator.clipboard.writeText(active.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="section">
      <h3 className="section-title">🔧 Fixes</h3>

      {/* Fix tabs */}
      <div className="fix-tabs">
        {fixes.map((fix, i) => (
          <button
            key={i}
            className={`fix-tab ${activeIdx === i ? 'active' : ''}`}
            onClick={() => setActiveIdx(i)}
          >
            <span className="fix-rank">#{fix.rank}</span>
            <span className="fix-tab-title">{fix.title}</span>
          </button>
        ))}
      </div>

      {/* Active fix detail */}
      {active && (
        <div className="fix-detail">
          <p className="fix-explanation">{active.explanation}</p>

          {active.code && (
            <div className="code-block-wrap">
              <div className="code-block-header">
                <span className="code-lang">{active.language}</span>
                <button className="copy-btn" onClick={copy}>
                  {copied ? '✅ Copied' : '📋 Copy'}
                </button>
              </div>
              <pre className="code-block"><code>{active.code}</code></pre>
            </div>
          )}
        </div>
      )}

      {/* Docs */}
      {docsLinks.length > 0 && (
        <div className="docs-row">
          <span className="docs-label">📚 Docs:</span>
          {docsLinks.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noreferrer" className="doc-link">
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
