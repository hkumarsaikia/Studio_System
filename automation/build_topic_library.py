import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOPICS_TXT = ROOT / 'data' / 'Topics.txt'
VIDEOS_DIR = ROOT / 'data' / 'videos'
MANIFEST_PATH = ROOT / 'data' / 'video_manifest.json'
ENGINE_MANIFEST_PATH = ROOT / 'engine' / 'src' / 'generated' / 'videoManifest.js'
ASSET_LIBRARY_PATH = ROOT / 'data' / 'asset_library.json'
ASSET_REQUIREMENTS_PATH = ROOT / 'data' / 'asset_requirements_500.json'

BASE_ASSET_LIBRARY = {
    'humans': ['person_adult_female', 'person_adult_male', 'person_youth', 'person_senior', 'crowd_group_8', 'crowd_group_16'],
    'animals': ['bird', 'fish', 'deer', 'cow', 'bee', 'turtle'],
    'objects': ['coin', 'bank', 'factory', 'house', 'cart', 'briefcase', 'microphone', 'cloud', 'chip', 'gavel'],
    'icons': ['bank', 'factory', 'home', 'cart', 'hospital', 'school', 'transport', 'energy', 'law', 'media', 'cloud', 'ai'],
    'backdrops': ['gradient_system', 'city_street', 'landscape_sunrise'],
    'charts': ['bars', 'flow', 'network'],
}

CATEGORY_ASSET_TAGS = {
    'EVERYDAY SYSTEMS': ['home', 'cart', 'transport', 'city_street', 'crowd_group_16'],
    'MONEY & ECONOMICS': ['bank', 'coin', 'factory', 'bars', 'network'],
    'INFORMATION SYSTEMS': ['media', 'cloud', 'ai', 'flow', 'network'],
    'POWER & INSTITUTIONS': ['gavel', 'law', 'city_street', 'network', 'crowd_group_8'],
    'FUTURE SYSTEMS': ['ai', 'cloud', 'landscape_sunrise', 'animals', 'network'],
}


SCENE_BLUEPRINT = [
    ('Topic frame', 'crowd'),
    ('Hook', 'icons'),
    ('System boundary', 'network'),
    ('Cause layer 1', 'bars'),
    ('Cause layer 2', 'flow'),
    ('Cause layer 3', 'network'),
    ('Data lens', 'bars'),
    ('Real world scene', 'city'),
    ('Ecology/externalities', 'animals'),
    ('Macro trend', 'landscape'),
    ('Actionable takeaway', 'icons'),
    ('Closing', 'crowd'),
]


def parse_topics() -> list[dict]:
    topics = []
    for line in TOPICS_TXT.read_text(encoding='utf-8').splitlines():
        match = re.match(r'^(\d+)\.\s+(.+?)\s*$', line)
        if match:
            topics.append({'index': int(match.group(1)), 'topic': match.group(2)})
    if len(topics) != 500:
        raise ValueError(f'Expected 500 topics but found {len(topics)}')
    return topics


def infer_category(index: int) -> tuple[str, str]:
    if index <= 100:
        return ('EVERYDAY SYSTEMS', '#38bdf8')
    if index <= 200:
        return ('MONEY & ECONOMICS', '#22d3ee')
    if index <= 300:
        return ('INFORMATION SYSTEMS', '#f472b6')
    if index <= 400:
        return ('POWER & INSTITUTIONS', '#a78bfa')
    return ('FUTURE SYSTEMS', '#34d399')


def scene_payload(topic: str, index: int, step: int, category: str, accent: str, visual: str) -> dict:
    seed = (index % 9) + step
    payload = {
        'duration': 300,
        'visual': visual,
        'category': category,
        'accentColor': accent,
        'assetTags': CATEGORY_ASSET_TAGS[category],
    }

    if visual == 'crowd':
        payload['crowdCount'] = 10 + (index % 8)
    if visual == 'bars':
        payload['barValues'] = [18 + seed, 26 + seed, 36 + seed, 47 + seed, 58 + seed]
    if visual == 'flow':
        payload['flowLabels'] = ['Trigger', 'Mechanism', 'Outcome'] if step == 5 else ['Input', 'System', 'Output']
    if visual == 'network':
        payload['networkNodes'] = ['State', 'Market', 'Labor', 'Capital', 'Public'] if step == 3 else ['Policy', 'Price', 'Behavior', 'Risk', 'Feedback']
    if visual == 'icons':
        payload['icons'] = CATEGORY_ASSET_TAGS[category][:3] + ['bank', 'factory', 'home']
    if visual == 'animals':
        payload['animals'] = ['bird', 'fish', 'bee'] if category != 'FUTURE SYSTEMS' else ['bird', 'turtle', 'deer']

    return payload


