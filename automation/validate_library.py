import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VIDEOS_DIR = ROOT / 'data' / 'videos'
MANIFEST_PATH = ROOT / 'data' / 'video_manifest.json'
ASSET_LIBRARY_PATH = ROOT / 'data' / 'asset_library.json'
ASSET_REQUIREMENTS_PATH = ROOT / 'data' / 'asset_requirements_500.json'

REQUIRED_SCENE_KEYS = {'text', 'duration', 'visual'}


def validate() -> None:
    files = sorted(VIDEOS_DIR.glob('video_*.json'))
    if len(files) != 500:
        raise ValueError(f'Expected 500 video files, found {len(files)}')

    manifest = json.loads(MANIFEST_PATH.read_text(encoding='utf-8'))
    if len(manifest) != 500:
        raise ValueError(f'Expected 500 manifest entries, found {len(manifest)}')

    if not ASSET_LIBRARY_PATH.exists() or not ASSET_REQUIREMENTS_PATH.exists():
        raise ValueError('Asset planning files are missing. Run build_topic_library.py')

    visual_counts = {}
    for path in files:
        payload = json.loads(path.read_text(encoding='utf-8'))
        scenes = payload.get('scenes', [])
        if len(scenes) != 12:
            raise ValueError(f'{path.name} does not contain 12 scenes')
        if not payload.get('category'):
            raise ValueError(f'{path.name} missing top-level category')

        for scene in scenes:
            missing = REQUIRED_SCENE_KEYS - set(scene.keys())
            if missing:
                raise ValueError(f'{path.name} scene missing keys: {missing}')
            visual = scene['visual']
            visual_counts[visual] = visual_counts.get(visual, 0) + 1

    print('Library validation passed')
    print(f'Visual distribution: {visual_counts}')


if __name__ == '__main__':
    validate()
