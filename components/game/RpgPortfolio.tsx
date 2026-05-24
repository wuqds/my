"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PixelCertificateImage from "@/components/game/PixelCertificateImage";
import {
  certificates,
  contact,
  personalInfo,
  quests,
  skills,
  timeline,
  internships,
  type Certificate,
  type Quest,
} from "@/data/personal-data";

const MAP_WIDTH = 3180;
const MAP_HEIGHT = 2060;
const PLAYER_SIZE = 58;
const INTERACT_RADIUS = 260;

type Position = {
  x: number;
  y: number;
};

type WorldArea = {
  id: "about" | "skills" | "quests" | "certificates" | "contact";
  label: string;
  subtitle: string;
  icon: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone: string;
};

type WorldPickup = {
  id: string;
  label: string;
  reward: string;
  icon: string;
  kind: "chest" | "crystal" | "scroll" | "medal";
  x: number;
  y: number;
  xp: number;
};

const WORLD_AREAS: WorldArea[] = [
  {
    id: "about",
    label: "关于我",
    subtitle: "CHARACTER HOUSE",
    icon: "🏠",
    x: 320,
    y: 270,
    w: 620,
    h: 540,
    tone: "#41b883",
  },
  {
    id: "skills",
    label: "技能工坊",
    subtitle: "SKILL FORGE",
    icon: "⚒️",
    x: 1320,
    y: 230,
    w: 620,
    h: 560,
    tone: "#f2b84b",
  },
  {
    id: "quests",
    label: "项目任务板",
    subtitle: "QUEST GUILD",
    icon: "📜",
    x: 2180,
    y: 520,
    w: 760,
    h: 720,
    tone: "#8db5ff",
  },
  {
    id: "certificates",
    label: "证书墙",
    subtitle: "TROPHY WALL",
    icon: "🏆",
    x: 1270,
    y: 1240,
    w: 760,
    h: 620,
    tone: "#f0d25f",
  },
  {
    id: "contact",
    label: "联络驿站",
    subtitle: "MAIL STATION",
    icon: "📬",
    x: 350,
    y: 1280,
    w: 570,
    h: 470,
    tone: "#f49ac2",
  },
];

const WORLD_PICKUPS: WorldPickup[] = [
  {
    id: "profile-badge",
    label: "角色铭牌",
    reward: "个人档案碎片",
    icon: "◆",
    kind: "medal",
    x: 720,
    y: 940,
    xp: 60,
  },
  {
    id: "forge-spark",
    label: "工坊火种",
    reward: "技能熟练度 +1",
    icon: "✦",
    kind: "crystal",
    x: 1630,
    y: 900,
    xp: 80,
  },
  {
    id: "quest-scroll",
    label: "任务卷轴",
    reward: "项目线索解锁",
    icon: "▣",
    kind: "scroll",
    x: 2490,
    y: 1320,
    xp: 90,
  },
  {
    id: "trophy-star",
    label: "奖杯星尘",
    reward: "证书墙高亮",
    icon: "★",
    kind: "medal",
    x: 1710,
    y: 1950,
    xp: 100,
  },
  {
    id: "mail-stamp",
    label: "驿站邮票",
    reward: "联络坐标记录",
    icon: "✉",
    kind: "scroll",
    x: 640,
    y: 1840,
    xp: 70,
  },
  {
    id: "database-core",
    label: "数据核心",
    reward: "后端经验 +1",
    icon: "◇",
    kind: "chest",
    x: 1180,
    y: 1120,
    xp: 90,
  },
  {
    id: "ai-rune",
    label: "AI 符文",
    reward: "大模型魔法 +1",
    icon: "✧",
    kind: "crystal",
    x: 2260,
    y: 430,
    xp: 110,
  },
  {
    id: "deploy-kit",
    label: "部署工具箱",
    reward: "上线能力 +1",
    icon: "▰",
    kind: "chest",
    x: 980,
    y: 1460,
    xp: 90,
  },
];

