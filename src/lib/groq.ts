import Groq from 'groq-sdk'
import type { BugAnalysis } from './types'

export async function analyzeStackTrace(
  groqApiKey: string,
  stackTrace: string,
  codeContext: string,
  framework: string
): Promise<BugAnalysis> {
  const client = new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true })

  const analysisPrompt = `
You are a senior software engineer and debugging expert with 15+ years of experience across all major frameworks and languages.

Analyze the error below and return ONLY valid JSON — no markdown, no code fences, no extra text.

DETECTED FRAMEWORK: ${framework}

ERROR / STACK TRACE:
${stackTrace}

${codeContext ? `RELEVANT CODE CONTEXT:\n${codeContext}` : ''}

Return this exact JSON structure:
{
  "errorType": "<specific error class name, e.g. TypeError, NullReferenceException, KeyError>",
  "framework": "<detected or confirmed framework/language>",
  "severity": "critical" | "high" | "medium" | "low",
  "rootCause": "<1-2 sentence direct answer: exactly what caused this error>",
  "whyItHappened": "<3-5 sentence explanation of the underlying reason — explain the concept, not just the symptom. Be specific to this error, not generic.>",
  "fixes": [
    {
      "rank": 1,
      "title": "<short fix title>",
      "explanation": "<2-3 sentences explaining this fix and why it works>",
      "code": "<working code snippet that demonstrates the fix — must be specific to this error, not pseudocode>",
      "language": "<language for syntax highlight: javascript | typescript | python | csharp | java | go | bash>"
    },
    {
      "rank": 2,
      "title": "<alternative fix title>",
      "explanation": "<explanation>",
      "code": "<code snippet>",
      "language": "<language>"
    },
    {
      "rank": 3,
      "title": "<third approach if applicable>",
      "explanation": "<explanation>",
      "code": "<code snippet or empty string if not applicable>",
      "language": "<language>"
    }
  ],
  "docsLinks": [
    { "label": "<doc page name>", "url": "<real, valid documentation URL>" }
  ],
  "preventionTip": "<1 sentence — how to prevent this class of error in future code>"
}

Rules:
- rootCause must be specific to THIS error, not a generic description
- code snippets must be real working code, not pseudocode or placeholders
- docsLinks must be real URLs (MDN, official docs, etc) — max 3 links
- severity: critical = app crashes/data loss, high = feature broken, medium = degraded, low = cosmetic
- Return ONLY the JSON
`.trim()

  const completion = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user' as const, content: analysisPrompt }],
    max_tokens: 3000,
    temperature: 0.2,
  })

  const raw = completion.choices[0]?.message?.content?.trim() ?? ''
  const cleaned = raw.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim()

  try {
    return JSON.parse(cleaned) as BugAnalysis
  } catch {
    throw new Error('Analysis failed to parse. Please try again.')
  }
}
