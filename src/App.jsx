import { useMemo, useState, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Chip,
  MobileStepper,
  IconButton,
  Tooltip,
} from "@mui/material";

import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AllInclusiveRoundedIcon from "@mui/icons-material/AllInclusiveRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

function App() {
  // 🔒 Cambia esta fecha a TU CUMPLEAÑOS en formato YYYY-MM-DD
  const SECRET_BIRTHDAY = "2025-08-28";

  // ✅ 0 = Bienvenida, 1 = Página
  const [screen, setScreen] = useState(() => {
    const saved = localStorage.getItem("diana_welcome_done");
    // Si quieres que recuerde la entrada: return saved === "1" ? 1 : 0;
    return saved === "1" ? 0 : 0;
  });

  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("love_theme_mode");
    return saved === "dark" ? "dark" : "light";
  });

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("love_theme_mode", next);
      return next;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                background: {
                  default: "#0b0b10",
                  paper: "rgba(20,20,28,.75)",
                },
              }
            : {}),
        },
        typography: {
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
        },
        shape: { borderRadius: 18 },
      }),
    [mode]
  );

  const goToPage = () => {
    localStorage.setItem("diana_welcome_done", "1");
    setScreen(1);
  };

  const goBackToWelcome = () => {
    // si quieres que al regresar tenga que volver a entrar, esto basta:
    setScreen(0);
    // si quieres que además "olvide" que ya entró:
    // localStorage.removeItem("diana_welcome_done");
    // setScreen(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <ThemeToggle mode={mode} onToggle={toggleMode} />

      <AnimatePresence mode="wait">
        {screen === 0 ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
            transition={{ duration: 0.55 }}
            style={{ minHeight: "100vh" }}
          >
            <Welcome onEnter={goToPage} mode={mode} secretDate={SECRET_BIRTHDAY} />
          </motion.div>
        ) : (
          <motion.div
            key="page"
            initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            transition={{ duration: 0.55 }}
            style={{ minHeight: "100vh" }}
          >
            <LovePage mode={mode} onBack={goBackToWelcome} />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

function ThemeToggle({ mode, onToggle }) {
  return (
    <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 9999 }}>
      <Tooltip title={mode === "dark" ? "Modo claro" : "Modo oscuro"}>
        <IconButton
          onClick={onToggle}
          sx={{
            border: "1px solid rgba(255,255,255,.18)",
            backgroundColor:
              mode === "dark" ? "rgba(25,25,35,.65)" : "rgba(255,255,255,.65)",
            backdropFilter: "blur(10px)",
          }}
        >
          {mode === "dark" ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}

/* ------------------ EFECTO: “CONFETTI” DE CORAZONES (sin libs extra) ------------------ */
function HeartBurst({ active, mode, count = 22 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.35;
      const dist = 120 + Math.random() * 120;
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist;
      const size = 12 + Math.random() * 12;
      const rotate = (Math.random() * 140 - 70) | 0;
      const delay = Math.random() * 0.08;
      const duration = 0.7 + Math.random() * 0.35;
      return { x, y, size, rotate, delay, duration };
    });
  }, [count]);

  return (
    <AnimatePresence>
      {active && (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            display: "grid",
            placeItems: "center",
            zIndex: 10,
          }}
        >
          <Box sx={{ position: "relative", width: 1, height: 1 }}>
            {particles.map((p, idx) => (
              <Box
                key={idx}
                component={motion.span}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.7, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: [0, p.x],
                  y: [0, p.y],
                  scale: [0.7, 1.1, 1],
                  rotate: [0, p.rotate],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: "easeOut",
                }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  fontSize: p.size,
                  filter:
                    mode === "dark"
                      ? "drop-shadow(0 6px 12px rgba(0,0,0,.35))"
                      : "none",
                }}
              >
                💗
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}

