/* ============================================================
   CẤU HÌNH GAME
   ============================================================ */
const CFG = {
  W: 820,
  H: 600,
  LEVEL_BALL_SPEED: [8.5, 10.5, 12.0],
  LEVEL_DROP_SPEED: [0.6, 0.7, 0.8],
  DEATH_LINE_Y: 450,
  BRICK_TYPES: [
    { hp: 1, color: "#3399ff", name: "Plasma L1" },
    { hp: 2, color: "#ff4444", name: "Plasma L2" },
    { hp: 2, color: "#ff8800", name: "Plasma L3" },
    { hp: 3, color: "#22cc55", name: "Plasma L4" },
    { hp: 3, color: "#ff55cc", name: "Plasma L5" },
    { hp: 4, color: "#aa00ff", name: "Plasma L6" },
    { hp: 5, color: "#ffdd00", name: "Plasma L7" },
  ],
  BRICK_WEIGHTS: [4, 3, 3, 2, 2, 1, 1],
  COLS: 9,
  ROWS_BASE: 3,
  PADDLE_BASE_W: 115,
  PADDLE_H: 16,
  BALL_R: 9,
  POWERUP_SPEED: 2.8,
  MAX_BALLS: 8,
};

/* ============================================================
   AUDIO ELEMENTS
   ============================================================ */
const bgMusic = document.getElementById('bgMusic');
const hitBrickSound = document.getElementById('hitBrickSound');
const hitPaddleSound = document.getElementById('hitPaddleSound');
const hitBossSound = document.getElementById('hitBossSound');
const powerUpSound = document.getElementById('powerUpSound');

/* ============================================================
   AUDIO FUNCTIONS
   ============================================================ */
function playSound(audio) {
  if (audio) {
    audio.currentTime = 0; // Reset to start for overlapping sounds
    audio.play().catch(e => console.log('Audio play failed:', e)); // Handle autoplay restrictions
  }
}

function startBackgroundMusic() {
  if (bgMusic) {
    bgMusic.volume = 0.3; // Set volume to 30% for background
    playSound(bgMusic);
  }
}

/* ============================================================
   BOSS DEFINITIONS
   ============================================================ */
const BOSS_DEFS = [
  {
    level: 1,
    name: "KRATHON TIỀN PHONG",
    emoji: "👾",
    color: "#ff3366",
    hp: 12,
    size: { w: 120, h: 40 },
    shootInterval: 180, // frames
    bulletSpeed: 3.5,
    moveSpeed: 1.8,
    portrait: "👾",
    speaker: "KRATHON TIỀN PHONG",
    taunt: "Hahaha! Con người nhỏ bé! Ngươi dám chống lại hạm đội Krath?!",
    defeat: "Im... im... không thể... tường phòng thủ của ta...",
    playerResponse: "Tốt! Màn chắn lớp 1 đã vỡ. Tiến vào lõi phòng thủ!",
  },
  {
    level: 2,
    name: "ADMIRAL VRAK",
    emoji: "🛸",
    color: "#ff6600",
    hp: 18,
    size: { w: 140, h: 46 },
    shootInterval: 140,
    bulletSpeed: 4.5,
    moveSpeed: 2.4,
    portrait: "🛸",
    speaker: "ADMIRAL VRAK",
    taunt: "Ngươi đã may mắn vượt qua lớp đầu. Nhưng ta — Admiral Vrak — sẽ chôn vùi ngươi!",
    defeat: "Không... hạm đội của ta... tất cả... không thể...",
    playerResponse: "Vrak đã bị tiêu diệt! Lõi phòng thủ sắp vỡ. Mục tiêu cuối: tàu mẹ Krath!",
  },
  {
    level: 3,
    name: "HOÀNG ĐẾ KRATH-ZERO",
    emoji: "💀",
    color: "#cc00ff",
    hp: 25,
    size: { w: 160, h: 52 },
    shootInterval: 100,
    bulletSpeed: 5.5,
    moveSpeed: 3.0,
    portrait: "💀",
    speaker: "HOÀNG ĐẾ KRATH-ZERO",
    taunt: "TA là Krath-Zero. Trong một triệu năm chinh phạt... chưa từng có ai đến đây. Ngươi sẽ chết danh dự.",
    defeat: "...Không thể... một con người... một con người đơn độc... đánh bại... đế chế...",
    playerResponse: "Trái Đất... an toàn rồi.",
  },
];

/* ============================================================
   STORY DIALOGUES
   ============================================================ */
const DIALOGS = {
  MENU: {
    speaker: "CHỈ HUY NOVA",
    portrait: "🚀",
    speakerColor: "#0f4",
    lines: [
      "Năm 2157. Hạm đội Krath đang tiến về Trái Đất với tốc độ ánh sáng...",
      "Chúng triển khai tường phòng thủ plasma ngăn mọi phản công. Tôi là người duy nhất còn sống.",
      "Vũ khí còn lại: một quả cầu plasma. Nếu bắn đúng điểm yếu — tường sẽ vỡ.",
      "Đây là nhiệm vụ cuối cùng. Trái Đất trông cậy vào tôi.",
    ]
  },
  LEVEL: [
    {
      speaker: "CHỈ HUY NOVA",
      portrait: "🚀",
      speakerColor: "#0f4",
      lines: [
        "Tường phòng thủ lớp 1 — cấu trúc đơn giản. Nhưng chúng đang tiến gần hơn mỗi giây.",
        "Phá vỡ tất cả trước khi chúng vượt qua ranh giới an toàn. Bắt đầu!",
      ]
    },
    {
      speaker: "CHỈ HUY NOVA",
      portrait: "🚀",
      speakerColor: "#0f4",
      lines: [
        "Lớp 2 — dày hơn nhiều. Chúng đã học từ thất bại của lớp đầu.",
        "Một số khối cần nhiều cú đánh. Kiên nhẫn. Đừng để chúng vượt vạch đỏ!",
      ]
    },
    {
      speaker: "CHỈ HUY NOVA",
      portrait: "🚀",
      speakerColor: "#0f4",
      lines: [
        "Lớp cuối cùng — bảo vệ thẳng tàu mẹ Krath. Đây là thời khắc quyết định.",
        "Phá vỡ tất cả và Trái Đất được cứu. Thất bại... không còn cơ hội thứ hai.",
      ]
    },
  ],
  WIN: {
    speaker: "CHỈ HUY NOVA",
    portrait: "🚀",
    speakerColor: "#0f4",
    lines: [
      "Tường phòng thủ sụp đổ hoàn toàn.",
      "Hạm đội Krath... đang rút lui. Tốc độ ánh sáng. Chúng bỏ chạy.",
      "Chỉ huy Nova gọi Trái Đất... Trái Đất, tôi nghe thấy anh không?",
      "...[Tiếng vỗ tay vang vọng từ đài kiểm soát]... Bạn vừa cứu cả nhân loại, Nova.",
    ]
  },
  GAMEOVER: {
    speaker: "HỆ THỐNG CẢNH BÁO",
    portrait: "☠️",
    speakerColor: "#ff3333",
    lines: [
      "CẢNH BÁO: Tường phòng thủ Krath đã vượt qua ranh giới an toàn.",
      "Tín hiệu từ Trái Đất... mất liên lạc.",
      "...Chỉ huy Nova... bạn có nghe không... Nova...",
      ".........",
    ]
  }
};

