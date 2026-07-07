import type { BugAnalysis } from '../lib/types'

const severityMeta = {
  critical: { color: '#ef4444', bg: '#2d1515', label: '🔴 Critical', desc: 'App crash / data loss' },
  high:     { color: '#f97316', bg: '#2d1a00', label: '🟠 High',     desc: 'Feature broken'       },
  medium:   { color: '#f59e0b', bg: '#2d2000', label: '🟡 Medium',   desc: 'Degraded behaviour'   },
  low:      { color: '#22c55e', bg: '#052e16', label: '🟢 Low',      desc: 'Minor / cosmetic'      },
}

interface Props { analysis: BugAnalysis }

export default function RootCause({ analysis }: Props) {
  const sev = severityMeta[analysis.severity]

  return (
    <div className="section">
      <div className="root-header">
        <div className="error-type-row">
          <span className="error-type-badge">{analysis.errorType}</span>
          <span className="framework-badge">{analysis.framework}</span>
          <span className="severity-badge" style={{ color: sev.color, background: sev.bg }}>
            {sev.label} — {sev.desc}
          </span>
        </div>
      </div>

      <div className="root-cause-box">
        <div className="root-cause-label">🎯 Root Cause</div>
        <p className="root-cause-text">{analysis.rootCause}</p>
      </div>

      <div className="why-box">
        <div className="why-label">🔍 Why It Happened</div>
        <p className="why-text">{analysis.whyItHappened}</p>
      </div>

      {analysis.preventionTip && (
        <div className="prevention-box">
          <span>💡 Prevention: </span>{analysis.preventionTip}
        </div>
      )}
    </div>
  )
}
