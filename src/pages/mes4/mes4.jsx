import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Stack,
  IconButton,
  Button,
  Avatar,
  Modal,
  Fade,
  Backdrop,
  Paper,
  TextField
} from "@mui/material";
import { motion } from "framer-motion";
import {
  ArrowBackIosNewRounded,
  DarkModeRounded,
  LightModeRounded,
  FavoriteRounded,
  MailRounded,
  CloseRounded,
  WbSunnyRounded,
  PlayArrowRounded,
  AutoAwesomeRounded,
  LockRounded,
  SecurityRounded
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Mes4({ mode, toggleMode }) {
  const navigate = useNavigate();

  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [open, setOpen] = useState(false);
  const [clave, setClave] = useState("");
  const [errorAcceso, setErrorAcceso] = useState(false);
  const [accesoConcedido, setAccesoConcedido] = useState(false);

  const [activeSong, setActiveSong] = useState({
    titulo: "Alexander Acha - Te Amo",
    artista: "Alexander Acha",
    ytId: "kpm6J8gyIrM"
  });

  const songs = [
    {
      titulo: "Alexander Acha - Te Amo",
      artista: "Alexander Acha",
      ytId: "kpm6J8gyIrM"
    },
    {
      titulo: "Kevin Kaarl - Vámonos a Marte",
      artista: "Kevin Kaarl",
      ytId: "OMozkgVYqpI"
    },
    {
      titulo: "Julieta Venegas - Eres para Mí",
      artista: "Julieta Venegas",
      ytId: "pj2ntDiXJCk"
    },
    {
      titulo: "León Larregui - Brillas",
      artista: "León Larregui",
      ytId: "Otr4S2cMP3A"
    }
  ];

  useEffect(() => {
    const start = new Date("2025-11-30T00:00:00");

    const t = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - start.getTime();

      const dias = Math.floor(diff / 86400000);
      const horas = Math.floor((diff % 86400000) / 3600000);
      const minutos = Math.floor((diff % 3600000) / 60000);
      const segundos = Math.floor((diff % 60000) / 1000);

      setTime({
        d: dias < 0 ? 0 : dias,
        h: horas < 0 ? 0 : horas,
        m: minutos < 0 ? 0 : minutos,
        s: segundos < 0 ? 0 : segundos
      });
    }, 1000);

    return () => clearInterval(t);
  }, []);

  const palette = {
    gold: "#c89b1d",
    goldSoft: "#ecd78d",
    darkText: "#fbf1d8",
    lightText: "#7d6316",
    darkGlass: "rgba(255,255,255,0.04)",
    lightGlass: "rgba(255,255,255,0.80)",
    border: "rgba(200,155,29,0.22)",
    softBorder: "rgba(200,155,29,0.12)",
    modalDark:
      "linear-gradient(180deg, rgba(24,18,8,0.98) 0%, rgba(11,8,3,1) 100%)",
    modalLight:
      "linear-gradient(180deg, rgba(255,255,252,0.98) 0%, rgba(246,239,214,0.99) 100%)"
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

const verificarClave = () => {
  const respuesta = clave.toLowerCase().trim();

  const nombresValidos = ["molly", "harry", "cici"];

  if (nombresValidos.includes(respuesta)) {
    setAccesoConcedido(true);
  } else {
    setErrorAcceso(true);
    setTimeout(() => setErrorAcceso(false), 1800);
  }
};

  if (!accesoConcedido) {
    return (
      <Box sx={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
        <GoldenAtmosphere />

        <Container maxWidth="sm">
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: 6
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7 }}
              style={{ width: "100%" }}
            >
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  p: { xs: 4, md: 5.5 },
                  borderRadius: 10,
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  border: `1px solid ${palette.border}`,
                  background:
                    mode === "dark"
                      ? "linear-gradient(180deg, rgba(24,18,8,0.96) 0%, rgba(11,8,3,0.99) 100%)"
                      : "linear-gradient(180deg, rgba(255,255,252,0.98) 0%, rgba(245,238,214,0.99) 100%)",
                  backdropFilter: "blur(22px)",
                  boxShadow:
                    mode === "dark"
                      ? "0 24px 70px rgba(0,0,0,0.36)"
                      : "0 24px 50px rgba(200,155,29,0.08)"
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    background:
                      mode === "dark"
                        ? "radial-gradient(circle at 20% 18%, rgba(255,220,120,0.08), transparent 28%), radial-gradient(circle at 80% 20%, rgba(255,238,180,0.05), transparent 25%), radial-gradient(circle at 50% 85%, rgba(200,155,29,0.07), transparent 35%)"
                        : "radial-gradient(circle at 20% 18%, rgba(244,226,169,0.24), transparent 28%), radial-gradient(circle at 80% 20%, rgba(255,242,196,0.16), transparent 25%), radial-gradient(circle at 50% 85%, rgba(200,155,29,0.08), transparent 35%)"
                  }}
                />

                <Stack spacing={3} alignItems="center" sx={{ position: "relative", zIndex: 1 }}>
                  <Box
                    sx={{
                      position: "relative",
                      width: 210,
                      height: 210,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                      style={{
                        position: "absolute",
                        width: 190,
                        height: 190,
                        borderRadius: "50%",
                        border: "1px solid rgba(200,155,29,0.16)"
                      }}
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 17, repeat: Infinity, ease: "linear" }}
                      style={{
                        position: "absolute",
                        width: 145,
                        height: 145,
                        borderRadius: "50%",
                        border: "1px solid rgba(200,155,29,0.22)"
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        width: 220,
                        height: 220,
                        borderRadius: "50%",
                        background:
                          "radial-gradient(circle, rgba(200,155,29,0.24) 0%, rgba(200,155,29,0.08) 38%, transparent 72%)",
                        filter: "blur(22px)"
                      }}
                    />
                    {[...Array(10)].map((_, i) => {
                      const angle = (360 / 10) * i;
                      const radius = 86;
                      return (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1.15, 0.85] }}
                          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.16 }}
                          style={{
                            position: "absolute",
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: "rgba(255,235,170,0.8)",
                            boxShadow: "0 0 12px rgba(255,235,170,0.85)",
                            transform: `rotate(${angle}deg) translate(${radius}px)`
                          }}
                        />
                      );
                    })}
                    <motion.div
                      animate={{ scale: [1, 1.04, 1], y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                    >
                      <Avatar
                        sx={{
                          width: 102,
                          height: 102,
                          bgcolor: "rgba(200,155,29,0.12)",
                          border: `1px solid ${palette.border}`,
                          color: palette.gold,
                          boxShadow:
                            mode === "dark"
                              ? "0 0 35px rgba(200,155,29,0.14)"
                              : "0 12px 30px rgba(200,155,29,0.11)"
                        }}
                      >
                        <SecurityRounded sx={{ fontSize: 52 }} />
                      </Avatar>
                    </motion.div>
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <LockRounded sx={{ color: palette.gold, fontSize: 16 }} />
                    <Typography
                      sx={{
                        fontWeight: 900,
                        letterSpacing: 4,
                        textTransform: "uppercase",
                        fontSize: "0.78rem",
                        color: mode === "dark" ? palette.darkText : palette.lightText,
                        opacity: 0.9
                      }}
                    >
                      Acceso privado
                    </Typography>
                    <LockRounded sx={{ color: palette.gold, fontSize: 16 }} />
                  </Stack>

                  <Typography
                    sx={{
                      fontSize: { xs: "2.7rem", md: "3.6rem" },
                      fontWeight: 1000,
                      lineHeight: 1,
                      letterSpacing: -2,
                      background:
                        mode === "dark"
                          ? "linear-gradient(180deg, #fff8e5 0%, #c89b1d 100%)"
                          : "linear-gradient(180deg, #b28611 0%, #c89b1d 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    Solo para ti
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "1rem",
                      lineHeight: 1.85,
                      maxWidth: 430,
                      color:
                        mode === "dark"
                          ? "rgba(248,239,216,0.82)"
                          : "rgba(126,101,24,0.86)",
                      fontWeight: 500
                    }}
                  >
                    Escribe el nombre de uno de nuestros hijos.
                  </Typography>

                  <Stack spacing={2} sx={{ width: "100%" }}>
                    <TextField
                      fullWidth
                      placeholder="Alguno de nuestros hijos..."
                      value={clave}
                      onChange={(e) => setClave(e.target.value)}
                      error={errorAcceso}
                      autoComplete="off"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") verificarClave();
                      }}
                      InputProps={{
                        sx: {
                          borderRadius: 4,
                          fontWeight: 700,
                          textAlign: "center",
                          bgcolor: mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.58)"
                        }
                      }}
                    />

                    <Button
                      fullWidth
                      onClick={verificarClave}
                      sx={{
                        py: 1.7,
                        borderRadius: 999,
                        bgcolor: "rgba(200,155,29,0.12)",
                        border: `1px solid rgba(200,155,29,0.42)`,
                        color: mode === "dark" ? palette.darkText : palette.lightText,
                        fontWeight: 1000,
                        boxShadow: "none",
                        "&:hover": {
                          bgcolor: "rgba(200,155,29,0.22)",
                          boxShadow: "none"
                        }
                      }}
                    >
                      Desbloquear
                    </Button>
                  </Stack>

                  {errorAcceso && (
                    <Typography sx={{ color: "#ff6b6b", fontWeight: 900, fontSize: "0.85rem" }}>
                      Palabra incorrecta.
                    </Typography>
                  )}
                </Stack>
              </Paper>
            </motion.div>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <GoldenAtmosphere />

      <Box
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          right: 16,
          display: "flex",
          justifyContent: "space-between",
          zIndex: 1000
        }}
      >
        <Button
          onClick={() => navigate("/")}
          startIcon={<ArrowBackIosNewRounded />}
          sx={{
            borderRadius: 999,
            px: 2.2,
            color: mode === "dark" ? "#fff" : palette.lightText,
            bgcolor:
              mode === "dark"
                ? "rgba(255,255,255,0.05)"
                : "rgba(255,255,255,0.80)",
            backdropFilter: "blur(14px)",
            border: `1px solid ${palette.border}`,
            fontWeight: 900
          }}
        >
          Atrás
        </Button>

        <IconButton
          onClick={toggleMode}
          sx={{
            bgcolor:
              mode === "dark"
                ? "rgba(255,255,255,0.05)"
                : "rgba(255,255,255,0.80)",
            backdropFilter: "blur(14px)",
            border: `1px solid ${palette.border}`
          }}
        >
          {mode === "dark" ? (
            <LightModeRounded sx={{ color: "#ffe082" }} />
          ) : (
            <DarkModeRounded sx={{ color: palette.gold }} />
          )}
        </IconButton>
      </Box>

      <Container maxWidth="md">
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 10
          }}
        >
          <Stack spacing={4.5} alignItems="center" textAlign="center" sx={{ width: "100%" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85 }}
              style={{ width: "100%" }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 4, md: 6 },
                  borderRadius: 10,
                  position: "relative",
                  overflow: "hidden",
                  border: `1px solid ${palette.border}`,
                  background:
                    mode === "dark"
                      ? "linear-gradient(180deg, rgba(24,18,8,0.96) 0%, rgba(11,8,3,0.99) 100%)"
                      : "linear-gradient(180deg, rgba(255,255,252,0.97) 0%, rgba(245,238,214,0.98) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow:
                    mode === "dark"
                      ? "0 24px 70px rgba(0,0,0,0.36)"
                      : "0 24px 50px rgba(200,155,29,0.07)"
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    background:
                      mode === "dark"
                        ? "radial-gradient(circle at 20% 18%, rgba(255,220,120,0.08), transparent 28%), radial-gradient(circle at 80% 20%, rgba(255,238,180,0.05), transparent 25%), radial-gradient(circle at 50% 80%, rgba(200,155,29,0.07), transparent 35%)"
                        : "radial-gradient(circle at 20% 18%, rgba(244,226,169,0.24), transparent 28%), radial-gradient(circle at 80% 20%, rgba(255,242,196,0.16), transparent 25%), radial-gradient(circle at 50% 80%, rgba(200,155,29,0.08), transparent 35%)"
                  }}
                />

                <Stack alignItems="center" spacing={2.8} sx={{ position: "relative", zIndex: 1 }}>
                  <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.3}>
                    <PremiumEmblem mode={mode} />
                  </motion.div>

                  <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AutoAwesomeRounded sx={{ color: palette.gold, fontSize: 16 }} />
                      <Typography
                        sx={{
                          fontWeight: 900,
                          letterSpacing: 4,
                          textTransform: "uppercase",
                          fontSize: "0.78rem",
                          color: mode === "dark" ? palette.darkText : palette.lightText,
                          opacity: 0.9
                        }}
                      >
                        Capítulo cuatro
                      </Typography>
                      <AutoAwesomeRounded sx={{ color: palette.gold, fontSize: 16 }} />
                    </Stack>
                  </motion.div>

                  <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.9}>
                    <Typography
                      sx={{
                        fontSize: { xs: "3.8rem", md: "6.2rem" },
                        fontWeight: 1000,
                        lineHeight: 0.9,
                        letterSpacing: -5,
                        background:
                          mode === "dark"
                            ? "linear-gradient(180deg, #fff8e5 0%, #c89b1d 100%)"
                            : "linear-gradient(180deg, #b28611 0%, #c89b1d 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      }}
                    >
                      MES 4
                    </Typography>
                  </motion.div>

                  <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1.2}>
                    <Typography
                      sx={{
                        fontSize: { xs: "1.15rem", md: "1.38rem" },
                        lineHeight: 1.7,
                        maxWidth: 620,
                        color:
                          mode === "dark"
                            ? "rgba(251,241,216,0.92)"
                            : "rgba(125,99,22,0.94)",
                        fontWeight: 700
                      }}
                    >
                      Cuatro meses después y sigues siendo lo mejor que me pasó.
                    </Typography>
                  </motion.div>

                  <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1.5}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1}
                      justifyContent="center"
                      alignItems="center"
                      sx={{ pt: 1 }}
                    >
                      {["DIANA", "&", "EITHAN", "Ꝏ"].map((item, i) => (
                        <Box
                          key={i}
                          sx={{
                            px: 2.2,
                            py: 0.9,
                            borderRadius: 999,
                            border: `1px solid ${palette.softBorder}`,
                            bgcolor: "rgba(200,155,29,0.08)"
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 800,
                              fontSize: "0.86rem",
                              color: mode === "dark" ? palette.darkText : palette.lightText
                            }}
                          >
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </motion.div>
                </Stack>
              </Paper>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1.8}
              style={{ width: "100%" }}
            >
              <PremiumCounter time={time} mode={mode} color={palette.gold} />
            </motion.div>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4.2 },
                borderRadius: 9,
                width: "100%",
                textAlign: "center",
                border: `1px solid ${palette.border}`,
                bgcolor: mode === "dark" ? palette.darkGlass : palette.lightGlass,
                backdropFilter: "blur(18px)"
              }}
            >
              <Stack spacing={2.2} alignItems="center">
                <Avatar
                  sx={{
                    width: 66,
                    height: 66,
                    bgcolor: "rgba(200,155,29,0.12)",
                    color: palette.gold,
                    border: `1px solid ${palette.border}`
                  }}
                >
                  <FavoriteRounded />
                </Avatar>

                <Typography
                  sx={{
                    fontSize: { xs: "1.28rem", md: "1.65rem" },
                    fontWeight: 1000,
                    color: mode === "dark" ? palette.darkText : palette.lightText
                  }}
                >
                  Lo mejor de estos 4 meses
                </Typography>

                <Typography
                  sx={{
                    maxWidth: 720,
                    lineHeight: 2,
                    color:
                      mode === "dark"
                        ? "rgba(248,239,216,0.82)"
                        : "rgba(126,101,24,0.88)",
                    fontWeight: 500
                  }}
                >
                  Estos 4 meses contigo es algo que siempre voy a recordar porque desde que llegaste a mi vida eres lo que me faltaba, eres la mujer más hermosa y valiosa de este mundo, recuerda que aunque no podamos estar juntos todos los días yo siempre estoy en tu pensamiento y en tu corazón, porque créeme que tú estás allí desde el día que te conocí.
                </Typography>
              </Stack>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 9,
                width: "100%",
                textAlign: "center",
                border: `1px solid ${palette.border}`,
                bgcolor: mode === "dark" ? palette.darkGlass : palette.lightGlass,
                backdropFilter: "blur(18px)"
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "1.25rem", md: "1.6rem" },
                  fontWeight: 1000,
                  mb: 1.5,
                  color: mode === "dark" ? palette.darkText : palette.lightText
                }}
              >
                Sonido del mes cuatro
              </Typography>

              <Typography
                sx={{
                  mb: 3,
                  color:
                    mode === "dark"
                      ? "rgba(248,239,216,0.72)"
                      : "rgba(126,101,24,0.78)",
                  fontWeight: 500
                }}
              >
                Una pequeña selección para acompañar este capítulo.
              </Typography>

              <Stack spacing={1.2} sx={{ mb: 3 }}>
                {songs.map((song, i) => {
                  const active = activeSong.ytId === song.ytId;
                  return (
                    <Button
                      key={song.ytId}
                      fullWidth
                      onClick={() => setActiveSong(song)}
                      sx={{
                        textTransform: "none",
                        borderRadius: 4,
                        px: 2,
                        py: 1.5,
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: `1px solid ${
                          active ? "rgba(200,155,29,0.38)" : "rgba(200,155,29,0.12)"
                        }`,
                        bgcolor: active
                          ? "rgba(200,155,29,0.16)"
                          : mode === "dark"
                            ? "rgba(255,255,255,0.02)"
                            : "rgba(255,255,255,0.45)",
                        backdropFilter: "blur(10px)",
                        boxShadow: active
                          ? "0 10px 24px rgba(200,155,29,0.10)"
                          : "none",
                        "&:hover": {
                          bgcolor: active
                            ? "rgba(200,155,29,0.18)"
                            : mode === "dark"
                              ? "rgba(255,255,255,0.04)"
                              : "rgba(255,255,255,0.62)"
                        }
                      }}
                    >
                      <Stack direction="row" spacing={1.4} alignItems="center">
                        <Avatar
                          sx={{
                            width: 34,
                            height: 34,
                            fontSize: "0.82rem",
                            fontWeight: 900,
                            bgcolor: active ? "rgba(200,155,29,0.20)" : "rgba(200,155,29,0.10)",
                            color: palette.gold,
                            border: `1px solid rgba(200,155,29,0.18)`
                          }}
                        >
                          {i + 1}
                        </Avatar>

                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            sx={{
                              fontWeight: 900,
                              fontSize: "0.92rem",
                              color: mode === "dark" ? palette.darkText : palette.lightText,
                              lineHeight: 1.2
                            }}
                          >
                            {song.titulo}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.76rem",
                              opacity: 0.72,
                              color: mode === "dark" ? palette.darkText : palette.lightText,
                              mt: 0.3
                            }}
                          >
                            {song.artista}
                          </Typography>
                        </Box>
                      </Stack>

                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: active ? "rgba(200,155,29,0.18)" : "rgba(200,155,29,0.08)",
                          border: `1px solid rgba(200,155,29,0.16)`
                        }}
                      >
                        <PlayArrowRounded sx={{ color: palette.gold, fontSize: 20 }} />
                      </Box>
                    </Button>
                  );
                })}
              </Stack>

              <Box
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: 6,
                  border: `1px solid ${palette.softBorder}`
                }}
              >
                <Box sx={{ width: "100%", bgcolor: "black", position: "relative", pt: "56.25%" }}>
                  <iframe
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: 0
                    }}
                    src={`https://www.youtube.com/embed/${activeSong.ytId}?rel=0&modestbranding=1&controls=1`}
                    title="Mes 4 Playlist"
                    allowFullScreen
                  />
                </Box>
              </Box>
            </Paper>

            <Button
              variant="contained"
              fullWidth
              onClick={() => setOpen(true)}
              startIcon={<MailRounded />}
              sx={{
                py: 2.2,
                borderRadius: 999,
                bgcolor: "rgba(200,155,29,0.12)",
                border: `1px solid rgba(200,155,29,0.42)`,
                color: mode === "dark" ? palette.darkText : palette.lightText,
                fontWeight: 1000,
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "rgba(200,155,29,0.22)",
                  boxShadow: "none"
                }
              }}
            >
              Abrir carta
            </Button>
          </Stack>
        </Box>
      </Container>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 450,
          sx: {
            backdropFilter: "blur(14px)",
            bgcolor: "rgba(0,0,0,0.78)"
          }
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "92%",
              maxWidth: 520
            }}
          >
            <Paper
              sx={{
                p: { xs: 3.2, md: 4.8 },
                borderRadius: 10,
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                border: `1px solid ${palette.border}`,
                background: mode === "dark" ? palette.modalDark : palette.modalLight,
                boxShadow:
                  mode === "dark"
                    ? "0 24px 70px rgba(0,0,0,0.42)"
                    : "0 24px 50px rgba(200,155,29,0.10)"
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    mode === "dark"
                      ? "radial-gradient(circle at 20% 18%, rgba(255,220,120,0.08), transparent 28%), radial-gradient(circle at 80% 18%, rgba(255,238,180,0.05), transparent 24%)"
                      : "radial-gradient(circle at 20% 18%, rgba(244,226,169,0.24), transparent 28%), radial-gradient(circle at 80% 18%, rgba(255,242,196,0.16), transparent 24%)"
                }}
              />

              <IconButton
                onClick={() => setOpen(false)}
                sx={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  color: palette.gold,
                  zIndex: 2
                }}
              >
                <CloseRounded />
              </IconButton>

              <Stack spacing={2.2} alignItems="center" sx={{ position: "relative", zIndex: 1 }}>
                <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Box
                    sx={{
                      position: "absolute",
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, rgba(200,155,29,0.22) 0%, rgba(200,155,29,0.08) 40%, transparent 75%)",
                      filter: "blur(16px)"
                    }}
                  />
                  <Avatar
                    sx={{
                      width: 82,
                      height: 82,
                      bgcolor: "rgba(200,155,29,0.12)",
                      color: palette.gold,
                      border: `1px solid ${palette.border}`
                    }}
                  >
                    <FavoriteRounded sx={{ fontSize: 38 }} />
                  </Avatar>
                </Box>

                <Typography
                  sx={{
                    fontSize: "0.78rem",
                    letterSpacing: 4,
                    textTransform: "uppercase",
                    fontWeight: 900,
                    color: palette.gold,
                    opacity: 0.9
                  }}
                >
                  Carta privada
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: "1.5rem", md: "1.75rem" },
                    fontWeight: 1000,
                    color: mode === "dark" ? palette.darkText : palette.lightText
                  }}
                >
                  Amor
                </Typography>

                <Typography
                  sx={{
                    maxWidth: 410,
                    lineHeight: 2,
                    fontStyle: "italic",
                    color:
                      mode === "dark"
                        ? "rgba(248,239,216,0.84)"
                        : "rgba(126,101,24,0.88)",
                    fontSize: { xs: "0.98rem", md: "1.02rem" }
                  }}
                >
                  “Este cuarto mes para mí ha sido una prueba más de que siempre quiero
                  estar contigo. Aun con los problemas que tuvimos, supimos salir adelante
                  juntos, y eso me hace sentir todavía más orgulloso de nosotros.
                  Porque amar también es elegirnos cuando toca ser fuertes.
                  Te amo cada día más.”
                </Typography>

                <Box
                  sx={{
                    width: 90,
                    height: 1,
                    bgcolor: palette.gold,
                    opacity: 0.35,
                    my: 1
                  }}
                />

                <Typography
                  sx={{
                    fontWeight: 900,
                    letterSpacing: 1.8,
                    color: palette.gold
                  }}
                >
                  SIEMPRE TUYO, EITHAN
                </Typography>
              </Stack>
            </Paper>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

