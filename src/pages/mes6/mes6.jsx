import { useState, useEffect, useRef, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ─── INYECCIÓN DE ESTILOS ─────────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("m6v5-st")) return;
  const s = document.createElement("style");
  s.id = "m6v5-st";
  s.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;0,900;1,300;1,400;1,600;1,700;1,900&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

    /* ══════════════════════════════════════
       PALETA OSCURO — azul medianoche · rosa peonía · dorado
       ══════════════════════════════════════ */
    .m6v5.dark {
      --bg:        #04060f;
      --rose:      #f02d7d; --rose2: #ff6baa; --rose3: rgba(240,45,125,0.14);
      --navy:      #0a1628; --navy2: #0f1f3d;
      --gold:      #d4a843; --gold2: #f0cc78; --gold3: rgba(212,168,67,0.12);
      --cream:     #f0e8f4; --muted: rgba(240,232,244,0.42); --muted2: rgba(240,232,244,0.2);
      --glass:     rgba(255,255,255,0.04); --glass2: rgba(255,255,255,0.08);
      --brd:       rgba(255,255,255,0.07); --brd-r: rgba(240,45,125,0.25); --brd-g: rgba(212,168,67,0.2);
      --nav-bg:    rgba(4,6,15,0.85);
      --card:      rgba(10,22,40,0.6);
      --paper:     #070d1c; --paper2: #0a1220;
      --ink:       #f0e8f4; --ink2: rgba(240,232,244,0.6);
    }

    /* ══════════════════════════════════════
       PALETA CLARO — lavanda claro · rosa · dorado suave
       ══════════════════════════════════════ */
    .m6v5.light {
      --bg:        #f4f0fa;
      --rose:      #c01060; --rose2: #e04080; --rose3: rgba(192,16,96,0.1);
      --navy:      #e8e0f5; --navy2: #ddd4f0;
      --gold:      #a07015; --gold2: #c09030; --gold3: rgba(160,112,21,0.1);
      --cream:     #150520; --muted: rgba(21,5,32,0.5); --muted2: rgba(21,5,32,0.28);
      --glass:     rgba(255,255,255,0.65); --glass2: rgba(255,255,255,0.85);
      --brd:       rgba(0,0,0,0.08); --brd-r: rgba(192,16,96,0.22); --brd-g: rgba(160,112,21,0.18);
      --nav-bg:    rgba(244,240,250,0.9);
      --card:      rgba(255,255,255,0.72);
      --paper:     #fff8fd; --paper2: #fef0f8;
      --ink:       #150520; --ink2: rgba(21,5,32,0.6);
    }

    .m6v5 { min-height:100vh; font-family:'DM Sans',sans-serif; color:var(--cream); overflow-x:hidden; position:relative; }

    /* ══════════════════════════════════════ LOCK SCREEN ══════════════════════════════════════ */
    .lock-screen {
      position:fixed; inset:0; z-index:9999;
      display:flex; align-items:center; justify-content:center;
      padding:2rem; overflow:hidden;
    }
    .lock-bg {
      position:absolute; inset:0;
      background: radial-gradient(ellipse 80% 70% at 50% 0%, rgba(240,45,125,0.22) 0%, transparent 55%),
                  radial-gradient(ellipse 70% 80% at 0% 100%, rgba(10,22,40,0.9) 0%, transparent 60%),
                  radial-gradient(ellipse 60% 60% at 100% 50%, rgba(212,168,67,0.12) 0%, transparent 55%),
                  #040610;
    }
    /* estrellitas de fondo en el lock */
    .lock-stars { position:absolute; inset:0; overflow:hidden; pointer-events:none; }
    .lock-star {
      position:absolute; border-radius:50%; background:#fff;
      animation:lstar var(--dur,4s) ease-in-out infinite alternate;
    }
    @keyframes lstar { 0%{opacity:0.1;transform:scale(0.7)} 100%{opacity:0.9;transform:scale(1.2)} }

    .lock-grain {
      position:absolute; inset:0; pointer-events:none; opacity:0.045;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size:160px;
    }

    .lock-card {
      position:relative; z-index:2;
      max-width:360px; width:100%;
      background:rgba(10,18,35,0.75);
      border:1px solid rgba(240,45,125,0.2);
      border-radius:28px;
      padding:3rem 2.2rem 2.5rem;
      backdrop-filter:blur(30px);
      box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06);
      text-align:center;
    }
    /* línea degradada arriba */
    .lock-card::before {
      content:''; position:absolute; top:0; left:15%; right:15%; height:1px;
      background:linear-gradient(90deg,transparent,rgba(240,45,125,0.7),rgba(212,168,67,0.5),transparent);
      border-radius:999px;
    }

    .lock-icon-wrap {
      width:80px; height:80px; border-radius:50%; margin:0 auto 1.8rem;
      background:radial-gradient(circle at 38% 32%, rgba(255,107,170,0.3), rgba(240,45,125,0.15));
      border:1px solid rgba(240,45,125,0.3);
      display:flex; align-items:center; justify-content:center;
      position:relative;
      animation:lock-breath 4s ease-in-out infinite;
      box-shadow:0 0 40px rgba(240,45,125,0.2);
    }
    @keyframes lock-breath { 0%,100%{box-shadow:0 0 30px rgba(240,45,125,0.18)} 50%{box-shadow:0 0 60px rgba(240,45,125,0.38)} }
    .lock-icon-wrap::after {
      content:''; position:absolute; inset:-8px; border-radius:50%;
      border:1px solid rgba(240,45,125,0.15);
      animation:lock-ring 4s ease-in-out infinite;
    }
    @keyframes lock-ring { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.08);opacity:0.2} }
    .lock-icon { font-size:2.2rem; }

    .lock-title {
      font-family:'Cormorant Garamond',serif; font-style:italic; font-weight:700;
      font-size:1.9rem; line-height:1.1;
      background:linear-gradient(135deg,#fff 0%,var(--rose2,#ff6baa) 50%,var(--gold2,#f0cc78) 100%);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      margin-bottom:0.6rem;
    }
    .lock-subtitle {
      font-family:'Cormorant Garamond',serif; font-style:italic;
      font-size:0.98rem; color:rgba(240,232,244,0.45); line-height:1.6;
      margin-bottom:2.2rem;
    }

    .lock-input-wrap { position:relative; margin-bottom:1.2rem; }
    .lock-input {
      width:100%; padding:1rem 3rem 1rem 1.3rem;
      background:rgba(255,255,255,0.05);
      border:1px solid rgba(240,45,125,0.25);
      border-radius:14px;
      color:#f0e8f4; font-family:'DM Mono',monospace; font-size:0.88rem;
      letter-spacing:0.12em; text-align:center;
      outline:none; transition:all 0.35s;
      box-shadow:inset 0 2px 8px rgba(0,0,0,0.3);
    }
    .lock-input::placeholder { color:rgba(240,232,244,0.28); letter-spacing:0.08em; }
    .lock-input:focus { border-color:rgba(240,45,125,0.55); background:rgba(240,45,125,0.06); box-shadow:0 0 0 3px rgba(240,45,125,0.1),inset 0 2px 8px rgba(0,0,0,0.2); }
    .lock-input.error { border-color:rgba(255,80,80,0.6); animation:lock-shake 0.4s ease; }
    @keyframes lock-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
    .lock-eye {
      position:absolute; right:1rem; top:50%; transform:translateY(-50%);
      background:none; border:none; cursor:pointer; color:rgba(240,232,244,0.35);
      font-size:0.9rem; padding:0.2rem; transition:color 0.3s;
    }
    .lock-eye:hover { color:rgba(240,45,125,0.8); }

    .lock-error-msg {
      font-family:'DM Mono',monospace; font-size:0.58rem; letter-spacing:0.15em;
      color:rgba(255,100,100,0.8); text-transform:uppercase; margin-bottom:1rem;
      min-height:1rem;
    }

    .lock-btn {
      width:100%; padding:1rem 2rem; border-radius:50px;
      background:linear-gradient(135deg,#f02d7d,#a01850);
      border:none; cursor:pointer; color:#fff;
      font-family:'DM Sans',sans-serif; font-size:0.9rem; font-weight:600;
      letter-spacing:0.06em;
      box-shadow:0 8px 28px rgba(240,45,125,0.4);
      transition:all 0.35s; position:relative; overflow:hidden;
    }
    .lock-btn::after {
      content:''; position:absolute; inset:0;
      background:linear-gradient(135deg,rgba(255,255,255,0.12),transparent);
      pointer-events:none;
    }
    .lock-btn:hover { transform:translateY(-2px); box-shadow:0 14px 40px rgba(240,45,125,0.55); }
    .lock-btn:active { transform:translateY(0); }
    .lock-btn:disabled { opacity:0.6; transform:none; cursor:not-allowed; }

    .lock-hint {
      font-family:'DM Mono',monospace; font-size:0.52rem;
      letter-spacing:0.18em; color:rgba(240,232,244,0.22); text-transform:uppercase;
      margin-top:1.5rem;
    }

    /* línea dorada decorativa */
    .lock-divider {
      display:flex; align-items:center; gap:0.8rem; margin:1.8rem 0;
    }
    .lock-divider-line { flex:1; height:1px; background:linear-gradient(90deg,transparent,rgba(212,168,67,0.3)); }
    .lock-divider-line.r { background:linear-gradient(270deg,transparent,rgba(212,168,67,0.3)); }
    .lock-divider-icon { font-size:0.85rem; opacity:0.5; color:#d4a843; }

    /* ══════════════════════════════════════ FONDO PÁGINA ══════════════════════════════════════ */
    .m6v5-bg { position:fixed; inset:0; z-index:0; pointer-events:none; }
    .m6v5.dark  .m6v5-bg { background: radial-gradient(ellipse 75% 55% at 20% 8%,  rgba(240,45,125,0.16) 0%,transparent 50%), radial-gradient(ellipse 65% 65% at 85% 85%, rgba(10,22,40,0.9) 0%,transparent 55%),  radial-gradient(ellipse 55% 50% at 55% 50%, rgba(212,168,67,0.06) 0%,transparent 60%), #04060f; }
    .m6v5.light .m6v5-bg { background: radial-gradient(ellipse 75% 55% at 20% 8%,  rgba(240,130,190,0.3)  0%,transparent 50%), radial-gradient(ellipse 65% 65% at 85% 85%, rgba(210,190,240,0.4) 0%,transparent 55%), radial-gradient(ellipse 55% 50% at 55% 50%, rgba(212,168,67,0.1)  0%,transparent 60%), #f4f0fa; }

    .m6v5-orb { position:absolute; border-radius:50%; pointer-events:none; filter:blur(80px); }
    .m6v5.dark  .m6v5-orb1 { width:62vw;height:62vw;top:-15%;left:-8%;  background:radial-gradient(circle,rgba(240,45,125,0.2)  0%,transparent 70%); animation:vorb1 17s ease-in-out infinite alternate; }
    .m6v5.dark  .m6v5-orb2 { width:55vw;height:55vw;bottom:-8%;right:-12%;background:radial-gradient(circle,rgba(10,22,40,0.95)  0%,transparent 70%); animation:vorb2 21s ease-in-out infinite alternate; }
    .m6v5.dark  .m6v5-orb3 { width:42vw;height:42vw;top:35%;left:28%;  background:radial-gradient(circle,rgba(212,168,67,0.1)   0%,transparent 70%); animation:vorb3 27s ease-in-out infinite alternate; }
    .m6v5.light .m6v5-orb1 { width:62vw;height:62vw;top:-12%;left:-8%;  background:radial-gradient(circle,rgba(240,80,160,0.28)  0%,transparent 70%); animation:vorb1 17s ease-in-out infinite alternate; }
    .m6v5.light .m6v5-orb2 { width:55vw;height:55vw;bottom:-6%;right:-10%;background:radial-gradient(circle,rgba(200,180,240,0.35) 0%,transparent 70%); animation:vorb2 21s ease-in-out infinite alternate; }
    .m6v5.light .m6v5-orb3 { width:42vw;height:42vw;top:38%;left:26%;  background:radial-gradient(circle,rgba(212,168,67,0.15)  0%,transparent 70%); animation:vorb3 27s ease-in-out infinite alternate; }
    @keyframes vorb1 { to{transform:translate(8vw,10vh) scale(1.14)} }
    @keyframes vorb2 { to{transform:translate(-8vw,-9vh) scale(1.18)} }
    @keyframes vorb3 { to{transform:translate(5vw,6vh) scale(0.82)} }

    .m6v5-grain { position:fixed; inset:0; z-index:1; pointer-events:none; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size:170px; }
    .m6v5.dark  .m6v5-grain { opacity:0.04; }
    .m6v5.light .m6v5-grain { opacity:0.016; }

    .m6v5-content { position:relative; z-index:2; }

    /* ══════════════════════════════════════ NAV ══════════════════════════════════════ */
    .m6v5-nav { display:flex; justify-content:space-between; align-items:center; padding:1.4rem 1.5rem; border-bottom:1px solid var(--brd); background:var(--nav-bg); backdrop-filter:blur(26px); position:sticky; top:0; z-index:100; }
    .m6v5-back { display:flex;align-items:center;gap:0.5rem; font-family:'DM Mono',monospace;font-size:0.6rem;letter-spacing:0.18em;color:var(--muted);text-transform:uppercase; cursor:pointer;border:none;background:none;transition:color 0.3s; }
    .m6v5-back:hover { color:var(--rose); }
    .m6v5-badge { font-family:'DM Mono',monospace;font-size:0.55rem;letter-spacing:0.2em;color:var(--rose);text-transform:uppercase; border:1px solid var(--brd-r);border-radius:4px;padding:0.22rem 0.65rem; }
    .m6v5-toggle { width:38px;height:38px;border-radius:10px;border:1px solid var(--brd-r);background:var(--glass);backdrop-filter:blur(10px); cursor:pointer;color:var(--cream);font-size:0.95rem;display:flex;align-items:center;justify-content:center;transition:all 0.3s; }
    .m6v5-toggle:hover { background:rgba(240,45,125,0.12);border-color:var(--rose); }

    /* ══════════════════════════════════════ HERO ══════════════════════════════════════ */
    .m6v5-hero { padding:4.5rem 1.5rem 2.5rem; position:relative; overflow:hidden; }
    .m6v5-eyebrow { font-family:'DM Mono',monospace;font-size:0.58rem;letter-spacing:0.32em;color:var(--gold);text-transform:uppercase; margin-bottom:1.4rem;display:flex;align-items:center;gap:0.9rem; }
    .m6v5-eyebrow::before { content:'';width:28px;height:1px;background:var(--gold); }

    .m6v5-htitle {
      font-family:'Cormorant Garamond',serif; font-weight:900; font-style:italic;
      font-size:clamp(4rem,15vw,9.5rem); line-height:0.88; display:block; margin-bottom:0.1rem;
    }
    .m6v5.dark  .m6v5-htitle { background:linear-gradient(135deg,#fff 0%,var(--rose2) 40%,var(--gold2) 100%); -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; filter:drop-shadow(0 0 40px rgba(240,45,125,0.25)); }
    .m6v5.light .m6v5-htitle { background:linear-gradient(135deg,var(--rose) 0%,#7020a0 50%,var(--gold) 100%); -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }

    .m6v5-htitle2 {
      font-family:'Cormorant Garamond',serif; font-weight:300; font-style:italic;
      font-size:clamp(2rem,8vw,5rem); line-height:0.9; display:block; margin-bottom:2.2rem;
      color:var(--muted);
    }
    /* número decorativo gigante */
    .m6v5-hero-num {
      position:absolute; top:1rem; right:-1rem;
      font-family:'Cormorant Garamond',serif; font-style:italic; font-weight:900;
      font-size:12rem; line-height:1; color:transparent; pointer-events:none; user-select:none;
    }
    .m6v5.dark  .m6v5-hero-num { -webkit-text-stroke:1px rgba(240,45,125,0.08); }
    .m6v5.light .m6v5-hero-num { -webkit-text-stroke:1px rgba(192,16,96,0.06); }

    .m6v5-date { display:inline-flex;align-items:center;gap:0.8rem; font-family:'DM Mono',monospace;font-size:0.6rem;letter-spacing:0.14em;color:var(--muted); }
    .m6v5-dot { width:6px;height:6px;border-radius:50%;background:var(--rose);animation:vdot 2s ease-in-out infinite; }
    @keyframes vdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.5)} }
    .m6v5-scroll { display:flex;flex-direction:column;align-items:center;gap:0.5rem;margin-top:2.5rem;opacity:0.35; }
    .m6v5-sline { width:1px;height:38px;background:linear-gradient(180deg,var(--rose),transparent);animation:vscroll 1.9s ease-in-out infinite; }
    @keyframes vscroll { 0%{opacity:0;transform:translateY(-8px)} 50%{opacity:1} 100%{opacity:0;transform:translateY(8px)} }
    .m6v5-stxt { font-family:'DM Mono',monospace;font-size:0.46rem;letter-spacing:0.28em;color:var(--muted);text-transform:uppercase; }

    /* ══════════════════════════════════════ STATS ══════════════════════════════════════ */
    .m6v5-stats { margin:0 1.5rem 2.5rem; display:grid; grid-template-columns:repeat(2,1fr); gap:0.7rem; }
    .m6v5-stat { background:var(--card);border:1px solid var(--brd);border-radius:18px;backdrop-filter:blur(16px); padding:1.4rem 1.2rem;text-align:center;position:relative;overflow:hidden;transition:border-color 0.3s,transform 0.2s; }
    .m6v5-stat:hover { border-color:var(--brd-r);transform:translateY(-3px); }
    .m6v5-stat::before { content:'';position:absolute;top:0;left:10%;right:10%;height:1px; background:linear-gradient(90deg,transparent,var(--rose),var(--gold),transparent);opacity:0.5; }
    .m6v5-stat::after  { content:'';position:absolute;bottom:0;left:20%;right:20%;height:1px; background:linear-gradient(90deg,transparent,rgba(212,168,67,0.3),transparent);opacity:0.4; }
    .m6v5-stat-n { font-family:'Cormorant Garamond',serif;font-weight:900;font-size:2.3rem;line-height:1; background:linear-gradient(135deg,var(--rose),var(--gold2)); -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; display:block;margin-bottom:0.4rem; }
    .m6v5-stat-l { font-family:'DM Mono',monospace;font-size:0.5rem;letter-spacing:0.18em;color:var(--muted);text-transform:uppercase; }

    /* ══════════════════════════════════════ QUOTE ══════════════════════════════════════ */
    .m6v5-quote-wrap { padding:4.5rem 1.5rem;border-top:1px solid var(--brd);border-bottom:1px solid var(--brd);position:relative;overflow:hidden; }
    .m6v5-qbg { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%); font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:900; font-size:clamp(4rem,20vw,13rem);white-space:nowrap;color:transparent;pointer-events:none;user-select:none; }
    .m6v5.dark  .m6v5-qbg { -webkit-text-stroke:1px rgba(240,45,125,0.045); }
    .m6v5.light .m6v5-qbg { -webkit-text-stroke:1px rgba(192,16,96,0.05); }
    .m6v5-quote { font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:600; font-size:clamp(1.6rem,5.5vw,2.8rem);line-height:1.35;color:var(--cream);position:relative;z-index:1; }
    .m6v5-qr  { color:var(--rose); }
    .m6v5-qg  { color:var(--gold2); }
    .m6v5-qby { font-family:'DM Mono',monospace;font-size:0.58rem;letter-spacing:0.2em;color:var(--muted);text-transform:uppercase;margin-top:1.5rem;display:flex;align-items:center;gap:0.7rem; }
    .m6v5-qby::before { content:'—';color:var(--rose); }

    /* ══════════════════════════════════════ SECTION LABEL ══════════════════════════════════════ */
    .m6v5-sec { font-family:'DM Mono',monospace;font-size:0.55rem;letter-spacing:0.3em;color:var(--gold);text-transform:uppercase; margin-bottom:2rem;display:flex;align-items:center;gap:1rem; }
    .m6v5-sec::after { content:'';flex:1;height:1px;background:var(--brd); }

    /* ══════════════════════════════════════ TIMELINE ══════════════════════════════════════ */
    .m6v5-moments { padding:3rem 1.5rem 2rem; }
    .m6v5-tl { position:relative; padding-left:1.6rem; }
    .m6v5-tl::before { content:'';position:absolute;left:0;top:8px;bottom:8px;width:1px; background:linear-gradient(180deg,transparent 0%,var(--rose) 20%,var(--gold) 55%,var(--rose2) 80%,transparent 100%); }
    .m6v5-mom { position:relative;padding:0 0 2.5rem 1.5rem;cursor:pointer; }
    .m6v5-mom-dot { position:absolute;left:-2rem;top:5px;width:12px;height:12px;border-radius:50%; border:2px solid var(--rose);background:var(--bg);transition:all 0.35s; }
    .m6v5-mom.open .m6v5-mom-dot,.m6v5-mom:hover .m6v5-mom-dot { background:var(--rose);box-shadow:0 0 0 5px rgba(240,45,125,0.18); }
    .m6v5-mom-lbl { font-family:'DM Mono',monospace;font-size:0.52rem;letter-spacing:0.2em;color:var(--rose);text-transform:uppercase;margin-bottom:0.35rem; }
    .m6v5-mom-title { font-family:'Cormorant Garamond',serif;font-weight:600;font-size:1.22rem;color:var(--cream);margin-bottom:0.2rem; }
    .m6v5-mom-body { font-size:0.88rem;font-weight:300;color:var(--muted);line-height:1.72; max-height:0;overflow:hidden;opacity:0;transition:max-height 0.55s cubic-bezier(0.22,1,0.36,1),opacity 0.4s ease; }
    .m6v5-mom.open .m6v5-mom-body { max-height:220px;opacity:1; }

    /* ══════════════════════════════════════ RAZONES ══════════════════════════════════════ */
    .m6v5-reasons { padding:1rem 1.5rem 3rem; }
    .m6v5-rgrid { display:grid;grid-template-columns:repeat(2,1fr);gap:0.7rem; }
    .m6v5-reason { background:var(--card);border:1px solid var(--brd);border-radius:18px;backdrop-filter:blur(14px); padding:1.4rem 1.2rem;position:relative;overflow:hidden;transition:border-color 0.3s,transform 0.25s; }
    .m6v5-reason:hover { border-color:var(--brd-r);transform:translateY(-3px); }
    .m6v5-reason::before { content:'';position:absolute;inset:0;border-radius:18px; background:linear-gradient(140deg,rgba(240,45,125,0.07) 0%,transparent 55%);pointer-events:none; }
    .m6v5-reason-icon { font-size:1.4rem;display:block;margin-bottom:0.55rem; }
    .m6v5-reason-num { font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.9rem;font-weight:900; color:var(--brd-r);line-height:1;display:block;margin-bottom:0.45rem; }
    .m6v5-reason-text { font-size:0.82rem;color:var(--cream);line-height:1.55; }

    /* ══════════════════════════════════════ MÚSICA ══════════════════════════════════════ */
    .m6v5-music { padding:2rem 1.5rem 3rem; }
    .m6v5-music-intro { font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.12rem; color:var(--muted);line-height:1.75;margin-bottom:2rem; }
    .m6v5-music-intro strong { color:var(--cream);font-weight:600; }

    /* contenedor playlist completo */
    .m6v5-playlist {
      border-radius:20px;
      overflow:hidden;
      border:1px solid var(--brd);
      box-shadow:0 20px 60px rgba(0,0,0,0.3);
      position:relative;
    }

    /* cabecera tipo Apple Music */
    .m6v5-pl-header {
      padding:1.6rem 1.5rem 1.4rem;
      background: linear-gradient(135deg, rgba(240,45,125,0.18) 0%, rgba(10,22,40,0.8) 60%, rgba(212,168,67,0.08) 100%);
      border-bottom:1px solid var(--brd);
      display:flex; align-items:center; gap:1.2rem;
      position:relative; overflow:hidden;
    }
    .m6v5-pl-header::before {
      content:''; position:absolute; top:0;left:0;right:0;height:1px;
      background:linear-gradient(90deg,transparent,rgba(240,45,125,0.6),rgba(212,168,67,0.4),transparent);
    }
    .m6v5-pl-cover {
      width:58px;height:58px;border-radius:12px;flex-shrink:0;
      background:linear-gradient(135deg,#f02d7d,#7020a0,#d4a843);
      display:flex;align-items:center;justify-content:center;
      font-size:1.6rem;
      box-shadow:0 6px 20px rgba(240,45,125,0.4);
    }
    .m6v5-pl-info { flex:1; }
    .m6v5-pl-tag { font-family:'DM Mono',monospace;font-size:0.5rem;letter-spacing:0.22em; color:rgba(240,45,125,0.8);text-transform:uppercase;display:block;margin-bottom:0.3rem; }
    .m6v5-pl-name { font-family:'Cormorant Garamond',serif;font-weight:700;font-style:italic; font-size:1.15rem;color:var(--cream);display:block;margin-bottom:0.15rem; }
    .m6v5-pl-count { font-family:'DM Mono',monospace;font-size:0.52rem;letter-spacing:0.1em; color:var(--muted);display:block; }

    /* lista de canciones */
    .m6v5-tracks { display:flex;flex-direction:column;background:var(--card);backdrop-filter:blur(18px); }
    .m6v5-track {
      display:flex;align-items:center;gap:1rem;
      padding:1rem 1.4rem;
      border-bottom:1px solid var(--brd);
      cursor:pointer;transition:background 0.25s,padding-left 0.25s;
      position:relative;overflow:hidden;
    }
    .m6v5-track:last-child { border-bottom:none; }
    .m6v5-track:hover { background:rgba(240,45,125,0.06);padding-left:1.8rem; }
    .m6v5-track.playing { background:rgba(240,45,125,0.1) !important;padding-left:1.8rem; }
    .m6v5-track.playing::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px; background:linear-gradient(180deg,var(--rose),var(--gold));border-radius:0 2px 2px 0; }

    .m6v5-track-idx { font-family:'DM Mono',monospace;font-size:0.6rem;color:var(--muted2); min-width:20px;text-align:center;flex-shrink:0; }
    .m6v5-track.playing .m6v5-track-idx { color:var(--rose); }

    .m6v5-track-art {
      width:42px;height:42px;border-radius:10px;flex-shrink:0;
      display:flex;align-items:center;justify-content:center;font-size:1.15rem;
      box-shadow:0 3px 12px rgba(0,0,0,0.35);
      transition:transform 0.3s;
    }
    .m6v5-track:hover .m6v5-track-art { transform:scale(1.05); }

    .m6v5-track-info { flex:1;min-width:0; }
    .m6v5-track-name { font-size:0.9rem;font-weight:500;color:var(--cream); white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;transition:color 0.3s; }
    .m6v5-track.playing .m6v5-track-name { color:var(--rose2); }
    .m6v5-track-artist { font-size:0.74rem;font-weight:300;color:var(--muted);margin-top:0.12rem;display:block; }

    .m6v5-track-right { flex-shrink:0;display:flex;align-items:center; }
    /* barras de audio animadas */
    .m6v5-bars { display:flex;align-items:flex-end;gap:2.5px;height:20px; }
    .v5bar { width:3px;border-radius:2px;background:linear-gradient(180deg,var(--rose),var(--gold)); }
    .v5bar:nth-child(1){animation:vb1 0.85s ease-in-out infinite;}
    .v5bar:nth-child(2){animation:vb2 0.65s ease-in-out infinite;}
    .v5bar:nth-child(3){animation:vb3 1.05s ease-in-out infinite;}
    .v5bar:nth-child(4){animation:vb1 0.75s ease-in-out infinite 0.1s;}
    @keyframes vb1{0%,100%{height:5px}50%{height:18px}}
    @keyframes vb2{0%,100%{height:16px}50%{height:5px}}
    @keyframes vb3{0%,100%{height:8px}50%{height:20px}}

    .v5play { width:32px;height:32px;border-radius:50%;background:var(--glass2);border:1px solid var(--brd); display:flex;align-items:center;justify-content:center;font-size:0.75rem;color:var(--muted);transition:all 0.3s; }
    .m6v5-track:hover .v5play { border-color:var(--brd-r);color:var(--rose);background:rgba(240,45,125,0.1); }

    /* embed Spotify */
    .v5embed { border-radius:0 0 20px 20px;overflow:hidden;border:1px solid var(--brd-r);border-top:none; box-shadow:0 20px 50px rgba(0,0,0,0.4); }
    .v5embed iframe { display:block;width:100%;border:none; }

    .m6v5-music-note { font-family:'Cormorant Garamond',serif;font-style:italic; font-size:0.84rem;color:var(--muted2);text-align:center;margin-top:1.2rem;line-height:1.65; }

    /* ══════════════════════════════════════ CARTA ══════════════════════════════════════ */
    .m6v5-letter-section { padding:2rem 1.5rem 3rem; }
    .m6v5-envelope { position:relative; }
    .m6v5-env-flap {
      width:100%;height:0;
      border-left:calc(50vw - 1.5rem) solid transparent;
      border-right:calc(50vw - 1.5rem) solid transparent;
      position:relative;z-index:3;
      transition:transform 0.6s cubic-bezier(0.22,1,0.36,1),opacity 0.4s;
      transform-origin:top center;cursor:pointer;
    }
    .m6v5.dark  .m6v5-env-flap { border-bottom:60px solid #0d1a32; }
    .m6v5.light .m6v5-env-flap { border-bottom:60px solid #e8d8f0; }
    .m6v5-envelope.open .m6v5-env-flap { transform:rotateX(-180deg) scaleY(-1);opacity:0;pointer-events:none; }

    .m6v5-env-body { background:var(--card);border:1px solid var(--brd-r);border-radius:0 0 22px 22px; backdrop-filter:blur(24px);overflow:hidden;position:relative; box-shadow:0 24px 70px rgba(0,0,0,0.35); }
    .m6v5-env-closed {
      padding:3rem 2rem 2.8rem;
      display:flex;flex-direction:column;align-items:center;text-align:center;gap:1.2rem;
      background:linear-gradient(160deg,rgba(240,45,125,0.08) 0%,rgba(212,168,67,0.05) 100%);
      cursor:pointer;
    }
    /* flores esquina */
    .v5fl { position:absolute;opacity:0.2;font-size:1.5rem;pointer-events:none; }
    .v5fl.tl{top:0.8rem;left:0.8rem;transform:rotate(-18deg);}
    .v5fl.tr{top:0.8rem;right:0.8rem;transform:rotate(18deg);}
    .v5fl.bl{bottom:0.8rem;left:0.8rem;transform:rotate(12deg);}
    .v5fl.br{bottom:0.8rem;right:0.8rem;transform:rotate(-12deg);}

    /* lacre mejorado */
    .m6v5-wax {
      width:72px;height:72px;border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      font-size:2rem;color:#fff;
      background:radial-gradient(circle at 38% 30%,#ff80b8,#f02d7d,#8020a0);
      box-shadow:0 8px 36px rgba(240,45,125,0.55),inset 0 -4px 10px rgba(0,0,0,0.25);
      position:relative;animation:vwax 3s ease-in-out infinite;
    }
    .m6v5-wax::before { content:'';position:absolute;inset:0;border-radius:50%; background:radial-gradient(circle at 35% 28%,rgba(255,255,255,0.25),transparent 55%);pointer-events:none; }
    .m6v5-wax::after  { content:'';position:absolute;inset:-8px;border-radius:50%; border:1px solid rgba(240,45,125,0.25);animation:vwring 3s ease-in-out infinite; }
    @keyframes vwax  { 0%,100%{box-shadow:0 8px 36px rgba(240,45,125,0.5),inset 0 -4px 10px rgba(0,0,0,0.25)} 50%{box-shadow:0 8px 55px rgba(240,45,125,0.8),inset 0 -4px 10px rgba(0,0,0,0.25)} }
    @keyframes vwring{ 0%,100%{transform:scale(1);opacity:0.55} 50%{transform:scale(1.1);opacity:0.2} }

    .m6v5-env-to  { font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.4rem;color:var(--cream); }
    .m6v5-env-hint{ font-family:'DM Mono',monospace;font-size:0.55rem;letter-spacing:0.2em;color:var(--muted);text-transform:uppercase; }

    /* papel de la carta */
    .m6v5-paper {
      position:relative;overflow:hidden;
      background:var(--paper);
    }
    .m6v5-paper::before {
      content:'';position:absolute;inset:0;pointer-events:none;opacity:0.035;
      background-image:repeating-linear-gradient(0deg,transparent,transparent 27px,rgba(240,45,125,0.6) 28px);
    }
    /* marca de agua diagonal */
    .m6v5-paper::after {
      content:'Diana';position:absolute;bottom:2rem;right:1rem;
      font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:900;
      font-size:5rem;color:transparent;pointer-events:none;user-select:none;
      transform:rotate(-18deg);transform-origin:bottom right;
      -webkit-text-stroke:1px rgba(240,45,125,0.07);
    }
    .m6v5-paper-inner { padding:2.8rem 2rem 2rem;position:relative;z-index:1; }
    .m6v5-ltr-hdr { display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2rem; }
    .m6v5-ltr-place { font-family:'DM Mono',monospace;font-size:0.54rem;letter-spacing:0.14em;color:var(--ink2); }
    .m6v5-ltr-date  { font-family:'DM Mono',monospace;font-size:0.54rem;letter-spacing:0.12em;color:var(--ink2); }
    .m6v5-ltr-salute{ font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.3rem;color:var(--gold);margin-bottom:1.5rem;display:block; }
    .m6v5-ltr-body  { font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.06rem;line-height:2;color:var(--ink); }
    .m6v5-ltr-body p { margin-bottom:1.1rem; }
    .m6v5-ltr-body p:last-child { margin-bottom:0; }
    .m6v5-ltr-flourish { text-align:center;margin:1.5rem 0;letter-spacing:0.6em;font-size:0.9rem;color:var(--rose);opacity:0.45; }
    .m6v5-ltr-sign-wrap { margin-top:2.2rem;text-align:right; }
    .m6v5-ltr-closing { font-family:'DM Mono',monospace;font-size:0.54rem;letter-spacing:0.18em;color:var(--ink2);text-transform:uppercase;margin-bottom:0.75rem;display:block; }
    .m6v5-ltr-sign   { font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:900;font-size:2rem;color:var(--rose);display:block;line-height:1; }
    .m6v5-ltr-hearts { display:flex;justify-content:flex-end;gap:0.35rem;margin-top:0.6rem; }
    .m6v5-ltr-hearts span { font-size:1rem;animation:vhf 2s ease-in-out infinite; }
    .m6v5-ltr-hearts span:nth-child(2){animation-delay:0.3s;}
    .m6v5-ltr-hearts span:nth-child(3){animation-delay:0.6s;}
    @keyframes vhf{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
    .m6v5-ltr-close { display:flex;align-items:center;justify-content:center;gap:0.5rem;width:100%;padding:0.9rem; border-top:1px solid var(--brd);background:none;color:var(--muted);cursor:pointer; font-family:'DM Mono',monospace;font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase; border-left:none;border-right:none;border-bottom:none;transition:all 0.3s; }
    .m6v5-ltr-close:hover { color:var(--rose);background:rgba(240,45,125,0.04); }

    /* ══════════════════════════════════════ SORPRESA ESTRELLA ══════════════════════════════════════ */
    .m6v5-star-section { padding:2rem 1.5rem 3rem; }
    .m6v5-star-card { border-radius:22px;border:1px solid var(--brd-r);background:var(--card);backdrop-filter:blur(22px);overflow:hidden;position:relative; }
    .m6v5-star-card::before { content:'';position:absolute;inset:0; background:linear-gradient(135deg,rgba(240,45,125,0.09) 0%,rgba(212,168,67,0.06) 50%,transparent 100%);pointer-events:none; }
    .m6v5-star-card::after  { content:'';position:absolute;top:0;left:10%;right:10%;height:1px; background:linear-gradient(90deg,transparent,rgba(240,45,125,0.5),rgba(212,168,67,0.4),transparent); }
    .m6v5-star-inner { padding:2.8rem 1.8rem;position:relative;z-index:1; }
    .m6v5-star-eb  { font-family:'DM Mono',monospace;font-size:0.54rem;letter-spacing:0.25em;color:var(--rose);text-transform:uppercase;margin-bottom:1rem; }
    .m6v5-star-title { font-family:'Cormorant Garamond',serif;font-weight:700;font-style:italic; font-size:clamp(1.9rem,7vw,3.2rem);line-height:1.15;color:var(--cream);margin-bottom:1rem; }
    .m6v5-star-desc  { font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.02rem; color:var(--muted);line-height:1.8;margin-bottom:2.2rem; }
    .m6v5-star-desc strong { color:var(--gold2);font-weight:600; }
    .m6v5-star-btn {
      display:inline-flex;align-items:center;justify-content:center;gap:0.75rem;
      width:100%;padding:1.1rem 2rem;border-radius:50px;
      background:linear-gradient(135deg,var(--rose),#7020a0);
      border:none;cursor:pointer;color:#fff;
      font-family:'DM Sans',sans-serif;font-size:0.92rem;font-weight:600;letter-spacing:0.04em;
      box-shadow:0 10px 32px rgba(240,45,125,0.42);transition:all 0.35s;
    }
    .m6v5-star-btn:hover { transform:translateY(-2px);box-shadow:0 16px 44px rgba(240,45,125,0.58); }

    /* modal estrella */
    .v5-modal-ov { position:fixed;inset:0;z-index:2000;background:rgba(0,0,0,0.88); backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:1.5rem; }
    .v5-modal {
      background:var(--paper2);border:1px solid var(--brd-r);border-radius:26px;
      padding:2.8rem 2.2rem;max-width:370px;width:100%;text-align:center;
      position:relative;overflow:hidden;
      box-shadow:0 40px 100px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.04);
    }
    .v5-modal::before { content:'';position:absolute;inset:0; background:linear-gradient(135deg,rgba(240,45,125,0.1) 0%,rgba(212,168,67,0.07) 100%);pointer-events:none; }
    .v5-modal::after  { content:'';position:absolute;top:0;left:10%;right:10%;height:1px; background:linear-gradient(90deg,transparent,rgba(240,45,125,0.6),rgba(212,168,67,0.4),transparent); }
    .v5-modal-icon  { font-size:3.8rem;display:block;margin-bottom:1.3rem;animation:vstar 3s ease-in-out infinite; }
    @keyframes vstar{0%,100%{transform:scale(1) rotate(-4deg)}50%{transform:scale(1.12) rotate(4deg)}}
    .v5-modal-title { font-family:'Cormorant Garamond',serif;font-weight:900;font-style:italic;font-size:2rem;color:var(--cream);margin-bottom:0.8rem; }
    .v5-modal-coord { font-family:'DM Mono',monospace;font-size:0.63rem;letter-spacing:0.14em;color:var(--gold);margin-bottom:1.5rem;line-height:1.9; }
    .v5-modal-text  { font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.02rem;color:var(--muted);line-height:1.85;margin-bottom:2.2rem; }
    .v5-modal-text strong { color:var(--cream);font-weight:600; }
    .v5-modal-close { display:flex;align-items:center;justify-content:center;gap:0.5rem;width:100%;padding:0.9rem; border-radius:999px;border:1px solid var(--brd-r);background:none;color:var(--muted);cursor:pointer; font-family:'DM Mono',monospace;font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;transition:all 0.3s; }
    .v5-modal-close:hover { color:var(--rose);border-color:var(--rose); }

    /* ══════════════════════════════════════ DIVISORES ══════════════════════════════════════ */
    .m6v5-div { display:flex;align-items:center;gap:1rem;padding:0.5rem 1.5rem;margin:0.5rem 0; }
    .m6v5-div-l { flex:1;height:1px;background:var(--brd); }
    .m6v5-div-i { font-size:1.05rem;opacity:0.48;animation:vdspin 14s linear infinite; }
    @keyframes vdspin { to{transform:rotate(360deg)} }

    /* ══════════════════════════════════════ FOOTER ══════════════════════════════════════ */
    .m6v5-footer { padding:2.8rem 1.5rem 4.5rem;text-align:center;border-top:1px solid var(--brd);position:relative;overflow:hidden; }
    .m6v5-fbg { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%); font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:900; font-size:clamp(3.5rem,17vw,10rem);white-space:nowrap;color:transparent;pointer-events:none;user-select:none; }
    .m6v5.dark  .m6v5-fbg { -webkit-text-stroke:1px rgba(240,45,125,0.06); }
    .m6v5.light .m6v5-fbg { -webkit-text-stroke:1px rgba(192,16,96,0.05); }
    .m6v5-fheart { font-size:2.4rem;display:block;margin-bottom:1.2rem;animation:vhb 2s ease-in-out infinite;position:relative;z-index:1; }
    @keyframes vhb{0%,100%{transform:scale(1)}14%{transform:scale(1.22)}28%{transform:scale(1)}42%{transform:scale(1.12)}70%{transform:scale(1)}}
    .m6v5-fq   { font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.2rem;color:var(--muted);line-height:1.75;position:relative;z-index:1; }
    .m6v5-fnum { font-family:'DM Mono',monospace;font-size:0.52rem;letter-spacing:0.25em;color:var(--muted2);text-transform:uppercase;margin-top:1.3rem;position:relative;z-index:1; }
  `;
  document.head.appendChild(s);
};

// ─── CANVAS PARTÍCULAS (paleta azul marino + rosa + dorado) ──────────────────
const ParticlesBg = memo(({ mode }) => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let raf;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const hues = mode === "dark"
      ? ["240,45,125", "212,168,67", "180,100,230"]
      : ["192,16,96", "160,112,21", "140,60,200"];
    const drawHeart = (ctx, s) => { ctx.beginPath(); ctx.moveTo(0, -s * .28); ctx.bezierCurveTo(s * .58, -s, s * 1.1, s * .1, 0, s * .8); ctx.bezierCurveTo(-s * 1.1, s * .1, -s * .58, -s, 0, -s * .28); ctx.closePath(); };
    const W = () => c.width, H = () => c.height;
    const pts = Array.from({ length: 45 }, () => ({ x: Math.random() * W(), y: Math.random() * H(), r: Math.random() * 1.9 + 0.5, vx: (Math.random() - .5) * .2, vy: -(Math.random() * .28 + .07), alpha: Math.random() * .4 + .08, hue: hues[Math.floor(Math.random() * hues.length)], phase: Math.random() * Math.PI * 2, isHeart: Math.random() > .68, size: Math.random() * 5.5 + 3.5 }));
    const draw = () => {
      ctx.clearRect(0, 0, W(), H());
      pts.forEach(p => { p.phase += .005; p.x += p.vx + Math.sin(p.phase) * .13; p.y += p.vy; if (p.y < -20) { p.y = H() + 10; p.x = Math.random() * W(); } if (p.x < -20) p.x = W() + 10; if (p.x > W() + 20) p.x = -10; ctx.save(); ctx.globalAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.phase)); if (p.isHeart) { ctx.translate(p.x, p.y); ctx.rotate(Math.sin(p.phase * .4) * .22); ctx.fillStyle = `rgba(${p.hue},.9)`; drawHeart(ctx, p.size); ctx.fill(); } else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${p.hue},.75)`; ctx.fill(); } ctx.restore(); });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [mode]);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }} />;
});

