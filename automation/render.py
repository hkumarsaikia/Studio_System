import argparse
import os
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VIDEOS_DIR = ROOT / 'data' / 'videos'
OUTPUT_DIR = ROOT / 'output'


def ensure_video_exists(video_id: str) -> None:
    candidate = VIDEOS_DIR / f'{video_id}.json'
    if not candidate.exists():
        raise FileNotFoundError(f'Video data not found: {candidate}')


def render_video(video_id: str, quality: int = 20) -> None:
    ensure_video_exists(video_id)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output_file = OUTPUT_DIR / f'{video_id}.mp4'

    env = os.environ.copy()
    env['REMOTION_VIDEO_ID'] = video_id

    command = [
        'npx',
        'remotion',
        'render',
        'src/index.js',
        'MainComposition',
        str(output_file),
        '--crf',
        str(quality),
    ]

    subprocess.run(command, cwd=ROOT / 'engine', check=True, env=env)


def main() -> None:
    parser = argparse.ArgumentParser(description='Render one video from data/videos/video_XXX.json')
    parser.add_argument('video_id', help='Example: video_001')
    parser.add_argument('--crf', type=int, default=20, help='Output quality (lower = better quality, larger file)')
    args = parser.parse_args()

    render_video(args.video_id, args.crf)


if __name__ == '__main__':
    main()
