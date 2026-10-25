# React Bits sources

Upstream: https://github.com/DavidHDev/react-bits
Commit: e12c22192ac7b4b452c5e2feb9b586d74765d696

- Ferrofluid.tsx and Ferrofluid.css: src/ts-default/Backgrounds/Ferrofluid. Settings are committed in an effect and reduced-motion/paused scenes stop scheduling animation frames.
- BlurText.tsx: a focused adaptation of src/ts-default/TextAnimations/BlurText, using the upstream word blur/translate reveal with semantic inline output and an explicit reduced-motion final state.

The accompanying upstream license applies to these components.

Additional adaptation: report WebGL readiness/failure so the surrounding section can retain a static vector fallback on unsupported or lost contexts.
