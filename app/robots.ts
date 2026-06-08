import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://growthcompta.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Crawlers classiques
      { userAgent: '*', allow: '/' },
      // OpenAI — ChatGPT Search + entraînement GPT
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      // Anthropic — Claude
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      // Perplexity
      { userAgent: 'PerplexityBot', allow: '/' },
      // Google — AI Overviews + Gemini
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      // Microsoft — Bing + Copilot
      { userAgent: 'Bingbot', allow: '/' },
      // Common Crawl (base d'entraînement de nombreux LLMs)
      { userAgent: 'CCBot', allow: '/' },
      // Meta — Llama / Meta AI
      { userAgent: 'FacebookBot', allow: '/' },
      // Cohere
      { userAgent: 'cohere-ai', allow: '/' },
      // ByteDance (TikTok AI)
      { userAgent: 'Bytespider', allow: '/' },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
