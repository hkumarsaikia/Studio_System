import argparse
import json
from pathlib import Path
from render import render_video

ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / 'data' / 'video_manifest.json'


def load_video_ids(limit: int | None = None) -> list[str]:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding='utf-8'))
    ids = sorted(manifest.keys())
    return ids[:limit] if limit else ids


def main() -> None:
    parser = argparse.ArgumentParser(description='Batch render all topic videos')
    parser.add_argument('--limit', type=int, default=None, help='Render only first N videos for smoke tests')
    parser.add_argument('--start-from', type=str, default=None, help='Start rendering from a given video id')
    parser.add_argument('--crf', type=int, default=20)
    args = parser.parse_args()

    video_ids = load_video_ids(args.limit)
    if args.start_from:
        video_ids = [vid for vid in video_ids if vid >= args.start_from]

    failures = []
    for idx, video_id in enumerate(video_ids, start=1):
        print(f'[{idx}/{len(video_ids)}] Rendering {video_id}')
        try:
            render_video(video_id, args.crf)
        except Exception as exc:  # noqa: BLE001
            failures.append((video_id, str(exc)))
            print(f'FAILED: {video_id} -> {exc}')

    print(f'Finished batch. Success: {len(video_ids) - len(failures)} / {len(video_ids)}')
    if failures:
        print('Failures:')
        for video_id, err in failures:
            print(f'- {video_id}: {err}')


if __name__ == '__main__':
    main()
