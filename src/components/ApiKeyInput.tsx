import { useState } from 'react'

interface Props {
  value: string
  onChange: (k: string) => void
}

export default function ApiKeyInput({ value, onChange }: Props) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="api-bar">
      <label className="api-label">⚡ Groq API Key</label>
      <div className="api-field">
        <input
          type={visible ? 'text' : 'password'}
          placeholder="Get free key at console.groq.com"
          value={value}
          onChange={e => onChange(e.target.value)}
          spellCheck={false}
        />
        <button type="button" onClick={() => setVisible(v => !v)}>{visible ? '🙈' : '👁'}</button>
      </div>
      <span className="api-hint">Stored in session only — never logged.</span>
    </div>
  )
}
