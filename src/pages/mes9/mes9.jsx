import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ════════════════════════════════════════════════════════════════════════════
// MES 9 — "Atlas de Constelaciones"
// Concepto: si el amor tuviera un cielo propio, cada recuerdo sería una
// estrella y cada mes una nueva constelación. Toda la página se construye
// como un observatorio: cartas astrales, un reloj de anillos orbitales,
// una estación de radio sintonizada a una frecuencia y un mapa de estrellas
// con los mejores momentos. Paleta: verde neón de laboratorio + violeta
// eléctrico + negro vacío — un observatorio futurista, no uno clásico.
// Tipografía nueva y distinta a los meses anteriores:
// Playfair Display (títulos), Literata (cuerpo), JetBrains Mono (detalles).
//
// TEXTOS: todo lo escrito aquí (recuerdos, carta, cita del héroe) es un
// BORRADOR pensado para que Eithan lo edite con momentos y detalles reales
// antes de compartirlo — está señalado donde conviene personalizarlo.
//
// BLOQUEO: en vez de escribir una contraseña, se abre girando dos diales
// (día / mes) como una caja fuerte, hasta alinear la fecha secreta bajo
// el indicador fijo. Cambia TARGET_DAY / TARGET_MONTH si quieres otra fecha.
// ════════════════════════════════════════════════════════════════════════════

