import sys
from pathlib import Path

try:
    import cv2
except Exception as e:
    print('IMPORT_ERROR', e)
    sys.exit(1)

video = Path(r'e:\Projects\Tamil\WhatsApp Video 2026-05-06 at 2.51.22 PM.mp4')
out = Path(r'e:\Projects\Tamil\.tmp-ref')
out.mkdir(exist_ok=True)
cap = cv2.VideoCapture(str(video))
if not cap.isOpened():
    print('OPEN_FAIL')
    sys.exit(1)

fps = cap.get(cv2.CAP_PROP_FPS) or 30
samples = [0, 1, 2, 3, 4, 5, 8, 12]
for i, sec in enumerate(samples, start=1):
    cap.set(cv2.CAP_PROP_POS_MSEC, sec * 1000)
    ok, frame = cap.read()
    if ok:
        cv2.imwrite(str(out / f'frame-{i:02d}-{sec:02d}.jpg'), frame)
        print('WROTE', i, sec)
    else:
        print('FAIL', i, sec)
cap.release()
