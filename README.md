# 🐛 BugHunter AI

> Stop staring at stack traces. Paste any error from JS, Python, .NET, Java, Go or Rust — get the root cause, a plain-English explanation, and ranked fixes with working code snippets in seconds.

[![Live Demo](https://img.shields.io/badge/Live-Demo-purple)](https://your-vercel-url.vercel.app)
[![React](https://img.shields.io/badge/React-18-blue)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)]()
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3_70B-orange)]()

---

## Features

- 🎯 **Root Cause Analysis** — direct answer to what caused the error, not generic advice
- 🔍 **Plain English Explanation** — why it happened, what concept is behind it
- 🔧 **Ranked Fixes** — 3 approaches with working code snippets, ranked by simplicity
- ⚙️ **Auto Framework Detection** — detects JS, TS, React, Next.js, Node, Python, Django, FastAPI, .NET, Java, Go, Rust from the stack trace
- 📚 **Docs Links** — relevant official documentation linked per error
- 💡 **Prevention Tip** — how to avoid this class of error in future
- 🕐 **Scan History** — last 8 analyzed errors saved locally for quick reference
- 🔒 Privacy-first — API key stored in session only, nothing logged

## Tech Stack

- React 18 + TypeScript + Vite
- Groq API (LLaMA 3.3 70B) — free tier
- Zero external UI dependencies
- Deployed on Vercel

## Running Locally

git clone https://github.com/YOUR_USERNAME/bughunter-ai
cd bughunter-ai
npm install
npm run dev

Get a free Groq API key at https://console.groq.com

## Supported Languages & Frameworks

| Language | Frameworks |
|----------|-----------|
| JavaScript / TypeScript | React, Next.js, Node.js |
| Python | Django, FastAPI, plain Python |
| C# | .NET / ASP.NET |
| Java | Spring, plain Java |
| Go | plain Go |
| Rust | plain Rust |
