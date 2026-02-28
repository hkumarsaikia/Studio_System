# Permanent Files (Create/Keep Now)

This repository is currently an architecture scaffold: most files contain descriptive placeholders only.

Use this as the **minimum permanent file set** to make the Studio System stable and maintainable.

## 1) Repository governance (must be permanent)
- `README.md` — install/run/use documentation.
- `ARCHITECTURE.md` — system structure and data flow.
- `.gitignore` — protects the repo from generated artifacts.
- `.env.example` — example environment keys (commit this; keep `.env` local/untracked).

## 2) Core contracts (must be permanent)
- `data/schema.json` — canonical input contract for all video JSON payloads.
- `engine/package.json` — runtime/build dependencies and scripts.
- `engine/remotion.config.js` — render/runtime configuration.

## 3) Runtime entrypoints (must be permanent)
- `engine/src/index.js`
- `engine/src/Root.jsx`
- `engine/src/core/TemplateLoader.jsx`
- `engine/src/core/SceneManager.jsx`

These define the render pipeline and should remain stable entrypoints even as templates/components evolve.

## 4) Automation entrypoints (must be permanent)
- `automation/render.py` — orchestration entrypoint.
- `automation/metadata_generator.py`
- `automation/export_thumbnail.py`
- `automation/clean_output.py`

## 5) Reusable system modules (should be permanent)
- `engine/src/utils/*` (timing, parsing, validation, transitions, audio sync)
- `engine/src/styles/*` (theme/typography/global styling)
- `engine/src/scenes/SceneFactory.jsx` and `engine/src/scenes/SceneBlock.jsx`

## 6) Template and content files (versioned, but replaceable)
- `engine/src/templates/*`
- `data/video_001.json`, `data/video_002.json`
- `presets/*.json`

These are part of product behavior and should be committed, but they are expected to evolve per project/campaign.

## Immediate recommendation
1. Keep all files above in git.
2. Convert placeholders to real implementations first for sections 2–4.
3. Add `.env.example` immediately and stop tracking secrets in `.env`.
