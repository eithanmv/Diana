import { useState, useEffect, useMemo, memo } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Stack,
  Paper,
  Grid,
  Divider,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  Button
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Favorite,
  AutoAwesome,
  Stars,
  AccessTime,
  ChevronRightRounded,
  DarkModeRounded,
  LightModeRounded,
  LockClock,
  CakeRounded
} from "@mui/icons-material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

// --- IMPORTACIONES DE COMPONENTES ---
import Mes1 from "../mes1/mes1";
import Mes2 from "../mes2/mes2";
import Mes3 from "../mes3/mes3";
import Mes4 from "../mes4/mes4";
import Mes5 from "../mes5/mes5";
import SanValentin from "../sanvalentin/sanvalentin";
import Cumple from "../cumple/Cumple";

const FECHA_INICIO = "2025-11-30";

// --- ANIMACIÓN DE FONDO ESCALABLE ---
const HeartsAnimation = memo(({ pageTheme }) => {
  const heartColors = {
    default: ["rgba(255, 64, 129, 0.4)", "rgba(147, 51, 234, 0.4)"],
    mes3: ["rgba(124, 77, 255, 0.5)", "rgba(0, 229, 255, 0.5)"],
    mes4: ["rgba(255, 215, 64, 0.45)", "rgba(255, 193, 7, 0.45)"],
    mes5: ["rgba(76, 175, 80, 0.45)", "rgba(129, 199, 132, 0.45)"],
    cumple: ["rgba(255, 95, 162, 0.45)", "rgba(56, 189, 248, 0.45)"],
  };

  const colors = heartColors[pageTheme] || heartColors.default;

  return (
    <>
      {[...Array(35)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh", x: `${Math.random() * 100}vw`, opacity: 0 }}
          animate={{
            y: "-20vh",
            opacity: [0, 0.4, 0],
            scale: [0.5, 1.2, 0.7],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            delay: Math.random() * 25,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            color: i % 2 === 0 ? colors[0] : colors[1],
          }}
        >
          <Favorite sx={{ fontSize: Math.random() * 40 + 15 }} />
        </motion.div>
      ))}
    </>
  );
});

const GlobalBackground = ({ mode }) => {
  const location = useLocation();

  const routeThemes = {
    "/": "default",
    "/mes1": "default",
    "/mes2": "default",
    "/mes3": "mes3",
    "/mes4": "mes4",
    "/mes5": "mes5",
    "/cumple": "cumple",
    "/san-valentin": "default",
  };

  const pageTheme = routeThemes[location.pathname] || "default";

  const backgrounds = {
    dark: {
      default: "radial-gradient(circle at 50% 50%, #1a0510 0%, #050505 100%)",
      mes3: "radial-gradient(circle at 50% 50%, #0a051a 0%, #050505 100%)",
      mes4: "radial-gradient(circle at 50% 50%, #2b2100 0%, #050505 100%)",
      mes5: "radial-gradient(circle at 50% 50%, #071a0d 0%, #050505 100%)",
      cumple: "radial-gradient(circle at 50% 50%, #12071e 0%, #050505 100%)",
    },
    light: {
      default: "radial-gradient(circle at 50% 50%, #fff0f5 0%, #ffd1dc 100%)",
      mes3: "radial-gradient(circle at 50% 50%, #f0ebff 0%, #d1c4e9 100%)",
      mes4: "radial-gradient(circle at 50% 50%, #fffdf3 0%, #f7efc8 100%)",
      mes5: "radial-gradient(circle at 50% 50%, #edfbe9 0%, #b9e4c9 100%)",
      cumple: "radial-gradient(circle at 50% 50%, #fff5fb 0%, #e9dcff 100%)",
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        transition: "background 1.2s ease-in-out",
        background: backgrounds[mode][pageTheme],
        overflow: "hidden",
        pointerEvents: "none"
      }}
    >
      <HeartsAnimation pageTheme={pageTheme} />
    </Box>
  );
};