/* ============================================================
   TRẠNG THÁI GAME
   ============================================================ */
let handX        = CFG.W / 2;
let isOK         = false;
let isOpenHand   = false;
let okFrames     = 0;
const OK_HOLD    = 55;

let gameState    = "DIALOG";  // DIALOG | MENU | COUNTDOWN | PLAY | BOSS | WIN | GAMEOVER
let currentLevel = 1;
let score        = 0;
let paddleW      = CFG.PADDLE_BASE_W;
let paddleWideTimer = 0;

let balls        = [];
let bricks       = [];
let powerUps     = [];
let particles    = [];
let bossObj      = null;       // boss instance
let bossBullets  = [];
let godMode      = false;

let countdownActive = false;
let countdownValue = 0;
let countdownElapsed = 0;
let countdownTargetLevel = 1;
let countdownCallback = null;
const COUNTDOWN_STEP_MS = 1000;
const COUNTDOWN_START = 3;

// Dialog state
let dialogQueue      = [];
let dialogIndex      = 0;
let dialogTyped      = "";
let dialogFullLine   = "";
let dialogCharTimer  = 0;
let dialogDone       = false;
let dialogCallback   = null;
let dialogSpeaker    = "";
let dialogPortrait   = "";
let dialogSpeakerColor = "#0f4";
let dialogHoldFrames = 0;
let dialogSkipFrames = 0;

const STORAGE_SEEN_INTRO = "breakout_seenIntro";
let hasSeenIntro = false;
const DIALOG_ADVANCE_HOLD = 14;
const DIALOG_SKIP_HOLD = 14;

const STARS = Array.from({ length: 100 }, () => ({
  x: Math.random() * 820,
  y: Math.random() * 600,
  r: Math.random() * 1.8 + 0.2,
  phase: Math.random() * Math.PI * 2,
  speed: Math.random() * 0.01 + 0.005,
}));

/* ============================================================
   DIALOG SYSTEM
   ============================================================ */
function showDialog(config, callback) {
  dialogQueue        = config.lines;
  dialogSpeaker      = config.speaker;
  dialogPortrait     = config.portrait;
  dialogSpeakerColor = config.speakerColor || "#0f4";
  dialogIndex        = 0;
  dialogCallback     = callback;
  dialogHoldFrames   = 0;
  dialogSkipFrames   = 0;

  document.getElementById("dialog-speaker").textContent = `— ${dialogSpeaker} —`;
  document.getElementById("dialog-speaker").style.color = dialogSpeakerColor;
  document.getElementById("dialog-portrait").textContent = dialogPortrait;
  document.getElementById("dialog").classList.add("show");

  startDialogLine();
}

function startDialogLine() {
  dialogFullLine = dialogQueue[dialogIndex];
  dialogTyped    = "";
  dialogDone     = false;
  dialogCharTimer = 0;
  document.getElementById("dialog-text").textContent = "";
  document.getElementById("dialog-progress-bar").style.width = "0%";
}

function updateDialog() {
  if (!document.getElementById("dialog").classList.contains("show")) return;

  // Typewriter
  if (!dialogDone) {
    dialogCharTimer++;
    if (dialogCharTimer % 2 === 0) {
      dialogTyped += dialogFullLine[dialogTyped.length] || "";
      document.getElementById("dialog-text").textContent = dialogTyped;
      if (dialogTyped.length >= dialogFullLine.length) {
        dialogDone = true;
      }
    }
  }

  if (isOpenHand) dialogSkipFrames++;
  else dialogSkipFrames = 0;

  if (dialogSkipFrames >= DIALOG_SKIP_HOLD) {
    dialogSkipFrames = 0;
    dialogHoldFrames = 0;
    document.getElementById("dialog").classList.remove("show");
    if (dialogCallback) dialogCallback();
    return;
  }

  if (dialogDone) {
    if (isOK) dialogHoldFrames++;
    else dialogHoldFrames = 0;
  } else {
    dialogHoldFrames = 0;
  }

  const activeFrames = Math.max(dialogHoldFrames, dialogSkipFrames);
  const activeHold = isOpenHand ? DIALOG_SKIP_HOLD : DIALOG_ADVANCE_HOLD;
  const pct = Math.min(activeFrames / activeHold, 1) * 100;
  document.getElementById("dialog-progress-bar").style.width = pct + "%";

  if (dialogDone && dialogHoldFrames >= DIALOG_ADVANCE_HOLD) {
    dialogHoldFrames = 0;
    dialogIndex++;
    if (dialogIndex >= dialogQueue.length) {
      document.getElementById("dialog").classList.remove("show");
      if (dialogCallback) dialogCallback();
    } else {
      startDialogLine();
    }
  }
}

/* ============================================================
   MEDIAPIPE
   ============================================================ */
