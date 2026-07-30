import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ════════════════════════════════════════════════════════════════════════════
// MES 8 — "El Lazo Infinito"
// ════════════════════════════════════════════════════════════════════════════

const injectStyles = () => {
  if (document.getElementById("m8-st")) return;
  const s = document.createElement("style");
  s.id = "m8-st";
  s.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Space+Mono:wght@400;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

    .m8.dark{
      --wine:#4a1526; --wine2:#6b1e3c; --wine3:rgba(107,30,60,0.35);
      --gold:#c9a24b; --gold2:#e8cc85; --gold3:rgba(201,162,75,0.16);
      --bg:#160810;
      --paper:#241019; --paper2:#2e141f;
      --cream:#f6e9d8; --muted:rgba(246,233,216,0.55); --muted2:rgba(246,233,216,0.26);
      --blush:#d98a9b;
      --brd:rgba(201,162,75,0.18); --brd-a:rgba(201,162,75,0.42);
      --ink-on-paper:#f6e9d8;
      --nav-bg:rgba(22,8,16,0.85);
    }
    .m8.light{
      --wine:#6b1e3c; --wine2:#8a2a50; --wine3:rgba(107,30,60,0.08);
      --gold:#a9822f; --gold2:#c9a24b; --gold3:rgba(169,130,47,0.1);
      --bg:#fbf1e4;
      --paper:#fffbf3; --paper2:#f3e4cc;
      --cream:#2b1810; --muted:rgba(43,24,16,0.6); --muted2:rgba(43,24,16,0.3);
      --blush:#b5546e;
      --brd:rgba(107,30,60,0.14); --brd-a:rgba(169,130,47,0.4);
      --ink-on-paper:#2b1810;
      --nav-bg:rgba(251,241,228,0.88);
    }

    .m8{min-height:100vh;font-family:'Newsreader',serif;color:var(--cream);overflow-x:hidden;position:relative;background:var(--bg);}
    .m8-content{position:relative;z-index:2;}

    /* ══════ FONDO ══════ */
    .m8-bg{position:fixed;inset:0;z-index:0;pointer-events:none;}
    .m8.dark .m8-bg{background:radial-gradient(ellipse 70% 55% at 15% 0%, rgba(107,30,60,0.4) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 90% 95%, rgba(201,162,75,0.09) 0%, transparent 55%), #160810;}
    .m8.light .m8-bg{background:radial-gradient(ellipse 70% 55% at 15% 0%, rgba(107,30,60,0.08) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 90% 95%, rgba(169,130,47,0.12) 0%, transparent 55%), #fbf1e4;}
    .m8-paper-tex{position:fixed;inset:0;z-index:1;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='5' seed='8' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:280px;}
    .m8.dark .m8-paper-tex{opacity:0.05;mix-blend-mode:overlay;}
    .m8.light .m8-paper-tex{opacity:0.035;mix-blend-mode:multiply;}
    .m8-vignette{position:fixed;inset:0;z-index:1;pointer-events:none;box-shadow:inset 0 0 190px rgba(0,0,0,0.38);}
    .m8.light .m8-vignette{box-shadow:inset 0 0 130px rgba(80,20,40,0.08);}

    /* ══════ NAV ══════ */
    .m8-nav{display:flex;justify-content:space-between;align-items:center;padding:1.2rem 1.4rem;border-bottom:1px solid var(--brd-a);background:var(--nav-bg);backdrop-filter:blur(18px);position:sticky;top:0;z-index:100;}
    .m8-nav-left{display:flex;align-items:center;gap:1rem;}
    .m8-back{display:flex;align-items:center;gap:0.5rem;font-family:'Space Mono',monospace;font-size:0.58rem;letter-spacing:0.14em;color:var(--muted);text-transform:uppercase;cursor:pointer;border:none;background:none;transition:color 0.3s;padding:0.4rem 0.8rem;border-radius:4px;border:1px solid transparent;}
    .m8-back:hover{color:var(--gold);border-color:var(--brd-a);}
    .m8-nav-mark{font-family:'Space Mono',monospace;font-size:0.58rem;letter-spacing:0.16em;color:var(--gold);text-transform:uppercase;}
    .m8-nav-title{font-family:'Fraunces',serif;font-weight:600;font-style:italic;font-size:0.95rem;color:var(--cream);}
    .m8-toggle{width:36px;height:36px;border-radius:50%;border:1px solid var(--brd-a);background:var(--wine3);cursor:pointer;color:var(--cream);font-size:0.9rem;display:flex;align-items:center;justify-content:center;transition:all .3s;}
    .m8-toggle:hover{background:var(--gold3);border-color:var(--gold);}

    /* ══════ HERO ══════ */
    .m8-hero{padding:4.2rem 1.5rem 2.5rem;text-align:center;position:relative;}
    .m8-hero-eyebrow{display:inline-flex;align-items:center;gap:0.6rem;font-family:'Space Mono',monospace;font-size:0.6rem;letter-spacing:0.24em;color:var(--gold2);text-transform:uppercase;margin-bottom:1.6rem;}
    .m8-hero-eyebrow-dot{width:5px;height:5px;border-radius:50%;background:var(--gold);}
    .m8-ribbon-svg{width:min(260px,60vw);height:auto;margin:0 auto 1.6rem;display:block;}
    .m8-htitle{font-family:'Fraunces',serif;font-weight:600;font-style:italic;font-size:clamp(2.6rem,10vw,5.2rem);line-height:1.02;letter-spacing:-0.01em;}
    .m8.dark .m8-htitle{background:linear-gradient(135deg,#f6e9d8 0%,var(--gold2) 45%,var(--blush) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 8px 26px rgba(201,162,75,0.16));}
    .m8.light .m8-htitle{background:linear-gradient(135deg,var(--wine) 0%,var(--wine2) 45%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .m8-hsub{font-family:'Newsreader',serif;font-style:italic;font-weight:400;font-size:clamp(1.05rem,3vw,1.3rem);color:var(--muted);margin-top:1rem;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.6;}
    .m8-hero-lede{max-width:600px;margin:2.2rem auto 0;font-size:1.05rem;line-height:1.9;color:var(--muted);}
    .m8-hero-lede strong{color:var(--gold2);font-weight:600;}

    /* ══════ BOLETO / CONTADOR ══════ */
    .m8-ticket-wrap{margin:3.5rem 1.5rem;display:flex;justify-content:center;}
    .m8-ticket{position:relative;max-width:640px;width:100%;background:var(--paper);border:1px solid var(--brd-a);border-radius:4px;box-shadow:0 30px 70px rgba(0,0,0,0.28);overflow:hidden;color:var(--ink-on-paper);}
    .m8-ticket-notch{position:absolute;top:50%;transform:translateY(-50%);width:26px;height:26px;border-radius:50%;background:var(--bg);z-index:2;}
    .m8-ticket-notch.l{left:-13px;} .m8-ticket-notch.r{right:-13px;}
    .m8-ticket-perf{position:absolute;top:0;bottom:0;width:1px;background-image:repeating-linear-gradient(0deg, var(--brd-a) 0 6px, transparent 6px 13px);}
    .m8-ticket-perf.l{left:78px;} .m8-ticket-perf.r{right:78px;}
    .m8-ticket-stub{width:78px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--wine3);}
    .m8-ticket-stub span{writing-mode:vertical-rl;font-family:'Space Mono',monospace;font-size:0.56rem;letter-spacing:0.22em;color:var(--gold);text-transform:uppercase;}
    .m8-ticket-body{flex:1;padding:1.6rem 1.5rem;}
    .m8-ticket-row{display:flex;}
    .m8-ticket-hd{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:1.3rem;}
    .m8-ticket-hd-l{font-family:'Space Mono',monospace;font-size:0.55rem;letter-spacing:0.16em;color:var(--wine2);text-transform:uppercase;}
    .m8-ticket-hd-r{font-family:'Space Mono',monospace;font-size:0.55rem;color:rgba(43,24,16,0.4);}
    .m8.dark .m8-ticket-hd-r{color:rgba(246,233,216,0.35);}
    .m8-ticket-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0.6rem;}
    .m8-ticket-unit{text-align:center;position:relative;}
    .m8-ticket-unit:not(:last-child)::after{content:'';position:absolute;right:-0.32rem;top:15%;bottom:15%;width:1px;background:var(--brd);}
    .m8-ticket-n{font-family:'Fraunces',serif;font-weight:700;font-size:clamp(1.7rem,6.5vw,2.4rem);line-height:1;color:var(--wine2);display:block;margin-bottom:0.35rem;font-variant-numeric:tabular-nums;}
    .m8.dark .m8-ticket-n{color:var(--gold2);}
    .m8-ticket-l{font-family:'Space Mono',monospace;font-size:0.46rem;letter-spacing:0.14em;color:rgba(43,24,16,0.5);text-transform:uppercase;}
    .m8.dark .m8-ticket-l{color:var(--muted2);}
    .m8-ticket-foot{margin-top:1.2rem;padding-top:1rem;border-top:1px dashed var(--brd);font-family:'Newsreader',serif;font-style:italic;font-size:0.82rem;color:rgba(43,24,16,0.55);text-align:center;}
    .m8.dark .m8-ticket-foot{color:var(--muted);}

    /* ══════ SECTION LABEL ══════ */
    .m8-sec{display:flex;align-items:center;gap:1rem;padding:0 1.5rem;margin-bottom:1.8rem;}
    .m8-sec-icon{font-size:0.85rem;color:var(--gold);}
    .m8-sec-txt{font-family:'Space Mono',monospace;font-size:0.58rem;letter-spacing:0.24em;color:var(--gold2);text-transform:uppercase;}
    .m8-sec-line{flex:1;height:1px;background:linear-gradient(90deg,var(--brd-a),transparent);}

    /* ══════ CINTA DE CAPÍTULOS ══════ */
    .m8-ribbon-section{padding:1rem 1.5rem 3rem;}
    .m8-ribbon-track{position:relative;max-width:640px;margin:0 auto;padding-left:2.4rem;}
    .m8-ribbon-line{position:absolute;left:11px;top:6px;bottom:6px;width:3px;border-radius:3px;background:linear-gradient(180deg,var(--gold) 0%,var(--wine2) 50%,var(--gold) 100%);box-shadow:0 0 14px rgba(201,162,75,0.35);}
    .m8-ribbon-item{position:relative;margin-bottom:2.6rem;}
    .m8-ribbon-item:last-child{margin-bottom:0;}
    .m8-ribbon-seal{position:absolute;left:-2.4rem;top:0;width:24px;height:24px;border-radius:50%;background:radial-gradient(circle at 35% 28%, var(--gold2), var(--gold) 55%, #8a661c 100%);display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-weight:700;font-size:0.6rem;color:#3a2608;box-shadow:0 4px 14px rgba(201,162,75,0.4);}
    .m8-ribbon-card{background:var(--paper);border:1px solid var(--brd);border-radius:6px;padding:1.5rem 1.6rem;box-shadow:0 14px 34px rgba(0,0,0,0.16);}
    .m8-ribbon-date{font-family:'Space Mono',monospace;font-size:0.52rem;letter-spacing:0.14em;color:var(--gold);text-transform:uppercase;margin-bottom:0.5rem;}
    .m8-ribbon-title{font-family:'Fraunces',serif;font-weight:600;font-size:1.15rem;color:var(--ink-on-paper);margin-bottom:0.45rem;}
    .m8.dark .m8-ribbon-title{color:var(--cream);}
    .m8-ribbon-desc{font-size:0.94rem;line-height:1.7;color:rgba(43,24,16,0.68);}
    .m8.dark .m8-ribbon-desc{color:var(--muted);}

    /* ══════ MEDALLONES / RECUERDOS (flip) ══════ */
    .m8-lockets-section{padding:1rem 1.5rem 3rem;}
    .m8-lockets-intro{text-align:center;font-family:'Newsreader',serif;font-style:italic;font-size:1rem;color:var(--muted);max-width:480px;margin:0 auto 2.2rem;line-height:1.7;}
    .m8-lockets-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.4rem;max-width:760px;margin:0 auto;}
    .m8-locket{perspective:1200px;height:220px;cursor:pointer;}
    .m8-locket-inner{position:relative;width:100%;height:100%;transition:transform 0.7s cubic-bezier(.22,1,.36,1);transform-style:preserve-3d;}
    .m8-locket.flipped .m8-locket-inner{transform:rotateY(180deg);}
    .m8-locket-face{position:absolute;inset:0;border-radius:14px;backface-visibility:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:1.4rem;}
    .m8-locket-front{background:radial-gradient(ellipse at 50% 20%, var(--wine3), var(--paper) 70%);border:1.5px solid var(--brd-a);box-shadow:0 16px 34px rgba(0,0,0,0.2);}
    .m8-locket-icon{font-size:2rem;margin-bottom:0.8rem;}
    .m8-locket-name{font-family:'Fraunces',serif;font-weight:600;font-style:italic;font-size:1.1rem;color:var(--cream);}
    .m8-locket-hint{margin-top:0.6rem;font-family:'Space Mono',monospace;font-size:0.46rem;letter-spacing:0.14em;color:var(--muted2);text-transform:uppercase;}
    .m8-locket-back{background:linear-gradient(160deg,var(--gold3),var(--paper2));border:1.5px solid var(--gold);transform:rotateY(180deg);box-shadow:0 16px 34px rgba(0,0,0,0.24);}
    .m8-locket-back p{font-size:0.9rem;line-height:1.65;color:var(--cream);}
    .m8-locket-tag{font-family:'Space Mono',monospace;font-size:0.44rem;letter-spacing:0.14em;color:var(--gold2);text-transform:uppercase;margin-bottom:0.6rem;}

    /* ══════ REPRODUCTOR — MIXTAPE MES VIII ══════ */
    .m8-vinyl-section{padding:1rem 1.5rem 3rem;}
    .m8-vinyl-intro{text-align:center;font-family:'Newsreader',serif;font-style:italic;font-size:1rem;color:var(--muted);margin-bottom:2rem;}
    .m8-vinyl-intro strong{color:var(--gold2);font-weight:600;}

    .m8-player{max-width:600px;margin:0 auto;}
    .m8-player-header{text-align:center;margin-bottom:1.6rem;}
    .m8-player-disc{width:56px;height:56px;margin:0 auto 0.9rem;border-radius:50%;background:repeating-radial-gradient(circle,#1a0a10 0 3px, var(--wine) 3px 6px);display:flex;align-items:center;justify-content:center;box-shadow:0 8px 20px rgba(0,0,0,0.3);}
    .m8-player-disc-center{width:20px;height:20px;border-radius:50%;background:radial-gradient(circle at 35% 30%, var(--gold2), var(--gold));}
    .m8-player-title{font-family:'Fraunces',serif;font-weight:600;font-style:italic;font-size:1.35rem;color:var(--cream);}
    .m8-player-sub{font-family:'Space Mono',monospace;font-size:0.5rem;letter-spacing:0.16em;color:var(--gold);text-transform:uppercase;margin-top:0.4rem;}

    .m8-tracklist{display:flex;flex-direction:column;gap:0.7rem;}
    .m8-track{background:var(--paper);border:1px solid var(--brd);border-radius:14px;overflow:hidden;transition:border-color .25s;}
    .m8-track.on{border-color:var(--gold);}
    .m8-track-row{display:flex;align-items:center;gap:0.9rem;padding:0.9rem 1.1rem;cursor:pointer;}
    .m8-track-num{width:32px;height:32px;flex-shrink:0;border-radius:50%;background:var(--wine3);color:var(--gold2);display:flex;align-items:center;justify-content:center;font-family:'Space Mono',monospace;font-size:0.68rem;}
    .m8-track.on .m8-track-num{background:var(--gold);color:#3a2608;}
    .m8-track-info{flex:1;min-width:0;}
    .m8-track-name{font-family:'Fraunces',serif;font-weight:600;font-size:1rem;color:var(--cream);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .m8-track-artist{font-family:'Space Mono',monospace;font-size:0.6rem;letter-spacing:0.05em;color:var(--gold);margin-top:0.15rem;}
    .m8-track-note{font-size:0.78rem;color:var(--muted2);margin-top:0.2rem;font-style:italic;}
    .m8-track-btn{width:32px;height:32px;flex-shrink:0;border-radius:50%;background:var(--wine3);color:var(--cream);display:flex;align-items:center;justify-content:center;font-size:0.68rem;}
    .m8-track.on .m8-track-btn{background:var(--gold);color:#3a2608;}
    .m8-track-embed{aspect-ratio:16/9;background:#000;border-top:1px solid var(--brd-a);}
    .m8-track-embed iframe{width:100%;height:100%;border:none;display:block;}
    .m8-vinyl-note{text-align:center;margin-top:1.4rem;font-family:'Newsreader',serif;font-style:italic;font-size:0.82rem;color:var(--muted2);}

    /* ══════ CARTA SELLADA ══════ */
    .m8-letter-section{padding:1rem 1.5rem 3rem;}
    .m8-envelope{max-width:560px;margin:0 auto;position:relative;}
    .m8-envelope-closed{background:linear-gradient(160deg,var(--wine3),var(--paper) 70%);border:1.5px solid var(--brd-a);border-radius:10px;padding:3.2rem 1.8rem;text-align:center;cursor:pointer;box-shadow:0 30px 70px rgba(0,0,0,0.26);position:relative;}
    .m8-envelope-flap{position:absolute;top:0;left:0;right:0;height:70px;background:linear-gradient(160deg,var(--wine2),var(--wine));clip-path:polygon(0 0,50% 62%,100% 0);border-radius:10px 10px 0 0;}
    .m8-seal{width:74px;height:74px;border-radius:50%;margin:0.6rem auto 1.4rem;background:radial-gradient(circle at 35% 28%, var(--gold2), var(--gold) 50%, #8a661c 100%);display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-weight:700;font-size:1.4rem;color:#3a2608;box-shadow:0 8px 26px rgba(201,162,75,0.4), inset 0 -3px 8px rgba(0,0,0,0.3), inset 0 3px 6px rgba(255,255,255,0.25);position:relative;z-index:1;border:2px solid rgba(201,162,75,0.4);}
    .m8-envelope-title{font-family:'Fraunces',serif;font-weight:600;font-style:italic;font-size:1.3rem;color:var(--cream);margin-bottom:0.6rem;}
    .m8-envelope-hint{font-family:'Space Mono',monospace;font-size:0.5rem;letter-spacing:0.2em;color:var(--muted2);text-transform:uppercase;}

    .m8-letter-page{background:linear-gradient(170deg,#2b0f1a 0%,#3a1420 100%);color:#ffffff;border-radius:10px;border:1px solid var(--brd-a);box-shadow:0 30px 70px rgba(0,0,0,0.35);padding:2.6rem 1.9rem 2rem;position:relative;overflow:hidden;}
    .m8-letter-page::before{content:'';position:absolute;inset:0;pointer-events:none;opacity:0.5;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");}
    .m8-dropcap{font-family:'Fraunces',serif;font-weight:800;font-style:italic;font-size:4rem;line-height:0.75;float:left;margin-right:0.5rem;background:linear-gradient(160deg,var(--gold2),var(--gold) 60%,#8a661c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .m8-letter-text{font-family:'Newsreader',serif;font-size:1.04rem;line-height:1.95;position:relative;z-index:1;color:#ffffff;}
    .m8-letter-text p{margin-bottom:1.05rem;color:#ffffff;}
    .m8-letter-flourish{display:flex;align-items:center;justify-content:center;gap:0.7rem;margin:1.6rem 0;}
    .m8-letter-flourish-line{width:40px;height:1px;background:linear-gradient(90deg,transparent,var(--gold));}
    .m8-letter-flourish-line.r{background:linear-gradient(270deg,transparent,var(--gold));}
    .m8-letter-sign{margin-top:1.8rem;text-align:right;}
    .m8-letter-closing{display:block;font-family:'Space Mono',monospace;font-size:0.5rem;letter-spacing:0.16em;color:rgba(255,255,255,0.55);text-transform:uppercase;margin-bottom:0.5rem;}
    .m8-letter-name{font-family:'Fraunces',serif;font-weight:800;font-style:italic;font-size:1.6rem;background:linear-gradient(160deg,var(--gold2),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .m8-letter-close-btn{width:100%;margin-top:1.6rem;padding:0.85rem;border-top:1px solid rgba(255,255,255,0.15);background:none;border-left:none;border-right:none;border-bottom:none;color:rgba(255,255,255,0.55);cursor:pointer;font-family:'Space Mono',monospace;font-size:0.52rem;letter-spacing:0.16em;text-transform:uppercase;transition:color .3s;position:relative;z-index:1;}
    .m8-letter-close-btn:hover{color:var(--gold);}

    /* ══════ DIVISOR / FOOTER ══════ */
    .m8-div{display:flex;align-items:center;gap:0.9rem;padding:0 1.5rem;margin:0.5rem 0 1rem;}
    .m8-div-l{flex:1;height:1px;background:linear-gradient(90deg,transparent,var(--brd-a),transparent);}
    .m8-div-i{font-size:0.85rem;color:var(--gold);opacity:0.7;}
    .m8-footer{padding:2.6rem 1.5rem 4rem;text-align:center;border-top:1px solid var(--brd-a);}
    .m8-footer-bow{font-size:1.8rem;display:inline-block;margin-bottom:1rem;background:none;border:none;cursor:pointer;}
    .m8-footer-title{font-family:'Fraunces',serif;font-weight:600;font-style:italic;font-size:1.5rem;color:var(--cream);margin-bottom:0.5rem;}
    .m8-footer-sub{font-family:'Newsreader',serif;font-style:italic;font-size:0.95rem;color:var(--muted);margin-bottom:0.8rem;}
    .m8-footer-num{font-family:'Space Mono',monospace;font-size:0.5rem;letter-spacing:0.18em;color:var(--muted2);text-transform:uppercase;}

    /* ══════ PANTALLA DE BLOQUEO — ROMPECABEZAS VISUAL ══════ */
    .m8-lock{position:fixed;inset:0;z-index:500;display:flex;align-items:center;justify-content:center;background:var(--bg);padding:1rem;}
    .m8-lock-card{background:var(--paper);border:1.5px solid var(--brd-a);border-radius:16px;padding:2rem 1.8rem;max-width:460px;width:100%;text-align:center;box-shadow:0 40px 90px rgba(0,0,0,0.4);position:relative;overflow:hidden;}
    .m8-lock-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--wine),var(--gold),var(--wine));}
    .m8-lock-seal{width:56px;height:56px;border-radius:50%;margin:0 auto 0.8rem;background:radial-gradient(circle at 35% 28%, var(--gold2), var(--gold) 55%, #8a661c 100%);display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-weight:700;font-size:1.4rem;color:#3a2608;box-shadow:0 8px 24px rgba(201,162,75,0.3);}
    .m8-lock-title{font-family:'Fraunces',serif;font-weight:600;font-style:italic;font-size:1.4rem;color:var(--cream);margin-bottom:0.2rem;}
    .m8-lock-sub{font-family:'Newsreader',serif;font-style:italic;font-size:0.85rem;color:var(--muted);margin-bottom:1.2rem;line-height:1.5;}
    
    /* ── Rompecabezas visual ── */
    .m8-puzzle-question{font-family:'Fraunces',serif;font-weight:600;font-size:1rem;color:var(--cream);margin-bottom:0.3rem;}
    .m8-puzzle-hint{font-family:'Newsreader',serif;font-style:italic;font-size:0.75rem;color:var(--muted2);margin-bottom:1rem;}
    
    /* Palabra que se está formando (7 letras) */
    .m8-puzzle-word{display:grid;grid-template-columns:repeat(7,1fr);gap:0.4rem;margin:0.8rem 0 0.6rem;}
    .m8-puzzle-slot{aspect-ratio:1;border-radius:6px;border:2px solid var(--brd);background:var(--bg);display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-weight:700;font-size:1.2rem;color:var(--cream);transition:all 0.3s;min-height:36px;}
    .m8-puzzle-slot.filled{border-color:var(--gold);background:var(--gold3);}
    .m8-puzzle-slot.success{border-color:var(--gold);background:rgba(200,245,30,0.15);animation:m8pulse 0.8s ease;}
    @keyframes m8pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
    
    /* Letras disponibles (3 filas de 5) */
    .m8-puzzle-letters{display:grid;grid-template-columns:repeat(5,1fr);gap:0.4rem;margin:0.6rem 0 0.8rem;}
    .m8-puzzle-letter{aspect-ratio:1;border-radius:6px;border:1.5px solid var(--brd-a);background:var(--paper);display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-weight:700;font-size:1.1rem;color:var(--cream);cursor:pointer;transition:all 0.2s;text-transform:uppercase;min-height:32px;}
    .m8-puzzle-letter:hover:not(.used){transform:scale(1.06);border-color:var(--gold);background:var(--gold3);}
    .m8-puzzle-letter.used{opacity:0.2;cursor:default;transform:scale(0.9);border-color:var(--brd);}
    .m8-puzzle-letter.correct{background:var(--gold3);border-color:var(--gold);color:var(--gold2);}
    
    .m8-lock-err{font-family:'Newsreader',serif;font-style:italic;font-size:0.8rem;color:var(--blush);min-height:1.2rem;margin:0.2rem 0;}
    .m8-lock-success{font-family:'Newsreader',serif;font-style:italic;font-size:0.9rem;color:var(--gold2);min-height:1.2rem;margin:0.2rem 0;}
    
    .m8-lock-reset{background:none;border:none;color:var(--muted2);font-family:'Space Mono',monospace;font-size:0.45rem;cursor:pointer;text-decoration:underline;transition:color 0.3s;margin-top:0.4rem;}
    .m8-lock-reset:hover{color:var(--gold);}
    .m8-lock-attempts{font-family:'Space Mono',monospace;font-size:0.4rem;color:var(--muted2);margin-top:0.4rem;}

    @media (prefers-reduced-motion: reduce){
      .m8 *{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important;}
    }
    @media (max-width:480px){
      .m8-lock-card{padding:1.5rem 1.2rem;}
      .m8-puzzle-word{grid-template-columns:repeat(7,1fr);gap:0.3rem;}
      .m8-puzzle-slot{font-size:1rem;min-height:30px;}
      .m8-puzzle-letters{grid-template-columns:repeat(5,1fr);gap:0.3rem;}
      .m8-puzzle-letter{font-size:0.9rem;min-height:28px;}
      .m8-lock-title{font-size:1.2rem;}
      .m8-puzzle-question{font-size:0.85rem;}
    }
  `;
  document.head.appendChild(s);
};

// ─── Motas doradas ambientales ────────────────────────────────────────────
const GoldMotes = memo(({ mode }) => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let raf; let lastTime = performance.now();
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const col = mode === "dark" ? "201,162,75" : "107,30,60";
    const W = () => c.width, H = () => c.height;
    const motes = Array.from({ length: 26 }, () => ({
      x: Math.random() * W(), y: Math.random() * H(),
      r: Math.random() * 1.3 + 0.4,
      vy: -(Math.random() * 6 + 2), vx: (Math.random() - 0.5) * 4,
      alpha: Math.random() * 0.28 + 0.06, phase: Math.random() * Math.PI * 2,
    }));
    const draw = (now) => {
      let dt = (now - lastTime) / 1000;
      if (dt > 0.12) dt = 0.12;
      lastTime = now;
      ctx.clearRect(0, 0, W(), H());
      motes.forEach(m => {
        m.phase += 0.5 * dt;
        m.y += m.vy * dt; m.x += m.vx * dt + Math.sin(m.phase) * 5 * dt;
        if (m.y < -10) { m.y = H() + 10; m.x = Math.random() * W(); }
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${m.alpha * (0.6 + 0.4 * Math.sin(m.phase))})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [mode]);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }} />;
});

// ─── Datos ─────────────────────────────────────────────────────────────────
const START_DATE = new Date(2025, 10, 30, 0, 0, 0);

const CHAPTERS = [
  { seal: "I", date: "Primer recuerdo", title: "El día que comimos sushi por primera vez", desc: "Recuerdo el día que nos conocimos y tú querías comer algo raro que jamás había probado en mi vida. Quizá es una simple comida para ti, pero para mí es una comida que siempre voy a llevar en el corazón." },
  { seal: "II", date: "Segundo recuerdo", title: "Las tardes que pasaba contigo", desc: "Me encantaban esas tardes donde me llamabas en Discord, prendías cámara y te ponías a limpiar, bailar y cantar enfrente mío. Era uno de mis momentos favoritos del día porque, aparte de que te podía ver, podíamos pasar bastante tiempo juntos y reír de cualquier cosa." },
  { seal: "III", date: "Tercer recuerdo", title: "Salir contigo", desc: "Me encantaba salir contigo en llamada porque tú no me colgabas y me llevabas a todas partes, como si me necesitaras todo el tiempo. Me llenaba de mucha alegría el corazón." },
  { seal: "IV", date: "Cuarto recuerdo", title: "El día que me dijiste lo que quería escuchar", desc: "Aún recuerdo cuando me dijiste que yo te gustaba. No sabes la felicidad inmensa que sentí ese día: te fuiste de la llamada y le conté a todos mis amigos mi gran felicidad. No pude dormir tan bien de la emoción y me puse canciones para celebrar a todo volumen." },
];

const MEMORIES = [
  { icon: "😄", name: "Tu risa", tag: "Porque", detail: "Ver esa sonrisa cara a cara me llena de alegría y todas mis emociones se disparan." },
  { icon: "🤍", name: "Tus abrazos", tag: "Porque", detail: "Me transmites una paz y tranquilidad que ninguna persona me hace sentir lo mismo." },
  { icon: "👀", name: "Tu mirada", tag: "Porque", detail: "Que me miren esos ojos tan hermosos que me transmiten todo lo que tú sientes por mí." },
];

const TRACKS = [
  { name: "Como Tú", artist: "León Larregui", note: "Porque solo me gustas tú", youtubeId: "P1-891_aOKY" },
  { name: "Los Amantes", artist: "José José", note: "La canción perfecta de mi vida día con día", youtubeId: "5EybdNmS9k8" },
  { name: "Si yo no te tengo a ti", artist: "Hombres G", note: "Porque yo no me imagino nada sin ti", youtubeId: "3Bcy2jVmgz0" },
];

// ─── Pantalla de bloqueo: ROMPECABEZAS VISUAL ──────────────────────────────
// Respuesta correcta: "OAKLAND" (7 letras)
function GiftLock({ mode, onUnlock }) {
  const CORRECT_WORD = "OAKLAND";
  
  // Letras del puzzle: todas las letras de OAKLAND + letras extra para dificultad
  const allLetters = [
    { char: 'O', id: 0 }, { char: 'A', id: 1 }, { char: 'K', id: 2 },
    { char: 'L', id: 3 }, { char: 'A', id: 4 }, { char: 'N', id: 5 },
    { char: 'D', id: 6 }, { char: 'M', id: 7 }, { char: 'L', id: 8 },
    { char: 'E', id: 9 }, { char: 'C', id: 10 }, { char: 'R', id: 11 },
    { char: 'O', id: 12 }, { char: 'T', id: 13 }, { char: 'S', id: 14 }
  ];
  
  // Tomar solo 15 letras (3 filas de 5) para el puzzle
  const puzzleLetters = allLetters.slice(0, 15);
  
  const [selected, setSelected] = useState([]);
  const [usedIndices, setUsedIndices] = useState(new Set());
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const shuffled = [...puzzleLetters];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledLetters(shuffled);
  }, []);

  const handleLetterClick = (index) => {
    if (success) return;
    if (usedIndices.has(index)) return;
    if (selected.length >= 7) return; // Solo 7 letras
    
    const letter = shuffledLetters[index];
    const newSelected = [...selected, letter];
    const newUsed = new Set(usedIndices);
    newUsed.add(index);
    
    setSelected(newSelected);
    setUsedIndices(newUsed);
    
    // Verificar si ya completó las 7 letras
    if (newSelected.length === 7) {
      const formed = newSelected.map(l => l.char).join('');
      if (formed === CORRECT_WORD) {
        setSuccess(true);
        setTimeout(onUnlock, 1000);
      } else {
        setAttempts(prev => prev + 1);
        setError(true);
        setTimeout(() => {
          setSelected([]);
          setUsedIndices(new Set());
          setError(false);
        }, 800);
      }
    }
  };

  const handleReset = () => {
    setSelected([]);
    setUsedIndices(new Set());
    setError(false);
    setSuccess(false);
    const shuffled = [...puzzleLetters];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledLetters(shuffled);
  };

  // Crear slots para las 7 letras
  const slots = Array(7).fill(null);

  return (
    <div className={`m8 ${mode} m8-lock`}>
      <div className="m8-bg" />
      <div className="m8-paper-tex" />
      <div className="m8-vignette" />
      <GoldMotes mode={mode} />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="m8-lock-card"
      >
        <div className="m8-lock-seal">VIII</div>
        <h2 className="m8-lock-title">Un lugar especial</h2>
        <p className="m8-lock-sub">
          Para abrir este regalo, necesitas recordar<br/>
          el lugar donde comenzó todo...
        </p>

        <div className="m8-puzzle-question">¿En qué comercial de Guatemala nos conocimos?</div>
        <div className="m8-puzzle-hint">✦ Fue el dia que nos vimos la primera vez  ✦</div>

        {/* Palabra que se está formando (7 slots) */}
        <div className="m8-puzzle-word">
          {slots.map((_, i) => (
            <div key={i} className={`m8-puzzle-slot ${selected[i] ? 'filled' : ''} ${success ? 'success' : ''}`}>
              {selected[i] ? selected[i].char : ''}
            </div>
          ))}
        </div>

        {/* Letras disponibles (3 filas de 5) */}
        <div className="m8-puzzle-letters">
          {shuffledLetters.map((letter, index) => {
            const isUsed = usedIndices.has(index);
            return (
              <div
                key={index}
                className={`m8-puzzle-letter ${isUsed ? 'used' : ''}`}
                onClick={() => handleLetterClick(index)}
              >
                {letter.char}
              </div>
            );
          })}
        </div>

        {error && <div className="m8-lock-err">❌ Uy sopas amor esa no es, intentalo de nuevo.</div>}
        {success && <div className="m8-lock-success">✨ Perfecto cielo, abriendo el regalo...</div>}

        <button className="m8-lock-reset" onClick={handleReset}>
          ↻ Desordenar letras
        </button>
        {attempts > 0 && !success && (
          <div className="m8-lock-attempts">Intentos: {attempts}</div>
        )}
      </motion.div>
    </div>
  );
}

export default function Mes8({ mode = "dark", toggleMode }) {
  const navigate = useNavigate();
  const [internalMode, setInternalMode] = useState(mode);
  const activeMode = toggleMode ? mode : internalMode;
  const handleToggle = toggleMode || (() => setInternalMode(v => (v === "dark" ? "light" : "dark")));

  const [unlocked, setUnlocked] = useState(false);
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [flipped, setFlipped] = useState(() => new Set());
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, now - START_DATE);
      setElapsed({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const toggleLocket = (i) => {
    setFlipped(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const handleTrackClick = (i) => {
    setActiveTrack(prev => (prev === i ? null : i));
  };

  const triggerSparkles = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const burst = Array.from({ length: 16 }).map((_, i) => ({
      id: Date.now() + i,
      x, y,
      dx: (Math.random() * 220 - 110),
      dy: -(Math.random() * 160 + 40),
      size: Math.random() * 10 + 8,
    }));
    setSparkles(prev => [...prev, ...burst]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(sp => !burst.find(b => b.id === sp.id)));
    }, 1400);
  }, []);

  const sr = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  });

  if (!unlocked) {
    return <GiftLock mode={activeMode} onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className={`m8 ${activeMode}`}>
      <div className="m8-bg" />
      <div className="m8-paper-tex" />
      <div className="m8-vignette" />
      <GoldMotes mode={activeMode} />

      <AnimatePresence>
        {sparkles.map(sp => (
          <motion.div
            key={sp.id}
            initial={{ opacity: 1, x: sp.x, y: sp.y, scale: 0.4 }}
            animate={{ opacity: 0, x: sp.x + sp.dx, y: sp.y + sp.dy, scale: 1.1, rotate: 90 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", fontSize: `${sp.size}px`, zIndex: 9999, color: "var(--gold2)" }}
          >
            ✦
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="m8-content">

        {/* NAV con botón de regreso */}
        <nav className="m8-nav">
          <div className="m8-nav-left">
            <button className="m8-back" onClick={() => navigate("/")}>
              ← Volver
            </button>
            <span className="m8-nav-mark">Mes VIII</span>
          </div>
          <span className="m8-nav-title">Siempre Juntos</span>
          <button className="m8-toggle" onClick={handleToggle} aria-label="Cambiar tema">
            {activeMode === "dark" ? "☀️" : "🌙"}
          </button>
        </nav>

        {/* HERO */}
        <section className="m8-hero">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="m8-hero-eyebrow">
            <span className="m8-hero-eyebrow-dot" /> Ocho meses de nosotros <span className="m8-hero-eyebrow-dot" />
          </motion.div>

          <svg className="m8-ribbon-svg" viewBox="0 0 260 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M130 65 C130 20, 60 10, 35 40 C10 70, 60 100, 130 65 C200 30, 250 60, 225 90 C200 120, 130 110, 130 65 Z"
              stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            <motion.circle cx="130" cy="65" r="9" fill="var(--gold2)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.6, duration: 0.5 }} />
          </svg>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="m8-htitle">
            Nuestro Octavo Mes Juntos
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="m8-hsub">
            Porque estos 8 meses a tu lado significan algo más que un simple número, significan 8 meses de amor con la mujer de mi vida.
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="m8-hero-lede">
            Desde el <strong>30 de noviembre de 2025</strong>, cada día que paso contigo es mejor que el anterior porque sé que tú eres la mujer ideal y la mujer con la que quiero pasar el resto de mis días.
          </motion.p>
        </section>

        {/* BOLETO / CONTADOR */}
        <motion.div className="m8-ticket-wrap" {...sr(0)}>
          <div className="m8-ticket">
            <div className="m8-ticket-notch l" /><div className="m8-ticket-notch r" />
            <div className="m8-ticket-row">
              <div className="m8-ticket-stub"><span>VÁLIDO PARA SIEMPRE</span></div>
              <div className="m8-ticket-perf l" />
              <div className="m8-ticket-body">
                <div className="m8-ticket-hd">
                  <span className="m8-ticket-hd-l">Boleto · Aniversario</span>
                  <span className="m8-ticket-hd-r">Nº 0008</span>
                </div>
                <div className="m8-ticket-grid">
                  <div className="m8-ticket-unit"><span className="m8-ticket-n">{elapsed.days}</span><span className="m8-ticket-l">Días</span></div>
                  <div className="m8-ticket-unit"><span className="m8-ticket-n">{elapsed.hours}</span><span className="m8-ticket-l">Horas</span></div>
                  <div className="m8-ticket-unit"><span className="m8-ticket-n">{elapsed.minutes}</span><span className="m8-ticket-l">Min</span></div>
                  <div className="m8-ticket-unit"><span className="m8-ticket-n">{elapsed.seconds}</span><span className="m8-ticket-l">Seg</span></div>
                </div>
                <div className="m8-ticket-foot">Tiempo transcurrido desde el 30 de noviembre de 2025</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="m8-div"><div className="m8-div-l" /><span className="m8-div-i">❦</span><div className="m8-div-l" /></div>

        {/* CINTA DE CAPÍTULOS */}
        <section className="m8-ribbon-section">
          <motion.div className="m8-sec" {...sr(0)}>
            <span className="m8-sec-icon">🎀</span>
            <span className="m8-sec-txt">Mis mejores recuerdos contigo</span>
            <div className="m8-sec-line" />
          </motion.div>
          <div className="m8-ribbon-track">
            <div className="m8-ribbon-line" />
            {CHAPTERS.map((ch, i) => (
              <motion.div key={i} className="m8-ribbon-item" {...sr(i * 0.1)}>
                <div className="m8-ribbon-seal">{ch.seal}</div>
                <div className="m8-ribbon-card">
                  <div className="m8-ribbon-date">{ch.date}</div>
                  <div className="m8-ribbon-title">{ch.title}</div>
                  <div className="m8-ribbon-desc">{ch.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="m8-div"><div className="m8-div-l" /><span className="m8-div-i">♾</span><div className="m8-div-l" /></div>

        {/* MEDALLONES DE RECUERDOS */}
        <section className="m8-lockets-section">
          <motion.div className="m8-sec" {...sr(0)}>
            <span className="m8-sec-icon">🔖</span>
            <span className="m8-sec-txt">Extraño de ti...</span>
            <div className="m8-sec-line" />
          </motion.div>
          <motion.p className="m8-lockets-intro" {...sr(0.05)}>Toca cada medallón para abrirlo.</motion.p>
          <div className="m8-lockets-grid">
            {MEMORIES.map((m, i) => (
              <motion.div key={i} {...sr(i * 0.08)}>
                <div className={`m8-locket${flipped.has(i) ? " flipped" : ""}`} onClick={() => toggleLocket(i)}>
                  <div className="m8-locket-inner">
                    <div className="m8-locket-face m8-locket-front">
                      <span className="m8-locket-icon">{m.icon}</span>
                      <span className="m8-locket-name">{m.name}</span>
                      <span className="m8-locket-hint">Toca para abrir</span>
                    </div>
                    <div className="m8-locket-face m8-locket-back">
                      <span className="m8-locket-tag">{m.tag}</span>
                      <p>{m.detail}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="m8-div"><div className="m8-div-l" /><span className="m8-div-i">♪</span><div className="m8-div-l" /></div>

        {/* TOCADISCOS */}
        <section className="m8-vinyl-section">
          <motion.div className="m8-sec" {...sr(0)}>
            <span className="m8-sec-icon">💿</span>
            <span className="m8-sec-txt">La playlist del mes ocho</span>
            <div className="m8-sec-line" />
          </motion.div>
          <motion.p className="m8-vinyl-intro" {...sr(0.05)}>Pequeñas canciones dedicadas <strong>a ti</strong>.</motion.p>

          <motion.div className="m8-player" {...sr(0.1)}>
            <div className="m8-player-header">
              <div className="m8-player-disc"><div className="m8-player-disc-center" /></div>
              <div className="m8-player-title">Playlist · Mes VIII</div>
              <div className="m8-player-sub">Toca una canción para escucharla</div>
            </div>

            <div className="m8-tracklist">
              {TRACKS.map((t, i) => (
                <div key={i} className={`m8-track${activeTrack === i ? " on" : ""}`}>
                  <div className="m8-track-row" onClick={() => handleTrackClick(i)}>
                    <div className="m8-track-num">{String(i + 1).padStart(2, "0")}</div>
                    <div className="m8-track-info">
                      <div className="m8-track-name">{t.name}</div>
                      <div className="m8-track-artist">{t.artist}</div>
                      <div className="m8-track-note">{t.note}</div>
                    </div>
                    <div className="m8-track-btn">{activeTrack === i ? "✕" : "▶"}</div>
                  </div>
                  <AnimatePresence>
                    {activeTrack === i && (
                      <motion.div
                        className="m8-track-embed"
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${t.youtubeId}?autoplay=1&rel=0`}
                          title={t.name}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
          <p className="m8-vinyl-note">Toca una canción para escucharla aquí mismo ♥</p>
        </section>

        <div className="m8-div"><div className="m8-div-l" /><span className="m8-div-i">✉</span><div className="m8-div-l" /></div>

        {/* CARTA SELLADA */}
        <section className="m8-letter-section">
          <motion.div className="m8-sec" {...sr(0)}>
            <span className="m8-sec-icon">🕯️</span>
            <span className="m8-sec-txt">Una carta para ti</span>
            <div className="m8-sec-line" />
          </motion.div>

          <div className="m8-envelope">
            <AnimatePresence mode="wait">
              {!envelopeOpen ? (
                <motion.div
                  key="closed"
                  className="m8-envelope-closed"
                  onClick={(e) => { setEnvelopeOpen(true); triggerSparkles(e); }}
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="m8-envelope-flap" />
                  <div className="m8-seal">VIII</div>
                  <div className="m8-envelope-title">Para mi Amor, mes ocho</div>
                  <div className="m8-envelope-hint">✦ Toca para leerla ✦</div>
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  className="m8-letter-page"
                  initial={{ opacity: 0, rotateX: -8, y: 14 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="m8-dropcap">Amor,</span>
                  <div className="m8-letter-text">
                    <p>Ocho meses ya, y cada día que pasa es mejor que el anterior. Quizá nos haga mucha falta estar juntos, pero te vuelvo a prometer que algún día pasaremos más que el tiempo juntos, vamos a pasar una vida juntos. Estoy seguro que vamos a tener una vida feliz y llena de buenas cosas para los dos. Sé que ahora estás viviendo un momento para nada agradable, y créeme que trato de comprenderte y de ser la persona que está allí a la par tuya siempre. Pase lo que pase, siempre vas a tener al hombre que te ama a tu lado. Sé que esto solo es pasajero y dentro de poco vamos a volver a ser más felices de lo que ya éramos, pero juntos, que eso es lo que importa. Luchemos por nuestro amor siempre, te lo aseguro que lo nuestro es único y nunca se va a volver a repetir jamás. Voy a tratar de mejorar día con día por y para ti. Juntos somos más fuertes e invencibles a cualquier cosa, te lo aseguro que todo va a mejorar y este mal tramo solo va a ser una pequeña anécdota que contar.</p>
                    <p>Gracias por existir hermosa, te amo y te amaré siempre mi vida linda.</p>
                    <div className="m8-letter-flourish">
                      <div className="m8-letter-flourish-line" /><span>❦</span><div className="m8-letter-flourish-line r" />
                    </div>
                  </div>
                  <div className="m8-letter-sign">
                    <span className="m8-letter-closing">Tuyo, siempre</span>
                    <span className="m8-letter-name">Eithan ♥</span>
                  </div>
                  <button className="m8-letter-close-btn" onClick={() => setEnvelopeOpen(false)}>← Volver a sellar</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* FOOTER */}
        <motion.footer className="m8-footer" {...sr(0)}>
          <button className="m8-footer-bow" onClick={triggerSparkles} aria-label="Enviar cariño">🎀</button>
          <div className="m8-footer-title">Feliz octavo mes</div>
          <div className="m8-footer-sub">"El ocho, de lado, es el infinito. Contigo, también."</div>
          <div className="m8-footer-num">30 de noviembre de 2025 · Mes VIII · Hecho con amor por Eithan</div>
        </motion.footer>

      </div>
    </div>
  );
}