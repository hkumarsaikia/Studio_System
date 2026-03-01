# Studio System

A data-driven Remotion pipeline for producing high-level vector explainer videos.

## What this system now supports

- 500-topic library parsed from `data/Topics.txt`
- Materialized video JSON payloads in `data/videos/video_001.json` ... `video_500.json`
- Runtime selection of any video via `REMOTION_VIDEO_ID`
- Reusable vector graphics scene runtime (background, crowd, cinematic text)
- Batch render, metadata generation, and thumbnail export automation scripts

## Build the 500-video library

```bash
python automation/build_topic_library.py --materialize
```

Outputs:
- `data/videos/video_XXX.json`
- `data/video_manifest.json`
- `engine/src/generated/videoManifest.js`

## Render one video

```bash
python automation/render.py video_001
```

## Render all videos

```bash
python automation/render_all.py
```

Useful options:

```bash
python automation/render_all.py --limit 5
python automation/render_all.py --start-from video_120
```

## Generate metadata

```bash
python automation/metadata_generator.py --video-id video_001
python automation/metadata_generator.py --all
```

## Export a thumbnail

```bash
python automation/export_thumbnail.py video_001 --frame 45
```

## Notes

- Headless render requires Remotion browser dependencies to be available in your environment.
- Audio assets can be added per scene using the `audio` field in each video JSON.


## Validate generated library

```bash
python automation/validate_library.py
```

This checks:
- 500 video JSON files exist
- 500 manifest entries exist
- each video has 12 scenes
- each scene includes required visual keys


## Asset pipeline for all 500 topics

See `ASSET_PRODUCTION_GUIDE.md` for complete reusable asset strategy and production checklist.

Generated planning files:
- `data/asset_library.json`
- `data/asset_requirements_500.json`