/* ------------------ BIENVENIDA + “CONTRASEÑA” (DÍA/MES/AÑO) ------------------ */
function Welcome({ onEnter, mode, secretDate }) {
  const [secretY, secretM, secretD] = secretDate.split("-").map(Number);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [error, setError] = useState("");
  const [celebrate, setCelebrate] = useState(false);

  const isReady = day && month && year;
  const isCorrect =
    Number(day) === secretD &&
    Number(month) === secretM &&
    Number(year) === secretY;

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { v: 1, t: "Enero" },
    { v: 2, t: "Febrero" },
    { v: 3, t: "Marzo" },
    { v: 4, t: "Abril" },
    { v: 5, t: "Mayo" },
    { v: 6, t: "Junio" },
    { v: 7, t: "Julio" },
    { v: 8, t: "Agosto" },
    { v: 9, t: "Septiembre" },
    { v: 10, t: "Octubre" },
    { v: 11, t: "Noviembre" },
    { v: 12, t: "Diciembre" },
  ];
  const years = Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - i);

  const handleTryEnter = () => {
    if (!isReady) return;

    if (isCorrect) {
      setError("");
      setCelebrate(true);
      setTimeout(() => onEnter(), 720);
    } else {
      setCelebrate(false);
      setError("Ok… esa no es la fecha, me voy a matar ⚰️");
    }
  };

  const resetMsg = () => {
    setError("");
    setCelebrate(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          mode === "dark"
            ? "radial-gradient(1200px 600px at 20% 10%, rgba(255,105,180,.18), transparent 60%), radial-gradient(900px 500px at 90% 30%, rgba(138,43,226,.16), transparent 55%), linear-gradient(180deg, rgba(10,10,16,1) 0%, rgba(8,8,12,1) 100%)"
            : "radial-gradient(1200px 600px at 20% 10%, rgba(255,105,180,.22), transparent 60%), radial-gradient(900px 500px at 90% 30%, rgba(138,43,226,.18), transparent 55%), linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,250,255,1) 100%)",
        display: "grid",
        placeItems: "center",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          component={motion.div}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          elevation={0}
          sx={{
            position: "relative",
            border: "1px solid rgba(0,0,0,.08)",
            overflow: "hidden",
            backgroundColor:
              mode === "dark" ? "rgba(18,18,26,.65)" : "rgba(255,255,255,.65)",
            backdropFilter: "blur(10px)",
          }}
        >
          <HeartBurst active={celebrate} mode={mode} />

          <CardContent sx={{ textAlign: "center", py: 5 }}>
            <Box
              component={motion.div}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              sx={{
                width: 74,
                height: 74,
                borderRadius: "999px",
                mx: "auto",
                mb: 2,
                display: "grid",
                placeItems: "center",
                border: "1px solid rgba(0,0,0,.10)",
                backgroundColor:
                  mode === "dark" ? "rgba(30,30,44,.7)" : "rgba(255,255,255,.75)",
                backdropFilter: "blur(6px)",
              }}
            >
              <FavoriteRoundedIcon fontSize="large" />
            </Box>

            <Typography
              variant="h4"
              sx={{ fontWeight: 900, mb: 1, letterSpacing: -0.6 }}
            >
              Hola, Diana 💖
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Te hice un pequeño regalo para este primer mes de muchos.
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              sx={{ mb: 3, flexWrap: "wrap" }}
            >
              <Chip icon={<CelebrationRoundedIcon />} label="1 mes juntos" />
              <Chip icon={<AccessTimeRoundedIcon />} label="Desde 30/11/2025" />
            </Stack>

            <Typography sx={{ fontWeight: 900, mb: 0.5 }}>
              Fecha secreta 🤔
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Para entrar, selecciona una fecha importante para nosotros
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 1.5 }}
            >
              <SelectBox
                value={day}
                onChange={(v) => {
                  setDay(v);
                  resetMsg();
                }}
                mode={mode}
                ariaLabel="Día"
              >
                <option value="">Día</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </SelectBox>

              <SelectBox
                value={month}
                onChange={(v) => {
                  setMonth(v);
                  resetMsg();
                }}
                mode={mode}
                ariaLabel="Mes"
              >
                <option value="">Mes</option>
                {months.map((m) => (
                  <option key={m.v} value={m.v}>
                    {m.t}
                  </option>
                ))}
              </SelectBox>

              <SelectBox
                value={year}
                onChange={(v) => {
                  setYear(v);
                  resetMsg();
                }}
                mode={mode}
                ariaLabel="Año"
              >
                <option value="">Año</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </SelectBox>
            </Stack>

            <Box sx={{ minHeight: 28, mb: 1 }}>
              {error ? (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              ) : isReady && isCorrect ? (
                <Typography variant="body2" sx={{ fontWeight: 800 }}>
                  Perfecto 💖
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Pista: es donde todo empezó 👀
                </Typography>
              )}
            </Box>

            <Button
              component={motion.button}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              size="large"
              variant="contained"
              startIcon={<AutoAwesomeRoundedIcon />}
              onClick={handleTryEnter}
              disabled={!isReady}
              sx={{ fontWeight: 800 }}
            >
              Entrar
            </Button>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 2 }}
            >
              (Si te equivocas probablemente me mate 💀)
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