const TREE_POINTS = Array.from({ length: 70 }, (_, i) => ({
  x: 80 + ((i * 317) % 2980),
  y: 90 + ((i * 193) % 1860),
  type: i % 3,
}));

const ROCK_POINTS = Array.from({ length: 32 }, (_, i) => ({
  x: 130 + ((i * 431) % 2850),
  y: 120 + ((i * 277) % 1780),
  type: i % 2,
}));

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function areaCenter(area: WorldArea): Position {
  return {
    x: area.x + area.w / 2,
    y: area.y + area.h + 68,
  };
}

function keyName(key: string) {
  const normalized = key.toLowerCase();
  if (normalized === "arrowup" || normalized === "w") return "up";
  if (normalized === "arrowdown" || normalized === "s") return "down";
  if (normalized === "arrowleft" || normalized === "a") return "left";
  if (normalized === "arrowright" || normalized === "d") return "right";
  return "";
}

function getNearbyArea(player: Position, threshold = INTERACT_RADIUS): WorldArea | null {
  for (const area of WORLD_AREAS) {
    const entrance = areaCenter(area);
    const centerX = entrance.x;
    const centerY = entrance.y;
    const dx = player.x - centerX;
    const dy = player.y - centerY;
    if (Math.hypot(dx, dy) < threshold) {
      return area;
    }
  }
  return null;
}

