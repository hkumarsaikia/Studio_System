import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VIDEOS_DIR = ROOT / 'data' / 'videos'
OUTPUT_DIR = ROOT / 'output' / 'metadata'


def hashtags_from_title(title: str) -> list[str]:
    common = ['#SystemsThinking', '#Explainer', '#Economics']
    keyword = ''.join(ch for ch in title.title() if ch.isalnum())
    return common + [f'#{keyword[:30]}']


def generate_metadata(video_id: str) -> dict:
    payload = json.loads((VIDEOS_DIR / f'{video_id}.json').read_text(encoding='utf-8'))
    title = payload['title']
    short_title = title if len(title) <= 95 else f"{title[:92]}..."
    tags = hashtags_from_title(title)

    description = (
        f"{title}\n\n"
        'This short visual explainer breaks down the topic using system maps, incentives, and feedback loops.\n\n'
        'Structure:\n'
        '- Hook\n- Drivers\n- Feedback loops\n- Trade-offs\n- Actionable takeaway\n\n'
        f"Video ID: {video_id}\n"
        f"Scenes: {len(payload['scenes'])}\n\n"
        + ' '.join(tags)
    )

    return {
        'videoId': video_id,
        'title': short_title,
        'description': description,
        'tags': tags,
        'category': 'Education',
    }


def main() -> None:
    parser = argparse.ArgumentParser(description='Generate upload metadata for one or all videos')
    parser.add_argument('--video-id', default=None)
    parser.add_argument('--all', action='store_true')
    args = parser.parse_args()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    if args.all:
        for path in sorted(VIDEOS_DIR.glob('video_*.json')):
            video_id = path.stem
            meta = generate_metadata(video_id)
            (OUTPUT_DIR / f'{video_id}.json').write_text(json.dumps(meta, indent=2), encoding='utf-8')
        print(f'Generated metadata for {len(list(VIDEOS_DIR.glob("video_*.json")))} videos')
    elif args.video_id:
        meta = generate_metadata(args.video_id)
        out_file = OUTPUT_DIR / f'{args.video_id}.json'
        out_file.write_text(json.dumps(meta, indent=2), encoding='utf-8')
        print(f'Wrote {out_file}')
    else:
        raise SystemExit('Provide --video-id video_001 or --all')


if __name__ == '__main__':
    main()