function PremiumEmblem({ mode }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.03, 1], y: [0, -7, 0] }}
      transition={{ repeat: Infinity, duration: 4 }}
      style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: "50%",
          border: "1px solid rgba(200,155,29,0.16)"
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: 170,
          height: 170,
          borderRadius: "50%",
          border: "1px solid rgba(200,155,29,0.22)"
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: { xs: 190, md: 240 },
          height: { xs: 190, md: 240 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,155,29,0.26) 0%, rgba(200,155,29,0.09) 38%, transparent 72%)",
          filter: "blur(20px)"
        }}
      />

      {[...Array(8)].map((_, i) => {
        const angle = (360 / 8) * i;
        const radius = 95;
        return (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.15, 0.85] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18 }}
            style={{
              position: "absolute",
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "rgba(255,235,170,0.8)",
              boxShadow: "0 0 12px rgba(255,235,170,0.85)",
              transform: `rotate(${angle}deg) translate(${radius}px)`
            }}
          />
        );
      })}

      <Avatar
        sx={{
          width: { xs: 100, md: 118 },
          height: { xs: 100, md: 118 },
          bgcolor: "rgba(200,155,29,0.12)",
          border: "1px solid rgba(200,155,29,0.24)",
          color: "#c89b1d",
          boxShadow:
            mode === "dark"
              ? "0 0 35px rgba(200,155,29,0.14)"
              : "0 12px 30px rgba(200,155,29,0.11)"
        }}
      >
        <WbSunnyRounded sx={{ fontSize: 54 }} />
      </Avatar>
    </motion.div>
  );
}

