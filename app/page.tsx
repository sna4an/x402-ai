export default function Home() {
  return (
    <main>
      <div className="hero">
        <svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a855f7"/>
              <stop offset="100%" stopColor="#6366f1"/>
            </linearGradient>
          </defs>
          <rect width="80" height="80" rx="16" fill="url(#g)"/>
          <text x="40" y="55" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#fff">AI</text>
        </svg>
        <h1>x402 AI APIs</h1>
        <p>Access cutting-edge AI models and tools. Pay per request with USDC micropayments.</p>
      </div>
      <div className="grid">
        <div className="card"><h3>/api/safevision</h3><p>Host: safevision</p><p className="price">$0.075</p></div>
        <div className="card"><h3>/api/discord-shield</h3><p>Host: kordhub-discord-webhook-shield-formatter</p><p className="price">$0.050</p></div>
        <div className="card"><h3>/api/json-repair</h3><p>Host: kordhub-ai-json-repair-formatter</p><p className="price">$0.050</p></div>
        <div className="card"><h3>/api/lodestar-price</h3><p>Host: lodestar-ai-price</p><p className="price">$0.100</p></div>
        <div className="card"><h3>/api/gpt5</h3><p>Host: gpt-5-5</p><p className="price">$0.150</p></div>
        <div className="card"><h3>/api/copilot</h3><p>Host: copilot11</p><p className="price">$0.125</p></div>
        <div className="card"><h3>/api/alt-text</h3><p>Host: ai-image-alt-text-generator</p><p className="price">$0.075</p></div>
        <div className="card"><h3>/api/edge-tts</h3><p>Host: streamlined-edge-tts</p><p className="price">$0.075</p></div>
        <div className="card"><h3>/api/gemini</h3><p>Host: gemini-ai-all-models</p><p className="price">$0.125</p></div>
        <div className="card"><h3>/api/claude</h3><p>Host: claude-ai-all-models</p><p className="price">$0.150</p></div>
        <div className="card"><h3>/api/xai</h3><p>Host: xai-all-models</p><p className="price">$0.125</p></div>
        <div className="card"><h3>/api/pokemon-auth</h3><p>Host: pokemon-card-authenticator-ai2</p><p className="price">$0.100</p></div>
      </div>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0a0a; color: #e5e5e5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        main { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .hero { text-align: center; padding: 4rem 2rem; }
        .logo { width: 80px; height: 80px; margin-bottom: 1.5rem; }
        .hero h1 { font-size: 3rem; background: linear-gradient(135deg, #a855f7, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; color: #999; max-width: 600px; margin: 0 auto; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
        .card { background: #141414; border: 1px solid #262626; border-radius: 12px; padding: 1.5rem; transition: border-color 0.2s; }
        .card:hover { border-color: #a855f7; }
        .card h3 { color: #a855f7; font-size: 1.1rem; margin-bottom: 0.5rem; }
        .card p { color: #888; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .card .price { color: #22c55e; font-weight: bold; font-size: 1rem; }
      `}</style>
    </main>
  );
}
