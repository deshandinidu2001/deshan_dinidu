# React Bits sources

Upstream: https://github.com/DavidHDev/react-bits
Commit: e12c22192ac7b4b452c5e2feb9b586d74765d696

- GradientASCII.tsx and GradientASCII.css: src/ts-default/Backgrounds/GradientASCII, fetched from the official GradientASCII-TS-CSS registry. Adapted with a text-mask texture for the name, hover erasure, pause control and renderer status. Settings are committed in an effect; paused/reduced-motion scenes stop scheduling frames. The Canvas2D fallback preserves the glyph silhouette and pointer interaction without requiring WebGL.
- BlurText.tsx: a focused adaptation of src/ts-default/TextAnimations/BlurText, using the upstream word blur/translate reveal with semantic inline output and an explicit reduced-motion final state.

The accompanying upstream license applies to these components.