function PremiumCounter({ time, mode, color }) {
  const items = [
    { value: time.d, label: "Días" },
    { value: time.h, label: "Hrs" },
    { value: time.m, label: "Min" },
    { value: time.s, label: "Seg" }
  ];

  return (
    <Stack
      direction="row"
      spacing={{ xs: 1.2, md: 2 }}
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      useFlexGap
      sx={{ width: "100%" }}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -4, scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <Box
            sx={{
              minWidth: { xs: 78, md: 105 },
              px: { xs: 2, md: 2.5 },
              py: { xs: 1.7, md: 2.1 },
              borderRadius: 5,
              border: "1px solid rgba(200,155,29,0.20)",
              background:
                mode === "dark"
                  ? "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.025) 100%)"
                  : "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.60) 100%)",
              backdropFilter: "blur(18px)",
              boxShadow:
                mode === "dark"
                  ? "0 10px 25px rgba(0,0,0,0.18), 0 0 0 1px rgba(200,155,29,0.03)"
                  : "0 10px 20px rgba(200,155,29,0.08)"
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.7rem", md: "2.1rem" },
                fontWeight: 1000,
                lineHeight: 1,
                color,
                textShadow: mode === "dark" ? `0 0 12px ${color}35` : "none"
              }}
            >
              {item.value}
            </Typography>
            <Typography
              sx={{
                mt: 0.7,
                fontSize: "0.72rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 1.3,
                opacity: 0.7
              }}
            >
              {item.label}
            </Typography>
          </Box>
        </motion.div>
      ))}
    </Stack>
  );
}

function GoldenAtmosphere() {
  return (
    <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: `${Math.random() * 100}%`,
            x: `${Math.random() * 100}%`,
            opacity: 0
          }}
          animate={{
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0, 0.16, 0]
          }}
          transition={{
            duration: Math.random() * 12 + 11,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 4
          }}
          style={{
            position: "absolute",
            width: Math.random() * 190 + 90,
            height: Math.random() * 190 + 90,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,155,29,0.18) 0%, transparent 70%)",
            filter: "blur(24px)"
          }}
        />
      ))}

      {[...Array(16)].map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          animate={{
            opacity: [0.18, 0.9, 0.18],
            scale: [0.8, 1.25, 0.8]
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "rgba(255,235,170,0.75)",
            boxShadow: "0 0 12px rgba(255,235,170,0.75)"
          }}
        />
      ))}
    </Box>
  );
}