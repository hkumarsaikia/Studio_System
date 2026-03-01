import json
from datetime import datetime
from pathlib import Path
import subprocess
import sys

ARCH_FILE = Path("ARCHITECTURE.md")
MILESTONE_FILE = Path("automation/milestones.json")


def load_milestones():
    if not MILESTONE_FILE.exists():
        return {"milestones": []}
    with open(MILESTONE_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_milestones(data):
    with open(MILESTONE_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


def create_milestone(title, achievements):
    data = load_milestones()
    milestone_number = len(data["milestones"]) + 1
    timestamp = datetime.now().strftime("%d %b %Y")

    milestone_data = {
        "number": milestone_number,
        "title": title,
        "date": timestamp,
        "achievements": achievements
    }

    data["milestones"].append(milestone_data)
    save_milestones(data)

    bullet_points = "\n".join([f"- {a}" for a in achievements])

    markdown_entry = f"""

---

# 🚀 Milestone #{milestone_number} — {title}

Date: {timestamp}

Status: ✅ SUCCESS

What was achieved:

{bullet_points}

"""

    with open(ARCH_FILE, "a", encoding="utf-8") as f:
        f.write(markdown_entry)

    print(f"Milestone #{milestone_number} created successfully.")

    # Optional auto git commit
    subprocess.run("git add .", shell=True)
    subprocess.run(
        f'git commit -m "Milestone #{milestone_number}: {title}"',
        shell=True
    )
    subprocess.run("git push", shell=True)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print('Usage: python automation/create_milestone.py "Milestone Title"')
        sys.exit(1)

    title = sys.argv[1]

    print("Enter achievements (one per line). Type 'done' when finished:")

    achievements = []
    while True:
        line = input("> ")
        if line.lower() == "done":
            break
        achievements.append(line)

    create_milestone(title, achievements)