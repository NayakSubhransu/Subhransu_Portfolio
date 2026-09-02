"use client";

import { useEffect, useRef, useCallback } from "react";

const EMERALD = { r: 120,  g: 185, b: 129 };
const INDIGO  = { r: 179,  g: 102, b: 241 };
const CYAN    = { r: 250,  g: 211, b: 238 };

const isMob = () => typeof window !== "undefined" && window.innerWidth < 768;

function lc(a: {r:number;g:number;b:number}, b: {r:number;g:number;b:number}, t: number) {
  return { r: Math.round(a.r+(b.r-a.r)*t), g: Math.round(a.g+(b.g-a.g)*t), b: Math.round(a.b+(b.b-a.b)*t) };
}
function rgba(c: {r:number;g:number;b:number}, a: number) {
  return `rgba(${c.r},${c.g},${c.b},${Math.min(1,Math.max(0,a)).toFixed(3)})`;
}
function nodeColor(ct: number) {
  return ct < 0.5 ? lc(EMERALD, INDIGO, ct*2) : lc(INDIGO, EMERALD, (ct-0.5)*2);
}

interface NetNode {
  x: number; y: number; vx: number; vy: number;
  r: number; alpha: number; ct: number;
  isPulse: boolean; phase: number; phaseSpeed: number;
  // turbulence offset for organic flow
  noiseOffset: number; noiseSpeed: number;
}

// Data-stream packet travelling along an edge
interface Packet {
  fromIdx: number; toIdx: number;
  progress: number; speed: number; col: {r:number;g:number;b:number};
}

