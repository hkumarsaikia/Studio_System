import argparse
import os
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / 'output' / 'thumbnails'
VIDEOS_DIR = ROOT / 'data' / 'videos'


def export_thumbnail(video_id: str, frame: int = 45) -> None:
    if not (VIDEOS_DIR / f'{video_id}.json').exists():
        raise FileNotFoundError(f'Unknown video id: {video_id}')

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output_file = OUTPUT_DIR / f'{video_id}.png'

    env = os.environ.copy()
    env['REMOTION_VIDEO_ID'] = video_id

    command = [
        'npx',
        'remotion',
        'still',
        'src/index.js',
        'MainComposition',
        str(output_file),
        '--frame',
        str(frame),
    ]

    subprocess.run(command, cwd=ROOT / 'engine', check=True, env=env)


def main() -> None:
    parser = argparse.ArgumentParser(description='Export a thumbnail PNG from a selected video scene')
    parser.add_argument('video_id')
    parser.add_argument('--frame', type=int, default=45)
    args = parser.parse_args()

    export_thumbnail(args.video_id, args.frame)


if __name__ == '__main__':
    main()
