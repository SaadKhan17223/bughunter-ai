export type Framework =
  | 'javascript' | 'typescript' | 'react' | 'nextjs' | 'nodejs'
  | 'python' | 'django' | 'fastapi'
  | 'dotnet' | 'csharp'
  | 'java' | 'spring'
  | 'go' | 'rust'
  | 'unknown'

export interface Fix {
  rank: number
  title: string
  explanation: string
  code?: string
  language: string
}

export interface DocLink {
  label: string
  url: string
}

export interface BugAnalysis {
  errorType: string
  framework: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  rootCause: string
  whyItHappened: string
  fixes: Fix[]
  docsLinks: DocLink[]
  preventionTip: string
}

export interface HistoryItem {
  id: string
  timestamp: number
  errorSnippet: string
  errorType: string
  framework: string
  analysis: BugAnalysis
}

export type AppStep = 'input' | 'analyzing' | 'results'