export default function RpgPortfolio() {
  const [player, setPlayer] = useState<Position>({ x: 650, y: 900 });
  const [viewport, setViewport] = useState({ w: 1280, h: 760 });
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [areaModal, setAreaModal] = useState<WorldArea | null>(null);
  const [visitedAreas, setVisitedAreas] = useState<Set<WorldArea["id"]>>(() => new Set());
  const [collectedPickups, setCollectedPickups] = useState<Set<string>>(() => new Set());
  const [toast, setToast] = useState("探索目标：拜访据点，收集地图上的像素宝物");
  const keysRef = useRef(new Set<string>());
  const targetRef = useRef<Position | null>(null);
  const lastFrameRef = useRef(0);
  const animationRef = useRef(0);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scale = viewport.w < 560 ? 0.64 : viewport.w < 900 ? 0.78 : 1;
  const hasModalOpen = Boolean(selectedCert || selectedQuest || areaModal);
  const earnedXp =
    visitedAreas.size * 120 +
    WORLD_PICKUPS.filter((pickup) => collectedPickups.has(pickup.id)).reduce(
      (total, pickup) => total + pickup.xp,
      0,
    );
  const completion = Math.round(
    ((visitedAreas.size + collectedPickups.size) / (WORLD_AREAS.length + WORLD_PICKUPS.length)) * 100,
  );

  const activeArea = useMemo(() => {
    const inside = WORLD_AREAS.find(
      (area) =>
        player.x >= area.x - 110 &&
        player.x <= area.x + area.w + 110 &&
        player.y >= area.y - 110 &&
        player.y <= area.y + area.h + 160,
    );

    if (inside) return inside;

    return WORLD_AREAS.reduce((nearest, area) => {
      const currentCenter = areaCenter(area);
      const nearestCenter = areaCenter(nearest);
      const currentDistance = Math.hypot(player.x - currentCenter.x, player.y - currentCenter.y);
      const nearestDistance = Math.hypot(player.x - nearestCenter.x, player.y - nearestCenter.y);
      return currentDistance < nearestDistance ? area : nearest;
    }, WORLD_AREAS[0]);
  }, [player]);

  const nearbyArea = useMemo(() => getNearbyArea(player), [player]);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToast(""), 2600);
  }, []);

  const collectPickup = useCallback(
    (pickup: WorldPickup) => {
      setCollectedPickups((current) => {
        if (current.has(pickup.id)) return current;
        const next = new Set(current);
        next.add(pickup.id);
        return next;
      });

      if (!collectedPickups.has(pickup.id)) {
        showToast(`获得 ${pickup.label}：${pickup.reward} / EXP +${pickup.xp}`);
      }
    },
    [collectedPickups, showToast],
  );

  const openArea = useCallback(
    (area: WorldArea) => {
      setAreaModal(area);
      setVisitedAreas((current) => {
        if (current.has(area.id)) return current;
        const next = new Set(current);
        next.add(area.id);
        return next;
      });

      if (!visitedAreas.has(area.id)) {
        showToast(`发现据点：${area.label} / EXP +120`);
      }
    },
    [showToast, visitedAreas],
  );

  const camera = useMemo(() => {
    const visibleW = viewport.w / scale;
    const visibleH = viewport.h / scale;
    const verticalFocus = activeArea.h >= 600 ? 0.9 : 0.78;
    return {
      x: clamp(player.x - visibleW / 2, 0, Math.max(0, MAP_WIDTH - visibleW)),
      y: clamp(player.y - visibleH * verticalFocus, 0, Math.max(0, MAP_HEIGHT - visibleH)),
    };
  }, [activeArea.h, player, scale, viewport.h, viewport.w]);

  useEffect(() => {
    const resize = () => {
      setViewport({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const handleDown = (event: KeyboardEvent) => {
      const key = keyName(event.key);
      if (key) {
        keysRef.current.add(key);
        event.preventDefault();
        return;
      }
      if (
        (event.key === "e" || event.key === "E" || event.key === "Enter") &&
        nearbyArea &&
        !areaModal &&
        !selectedCert &&
        !selectedQuest
      ) {
        openArea(nearbyArea);
        event.preventDefault();
      }
    };

    const handleUp = (event: KeyboardEvent) => {
      const key = keyName(event.key);
      if (!key) return;
      keysRef.current.delete(key);
      event.preventDefault();
    };

    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, [nearbyArea, areaModal, selectedCert, selectedQuest, openArea]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const tick = (now: number) => {
      const delta = lastFrameRef.current ? Math.min(34, now - lastFrameRef.current) / 16.67 : 1;
      lastFrameRef.current = now;

      setPlayer((current) => {
        const keys = keysRef.current;
        let xAxis = 0;
        let yAxis = 0;

        if (keys.size > 0) {
          targetRef.current = null;
          xAxis = Number(keys.has("right")) - Number(keys.has("left"));
          yAxis = Number(keys.has("down")) - Number(keys.has("up"));
        } else if (targetRef.current) {
          const distanceX = targetRef.current.x - current.x;
          const distanceY = targetRef.current.y - current.y;
          const distance = Math.hypot(distanceX, distanceY);
          if (distance < 5) {
            targetRef.current = null;
            return current;
          }
          xAxis = distanceX / distance;
          yAxis = distanceY / distance;
        }

        if (xAxis === 0 && yAxis === 0) return current;

        const length = Math.hypot(xAxis, yAxis) || 1;
        const speed = 5.2 * delta;
        return {
          x: clamp(current.x + (xAxis / length) * speed, 40, MAP_WIDTH - 40),
          y: clamp(current.y + (yAxis / length) * speed, 40, MAP_HEIGHT - 40),
        };
      });

      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  useEffect(() => {
    if (hasModalOpen) return;

    const nearbyPickup = WORLD_PICKUPS.find(
      (pickup) =>
        !collectedPickups.has(pickup.id) &&
        Math.hypot(player.x - pickup.x, player.y - pickup.y) < 62,
    );

    if (nearbyPickup) collectPickup(nearbyPickup);
  }, [collectPickup, collectedPickups, hasModalOpen, player]);

  useEffect(() => {
    if (!selectedCert && !selectedQuest && !areaModal) return;

    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCert(null);
        setSelectedQuest(null);
        setAreaModal(null);
      }
    };

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [selectedCert, selectedQuest, areaModal]);

  const moveToArea = (area: WorldArea) => {
    targetRef.current = {
      x: clamp(areaCenter(area).x, 40, MAP_WIDTH - 40),
      y: clamp(areaCenter(area).y, 40, MAP_HEIGHT - 40),
    };
  };

  const handleWorldClick = () => {
    // 禁用鼠标点击地图移动
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    // 禁用滚轮移动
  };

  const pressPad = (direction: string, pressed: boolean) => {
    if (pressed) keysRef.current.add(direction);
    else keysRef.current.delete(direction);
  };

  return (
    <main className="rpg-shell" onWheel={handleWheel}>
      <div className="rpg-sky" />

      <header className="rpg-hud">
        <button className="rpg-brand" onClick={() => moveToArea(WORLD_AREAS[0])}>
          <span className="rpg-brand-mark">WJX</span>
          <span>
            <strong>{personalInfo.name}</strong>
            <em>Lv.{personalInfo.level} / {activeArea.label}</em>
          </span>
        </button>

        <nav className="rpg-nav" aria-label="地图区域">
          {WORLD_AREAS.map((area) => (
            <button
              key={area.id}
              className={`rpg-nav-btn ${activeArea.id === area.id ? "is-active" : ""}`}
              onClick={() => moveToArea(area)}
              data-rpg-area={area.id}
              style={{ "--area-tone": area.tone } as React.CSSProperties}
            >
              <span>{area.icon}</span>
              <strong>{area.label}</strong>
            </button>
          ))}
        </nav>
      </header>

      <div className="rpg-map-viewport">
        <div
          className="rpg-camera"
          onClick={handleWorldClick}
          style={{
            width: MAP_WIDTH,
            height: MAP_HEIGHT,
            transform: `translate3d(${-camera.x * scale}px, ${-camera.y * scale}px, 0) scale(${scale})`,
          }}
        >
          <MapTerrain />

          {WORLD_PICKUPS.map((pickup) => (
            <WorldPickupNode
              key={pickup.id}
              pickup={pickup}
              collected={collectedPickups.has(pickup.id)}
              onCollect={() => collectPickup(pickup)}
            />
          ))}

          {WORLD_AREAS.map((area) => (
            <WorldZone
              key={area.id}
              area={area}
              active={activeArea.id === area.id}
              nearby={nearbyArea?.id === area.id}
              visited={visitedAreas.has(area.id)}
              onInteract={() => openArea(area)}
            />
          ))}

          <Player position={player} />
        </div>
      </div>

      <aside className="rpg-progress-hud">
        <div className="rpg-progress-head">
          <span>探索日志</span>
          <strong>{completion}%</strong>
        </div>
        <div className="rpg-progress-bar">
          <span style={{ width: `${completion}%` }} />
        </div>
        <div className="rpg-xp-line">EXP {earnedXp}</div>
        <ul>
          <li className={visitedAreas.size === WORLD_AREAS.length ? "is-done" : ""}>
            据点 {visitedAreas.size}/{WORLD_AREAS.length}
          </li>
          <li className={collectedPickups.size === WORLD_PICKUPS.length ? "is-done" : ""}>
            宝物 {collectedPickups.size}/{WORLD_PICKUPS.length}
          </li>
          <li className={nearbyArea && !hasModalOpen ? "is-active" : ""}>靠近招牌按 E</li>
        </ul>
      </aside>

      {toast && <div className="rpg-toast">{toast}</div>}

      <aside
        className="rpg-dialogue"
        style={{ "--area-tone": activeArea.tone } as React.CSSProperties}
      >
        {nearbyArea && !hasModalOpen ? (
          <>
            <div className="rpg-dialogue-face">{nearbyArea.icon}</div>
            <div>
              <span>{nearbyArea.subtitle}</span>
              <strong>按 E 或点击招牌进入 {nearbyArea.label}</strong>
            </div>
          </>
        ) : (
          <>
            <div className="rpg-dialogue-face">{activeArea.icon}</div>
            <div>
              <span>{activeArea.subtitle}</span>
              <strong>{activeArea.label}</strong>
            </div>
          </>
        )}
      </aside>

      <div className="rpg-dpad" aria-label="移动控制">
        <span />
        <PadButton direction="up" label="上" onPress={(pressed) => pressPad("up", pressed)}>
          ▲
        </PadButton>
        <span />
        <PadButton direction="left" label="左" onPress={(pressed) => pressPad("left", pressed)}>
          ◀
        </PadButton>
        <span className="rpg-dpad-core" />
        <PadButton direction="right" label="右" onPress={(pressed) => pressPad("right", pressed)}>
          ▶
        </PadButton>
        <span />
        <PadButton direction="down" label="下" onPress={(pressed) => pressPad("down", pressed)}>
          ▼
        </PadButton>
        <span />
      </div>

      <div id="rpg-vanilla-modal" />

      {areaModal && (
        <GameModal
          title={areaModal.label}
          badge={areaModal.subtitle}
          onClose={() => setAreaModal(null)}
        >
          {areaModal.id === "about" && <AboutModal />}
          {areaModal.id === "skills" && <SkillsModal />}
          {areaModal.id === "quests" && (
            <QuestsModal
              onSelect={(quest) => {
                setAreaModal(null);
                setSelectedQuest(quest);
              }}
            />
          )}
          {areaModal.id === "certificates" && (
            <CertificatesModal
              onSelect={(cert) => {
                setAreaModal(null);
                setSelectedCert(cert);
              }}
            />
          )}
          {areaModal.id === "contact" && <ContactModal />}
        </GameModal>
      )}

      {selectedCert && (
        <GameModal title={selectedCert.name} badge={selectedCert.prize} onClose={() => setSelectedCert(null)}>
          <div className="rpg-modal-cert">
            <PixelCertificateImage src={selectedCert.image} alt={selectedCert.name} detail />
            <dl>
              <div>
                <dt>赛道</dt>
                <dd>{selectedCert.scope}</dd>
              </div>
              <div>
                <dt>年份</dt>
                <dd>{selectedCert.year}</dd>
              </div>
              <div>
                <dt>队伍</dt>
                <dd>{selectedCert.team}</dd>
              </div>
            </dl>
            <p>{selectedCert.desc}</p>
          </div>
        </GameModal>
      )}

      {selectedQuest && (
        <GameModal title={selectedQuest.name} badge={selectedQuest.period} onClose={() => setSelectedQuest(null)}>
          <div className="rpg-modal-quest">
            <div className={`rpg-rarity-chip rarity-${selectedQuest.rarity}`}>
              {selectedQuest.rarity.toUpperCase()}
            </div>
            <p>{selectedQuest.description}</p>
            <div className="rpg-modal-tags">
              {selectedQuest.techStack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        </GameModal>
      )}
    </main>
  );
}

function WorldZone({
  area,
  active,
  nearby,
  visited,
  onInteract,
}: {
  area: WorldArea;
  active: boolean;
  nearby: boolean;
  visited: boolean;
  onInteract: () => void;
}) {
  const marker = areaCenter(area);

  return (
    <section
      id={area.id}
      className={`rpg-zone rpg-zone-${area.id} ${active ? "is-active" : ""} ${nearby ? "is-nearby" : ""} ${visited ? "is-visited" : ""}`}
      style={{
        left: marker.x - 96,
        top: marker.y - 112,
        "--area-tone": area.tone,
      } as React.CSSProperties}
      onClick={(event) => event.stopPropagation()}
    >
      <button className="rpg-zone-sign" onClick={onInteract} data-rpg-area={area.id}>
        <span>{area.icon}</span>
        <strong>{area.label}</strong>
        <em>{area.subtitle}</em>
        {visited && <i>VISITED</i>}
      </button>
    </section>
  );
}

function WorldPickupNode({
  pickup,
  collected,
  onCollect,
}: {
  pickup: WorldPickup;
  collected: boolean;
  onCollect: () => void;
}) {
  return (
    <button
      className={`rpg-pickup rpg-pickup-${pickup.kind} ${collected ? "is-collected" : ""}`}
      style={{ left: pickup.x - 25, top: pickup.y - 42 } as React.CSSProperties}
      onClick={(event) => {
        event.stopPropagation();
        if (!collected) onCollect();
      }}
      aria-label={collected ? `${pickup.label} 已收集` : `收集 ${pickup.label}`}
      title={collected ? `${pickup.label} 已收集` : `${pickup.label}：${pickup.reward}`}
    >
      <span>{pickup.icon}</span>
      <strong>{pickup.label}</strong>
    </button>
  );
}

function MapTerrain() {
  return (
    <>
      <div className="rpg-ground" />
      <div className="rpg-water rpg-water-lake" />
      <div className="rpg-water rpg-water-river" />
      <div className="rpg-path rpg-path-a" />
      <div className="rpg-path rpg-path-b" />
      <div className="rpg-path rpg-path-c" />
      <div className="rpg-path rpg-path-d" />
      <div className="rpg-cliff rpg-cliff-left" />
      <div className="rpg-cliff rpg-cliff-right" />

      {TREE_POINTS.map((tree, index) => (
        <span
          key={`tree-${index}`}
          className={`rpg-tree rpg-tree-${tree.type}`}
          style={{ left: tree.x, top: tree.y }}
        />
      ))}

      {ROCK_POINTS.map((rock, index) => (
        <span
          key={`rock-${index}`}
          className={`rpg-rock rpg-rock-${rock.type}`}
          style={{ left: rock.x, top: rock.y }}
        />
      ))}
    </>
  );
}

function Player({ position }: { position: Position }) {
  return (
    <div
      className="rpg-player"
      style={{
        left: position.x - PLAYER_SIZE / 2,
        top: position.y - PLAYER_SIZE,
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
      }}
    >
      <img src="images/avatar_pixel_32.png" alt="吴家鑫 像素角色" />
      <span className="rpg-player-shadow" />
    </div>
  );
}

function AboutModal() {
  return (
    <div className="rpg-modal-about">
      <div className="rpg-about-grid">
        <div className="rpg-portrait">
          <img src={personalInfo.avatar} alt={personalInfo.name} />
          <strong>{personalInfo.nameEn}</strong>
          <span>{personalInfo.classText}</span>
        </div>

        <div className="rpg-textbox">
          <h1>{personalInfo.name}</h1>
          <h2>{personalInfo.title}</h2>
          <p>{personalInfo.bio}</p>
        </div>

        <ul className="rpg-info-list">
          <li>
            <span>学院</span>
            <strong>{personalInfo.school}</strong>
          </li>
          <li>
            <span>学号</span>
            <strong>{personalInfo.studentId}</strong>
          </li>
          <li>
            <span>周期</span>
            <strong>{personalInfo.period}</strong>
          </li>
        </ul>

        <ol className="rpg-timeline">
          {timeline.map((item) => (
            <li key={item.year}>
              <span>{item.year}</span>
              <strong>{item.title}</strong>
            </li>
          ))}
        </ol>
      </div>

      <div className="rpg-internship-section">
        <h3>🎒 实习经历</h3>
        <ul className="rpg-internship-list">
          {internships.map((item, index) => (
            <li key={index} className="rpg-internship-card">
              <div className="rpg-internship-header">
                <strong>{item.company}</strong>
                <span>{item.period}</span>
              </div>
              <div className="rpg-internship-role">
                {item.role} · {item.type}
              </div>
              <p>{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SkillsModal() {
  return (
    <div className="rpg-modal-skills">
      <div className="rpg-skill-list">
        {skills.map((skill) => (
          <div
            className="rpg-skill-row"
            key={skill.name}
            style={{ "--skill-color": skill.color, "--skill-level": `${skill.level * 10}%` } as React.CSSProperties}
          >
            <div className="rpg-skill-title">
              <span>{skill.icon}</span>
              <strong>{skill.name}</strong>
              <em>{skill.level}/10</em>
            </div>
            <div className="rpg-skill-bar">
              <span />
            </div>
            <p>{skill.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestsModal({ onSelect }: { onSelect: (quest: Quest) => void }) {
  return (
    <div className="rpg-modal-quests">
      <div className="rpg-quest-board">
        {quests.map((quest) => (
          <button
            key={quest.name}
            className={`rpg-quest-pin rarity-${quest.rarity}`}
            onClick={() => onSelect(quest)}
            data-quest-name={quest.name}
            data-quest-desc={quest.description}
            data-quest-period={quest.period}
            data-quest-rarity={quest.rarity}
            data-quest-tech={quest.techStack.join("|")}
          >
            <span>{quest.icon}</span>
            <strong>{quest.name}</strong>
            <em>{quest.period}</em>
            <small>{quest.techStack.slice(0, 3).join(" / ")}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

function CertificatesModal({ onSelect }: { onSelect: (cert: Certificate) => void }) {
  return (
    <div className="rpg-modal-certificates">
      <div className="rpg-certificate-wall">
        {certificates.map((cert) => (
          <button
            key={cert.id}
            className={`rpg-certificate-tile rarity-${cert.rarity}`}
            onClick={() => onSelect(cert)}
            data-cert-name={cert.name}
            data-cert-desc={cert.desc}
            data-cert-prize={cert.prize}
            data-cert-scope={cert.scope}
            data-cert-year={cert.year}
            data-cert-team={cert.team}
            data-cert-image={cert.image}
          >
            <span className="rpg-certificate-icon">{cert.icon}</span>
            <PixelCertificateImage src={cert.image} alt={cert.name} />
            <strong>{cert.name}</strong>
            <em>{cert.prize}</em>
          </button>
        ))}
      </div>
    </div>
  );
}

function ContactModal() {
  const links = [
    { label: "邮箱", value: contact.email, href: `mailto:${contact.email}`, icon: "✉" },
    { label: "电话", value: contact.phone, href: `tel:${contact.phone.replace(/-/g, "")}`, icon: "☎" },
    { label: "地点", value: contact.location, href: "", icon: "⌖" },
  ];

  return (
    <div className="rpg-modal-contact">
      <h2>{personalInfo.motto}</h2>
      <div className="rpg-contact-links">
        {links.map((link) => {
          const content = (
            <>
              <span>{link.icon}</span>
              <strong>{link.label}</strong>
              <em>{link.value}</em>
            </>
          );
          return link.href ? (
            <a href={link.href} key={link.label}>
              {content}
            </a>
          ) : (
            <div key={link.label}>{content}</div>
          );
        })}
      </div>
      <p>
        {personalInfo.name} · Pixel RPG Portfolio · 2026
      </p>
    </div>
  );
}

function PadButton({
  children,
  direction,
  label,
  onPress,
}: {
  children: React.ReactNode;
  direction: string;
  label: string;
  onPress: (pressed: boolean) => void;
}) {
  return (
    <button
      aria-label={label}
      data-rpg-pad={direction}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        onPress(true);
      }}
      onPointerUp={() => onPress(false)}
      onPointerCancel={() => onPress(false)}
      onPointerLeave={() => onPress(false)}
    >
      {children}
    </button>
  );
}

function GameModal({
  title,
  badge,
  children,
  onClose,
}: {
  title: string;
  badge: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="rpg-modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <article className="rpg-modal-card" onWheel={(event) => event.stopPropagation()}>
        <button className="rpg-modal-close" onClick={onClose} aria-label="关闭">
          ×
        </button>
        <div className="rpg-modal-title">
          <span>{badge}</span>
          <h2>{title}</h2>
        </div>
        {children}
      </article>
    </div>
  );
}
