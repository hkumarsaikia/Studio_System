from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / 'output'

if OUTPUT_DIR.exists():
    for item in OUTPUT_DIR.iterdir():
        if item.is_dir():
            shutil.rmtree(item)
        else:
            item.unlink()
    print(f'Cleaned: {OUTPUT_DIR}')
else:
    print('No output directory found.')