def base_scenes(topic: str, index: int) -> list[dict]:
    category, accent = infer_category(index)
    scenes = []

    for i, (label, visual) in enumerate(SCENE_BLUEPRINT, start=1):
        if label == 'Topic frame':
            text = topic
            subtext = 'A systems explainer in 2 minutes.'
        elif label == 'Hook':
            text = 'Hook'
            subtext = f'Why this matters in daily life: {topic}'
        elif label == 'Closing':
            text = 'Closing'
            subtext = 'Understand systems, predict outcomes, act early.'
        else:
            text = label
            subtext = f'{label} for topic: {topic}'

        scene = {'text': text, 'subtext': subtext}
        scene.update(scene_payload(topic, index, i, category, accent, visual))
        scenes.append(scene)

    return scenes


def make_video_payload(index: int, topic: str) -> dict:
    video_id = f'video_{index:03d}'
    category, accent = infer_category(index)
    return {
        'id': video_id,
        'title': topic,
        'template': 'explainer' if index % 3 == 0 else 'protest',
        'fps': 30,
        'width': 1080,
        'height': 1920,
        'category': category,
        'accentColor': accent,
        'scenes': base_scenes(topic, index),
    }


def write_engine_manifest(video_ids: list[str]) -> None:
    lines = [
        'export const videoIds = ' + json.dumps(video_ids, ensure_ascii=False, indent=2) + ';',
        '',
        'export const getVideoData = async (videoId) => {',
        "  const id = videoId || 'video_001';",
        '  const safeId = videoIds.includes(id) ? id : "video_001";',
        '  const module = await import(`../../../data/videos/${safeId}.json`);',
        '  return module.default;',
        '};',
        '',
    ]
    ENGINE_MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    ENGINE_MANIFEST_PATH.write_text('\n'.join(lines), encoding='utf-8')


def write_asset_requirements(all_payloads: list[dict]) -> None:
    requirements = {
        'assetLibrary': BASE_ASSET_LIBRARY,
        'categoryAssetTags': CATEGORY_ASSET_TAGS,
        'sceneBlueprint': SCENE_BLUEPRINT,
        'videos': {},
    }

    for payload in all_payloads:
        used_assets = set()
        used_visuals = set()
        for scene in payload['scenes']:
            used_visuals.add(scene['visual'])
            for tag in scene.get('assetTags', []):
                used_assets.add(tag)
            for k in ['icons', 'animals', 'networkNodes', 'flowLabels']:
                for item in scene.get(k, []):
                    used_assets.add(str(item))

        requirements['videos'][payload['id']] = {
            'title': payload['title'],
            'category': payload['category'],
            'visuals': sorted(used_visuals),
            'assets': sorted(used_assets),
        }

    ASSET_LIBRARY_PATH.write_text(json.dumps(BASE_ASSET_LIBRARY, indent=2) + '\n', encoding='utf-8')
    ASSET_REQUIREMENTS_PATH.write_text(json.dumps(requirements, indent=2), encoding='utf-8')


def main() -> None:
    parser = argparse.ArgumentParser(description='Build topic library and video manifests')
    parser.add_argument('--materialize', action='store_true', help='Write all 500 video JSON files to data/videos')
    args = parser.parse_args()

    topics = parse_topics()
    manifest = {}
    all_payloads = []

    if args.materialize:
        VIDEOS_DIR.mkdir(parents=True, exist_ok=True)

    for item in topics:
        payload = make_video_payload(item['index'], item['topic'])
        all_payloads.append(payload)
        manifest[payload['id']] = {
            'title': payload['title'],
            'template': payload['template'],
            'category': payload['category'],
            'sceneCount': len(payload['scenes']),
        }
        if args.materialize:
            (VIDEOS_DIR / f"{payload['id']}.json").write_text(
                json.dumps(payload, indent=2, ensure_ascii=False) + '\n',
                encoding='utf-8',
            )

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    write_engine_manifest(sorted(manifest.keys()))
    write_asset_requirements(all_payloads)
    print(f'Built manifest for {len(manifest)} videos')
    if args.materialize:
        print(f'Materialized video files in: {VIDEOS_DIR}')


if __name__ == '__main__':
    main()
