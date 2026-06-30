import { useState, useEffect, useRef, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ════════════════════════════════════════════════════════════════════════════
// MES 7 — "Bitácora de viaje" — paleta ultravioleta + verde lima eléctrico
// Música: walkman/casete retro-futurista. Carta: manuscrito iluminado dorado.
// ════════════════════════════════════════════════════════════════════════════

const injectStyles = () => {
  if (document.getElementById("m7v2-st")) return;
  const s = document.createElement("style");
  s.id = "m7v2-st";
  s.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cinzel:wght@400;600;700;900&family=DM+Mono:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

    /* ══════════════════════════════════════
       PALETA — ultravioleta profundo · verde lima eléctrico · negro tinta
       Combinación poco común, alto contraste, look editorial-futurista
       ══════════════════════════════════════ */
    .m7.dark {
      --ink:      #2d0a4e;  --ink2: #4a1580; --ink3: rgba(90,20,160,0.2);
      --lime:     #c8f51e;  --lime2: #e0ff5c; --lime3: rgba(200,245,30,0.13);
      --gold:     #d4a843;  --gold2: #f0cc78;
      --bg:       #0a0512;
      --cream:    #f2eaf8;  --muted: rgba(242,234,248,0.42); --muted2: rgba(242,234,248,0.2);
      --glass:    rgba(200,245,30,0.04); --glass2: rgba(200,245,30,0.08);
      --brd:      rgba(200,245,30,0.1); --brd-a: rgba(200,245,30,0.3); --brd-i: rgba(120,40,200,0.32);
      --nav-bg:   rgba(10,5,18,0.88);
      --card:     rgba(45,10,78,0.42);
      --sheet:    #16091f; --sheet2:#1d0c2a; --sheet-line: rgba(200,245,30,0.07);
      --text-on-sheet: #f0e6d2;
    }
    .m7.light {
      --ink:      #4a1580;  --ink2: #6a25a8; --ink3: rgba(90,20,160,0.08);
      --lime:     #6a8c00;  --lime2: #84a800; --lime3: rgba(106,140,0,0.1);
      --gold:     #a07015;  --gold2: #c09030;
      --bg:       #faf5ff;
      --cream:    #1c0a2e;  --muted: rgba(28,10,46,0.5); --muted2: rgba(28,10,46,0.26);
      --glass:    rgba(255,255,255,0.65); --glass2: rgba(255,255,255,0.85);
      --brd:      rgba(28,10,46,0.1); --brd-a: rgba(106,140,0,0.28); --brd-i: rgba(90,20,160,0.22);
      --nav-bg:   rgba(250,245,255,0.92);
      --card:     rgba(255,255,255,0.72);
      --sheet:    #fffdf6; --sheet2:#fdf9ec; --sheet-line: rgba(74,21,128,0.07);
      --text-on-sheet: #2d0a4e;
    }

    .m7 { min-height:100vh; font-family:'Crimson Text',serif; color:var(--cream); overflow-x:hidden; position:relative; background:var(--bg); }

    /* ══════ FONDO ══════ */
    .m7-bg { position:fixed; inset:0; z-index:0; pointer-events:none; }
    .m7.dark  .m7-bg { background:
      radial-gradient(ellipse 75% 60% at 18% 5%, rgba(90,20,160,0.28) 0%, transparent 55%),
      radial-gradient(ellipse 70% 60% at 88% 92%, rgba(200,245,30,0.07) 0%, transparent 55%),
      #0a0512; }
    .m7.light .m7-bg { background:
      radial-gradient(ellipse 75% 60% at 18% 5%, rgba(120,40,200,0.12) 0%, transparent 55%),
      radial-gradient(ellipse 70% 60% at 88% 92%, rgba(106,140,0,0.08) 0%, transparent 55%),
      #faf5ff; }

    .m7-stain { position:absolute; border-radius:50%; filter:blur(60px); pointer-events:none; }
    .m7.dark  .m7-stain1 { width:45vw;height:45vw;top:0%;right:-10%; background:radial-gradient(circle,rgba(200,245,30,0.1) 0%,transparent 70%); animation:m7s1 18s ease-in-out infinite alternate; }
    .m7.dark  .m7-stain2 { width:55vw;height:55vw;bottom:-5%;left:-15%; background:radial-gradient(circle,rgba(120,40,200,0.18) 0%,transparent 70%); animation:m7s2 22s ease-in-out infinite alternate; }
    .m7.light .m7-stain1 { width:45vw;height:45vw;top:0%;right:-10%; background:radial-gradient(circle,rgba(106,140,0,0.1) 0%,transparent 70%); animation:m7s1 18s ease-in-out infinite alternate; }
    .m7.light .m7-stain2 { width:55vw;height:55vw;bottom:-5%;left:-15%; background:radial-gradient(circle,rgba(120,40,200,0.1) 0%,transparent 70%); animation:m7s2 22s ease-in-out infinite alternate; }
    @keyframes m7s1{to{transform:translate(-6vw,8vh) scale(1.15)}}
    @keyframes m7s2{to{transform:translate(7vw,-6vh) scale(1.1)}}

    .m7-paper-tex {
      position:fixed; inset:0; z-index:1; pointer-events:none;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='5' seed='7' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size:300px;
    }
    .m7.dark  .m7-paper-tex { opacity:0.045; mix-blend-mode:overlay; }
    .m7.light .m7-paper-tex { opacity:0.03; mix-blend-mode:multiply; }
    .m7-vignette { position:fixed; inset:0; z-index:1; pointer-events:none; box-shadow: inset 0 0 180px rgba(0,0,0,0.4); }
    .m7.light .m7-vignette { box-shadow: inset 0 0 140px rgba(60,10,90,0.1); }

    .m7-content { position:relative; z-index:2; }

    /* ══════ NAV ══════ */
    .m7-nav { display:flex; justify-content:space-between; align-items:center; padding:1.3rem 1.4rem; border-bottom:2px solid var(--brd-i); background:var(--nav-bg); backdrop-filter:blur(20px); position:sticky; top:0; z-index:100; }
    .m7-back { display:flex; align-items:center; gap:0.5rem; font-family:'DM Mono',monospace; font-size:0.58rem; letter-spacing:0.14em; color:var(--muted); text-transform:uppercase; cursor:pointer; border:none; background:none; transition:color 0.3s; }
    .m7-back:hover { color:var(--lime); }
    .m7-stamp { font-family:'Cinzel',serif; font-weight:700; font-size:0.6rem; letter-spacing:0.1em; color:var(--lime); text-transform:uppercase; border:2px solid var(--brd-a); border-radius:2px; padding:0.3rem 0.7rem; transform:rotate(-2deg); position:relative; }
    .m7-stamp::before, .m7-stamp::after { content:''; position:absolute; width:6px; height:6px; border-radius:50%; background:var(--bg); top:50%; transform:translateY(-50%); }
    .m7-stamp::before { left:-4px; } .m7-stamp::after { right:-4px; }
    .m7-toggle { width:36px; height:36px; border-radius:50%; border:2px solid var(--brd-i); background:var(--glass); backdrop-filter:blur(8px); cursor:pointer; color:var(--cream); font-size:0.9rem; display:flex; align-items:center; justify-content:center; transition:all 0.3s; }
    .m7-toggle:hover { background:var(--ink3); border-color:var(--ink2); }

    /* ══════ HERO ══════ */
    .m7-hero { padding:4rem 1.5rem 3rem; position:relative; }
    .m7-hero-stamp-decor { position:absolute; top:1.5rem; right:1.2rem; width:74px; height:90px; border:2.5px dashed var(--brd-a); border-radius:3px; display:flex; align-items:center; justify-content:center; transform:rotate(8deg); opacity:0.55; }
    .m7-hero-stamp-decor span { font-size:1.6rem; transform:rotate(-8deg); }
    .m7-typewriter-line { font-family:'DM Mono',monospace; font-size:0.6rem; letter-spacing:0.18em; color:var(--lime); text-transform:uppercase; margin-bottom:1.2rem; display:flex; align-items:center; gap:0.7rem; }
    .m7-typewriter-cursor { display:inline-block; width:6px; height:11px; background:var(--lime); animation:m7blink 1s step-start infinite; }
    @keyframes m7blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .m7-htitle { font-family:'Cinzel',serif; font-weight:900; font-size:clamp(2.8rem,11vw,5.6rem); line-height:1.04; display:block; margin-bottom:0.3rem; letter-spacing:0; }
    .m7.dark  .m7-htitle { background:linear-gradient(135deg,#f2eaf8 0%,var(--lime) 50%,var(--ink2) 110%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; filter:drop-shadow(0 0 30px rgba(200,245,30,0.18)); }
    .m7.light .m7-htitle { background:linear-gradient(135deg,var(--ink) 0%,var(--ink2) 50%,var(--lime) 110%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
    .m7-htitle2 { font-family:'Crimson Text',serif; font-weight:400; font-style:italic; font-size:clamp(1.5rem,5.5vw,2.6rem); color:var(--muted); display:block; margin-top:0.6rem; }
    .m7-hero-meta { display:flex; align-items:center; gap:1rem; margin-top:2rem; font-family:'DM Mono',monospace; font-size:0.56rem; letter-spacing:0.1em; color:var(--muted2); }
    .m7-hero-meta-divider { width:24px; height:1px; background:var(--brd-a); }
    .m7-ruled { margin-top:2.5rem; padding-top:1.5rem; border-top:1px solid var(--sheet-line); background-image: repeating-linear-gradient(0deg, transparent, transparent 31px, var(--sheet-line) 32px); height:64px; }

    /* ══════ STATS ══════ */
    .m7-stats { margin:2.5rem 1.5rem; display:grid; grid-template-columns:repeat(2,1fr); gap:0.8rem; }
    .m7-stat { background:var(--card); border:1.5px solid var(--brd); border-radius:3px; backdrop-filter:blur(10px); padding:1.2rem 1.1rem; position:relative; transform:rotate(var(--rot,0deg)); box-shadow:3px 3px 0 rgba(0,0,0,0.18); transition:transform 0.3s; }
    .m7-stat:nth-child(1){ --rot:-1.2deg; } .m7-stat:nth-child(2){ --rot:0.8deg; } .m7-stat:nth-child(3){ --rot:0.6deg; } .m7-stat:nth-child(4){ --rot:-0.9deg; }
    .m7-stat:hover { transform:rotate(0deg) translateY(-3px); }
    .m7-stat::before { content:''; position:absolute; top:-6px; left:50%; transform:translateX(-50%) rotate(-3deg); width:30px; height:14px; background:rgba(200,245,30,0.15); border-radius:1px; }
    .m7-stat-n { font-family:'Cinzel',serif; font-weight:700; font-size:1.85rem; line-height:1; color:var(--lime); display:block; margin-bottom:0.35rem; }
    .m7-stat-l { font-family:'DM Mono',monospace; font-size:0.48rem; letter-spacing:0.14em; color:var(--muted); text-transform:uppercase; }

    /* ══════ CITA ══════ */
    .m7-quote-wrap { margin:3rem 1.5rem; padding:2.8rem 1.6rem; position:relative; border:1px solid var(--brd-i); border-radius:4px; background:var(--glass); }
    .m7-quote-wrap::before, .m7-quote-wrap::after { content:'"'; position:absolute; font-family:'Cinzel',serif; font-size:4rem; color:var(--brd-a); line-height:1; opacity:0.5; }
    .m7-quote-wrap::before { top:0.2rem; left:0.6rem; } .m7-quote-wrap::after { bottom:-1.6rem; right:0.6rem; transform:rotate(180deg); }
    .m7-quote-txt { font-family:'Crimson Text',serif; font-style:italic; font-weight:600; font-size:clamp(1.3rem,4.6vw,1.9rem); line-height:1.5; color:var(--cream); text-align:center; position:relative; z-index:1; }
    .m7-quote-lime { color:var(--lime); }
    .m7-quote-by { text-align:center; margin-top:1.2rem; font-family:'DM Mono',monospace; font-size:0.55rem; letter-spacing:0.18em; color:var(--muted); text-transform:uppercase; }

    /* ══════ SECTION LABEL ══════ */
    .m7-sec { display:flex; align-items:center; gap:1rem; padding:0 1.5rem; margin-bottom:1.8rem; }
    .m7-sec-num { font-family:'Cinzel',serif; font-weight:700; font-size:0.8rem; color:var(--lime); }
    .m7-sec-txt { font-family:'DM Mono',monospace; font-size:0.56rem; letter-spacing:0.22em; color:var(--ink2); text-transform:uppercase; }
    .m7-sec-line { flex:1; height:1px; background:repeating-linear-gradient(90deg, var(--brd-i) 0 4px, transparent 4px 8px); }

    /* ══════ MAPA / RUTA ══════ */
    .m7-map-section { padding:1rem 1.5rem 3rem; }
    .m7-map-wrap { position:relative; border-radius:6px; overflow:hidden; border:2px solid var(--brd-i); background:var(--card); backdrop-filter:blur(10px); padding:2.4rem 1.4rem 1.8rem; }
    .m7-map-corner { position:absolute; width:18px; height:18px; border:2px solid var(--lime); opacity:0.5; }
    .m7-map-corner.tl { top:8px; left:8px; border-right:none; border-bottom:none; }
    .m7-map-corner.tr { top:8px; right:8px; border-left:none; border-bottom:none; }
    .m7-map-corner.bl { bottom:8px; left:8px; border-right:none; border-top:none; }
    .m7-map-corner.br { bottom:8px; right:8px; border-left:none; border-top:none; }
    .m7-compass { position:absolute; top:14px; right:18px; width:36px; height:36px; opacity:0.45; }
    .m7-route-stop { display:flex; align-items:flex-start; gap:1rem; padding:1.1rem 0; border-bottom:1px dashed var(--brd); cursor:pointer; }
    .m7-route-stop:last-child { border-bottom:none; }
    .m7-route-pin { width:30px; height:30px; border-radius:50%; flex-shrink:0; background:var(--ink3); border:2px solid var(--ink2); display:flex; align-items:center; justify-content:center; font-size:0.85rem; transition:all 0.3s; }
    .m7-route-stop:hover .m7-route-pin, .m7-route-stop.active .m7-route-pin { background:var(--lime); border-color:var(--lime2); transform:scale(1.1); }
    .m7-route-body { flex:1; }
    .m7-route-coord { font-family:'DM Mono',monospace; font-size:0.5rem; letter-spacing:0.1em; color:var(--muted2); margin-bottom:0.25rem; }
    .m7-route-title { font-family:'Cinzel',serif; font-weight:600; font-size:0.98rem; color:var(--cream); margin-bottom:0.3rem; }
    .m7-route-desc { font-size:0.86rem; color:var(--muted); line-height:1.6; max-height:0; overflow:hidden; opacity:0; transition:max-height 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s; }
    .m7-route-stop.active .m7-route-desc { max-height:160px; opacity:1; }

    /* ══════ MÚSICA — WALKMAN RETRO-FUTURISTA ══════ */
    .m7-radio-section { padding:1rem 1.5rem 3rem; }
    .m7-radio-intro { font-family:'Crimson Text',serif; font-style:italic; font-size:1.05rem; color:var(--muted); line-height:1.7; margin-bottom:2.2rem; text-align:center; }
    .m7-radio-intro strong { color:var(--lime); font-weight:700; }

    /* Carcasa del walkman */
    .m7-walkman {
      position:relative; border-radius:24px; padding:1.8rem 1.6rem 1.6rem;
      background:linear-gradient(160deg, var(--sheet) 0%, var(--sheet2) 100%);
      border:2px solid var(--brd-i);
      box-shadow:0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -2px 6px rgba(0,0,0,0.3);
    }
    .m7-walkman::before {
      content:''; position:absolute; top:10px; left:10px; right:10px; height:1px;
      background:linear-gradient(90deg,transparent,rgba(200,245,30,0.4),transparent);
    }
    /* tornillos decorativos */
    .m7-screw { position:absolute; width:8px; height:8px; border-radius:50%; background:radial-gradient(circle at 35% 30%, rgba(255,255,255,0.25), rgba(0,0,0,0.4)); }
    .m7-screw.tl{top:14px;left:14px;} .m7-screw.tr{top:14px;right:14px;}
    .m7-screw.bl{bottom:14px;left:14px;} .m7-screw.br{bottom:14px;right:14px;}

    /* ventana del casete */
    .m7-cassette-window {
      background:rgba(0,0,0,0.45); border:2px solid rgba(200,245,30,0.18);
      border-radius:12px; padding:1.3rem 1.2rem; margin-bottom:1.4rem;
      position:relative; overflow:hidden;
      box-shadow:inset 0 4px 16px rgba(0,0,0,0.6);
    }
    .m7-cassette-window::before {
      content:''; position:absolute; inset:0; pointer-events:none;
      background:linear-gradient(180deg, rgba(200,245,30,0.04) 0%, transparent 30%);
    }
    .m7-cassette-body { display:flex; align-items:center; justify-content:space-between; position:relative; z-index:1; }
    /* carretes que giran */
    .m7-reel-wrap { width:52px; height:52px; border-radius:50%; background:radial-gradient(circle, #1a0d28 0%, #0a0512 70%); border:2px solid rgba(200,245,30,0.25); display:flex; align-items:center; justify-content:center; position:relative; }
    .m7-reel { width:100%; height:100%; border-radius:50%; position:relative; }
    .m7-reel.spin { animation:m7reel 2s linear infinite; }
    @keyframes m7reel { to { transform:rotate(360deg); } }
    .m7-reel::before { content:''; position:absolute; inset:6px; border-radius:50%; background:repeating-conic-gradient(from 0deg, rgba(200,245,30,0.3) 0deg 8deg, transparent 8deg 45deg); }
    .m7-reel::after { content:''; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:14px; height:14px; border-radius:50%; background:#0a0512; border:1.5px solid rgba(200,245,30,0.4); }
    .m7-tape-line { flex:1; height:2px; margin:0 0.8rem; background:repeating-linear-gradient(90deg, rgba(200,245,30,0.3) 0 6px, transparent 6px 10px); border-radius:2px; }

    /* etiqueta de cinta con nombre de canción */
    .m7-tape-label {
      margin-top:1.2rem; text-align:center; padding:0.9rem;
      background:rgba(200,245,30,0.04); border:1px dashed rgba(200,245,30,0.25); border-radius:8px;
      position:relative; z-index:1;
    }
    .m7-tape-status { font-family:'DM Mono',monospace; font-size:0.5rem; letter-spacing:0.18em; color:var(--lime); text-transform:uppercase; margin-bottom:0.35rem; display:flex; align-items:center; justify-content:center; gap:0.5rem; }
    .m7-tape-status-dot { width:5px; height:5px; border-radius:50%; background:var(--lime); animation:m7blink 1s step-start infinite; }
    .m7-tape-song { font-family:'Cinzel',serif; font-weight:700; font-size:1.05rem; color:var(--cream); display:block; margin-bottom:0.15rem; }
    .m7-tape-artist { font-family:'Crimson Text',serif; font-style:italic; font-size:0.85rem; color:var(--muted); }
    .m7-tape-empty { font-family:'Crimson Text',serif; font-style:italic; font-size:0.9rem; color:var(--muted2); padding:0.4rem 0; }

    /* barra de VU meter decorativa */
    .m7-vu-wrap { display:flex; align-items:flex-end; justify-content:center; gap:3px; height:24px; margin-top:1rem; position:relative; z-index:1; }
    .m7vu { width:4px; border-radius:1px; background:linear-gradient(180deg, var(--lime), var(--ink2)); }
    .m7vu:nth-child(1){animation:m7vu1 0.7s ease-in-out infinite;}
    .m7vu:nth-child(2){animation:m7vu2 0.5s ease-in-out infinite;}
    .m7vu:nth-child(3){animation:m7vu3 0.9s ease-in-out infinite;}
    .m7vu:nth-child(4){animation:m7vu1 0.6s ease-in-out infinite 0.15s;}
    .m7vu:nth-child(5){animation:m7vu2 0.8s ease-in-out infinite 0.1s;}
    .m7vu:nth-child(6){animation:m7vu3 0.65s ease-in-out infinite 0.2s;}
    .m7vu:nth-child(7){animation:m7vu1 0.75s ease-in-out infinite 0.05s;}
    @keyframes m7vu1{0%,100%{height:5px}50%{height:22px}}
    @keyframes m7vu2{0%,100%{height:18px}50%{height:6px}}
    @keyframes m7vu3{0%,100%{height:9px}50%{height:24px}}

    /* controles físicos */
    .m7-controls { display:flex; align-items:center; justify-content:center; gap:0.8rem; margin-top:1.4rem; }
    .m7-ctrl-btn {
      width:42px; height:36px; border-radius:6px;
      background:linear-gradient(160deg, #241333, #150a1f);
      border:1px solid rgba(200,245,30,0.15);
      box-shadow:0 3px 0 rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
      display:flex; align-items:center; justify-content:center;
      cursor:pointer; color:var(--muted); font-size:0.85rem;
      transition:all 0.15s;
    }
    .m7-ctrl-btn:active { transform:translateY(2px); box-shadow:0 1px 0 rgba(0,0,0,0.4); }
    .m7-ctrl-btn:hover { color:var(--lime); border-color:rgba(200,245,30,0.35); }
    .m7-ctrl-play {
      width:56px; height:42px; border-radius:8px;
      background:linear-gradient(160deg, var(--lime), #8aab00);
      border:none; box-shadow:0 4px 0 #5a7000, 0 8px 20px rgba(200,245,30,0.3);
      display:flex; align-items:center; justify-content:center;
      cursor:pointer; color:#0a0512; font-size:1rem; font-weight:700;
      transition:all 0.15s;
    }
    .m7-ctrl-play:active { transform:translateY(3px); box-shadow:0 1px 0 #5a7000; }

    /* lista de canciones — diseño de cinta de cassette numerada */
    .m7-tracklist { margin-top:1.6rem; border-radius:10px; overflow:hidden; border:1px solid var(--brd); }
    .m7-tracklist-hd { padding:0.7rem 1.1rem; background:var(--lime3); border-bottom:1px solid var(--brd-a); display:flex; justify-content:space-between; align-items:center; }
    .m7-tracklist-hd-l { font-family:'DM Mono',monospace; font-size:0.5rem; letter-spacing:0.2em; color:var(--lime); text-transform:uppercase; }
    .m7-tracklist-hd-r { font-family:'DM Mono',monospace; font-size:0.5rem; color:var(--muted2); }
    .m7-track {
      display:grid; grid-template-columns:28px 1fr auto; align-items:center; gap:0.8rem;
      padding:0.85rem 1.1rem; background:var(--card); border-bottom:1px solid var(--brd);
      cursor:pointer; transition:all 0.25s; position:relative; overflow:hidden;
    }
    .m7-track:last-child { border-bottom:none; }
    .m7-track::before { content:''; position:absolute; left:0; top:0; bottom:0; width:0; background:var(--lime3); transition:width 0.3s; }
    .m7-track:hover::before, .m7-track.on::before { width:100%; }
    .m7-track.on { border-color:var(--brd-a); }
    .m7-track-side { font-family:'DM Mono',monospace; font-size:0.55rem; color:var(--muted2); text-align:center; position:relative; z-index:1; border:1px solid var(--brd); border-radius:4px; padding:0.15rem 0; }
    .m7-track.on .m7-track-side { color:var(--lime); border-color:var(--brd-a); }
    .m7-track-info { position:relative; z-index:1; min-width:0; }
    .m7-track-name { font-size:0.88rem; font-weight:500; color:var(--cream); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display:block; }
    .m7-track.on .m7-track-name { color:var(--lime2); }
    .m7-track-artist { font-size:0.72rem; color:var(--muted); margin-top:0.1rem; display:block; }
    .m7-track-right { position:relative; z-index:1; display:flex; align-items:center; }
    .m7-track-icon { width:24px; height:24px; border-radius:50%; border:1px solid var(--brd); display:flex; align-items:center; justify-content:center; font-size:0.65rem; color:var(--muted); transition:all 0.3s; }
    .m7-track:hover .m7-track-icon { border-color:var(--brd-a); color:var(--lime); }

    .m7-embed { margin-top:0.6rem; border-radius:10px; overflow:hidden; border:1px solid var(--brd-a); box-shadow:0 16px 40px rgba(0,0,0,0.4); }
    .m7-embed iframe { display:block; width:100%; border:none; }
    .m7-radio-note { font-family:'Crimson Text',serif; font-style:italic; font-size:0.82rem; color:var(--muted2); text-align:center; margin-top:1.2rem; line-height:1.6; }

    /* ══════ CARTA — MANUSCRITO ILUMINADO ══════ */
    .m7-letter-section { padding:1rem 1.5rem 3rem; }

    .m7-manuscript-cover {
      position:relative; border-radius:8px; overflow:hidden; cursor:pointer;
      border:2px solid var(--brd-a);
      background:linear-gradient(160deg, var(--ink3) 0%, rgba(10,5,18,0.4) 100%);
      box-shadow:0 30px 80px rgba(0,0,0,0.5);
    }
    /* marco ornamentado de esquinas doradas */
    .m7-orn-corner { position:absolute; width:34px; height:34px; opacity:0.65; pointer-events:none; }
    .m7-orn-corner.tl { top:10px; left:10px; }
    .m7-orn-corner.tr { top:10px; right:10px; transform:scaleX(-1); }
    .m7-orn-corner.bl { bottom:10px; left:10px; transform:scaleY(-1); }
    .m7-orn-corner.br { bottom:10px; right:10px; transform:scale(-1,-1); }

    .m7-manuscript-closed { padding:3.4rem 2rem; text-align:center; position:relative; }
    /* sello de cera dorado con relieve */
    .m7-gold-seal {
      width:80px; height:80px; border-radius:50%; margin:0 auto 1.5rem;
      background:radial-gradient(circle at 35% 28%, #f0d488, #d4a843 45%, #8a661c 100%);
      display:flex; align-items:center; justify-content:center;
      font-family:'Cinzel',serif; font-weight:900; font-size:1.5rem; color:#3a2608;
      box-shadow:0 8px 30px rgba(212,168,67,0.45), inset 0 -4px 10px rgba(0,0,0,0.3), inset 0 3px 6px rgba(255,255,255,0.3);
      position:relative; animation:m7sealpulse 3.5s ease-in-out infinite;
      border:2px solid rgba(212,168,67,0.4);
    }
    @keyframes m7sealpulse { 0%,100%{ box-shadow:0 8px 30px rgba(212,168,67,0.4), inset 0 -4px 10px rgba(0,0,0,0.3), inset 0 3px 6px rgba(255,255,255,0.3);} 50%{ box-shadow:0 8px 46px rgba(212,168,67,0.65), inset 0 -4px 10px rgba(0,0,0,0.3), inset 0 3px 6px rgba(255,255,255,0.3);} }
    .m7-gold-seal::after { content:''; position:absolute; inset:-7px; border-radius:50%; border:1px solid rgba(212,168,67,0.3); animation:m7sealring 3.5s ease-in-out infinite; }
    @keyframes m7sealring { 0%,100%{transform:scale(1);opacity:0.5} 50%{transform:scale(1.1);opacity:0.15} }

    .m7-manuscript-title { font-family:'Cinzel',serif; font-weight:700; font-size:1.35rem; color:var(--cream); margin-bottom:0.6rem; letter-spacing:0.02em; }
    .m7-manuscript-hint { font-family:'DM Mono',monospace; font-size:0.52rem; letter-spacing:0.2em; color:var(--muted); text-transform:uppercase; }

    /* la página abierta del manuscrito */
    .m7-manuscript-page {
      background:linear-gradient(170deg, var(--sheet) 0%, var(--sheet2) 100%);
      color:var(--text-on-sheet); position:relative; overflow:hidden;
    }
    .m7-manuscript-page::before {
      content:''; position:absolute; inset:0; pointer-events:none; opacity:0.5;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    }
    .m7-manuscript-inner { padding:2.6rem 1.9rem 2rem; position:relative; z-index:1; }

    /* letra capitular iluminada */
    .m7-dropcap-wrap { display:flex; align-items:flex-start; gap:0; margin-bottom:0.2rem; }
    .m7-dropcap {
      font-family:'Cinzel',serif; font-weight:900; font-size:4.2rem; line-height:0.78;
      color:var(--gold);
      background:linear-gradient(160deg, var(--gold2), var(--gold) 60%, #8a661c);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      filter:drop-shadow(1px 1px 0 rgba(0,0,0,0.25));
      margin-right:0.5rem; float:left;
    }

    .m7-manuscript-text { font-family:'Crimson Text',serif; font-size:1.05rem; line-height:1.95; color:var(--text-on-sheet); }
    .m7-manuscript-text p { margin-bottom:1.05rem; }
    .m7-manuscript-text p:last-child { margin-bottom:0; }

    /* ornamento separador caligráfico */
    .m7-flourish-divider { display:flex; align-items:center; justify-content:center; gap:0.7rem; margin:1.6rem 0; }
    .m7-flourish-line { width:40px; height:1px; background:linear-gradient(90deg, transparent, var(--gold)); }
    .m7-flourish-line.r { background:linear-gradient(270deg, transparent, var(--gold)); }
    .m7-flourish-icon { color:var(--gold); font-size:0.8rem; }

    .m7-manuscript-sign-wrap { margin-top:2rem; text-align:right; }
    .m7-manuscript-closing { font-family:'DM Mono',monospace; font-size:0.52rem; letter-spacing:0.16em; color:rgba(74,21,128,0.5); text-transform:uppercase; margin-bottom:0.6rem; display:block; }
    .m7.dark .m7-manuscript-closing { color:rgba(242,234,248,0.4); }
    .m7-manuscript-sign {
      font-family:'Cinzel',serif; font-weight:900; font-style:normal; font-size:1.7rem;
      background:linear-gradient(160deg, var(--gold2), var(--gold));
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      display:block; line-height:1;
    }

    .m7-manuscript-close-btn {
      width:100%; padding:0.9rem; border-top:1px solid rgba(212,168,67,0.2);
      background:rgba(212,168,67,0.05); color:rgba(74,21,128,0.5); cursor:pointer;
      border-left:none; border-right:none; border-bottom:none;
      font-family:'DM Mono',monospace; font-size:0.54rem; letter-spacing:0.16em; text-transform:uppercase;
      transition:all 0.3s; position:relative; z-index:1;
    }
    .m7.dark .m7-manuscript-close-btn { color:rgba(242,234,248,0.45); }
    .m7-manuscript-close-btn:hover { background:rgba(212,168,67,0.1); color:var(--gold); }

    /* ══════ SORPRESA — botella al mar ══════ */
    .m7-bottle-section { padding:1rem 1.5rem 3rem; }
    .m7-bottle-card { border:2px solid var(--brd-a); border-radius:8px; background:var(--card); backdrop-filter:blur(14px); padding:2.6rem 1.7rem; position:relative; overflow:hidden; text-align:center; }
    .m7-bottle-card::before { content:''; position:absolute; inset:0; background:linear-gradient(160deg, var(--lime3) 0%, transparent 60%); pointer-events:none; }
    .m7-bottle-icon { font-size:3rem; display:block; margin-bottom:1.2rem; animation:m7float 3.5s ease-in-out infinite; }
    @keyframes m7float { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-10px) rotate(3deg)} }
    .m7-bottle-eb { font-family:'DM Mono',monospace; font-size:0.54rem; letter-spacing:0.22em; color:var(--lime); text-transform:uppercase; margin-bottom:1rem; }
    .m7-bottle-title { font-family:'Cinzel',serif; font-weight:700; font-size:clamp(1.5rem,6vw,2.1rem); line-height:1.25; color:var(--cream); margin-bottom:1rem; }
    .m7-bottle-desc { font-family:'Crimson Text',serif; font-style:italic; font-size:1rem; color:var(--muted); line-height:1.75; margin-bottom:2rem; position:relative; z-index:1; }
    .m7-bottle-desc strong { color:var(--lime); font-weight:700; }
    .m7-bottle-btn { width:100%; padding:1rem 1.6rem; border-radius:4px; background:linear-gradient(135deg, var(--ink2), var(--ink)); border:2px solid rgba(200,245,30,0.3); cursor:pointer; color:var(--cream); font-family:'Cinzel',serif; font-weight:600; font-size:0.85rem; letter-spacing:0.04em; box-shadow:0 10px 30px rgba(90,20,160,0.35); transition:all 0.35s; position:relative; z-index:1; }
    .m7-bottle-btn:hover { transform:translateY(-2px); box-shadow:0 16px 40px rgba(90,20,160,0.5); }

    .m7-modal-ov { position:fixed; inset:0; z-index:2000; background:rgba(5,2,10,0.92); backdrop-filter:blur(10px); display:flex; align-items:center; justify-content:center; padding:1.5rem; }
    .m7-modal { background:var(--sheet); color:var(--text-on-sheet); border-radius:6px; padding:2.6rem 2rem; max-width:380px; width:100%; text-align:center; position:relative; overflow:hidden; box-shadow:0 40px 100px rgba(0,0,0,0.6); border:1px solid rgba(200,245,30,0.2); }
    .m7-modal::before { content:''; position:absolute; inset:0; pointer-events:none; opacity:0.04; background-image:repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(74,21,128,0.8) 28px); }
    .m7-modal-icon { font-size:3.2rem; display:block; margin-bottom:1.2rem; animation:m7float 3s ease-in-out infinite; position:relative; z-index:1; }
    .m7-modal-title { font-family:'Cinzel',serif; font-weight:700; font-size:1.5rem; color:var(--text-on-sheet); margin-bottom:1rem; position:relative; z-index:1; }
    .m7-modal-text { font-family:'Crimson Text',serif; font-style:italic; font-size:1.05rem; color:rgba(45,10,78,0.78); line-height:1.85; margin-bottom:1.8rem; position:relative; z-index:1; }
    .m7.dark .m7-modal-text { color:rgba(242,234,248,0.7); }
    .m7-modal-text strong { color:var(--gold); font-weight:700; }
    .m7-modal-close { width:100%; padding:0.85rem; border-radius:4px; border:2px solid rgba(74,21,128,0.18); background:none; color:rgba(45,10,78,0.6); cursor:pointer; font-family:'DM Mono',monospace; font-size:0.55rem; letter-spacing:0.16em; text-transform:uppercase; transition:all 0.3s; position:relative; z-index:1; }
    .m7.dark .m7-modal-close { color:rgba(242,234,248,0.5); border-color:rgba(200,245,30,0.25); }
    .m7-modal-close:hover { color:var(--lime); border-color:var(--lime); }

    /* ══════ DIVIDER / FOOTER ══════ */
    .m7-div { display:flex; align-items:center; gap:0.8rem; padding:0 1.5rem; margin:1rem 0; }
    .m7-div-l { flex:1; height:1px; background:repeating-linear-gradient(90deg, var(--brd-i) 0 4px, transparent 4px 9px); }
    .m7-div-i { font-size:0.9rem; color:var(--lime); opacity:0.65; }
    .m7-footer { padding:2.5rem 1.5rem 4rem; text-align:center; border-top:2px solid var(--brd-i); position:relative; }
    .m7-footer-mark { font-family:'Crimson Text',serif; font-style:italic; font-size:1rem; color:var(--muted); line-height:1.7; margin-bottom:1rem; }
    .m7-footer-seal { width:46px; height:46px; border-radius:50%; margin:0 auto 1rem; background:radial-gradient(circle at 38% 30%, var(--gold2), var(--gold)); display:flex;align-items:center;justify-content:center; font-family:'Cinzel',serif; font-weight:900; font-size:1.1rem;color:#3a2608;box-shadow:0 4px 16px rgba(212,168,67,0.4); }
    .m7-footer-num { font-family:'DM Mono',monospace; font-size:0.5rem; letter-spacing:0.2em; color:var(--muted2); text-transform:uppercase; }
    /* ══════ STATS → CONTADOR EN VIVO ══════ */
    .m7-counter { margin:2.5rem 1.5rem; }
    .m7-counter-frame {
      border:2px solid var(--brd-i); border-radius:8px; background:var(--card);
      backdrop-filter:blur(12px); padding:1.6rem 1.3rem;
      position:relative; overflow:hidden;
    }
    .m7-counter-frame::before {
      content:''; position:absolute; top:0; left:8%; right:8%; height:1px;
      background:linear-gradient(90deg, transparent, var(--lime), var(--gold), transparent);
      opacity:0.6;
    }
    .m7-counter-label {
      display:flex; align-items:center; justify-content:center; gap:0.6rem;
      font-family:'DM Mono',monospace; font-size:0.52rem; letter-spacing:0.2em;
      color:var(--lime); text-transform:uppercase; margin-bottom:1.2rem;
    }
    .m7-counter-label-dot { width:5px; height:5px; border-radius:50%; background:var(--lime); animation:m7blink 1.2s step-start infinite; }
    .m7-counter-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0.6rem; }
    .m7-counter-unit { text-align:center; position:relative; }
    .m7-counter-unit:not(:last-child)::after {
      content:''; position:absolute; right:-0.32rem; top:20%; bottom:20%; width:1px;
      background:var(--brd);
    }
    .m7-counter-num {
      font-family:'Cinzel',serif; font-weight:900; font-size:clamp(1.6rem,7vw,2.3rem); line-height:1;
      background:linear-gradient(160deg, var(--lime2), var(--lime));
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      display:block; margin-bottom:0.3rem;
      font-variant-numeric:tabular-nums;
    }
    .m7-counter-unit-label { font-family:'DM Mono',monospace; font-size:0.46rem; letter-spacing:0.14em; color:var(--muted); text-transform:uppercase; }
    .m7-counter-foot { text-align:center; margin-top:1.1rem; font-family:'Crimson Text',serif; font-style:italic; font-size:0.78rem; color:var(--muted2); }

    /* ══════ LOCK SCREEN ══════ */
    .m7lk { position:fixed; inset:0; z-index:9999; overflow:hidden; display:flex; align-items:center; justify-content:center; }
    .m7lk-bg { position:absolute; inset:0; background: conic-gradient(from 200deg at 50% 55%, #0a0512 0deg, #150a22 70deg, #0a0512 130deg, #1a0d28 200deg, #0a0512 360deg); }
    .m7lk-glow1 { position:absolute; width:65vw; height:65vw; border-radius:50%; top:-18%; left:-12%; filter:blur(90px); background:radial-gradient(circle,rgba(120,40,200,0.24) 0%,transparent 65%); animation:m7lkg1 13s ease-in-out infinite alternate; }
    .m7lk-glow2 { position:absolute; width:58vw; height:58vw; border-radius:50%; bottom:-12%; right:-10%; filter:blur(90px); background:radial-gradient(circle,rgba(200,245,30,0.1) 0%,transparent 65%); animation:m7lkg2 17s ease-in-out infinite alternate; }
    @keyframes m7lkg1{to{transform:translate(7vw,9vh) scale(1.16)}}
    @keyframes m7lkg2{to{transform:translate(-8vw,-7vh) scale(1.2)}}

    .m7lk-grain { position:absolute; inset:0; pointer-events:none; opacity:0.05; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size:160px; }

    .m7lk-stars { position:absolute; inset:0; overflow:hidden; pointer-events:none; }
    .m7lk-star { position:absolute; border-radius:50%; background:#fff; animation:m7lkstar var(--dur,4s) ease-in-out infinite alternate; }
    @keyframes m7lkstar { 0%{opacity:0.1;transform:scale(0.7)} 100%{opacity:0.85;transform:scale(1.15)} }

    .m7lk-panel {
      position:relative; z-index:10; width:min(390px, calc(100vw - 2rem));
      background:rgba(15,8,24,0.82); backdrop-filter:blur(36px) saturate(1.3);
      border:2px solid rgba(200,245,30,0.18); border-radius:10px; overflow:hidden;
      box-shadow:0 40px 100px rgba(0,0,0,0.8), inset 0 0 60px rgba(120,40,200,0.05);
    }
    .m7lk-top { display:flex; align-items:center; justify-content:space-between; padding:0.8rem 1.2rem; background:rgba(200,245,30,0.05); border-bottom:2px solid rgba(200,245,30,0.12); }
    .m7lk-dots { display:flex; gap:6px; }
    .m7lk-dot { width:9px; height:9px; border-radius:50%; }
    .m7lk-dot:nth-child(1){background:var(--rust,#a8431e);} .m7lk-dot:nth-child(2){background:var(--gold,#d4a843);} .m7lk-dot:nth-child(3){background:var(--lime,#c8f51e);}
    .m7lk-id { font-family:'DM Mono',monospace; font-size:0.54rem; letter-spacing:0.18em; color:rgba(200,245,30,0.5); text-transform:uppercase; }
    .m7lk-status { display:flex; align-items:center; gap:5px; font-family:'DM Mono',monospace; font-size:0.48rem; letter-spacing:0.1em; color:rgba(200,245,30,0.4); }
    .m7lk-status-dot { width:5px; height:5px; border-radius:50%; background:var(--lime,#c8f51e); animation:m7blink 1.2s step-start infinite; }

    .m7lk-body { padding:2.6rem 2rem 2.2rem; text-align:center; }

    .m7lk-seal-wrap { position:relative; width:96px; height:96px; margin:0 auto 1.8rem; }
    .m7lk-seal-ring { position:absolute; inset:0; border-radius:50%; border:1px solid rgba(200,245,30,0.22); animation:m7lkring 3.2s ease-in-out infinite; }
    .m7lk-seal-ring2 { position:absolute; inset:9px; border-radius:50%; border:1px solid rgba(120,40,200,0.3); animation:m7lkring2 4.2s ease-in-out infinite reverse; }
    @keyframes m7lkring{0%,100%{transform:scale(1);opacity:0.5}50%{transform:scale(1.08);opacity:0.18}}
    @keyframes m7lkring2{0%,100%{transform:scale(1) rotate(0deg);opacity:0.4}100%{transform:scale(1.05) rotate(180deg);opacity:0.14}}
    .m7lk-seal-core {
      position:absolute; inset:18px; border-radius:50%;
      background:radial-gradient(circle at 38% 30%, rgba(212,168,67,0.3), rgba(120,40,200,0.18));
      border:1.5px solid rgba(212,168,67,0.4);
      display:flex; align-items:center; justify-content:center; font-size:1.7rem;
      box-shadow:0 0 32px rgba(200,245,30,0.18), inset 0 0 20px rgba(212,168,67,0.1);
      animation:m7lkcore 3.8s ease-in-out infinite;
    }
    @keyframes m7lkcore{0%,100%{box-shadow:0 0 32px rgba(200,245,30,0.18),inset 0 0 20px rgba(212,168,67,0.1)}50%{box-shadow:0 0 52px rgba(200,245,30,0.35),inset 0 0 28px rgba(212,168,67,0.18)}}

    .m7lk-label { font-family:'DM Mono',monospace; font-size:0.52rem; letter-spacing:0.26em; color:rgba(200,245,30,0.55); text-transform:uppercase; margin-bottom:0.7rem; }
    .m7lk-title { font-family:'Cinzel',serif; font-weight:900; font-size:1.9rem; line-height:1.15;
      background:linear-gradient(135deg,#f2eaf8 0%,#c8f51e 45%,#d4a843 100%);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:0.6rem; }
    .m7lk-sub { font-family:'Crimson Text',serif; font-style:italic; font-size:0.96rem; color:rgba(242,234,248,0.4); line-height:1.6; margin-bottom:2.1rem; }

    .m7lk-sep { display:flex; align-items:center; gap:0.8rem; margin:0 0 1.4rem; }
    .m7lk-sep-l { flex:1; height:1px; background:linear-gradient(90deg,transparent,rgba(212,168,67,0.3)); }
    .m7lk-sep-l.r { background:linear-gradient(270deg,transparent,rgba(212,168,67,0.3)); }
    .m7lk-sep-icon { font-size:0.85rem; opacity:0.55; color:var(--gold,#d4a843); }

    .m7lk-field-label { font-family:'DM Mono',monospace; font-size:0.5rem; letter-spacing:0.2em; color:rgba(200,245,30,0.5); text-transform:uppercase; text-align:left; display:block; margin-bottom:0.5rem; }
    .m7lk-field-wrap { position:relative; margin-bottom:0.4rem; }
    .m7lk-field {
      width:100%; padding:0.95rem 2.8rem 0.95rem 1.2rem;
      background:rgba(200,245,30,0.04); border:1px solid rgba(200,245,30,0.22); border-radius:6px;
      color:#f2eaf8; font-family:'DM Mono',monospace; font-size:0.88rem; letter-spacing:0.14em;
      outline:none; transition:all 0.3s; box-shadow:inset 0 2px 8px rgba(0,0,0,0.3);
    }
    .m7lk-field::placeholder { color:rgba(242,234,248,0.2); letter-spacing:0.08em; }
    .m7lk-field:focus { border-color:rgba(200,245,30,0.55); background:rgba(200,245,30,0.07); box-shadow:0 0 0 3px rgba(200,245,30,0.1), inset 0 2px 8px rgba(0,0,0,0.2); }
    .m7lk-field.err { border-color:rgba(168,67,30,0.65); background:rgba(168,67,30,0.06); animation:m7lkshake 0.4s ease; }
    @keyframes m7lkshake{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}75%{transform:translateX(7px)}}
    .m7lk-eye { position:absolute; right:0.9rem; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:rgba(242,234,248,0.3); font-size:0.9rem; padding:0.2rem; transition:color 0.3s; }
    .m7lk-eye:hover { color:rgba(200,245,30,0.7); }

    .m7lk-err { font-family:'DM Mono',monospace; font-size:0.52rem; letter-spacing:0.12em; color:rgba(232,90,60,0.85); text-align:left; min-height:1.2rem; margin-bottom:1rem; display:block; }

    .m7lk-btn {
      width:100%; padding:1rem 2rem; border-radius:6px;
      background:linear-gradient(135deg,#c8f51e,#7a9c0c);
      border:none; cursor:pointer; color:#0a0512;
      font-family:'Cinzel',serif; font-weight:700; font-size:0.82rem; letter-spacing:0.1em; text-transform:uppercase;
      box-shadow:0 8px 28px rgba(200,245,30,0.35); transition:all 0.35s; position:relative; overflow:hidden;
    }
    .m7lk-btn::before { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent); animation:m7lksheen 2.6s linear infinite; }
    @keyframes m7lksheen{to{left:100%}}
    .m7lk-btn:hover { transform:translateY(-1px); box-shadow:0 14px 38px rgba(200,245,30,0.5); }
    .m7lk-btn:disabled { opacity:0.5; transform:none; cursor:not-allowed; }

    .m7lk-foot { font-family:'DM Mono',monospace; font-size:0.5rem; letter-spacing:0.16em; color:rgba(242,234,248,0.2); text-transform:uppercase; margin-top:1.4rem; }
  `;
  document.head.appendChild(s);
};

// ─── Pájaros migrando — canvas con delta-time (nunca se "pausa" durante scroll) ─
// Clave del fix: en vez de avanzar la posición un valor fijo en cada frame,
// se calcula cuánto tiempo real pasó desde el último frame (dt) y se mueve
// proporcionalmente. Así, aunque el navegador salte o agrupe frames durante
// un scroll pesado, al volver a pintar los pájaros "saltan" a la posición
// correcta en vez de quedarse congelados o ir más lento.
const BirdsCanvas = memo(({ mode }) => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    let lastTime = performance.now();

    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const col = mode === "dark" ? "200,245,30" : "106,140,0";
    const W = () => c.width, H = () => c.height;

    // velocidades expresadas en "unidades por segundo" en vez de "por frame"
    const birds = Array.from({ length: 12 }, () => ({
      x: Math.random() * W(), y: Math.random() * H() * 0.7,
      vx: -(Math.random() * 24 + 9),          // px/s
      vy: (Math.random() - 0.5) * 3,          // px/s
      size: Math.random() * 7 + 5,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 3 + 3,           // rad/s para el aleteo
      alpha: Math.random() * 0.32 + 0.12,
    }));

    const drawBird = (ctx, s, flap) => {
      ctx.beginPath(); ctx.moveTo(-s, 0);
      ctx.quadraticCurveTo(-s * 0.3, -s * flap, 0, 0);
      ctx.quadraticCurveTo(s * 0.3, -s * flap, s, 0);
      ctx.stroke();
    };

    const draw = (now) => {
      // dt en segundos, con límite (clamp) para evitar saltos gigantes si la
      // pestaña estuvo en background o el navegador agrupó muchos frames
      let dt = (now - lastTime) / 1000;
      if (dt > 0.12) dt = 0.12; // tope de ~120ms por frame
      lastTime = now;

      ctx.clearRect(0, 0, W(), H());
      birds.forEach(b => {
        b.phase += b.speed * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt + Math.sin(b.phase * 0.3) * 3 * dt;
        if (b.x < -30) { b.x = W() + 20; b.y = Math.random() * H() * 0.7; }
        const flap = 0.5 + Math.sin(b.phase) * 0.5;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.globalAlpha = b.alpha;
        ctx.strokeStyle = `rgba(${col},0.9)`;
        ctx.lineWidth = 1.3;
        ctx.lineCap = "round";
        drawBird(ctx, b.size, flap);
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [mode]);

  return <canvas ref={ref} style={{ position:"fixed", inset:0, zIndex:1, pointerEvents:"none" }} />;
});

// ─── Partículas de polvo flotante (también con delta-time) ───────────────────
const DustMotes = memo(({ mode }) => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    let lastTime = performance.now();
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const col = mode === "dark" ? "242,234,248" : "74,21,128";
    const W = () => c.width, H = () => c.height;
    const motes = Array.from({ length: 32 }, () => ({
      x: Math.random() * W(), y: Math.random() * H(), r: Math.random() * 1.4 + 0.3,
      vy: -(Math.random() * 9 + 2), vx: (Math.random() - 0.5) * 5,
      alpha: Math.random() * 0.3 + 0.05, phase: Math.random() * Math.PI * 2,
    }));
    const draw = (now) => {
      let dt = (now - lastTime) / 1000;
      if (dt > 0.12) dt = 0.12;
      lastTime = now;
      ctx.clearRect(0, 0, W(), H());
      motes.forEach(m => {
        m.phase += 0.6 * dt;
        m.y += m.vy * dt; m.x += m.vx * dt + Math.sin(m.phase) * 6 * dt;
        if (m.y < -10) { m.y = H() + 10; m.x = Math.random() * W(); }
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${m.alpha * (0.6 + 0.4 * Math.sin(m.phase))})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [mode]);
  return <canvas ref={ref} style={{ position:"fixed", inset:0, zIndex:1, pointerEvents:"none" }} />;
});

// ─── DATOS ────────────────────────────────────────────────────────────────────
const ROUTE = [
  { id:1, coord:"MOMENTO · 01", title:"Lo que más nos gusta hacer", icon:"📍", desc:"Creo sinceramente que lo que más nos gusta hacer es simplemente estar juntos, porque nos amamos más que a nada." },
  { id:2, coord:"MOMENTO · 02", title:"Cuando te enojas conmigo", icon:"🧭", desc:"Me encanta molestarte y escuchar tus enojos conmigo porque sé que no son de verdad, creo que es una forma un poco extraña de la representación de nuestro amor" },
  { id:3, coord:"MOMENTO · 03", title:"Cuando cuentas historias", icon:"⛈️", desc:"No hay nada mejor que escucharte contar algo que te sucedió en el día o en tu vida, es un momento importante para mí porque sé que soy una persona en la que confías y amas genuinamente" },
  { id:4, coord:"MOMENTO · 04", title:"Cuánto nos conocemos", icon:"🏔️", desc:"Nuestro amor se nota que hasta cuando nos quedamos callados sabemos lo que va a decir el otro" },
  { id:5, coord:"MOMENTO · 05", title:"Cuando jugamos juntos", icon:"⭐", desc:"Cuando jugamos juntos es un momento especial para ambos porque es un momento donde los 2 hacemos lo que nos gusta pero lo mejor es que lo hacemos en compañía del uno al otro" },
];

const SONGS = [
    { id:1, name:"Muñequita Linda", artist:"Los panchos", spotifyId:"0pY1tu5AINIZ54Uuamo5cI" },
  { id:2, name:"How Deep Is Your Love", artist:"Bee Gees", spotifyId:"2JoZzpdeP2G6Csfdq5aLXP" },
   { id:3, name:"Congratulations", artist:"Mac Miller", spotifyId:"1OubIZ0ARYCUq5kceYUQiO" },
  { id:4, name:"Dream Girl", artist:"Crisaunt", spotifyId:"3Z6cltU0OfbUdSZtZlzKPL" },
  { id:5, name:"Propuesta (Proposta)", artist:"Roberto Carlos", spotifyId:"6nopQwepqS1F8LDCqZWz2G" },
];

// SVG ornamento de esquina (estilo manuscrito iluminado)
const OrnCorner = ({ className }) => (
  <svg className={className} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2 Q2 16 16 16 Q2 16 2 30" stroke="var(--gold,#d4a843)" strokeWidth="1.2" fill="none"/>
    <circle cx="2" cy="2" r="2.2" fill="var(--gold,#d4a843)"/>
    <path d="M6 6 Q12 6 12 12" stroke="var(--gold,#d4a843)" strokeWidth="0.8" fill="none" opacity="0.6"/>
  </svg>
);

// Fecha de inicio del "kilómetro siete" — ajusta si quieres otra fecha de referencia
const FECHA_INICIO = "2025-11-30";
const PASSWORD = "4015"; // ← cambia aquí la palabra clave

// ─── LOCK SCREEN ───────────────────────────────────────────────────────────────
function LockScreen({ onUnlock }) {
  const [pwd, setPwd]         = useState("");
  const [show, setShow]       = useState(false);
  const [err, setErr]         = useState(false);
  const [errMsg, setErrMsg]   = useState("");
  const [loading, setLoading] = useState(false);

  const attempt = useCallback(() => {
    if (pwd.trim().toLowerCase() === PASSWORD) {
      setLoading(true);
      setTimeout(() => { sessionStorage.setItem("m7_ok", "1"); onUnlock(); }, 700);
    } else {
      setErr(true); setErrMsg("Suma incorrecta ♥ inténtalo de nuevo");
      setTimeout(() => { setErr(false); setErrMsg(""); }, 2200);
      setPwd("");
    }
  }, [pwd, onUnlock]);

  const stars = useRef(Array.from({ length: 55 }, () => ({
    x: Math.random() * 100, y: Math.random() * 100,
    s: Math.random() * 2.2 + 0.4,
    dur: `${(Math.random() * 5 + 2).toFixed(1)}s`,
    del: `${(Math.random() * 6).toFixed(1)}s`,
    op: Math.random() * 0.55 + 0.1,
  }))).current;

  return (
    <div className="m7lk">
      <div className="m7lk-bg" />
      <div className="m7lk-glow1" /><div className="m7lk-glow2" />
      <div className="m7lk-grain" />
      <BirdsCanvas mode="dark" />

      <div className="m7lk-stars">
        {stars.map((st, i) => (
          <div key={i} className="m7lk-star" style={{
            left:`${st.x}%`, top:`${st.y}%`, width:`${st.s}px`, height:`${st.s}px`,
            opacity:st.op, "--dur":st.dur, animationDelay:st.del,
          }} />
        ))}
      </div>

      <motion.div className="m7lk-panel"
        initial={{ opacity:0, y:50, scale:0.92 }} animate={{ opacity:1, y:0, scale:1 }}
        transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}>
        <div className="m7lk-top">
          <div className="m7lk-dots"><div className="m7lk-dot" /><div className="m7lk-dot" /><div className="m7lk-dot" /></div>
          <span className="m7lk-id">Capitulo · bloqueado</span>
          <div className="m7lk-status"><div className="m7lk-status-dot" />EN RUTA</div>
        </div>

        <div className="m7lk-body">
          <div className="m7lk-seal-wrap">
            <div className="m7lk-seal-ring" /><div className="m7lk-seal-ring2" />
            <motion.div className="m7lk-seal-core" animate={{ scale:[1,1.04,1] }} transition={{ repeat:Infinity, duration:3.6, ease:"easeInOut" }}>
              🧭
            </motion.div>
          </div>

          <p className="m7lk-label">✦ Capitulo bloqueado</p>
          <h2 className="m7lk-title">Para mi amorcito,<br/>capitulo siete</h2>
          <p className="m7lk-sub"><br/>¿Cual es el resultado de sumar nuestros años de nacimiento?</p>

          <div className="m7lk-sep"><div className="m7lk-sep-l" /><span className="m7lk-sep-icon">❦</span><div className="m7lk-sep-l r" /></div>

          <label className="m7lk-field-label">_ Resultado de la suma:</label>
          <div className="m7lk-field-wrap">
            <input
              className={`m7lk-field${err ? " err" : ""}`}
              type={show ? "text" : "password"}
              placeholder="···············"
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              onKeyDown={e => e.key === "Enter" && attempt()}
              autoFocus autoComplete="off"
            />
            <button className="m7lk-eye" onClick={() => setShow(v => !v)} tabIndex={-1}>{show ? "🙈" : "👁️"}</button>
          </div>

          <span className="m7lk-err">{errMsg}</span>

          <motion.button className="m7lk-btn" onClick={attempt} disabled={loading || !pwd} whileTap={{ scale:0.97 }}>
            {loading ? "Abriendo..." : "▶  ENTRAR"}
          </motion.button>

          <p className="m7lk-foot">Solo tú conoces la respuesta ♥</p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function Mes7({ mode, toggleMode }) {
  const nav = useNavigate();
  const [unlocked, setUnlocked] = useState(false);
  const [activeStop, setActiveStop] = useState(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [activeSong, setActiveSong] = useState(null);
  const [isPlaying, setIsPlaying]   = useState(false);
  const [bottleOpen, setBottleOpen] = useState(false);

  useEffect(() => { 
    injectStyles(); 
    // Verificar si ya está desbloqueado
    if (sessionStorage.getItem("m7_ok") === "1") {
      setUnlocked(true);
    }
  }, []);

  // Si no está desbloqueado, mostrar el LockScreen
  if (!unlocked) {
    return <LockScreen onUnlock={() => setUnlocked(true)} />;
  }

  const sr = (delay = 0) => ({
    initial: { opacity:0, y:22 },
    whileInView: { opacity:1, y:0 },
    viewport: { once:true, margin:"-60px" },
    transition: { duration:0.7, delay, ease:[0.22,1,0.36,1] },
  });

  const currentSong = SONGS.find(s => s.id === activeSong);

  const handleTrackClick = (id) => {
    if (activeSong === id) setIsPlaying(p => !p);
    else { setActiveSong(id); setIsPlaying(true); }
  };

  return (
    <div className={`m7 ${mode}`}>
      <div className="m7-bg">
        <div className="m7-stain m7-stain1" />
        <div className="m7-stain m7-stain2" />
      </div>
      <div className="m7-paper-tex" />
      <div className="m7-vignette" />
      <BirdsCanvas mode={mode} />
      <DustMotes mode={mode} />

      <div className="m7-content">

        {/* NAV */}
        <nav className="m7-nav">
          <button className="m7-back" onClick={() => nav("/")}>← Volver</button>
          <span className="m7-stamp">✦ Mes Siete</span>
          <button className="m7-toggle" onClick={toggleMode}>{mode === "dark" ? "☀️" : "🌙"}</button>
        </nav>

        {/* HERO */}
        <section className="m7-hero">
          <div className="m7-hero-stamp-decor"><span>🧭</span></div>
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
            <div className="m7-typewriter-line">Capítulo siete <span className="m7-typewriter-cursor" /></div>
            <span className="m7-htitle">Un nuevo<br/>capítulo</span>
            <span className="m7-htitle2">en nuestro viaje juntos</span>
          </motion.div>
          <motion.div className="m7-hero-meta" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}>
            <span>JUNIO · 2026</span>
            <div className="m7-hero-meta-divider" />
            <span>SIETE MESES DE RUTA</span>
          </motion.div>
          <div className="m7-ruled" />
        </section>

        {/* STATS */}
        <motion.div className="m7-stats" {...sr(0)}>
          {[
            { n:"7", l:"Meses de viaje" },
            { n:"210+", l:"Días recorridos" },
            { n:"∞", l:"Kilómetros por andar" },
            { n:"2", l:"Viajeros, un destino" },
          ].map((st,i) => (
            <motion.div key={i} className="m7-stat" {...sr(i*0.07)}>
              <span className="m7-stat-n">{st.n}</span>
              <span className="m7-stat-l">{st.l}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CITA */}
        <motion.section className="m7-quote-wrap" {...sr(0)}>
          <p className="m7-quote-txt">
            Un nuevo paso en nuestro camino,<span className="m7-quote-lime"> gracias por ser</span> el amor de mi vida.
          </p>
          <div className="m7-quote-by">eithan, junio 2026</div>
        </motion.section>

        {/* MAPA / RUTA */}
        <section className="m7-map-section">
          <motion.div className="m7-sec" {...sr(0)}>
            <span className="m7-sec-num">§01</span>
            <span className="m7-sec-txt">Los mejores momentos</span>
            <div className="m7-sec-line" />
          </motion.div>
          <motion.div className="m7-map-wrap" {...sr(0.08)}>
            <div className="m7-map-corner tl" /><div className="m7-map-corner tr" />
            <div className="m7-map-corner bl" /><div className="m7-map-corner br" />
            <div className="m7-compass">🧭</div>
            <div className="m7-route">
              {ROUTE.map((stop, i) => (
                <motion.div key={stop.id} className={`m7-route-stop ${activeStop === stop.id ? "active" : ""}`}
                  onClick={() => setActiveStop(activeStop === stop.id ? null : stop.id)} {...sr(i * 0.06)}>
                  <div className="m7-route-pin">{stop.icon}</div>
                  <div className="m7-route-body">
                    <div className="m7-route-coord">{stop.coord}</div>
                    <div className="m7-route-title">{stop.title}</div>
                    <div className="m7-route-desc">{stop.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <div className="m7-div"><div className="m7-div-l" /><span className="m7-div-i">♪</span><div className="m7-div-l" /></div>

        {/* MÚSICA — WALKMAN */}
        <section className="m7-radio-section">
          <motion.div className="m7-sec" {...sr(0)}>
            <span className="m7-sec-num">§02</span>
            <span className="m7-sec-txt">Pequeña playlist</span>
            <div className="m7-sec-line" />
          </motion.div>

          <motion.p className="m7-radio-intro" {...sr(0.05)}>
            Pequeñas dedicaciones para <strong>Mi vida linda.</strong>
          </motion.p>

          <motion.div className="m7-walkman" {...sr(0.1)}>
            <div className="m7-screw tl" /><div className="m7-screw tr" /><div className="m7-screw bl" /><div className="m7-screw br" />

            {/* ventana de casete con carretes */}
            <div className="m7-cassette-window">
              <div className="m7-cassette-body">
                <div className="m7-reel-wrap"><div className={`m7-reel${isPlaying && activeSong ? " spin" : ""}`} /></div>
                <div className="m7-tape-line" />
                <div className="m7-reel-wrap"><div className={`m7-reel${isPlaying && activeSong ? " spin" : ""}`} /></div>
              </div>

              <div className="m7-tape-label">
                {currentSong ? (
                  <>
                    <span className="m7-tape-status">
                      <span className="m7-tape-status-dot" />
                      {isPlaying ? "REPRODUCIENDO" : "EN PAUSA"}
                    </span>
                    <span className="m7-tape-song">{currentSong.name}</span>
                    <span className="m7-tape-artist">{currentSong.artist}</span>
                  </>
                ) : (
                  <span className="m7-tape-empty">Selecciona una canción de la lista ↓</span>
                )}
              </div>

              {currentSong && isPlaying && (
                <div className="m7-vu-wrap">
                  <div className="m7vu" /><div className="m7vu" /><div className="m7vu" /><div className="m7vu" /><div className="m7vu" /><div className="m7vu" /><div className="m7vu" />
                </div>
              )}
            </div>

            {/* controles físicos */}
            <div className="m7-controls">
              <button className="m7-ctrl-btn" onClick={() => {
                const i = SONGS.findIndex(s => s.id === activeSong);
                const prev = SONGS[(i - 1 + SONGS.length) % SONGS.length];
                setActiveSong(prev.id); setIsPlaying(true);
              }}>⏮</button>
              <button className="m7-ctrl-play" onClick={() => {
                if (!activeSong) { setActiveSong(SONGS[0].id); setIsPlaying(true); }
                else setIsPlaying(v => !v);
              }}>{isPlaying && activeSong ? "⏸" : "▶"}</button>
              <button className="m7-ctrl-btn" onClick={() => {
                const i = SONGS.findIndex(s => s.id === activeSong);
                const next = SONGS[(i + 1) % SONGS.length];
                setActiveSong(next.id); setIsPlaying(true);
              }}>⏭</button>
            </div>

            {/* lista de canciones */}
            <div className="m7-tracklist">
              <div className="m7-tracklist-hd">
                <span className="m7-tracklist-hd-l">♦ Lado A · Mixtape Diana</span>
                <span className="m7-tracklist-hd-r">{SONGS.length} pistas</span>
              </div>
              {SONGS.map((song, i) => (
                <div key={song.id} className={`m7-track${activeSong === song.id ? " on" : ""}`} onClick={() => handleTrackClick(song.id)}>
                  <span className="m7-track-side">{String(i + 1).padStart(2, "0")}</span>
                  <div className="m7-track-info">
                    <span className="m7-track-name">{song.name}</span>
                    <span className="m7-track-artist">{song.artist}</span>
                  </div>
                  <div className="m7-track-right">
                    <div className="m7-track-icon">{activeSong === song.id && isPlaying ? "⏸" : "▶"}</div>
                  </div>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {activeSong && (
                <motion.div className="m7-embed"
                  initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
                  transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}>
                  <iframe
                    src={`https://open.spotify.com/embed/track/${currentSong?.spotifyId}?utm_source=generator&theme=0`}
                    width="100%" height="152"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy" title="Spotify player"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <p className="m7-radio-note">Toca una canción para escucharla en Spotify ♥</p>
        </section>

        <div className="m7-div"><div className="m7-div-l" /><span className="m7-div-i">✉</span><div className="m7-div-l" /></div>

        {/* CARTA — MANUSCRITO ILUMINADO */}
        <section className="m7-letter-section">
          <motion.div className="m7-sec" {...sr(0)}>
            <span className="m7-sec-num">§03</span>
            <span className="m7-sec-txt">Un manuscrito para ti</span>
            <div className="m7-sec-line" />
          </motion.div>

          <motion.div {...sr(0.08)}>
            <div className="m7-manuscript-cover">
              <OrnCorner className="m7-orn-corner tl" />
              <OrnCorner className="m7-orn-corner tr" />
              <OrnCorner className="m7-orn-corner bl" />
              <OrnCorner className="m7-orn-corner br" />

              <AnimatePresence mode="wait">
                {!letterOpen ? (
                  <motion.div key="closed" className="m7-manuscript-closed" onClick={() => setLetterOpen(true)}
                    initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}>
                    <div className="m7-gold-seal">VII</div>
                    <p className="m7-manuscript-title">Para Diana, capitulo siete</p>
                    <span className="m7-manuscript-hint">✦ Toca para desplegar el manuscrito ✦</span>
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ opacity:0, rotateX:-8, y:14 }} animate={{ opacity:1, rotateX:0, y:0 }} exit={{ opacity:0 }}
                    transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}>
                    <div className="m7-manuscript-page">
                      <div className="m7-manuscript-inner">
                        <div className="m7-dropcap-wrap">
                          <span className="m7-dropcap">Amor,</span>
                        </div>
                        <div className="m7-manuscript-text">
                          <p>Ya 7 meses desde que estamos juntos y cada día es mejor que el anterior, cada vez que te hago una de estas páginas siento que no es lo suficiente para poder plasmar</p>
                          <p>todo lo que yo siento por ti, te mereces todo en esta vida y yo estoy seguro que juntos lo vamos a lograr, eres mi vida mi amor hermoso, desde que te vi la primera vez</p>
                          <p>supe que eras una persona diferente y única en todo aspecto, muchas veces te lo he dicho pero creo que la distancia no es impedimento para el gran amor que nos tenemos,</p>
                          <p>porque los 2 sabemos que quisiéramos estar todo el día juntos amor, pero yo te prometo que en un futuro podremos estar juntos y con todos nuestros sueños cumplidos</p>
                          <p>estoy agradecido contigo por la paciencia que me tienes y la manera de amarme y elegirme todos los días, te prometo que yo no te voy a fallar y siempre voy a estar</p>
                          <p>para ti en todo momento, nunca más vas a volver a estar sola si estás a mi lado, desde que llegaste todo lo volviste mejor y cada día sacas lo mejor de mí, por eso te amo</p>
                          <p>y te amaré siempre mi vida hermosa.</p>
                          <div className="m7-flourish-divider">
                            <div className="m7-flourish-line" />
                            <span className="m7-flourish-icon">❦</span>
                            <div className="m7-flourish-line r" />
                          </div>
                        </div>
                        <div className="m7-manuscript-sign-wrap">
                          <span className="m7-manuscript-closing">Con todo mi amor,</span>
                          <span className="m7-manuscript-sign">EITHAN ♥</span>
                        </div>
                      </div>
                      <button className="m7-manuscript-close-btn" onClick={() => setLetterOpen(false)}>← Cerrar manuscrito</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        <div className="m7-div"><div className="m7-div-l" /><span className="m7-div-i">⚓</span><div className="m7-div-l" /></div>


        <motion.footer className="m7-footer" {...sr(0)}>
          <div className="m7-footer-seal">VII</div>
          <p className="m7-footer-mark">"Gracias por ser tú, mi amor"</p>
          <p className="m7-footer-num">Junio 2026 · Capítulo siete · Hasta la eternidad</p>
        </motion.footer>
      </div>

      {/* MODAL MENSAJE EN BOTELLA */}
      <AnimatePresence>
        {bottleOpen && (
          <motion.div className="m7-modal-ov" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setBottleOpen(false)}>
            <motion.div className="m7-modal"
              initial={{ opacity:0, scale:0.88, rotate:-2 }} animate={{ opacity:1, scale:1, rotate:0 }} exit={{ opacity:0, scale:0.92 }}
              transition={{ duration:0.5, ease:[0.22,1,0.36,1] }} onClick={e => e.stopPropagation()}>
              <span className="m7-modal-icon">📜</span>
              <h3 className="m7-modal-title">Mensaje encontrado</h3>
              <p className="m7-modal-text">
                "Si estás leyendo esto, significa que seguimos eligiéndonos. Que sin importar cuántos kilómetros más recorramos,{" "}
                <strong>seguimos siendo nosotros dos contra el mapa del mundo</strong>. Feliz mes siete, mi amor — que sea el primero de muchos más por descubrir."
              </p>
              <button className="m7-modal-close" onClick={() => setBottleOpen(false)}>✦ Guardar este mensaje</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}