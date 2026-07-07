import type { DiagnosisResult } from '../lib/types'

interface Props { result: DiagnosisResult }

export default function DiagnosisCard({ result }: Props) {
  return (
    <div className="section diagnosis-section">
      <div className="diagnosis-header">
        <div className="error-type-badge">{result.error_type}</div>
        <div className="lang-badge">
          {result.detected_language} · {result.detected_framework}
        </div>
      </div>

      <div className="root-cause-box">
        <div className="root-cause-label">🎯 Root Cause</div>
        <p className="root-cause-text">{result.root_cause}</p>
      </div>

      <div className="explanation-box">
        <div className="explanation-label">🔍 Explanation</div>
        <p className="explanation-text">{result.explanation}</p>
      </div>

      <div className="prevention-box">
        <div className="prevention-label">🛡️ Prevention</div>
        <p className="prevention-text">{result.prevention}</p>
      </div>

      {result.docs_links.length > 0 && (
        <div className="docs-row">
          <span className="docs-label">📚 Docs:</span>
          {result.docs_links.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noreferrer" className="doc-link">
              {link.title} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