function SelectBox({ value, onChange, mode, children, ariaLabel }) {
  return (
    <Box
      component="select"
      value={value}
      aria-label={ariaLabel}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        px: 2,
        py: 1.2,
        borderRadius: 3,
        border: "1px solid rgba(0,0,0,.18)",
        width: { xs: "100%", sm: 160 },
        backgroundColor:
          mode === "dark" ? "rgba(25,25,35,.55)" : "rgba(255,255,255,.75)",
        color: "inherit",
        outline: "none",
        appearance: "none",
      }}
    >
      {children}
    </Box>
  );
}

/* ------------------ RAZÓN DEL DÍA (random diario) ------------------ */
function useDailyReason() {
  const reasons = useMemo(
    () => [
      "Porque me haces sentir feliz con solo hablarte 💖",
      "Porque tu sonrisa ilumina cada parte de mí 💗",
      "Porque estar contigo es lo mejor del mundo 👀💗",
      "Porque contigo todo se siente más bonito ✨",
      "Porque siempre me motivas a ser lo mejor 🫶",
      "Porque me encanta tu forma de ser, completa 💘",
      "Porque tus llamadas son lo mejor que me puede pasar en el día 💞",
      "Porque me comprendes como nadie 😄",
      "Porque me gusta que te preocupes por mí 💖",
      "Porque eres lo mejor que tengo 💗",
      "Porque contigo no hace falta fingir algo que no soy 🫶",
      "Porque cada día contigo es un sueño cumplido 💖",
      "Porque me encanta tu forma de pensar 💗",
      "Porque eres todo lo que siempre necesité 💗",
      "Porque cuando estás conmigo, todo se siente distinto 💞",
      "Porque me gusta imaginar un futuro contigo 💗",
      "Porque me encanta tu sensibilidad 💗",
      "Porque eres hermosa por dentro y por fuera 💘",
      "Porque me haces sentir cosas que jamás imaginé 💖",
      "Porque eres mi elección hoy y siempre 💗",
    ],
    []
  );

  const [reason, setReason] = useState("");

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const keyDate = `${yyyy}-${mm}-${dd}`;

    const storedDate = localStorage.getItem("love_reason_date");
    const storedIndex = localStorage.getItem("love_reason_index");

    if (storedDate === keyDate && storedIndex !== null) {
      const idx = Math.max(0, Math.min(reasons.length - 1, Number(storedIndex)));
      setReason(reasons[idx]);
      return;
    }

    const idx = Math.floor(Math.random() * reasons.length);
    localStorage.setItem("love_reason_date", keyDate);
    localStorage.setItem("love_reason_index", String(idx));
    setReason(reasons[idx]);
  }, [reasons]);

  return reason;
}