const mpHands = new Hands({
  locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`
});
mpHands.setOptions({ maxNumHands: 1, modelComplexity: 1, minDetectionConfidence: 0.65, minTrackingConfidence: 0.55 });
mpHands.onResults(results => {
  const statusEl = document.getElementById("status");
  if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
    isOK = false;
    isOpenHand = false;
    statusEl.textContent = "❌ Không thấy tay";
    return;
  }
  const hand = results.multiHandLandmarks[0];
  const index = hand[8];
  const thumb = hand[4];
  const targetX = (1 - index.x) * CFG.W;
  handX = lerp(handX, targetX, 0.28);
  const d = hypot(index.x - thumb.x, index.y - thumb.y);
  isOK = d < 0.065;

  function fingerExtended(tip, pip) {
    return hypot(tip.x - pip.x, tip.y - pip.y) > 0.12;
  }
  isOpenHand = fingerExtended(hand[8], hand[6]) && fingerExtended(hand[12], hand[10]) && fingerExtended(hand[16], hand[14]) && fingerExtended(hand[20], hand[18]) && hypot(hand[4].x - hand[3].x, hand[4].y - hand[3].y) > 0.08;

  if (isOpenHand) {
    statusEl.textContent = "🖐 Giữ 5 ngón để bỏ qua hội thoại...";
  } else if (isOK) {
    statusEl.textContent = "👌 Giữ để tiếp tục...";
  } else {
    statusEl.textContent = "✋ Đưa tay vào khung";
  }
});

function setupCamera() {
  const vid = document.getElementById("camPreview");
  navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
    .then(stream => {
      vid.srcObject = stream;
      const cam = new Camera(vid, {
        onFrame: async () => { await mpHands.send({ image: vid }); },
        width: 640, height: 480,
      });
      cam.start();
      document.getElementById("status").textContent = "✋ Đưa tay vào khung";
    })
    .catch(() => {
      document.getElementById("status").textContent = "⚠️ Camera không hoạt động — dùng chuột";
      document.addEventListener("mousemove", e => {
        const canvas = document.querySelector("canvas");
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          handX = e.clientX - rect.left;
        }
      });
      document.addEventListener("click", () => { isOK = true; setTimeout(() => isOK = false, 800); });
    });
}

/* ============================================================
   INIT LEVEL
   ============================================================ */
function initLevel(lvl) {
  balls = [new Ball()];
  bricks = [];
  powerUps = [];
  particles = [];
  bossBullets = [];
  bossObj = null;
  paddleW = CFG.PADDLE_BASE_W;
  paddleWideTimer = 0;

  const rows = CFG.ROWS_BASE + (lvl - 1);
  const bW = 74, bH = 23, gX = 7, gY = 9;
  const totalW = CFG.COLS * (bW + gX) - gX;
  const startX = (CFG.W - totalW) / 2;
  const startY = 52;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < CFG.COLS; c++) {
      const typeIdx = weightedRandom(CFG.BRICK_WEIGHTS);
      const type = CFG.BRICK_TYPES[typeIdx];
      const hasItem = Math.random() < 0.20;
      bricks.push(new Brick(
        startX + c * (bW + gX),
        startY + r * (bH + gY),
        bW, bH, type.hp, type.color, hasItem
      ));
    }
  }
  updateHUD();
}

function spawnBoss(lvl) {
  const def = BOSS_DEFS[lvl - 1];
  bossObj = new Boss(def);
  bossBullets = [];
  balls = [new Ball()];
}

function updateHUD() {
  const bossInfo = bossObj ? `  |  ⚡ Boss HP: ${bossObj.hp}` : `  |  Khối: ${bricks.length}`;
  document.getElementById("info").textContent =
    `Màn ${currentLevel}  |  Điểm: ${score}  |  Bóng: ${balls.length}${bossInfo}`;
}

/* ============================================================
   UTILITIES
   ============================================================ */
function lerp(a, b, t) { return a + (b - a) * t; }
function hypot(dx, dy) { return Math.sqrt(dx * dx + dy * dy); }
function weightedRandom(weights) {
  let total = weights.reduce((s, w) => s + w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) { r -= weights[i]; if (r <= 0) return i; }
  return weights.length - 1;
}
function hexToRGB(hex) {
  return { r: parseInt(hex.slice(1,3),16), g: parseInt(hex.slice(3,5),16), b: parseInt(hex.slice(5,7),16) };
}
function spawnParticles(x, y, color, n=8) {
  for (let i = 0; i < n; i++) particles.push(new Particle(x, y, color));
}

/* ============================================================
   P5.JS
   ============================================================ */
new p5(function (p) {

  p.setup = function () {
    p.createCanvas(CFG.W, CFG.H).parent(document.body);
    p.textFont("'Share Tech Mono', monospace");
    setupCamera();

    hasSeenIntro = localStorage.getItem(STORAGE_SEEN_INTRO) === "1";
    if (!hasSeenIntro) {
      showDialog(DIALOGS.MENU, () => {
        hasSeenIntro = true;
        localStorage.setItem(STORAGE_SEEN_INTRO, "1");
        gameState = "MENU";
      });
      gameState = "DIALOG";
    } else {
      gameState = "MENU";
    }

    document.addEventListener("keydown", e => {
      if (e.ctrlKey && e.shiftKey && e.code === "KeyU") {
        godMode = !godMode;
      }
    });
  };

  p.draw = function () {
    p.background(0);
    drawStars(p);

    if (isOK) okFrames++;
    else okFrames = 0;

    if (!countdownActive) {
      updateDialog();
    }
    updateCountdown(p);

    if      (gameState === "DIALOG")   { drawDialogBG(p); }
    else if (gameState === "MENU")     drawMenu(p);
    else if (gameState === "COUNTDOWN") runGame(p, true);
    else if (gameState === "PLAY")     runGame(p);
    else if (gameState === "BOSS")     runBoss(p);
    else if (gameState === "WIN")      drawEnd(p, true);
    else if (gameState === "GAMEOVER") drawEnd(p, false);

    drawCountdown(p);
  };

  /* ------ BG BEHIND DIALOG ------ */
  function drawDialogBG(p) {
    p.textAlign(p.CENTER);
    p.fill(0, 180, 80, 40);
    p.textSize(70);
    p.text("KRATH", CFG.W/2, CFG.H/2 - 20);
  }

  /* ------ MENU ------ */
  function drawMenu(p) {
    // Grid lines
    p.stroke(0, 255, 80, 12);
    p.strokeWeight(1);
    for (let x = 0; x < CFG.W; x += 40) p.line(x, 0, x, CFG.H);
    for (let y = 0; y < CFG.H; y += 40) p.line(0, y, CFG.W, y);
    p.noStroke();

    p.textAlign(p.CENTER);

    // Glow title
    for (let i = 3; i > 0; i--) {
      p.fill(0, 200, 80, 20 * i);
      p.textSize(52 + i*2);
      p.text("BREAKOUT", CFG.W/2, CFG.H/2 - 110);
    }
    p.fill(255);
    p.textSize(52);
    p.text("BREAKOUT", CFG.W/2, CFG.H/2 - 110);

    p.fill(0, 255, 120);
    p.textSize(13);
    p.text("PHÒNG THỦ TRÁI ĐẤT  ·  NĂM 2157  ·  3 MÀN  ·  3 BOSS", CFG.W/2, CFG.H/2 - 65);

    p.fill(160, 200, 220);
    p.textSize(13);
    p.text("Khối plasma tự rơi xuống  ·  Qua vạch đỏ = thất bại  ·  Mất bóng = thất bại", CFG.W/2, CFG.H/2 - 30);

    p.fill(255, 215, 0);
    p.textSize(12);
    p.text("Item: X2 = thêm bóng  |  ⬌ = mở rộng paddle  |  ~ = làm chậm", CFG.W/2, CFG.H/2);

    // Boss preview
    p.fill(255, 80, 80, 180);
    p.textSize(12);
    p.text("⚡ Mỗi màn sau khi phá hết khối: BOSS xuất hiện! Tránh đạn & bắn hạ!", CFG.W/2, CFG.H/2 + 32);

    p.fill(0, 255, 100);
    p.textSize(20);
    p.text("Giữ 👌 để bắt đầu", CFG.W/2, CFG.H/2 + 78);
    drawProgressBar(p, CFG.W/2, CFG.H/2 + 98, 220, okFrames, OK_HOLD);

    if (okFrames >= OK_HOLD && !countdownActive) {
      currentLevel = 1;
      score = 0;
      initLevel(1);
      beginLevelCountdown(1, () => {
        gameState = "PLAY";
        startBackgroundMusic();
      });
      gameState = "COUNTDOWN";
    }
  }

  /* ------ COUNTDOWN OVERLAY ------ */
  function beginLevelCountdown(lvl, callback) {
    countdownActive = true;
    countdownValue = COUNTDOWN_START;
    countdownElapsed = 0;
    countdownTargetLevel = lvl;
    countdownCallback = callback;
  }

  function updateCountdown(p) {
    if (!countdownActive) return;
    countdownElapsed += p.deltaTime;
    if (countdownElapsed >= COUNTDOWN_STEP_MS) {
      countdownElapsed -= COUNTDOWN_STEP_MS;
      countdownValue--;
      if (countdownValue <= 0) {
        countdownActive = false;
        if (countdownCallback) countdownCallback();
        countdownCallback = null;
      }
    }
  }

  function drawCountdown(p) {
    if (!countdownActive) return;
    p.fill(0, 180);
    p.rect(0, 0, CFG.W, CFG.H);
    p.fill(0, 255, 170);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(180);
    p.textStyle(p.BOLD);
    p.text(countdownValue, CFG.W / 2, CFG.H / 2);
    p.textStyle(p.NORMAL);
  }

  /* ------ START LEVEL ------ */
  function startLevel(lvl) {
    initLevel(lvl);
    showDialog(DIALOGS.LEVEL[lvl - 1], () => {
      gameState = "PLAY";
      startBackgroundMusic();
    });
    gameState = "DIALOG";
  }

  /* ------ GAME LOOP ------ */
  function runGame(p, pause = false) {
    const lvlIdx = currentLevel - 1;
    const dropSpd = CFG.LEVEL_DROP_SPEED[lvlIdx];

    // Death line
    p.drawingContext.setLineDash([10, 7]);
    p.stroke(220, 40, 40, 150);
    p.strokeWeight(1.5);
    p.line(0, CFG.DEATH_LINE_Y, CFG.W, CFG.DEATH_LINE_Y);
    p.drawingContext.setLineDash([]);
    p.noStroke();
    p.fill(220, 80, 80, 120);
    p.textAlign(p.RIGHT);
    p.textSize(10);
    p.text("☠ RANH GIỚI AN TOÀN", CFG.W - 10, CFG.DEATH_LINE_Y - 5);

    // Bricks + drop
    let brickDead = false;
    for (let i = bricks.length - 1; i >= 0; i--) {
      if (!pause) bricks[i].y += dropSpd * (p.deltaTime / 1000);
      bricks[i].show(p);
      if (!pause && bricks[i].y + bricks[i].h / 2 >= CFG.DEATH_LINE_Y) brickDead = true;
    }
    if (!pause && brickDead) { triggerGameOver(); return; }

    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      if (!pause) particles[i].update();
      particles[i].show(p);
      if (!pause && particles[i].dead()) particles.splice(i, 1);
    }

    // Power-ups
    for (let i = powerUps.length - 1; i >= 0; i--) {
      const pu = powerUps[i];
      if (!pause) pu.update();
      pu.show(p);
      if (!pause) {
        if (pu.checkCatch(handX, CFG.H - 38)) { applyPowerUp(pu); powerUps.splice(i, 1); }
        else if (pu.y > CFG.H + 30) powerUps.splice(i, 1);
      }
    }

    // Balls
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i];
      if (!pause) b.update();
      b.show(p);
      if (!pause) {
        b.checkPaddle(handX, CFG.H - 38, paddleW);
        for (let j = bricks.length - 1; j >= 0; j--) {
          if (b.hitBrick(bricks[j])) {
            bricks[j].hp--;
            spawnParticles(bricks[j].x, bricks[j].y, bricks[j].color);
            score += 10;
            if (bricks[j].hp <= 0) {
              if (bricks[j].hasItem) powerUps.push(new PowerUp(bricks[j].x, bricks[j].y));
              score += 20 * currentLevel;
              bricks.splice(j, 1);
            }
            break;
          }
        }
        if (b.offScreen()) balls.splice(i, 1);
      }
    }

    // Paddle
    if (paddleWideTimer > 0 && !pause) {
      paddleWideTimer -= p.deltaTime / 1000;
      if (paddleWideTimer <= 0) paddleW = CFG.PADDLE_BASE_W;
    }
    drawPaddle(p);

    // HUD
    drawGameHUD(p);

    if (pause) return;

    // Check win conditions
    if (bricks.length === 0) {
      // All bricks cleared → spawn boss dialog
      triggerBossIntro(currentLevel);
    }
    if (balls.length === 0) triggerGameOver();
  }

  /* ------ BOSS INTRO ------ */
  function triggerBossIntro(lvl) {
    const def = BOSS_DEFS[lvl - 1];
    const tauntDialog = {
      speaker: def.speaker,
      portrait: def.portrait,
      speakerColor: def.color,
      lines: [def.taunt],
    };
    showDialog(tauntDialog, () => {
      spawnBoss(lvl);
      gameState = "BOSS";
    });
    gameState = "DIALOG";
  }

  /* ------ BOSS LOOP ------ */
  function runBoss(p) {
    if (!bossObj) return;

    bossObj.update(p);
    bossObj.show(p);

    // Boss bullets
    for (let i = bossBullets.length - 1; i >= 0; i--) {
      const bl = bossBullets[i];
      bl.update();
      bl.show(p);
      // Hit paddle
      if (Math.abs(bl.x - handX) < paddleW / 2 + 5 && Math.abs(bl.y - (CFG.H - 38)) < 20) {
        spawnParticles(bl.x, bl.y, "#ff3366", 5);
        bossBullets.splice(i, 1);
        // Shrink paddle as penalty
        if (paddleW > 60) paddleW -= 10;
        continue;
      }
      if (bl.y > CFG.H + 20) bossBullets.splice(i, 1);
    }

    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update(); particles[i].show(p);
      if (particles[i].dead()) particles.splice(i, 1);
    }

    // Power-ups
    for (let i = powerUps.length - 1; i >= 0; i--) {
      const pu = powerUps[i];
      pu.update(); pu.show(p);
      if (pu.checkCatch(handX, CFG.H - 38)) { applyPowerUp(pu); powerUps.splice(i, 1); }
      else if (pu.y > CFG.H + 30) powerUps.splice(i, 1);
    }

    // Balls hit boss
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i];
      b.update(); b.show(p);
      b.checkPaddle(handX, CFG.H - 38, paddleW);

      if (bossObj && bossObj.checkHit(b)) {
        bossObj.hp--;
        spawnParticles(b.x, b.y, bossObj.def.color, 6);
        score += 30;
        if (bossObj.hp <= 0) {
          triggerBossDefeat(currentLevel);
          return;
        }
      }
      if (b.offScreen()) balls.splice(i, 1);
    }

    if (balls.length === 0) {
      // Give player a new ball if boss fight runs out
      balls.push(new Ball());
    }

    // Paddle
    if (paddleWideTimer > 0) {
      paddleWideTimer -= p.deltaTime / 1000;
      if (paddleWideTimer <= 0) paddleW = CFG.PADDLE_BASE_W;
    }
    drawPaddle(p);

    // Boss HP bar
    drawBossHUD(p);
    drawGameHUD(p);
  }

  /* ------ BOSS DEFEAT ------ */
  function triggerBossDefeat(lvl) {
    const def = BOSS_DEFS[lvl - 1];
    bossObj = null;
    spawnParticles(CFG.W/2, 150, def.color, 30);

    const defeatLines = [def.defeat, def.playerResponse];
    const speakers = [def.speaker, "CHỈ HUY NOVA"];
    const portraits = [def.portrait, "🚀"];
    const colors = [def.color, "#0f4"];

    // Chain dialogs: boss line then nova line
    const bossDefeatDialog = { speaker: def.speaker, portrait: def.portrait, speakerColor: def.color, lines: [def.defeat] };
    showDialog(bossDefeatDialog, () => {
      const novaDialog = { speaker: "CHỈ HUY NOVA", portrait: "🚀", speakerColor: "#0f4", lines: [def.playerResponse] };
      showDialog(novaDialog, () => {
        if (currentLevel < 3) {
          currentLevel++;
          startLevel(currentLevel);
        } else {
          showDialog(DIALOGS.WIN, () => { gameState = "WIN"; });
          gameState = "DIALOG";
        }
      });
      gameState = "DIALOG";
    });
    gameState = "DIALOG";
  }

  function triggerGameOver() {
    showDialog(DIALOGS.GAMEOVER, () => { gameState = "GAMEOVER"; });
    gameState = "DIALOG";
  }

  /* ------ END SCREEN ------ */
  function drawEnd(p, win) {
    p.stroke(0, 100, 50, 20);
    p.strokeWeight(1);
    for (let x = 0; x < CFG.W; x += 40) p.line(x, 0, x, CFG.H);
    for (let y = 0; y < CFG.H; y += 40) p.line(0, y, CFG.W, y);
    p.noStroke();

    p.textAlign(p.CENTER);

    const col = win ? "#00ff88" : "#ff4444";
    const rgb = win ? {r:0,g:255,b:136} : {r:255,g:68,b:68};

    for (let i = 3; i > 0; i--) {
      p.fill(rgb.r, rgb.g, rgb.b, 20 * i);
      p.textSize(58 + i*2);
      p.text(win ? "CHIẾN THẮNG!" : "GAME OVER", CFG.W/2, CFG.H/2 - 60);
    }
    p.fill(col);
    p.textSize(58);
    p.text(win ? "CHIẾN THẮNG!" : "GAME OVER", CFG.W/2, CFG.H/2 - 60);

    p.fill(win ? "#adf" : "#faa");
    p.textSize(16);
    p.text(
      win ? `Điểm cuối: ${score}  ·  Trái Đất được cứu!` : `Điểm: ${score}  ·  Màn ${currentLevel}  ·  Trái Đất... mất liên lạc.`,
      CFG.W/2, CFG.H/2 + 10
    );

    p.fill(0, 255, 100);
    p.textSize(18);
    p.text("Giữ 👌 để chơi lại", CFG.W/2, CFG.H/2 + 60);
    drawProgressBar(p, CFG.W/2, CFG.H/2 + 82, 220, okFrames, OK_HOLD);

    if (okFrames >= OK_HOLD) {
      currentLevel = 1;
      score = 0;
      if (!hasSeenIntro) {
        showDialog(DIALOGS.MENU, () => { gameState = "MENU"; });
        gameState = "DIALOG";
      } else {
        gameState = "MENU";
      }
    }
  }

  /* ------ DRAW HELPERS ------ */
  function drawStars(p) {
    p.noStroke();
    STARS.forEach(s => {
      s.phase += s.speed;
      const a = Math.abs(Math.sin(s.phase)) * 160 + 40;
      p.fill(200, 220, 255, a);
      p.circle(s.x, s.y, s.r * 2);
    });
  }

  function drawPaddle(p) {
    p.noStroke();
    const wide = paddleW > CFG.PADDLE_BASE_W;
    const pr = wide ? 60 : 0;
    const pg = wide ? 255 : 200;
    const pb = wide ? 180 : 60;
    // Glow
    p.fill(pr, pg, pb, 40);
    p.rectMode(p.CENTER);
    p.rect(handX, CFG.H - 38, paddleW + 16, CFG.PADDLE_H + 10, 12);
    p.fill(pr, pg, pb);
    p.rect(handX, CFG.H - 38, paddleW, CFG.PADDLE_H, 9);
    // Shine
    p.fill(255, 255, 255, 60);
    p.rect(handX, CFG.H - 42, paddleW * 0.6, 4, 3);
    p.rectMode(p.CORNER);
  }

  function drawGameHUD(p) {
    p.textAlign(p.LEFT);
    p.fill(100, 200, 255, 200);
    p.textSize(12);
    p.text(
      `MÀN ${currentLevel}  |  ĐIỂM: ${score}  |  BÓNG: ${balls.length}`,
      10, 22
    );
    if (paddleWideTimer > 0) {
      p.fill(80, 255, 200, 160);
      p.textSize(10);
      p.textAlign(p.CENTER);
      p.text(`Paddle mở rộng: ${paddleWideTimer.toFixed(1)}s`, CFG.W/2, CFG.H - 58);
    }
    updateHUD();
  }

  function drawBossHUD(p) {
    if (!bossObj) return;
    const barW = 300;
    const bx = CFG.W/2 - barW/2;
    const by = CFG.H - 22;
    const pct = bossObj.hp / bossObj.def.hp;
    const rgb = hexToRGB(bossObj.def.color);

    p.noStroke();
    p.fill(20, 5, 5);
    p.rect(bx, by, barW, 10, 5);
    p.fill(rgb.r, rgb.g, rgb.b);
    p.rect(bx, by, barW * pct, 10, 5);
    p.fill(rgb.r, rgb.g, rgb.b, 80);
    p.rect(bx, by, barW, 10, 5);

    p.fill(255, 80, 80);
    p.textAlign(p.CENTER);
    p.textSize(10);
    p.text(`⚡ ${bossObj.def.name} — HP: ${bossObj.hp}/${bossObj.def.hp}`, CFG.W/2, by - 5);
  }

  function drawProgressBar(p, cx, cy, w, val, max) {
    const pct = Math.min(val / max, 1);
    p.noStroke();
    p.fill(20, 30, 25);
    p.rect(cx - w/2, cy, w, 8, 4);
    p.fill(0, 220, 80);
    p.rect(cx - w/2, cy, w * pct, 8, 4);
  }

  /* ------ POWER-UP APPLICATION ------ */
  function applyPowerUp(pu) {
    playSound(powerUpSound);
    if (pu.type === "MULTIBALL") {
      const len = balls.length;
      for (let k = 0; k < len && balls.length < CFG.MAX_BALLS; k++) {
        balls.push(new Ball(balls[k].x, balls[k].y, true));
      }
    } else if (pu.type === "WIDE") {
      paddleW = Math.min(paddleW + 40, 210);
      paddleWideTimer = 9;
    } else if (pu.type === "SLOW") {
      balls.forEach(b => { b.vx *= 0.72; b.vy *= 0.72; });
    }
  }

}); // end p5


/* ============================================================
   CLASS: BALL
   ============================================================ */
class Ball {
  constructor(x, y, spread) {
    this.x = x !== undefined ? x : CFG.W / 2;
    this.y = y !== undefined ? y : CFG.H / 2 - 40;
    const spd = CFG.LEVEL_BALL_SPEED[currentLevel - 1];
    this.vx = spread ? (Math.random() - 0.5) * spd * 1.4 : (Math.random() - 0.5) * spd * 0.8;
    this.vy = -spd;
    this.r = CFG.BALL_R;
    this.trail = [];
  }

  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 7) this.trail.shift();
    this.x += this.vx;
    this.y += this.vy;
    const spd = Math.hypot(this.vx, this.vy);
    if (spd > 16) { this.vx = (this.vx / spd) * 16; this.vy = (this.vy / spd) * 16; }
    if (this.x - this.r < 0)     { this.x = this.r;         this.vx = Math.abs(this.vx); }
    if (this.x + this.r > CFG.W) { this.x = CFG.W - this.r; this.vx = -Math.abs(this.vx); }
    if (this.y - this.r < 0)     { this.y = this.r;         this.vy = Math.abs(this.vy); }
    if (this.y + this.r > CFG.H) {
      if (godMode) {
        this.y = CFG.H - this.r;
        this.vy = -Math.abs(this.vy);
      }
    }
  }

  show(p) {
    for (let i = 0; i < this.trail.length; i++) {
      const a = (i / this.trail.length) * 120;
      const sz = this.r * 0.9 * (i / this.trail.length);
      p.noStroke();
      p.fill(80, 220, 255, a);
      p.circle(this.trail[i].x, this.trail[i].y, sz * 2);
    }
    p.noStroke();
    p.fill(100, 230, 255);
    p.circle(this.x, this.y, this.r * 2);
    p.fill(200, 255, 255, 180);
    p.circle(this.x - this.r * 0.28, this.y - this.r * 0.28, this.r * 0.55);
  }

  checkPaddle(px, py, pw) {
    if (
      this.vy > 0 &&
      this.y + this.r > py - CFG.PADDLE_H / 2 &&
      this.y + this.r < py + CFG.PADDLE_H &&
      this.x > px - pw / 2 &&
      this.x < px + pw / 2
    ) {
      this.vy = -Math.abs(this.vy) * (1 + currentLevel * 0.02);
      const diff = (this.x - px) / (pw / 2);
      this.vx = diff * (5 + currentLevel * 0.5);
      this.y = py - CFG.PADDLE_H / 2 - this.r - 1;
      playSound(hitPaddleSound);
    }
  }

  hitBrick(b) {
    const bL = b.x - b.w/2, bR = b.x + b.w/2;
    const bT = b.y - b.h/2, bB = b.y + b.h/2;
    if (this.x + this.r < bL || this.x - this.r > bR) return false;
    if (this.y + this.r < bT || this.y - this.r > bB) return false;
    const oL = (this.x + this.r) - bL, oR = bR - (this.x - this.r);
    const oT = (this.y + this.r) - bT, oB = bB - (this.y - this.r);
    const minH = Math.min(oL, oR), minV = Math.min(oT, oB);
    if (minH < minV) { this.vx *= -1; this.x += oL < oR ? -minH : minH; }
    else             { this.vy *= -1; this.y += oT < oB ? -minV : minV; }
    playSound(hitBrickSound);
    return true;
  }

  offScreen() { return this.y - this.r > CFG.H + 20; }
}

/* ============================================================
   CLASS: BOSS
   ============================================================ */
class Boss {
  constructor(def) {
    this.def      = def;
    this.hp       = def.hp;
    this.x        = CFG.W / 2;
    this.y        = 100;
    this.dx       = def.moveSpeed;
    this.shootTimer = 0;
    this.hitFlash = 0;
    this.phase    = 0;
    this.shield   = [];
    // Init shield bricks
    for (let i = 0; i < 5; i++) {
      this.shield.push({
        x: this.x - 120 + i * 60,
        y: this.y + def.size.h/2 + 20,
        hp: 2,
        active: true,
      });
    }
  }

  update(p) {
    this.phase += 0.04;
    this.x += this.dx;
    if (this.x + this.def.size.w/2 > CFG.W - 10 || this.x - this.def.size.w/2 < 10) {
      this.dx *= -1;
    }
    // Update shield positions
    for (let i = 0; i < this.shield.length; i++) {
      this.shield[i].x = this.x - 120 + i * 60;
      this.shield[i].y = this.y + this.def.size.h/2 + 22;
    }

    this.shootTimer++;
    if (this.shootTimer >= this.def.shootInterval) {
      this.shootTimer = 0;
      this.shoot();
    }
    if (this.hitFlash > 0) this.hitFlash--;
  }

  shoot() {
    // Shoot at paddle position
    const angle = Math.atan2((CFG.H - 38) - this.y, handX - this.x);
    const spd = this.def.bulletSpeed;
    bossBullets.push(new BossBullet(this.x, this.y + this.def.size.h/2 + 5, Math.cos(angle) * spd, Math.sin(angle) * spd, this.def.color));
    // Extra bullets on low hp
    if (this.hp < this.def.hp * 0.4) {
      bossBullets.push(new BossBullet(this.x - 30, this.y + this.def.size.h/2 + 5, Math.cos(angle-0.3)*spd, Math.sin(angle-0.3)*spd, this.def.color));
      bossBullets.push(new BossBullet(this.x + 30, this.y + this.def.size.h/2 + 5, Math.cos(angle+0.3)*spd, Math.sin(angle+0.3)*spd, this.def.color));
    }
  }

  checkHit(ball) {
    // Shield check first
    for (let s of this.shield) {
      if (!s.active) continue;
      if (ball.hitBrick({ x: s.x, y: s.y, w: 50, h: 18 })) {
        s.hp--;
        if (s.hp <= 0) s.active = false;
        return false; // shield absorbs
      }
    }
    // Boss body
    const bL = this.x - this.def.size.w/2, bR = this.x + this.def.size.w/2;
    const bT = this.y - this.def.size.h/2, bB = this.y + this.def.size.h/2;
    if (ball.x + ball.r < bL || ball.x - ball.r > bR) return false;
    if (ball.y + ball.r < bT || ball.y - ball.r > bB) return false;
    ball.vy *= -1;
    ball.y = bT - ball.r - 1;
    this.hitFlash = 8;
    playSound(hitBossSound);
    return true;
  }

  show(p) {
    const rgb = hexToRGB(this.def.color);
    const pulse = Math.abs(Math.sin(this.phase));
    const flash = this.hitFlash > 0;

    // Aura
    p.noStroke();
    p.fill(rgb.r, rgb.g, rgb.b, 20 + pulse * 30);
    p.ellipse(this.x, this.y, this.def.size.w + 40 + pulse * 20, this.def.size.h + 20 + pulse * 10);

    // Body
    p.fill(flash ? 255 : rgb.r, flash ? 255 : rgb.g, flash ? 255 : rgb.b);
    p.rectMode(p.CENTER);
    p.rect(this.x, this.y, this.def.size.w, this.def.size.h, 8);

    // Outline
    p.stroke(rgb.r, rgb.g, rgb.b, 200 + pulse * 55);
    p.strokeWeight(2.5);
    p.noFill();
    p.rect(this.x, this.y, this.def.size.w + 6, this.def.size.h + 6, 10);
    p.noStroke();

    // Emoji
    p.fill(255);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(22);
    p.text(this.def.emoji, this.x, this.y);

    // Shield bricks
    for (let s of this.shield) {
      if (!s.active) continue;
      const sr = hexToRGB("#ff0033");
      p.fill(sr.r * 0.6, sr.g * 0.1, sr.b * 0.1);
      p.rect(s.x, s.y, 50, 18, 3);
      p.stroke(255, 0, 50, 180);
      p.strokeWeight(1.5);
      p.noFill();
      p.rect(s.x, s.y, 50, 18, 3);
      p.noStroke();
      p.fill(255, 80, 80, 200);
      p.textSize(9);
      p.text("SHIELD", s.x, s.y);
    }

    p.rectMode(p.CORNER);
  }
}

/* ============================================================
   CLASS: BOSS BULLET
   ============================================================ */
class BossBullet {
  constructor(x, y, vx, vy, color) {
    this.x = x; this.y = y;
    this.vx = vx; this.vy = vy;
    this.color = color;
    this.phase = 0;
  }
  update() { this.x += this.vx; this.y += this.vy; this.phase += 0.2; }
  show(p) {
    const rgb = hexToRGB(this.color);
    const pulse = Math.abs(Math.sin(this.phase));
    p.noStroke();
    p.fill(rgb.r, rgb.g, rgb.b, 60 + pulse * 80);
    p.circle(this.x, this.y, 14 + pulse * 4);
    p.fill(rgb.r, rgb.g, rgb.b);
    p.circle(this.x, this.y, 7);
  }
}

/* ============================================================
   CLASS: BRICK
   ============================================================ */
class Brick {
  constructor(x, y, w, h, hp, color, hasItem) {
    this.x = x + w/2; this.y = y + h/2;
    this.w = w; this.h = h;
    this.hp = hp; this.maxHp = hp;
    this.color = color; this.hasItem = hasItem;
    this.glow = Math.random() * Math.PI * 2;
  }
  show(p) {
    const rgb = hexToRGB(this.color);
    const ratio = this.hp / this.maxHp;
    const r2 = Math.floor(rgb.r * (0.35 + 0.65 * ratio));
    const g2 = Math.floor(rgb.g * (0.35 + 0.65 * ratio));
    const b2 = Math.floor(rgb.b * (0.35 + 0.65 * ratio));
    p.noStroke();
    p.fill(r2, g2, b2);
    p.rectMode(p.CENTER);
    p.rect(this.x, this.y, this.w, this.h, 4);
    p.stroke(rgb.r, rgb.g, rgb.b, 160);
    p.strokeWeight(1.5);
    p.noFill();
    p.rect(this.x, this.y, this.w, this.h, 4);
    p.noStroke();
    if (this.hp > 1) {
      p.fill(255, 225);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(11);
      p.text(this.hp, this.x, this.y);
    }
    if (this.hasItem) {
      this.glow += 0.09;
      const alpha = Math.abs(Math.sin(this.glow)) * 200 + 55;
      p.stroke(255, 215, 0, alpha);
      p.strokeWeight(2.5);
      p.noFill();
      p.rect(this.x, this.y, this.w + 5, this.h + 5, 6);
      p.noStroke();
      p.fill(255, 215, 0, alpha);
      p.circle(this.x + this.w/2 - 5, this.y - this.h/2 + 5, 7);
    }
    p.rectMode(p.CORNER);
  }
}

/* ============================================================
   CLASS: POWERUP
   ============================================================ */
const PU_DEFS = [
  { type: "MULTIBALL", label: "X2",  color: "#ff44ff" },
  { type: "WIDE",      label: "⬌",   color: "#44ffff" },
  { type: "SLOW",      label: "~",    color: "#44ff88" },
];
class PowerUp {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.vy = CFG.POWERUP_SPEED;
    this.phase = 0;
    const def = PU_DEFS[Math.floor(Math.random() * PU_DEFS.length)];
    this.type = def.type; this.label = def.label; this.color = def.color;
  }
  update() { this.y += this.vy; this.phase += 0.1; }
  show(p) {
    const rgb = hexToRGB(this.color);
    const pulse = Math.abs(Math.sin(this.phase));
    p.noFill();
    p.stroke(rgb.r, rgb.g, rgb.b, 90 + pulse * 120);
    p.strokeWeight(2);
    p.circle(this.x, this.y, 30 + pulse * 7);
    p.noStroke();
    p.fill(rgb.r, rgb.g, rgb.b);
    p.circle(this.x, this.y, 24);
    p.fill(0, 0, 0, 220);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(10);
    p.text(this.label, this.x, this.y);
  }
  checkCatch(px, py) {
    return Math.abs(this.x - px) < CFG.PADDLE_BASE_W/2 + 15 && Math.abs(this.y - py) < 22;
  }
}

/* ============================================================
   CLASS: PARTICLE
   ============================================================ */
class Particle {
  constructor(x, y, color) {
    const rgb = hexToRGB(color);
    this.x = x + (Math.random()-0.5)*30;
    this.y = y + (Math.random()-0.5)*10;
    this.vx = (Math.random()-0.5)*7;
    this.vy = (Math.random()-0.5)*7 - 2;
    this.life = 1;
    this.decay = 0.03 + Math.random()*0.04;
    this.r = rgb.r; this.g = rgb.g; this.b = rgb.b;
    this.size = Math.random()*4 + 2;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    this.vy += 0.18; this.vx *= 0.97;
    this.life -= this.decay;
  }
  show(p) {
    p.noStroke();
    p.fill(this.r, this.g, this.b, this.life * 255);
    p.circle(this.x, this.y, this.size * this.life * 2);
  }
  dead() { return this.life <= 0; }
}

/* ============================================================
   UTILITIES (global scope)
   ============================================================ */
function hexToRGB(hex) {
  return { r: parseInt(hex.slice(1,3),16), g: parseInt(hex.slice(3,5),16), b: parseInt(hex.slice(5,7),16) };
}
function spawnParticles(x, y, color, n=8) {
  for (let i = 0; i < n; i++) particles.push(new Particle(x, y, color));
}
