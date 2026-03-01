from datetime import datetime
from pathlib import Path
import json

ARCH_FILE = Path("ARCHITECTURE.md")
MILESTONE_FILE = Path("automation/milestones.json")

def _load_milestones():
    if not MILESTONE_FILE.exists():
        return {"milestones": []}

    with open(MILESTONE_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def _save_milestones(data):
    with open(MILESTONE_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def log_milestone(title, achievements):
    data = _load_milestones()
    milestone_list = data["milestones"]

    next_number = len(milestone_list) + 1

    timestamp = datetime.now().strftime("%d %b %Y")

    milestone_entry = {
        "number": next_number,
        "title": title,
        "date": timestamp,
        "achievements": achievements
    }

    milestone_list.append(milestone_entry)
    _save_milestones(data)

    bullet_points = "\n".join([f"- {item}" for item in achievements])

    md_entry = f"""

---

# 🚀 Milestone #{next_number} — {title}

Date: {timestamp}

Status: ✅ SUCCESS

What was achieved:

{bullet_points}

"""

    with open(ARCH_FILE, "a", encoding="utf-8") as f:
        f.write(md_entry)

    print(f"[Milestone #{next_number} Logged]")