export interface DetectedContext {
  language: string
  framework: string
  icon: string
}

const patterns: Array<{ test: RegExp; language: string; framework: string; icon: string }> = [
  // .NET / C#
  { test: /at\s+[\w.]+\s+in\s+.*\.cs|System\.|Microsoft\.|\.NET|NullReferenceException|StackOverflowException|ArgumentException/i, language: 'C#', framework: '.NET', icon: '💜' },
  // Python
  { test: /Traceback \(most recent call last\)|File ".*\.py"|\.py", line \d+|ImportError|AttributeError|IndentationError/i, language: 'Python', framework: 'Python', icon: '🐍' },
  // Django
  { test: /django\.|Django|WSGI|wsgi|urlpatterns/i, language: 'Python', framework: 'Django', icon: '🟢' },
  // FastAPI
  { test: /fastapi\.|uvicorn\.|starlette\./i, language: 'Python', framework: 'FastAPI', icon: '⚡' },
  // React
  { test: /react-dom|ReactDOM|React\.createElement|useEffect|useState|at React\.|\.jsx|\.tsx/i, language: 'TypeScript/JSX', framework: 'React', icon: '⚛️' },
  // Next.js
  { test: /next\/|NextJS|getServerSideProps|getStaticProps|_app\.js/i, language: 'TypeScript', framework: 'Next.js', icon: '▲' },
  // Node.js
  { test: /at Object\.<anonymous>|node:internal|node_modules|\.js:\d+:\d+|UnhandledPromiseRejection/i, language: 'JavaScript', framework: 'Node.js', icon: '🟩' },
  // Java
  { test: /at\s+[\w.]+\.java:\d+|java\.lang\.|NullPointerException|ClassNotFoundException|java\.io\./i, language: 'Java', framework: 'Java', icon: '☕' },
  // Spring
  { test: /org\.springframework\.|BeanCreationException|DispatcherServlet/i, language: 'Java', framework: 'Spring', icon: '🍃' },
  // Go
  { test: /goroutine \d+|panic:|\.go:\d+|runtime error/i, language: 'Go', framework: 'Go', icon: '🐹' },
  // Rust
  { test: /thread '.*' panicked at|\.rs:\d+|rust_begin_unwind/i, language: 'Rust', framework: 'Rust', icon: '🦀' },
  // PHP / Laravel
  { test: /laravel\.|Illuminate\\|\.php line \d+|PHP Fatal error/i, language: 'PHP', framework: 'Laravel', icon: '🔴' },
  // TypeScript generic
  { test: /\.ts:\d+:\d+|TypeScript|TS\d{4}|Cannot find type|Type '.*' is not assignable/i, language: 'TypeScript', framework: 'TypeScript', icon: '🔷' },
  // SQL
  { test: /SQL|syntax error|ORA-\d+|SQLSTATE|relation ".*" does not exist/i, language: 'SQL', framework: 'Database', icon: '🗄️' },
]

export function detectContext(stackTrace: string): DetectedContext {
  for (const p of patterns) {
    if (p.test.test(stackTrace)) {
      return { language: p.language, framework: p.framework, icon: p.icon }
    }
  }
  return { language: 'Unknown', framework: 'Unknown', icon: '🔍' }
}
