# React Bits sources

Upstream: https://github.com/DavidHDev/react-bits
Commit: e12c22192ac7b4b452c5e2feb9b586d74765d696

- GradientASCII.tsx and GradientASCII.css: src/ts-default/Backgrounds/GradientASCII, fetched from the official GradientASCII-TS-CSS registry. Adapted with a text-mask texture for the name, local pointer displacement and renderer status. Only characters near the pointer scatter and briefly scramble; they return as the pointer trail decays. The Canvas2D fallback uses local particle repulsion and spring return for the same interaction without WebGL. Reduced-motion and offscreen scenes stop scheduling frames. The section uses a dark green surface and warm white/lime text in dark theme.
- BlurText.tsx: a focused adaptation of src/ts-default/TextAnimations/BlurText, using the upstream word blur/translate reveal with semantic inline output and an explicit reduced-motion final state.

The accompanying upstream license applies to these components.
