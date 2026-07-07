import type { Framework } from './types'

export function detectFramework(stackTrace: string): Framework {
  const t = stackTrace.toLowerCase()

  if (t.includes('at object.<anonymous>') || t.includes('.tsx:') || t.includes('react-dom'))
    return 'react'
  if (t.includes('next/dist') || t.includes('next-server'))
    return 'nextjs'
  if (t.includes('node:') || t.includes('node_modules') || t.includes('at process.'))
    return 'nodejs'
  if (t.includes('.ts:') || t.includes('typescript'))
    return 'typescript'
  if (t.includes('.js:'))
    return 'javascript'
  if (t.includes('traceback (most recent call last)') || t.includes('.py", line'))
    return 'python'
  if (t.includes('django') || t.includes('wsgi'))
    return 'django'
  if (t.includes('fastapi') || t.includes('uvicorn'))
    return 'fastapi'
  if (t.includes('system.') || t.includes('microsoft.') || t.includes('--- end of inner exception'))
    return 'dotnet'
  if (t.includes('at com.') || t.includes('caused by:') || t.includes('java.'))
    return 'java'
  if (t.includes('goroutine') || t.includes('.go:'))
    return 'go'
  if (t.includes('rust') || t.includes('panicked at'))
    return 'rust'

  return 'unknown'
}

export const FRAMEWORK_LABELS: Record<Framework, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  react: 'React',
  nextjs: 'Next.js',
  nodejs: 'Node.js',
  python: 'Python',
  django: 'Django',
  fastapi: 'FastAPI',
  dotnet: '.NET / C#',
  csharp: 'C#',
  java: 'Java',
  spring: 'Spring',
  go: 'Go',
  rust: 'Rust',
  unknown: 'Auto-detect',
}
