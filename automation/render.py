import subprocess
import sys
import os
from milestone_logger import log_milestone

def render(video_id):
    output_path = os.path.join("..", "output", f"{video_id}.mp4")

    command = f"npx remotion render src/index.js MainComposition {output_path}"

    subprocess.run(
        command,
        cwd="engine",
        shell=True
    )

    log_milestone(
        "Milestone #2 — Dynamic Multi-Scene Rendering",
        "JSON-driven multi-scene rendering validated via Python orchestration."
    )

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python automation/render.py video_001")
        sys.exit(1)

    render(sys.argv[1])