// ─── CANVAS PÉTALOS BURST ─────────────────────────────────────────────────────
const PetalsBurst = memo(({ active }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!active) return;
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let raf;
    c.width = window.innerWidth; c.height = window.innerHeight;
    const petals = Array.from({ length: 90 }, () => ({ x: Math.random() * c.width, y: -20, vx: (Math.random() - .5) * 4, vy: Math.random() * 3 + 1.5, r: Math.random() * 7 + 3, alpha: 1, hue: ["240,45,125", "212,168,67", "180,100,230"][Math.floor(Math.random() * 3)], rot: Math.random() * Math.PI * 2, rotv: (Math.random() - .5) * .12 }));
    const draw = () => { ctx.clearRect(0, 0, c.width, c.height); let alive = false; petals.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .06; p.rot += p.rotv; p.alpha -= .0055; if (p.alpha > 0) { alive = true; ctx.save(); ctx.globalAlpha = p.alpha; ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r / 2, 0, 0, Math.PI * 2); ctx.fillStyle = `rgba(${p.hue},1)`; ctx.fill(); ctx.restore(); } }); if (alive) raf = requestAnimationFrame(draw); };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [active]);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 999, pointerEvents: "none" }} />;
});

// ─── LOCK SCREEN STARS ────────────────────────────────────────────────────────
const LockStars = memo(() => {
  const stars = useRef(Array.from({ length: 55 }, () => ({
    x: Math.random() * 100, y: Math.random() * 100,
    s: Math.random() * 2.5 + 0.5,
    dur: (Math.random() * 5 + 2).toFixed(1) + "s",
    delay: (Math.random() * 5).toFixed(1) + "s",
    opacity: Math.random() * 0.6 + 0.1,
  }))).current;
  return (
    <div className="lock-stars">
      {stars.map((st, i) => (
        <div key={i} className="lock-star" style={{
          left: `${st.x}%`, top: `${st.y}%`,
          width: `${st.s}px`, height: `${st.s}px`,
          opacity: st.opacity,
          "--dur": st.dur,
          animationDelay: st.delay,
        }} />
      ))}
    </div>
  );
});

