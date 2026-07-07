import { useEffect } from 'react'
import { detectFramework, FRAMEWORK_LABELS } from '../lib/detectLanguage'
import type { Framework } from '../lib/types'

const FRAMEWORKS = Object.entries(FRAMEWORK_LABELS) as [Framework, string][]

const EXAMPLES: Record<string, string> = {
  react: `TypeError: Cannot read properties of undefined (reading 'map')
    at ProductList (ProductList.tsx:24:18)
    at renderWithHooks (react-dom.development.js:14985:18)
    at mountIndeterminateComponent (react-dom.development.js:17811:13)`,
  python: `Traceback (most recent call last):
  File "app.py", line 42, in get_user
    return db.query(User).filter(User.id == user_id).first().name
AttributeError: 'NoneType' object has no attribute 'name'`,
  dotnet: `System.NullReferenceException: Object reference not set to an instance of an object.
   at MyApp.Services.OrderService.ProcessOrder(Order order) in /src/Services/OrderService.cs:line 87
   at MyApp.Controllers.OrderController.Submit(OrderRequest request) in /src/Controllers/OrderController.cs:line 34`,
}

interface Props {
  stackTrace: string
  codeContext: string
  framework: Framework
  onStackTrace: (v: string) => void
  onCodeContext: (v: string) => void
  onFramework: (v: Framework) => void
}

export default function ErrorInput({
  stackTrace, codeContext, framework,
  onStackTrace, onCodeContext, onFramework
}: Props) {

  // Auto-detect language as user types
  useEffect(() => {
    if (stackTrace.length > 30) {
      const detected = detectFramework(stackTrace)
      if (detected !== 'unknown') onFramework(detected)
    }
  }, [stackTrace])

  const loadExample = (key: string) => {
    onStackTrace(EXAMPLES[key])
    onFramework(detectFramework(EXAMPLES[key]))
  }

  return (
    <div className="input-cards">
      {/* Stack trace */}
      <div className="card">
        <div className="card-header">
          <h2>🐛 Stack Trace / Error</h2>
          <div className="example-row">
            <span className="example-label">Try:</span>
            {Object.keys(EXAMPLES).map(k => (
              <button key={k} className="example-btn" onClick={() => loadExample(k)}>
                {k}
              </button>
            ))}
          </div>
        </div>
        <textarea
          className="text-area"
          rows={10}
          placeholder={`Paste your full error message and stack trace here…\n\nExample:\nTypeError: Cannot read properties of undefined (reading 'map')\n    at ProductList (ProductList.tsx:24:18)`}
          value={stackTrace}
          onChange={e => onStackTrace(e.target.value)}
          spellCheck={false}
        />
      </div>

      {/* Code context + framework */}
      <div className="side-col">
        <div className="card">
          <div className="card-header">
            <h2>📋 Code Context <span className="optional-tag">optional</span></h2>
          </div>
          <textarea
            className="text-area"
            rows={5}
            placeholder="Paste the relevant code snippet where the error occurs — helps AI give more specific fixes…"
            value={codeContext}
            onChange={e => onCodeContext(e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="card">
          <div className="card-header">
            <h2>⚙️ Framework</h2>
          </div>
          <select
            className="framework-select"
            value={framework}
            onChange={e => onFramework(e.target.value as Framework)}
          >
            {FRAMEWORKS.map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
          <p className="select-hint">Auto-detected from your stack trace. Override if needed.</p>
        </div>
      </div>
    </div>
  )
}