export default function GlobalNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef  = useRef<NetNode[]>([]);
  const packetsRef = useRef<Packet[]>([]);
  const mouseRef  = useRef({ x: -9999, y: -9999, down: false });
  const rafRef    = useRef<number>(0);
  const dimRef    = useRef({ w: 0, h: 0 });
  const timeRef   = useRef(0);

  const buildNodes = useCallback((w: number, h: number, count: number): NetNode[] =>
    Array.from({ length: count }, (_, i) => {
      // ── SPEED: base velocity 1.2–2.4 px/frame (was 0.20) ──
      const angle = Math.random() * Math.PI * 2;
      const spd   = 1.2 + Math.random() * 1.2;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        r: 1.2 + Math.random() * 2.2,
        alpha: 0.30 + Math.random() * 0.25,
        ct: i / count,
        isPulse: i % 7 === 0,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.04 + Math.random() * 0.04,  // faster pulse
        noiseOffset: Math.random() * 1000,
        noiseSpeed: 0.008 + Math.random() * 0.006,
      };
    })
  , []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mobile = isMob();
    const COUNT   = mobile ? 30  : 100;
    const CONN_R  = mobile ? 130 : 165;
    const REPEL_R = mobile ? 100 : 200;
    const MAX_SPD = mobile ? .8 : 2.0;
    // No friction clamp — nodes drift freely, just soft-bounded
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      dimRef.current = { w, h };
      canvas.width  = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      nodesRef.current = buildNodes(w, h, COUNT);
      packetsRef.current = [];
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Input ─────────────────────────────────────────────────────────────────
    const onMM = (e: MouseEvent) => { mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY; };
    const onMD = () => { mouseRef.current.down = true; };
    const onMU = () => { mouseRef.current.down = false; };
    const onTM = (e: TouchEvent) => { mouseRef.current.x = e.touches[0].clientX; mouseRef.current.y = e.touches[0].clientY; };
    const onTS = (e: TouchEvent) => { mouseRef.current.x = e.touches[0].clientX; mouseRef.current.y = e.touches[0].clientY; mouseRef.current.down = true; };
    const onTE = () => { mouseRef.current.down = false; setTimeout(() => { mouseRef.current.x = -9999; mouseRef.current.y = -9999; }, 500); };
    window.addEventListener("mousemove",  onMM, { passive: true });
    window.addEventListener("mousedown",  onMD);
    window.addEventListener("mouseup",    onMU);
    window.addEventListener("touchmove",  onTM, { passive: true });
    window.addEventListener("touchstart", onTS, { passive: true });
    window.addEventListener("touchend",   onTE);

    // ── Spawn data-stream packets randomly along connected edges ──────────────
    const spawnPacket = () => {
      const nodes = nodesRef.current;
      if (nodes.length < 2) return;
      // pick a random close pair
      const ai = Math.floor(Math.random() * nodes.length);
      const a  = nodes[ai];
      for (let attempt = 0; attempt < 8; attempt++) {
        const bi = Math.floor(Math.random() * nodes.length);
        if (bi === ai) continue;
        const b = nodes[bi];
        if (Math.hypot(b.x - a.x, b.y - a.y) < CONN_R) {
          const ct = (a.ct + b.ct) / 2;
          packetsRef.current.push({
            fromIdx: ai, toIdx: bi,
            progress: 0,
            speed: 0.022 + Math.random() * 0.028,   // traverses edge in ~35–50 frames
            col: ct < 0.33 ? EMERALD : ct < 0.66 ? INDIGO : CYAN,
          });
          break;
        }
      }
      // keep pool bounded
      if (packetsRef.current.length > (mobile ? 18 : 40)) {
        packetsRef.current.splice(0, 1);
      }
    };

    // spawn a new packet every ~8 frames
    let spawnTick = 0;

    // ── Draw loop ─────────────────────────────────────────────────────────────
    const draw = () => {
      const { w, h } = dimRef.current;
      const { x: mx, y: my, down } = mouseRef.current;
      const nodes = nodesRef.current;
      const t = ++timeRef.current;

      ctx.clearRect(0, 0, w, h);

      // ── Wave ripple effect — two sine waves sweep the field ───────────────
      // Used as a brightness modulator per node (subtle, additive)
      const wave1 = Math.sin(t * 0.018) * 0.5 + 0.5;  // 0..1 slow pulse
      const wave2 = Math.sin(t * 0.031 + 1.4) * 0.5 + 0.5;

      // ── Physics ───────────────────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.phase += n.phaseSpeed;
        n.noiseOffset += n.noiseSpeed;

        // Turbulence: gentle sinusoidal steering to keep paths organic
        const turbX = Math.sin(n.noiseOffset * 1.3 + i * 0.7) * 0.06;
        const turbY = Math.cos(n.noiseOffset * 1.1 + i * 0.5) * 0.06;
        n.vx += turbX;
        n.vy += turbY;

        // Mouse interaction
        if (mx > -9000) {
          const dx = n.x - mx, dy = n.y - my;
          const dist = Math.hypot(dx, dy);
          if (down) {
            // attract
            n.vx += (mx - n.x) * 0.0006;
            n.vy += (my - n.y) * 0.0006;
          } else if (dist < REPEL_R && dist > 0.1) {
            // repel — stronger push than before
            const force = 22000 / (dist * dist + 200);
            n.vx += (dx / dist) * force * 0.012;
            n.vy += (dy / dist) * force * 0.012;
          }
        }

        // Speed cap — higher ceiling than before so nodes feel fast
        const spd = Math.hypot(n.vx, n.vy);
        if (spd > MAX_SPD) { n.vx = (n.vx / spd) * MAX_SPD; n.vy = (n.vy / spd) * MAX_SPD; }

        // Very light friction — just enough to prevent infinite acceleration
        n.vx *= 0.992;
        n.vy *= 0.992;

        n.x += n.vx;
        n.y += n.vy;

        // Wrap around edges (no boundary push — nodes teleport to opposite side,
        // keeping the field uniformly populated and always in motion)
        if (n.x < -20)    n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20)    n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      // ── Edges ─────────────────────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist > CONN_R) continue;

          const proximity = 1 - dist / CONN_R;
          // Wave modulation: edge brightness pulses with the global wave
          const waveMod = 0.75 + wave1 * 0.18 + wave2 * 0.07;
          const edgeAlpha = proximity * 0.45 * waveMod;
          const ct  = (a.ct + b.ct) / 2;
          const col = nodeColor(ct);

          // Cursor highlight
          const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
          const mDist = mx > -9000 ? Math.hypot(midX - mx, midY - my) : 9999;
          const hl    = mDist < 160 ? 1 + (1 - mDist / 160) * 2.2 : 1;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = rgba(col, Math.min(edgeAlpha * hl, 0.9));
          ctx.lineWidth   = 0.5 + proximity * 0.9;
          ctx.stroke();
        }
      }

      // ── Data-stream packets ───────────────────────────────────────────────
      spawnTick++;
      if (spawnTick % 8 === 0) spawnPacket();

      packetsRef.current = packetsRef.current.filter(p => {
        const from = nodes[p.fromIdx];
        const to   = nodes[p.toIdx];
        if (!from || !to) return false;

        p.progress += p.speed;
        if (p.progress >= 1) return false;

        const px = from.x + (to.x - from.x) * p.progress;
        const py = from.y + (to.y - from.y) * p.progress;
        const pa = 1 - Math.abs(p.progress - 0.5) * 2; // fade in/out

        // Glow
        const gr = ctx.createRadialGradient(px, py, 0, px, py, 8);
        gr.addColorStop(0, rgba(p.col, pa * 0.9));
        gr.addColorStop(1, rgba(p.col, 0));
        ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = gr; ctx.fill();

        // Core bright dot
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = rgba(p.col, pa); ctx.fill();

        // Short trailing comet tail
        const tailX = from.x + (to.x - from.x) * Math.max(0, p.progress - 0.08);
        const tailY = from.y + (to.y - from.y) * Math.max(0, p.progress - 0.08);
        const tailGr = ctx.createLinearGradient(tailX, tailY, px, py);
        tailGr.addColorStop(0, rgba(p.col, 0));
        tailGr.addColorStop(1, rgba(p.col, pa * 0.55));
        ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(px, py);
        ctx.strokeStyle = tailGr; ctx.lineWidth = 1.8; ctx.stroke();

        return true;
      });

      // ── Nodes ─────────────────────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const n   = nodes[i];
        const col = nodeColor(n.ct);

        const pulse  = n.isPulse ? 1 + Math.sin(n.phase) * 0.5 : 1;
        const r      = n.r * pulse;
        const nDist  = mx > -9000 ? Math.hypot(n.x - mx, n.y - my) : 9999;
        const prox   = nDist < 110 ? 1 + (1 - nDist / 110) * 2.8 : 1;
        const waveB  = 0.85 + wave1 * 0.1 + wave2 * 0.05;
        const fa     = Math.min(n.alpha * prox * waveB, 1);

        // Glow
        const glowR = r * (n.isPulse ? 5.5 : 3.8) * prox;
        const grd   = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        grd.addColorStop(0, rgba(col, fa * (n.isPulse ? 0.35 : 0.18)));
        grd.addColorStop(1, rgba(col, 0));
        ctx.beginPath(); ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();

        // Core dot
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(col, fa); ctx.fill();

        // Expanding pulse ring
        if (n.isPulse) {
          const ringA = (0.5 + Math.sin(n.phase) * 0.5) * 0.55;
          const ringR = r + 3 + Math.sin(n.phase) * 2;
          ctx.beginPath(); ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(CYAN, ringA);
          ctx.lineWidth = 0.9; ctx.stroke();
        }
      }

      // ── Cursor indicator ──────────────────────────────────────────────────
      if (mx > -9000 && mx > 0 && mx < w && my > 0 && my < h) {
        const cc = down ? CYAN : EMERALD;
        const ca = down ? 0.85 : 0.55;
        const cr = down ? 8 : 5;
        const cgrd = ctx.createRadialGradient(mx, my, 0, mx, my, REPEL_R * 0.5);
        cgrd.addColorStop(0, rgba(cc, 0.07));
        cgrd.addColorStop(1, rgba(cc, 0));
        ctx.beginPath(); ctx.arc(mx, my, REPEL_R * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = cgrd; ctx.fill();
        ctx.beginPath(); ctx.arc(mx, my, cr, 0, Math.PI * 2);
        ctx.fillStyle = rgba(cc, ca); ctx.fill();
        const arm = 16, gap = cr + 4;
        ctx.strokeStyle = rgba(cc, ca * 0.6); ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(mx-arm,my); ctx.lineTo(mx-gap,my);
        ctx.moveTo(mx+gap,my); ctx.lineTo(mx+arm,my);
        ctx.moveTo(mx,my-arm); ctx.lineTo(mx,my-gap);
        ctx.moveTo(mx,my+gap); ctx.lineTo(mx,my+arm);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMM);
      window.removeEventListener("mousedown",  onMD);
      window.removeEventListener("mouseup",    onMU);
      window.removeEventListener("touchmove",  onTM);
      window.removeEventListener("touchstart", onTS);
      window.removeEventListener("touchend",   onTE);
    };
  }, [buildNodes]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed", inset: 0,
        width: "100vw", height: "100vh",
        zIndex: 0, pointerEvents: "none",
        opacity: 0.35,
      }}
    />
  );
}