// ─── DATOS ────────────────────────────────────────────────────────────────────
const MOMENTS = [
  { id: 1, lbl: "Momento 01", emoji: "✨", title: "Seis meses de felicidad", body: "Contigo cada dia es mas feliz que el anterior porque cada dia nos entendemos más y eso hace todo mas facil y sencillo contigo amor mio." },
  { id: 2, lbl: "Momento 02", emoji: "🌙", title: "Las noches contigo", body: "Todas las noches que paso contigo son magicas porque con nadie mas tengo una conexión unica como la tengo contigo, puedo pasar toda la noche hablando contigo y no me daria cuenta :D" },
  { id: 3, lbl: "Momento 03", emoji: "🌺", title: "Aprendo cada dia más de ti", body: "Cada día que pasa te conozco un poco mas y puedo entender a una persona tan hermosa como tu y eso me hace feliz" },
  { id: 4, lbl: "Momento 04", emoji: "👁️", title: "Las veces que te puedo ver", body: "Puedo ser repetitivo pero creeme que cada vez que te puedo ver en persona algo dentro de mi se derrite por ti, cada dia estas mas hermosa y me gustas mas, eres mi angel caido del cielo." },
  { id: 5, lbl: "Momento 05", emoji: "💫", title: "Sueños", body: "Se que nuestros sueños son parecidos y estoy muy feliz que los podamamos realizar juntos, tengo muchas ganas de ver el hermoso futuro que nos espera y ser mas felices de lo que esperamos" },
];
const REASONS = [
  { icon: "💖", text: "Tu forma de amarme" },
  { icon: "💬", text: "Tu compañia todos los dias" },
  { icon: "🗣️", text: "La voz que me guia a ser una persona mejor" },
  { icon: "✨", text: "Lo feliz que me haces sentir" },
  { icon: "🫂", text: "Eso tan hermoso que siento al abrazarte" },
  { icon: "🌹", text: "Todo lo que aún nos falta vivir" },
];
const SONGS = [
  { id: 1, name: "Hagamos Lo Que Diga El Corazón", artist: "Grupo Niche  - Mi salsa favorita es excelente para nosotros", icon: "🎶", color: "linear-gradient(135deg,#f02d7d,#7020a0)", spotifyId: "5NR1LYf16E6K5t5AeSYP8P" },
  { id: 2, name: "¿Hasta Dónde Te Quiero?", artist: "La Rondalla De Saltillo", icon: "🎵", color: "linear-gradient(135deg,#d4a843,#a06015)", spotifyId: "1licjid99qj1BFIYGb3wZC" },
  { id: 3, name: "Amor Mio", artist: "Diego Barrera Requintista, Los Miranda", icon: "🎶", color: "linear-gradient(135deg,#7020a0,#f02d7d)", spotifyId: "04CRXU9tqLWR6UTBu5bq9P" },
  { id: 4, name: "Es Que Yo Te Quiero A Ti", artist: "Kevin Kaar", icon: "🎵", color: "linear-gradient(135deg,#f02d7d,#d4a843)", spotifyId: "6noNXh0HLbx1zWPMuhiAPt" },
  { id: 5, name: "Mi Otra Mitad", artist: "DannyLux", icon: "🎶", color: "linear-gradient(135deg,#d4a843,#f02d7d)", spotifyId: "5JQNO0rhJUdOevWVvSWjro" },
];