/* ------------------ APARTADO “FRASE DEL DÍA” (MISMO DISEÑO, AHORA COPIA) ------------------ */
function ReasonOfDayCard({ mode }) {
  const reason = useDailyReason();
  const [shake, setShake] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyReason = async () => {
    try {
      await navigator.clipboard.writeText(reason || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("No se pudo copiar", e);
    }
  };

  const pulse = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
    copyReason();
  };

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
      elevation={0}
      sx={{
        mt: 6,
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,.10)",
        backgroundColor:
          mode === "dark" ? "rgba(18,18,26,.58)" : "rgba(255,255,255,.62)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* brillo suave */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            mode === "dark"
              ? "radial-gradient(700px 260px at 20% 10%, rgba(255,105,180,.20), transparent 60%), radial-gradient(500px 220px at 90% 30%, rgba(138,43,226,.16), transparent 60%)"
              : "radial-gradient(700px 260px at 20% 10%, rgba(255,105,180,.22), transparent 60%), radial-gradient(500px 220px at 90% 30%, rgba(138,43,226,.18), transparent 60%)",
          opacity: 0.95,
        }}
      />

      <CardContent sx={{ position: "relative", py: 3.2 }}>
        {/* encabezado */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.2}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 1.6 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                border: "1px solid rgba(0,0,0,.10)",
                backgroundColor:
                  mode === "dark"
                    ? "rgba(30,30,44,.65)"
                    : "rgba(255,255,255,.75)",
                backdropFilter: "blur(10px)",
              }}
            >
              💗
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 900, lineHeight: 1.05 }}>
                Razón del día
              </Typography>
              <Typography variant="body2" color="text.secondary">
                (Cambia todos los días 😁)
              </Typography>
            </Box>
          </Stack>

          <Button
            size="small"
            variant="outlined"
            onClick={pulse}
            sx={{
              fontWeight: 800,
              borderRadius: 999,
              textTransform: "none",
              px: 1.6,
              alignSelf: { xs: "stretch", sm: "auto" },
            }}
          >
            {copied ? "Copiado 💖" : "Copiar"}
          </Button>
        </Stack>

        {/* frase */}
        <Box
          component={motion.div}
          animate={shake ? { y: [0, -2, 0, -1, 0] } : {}}
          transition={{ duration: 0.45 }}
          sx={{
            position: "relative",
            borderRadius: 4,
            p: { xs: 2, sm: 2.2 },
            border: "1px solid rgba(0,0,0,.08)",
            backgroundColor:
              mode === "dark" ? "rgba(10,10,16,.40)" : "rgba(255,255,255,.70)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            aria-hidden
            sx={{
              position: "absolute",
              top: -8,
              left: 10,
              fontSize: 46,
              fontWeight: 900,
              opacity: mode === "dark" ? 0.22 : 0.14,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            “
          </Typography>

          <Typography
            variant="h6"
            sx={{ fontWeight: 900, mb: 0.6, letterSpacing: -0.2 }}
          >
            Hoy te amo…
          </Typography>

          <Typography
            sx={{
              fontSize: 16.5,
              lineHeight: 1.55,
              color: "text.secondary",
              maxWidth: 680,
            }}
          >
            {reason || "Porque sí. Porque siempre. 💗"}
          </Typography>

          <Typography
            aria-hidden
            sx={{
              position: "absolute",
              bottom: -18,
              right: 10,
              fontSize: 56,
              fontWeight: 900,
              opacity: mode === "dark" ? 0.18 : 0.12,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            ”
          </Typography>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1.2, textAlign: "right" }}
        >
          — con todo mi corazón 💞
        </Typography>
      </CardContent>
    </Card>
  );
}

/* ------------------ NUEVO DISEÑO: LÍNEA DEL TIEMPO (vertical con línea) ------------------ */
function TimelineMini({ mode }) {
  const items = [
    {
      date: "28/08/2025",
      title: "Donde todo empezó",
      text: "El día que nos conocimos.",
      icon: "💫",
    },
    {
      date: "20/10/2025",
      title: "Nuestra primera confesión",
      text: "El día que los dos dijimos lo que sentíamos el uno por el otro.",
      icon: "💌",
    },
    {
      date: "30/11/2025",
      title: "Te pedí ser mi novia",
      text: "Desde que te vi ese día, supe que te quiero para toda la vida 🫶",
      icon: "💍",
    },
  ];

  return (
    <Box sx={{ mt: 6 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 800, mb: 2, textAlign: "center" }}
      >
        Nuestra pequeña línea del tiempo 🗓️
      </Typography>

      <Box
        sx={{
          position: "relative",
          maxWidth: 760,
          mx: "auto",
          px: { xs: 1, sm: 2 },
          py: 1,
        }}
      >
        {/* Línea vertical */}
        <Box
          sx={{
            position: "absolute",
            left: { xs: 20, sm: 28 },
            top: 8,
            bottom: 8,
            width: 2,
            borderRadius: 999,
            background:
              mode === "dark"
                ? "linear-gradient(180deg, rgba(255,105,180,.45), rgba(138,43,226,.35))"
                : "linear-gradient(180deg, rgba(255,105,180,.55), rgba(138,43,226,.45))",
            opacity: 0.8,
          }}
        />

        <Stack spacing={2.2}>
          {items.map((it, idx) => (
            <Box
              key={it.title}
              component={motion.div}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "42px 1fr", sm: "56px 1fr" },
                columnGap: 2,
                alignItems: "start",
              }}
            >
              {/* Punto / Icono */}
              <Box
                sx={{
                  position: "relative",
                  display: "grid",
                  placeItems: "center",
                  width: { xs: 42, sm: 56 },
                  height: { xs: 42, sm: 56 },
                }}
              >
                <Box
                  sx={{
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    backgroundColor:
                      mode === "dark"
                        ? "rgba(255,255,255,.9)"
                        : "rgba(0,0,0,.85)",
                    position: "absolute",
                    left: { xs: 14, sm: 21 },
                    top: { xs: 14, sm: 21 },
                    boxShadow:
                      mode === "dark"
                        ? "0 10px 18px rgba(0,0,0,.35)"
                        : "0 10px 18px rgba(0,0,0,.12)",
                    opacity: 0.9,
                  }}
                />
                <Box
                  sx={{
                    width: { xs: 34, sm: 42 },
                    height: { xs: 34, sm: 42 },
                    borderRadius: 999,
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid rgba(0,0,0,.10)",
                    backgroundColor:
                      mode === "dark"
                        ? "rgba(18,18,26,.70)"
                        : "rgba(255,255,255,.75)",
                    backdropFilter: "blur(10px)",
                    fontSize: 18,
                  }}
                >
                  {it.icon}
                </Box>
              </Box>

              {/* Caja del evento */}
              <Box
                sx={{
                  border: "1px solid rgba(0,0,0,.08)",
                  borderRadius: 4,
                  px: 2,
                  py: 1.6,
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(18,18,26,.55)"
                      : "rgba(255,255,255,.55)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  sx={{ mb: 0.4 }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 900, lineHeight: 1.15 }}
                  >
                    {it.title}
                  </Typography>
                  <Chip size="small" label={it.date} sx={{ opacity: 0.9 }} />
                </Stack>

                <Typography color="text.secondary">{it.text}</Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

/* ------------------ TU PÁGINA COMPLETA ------------------ */
function LovePage({ mode, onBack }) {
  const [open, setOpen] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const [elapsed, setElapsed] = useState(() => getElapsedTime());

  function getElapsedTime() {
    const start = new Date("2025-11-30T00:00:00");
    const now = new Date();
    const diffMs = Math.max(0, now.getTime() - start.getTime());

    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const t = setInterval(() => setElapsed(getElapsedTime()), 1000);
    return () => clearInterval(t);
  }, []);

  const { ref: refMoments, inView: momentsInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: refSongs, inView: songsInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const songs = [
    { id: "0LpEr3qpmDQ1gEabnsQlGC", note: "Cada vez que te veo en persona 💖" },
    { id: "6dlZryuz7NIz20faRoZV4k", note: "La dedico con todo mi corazón 💖" },
    { id: "4lTb74TfRVhhcOpUpWa79y", note: "Para que sepas que siempre estoy 💖" },
  ];

  const [songIndex, setSongIndex] = useState(0);
  const maxSteps = songs.length;

  const moments = [
    {
      title: "Tu sonrisa",
      text: "Me encanta cada vez que sonríes por mis ocurrencias.",
      icon: <EmojiEmotionsRoundedIcon />,
    },
    {
      title: "Tus ojos",
      text: "Son los más lindos que he visto y, sin duda, me gustaría verlos al despertar.",
      icon: <VisibilityRoundedIcon />,
    },
    {
      title: "Tu forma de ser",
      text: "Desde que te conozco, lo único que haces es darme felicidad.",
      icon: <PersonRoundedIcon />,
    },
    {
      title: "Tu sensibilidad",
      text: "Me encanta que seas tan sensible, porque sé que, aunque sean cosas pequeñas, las aprecias mucho.",
      icon: <FavoriteRoundedIcon />,
    },
    {
      title: "Todo",
      text: "Aunque para ti tengas muchos defectos, para mí eres perfecta: la mujer más hermosa del mundo, con la que quiero pasar el resto de mis días.",
      icon: <AllInclusiveRoundedIcon />,
    },
  ];

  const openLetter = () => {
    setOpen(true);
    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 850);
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            mode === "dark"
              ? "radial-gradient(1200px 600px at 20% 10%, rgba(255,105,180,.18), transparent 60%), radial-gradient(900px 500px at 90% 30%, rgba(138,43,226,.16), transparent 55%), linear-gradient(180deg, rgba(10,10,16,1) 0%, rgba(8,8,12,1) 100%)"
              : "radial-gradient(1200px 600px at 20% 10%, rgba(255,105,180,.22), transparent 60%), radial-gradient(900px 500px at 90% 30%, rgba(138,43,226,.18), transparent 55%), linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,250,255,1) 100%)",
          py: { xs: 4, md: 7 },
        }}
      >
        <Container maxWidth="md">
          {/* BOTÓN REGRESAR */}
          <Button variant="text" onClick={onBack} sx={{ mb: 2, fontWeight: 700 }}>
            ⬅ Regresar
          </Button>

          {/* HERO */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}
          >
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 1, flexWrap: "wrap" }}
            >
              <Chip icon={<CelebrationRoundedIcon />} label="Nuestro 1er mes" />
              <Chip icon={<FavoriteRoundedIcon />} label="Diana " />
              <Chip icon={<AccessTimeRoundedIcon />} label="Desde 30/11/2025" />
            </Stack>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                letterSpacing: -0.8,
                mb: 1,
                lineHeight: 1.05,
              }}
            >
              Feliz primer mes, amor
            </Typography>

            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Días juntos:
            </Typography>

            <Stack
              direction="row"
              spacing={1.5}
              justifyContent="center"
              sx={{ mb: 3, flexWrap: "wrap" }}
            >
              <TimeBox label="Días" value={elapsed.days} />
              <TimeBox label="Horas" value={elapsed.hours} />
              <TimeBox label="Min" value={elapsed.minutes} />
              <TimeBox label="Seg" value={elapsed.seconds} />
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              justifyContent="center"
            >
              <Button
                size="large"
                variant="contained"
                startIcon={<AutoAwesomeRoundedIcon />}
                onClick={openLetter}
              >
                Para ti
              </Button>

              <Button
                size="large"
                variant="outlined"
                onClick={() =>
                  document
                    .getElementById("canciones")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              >
                Ir a canciones
              </Button>
            </Stack>
          </Box>

          {/* RAZÓN DEL DÍA (bonita) */}
          <ReasonOfDayCard mode={mode} />

          {/* LÍNEA DEL TIEMPO (nuevo diseño) */}
          <TimelineMini mode={mode} />

          {/* MOMENTOS */}
          <Box id="momentos" ref={refMoments} sx={{ scrollMarginTop: 20, mt: 6 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, mb: 2, textAlign: "center" }}
            >
              Cosas que amo de ti:
            </Typography>

            <Stack spacing={2}>
              {moments.map((item, idx) => (
                <Card
                  key={item.title}
                  component={motion.div}
                  initial={{ opacity: 0, y: 16 }}
                  animate={momentsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  elevation={0}
                  sx={{
                    border: "1px solid rgba(0,0,0,.08)",
                    overflow: "hidden",
                    backgroundColor:
                      mode === "dark"
                        ? "rgba(18,18,26,.55)"
                        : "rgba(255,255,255,.55)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 999,
                          display: "grid",
                          placeItems: "center",
                          border: "1px solid rgba(0,0,0,.10)",
                          flex: "0 0 auto",
                        }}
                      >
                        {item.icon}
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>
                          {item.title}
                        </Typography>
                        <Typography color="text.secondary">{item.text}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>

          {/* CANCIONES */}
          <Box
            id="canciones"
            ref={refSongs}
            sx={{ mt: 6, scrollMarginTop: 20 }}
            component={motion.div}
            initial={{ opacity: 0, y: 12 }}
            animate={songsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, mb: 2, textAlign: "center" }}
            >
              Canciones para ti 🎶
            </Typography>

            <Card
              elevation={0}
              sx={{
                border: "1px solid rgba(0,0,0,.08)",
                overflow: "hidden",
                backgroundColor:
                  mode === "dark"
                    ? "rgba(18,18,26,.55)"
                    : "rgba(255,255,255,.55)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent>
                <Stack spacing={1} alignItems="center" sx={{ textAlign: "center", mb: 1 }}>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", justifyContent: "center" }}>
                    <Chip icon={<MusicNoteRoundedIcon />} label={`Canción ${songIndex + 1} / ${maxSteps}`} />
                    <Chip label={songs[songIndex].note} />
                  </Stack>

                  <Box sx={{ width: "100%" }}>
                    <iframe
                      style={{ borderRadius: 12 }}
                      src={`https://open.spotify.com/embed/track/${songs[songIndex].id}`}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={`spotify-${songs[songIndex].id}`}
                    />
                  </Box>

                  <MobileStepper
                    variant="dots"
                    steps={maxSteps}
                    position="static"
                    activeStep={songIndex}
                    sx={{
                      mt: 2,
                      background: "transparent",
                      ".MuiMobileStepper-dots": { justifyContent: "center" },
                    }}
                    nextButton={
                      <IconButton
                        onClick={() => setSongIndex((i) => Math.min(i + 1, maxSteps - 1))}
                        disabled={songIndex === maxSteps - 1}
                      >
                        <KeyboardArrowRightRoundedIcon />
                      </IconButton>
                    }
                    backButton={
                      <IconButton
                        onClick={() => setSongIndex((i) => Math.max(i - 1, 0))}
                        disabled={songIndex === 0}
                      >
                        <KeyboardArrowLeftRoundedIcon />
                      </IconButton>
                    }
                  />
                </Stack>
              </CardContent>
            </Card>
          </Box>

          <Divider sx={{ my: 4 }} />
          <Typography align="center" color="text.secondary" sx={{ fontStyle: "italic" }}>
            Siempre que quieras regresar aquí, para que sepas que te amo, hazlo 😁💖
          </Typography>
        </Container>
      </Box>

      {/* MODAL / CARTA */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <Box sx={{ position: "relative" }}>
          <HeartBurst active={celebrate} mode={mode} count={18} />
          <DialogTitle sx={{ fontWeight: 900 }}>Para ti, amor 💖</DialogTitle>
          <DialogContent dividers>
            <Typography sx={{ mb: 1.5 }}>
              Amor, hoy cumplimos nuestro primer mes y déjame decirte que, desde que me dijiste “sí”, soy el hombre más feliz del mundo,
              porque no cualquiera tiene el privilegio de tener a una mujer tan hermosa y perfecta como lo eres tú.
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
              Gracias por estar para mí siempre y darme apoyo cuando más lo necesito. Recuerda que siempre voy a estar para ti y que siempre
              voy a ser ese loco, obsesionado por ti.
            </Typography>
            <Typography sx={{ fontWeight: 700 }}>Te amo con el alma. Feliz primer mes. 💗</Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Cerrar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

function TimeBox({ label, value }) {
  return (
    <Box
      sx={{
        px: 2,
        py: 1.2,
        borderRadius: 3,
        border: "1px solid rgba(0,0,0,.12)",
        minWidth: 78,
        backgroundColor: "rgba(255,255,255,.6)",
        backdropFilter: "blur(6px)",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 900, lineHeight: 1 }}>
        {String(value).padStart(2, "0")}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
}

export default App;