const CounterItem = ({ value, label, mode }) => (
  <Box sx={{ textAlign: "center", flex: 1 }}>
    <Typography
      variant="h3"
      sx={{
        fontWeight: 900,
        color: mode === "dark" ? "#fff" : "#ff4081",
        transition: "color 0.8s ease",
        textShadow: mode === "dark" ? "0 0 15px rgba(255, 64, 129, 0.6)" : "none",
        fontSize: { xs: "1.8rem", md: "2.5rem" }
      }}
    >
      {value}
    </Typography>
    <Typography
      variant="caption"
      sx={{
        color: mode === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
        fontWeight: 700,
        letterSpacing: 1.5
      }}
    >
      {label}
    </Typography>
  </Box>
);

function Home({ mode, toggleMode }) {
  const nav = useNavigate();
  const [timeLeft, setTimeLeft] = useState({});
  const isBirthdayLocked = false;

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = dayjs.duration(dayjs().diff(dayjs(FECHA_INICIO)));
      setTimeLeft({
        meses: Math.floor(diff.asMonths()),
        dias: diff.days(),
        horas: diff.hours(),
        minutos: diff.minutes(),
        segundos: diff.seconds(),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1000 }}>
        <IconButton
          onClick={toggleMode}
          sx={{
            bgcolor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,64,129,0.2)",
            transition: "all 0.5s ease"
          }}
        >
          {mode === "dark" ? (
            <LightModeRounded sx={{ color: "#ffeb3b" }} />
          ) : (
            <DarkModeRounded sx={{ color: "#4527a0" }} />
          )}
        </IconButton>
      </Box>

      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", py: 4 }}>
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Typography
            align="center"
            sx={{
              color: "#ff4081",
              fontWeight: 800,
              letterSpacing: 4,
              mb: 1,
              fontSize: "0.8rem"
            }}
          >
            NUESTRO UNIVERSO
          </Typography>

          <Typography
            variant="h1"
            align="center"
            sx={{
              fontSize: { xs: "3.5rem", md: "6rem" },
              fontWeight: 950,
              lineHeight: 1,
              mb: 4,
              transition: "all 0.8s ease",
              background:
                mode === "dark"
                  ? "linear-gradient(180deg, #fff 30%, #ff80ab 100%)"
                  : "linear-gradient(180deg, #ff4081 30%, #c2185b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: mode === "dark" ? "drop-shadow(0 0 20px rgba(255,64,129,0.3))" : "none"
            }}
          >
            Te Amo <br /> Diana
          </Typography>
        </motion.div>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            mb: 6,
            borderRadius: 8,
            transition: "all 0.8s ease",
            background: mode === "dark" ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(20px)",
            border: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(255, 64, 129, 0.2)",
            boxShadow: mode === "dark" ? "0 20px 40px rgba(0,0,0,0.4)" : "0 20px 40px rgba(255, 105, 180, 0.1)"
          }}
        >
          <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 4, opacity: 0.7 }}>
            <AccessTime fontSize="small" sx={{ color: "#ff80ab" }} />
            <Typography
              variant="overline"
              sx={{ color: mode === "dark" ? "#fff" : "#000", mt: 0.5, fontWeight: 700 }}
            >
              Cronología de nuestra felicidad
            </Typography>
          </Stack>

          <Stack
            direction="row"
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  transition: "border 0.8s ease",
                  borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                }}
              />
            }
            spacing={{ xs: 1, md: 3 }}
          >
            <CounterItem value={timeLeft.meses || 0} label="Meses" mode={mode} />
            <CounterItem value={timeLeft.dias || 0} label="Días" mode={mode} />
            <CounterItem value={timeLeft.horas || 0} label="Horas" mode={mode} />
            <CounterItem value={timeLeft.minutos || 0} label="Mins" mode={mode} />
            <CounterItem value={timeLeft.segundos || 0} label="Segs" mode={mode} />
          </Stack>
        </Paper>

        <Grid container spacing={2}>
          {[
            {
              path: "/mes1",
              label: "Mes Uno",
              desc: "Donde todo comenzó",
              icon: <AutoAwesome />,
              color: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)"
            },
            {
              path: "/mes2",
              label: "Mes Dos",
              desc: "Nuestra conexión real",
              icon: <Stars />,
              color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            },
            {
              path: "/mes3",
              label: "Mes Tres",
              desc: "Seguimos creciendo juntos",
              icon: <Favorite />,
              color: "linear-gradient(135deg, #7c4dff 0%, #00e5ff 100%)"
            },
            {
              path: "/mes4",
              label: "Mes Cuatro",
              desc: "Un capítulo dorado",
              icon: <AutoAwesome />,
              color: "linear-gradient(135deg, #f4b400 0%, #ffd54f 100%)"
            },
            {
              path: "/mes5",
              label: "Mes Cinco",
              desc: "Seguimos escribiendo nuestra historia",
              icon: <Stars />,
              color: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)"
            },
          ].map((item, idx) => (
            <Grid item xs={12} key={idx}>
              <Paper
                component={motion.div}
                whileHover={{ x: 10, scale: 1.01 }}
                onClick={() => nav(item.path)}
                sx={{
                  p: 3,
                  cursor: "pointer",
                  borderRadius: 6,
                  transition: "background 0.8s ease",
                  background: mode === "dark" ? "rgba(255, 255, 255, 0.04)" : "#fff",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: mode === "light" ? "0 10px 20px rgba(0,0,0,0.05)" : "none"
                }}
              >
                <Stack direction="row" spacing={3} alignItems="center">
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 4,
                      background: item.color,
                      display: "flex",
                      color: "#fff"
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 800, color: mode === "dark" ? "#fff" : "#000" }}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: mode === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </Stack>
                <ChevronRightRounded sx={{ color: "#ff4081" }} />
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8, position: "relative", px: 1 }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.8 }}>
            <Button
              onClick={() => nav("/cumple")}
              fullWidth
              sx={{
                height: "100px",
                borderRadius: "24px",
                position: "relative",
                background: mode === "dark" ? "rgba(255, 64, 129, 0.03)" : "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 64, 129, 0.3)",
                color: "#ff4081",
                textTransform: "none",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                px: 4,
                cursor: "pointer",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: "24px",
                  padding: "2px",
                  background: "linear-gradient(90deg, transparent, #ff4081, transparent)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "destination-out",
                  maskComposite: "exclude",
                  animation: "shimmer 3s infinite linear",
                  "@keyframes shimmer": {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" }
                  }
                }
              }}
            >
              <Stack direction="row" spacing={3} alignItems="center" sx={{ position: "relative", zIndex: 1 }}>
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "rgba(255, 64, 129, 0.1)",
                      border: "1px solid rgba(255, 64, 129, 0.2)"
                    }}
                  >
                    <CakeRounded sx={{ fontSize: 28, filter: "drop-shadow(0 0 8px #ff4081)" }} />
                  </Box>
                </motion.div>

                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: "1.2rem",
                      letterSpacing: 1,
                      background: "linear-gradient(90deg, #ff4081, #ff80ab)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    FELIZ CUMPLEAÑOS, MI AMOR
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)",
                      fontWeight: 700
                    }}
                  >
                    Click aquí para abrir tu sorpresa
                  </Typography>
                </Box>
              </Stack>
            </Button>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
}

export default function App() {
  const [mode, setMode] = useState(() => localStorage.getItem("userTheme") || "dark");

  useEffect(() => {
    localStorage.setItem("userTheme", mode);
  }, [mode]);

  const toggleMode = () => setMode((m) => (m === "dark" ? "light" : "dark"));

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode, primary: { main: "#ff69b4" } },
        typography: { fontFamily: "ui-sans-serif, system-ui, Roboto" },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <GlobalBackground mode={mode} />
        <Routes>
          <Route path="/" element={<Home mode={mode} toggleMode={toggleMode} />} />
          <Route path="/mes1" element={<Mes1 mode={mode} toggleMode={toggleMode} />} />
          <Route path="/mes2" element={<Mes2 mode={mode} toggleMode={toggleMode} />} />
          <Route path="/mes3" element={<Mes3 mode={mode} toggleMode={toggleMode} />} />
          <Route path="/mes4" element={<Mes4 mode={mode} toggleMode={toggleMode} />} />
          <Route path="/mes5" element={<Mes5 mode={mode} toggleMode={toggleMode} />} />
          <Route path="/san-valentin" element={<SanValentin mode={mode} />} />
          <Route path="/cumple" element={<Cumple mode={mode} toggleMode={toggleMode} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}