const PASSWORD = "diana"; // ← cambia aquí la contraseña

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function Mes6({ mode, toggleMode }) {
  const nav = useNavigate();

  // Lock
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("m6_unlocked") === "1");
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [unlocking, setUnlocking] = useState(false);

  // Página
  const [activeM, setActiveM] = useState(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [activeSong, setActiveSong] = useState(null);
  const [starOpen, setStarOpen] = useState(false);
  const [petalBurst, setPetalBurst] = useState(false);

  useEffect(() => { injectStyles(); }, []);

  // ── Unlock handler
  const handleUnlock = useCallback(() => {
    if (pwd.trim().toLowerCase() === PASSWORD) {
      setUnlocking(true);
      setTimeout(() => { sessionStorage.setItem("m6_unlocked", "1"); setUnlocked(true); }, 600);
    } else {
      setPwdError(true);
      setErrMsg("Uy no amor es el nombre mas hermoso del mundo — inténtalo de nuevo ♥");
      setTimeout(() => { setPwdError(false); setErrMsg(""); }, 2000);
      setPwd("");
    }
  }, [pwd]);

  const handleKeyDown = (e) => { if (e.key === "Enter") handleUnlock(); };

  const openStar = useCallback(() => {
    setStarOpen(true); setPetalBurst(true);
    setTimeout(() => setPetalBurst(false), 3800);
  }, []);

  const sr = (delay = 0) => ({
    initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] },
  });

  // ══════════════ LOCK SCREEN ══════════════
  if (!unlocked) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 9999, overflow: "hidden" }}>
        <div className="lock-bg" />
        <LockStars />
        <div className="lock-grain" />

        {/* Canvas de partículas también en la lock screen */}
        <ParticlesBg mode="dark" />

        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", padding: "2rem" }}>
          <motion.div
            className="lock-card"
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Icono con brillo */}
            <motion.div
              className="lock-icon-wrap"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            >
              <span className="lock-icon">🔒</span>
            </motion.div>

            <h2 className="lock-title">Para ti, Amor</h2>
            <p className="lock-subtitle">
              6 meses de felicidad pura y sincera<br />
              ¿Cúal es el primer nombre de nuestra futura hija?
            </p>

            <div className="lock-divider">
              <div className="lock-divider-line" />
              <span className="lock-divider-icon">✦</span>
              <div className="lock-divider-line r" />
            </div>

            <div className="lock-input-wrap">
              <input
                className={`lock-input${pwdError ? " error" : ""}`}
                type={showPwd ? "text" : "password"}
                placeholder="Escribe el nombre..."
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoFocus
              />
              <button className="lock-eye" onClick={() => setShowPwd(v => !v)} tabIndex={-1}>
                {showPwd ? "🙈" : "👁️"}
              </button>
            </div>

            <p className="lock-error-msg">{errMsg}</p>

            <motion.button
              className="lock-btn"
              onClick={handleUnlock}
              disabled={unlocking || !pwd}
              whileTap={{ scale: 0.97 }}
            >
              {unlocking ? "Abriendo..." : "✦ Abrir "}
            </motion.button>

            <p className="lock-hint">Solo tú y yo conocemos la respuesta ♥</p>
          </motion.div>
        </div>
      </div>
    );
  }

  // ══════════════ PÁGINA PRINCIPAL ══════════════
  return (
    <motion.div
      className={`m6v5 ${mode}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="m6v5-bg">
        <div className="m6v5-orb m6v5-orb1" /><div className="m6v5-orb m6v5-orb2" /><div className="m6v5-orb m6v5-orb3" />
      </div>
      <div className="m6v5-grain" />
      <ParticlesBg mode={mode} />
      <PetalsBurst active={petalBurst} />

      <div className="m6v5-content">

        {/* NAV */}
        <nav className="m6v5-nav">
          <button className="m6v5-back" onClick={() => nav("/")}>← Volver</button>
          <span className="m6v5-badge">✦ Mes Seis</span>
          <button className="m6v5-toggle" onClick={toggleMode}>{mode === "dark" ? "☀️" : "🌙"}</button>
        </nav>

        {/* HERO */}
        <section className="m6v5-hero">
          <div className="m6v5-hero-num">VI</div>
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}>
            <div className="m6v5-eyebrow">Capítulo seis</div>
            <span className="m6v5-htitle">Nuestro</span>
            <span className="m6v5-htitle2">amor crece</span>
          </motion.div>
          <motion.div className="m6v5-date" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.7 }}>
            <span className="m6v5-dot" />
            Mayo · 2026 · El mejor capítulo hasta ahora
          </motion.div>
          <div className="m6v5-scroll"><div className="m6v5-sline" /><span className="m6v5-stxt">Scroll</span></div>
        </section>

        {/* STATS */}
        <motion.div className="m6v5-stats" {...sr(0)}>
          {[{ n: "6", l: "Meses juntos" }, { n: "180+", l: "Días increíbles" }, { n: "∞", l: "Razones para amarte" }, { n: "1", l: "Amor verdadero" }].map((st, i) => (
            <motion.div key={i} className="m6v5-stat" {...sr(i * .07)}>
              <span className="m6v5-stat-n">{st.n}</span>
              <span className="m6v5-stat-l">{st.l}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* FRASE */}
        <motion.section className="m6v5-quote-wrap" {...sr(0)}>
          <span className="m6v5-qbg">amor</span>
          <p className="m6v5-quote">
            "Seis meses eligiéndote,{" "}<span className="m6v5-qr">y lo volvería</span>{" "}a hacer{" "}<span className="m6v5-qg">infinitas veces</span>{" "}más."
          </p>
          <div className="m6v5-qby">con todo mi amor</div>
        </motion.section>

        {/* TIMELINE */}
        <section className="m6v5-moments">
          <motion.div className="m6v5-sec" {...sr(0)}>Momentos que recuerdo</motion.div>
          <div className="m6v5-tl">
            {MOMENTS.map((m, i) => (
              <motion.div key={m.id} className={`m6v5-mom ${activeM === m.id ? "open" : ""}`}
                onClick={() => setActiveM(activeM === m.id ? null : m.id)} {...sr(i * .07)}>
                <div className="m6v5-mom-dot" />
                <div className="m6v5-mom-lbl">{m.lbl}</div>
                <div className="m6v5-mom-title">{m.emoji} {m.title}</div>
                <div className="m6v5-mom-body">{m.body}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="m6v5-div"><div className="m6v5-div-l" /><span className="m6v5-div-i">✿</span><div className="m6v5-div-l" /></div>

        {/* RAZONES */}
        <section className="m6v5-reasons">
          <motion.div className="m6v5-sec" {...sr(0)}>Razones para amarte</motion.div>
          <div className="m6v5-rgrid">
            {REASONS.map((r, i) => (
              <motion.div key={i} className="m6v5-reason" {...sr(i * .06)}>
                <span className="m6v5-reason-icon">{r.icon}</span>
                <span className="m6v5-reason-num">0{i + 1}</span>
                <p className="m6v5-reason-text">{r.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="m6v5-div"><div className="m6v5-div-l" /><span className="m6v5-div-i">♪</span><div className="m6v5-div-l" /></div>

        {/* MÚSICA */}
        <section className="m6v5-music">
          <motion.div className="m6v5-sec" {...sr(0)}>La música que te dedico a ti</motion.div>
          <motion.p className="m6v5-music-intro" {...sr(0.05)}>
            Estas canciones representan un poco lo que yo siento por ti,{" "}
            <strong>TE AMO INMENSAMENTE</strong>
          </motion.p>

          <motion.div {...sr(0.1)}>
            <div className="m6v5-playlist">
              {/* cabecera */}
              <div className="m6v5-pl-header">
                <div className="m6v5-pl-cover">🎵</div>
                <div className="m6v5-pl-info">
                  <span className="m6v5-pl-tag">♦ Playlist · Spotify</span>
                  <span className="m6v5-pl-name">Canciones para mi Amorcito</span>
                  <span className="m6v5-pl-count">{SONGS.length} canciones · Solo para ti</span>
                </div>
              </div>

              {/* tracks */}
              <div className="m6v5-tracks">
                {SONGS.map((song, i) => (
                  <div key={song.id}
                    className={`m6v5-track${activeSong === song.id ? " playing" : ""}`}
                    onClick={() => setActiveSong(activeSong === song.id ? null : song.id)}
                  >
                    <span className="m6v5-track-idx">
                      {activeSong === song.id
                        ? <div className="m6v5-bars"><div className="v5bar" /><div className="v5bar" /><div className="v5bar" /><div className="v5bar" /></div>
                        : i + 1}
                    </span>
                    <div className="m6v5-track-art" style={{ background: song.color }}>{song.icon}</div>
                    <div className="m6v5-track-info">
                      <span className="m6v5-track-name">{song.name}</span>
                      <span className="m6v5-track-artist">{song.artist}</span>
                    </div>
                    <div className="m6v5-track-right">
                      {activeSong === song.id
                        ? null
                        : <div className="v5play">▶</div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* embed */}
              <AnimatePresence>
                {activeSong && (
                  <motion.div className="v5embed"
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                    <iframe
                      src={`https://open.spotify.com/embed/track/${SONGS.find(s => s.id === activeSong)?.spotifyId}?utm_source=generator&theme=0`}
                      width="100%" height="152"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy" title="Spotify player"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <p className="m6v5-music-note">
            Toca una canción para escucharla en Spotify ♥
          </p>
        </section>

        <div className="m6v5-div"><div className="m6v5-div-l" /><span className="m6v5-div-i">✉</span><div className="m6v5-div-l" /></div>

        {/* CARTA */}
        <section className="m6v5-letter-section">
          <motion.div className="m6v5-sec" {...sr(0)}>Una carta para ti</motion.div>
          <motion.div {...sr(0.1)}>
            <div className={`m6v5-envelope${letterOpen ? " open" : ""}`}>
              {!letterOpen && <div className="m6v5-env-flap" onClick={() => setLetterOpen(true)} />}
              <div className="m6v5-env-body">
                <AnimatePresence mode="wait">
                  {!letterOpen ? (
                    <motion.div key="closed" className="m6v5-env-closed" onClick={() => setLetterOpen(true)}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}>
                      <span className="v5fl tl">✿</span><span className="v5fl tr">✿</span>
                      <span className="v5fl bl">❀</span><span className="v5fl br">❀</span>
                      <motion.div className="m6v5-wax" animate={{ scale: [1, 1.06, 1] }} transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}>♥</motion.div>
                      <p className="m6v5-env-to">Para Diana, con amor</p>
                      <span className="m6v5-env-hint">✦ Toca para abrir ✦</span>
                    </motion.div>
                  ) : (
                    <motion.div key="open"
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
                      <div className="m6v5-paper">
                        <div className="m6v5-paper-inner">
                          <div className="m6v5-ltr-hdr">
                            <span className="m6v5-ltr-place">Para mi amor,</span>
                            <span className="m6v5-ltr-date">Mayo, 2026</span>
                          </div>
                          <span className="m6v5-ltr-salute">Diana,</span>
                          <div className="m6v5-ltr-body">
                            <p>Quiero comenzar esta carta diciendote lo mucho que te amo, y la falta que me haces todos los dias por no estar cerca de mi,</p>
                            <p>Todos los dias que paso a tu lado experimento un monton de emociones pero la que resalta encima de todas esas es el amor inmenso que te tengo mi cielo</p>
                            <p>contigo he experimentado cosas que nunca pense sentir, eres unica e inigualabre mi amor si pudiera morir mañana y decidir con quien hacer mi vida la </p>
                            <p>respuesta seria contigo una y mil veces porque sé que otra como tu no hay, eres todo para mi, mis dias son perfectos si estas tu cielo. </p>
                            <p>ㅤㅤ</p>
                            <p>Por otro lado te queria decir que, sé que el universo nos junto con algun objetivo y tenemos muchas cosas lindas que recorrer juntos, somos dos personas</p>
                            <p>que a pesar de cada pelea, discucion o mal entendido, siempre encontramos la forma de seguir adelante juntos, te puedo repetir una y mil veces que no</p>
                            <p>nos dejemos vencer por algo insignificante al lado de nuestro enorme amor, sé que no es lindo estar peleados o alejados uno del otro pero creeme que es</p>
                            <p>una etapa que la vamos a superar con facilidad porque para nosotros no hay nada ni nadie que nos detenga en esto tan hermoso que tenemos mi niña linda,</p>
                            <p>una vez más, gracias por elegirme hasta en los días difíciles, te lo prometo yo nunca te voy a faltar y siempre voy a estar para ti, no estas sola mi cielo lindo,</p>
                            <p>escribo esta carta hoy 17 de mayo de 2026 un poquito antes de verte, no sabes la emocion que siento al escribir esto y pensar que voy a estar con lo mas hermoso </p>
                            <p>que tengo en el mundo, ni siquiera te he visto y se que vas a venir hermosa como siempre, con esa belleza que te caracteriza, tus hermosos ojos, tu hermosa sonrisa </p>
                            <p>tus lindos y hermosos labios que dentro de poco voy a besar, tu hermosa cintura que me trae loco y por ultimo pero no menos importante, tu cuerpo que parece</p>
                            <p>esculpido por el mismisimo Dios JAJAJA, estoy seguro que hoy va a ser un día maravilloso solo porque estas tú, le doy gracias a la vida por darme estos momentos </p>
                            <p>junto a ti y que hoy sea un dia que le podamos contar a nuestros hijos cuando estemos viejos, mis palabras no son suficientes para expresar lo mucho que te amo,</p>
                            <p>estoy perdido sin ti mi amor, gracias por ser parte de cada latido de mi corazon y hacerme sentir mas vivo, hoy, mañana y siempre enamorado tuyo. </p>
                            <div className="m6v5-ltr-flourish">· · · ❧ · · ·</div>
                          </div>
                          <div className="m6v5-ltr-sign-wrap">
                            <span className="m6v5-ltr-closing">Con todo mi amor,</span>
                            <span className="m6v5-ltr-sign">Eithan </span>
                            <div className="m6v5-ltr-hearts">
                              <span>💓</span><span>💓</span><span>💓</span>
                            </div>
                          </div>
                        </div>
                        <button className="m6v5-ltr-close" onClick={() => setLetterOpen(false)}>← Cerrar carta</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </section>

        <div className="m6v5-div"><div className="m6v5-div-l" /><span className="m6v5-div-i">★</span><div className="m6v5-div-l" /></div>



        {/* FOOTER */}
        <motion.footer className="m6v5-footer" {...sr(0)}>
          <span className="m6v5-fbg">diana</span>
          <span className="m6v5-fheart">♥</span>
          <p className="m6v5-fq">"Y para siempre,<br />te elegiré a ti."</p>
          <p className="m6v5-fnum">30 · Mayo 2026 · Para siempre</p>
        </motion.footer>
      </div>

      {/* MODAL ESTRELLA */}
      <AnimatePresence>
        {starOpen && (
          <motion.div className="v5-modal-ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setStarOpen(false)}>
            <motion.div className="v5-modal"
              initial={{ opacity: 0, scale: 0.86, y: 32 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} onClick={e => e.stopPropagation()}>
              <span className="v5-modal-icon">🌟</span>
              <h3 className="v5-modal-title">Estrella Diana</h3>
              <div className="v5-modal-coord">
                Constelación de Orión · Sector 7-G<br />
                AR: 05h 34m 32s · Dec: +22° 00′ 52″<br />
                Magnitud: 4.2 · Distancia: 287 al
              </div>
              <p className="v5-modal-text">Esta estrella fue dedicada a ti el{" "}<strong>30 de noviembre de 2025</strong>. Cada vez que el cielo esté despejado, una de esas luces lleva tu nombre y brilla pensando en lo especial que eres.</p>
              <button className="v5-modal-close" onClick={() => setStarOpen(false)}>✦ Cerrar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}