import subprocess
import sys
import os

def render(video_id):
    output_path = os.path.join("..", "output", f"{video_id}.mp4")

    command = f"npx remotion render src/index.js MainComposition {output_path}"

    subprocess.run(
        command,
        cwd="engine",
        shell=True  # IMPORTANT FOR WINDOWS
    )

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python automation/render.py video_001")
        sys.exit(1)

    render(sys.argv[1])