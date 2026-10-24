import { Sparkles } from "lucide-react";
import { HeroCard } from "../HeroCard";
export function AiCard() {
  return (
    <HeroCard id="ai" title="AI assistant">
      <div className="hero-chat-user">Optimize this query</div>
      <div className="hero-typing">
        <Sparkles />
        <span data-loop />
        <span data-loop />
        <span data-loop />
      </div>
      <div className="hero-chat-reply">
        Added an index on <code>user_id</code>. <strong>4x faster.</strong>
      </div>
    </HeroCard>
  );
}