const injectStyles = () => {
  if (document.getElementById("m9-st")) return;
  const s = document.createElement("style");
  s.id = "m9-st";
  s.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,900;1,500;1,600;1,700&family=Literata:ital,opsz,wght@0,18..144,400;0,18..144,500;0,18..144,600;1,18..144,400;1,18..144,500&family=JetBrains+Mono:wght@300;400;500;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

    .m9.dark{
      --night:#050907; --night2:#07150d; --night3:rgba(30,140,80,0.32);
      --copper:#39ff8a; --copper2:#7dffb0; --copper3:rgba(57,255,138,0.14);
      --silver:#d94dff; --silver2:#f3d0ff;
      --bg:#040706;
      --paper:#0a120d; --paper2:#0e1a13;
      --cream:#eafff2; --muted:rgba(234,255,242,0.5); --muted2:rgba(234,255,242,0.22);
      --brd:rgba(125,255,176,0.14); --brd-a:rgba(57,255,138,0.4); --brd-i:rgba(125,255,176,0.18);
      --nav-bg:rgba(4,7,6,0.86);
      --card:rgba(10,18,13,0.55);
    }
    .m9.light{
      --night:#0b3320; --night2:#124a2c; --night3:rgba(30,180,100,0.08);
      --copper:#0f9d52; --copper2:#17c96a; --copper3:rgba(15,157,82,0.1);
      --silver:#a412c9; --silver2:#5c0d75;
      --bg:#f2fbf5;
      --paper:#ffffff; --paper2:#eafcf0;
      --cream:#0b3320; --muted:rgba(11,51,32,0.58); --muted2:rgba(11,51,32,0.28);
      --brd:rgba(11,51,32,0.1); --brd-a:rgba(15,157,82,0.32); --brd-i:rgba(11,51,32,0.16);
      --nav-bg:rgba(242,251,245,0.9);
      --card:rgba(255,255,255,0.72);
    }

    .m9{min-height:100vh;font-family:'Literata',serif;color:var(--cream);overflow-x:hidden;position:relative;background:var(--bg);}
    .m9-content{position:relative;z-index:2;}

    .m9-bg{position:fixed;inset:0;z-index:0;pointer-events:none;}
    .m9.dark .m9-bg{background:radial-gradient(ellipse 70% 55% at 20% 0%, rgba(57,255,138,0.1) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 85% 100%, rgba(217,77,255,0.16) 0%, transparent 55%), #040706;}
    .m9.light .m9-bg{background:radial-gradient(ellipse 70% 55% at 20% 0%, rgba(15,157,82,0.08) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 85% 100%, rgba(164,18,201,0.06) 0%, transparent 55%), #f2fbf5;}
    .m9-vignette{position:fixed;inset:0;z-index:1;pointer-events:none;box-shadow:inset 0 0 190px rgba(0,0,0,0.42);}
    .m9.light .m9-vignette{box-shadow:inset 0 0 140px rgba(10,40,20,0.06);}

    .m9-nav{display:flex;justify-content:space-between;align-items:center;padding:1.2rem 1.4rem;border-bottom:1px solid var(--brd-i);background:var(--nav-bg);backdrop-filter:blur(18px);position:sticky;top:0;z-index:100;}
    .m9-nav-left{display:flex;align-items:center;gap:0.9rem;}
    .m9-back{display:flex;align-items:center;gap:0.5rem;font-family:'JetBrains Mono',monospace;font-size:0.56rem;letter-spacing:0.14em;color:var(--muted);text-transform:uppercase;cursor:pointer;border:none;background:none;transition:color 0.3s;}
    .m9-back:hover{color:var(--copper2);}
    .m9-nav-mark{font-family:'JetBrains Mono',monospace;font-size:0.56rem;letter-spacing:0.18em;color:var(--copper2);text-transform:uppercase;}
    .m9-nav-title{font-family:'Playfair Display',serif;font-weight:600;font-style:italic;font-size:0.95rem;color:var(--cream);}
    .m9-toggle{width:36px;height:36px;border-radius:50%;border:1px solid var(--brd-i);background:var(--night3);cursor:pointer;color:var(--cream);font-size:0.9rem;display:flex;align-items:center;justify-content:center;transition:all .3s;}
    .m9-toggle:hover{background:var(--copper3);border-color:var(--copper);}

    .m9-hero{padding:4.2rem 1.5rem 2.5rem;text-align:center;position:relative;}
    .m9-hero-eyebrow{display:inline-flex;align-items:center;gap:0.6rem;font-family:'JetBrains Mono',monospace;font-size:0.58rem;letter-spacing:0.26em;color:var(--copper2);text-transform:uppercase;margin-bottom:1.6rem;}
    .m9-hero-eyebrow-star{font-size:0.7rem;}
    .m9-htitle{font-family:'Playfair Display',serif;font-weight:700;font-style:italic;font-size:clamp(2.6rem,10vw,5rem);line-height:1.05;letter-spacing:-0.01em;}
    .m9.dark .m9-htitle{background:linear-gradient(135deg,#eafff2 0%,var(--silver2) 40%,var(--copper2) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 8px 26px rgba(57,255,138,0.18));}
    .m9.light .m9-htitle{background:linear-gradient(135deg,var(--night) 0%,var(--night2) 45%,var(--copper) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .m9-hsub{font-family:'Literata',serif;font-style:italic;font-weight:400;font-size:clamp(1.02rem,3vw,1.25rem);color:var(--muted);margin-top:1rem;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.6;}
    .m9-hero-lede{max-width:600px;margin:2.2rem auto 0;font-size:1.03rem;line-height:1.9;color:var(--muted);}
    .m9-hero-lede strong{color:var(--copper2);font-weight:600;}

    .m9-orbit-wrap{margin:3.4rem 1.5rem;display:flex;justify-content:center;}
    .m9-orbit-frame{position:relative;max-width:640px;width:100%;background:var(--card);border:1px solid var(--brd-i);border-radius:14px;backdrop-filter:blur(14px);padding:2.2rem 1.5rem 1.8rem;box-shadow:0 30px 70px rgba(0,0,0,0.3);}
    .m9-orbit-hd{display:flex;align-items:center;justify-content:center;gap:0.6rem;font-family:'JetBrains Mono',monospace;font-size:0.52rem;letter-spacing:0.24em;color:var(--copper2);text-transform:uppercase;margin-bottom:1.6rem;}
    .m9-orbit-hd-dot{width:5px;height:5px;border-radius:50%;background:var(--copper2);animation:m9blink 1.2s step-start infinite;}
    @keyframes m9blink{0%,100%{opacity:1}50%{opacity:0.15}}
    .m9-orbit-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0.9rem;}
    .m9-orbit-unit{display:flex;flex-direction:column;align-items:center;gap:0.6rem;}
    .m9-orbit-ring{position:relative;width:100%;aspect-ratio:1;max-width:110px;}
    .m9-orbit-ring svg{width:100%;height:100%;transform:rotate(-90deg);}
    .m9-orbit-track{fill:none;stroke:var(--brd);stroke-width:5;}
    .m9-orbit-fill{fill:none;stroke-width:5;stroke-linecap:round;transition:stroke-dashoffset 0.6s cubic-bezier(.22,1,.36,1);}
    .m9-orbit-num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:700;font-size:clamp(1.1rem,4vw,1.5rem);color:var(--cream);font-variant-numeric:tabular-nums;}
    .m9-orbit-label{font-family:'JetBrains Mono',monospace;font-size:0.44rem;letter-spacing:0.16em;color:var(--muted);text-transform:uppercase;}
    .m9-orbit-foot{text-align:center;margin-top:1.6rem;padding-top:1.1rem;border-top:1px dashed var(--brd);font-family:'Literata',serif;font-style:italic;font-size:0.8rem;color:var(--muted2);}

    .m9-quote-wrap{margin:3rem 1.5rem;padding:2.6rem 1.6rem;position:relative;border:1px solid var(--brd-i);border-radius:6px;background:var(--card);backdrop-filter:blur(10px);}
    .m9-quote-star{position:absolute;top:-14px;left:50%;transform:translateX(-50%);font-size:1rem;color:var(--copper2);background:var(--bg);padding:0 0.6rem;}
    .m9-quote-txt{font-family:'Literata',serif;font-style:italic;font-weight:500;font-size:clamp(1.2rem,4.4vw,1.7rem);line-height:1.55;color:var(--cream);text-align:center;}
    .m9-quote-copper{color:var(--copper2);}
    .m9-quote-by{text-align:center;margin-top:1.2rem;font-family:'JetBrains Mono',monospace;font-size:0.52rem;letter-spacing:0.2em;color:var(--muted);text-transform:uppercase;}

    .m9-sec{display:flex;align-items:center;gap:1rem;padding:0 1.5rem;margin-bottom:1.8rem;}
    .m9-sec-icon{font-size:0.85rem;color:var(--copper2);}
    .m9-sec-txt{font-family:'JetBrains Mono',monospace;font-size:0.56rem;letter-spacing:0.24em;color:var(--copper2);text-transform:uppercase;}
    .m9-sec-line{flex:1;height:1px;background:linear-gradient(90deg,var(--brd-a),transparent);}

    .m9-const-section{padding:1rem 1.5rem 3rem;}
    .m9-const-track{position:relative;max-width:640px;margin:0 auto;padding-left:2.6rem;}
    .m9-const-line{position:absolute;left:13px;top:6px;bottom:6px;width:1px;background:repeating-linear-gradient(180deg, var(--brd-a) 0 5px, transparent 5px 11px);}
    .m9-const-item{position:relative;margin-bottom:2.6rem;}
    .m9-const-item:last-child{margin-bottom:0;}
    .m9-const-star{position:absolute;left:-2.6rem;top:0;width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 35% 28%, var(--copper2), var(--copper) 60%, #0a4a26 100%);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:700;font-size:0.6rem;color:#04170c;box-shadow:0 0 16px rgba(125,255,176,0.5);}
    .m9-const-card{background:var(--paper);border:1px solid var(--brd);border-radius:6px;padding:1.5rem 1.6rem;box-shadow:0 14px 34px rgba(0,0,0,0.2);}
    .m9-const-date{font-family:'JetBrains Mono',monospace;font-size:0.5rem;letter-spacing:0.16em;color:var(--copper2);text-transform:uppercase;margin-bottom:0.5rem;}
    .m9-const-title{font-family:'Playfair Display',serif;font-weight:600;font-style:italic;font-size:1.15rem;color:var(--cream);margin-bottom:0.5rem;}
    .m9-const-desc{font-size:0.93rem;line-height:1.75;color:var(--muted);}

    .m9-radio-section{padding:1rem 1.5rem 3rem;}
    .m9-radio-intro{text-align:center;font-family:'Literata',serif;font-style:italic;font-size:1rem;color:var(--muted);margin-bottom:2.2rem;line-height:1.7;}
    .m9-radio-intro strong{color:var(--copper2);font-weight:600;}

    .m9-radio{max-width:600px;margin:0 auto;border-radius:16px;background:linear-gradient(160deg,var(--paper) 0%,var(--paper2) 100%);border:1px solid var(--brd-i);box-shadow:0 30px 80px rgba(0,0,0,0.35);padding:1.8rem 1.6rem 1.6rem;position:relative;overflow:hidden;}
    .m9-radio::before{content:'';position:absolute;top:10px;left:10px;right:10px;height:1px;background:linear-gradient(90deg,transparent,rgba(57,255,138,0.4),transparent);}
    .m9-radio-dial-wrap{display:flex;align-items:center;justify-content:center;margin-bottom:1.4rem;}
    .m9-radio-dial{position:relative;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle at 35% 30%, rgba(125,255,176,0.08), rgba(0,0,0,0.25));border:2px solid var(--brd-a);display:flex;align-items:center;justify-content:center;box-shadow:inset 0 4px 16px rgba(0,0,0,0.4);}
    .m9-radio-needle{position:absolute;width:2px;height:44px;background:linear-gradient(180deg,var(--copper2),var(--copper));top:14px;left:50%;transform-origin:50% 46px;border-radius:2px;box-shadow:0 0 8px rgba(125,255,176,0.6);}
    .m9-radio-dial-center{width:14px;height:14px;border-radius:50%;background:var(--copper2);box-shadow:0 0 12px rgba(125,255,176,0.6);z-index:1;}
    .m9-radio-freq{text-align:center;margin-bottom:1.3rem;}
    .m9-radio-freq-num{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:1.5rem;color:var(--copper2);letter-spacing:0.05em;}
    .m9-radio-freq-lbl{font-family:'JetBrains Mono',monospace;font-size:0.46rem;letter-spacing:0.2em;color:var(--muted);text-transform:uppercase;margin-top:0.2rem;}

    .m9-radio-label{text-align:center;padding:0.9rem;background:rgba(57,255,138,0.05);border:1px dashed var(--brd-a);border-radius:8px;margin-bottom:1.4rem;}
    .m9-radio-status{font-family:'JetBrains Mono',monospace;font-size:0.48rem;letter-spacing:0.18em;color:var(--copper2);text-transform:uppercase;margin-bottom:0.3rem;display:flex;align-items:center;justify-content:center;gap:0.5rem;}
    .m9-radio-status-dot{width:5px;height:5px;border-radius:50%;background:var(--copper2);animation:m9blink 1s step-start infinite;}
    .m9-radio-song{font-family:'Playfair Display',serif;font-weight:600;font-style:italic;font-size:1.05rem;color:var(--cream);display:block;margin-bottom:0.15rem;}
    .m9-radio-artist{font-family:'Literata',serif;font-style:italic;font-size:0.85rem;color:var(--muted);}
    .m9-radio-empty{font-family:'Literata',serif;font-style:italic;font-size:0.9rem;color:var(--muted2);padding:0.4rem 0;}

    .m9-station-list{display:flex;flex-direction:column;gap:0.6rem;}
    .m9-station{background:var(--card);border:1px solid var(--brd);border-radius:10px;overflow:hidden;transition:border-color .25s;}
    .m9-station.on{border-color:var(--brd-a);}
    .m9-station-row{display:flex;align-items:center;gap:0.9rem;padding:0.85rem 1.1rem;cursor:pointer;}
    .m9-station-freq{font-family:'JetBrains Mono',monospace;font-size:0.62rem;color:var(--copper2);width:44px;flex-shrink:0;}
    .m9-station-info{flex:1;min-width:0;}
    .m9-station-name{font-family:'Playfair Display',serif;font-weight:600;font-size:0.96rem;color:var(--cream);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .m9-station-artist{font-family:'JetBrains Mono',monospace;font-size:0.58rem;letter-spacing:0.04em;color:var(--muted);margin-top:0.15rem;}
    .m9-station-btn{width:28px;height:28px;flex-shrink:0;border-radius:50%;background:var(--night3);color:var(--cream);display:flex;align-items:center;justify-content:center;font-size:0.62rem;}
    .m9-station.on .m9-station-btn{background:var(--copper);color:#04170c;}
    .m9-station-embed{aspect-ratio:16/9;background:#000;border-top:1px solid var(--brd-i);}
    .m9-station-embed iframe{width:100%;height:100%;border:none;display:block;}
    .m9-radio-note{text-align:center;margin-top:1.4rem;font-family:'Literata',serif;font-style:italic;font-size:0.8rem;color:var(--muted2);}

    .m9-letter-section{padding:1rem 1.5rem 3rem;}
    .m9-envelope{max-width:560px;margin:0 auto;position:relative;}
    .m9-envelope-closed{background:linear-gradient(160deg,var(--night3),var(--paper) 75%);border:1px solid var(--brd-i);border-radius:10px;padding:3.2rem 1.8rem;text-align:center;cursor:pointer;box-shadow:0 30px 70px rgba(0,0,0,0.32);position:relative;overflow:hidden;}
    .m9-envelope-closed::before{content:'';position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(1.5px 1.5px at 20% 30%, rgba(125,255,176,0.5), transparent), radial-gradient(1.5px 1.5px at 75% 20%, rgba(125,255,176,0.4), transparent), radial-gradient(1px 1px at 60% 70%, rgba(125,255,176,0.4), transparent), radial-gradient(1.5px 1.5px at 35% 80%, rgba(125,255,176,0.35), transparent), radial-gradient(1px 1px at 90% 60%, rgba(125,255,176,0.3), transparent);}
    .m9-seal{width:76px;height:76px;border-radius:50%;margin:0 auto 1.4rem;background:radial-gradient(circle at 35% 28%, var(--copper2), var(--copper) 50%, #0a4a26 100%);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:700;font-size:1.3rem;color:#04170c;box-shadow:0 8px 26px rgba(57,255,138,0.4), inset 0 -3px 8px rgba(0,0,0,0.3), inset 0 3px 6px rgba(255,255,255,0.2);position:relative;z-index:1;border:2px solid rgba(125,255,176,0.4);}
    .m9-envelope-title{font-family:'Playfair Display',serif;font-weight:600;font-style:italic;font-size:1.3rem;color:var(--cream);margin-bottom:0.6rem;position:relative;z-index:1;}
    .m9-envelope-hint{font-family:'JetBrains Mono',monospace;font-size:0.48rem;letter-spacing:0.2em;color:var(--muted2);text-transform:uppercase;position:relative;z-index:1;}

    .m9-letter-page{background:linear-gradient(170deg,#060d09 0%,#0b1a10 100%);color:#eafff2;border-radius:10px;border:1px solid var(--brd-i);box-shadow:0 30px 70px rgba(0,0,0,0.4);padding:2.6rem 1.9rem 2rem;position:relative;overflow:hidden;}
    .m9-letter-page::before{content:'';position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(1px 1px at 15% 20%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 80% 15%, rgba(255,255,255,0.4), transparent), radial-gradient(1.5px 1.5px at 40% 85%, rgba(255,255,255,0.35), transparent), radial-gradient(1px 1px at 65% 60%, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 90% 80%, rgba(255,255,255,0.3), transparent);}
    .m9-dropcap{font-family:'Playfair Display',serif;font-weight:900;font-style:italic;font-size:3.8rem;line-height:0.75;float:left;margin-right:0.5rem;background:linear-gradient(160deg,var(--copper2),var(--copper) 60%,#0a4a26);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .m9-letter-text{font-family:'Literata',serif;font-size:1.03rem;line-height:1.95;position:relative;z-index:1;color:#eafff2;}
    .m9-letter-text p{margin-bottom:1.05rem;}
    .m9-letter-flourish{display:flex;align-items:center;justify-content:center;gap:0.7rem;margin:1.6rem 0;}
    .m9-letter-flourish-line{width:40px;height:1px;background:linear-gradient(90deg,transparent,var(--copper2));}
    .m9-letter-flourish-line.r{background:linear-gradient(270deg,transparent,var(--copper2));}
    .m9-letter-sign{margin-top:1.8rem;text-align:right;}
    .m9-letter-closing{display:block;font-family:'JetBrains Mono',monospace;font-size:0.48rem;letter-spacing:0.16em;color:rgba(234,255,242,0.5);text-transform:uppercase;margin-bottom:0.5rem;}
    .m9-letter-name{font-family:'Playfair Display',serif;font-weight:800;font-style:italic;font-size:1.6rem;background:linear-gradient(160deg,var(--copper2),var(--copper));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .m9-letter-close-btn{width:100%;margin-top:1.6rem;padding:0.85rem;border-top:1px solid rgba(234,255,242,0.12);background:none;border-left:none;border-right:none;border-bottom:none;color:rgba(234,255,242,0.5);cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:0.5rem;letter-spacing:0.16em;text-transform:uppercase;transition:color .3s;position:relative;z-index:1;}
    .m9-letter-close-btn:hover{color:var(--copper2);}

    .m9-div{display:flex;align-items:center;gap:0.9rem;padding:0 1.5rem;margin:0.5rem 0 1rem;}
    .m9-div-l{flex:1;height:1px;background:linear-gradient(90deg,transparent,var(--brd-a),transparent);}
    .m9-div-i{font-size:0.8rem;color:var(--copper2);opacity:0.75;}
    .m9-footer{padding:2.6rem 1.5rem 4rem;text-align:center;border-top:1px solid var(--brd-i);}
    .m9-footer-star{font-size:1.6rem;display:inline-block;margin-bottom:1rem;background:none;border:none;cursor:pointer;color:var(--copper2);}
    .m9-footer-title{font-family:'Playfair Display',serif;font-weight:600;font-style:italic;font-size:1.45rem;color:var(--cream);margin-bottom:0.5rem;}
    .m9-footer-sub{font-family:'Literata',serif;font-style:italic;font-size:0.94rem;color:var(--muted);margin-bottom:0.8rem;}
    .m9-footer-num{font-family:'JetBrains Mono',monospace;font-size:0.48rem;letter-spacing:0.18em;color:var(--muted2);text-transform:uppercase;}

    .m9lk{position:fixed;inset:0;z-index:9999;overflow:hidden;display:flex;align-items:center;justify-content:center;}
    .m9lk-bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% -10%, rgba(217,77,255,0.22) 0%, transparent 60%), #040706;}
    .m9lk-glow{position:absolute;width:60vw;height:60vw;border-radius:50%;top:-15%;right:-15%;filter:blur(90px);background:radial-gradient(circle,rgba(57,255,138,0.18) 0%,transparent 65%);animation:m9lkglow 15s ease-in-out infinite alternate;}
    @keyframes m9lkglow{to{transform:translate(-6vw,8vh) scale(1.15)}}
    .m9lk-home-btn{position:absolute;top:1.1rem;left:1.1rem;z-index:20;display:flex;align-items:center;gap:0.5rem;font-family:'JetBrains Mono',monospace;font-size:0.54rem;letter-spacing:0.14em;color:rgba(234,255,242,0.6);text-transform:uppercase;cursor:pointer;border:1px solid rgba(57,255,138,0.22);background:rgba(57,255,138,0.06);backdrop-filter:blur(10px);border-radius:20px;padding:0.55rem 0.95rem;transition:all 0.3s;}
    .m9lk-home-btn:hover{color:var(--copper2,#7dffb0);border-color:rgba(57,255,138,0.5);background:rgba(57,255,138,0.12);}

    .m9lk-stars{position:absolute;inset:0;overflow:hidden;pointer-events:none;}
    .m9lk-star{position:absolute;border-radius:50%;background:#fff;animation:m9lkstar var(--dur,4s) ease-in-out infinite alternate;}
    @keyframes m9lkstar{0%{opacity:0.1;transform:scale(0.7)}100%{opacity:0.85;transform:scale(1.15)}}

    .m9lk-panel{position:relative;z-index:10;width:min(400px, calc(100vw - 2rem));background:rgba(9,17,12,0.82);backdrop-filter:blur(34px) saturate(1.2);border:1px solid rgba(57,255,138,0.22);border-radius:12px;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,0.75);}
    .m9lk-top{display:flex;align-items:center;justify-content:space-between;padding:0.8rem 1.2rem;background:rgba(57,255,138,0.05);border-bottom:1px solid rgba(57,255,138,0.14);}
    .m9lk-id{font-family:'JetBrains Mono',monospace;font-size:0.5rem;letter-spacing:0.18em;color:rgba(125,255,176,0.55);text-transform:uppercase;}
    .m9lk-status{display:flex;align-items:center;gap:5px;font-family:'JetBrains Mono',monospace;font-size:0.46rem;letter-spacing:0.1em;color:rgba(125,255,176,0.4);}
    .m9lk-status-dot{width:5px;height:5px;border-radius:50%;background:var(--copper2,#7dffb0);animation:m9blink 1.2s step-start infinite;}

    .m9lk-body{padding:2.4rem 1.8rem 2rem;text-align:center;display:flex;flex-direction:column;align-items:center;}

    .m9lk-orrery{position:relative;width:80px;height:80px;margin:0 auto 1.3rem;}
    .m9lk-orrery-ring{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(57,255,138,0.24);animation:m9lkring 3.4s ease-in-out infinite;}
    .m9lk-orrery-ring2{position:absolute;inset:10px;border-radius:50%;border:1px solid rgba(217,77,255,0.28);animation:m9lkring2 4.4s ease-in-out infinite reverse;}
    @keyframes m9lkring{0%,100%{transform:scale(1);opacity:0.55}50%{transform:scale(1.08);opacity:0.2}}
    @keyframes m9lkring2{0%,100%{transform:scale(1) rotate(0deg);opacity:0.4}100%{transform:scale(1.05) rotate(180deg);opacity:0.15}}
    .m9lk-orrery-core{position:absolute;inset:18px;border-radius:50%;background:radial-gradient(circle at 38% 30%, rgba(125,255,176,0.3), rgba(217,77,255,0.22));border:1.5px solid rgba(125,255,176,0.4);display:flex;align-items:center;justify-content:center;font-size:1.4rem;box-shadow:0 0 30px rgba(57,255,138,0.22);animation:m9lkcore 3.8s ease-in-out infinite;}
    @keyframes m9lkcore{0%,100%{box-shadow:0 0 30px rgba(57,255,138,0.22)}50%{box-shadow:0 0 48px rgba(57,255,138,0.4)}}

    .m9lk-label{font-family:'JetBrains Mono',monospace;font-size:0.5rem;letter-spacing:0.26em;color:rgba(125,255,176,0.6);text-transform:uppercase;margin-bottom:0.7rem;}
    .m9lk-title{font-family:'Playfair Display',serif;font-weight:700;font-style:italic;font-size:1.75rem;line-height:1.2;background:linear-gradient(135deg,#eafff2 0%,#7dffb0 50%,#f3d0ff 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:0.6rem;}
    .m9lk-sub{font-family:'Literata',serif;font-style:italic;font-size:0.9rem;color:rgba(234,255,242,0.42);line-height:1.6;margin-bottom:1.6rem;max-width:280px;}

    .m9lk-sep{display:flex;align-items:center;gap:0.8rem;margin:0 0 1.6rem;width:100%;}
    .m9lk-sep-l{flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(125,255,176,0.3));}
    .m9lk-sep-l.r{background:linear-gradient(270deg,transparent,rgba(125,255,176,0.3));}
    .m9lk-sep-icon{font-size:0.8rem;opacity:0.6;color:var(--copper2,#7dffb0);}

    .m9lk-dials{display:flex;align-items:flex-start;justify-content:center;gap:1.8rem;margin-bottom:1.6rem;}
    .m9lk-dial-unit{display:flex;flex-direction:column;align-items:center;gap:0.7rem;}
    .m9lk-dial-label{font-family:'JetBrains Mono',monospace;font-size:0.48rem;letter-spacing:0.2em;color:rgba(125,255,176,0.55);text-transform:uppercase;}
    .m9lk-dial{position:relative;width:118px;height:118px;border-radius:50%;touch-action:none;cursor:grab;user-select:none;background:radial-gradient(circle at 35% 30%, rgba(125,255,176,0.06), rgba(0,0,0,0.35));border:1px solid rgba(57,255,138,0.26);box-shadow:inset 0 4px 18px rgba(0,0,0,0.5), 0 0 0 rgba(57,255,138,0);transition:box-shadow 0.4s;}
    .m9lk-dial:active{cursor:grabbing;}
    .m9lk-dial.matched{box-shadow:inset 0 4px 18px rgba(0,0,0,0.5), 0 0 22px rgba(57,255,138,0.55);border-color:rgba(125,255,176,0.75);}
    .m9lk-dial-ring{position:absolute;inset:0;border-radius:50%;}
    .m9lk-dial-tick{position:absolute;inset:0;display:flex;justify-content:center;pointer-events:none;}
    .m9lk-dial-tick::before{content:'';display:block;width:1px;height:7px;margin-top:5px;background:rgba(125,255,176,0.32);}
    .m9lk-dial-tick.major::before{height:10px;width:1.5px;background:rgba(125,255,176,0.6);}
    .m9lk-dial-num{position:absolute;top:14px;font-family:'JetBrains Mono',monospace;font-size:0.5rem;color:rgba(234,255,242,0.55);}
    .m9lk-dial-pointer{position:absolute;top:-9px;left:50%;transform:translateX(-50%);font-size:0.7rem;color:var(--copper2,#7dffb0);filter:drop-shadow(0 0 4px rgba(57,255,138,0.7));z-index:2;}
    .m9lk-dial-hub{position:absolute;inset:26px;border-radius:50%;background:rgba(6,12,8,0.7);border:1px solid rgba(57,255,138,0.2);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:700;font-size:1.3rem;color:var(--cream);pointer-events:none;font-variant-numeric:tabular-nums;}

    .m9lk-hint{font-family:'JetBrains Mono',monospace;font-size:0.5rem;letter-spacing:0.1em;color:rgba(234,255,242,0.32);text-align:center;min-height:1.2rem;margin-bottom:0.6rem;}

    .m9lk-unlocking{display:flex;flex-direction:column;align-items:center;gap:0.9rem;padding:1rem 0 0.4rem;}
    .m9lk-unlocking-icon{font-size:2.2rem;filter:drop-shadow(0 0 14px rgba(57,255,138,0.6));}
    .m9lk-unlocking-txt{font-family:'Playfair Display',serif;font-weight:600;font-style:italic;font-size:1.15rem;background:linear-gradient(135deg,#7dffb0,#f3d0ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

    .m9lk-foot{font-family:'JetBrains Mono',monospace;font-size:0.48rem;letter-spacing:0.16em;color:rgba(234,255,242,0.2);text-transform:uppercase;margin-top:1.2rem;}

    @media (prefers-reduced-motion: reduce){
      .m9 *{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important;}
    }
    @media (max-width:640px){
      .m9-orbit-grid{gap:0.5rem;}
      .m9lk-dials{gap:1.1rem;}
      .m9lk-dial{width:104px;height:104px;}
    }
  `;
  document.head.appendChild(s);
};

const StarField = memo(({ mode }) => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let raf; let lastTime = performance.now();
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const col = mode === "dark" ? "234,255,242" : "11,51,32";
    const W = () => c.width, H = () => c.height;
    const stars = Array.from({ length: 70 }, () => ({
      x: Math.random() * W(), y: Math.random() * H(),
      r: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 1.2 + 0.4,
      driftY: -(Math.random() * 2 + 0.3),
    }));
    const draw = (now) => {
      let dt = (now - lastTime) / 1000;
      if (dt > 0.12) dt = 0.12;
      lastTime = now;
      ctx.clearRect(0, 0, W(), H());
      stars.forEach(st => {
        st.phase += st.speed * dt;
        st.y += st.driftY * dt;
        if (st.y < -5) { st.y = H() + 5; st.x = Math.random() * W(); }
        const tw = 0.5 + Math.sin(st.phase) * 0.5;
        ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${st.alpha * tw})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [mode]);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }} />;
});

const START_DATE = new Date(2025, 10, 30, 0, 0, 0); // 30 noviembre 2025
const TARGET_DAY = START_DATE.getDate();
const TARGET_MONTH = START_DATE.getMonth() + 1;
const MONTH_NAMES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

const CHAPTERS = [
  { seal: "I", date: "Tu forma de hacerme sentir", title: "Me haces sentir cosas inimaginables", desc: "Quiza tu pienses que tu me haces sentir mal o me haces sentir lo peor de seste mundo y la verdad es que no, ya que tu lo unico que me haces sentir es algo especial y unico que no siento con nadie, te pienso todo el dia y creeme que nunca va a dejar de ser asi" },
  { seal: "II", date: "Lo que me haces soñar", title: "Tenia sueños pero contigo son mas especiales", desc: "Quiza antes tenia algunos sueños propios pero desde que te conozco los quiero realizar todos contigo, tambien quiero darte la vida que tu siempre soñaste." },
  { seal: "III", date: "Porque me eliges", title: "A pesar de todo siempre me eliges a mi siempre", desc: "Hemos tenido muchas diferencias pero a pesar de todo yo siempre confio en tu amor y siempre me lo das todo a mi, me encanta que a pesar de como soy tu sigues luchando junto conmigo por este amor" },
];

const MEMORIES = [
  { icon: "💗", name: "Eres mi vida", tag: "Porque", detail: "Porque sin ti me apago y siento que no tengo un propósito en la vida" },
  { icon: "🌙", name: "Eres hermosa", tag: "Porque", detail: "Eres hermosa en todos los sentidos y nunca quiero que cambies" },
  { icon: "🌟", name: "Eres una caja de sorpresas", tag: "Porque", detail: "A pesar de que yo te conozco mucho siempre hay algo que no y eso que descubro hace que me gustes mas y mas." },
];

const TRACKS = [
  { freq: "28.8", name: " My One And Only Love", artist: "Mon Laferte ft. Natália Lafourcade, Silvana Estrada ", note: "Porque siempre vas a ser mi unico amor.", youtubeId: "lcoqOPaBe9M" },
  { freq: "20.10", name: "Te Quiero Tanto, Tanto", artist: "OV7", note: "Porque esta cancion quiza te ayude a comprender lo que siento.", youtubeId: "Y4fm-ebvAOs" },
  { freq: "30.11", name: "Te Amo", artist: "Franco De Vita", note: "Porque esta cancion resume lo que siento por ti.", youtubeId: "hNDtsPMX7p0" },
];

// ── Dial de combinación (reemplaza la contraseña escrita) ──────────────────
function valueFromRotation(rotation, count) {
  const segment = 360 / count;
  const idx = (((-Math.round(rotation / segment)) % count) + count) % count;
  return idx + 1;
}

function useDialDrag({ ref, count, setRotation, onSettle }) {
  const draggingRef = useRef(false);
  const lastAngleRef = useRef(0);
  const segment = 360 / count;

  const getAngle = useCallback((clientX, clientY) => {
    const el = ref.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    return (Math.atan2(dx, -dy) * 180) / Math.PI;
  }, [ref]);

  const onPointerDown = useCallback((e) => {
    draggingRef.current = true;
    lastAngleRef.current = getAngle(e.clientX, e.clientY);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, [getAngle]);

  const onPointerMove = useCallback((e) => {
    if (!draggingRef.current) return;
    const angle = getAngle(e.clientX, e.clientY);
    let delta = angle - lastAngleRef.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    lastAngleRef.current = angle;
    setRotation((r) => r + delta);
  }, [getAngle, setRotation]);

  const onPointerUp = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setRotation((r) => {
      const idx = (((-Math.round(r / segment)) % count) + count) % count;
      const snapped = -idx * segment;
      onSettle(idx + 1);
      return snapped;
    });
  }, [count, segment, onSettle]);

  return { onPointerDown, onPointerMove, onPointerUp };
}

function Dial({ label, count, rotation, setRotation, onSettle, matched, majorEvery = 1, formatNum }) {
  const ref = useRef(null);
  const { onPointerDown, onPointerMove, onPointerUp } = useDialDrag({ ref, count, setRotation, onSettle });
  const liveValue = valueFromRotation(rotation, count);
  const segment = 360 / count;
  const ticks = Array.from({ length: count });

  return (
    <div className="m9lk-dial-unit">
      <span className="m9lk-dial-label">{label}</span>
      <div
        ref={ref}
        className={`m9lk-dial${matched ? " matched" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={(e) => { if (e.buttons !== 1) onPointerUp(); }}
      >
        <span className="m9lk-dial-pointer">▾</span>
        <motion.div
          className="m9lk-dial-ring"
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
        >
          {ticks.map((_, i) => {
            const ang = i * segment;
            const isMajor = i % majorEvery === 0;
            return (
              <div key={i} className={`m9lk-dial-tick${isMajor ? " major" : ""}`} style={{ transform: `rotate(${ang}deg)` }}>
                {isMajor && (
                  <span className="m9lk-dial-num" style={{ transform: `rotate(${-ang}deg)` }}>
                    {formatNum ? formatNum(i + 1) : i + 1}
                  </span>
                )}
              </div>
            );
          })}
        </motion.div>
        <div className="m9lk-dial-hub">{formatNum ? formatNum(liveValue) : liveValue}</div>
      </div>
    </div>
  );
}

function LockScreen({ onUnlock }) {
  const goHome = useNavigate();
  const [dayRotation, setDayRotation] = useState(0);
  const [monthRotation, setMonthRotation] = useState(0);
  const [daySettled, setDaySettled] = useState(null);
  const [monthSettled, setMonthSettled] = useState(null);
  const [unlocking, setUnlocking] = useState(false);

  const dayLive = valueFromRotation(dayRotation, 31);
  const monthLive = valueFromRotation(monthRotation, 12);

  useEffect(() => {
    if (unlocking) return;
    if (daySettled === TARGET_DAY && monthSettled === TARGET_MONTH) {
      setUnlocking(true);
      sessionStorage.setItem("m9_ok", "1");
      onUnlock();
    }
  }, [daySettled, monthSettled, unlocking, onUnlock]);

  const stars = useRef(Array.from({ length: 60 }, () => ({
    x: Math.random() * 100, y: Math.random() * 100,
    s: Math.random() * 2.2 + 0.4,
    dur: `${(Math.random() * 5 + 2).toFixed(1)}s`,
    del: `${(Math.random() * 6).toFixed(1)}s`,
    op: Math.random() * 0.55 + 0.1,
  }))).current;

  return (
    <div className="m9lk">
      <div className="m9lk-bg" />
      <div className="m9lk-glow" />
      <StarField mode="dark" />

      <button className="m9lk-home-btn" onClick={() => goHome("/")}>← Volver al inicio</button>

      <div className="m9lk-stars">
        {stars.map((st, i) => (
          <div key={i} className="m9lk-star" style={{
            left: `${st.x}%`, top: `${st.y}%`, width: `${st.s}px`, height: `${st.s}px`,
            opacity: st.op, "--dur": st.dur, animationDelay: st.del,
          }} />
        ))}
      </div>

      <motion.div className="m9lk-panel"
        initial={{ opacity: 0, y: 50, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
        <div className="m9lk-top">
          <span className="m9lk-id">Capítulo · bloqueado</span>
          <div className="m9lk-status"><div className="m9lk-status-dot" />OBSERVANDO</div>
        </div>

        <div className="m9lk-body">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <div className="m9lk-orrery">
                  <div className="m9lk-orrery-ring" /><div className="m9lk-orrery-ring2" />
                  <motion.div className="m9lk-orrery-core" animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}>
                    🔭
                  </motion.div>
                </div>

                <p className="m9lk-label">✦ Observatorio cerrado</p>
                <h2 className="m9lk-title">Para ti,<br />capítulo nueve</h2>
                <p className="m9lk-sub">Gira los dos diales hasta alinear, bajo el indicador, el día en que empezó nuestro universo.</p>

                <div className="m9lk-sep"><div className="m9lk-sep-l" /><span className="m9lk-sep-icon">✦</span><div className="m9lk-sep-l r" /></div>

                <div className="m9lk-dials">
                  <Dial
                    label="Día"
                    count={31}
                    rotation={dayRotation}
                    setRotation={setDayRotation}
                    onSettle={setDaySettled}
                    matched={dayLive === TARGET_DAY}
                    majorEvery={5}
                  />
                  <Dial
                    label="Mes"
                    count={12}
                    rotation={monthRotation}
                    setRotation={setMonthRotation}
                    onSettle={setMonthSettled}
                    matched={monthLive === TARGET_MONTH}
                    majorEvery={1}
                    formatNum={(v) => MONTH_NAMES[v - 1]}
                  />
                </div>

                <p className="m9lk-hint">
                  {dayLive === TARGET_DAY && monthLive === TARGET_MONTH ? "Suelta para confirmar ♥" : "Arrastra cada disco con el dedo o el mouse"}
                </p>

                <p className="m9lk-foot">Solo tú conoces la fecha correcta ♥</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function OrbitRing({ value, max, label, color }) {
  const r = 46;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(1, value / max);
  const offset = circ * (1 - pct);
  return (
    <div className="m9-orbit-unit">
      <div className="m9-orbit-ring">
        <svg viewBox="0 0 100 100">
          <circle className="m9-orbit-track" cx="50" cy="50" r={r} />
          <circle
            className="m9-orbit-fill"
            cx="50" cy="50" r={r}
            stroke={color}
            strokeDasharray={circ}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="m9-orbit-num">{value}</div>
      </div>
      <span className="m9-orbit-label">{label}</span>
    </div>
  );
}

export default function Mes9({ mode = "dark", toggleMode }) {
  const goHome = useNavigate();
  const [internalMode, setInternalMode] = useState(mode);
  const activeMode = toggleMode ? mode : internalMode;
  const handleToggle = toggleMode || (() => setInternalMode(v => (v === "dark" ? "light" : "dark")));

  const [unlocked, setUnlocked] = useState(false);
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);

  useEffect(() => {
    injectStyles();
    if (sessionStorage.getItem("m9_ok") === "1") setUnlocked(true);
  }, []);

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

  if (!unlocked) {
    return <LockScreen onUnlock={() => setUnlocked(true)} />;
  }

  const sr = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  });

  const currentTrack = activeTrack !== null ? TRACKS[activeTrack] : null;
  const needleDeg = -70 + ((elapsed.seconds % 60) / 60) * 140;

  return (
    <div className={`m9 ${activeMode}`}>
      <div className="m9-bg" />
      <div className="m9-vignette" />
      <StarField mode={activeMode} />

      <div className="m9-content">

        <nav className="m9-nav">
          <div className="m9-nav-left">
            <button className="m9-back" onClick={() => goHome("/")}>← Volver</button>
            <span className="m9-nav-mark">Mes IX</span>
          </div>
          <span className="m9-nav-title">30 / 11 / 2025</span>
          <button className="m9-toggle" onClick={handleToggle} aria-label="Cambiar tema">
            {activeMode === "dark" ? "☀️" : "🌙"}
          </button>
        </nav>

        <section className="m9-hero">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="m9-hero-eyebrow">
            <span className="m9-hero-eyebrow-star">✦</span> Nueve meses de nosotros <span className="m9-hero-eyebrow-star">✦</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="m9-htitle">
            Nuestro Noveno<br />Mes Juntos
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="m9-hsub">
            Pasaron 9 meses desde que me dijiste que si y a pesar de muchas cosas seguimos aqui junntos
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="m9-hero-lede">
            Gracias por ser todo para mi, quiza no soy lo mejor para ti pero recuerda que siempre me voy a esforzar para hacerlo, pero te juo que a pesar de todo yo te quiero para <strong>toda la vida.</strong>
          </motion.p>
        </section>

        <motion.div className="m9-orbit-wrap" {...sr(0)}>
          <div className="m9-orbit-frame">
            <div className="m9-orbit-hd"><div className="m9-orbit-hd-dot" />Tiempo transcurrido</div>
            <div className="m9-orbit-grid">
              <OrbitRing value={elapsed.days} max={365} label="Días" color="var(--copper2)" />
              <OrbitRing value={elapsed.hours} max={24} label="Horas" color="var(--silver)" />
              <OrbitRing value={elapsed.minutes} max={60} label="Min" color="var(--copper2)" />
              <OrbitRing value={elapsed.seconds} max={60} label="Seg" color="var(--silver)" />
            </div>
            <div className="m9-orbit-foot">Todo este tiempo desde que me dijiste que si</div>
          </div>
        </motion.div>

        <motion.section className="m9-quote-wrap" {...sr(0)}>
          <span className="m9-quote-star">✦</span>
          <p className="m9-quote-txt">
            Nueve meses después,<span className="m9-quote-copper"> sigues siendo</span> lo que yo necesito en mi vida.
          </p>
          <div className="m9-quote-by">— 30/08/2026 —</div>
        </motion.section>

        <section className="m9-const-section">
          <motion.div className="m9-sec" {...sr(0)}>
            <span className="m9-sec-icon">✦</span>
            <span className="m9-sec-txt">Razones por las cuales te elegi y te necesito siempre</span>
            <div className="m9-sec-line" />
          </motion.div>
          <div className="m9-const-track">
            <div className="m9-const-line" />
            {CHAPTERS.map((ch, i) => (
              <motion.div key={i} className="m9-const-item" {...sr(i * 0.1)}>
                <div className="m9-const-star">{ch.seal}</div>
                <div className="m9-const-card">
                  <div className="m9-const-date">{ch.date}</div>
                  <div className="m9-const-title">{ch.title}</div>
                  <div className="m9-const-desc">{ch.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="m9-div"><div className="m9-div-l" /><span className="m9-div-i">✧</span><div className="m9-div-l" /></div>

        <section className="m9-const-section">
          <motion.div className="m9-sec" {...sr(0)}>
            <span className="m9-sec-icon">🌙</span>
            <span className="m9-sec-txt">Eres......</span>
            <div className="m9-sec-line" />
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.2rem", maxWidth: 760, margin: "0 auto" }}>
            {MEMORIES.map((m, i) => (
              <motion.div key={i} className="m9-const-card" {...sr(i * 0.08)}>
                <div style={{ fontSize: "1.6rem", marginBottom: "0.6rem" }}>{m.icon}</div>
                <div className="m9-const-title" style={{ fontSize: "1.02rem" }}>{m.name}</div>
                <div className="m9-const-desc">{m.detail}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="m9-div"><div className="m9-div-l" /><span className="m9-div-i">📻</span><div className="m9-div-l" /></div>

        <section className="m9-radio-section">
          <motion.div className="m9-sec" {...sr(0)}>
            <span className="m9-sec-icon">📻</span>
            <span className="m9-sec-txt">Playlist de este mes</span>
            <div className="m9-sec-line" />
          </motion.div>
          <motion.p className="m9-radio-intro" {...sr(0.05)}>
            La radio que te dedico a ti <strong>que eres todo para mi.</strong>
          </motion.p>

          <motion.div className="m9-radio" {...sr(0.1)}>
            <div className="m9-radio-dial-wrap">
              <div className="m9-radio-dial">
                <motion.div
                  className="m9-radio-needle"
                  animate={{ rotate: needleDeg }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                />
                <div className="m9-radio-dial-center" />
              </div>
            </div>
            <div className="m9-radio-freq">
              <div className="m9-radio-freq-num">{currentTrack ? currentTrack.freq : "— . —"}</div>
              <div className="m9-radio-freq-lbl">MHz</div>
            </div>

            <div className="m9-radio-label">
              {currentTrack ? (
                <>
                  <span className="m9-radio-status"><span className="m9-radio-status-dot" />EN EL AIRE</span>
                  <span className="m9-radio-song">{currentTrack.name}</span>
                  <span className="m9-radio-artist">{currentTrack.artist}</span>
                </>
              ) : (
                <span className="m9-radio-empty">Sintoniza una frecuencia de la lista ↓</span>
              )}
            </div>

            <div className="m9-station-list">
              {TRACKS.map((t, i) => (
                <div key={i} className={`m9-station${activeTrack === i ? " on" : ""}`}>
                  <div className="m9-station-row" onClick={() => setActiveTrack(prev => (prev === i ? null : i))}>
                    <span className="m9-station-freq">{t.freq}</span>
                    <div className="m9-station-info">
                      <div className="m9-station-name">{t.name}</div>
                      <div className="m9-station-artist">{t.artist} · {t.note}</div>
                    </div>
                    <div className="m9-station-btn">{activeTrack === i ? "✕" : "▶"}</div>
                  </div>
                  <AnimatePresence>
                    {activeTrack === i && (
                      <motion.div
                        className="m9-station-embed"
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
          <p className="m9-radio-note">Toca una frecuencia para escucharla aquí mismo ♥</p>
        </section>

        <div className="m9-div"><div className="m9-div-l" /><span className="m9-div-i">✉</span><div className="m9-div-l" /></div>

        <section className="m9-letter-section">
          <motion.div className="m9-sec" {...sr(0)}>
            <span className="m9-sec-icon">🔭</span>
            <span className="m9-sec-txt">Una carta para mi gran amor</span>
            <div className="m9-sec-line" />
          </motion.div>

          <div className="m9-envelope">
            <AnimatePresence mode="wait">
              {!envelopeOpen ? (
                <motion.div
                  key="closed"
                  className="m9-envelope-closed"
                  onClick={() => setEnvelopeOpen(true)}
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="m9-seal">IX</div>
                  <div className="m9-envelope-title">Para ti, mi gran amor 💖</div>
                  <div className="m9-envelope-hint">✦ Toca para desplegar la carta ✦</div>
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  className="m9-letter-page"
                  initial={{ opacity: 0, rotateX: -8, y: 14 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="m9-dropcap">Amor,</span>
                  <div className="m9-letter-text">
                    <p>Quien lo diria no?, vamos por nuestro noveno mes juntos y seguimos luchando por este gran amor que nos tenemos, quiza ultimamente en nuestra relacion pareciera que algunas veces nos hacemos sentir mal yo sientoq ue solo es un mal momento en la vida personal de los dos, estoy seguro que esto solo es una prueba mas para ver cuanto nos amamos, y dejame decirte que yo te amo infinitamente y nunca te voy a dejar sola, los problemas que tenemos hoy en dia nos van a llevar a ser una pareja ejemplo en el futuro y estoy seguro que algun dia lo vamos a contar riendonos y pasandolo bien con nuestra futura familia. </p>
                    <p>Gracias por seguir aquí, confio ciegamente en ti y espero que siempre estes para mi y que nunca dudes de mi amor por ti, espero no defraudarte en ningun aspecto de los que tu te imaginabas all principio de todo, espero que me ames toda la vida como yo te lo proimeto a ti, nunca va a haber nadie mas que tu en mi vida, eres lo unico que amo y deseo en la vida.</p>
                    <div className="m9-letter-flourish">
                      <div className="m9-letter-flourish-line" /><span>✦</span><div className="m9-letter-flourish-line r" />
                    </div>
                  </div>
                  <div className="m9-letter-sign">
                    <span className="m9-letter-closing">Con mucho amor,</span>
                    <span className="m9-letter-name">Eithan ♥</span>
                  </div>
                  <button className="m9-letter-close-btn" onClick={() => setEnvelopeOpen(false)}>← Cerrar la carta</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <motion.footer className="m9-footer" {...sr(0)}>
          <span className="m9-footer-star">✦</span>
          <div className="m9-footer-title">Feliz noveno mes</div>
          <div className="m9-footer-sub">"Nueve meses y con mucho futuro por delante"</div>
          <div className="m9-footer-num">30 de noviembre de 2025 · Mes IX · Hecho con amor por Eithan</div>
        </motion.footer>

      </div>
    </div>
  );
}