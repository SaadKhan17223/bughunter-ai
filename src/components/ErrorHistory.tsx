import type { HistoryItem } from '../lib/types'

interface Props {
  history: HistoryItem[]
  onSelect: (item: HistoryItem) => void
  onClear: () => void
}

export default function ErrorHistory({ history, onSelect, onClear }: Props) {
  if (history.length === 0) return null

  return (
    <div className="history-section">
      <div className="history-header">
        <span className="history-title">🕐 Recent Scans</span>
        <button className="link-btn" onClick={onClear}>Clear</button>
      </div>
      <div className="history-list">
        {history.map(item => (
          <button key={item.id} className="history-item" onClick={() => onSelect(item)}>
            <span className="history-error-type">{item.errorType}</span>
            <span className="history-framework">{item.framework}</span>
            <span className="history-snippet">{item.errorSnippet}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
