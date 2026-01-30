import { useMemo, useState, useEffect } from "react"
import {
  ThemeProvider, createTheme, CssBaseline, Container, Box, Typography, Button,
  Stack, Card, Dialog, DialogTitle, DialogContent, DialogActions, Chip,
  LinearProgress, Paper, IconButton, Avatar, TextField, Fab, Zoom
} from "@mui/material"

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded"
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded"
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded"
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded"
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded"
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded"
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded"
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import confetti from 'canvas-confetti';

export default function Mes2({ mode, toggleMode }) {
  const navigate = useNavigate()
  const [isAuthorized, setIsAuthorized] = useState(false)

  const fireHearts = () => {
    const scalar = 2;
    const heart = confetti.shapeFromText({ text: '❤️', scalar });
    confetti({
      shapes: [heart],
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff4081']
    });
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: "#ff69b4" },
      secondary: { main: "#7c4dff" },
      background: { 
        default: "transparent", 
        paper: mode === "dark" ? "rgba(30, 30, 45, 0.6)" : "rgba(255, 255, 255, 0.7)" 
      },
    },
    shape: { borderRadius: 28 },
    typography: { fontFamily: 'Inter, system-ui, Roboto' },
  }), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatePresence mode="wait">
        {!isAuthorized ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
          >
            <LoginScreen onAccess={() => { setIsAuthorized(true); setTimeout(fireHearts, 500); }} mode={mode} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ 
              position: "fixed", top: 0, left: 0, right: 0, p: 2, 
              zIndex: 1000, display: 'flex', justifyContent: 'space-between',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)'
            }}>
              <Button
                onClick={() => navigate("/")} 
                startIcon={<ArrowBackIosNewRoundedIcon />}
                sx={{
                  color: mode === "dark" ? "white" : "#ff4081",
                  backdropFilter: "blur(12px)",
                  bgcolor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.4)",
                  border: "1px solid rgba(255,105,180,0.2)",
                  borderRadius: 10, px: 2,
                }}
              >
                Inicio
              </Button>

              <IconButton onClick={toggleMode} sx={{ 
                backdropFilter: "blur(12px)", 
                bgcolor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,105,180,0.2)" 
              }}>
                {mode === "dark" ? <LightModeRoundedIcon sx={{color: '#ffeb3b'}} /> : <DarkModeRoundedIcon sx={{color: '#4527a0'}} />}
              </IconButton>
            </Box>

            <Mes2Page mode={mode} fireHearts={fireHearts} />
            <EmergencySupport mode={mode} fireHearts={fireHearts} />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}

function LoginScreen({ onAccess, mode }) {
  const [name, setName] = useState("")
  const [error, setError] = useState(false)
  const [isScanning, setIsScanning] = useState(false) // Estado para el láser

  const handleLogin = (e) => {
    e.preventDefault()
    if (name.toLowerCase().trim() === "cole") {
      setIsScanning(true)
      // Simula el escaneo láser antes de entrar
      setTimeout(() => {
        onAccess()
      }, 1500)
    } else {
      setError(true)
      setTimeout(() => setError(false), 500)
    }
  }

  return (
    <Box sx={{ 
      height: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: mode === 'dark' 
        ? 'radial-gradient(circle at center, #1a0510 0%, #000 100%)' 
        : 'radial-gradient(circle at center, #fff5f8 0%, #fce4ec 100%)',
      p: 3,
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* EFECTO LÁSER: Aparece solo al autorizar */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ top: "-10%", opacity: 0 }}
            animate={{ top: "110%", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '4px',
              background: '#ff1493',
              boxShadow: '0 0 20px #ff1493, 0 0 40px #ff1493',
              zIndex: 9999
            }}
          />
        )}
      </AnimatePresence>

      <Container maxWidth="xs">
        <motion.div
          animate={error ? { x: [-10, 10, -10, 10, 0] } : isScanning ? { scale: [1, 1.05, 0.9], opacity: [1, 1, 0] } : {}}
          transition={{ duration: error ? 0.4 : 1.5 }}
        >
          <Card sx={{ 
            p: 1, borderRadius: 0, bgcolor: 'transparent', boxShadow: 'none', position: 'relative'
          }}>
            <Box sx={{
              p: 4,
              bgcolor: mode === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              border: '2px solid #ff69b4',
              boxShadow: mode === 'dark' ? '0 0 40px rgba(255,105,180,0.2)' : '0 20px 50px rgba(0,0,0,0.1)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden' // Para que el brillo interno no se salga
            }}>
              
              {/* Overlay de escaneo (Brillo sutil) */}
              {isScanning && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(transparent, #ff69b4, transparent)',
                    zIndex: 1
                  }}
                />
              )}

              <Box sx={{ position: 'absolute', top: -5, left: -5, width: 20, height: 20, borderLeft: '4px solid #ff4081', borderTop: '4px solid #ff4081' }} />
              <Box sx={{ position: 'absolute', bottom: -5, right: -5, width: 20, height: 20, borderRight: '4px solid #ff4081', borderBottom: '4px solid #ff4081' }} />

              <LockOpenRoundedIcon sx={{ fontSize: 50, color: '#ff69b4', mb: 2 }} />
              
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, letterSpacing: -1, textTransform: 'uppercase', color: mode === 'dark' ? '#fff' : '#000' }}>
                {isScanning ? "Escaneando..." : "Seguridad"}
              </Typography>
              
              <Typography variant="caption" sx={{ mb: 4, display: 'block', opacity: 0.6, letterSpacing: 2 }}>
                {isScanning ? "IDENTIDAD VERIFICADA" : "ESTÁS INTENTANDO ACCEDER AL MES 2"}
              </Typography>

              <form onSubmit={handleLogin}>
                <TextField 
                  fullWidth variant="filled" placeholder="¿Cuál es mi tercer nombre?" 
                  value={name} onChange={(e) => setName(e.target.value)}
                  error={error} disabled={isScanning}
                  InputProps={{ 
                    disableUnderline: true,
                    sx: { 
                      borderRadius: 0, bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      fontSize: '1rem', mb: 2, border: error ? '1px solid #ff1744' : '1px solid rgba(255,105,180,0.3)',
                      '& input': { textAlign: 'center', py: 2 }
                    } 
                  }}
                />
                
                {error && (
                  <Typography variant="caption" sx={{ color: '#ff1744', display: 'block', mb: 2, fontWeight: 700 }}>
                    ESE NO ES MI TERCER NOMBRE, GG AMOR 💔
                  </Typography>
                )}

                <Button 
                  fullWidth variant="contained" type="submit" 
                  disabled={isScanning}
                  sx={{ 
                    borderRadius: 0, py: 2, fontWeight: 900, fontSize: '0.9rem',
                    bgcolor: isScanning ? '#4caf50' : '#ff69b4',
                    color: '#fff', boxShadow: 'none', letterSpacing: 2,
                    '&:hover': { bgcolor: '#ff4081', boxShadow: '0 0 20px rgba(255,64,129,0.5)' }
                  }}
                >
                  {isScanning ? "ACCESO CONCEDIDO" : "AUTORIZAR"}
                </Button>
              </form>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </Box>
  )
}

function Mes2Page({ mode, fireHearts }) {
  const [open, setOpen] = useState(false)
  const [reasonIndex, setReasonIndex] = useState(0)
  const [elapsed, setElapsed] = useState({ d: 0, h: 0, m: 0, s: 0 })

  const razones = [
    "Me encanta como te ries de mis bromas sin sentido.",
    "Me encanta que seras mi otra mitad para siempre.",
    "Me encanta que seas una princesa ",
    "Me encanta que seas una mujer muy fuete que puede con todo y contra todo.",
    "Simplemente porque eres tú, Diana.",
    "Porque cada momento contigo es especial.",
  ]

  const nextReason = () => setReasonIndex((prev) => (prev + 1) % razones.length)

 const getGreeting = () => {
  const hour = new Date().getHours();
  let text, icon;

  if (hour < 12) {
    text = "Buenos días mi princesa hermosa";
    icon = "☀️";
  } else if (hour < 19) {
    text = "Linda tarde mi amor hermoso";
    icon = "✨";
  } else {
    text = "Buenas noches mi cielo";
    icon = "🌙";
  }

  return (
    <Box sx={{
      mb: 5,
      position: 'relative',
      // Diseño cuadrado y agresivo
      borderRadius: 0,
      bgcolor: mode === 'dark' ? 'rgba(255, 105, 180, 0.05)' : 'rgba(255, 105, 180, 0.08)',
      border: '1px solid rgba(255, 105, 180, 0.3)',
      borderLeft: '10px solid #ff69b4', // Tu color rosa principal
      p: 4,
      overflow: 'hidden'
    }}>
      {/* Indicador de sistema en la esquina con tu paleta */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        bgcolor: '#ff69b4',
        color: '#fff',
        px: 2,
        py: 0.5,
        fontSize: '0.7rem',
        fontWeight: 900,
        letterSpacing: 2
      }}>
        SESION ACTIVA
      </Box>

      <Stack spacing={1}>
        <Typography variant="caption" sx={{ 
          color: '#ff4081', 
          fontWeight: 900, 
          letterSpacing: 3,
          fontSize: '0.7rem'
        }}>
          BIENVENIDA  DIANA
        </Typography>

        <Typography variant="h3" sx={{ 
          fontWeight: 950, 
          color: mode === 'dark' ? '#fff' : '#000',
          textTransform: 'uppercase',
          lineHeight: 1,
          letterSpacing: -2,
          fontSize: { xs: '2rem', md: '3.5rem' },
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          {text} <span style={{ fontSize: '3rem' }}>{icon}</span>
        </Typography>

        <Box sx={{ 
          mt: 2,
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5,
          borderTop: '1px solid rgba(255, 105, 180, 0.2)',
          pt: 2
        }}>
          <Box sx={{ 
            width: 12, 
            height: 12, 
            bgcolor: '#ff4081',
            boxShadow: '0 0 10px #ff69b4'
          }} />
          <Typography variant="body2" sx={{ 
            opacity: 0.6, 
            fontWeight: 700, 
            fontSize: '0.75rem',
            textTransform: 'uppercase'
          }}>
            Mes 2 • {new Date().toLocaleDateString()}
          </Typography>
        </Box>
      </Stack>

      {/* Marca de agua decorativa */}
      <Typography sx={{ 
        position: 'absolute', 
        right: -10, 
        bottom: -20, 
        fontSize: '8rem', 
        opacity: 0.03, 
        transform: 'rotate(-15deg)',
        userSelect: 'none'
      }}>
        {icon}
      </Typography>
    </Box>
  );
};

  useEffect(() => {
    const start = new Date("2025-11-30T00:00:00")
    const t = setInterval(() => {
      const diff = new Date() - start
      setElapsed({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000)
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <Box sx={{ py: 12, minHeight: "100vh" }}>
      <Container maxWidth="sm">
        
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main', border: '4px solid white', boxShadow: '0 0 20px rgba(255,105,180,0.5)' }}>
              <FavoriteRoundedIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, opacity: 0.8 }}>{getGreeting()}</Typography>
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
              <Chip label="Día 60+" variant="filled" color="primary" sx={{ fontWeight: 800 }} />
              <Chip label="Capítulo 2" variant="outlined" sx={{ fontWeight: 700, borderColor: 'primary.main', color: 'primary.main' }} />
            </Stack>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, color: mode === "dark" ? "#fff" : "#ff4081", textShadow: mode === 'dark' ? '0 0 15px rgba(255,255,255,0.2)' : 'none' }}>
              Diana & Eithan
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 4 }}>
              <TimeBox label="Días" v={elapsed.d} mode={mode} />
              <TimeBox label="Hrs" v={elapsed.h} mode={mode} />
              <TimeBox label="Min" v={elapsed.m} mode={mode} />
              <TimeBox label="Seg" v={elapsed.s} mode={mode} />
            </Stack>
          </motion.div>
        </Box>

        <Stack spacing={4}>
          <ScrollReveal delay={0.2}>
            <Card sx={{ p: 4, textAlign: "center", position: 'relative', overflow: 'hidden', backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)", background: mode === 'dark' ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.6)" }}>
              <TipsAndUpdatesRoundedIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <AnimatePresence mode="wait">
                <motion.div key={reasonIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <Typography variant="h6" sx={{ fontStyle: "italic", minHeight: "3.5em", fontWeight: 500 }}>"{razones[reasonIndex]}"</Typography>
                </motion.div>
              </AnimatePresence>
              <Button variant="outlined" onClick={nextReason} sx={{ mt: 2, borderRadius: 10, textTransform: 'none', fontWeight: 700 }}>Siguiente razón</Button>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <Card sx={{ p: 3, backdropFilter: "blur(16px)" }}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}><AutoAwesomeRoundedIcon color="primary" /> Complicidad</Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 900 }}>100%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={100} sx={{ height: 12, borderRadius: 6, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)', '& .MuiLinearProgress-bar': { borderRadius: 6 } }} />
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Card 
              component={motion.div} 
              whileHover={{ scale: 1.03, y: -5 }} 
              whileTap={{ scale: 0.98 }} 
              onClick={() => { setOpen(true); fireHearts(); }} 
              sx={{ 
                p: 4, cursor: "pointer", 
                background: "linear-gradient(135deg, #ff69b4 0%, #ff4081 100%)", 
                color: "white", position: 'relative', overflow: 'hidden'
              }}
            >
              <Box sx={{ position: 'absolute', right: -20, top: -20, opacity: 0.2 }}>
                <FavoriteRoundedIcon sx={{ fontSize: 150 }} />
              </Box>
              <Stack direction="row" spacing={3} alignItems="center">
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 65, height: 65, border: '2px solid rgba(255,255,255,0.5)' }}>
                  <AutoAwesomeRoundedIcon fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 900 }}>Tu Carta</Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>Para mi Amor</Typography>
                </Box>
              </Stack>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <TruthOrDareGame mode={mode} />
          </ScrollReveal>

          {/* PLAYLIST CON REPRODUCTOR DE YOUTUBE */}
          <ScrollReveal delay={0.6}>
            <MusicPlaylist mode={mode} />
          </ScrollReveal>
        </Stack>
      </Container>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        fullWidth 
        maxWidth="xs" 
        PaperProps={{ 
          sx: { 
            borderRadius: 6, 
            background: '#fff9f0', 
            backgroundImage: 'radial-gradient(#d1d1d1 0.5px, transparent 0.5px)',
            backgroundSize: '20px 20px',
            p: 2 
          } 
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#d81b60', fontFamily: 'serif' }}>Diana</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.6 }}>Mi persona favorita</Typography>
          <Box sx={{ width: 40, height: 3, bgcolor: '#ff4081', mx: 'auto', mt: 1, borderRadius: 2 }} />
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Typography sx={{ lineHeight: 2, textAlign: 'justify', fontSize: '1.1rem', color: '#444', fontFamily: 'serif' }}>
            Amor, estoy agradecido por dejarme estar en tu vida estos dos meses, porque me ayudaste a descubrir que: <b>eres mi vida entera</b>. Eres mi vida porque, si algún día no estás, no sabría qué hacer sin ti. Eres la luz en la oscuridad y mi motivación diaria.
            <br /><br /> 
            Sé que siempre te lo digo, pero eres hermosa por dentro y por fuera. Cada día tengo el orgullo de decir que eres mi mujer, porque no cualquiera tiene el privilegio de tener a una persona como tú a su lado. Gracias, porque sé que puedo contar contigo para todo. Así que hoy, mañana y siempre, enamorado de ti.
          </Typography>
          <Box sx={{ textAlign: 'right', mt: 3 }}>
            <Typography sx={{ fontStyle: 'italic', color: '#ff4081', fontWeight: 700 }}>Con todo mi amor, Eithan ❤️</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
          <Button onClick={() => setOpen(false)} variant="contained" size="large" sx={{ borderRadius: 10, px: 6, bgcolor: '#ff4081', '&:hover': { bgcolor: '#d81b60' } }}>Te amo</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

function MusicPlaylist({ mode }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const canciones = [
    { title: "Donde Nadie Pueda Ir", artist: "Manuel Medrano", id: "dR-T5nnkjvQ" },
    { title: "Reina Pepiada", artist: "Álvaro Díaz", id: "Zn37zIBGv5M" },
    { title: "Amor Completo", artist: "Mon Laferte", id: "QaFtF7XLEBI" }
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, px: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <YouTubeIcon sx={{ color: '#ff0000' }} /> Playlist para mi Amor
      </Typography>
      
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0, y: -15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }}
            key="player-container"
            style={{ marginBottom: '20px' }}
          >
            <Card sx={{ 
              position: 'relative', 
              borderRadius: 1, 
              overflow: 'hidden', 
              bgcolor: 'black',
              boxShadow: '0 10px 40px rgba(255,105,180,0.5)',
              border: '2px solid #ff69b4' // El borde que te gustó
            }}>
              
              <IconButton 
                onClick={() => setSelectedVideo(null)}
                sx={{ 
                  position: 'absolute', top: 8, right: 8, zIndex: 10, 
                  bgcolor: 'rgba(0,0,0,0.6)', color: 'white',
                  '&:hover': { bgcolor: '#ff4081' }
                }}
                size="small"
              >
                <CloseRoundedIcon sx={{ fontSize: 18 }} />
              </IconButton>

              <Box sx={{ position: 'relative', paddingTop: '56.25%', width: '100%' }}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                  title="YouTube player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>

              <Button 
                fullWidth 
                component={motion.button}
                animate={{ backgroundColor: ['#ff69b4', '#ff4081', '#ff69b4'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                onClick={() => setSelectedVideo(null)}
                sx={{ 
                  color: 'white', 
                  borderRadius: 0, 
                  fontWeight: 900,
                  fontSize: '0.75rem',
                  py: 1.5,
                  letterSpacing: 1
                }}
              >
                CERRAR REPRODUCTOR
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Stack spacing={1.5}>
        {canciones.map((song) => (
          <Paper 
            key={song.id} 
            component={motion.div}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedVideo(song.id)}
            sx={{ 
              p: 2, display: "flex", alignItems: "center", cursor: 'pointer', 
              borderRadius: 2,
              background: selectedVideo === song.id 
                ? 'linear-gradient(90deg, #ff69b4, #ff4081)' 
                : (mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.8)'),
              color: selectedVideo === song.id ? '#fff' : 'inherit',
              transition: 'background 0.3s ease',
              border: '1px solid rgba(255,105,180,0.2)',
              '&:hover': { borderColor: '#ff69b4', boxShadow: '0 4px 15px rgba(255,105,180,0.2)' }
            }}
          >
            <PlayCircleFilledWhiteRoundedIcon sx={{ mr: 2, fontSize: 30, opacity: 0.8 }} />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 800 }}>{song.title}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>{song.artist}</Typography>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

function TruthOrDareGame({ mode }) {
  const [activeTab, setActiveTab] = useState(null);
  const [content, setContent] = useState("¿Quieres jugar conmigo?");

  const truths = [
    "¿Qué fue lo primero que pensaste cuando me viste?",
    "¿Cuál es tu recuerdo favorito desde que nos conocemos?",
    "¿Qué es lo que más te hace reír de mí?",
    "¿Si pudiéramos viajar a cualquier lado mañana, a dónde iríamos?",
    "¿Cuál es esa canción que siempre te recuerda a mi?"
  ];

  const dares = [
    "Mándame una nota de voz diciéndome algo lindo.",
    "Tómate una 2 mil fotos y mandamelas ahora mismo",
    "Dime algunas cosas que quieras hacer conmigo",
    "Canta una cancion para mi :D",
    "Envíame el personaje de valorant que mas me identifica"
  ];

  const handlePick = (type) => {
    const list = type === 'truth' ? truths : dares;
    const random = list[Math.floor(Math.random() * list.length)];
    setActiveTab(type);
    setContent(random);
  };

  const truthColor = "#ba68c8";
  const dareColor = "#ff69b4";

  return (
    <Card sx={{ 
      p: 3, textAlign: 'center', position: 'relative', overflow: 'hidden', transition: 'all 0.5s ease',
      background: activeTab === 'truth' ? `linear-gradient(135deg, ${truthColor}22 0%, ${truthColor}44 100%)` : activeTab === 'dare' ? `linear-gradient(135deg, ${dareColor}22 0%, ${dareColor}44 100%)` : mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
      backdropFilter: "blur(10px)", border: `2px solid ${activeTab === 'truth' ? truthColor : activeTab === 'dare' ? dareColor : 'rgba(255,105,180,0.2)'}`
    }}>
      <CasinoRoundedIcon sx={{ fontSize: 45, mb: 1, color: activeTab === 'truth' ? truthColor : activeTab === 'dare' ? dareColor : 'primary.main' }} />
      <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>VERDAD O RETO</Typography>
      <Box sx={{ minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
        <AnimatePresence mode="wait">
          <motion.div key={content} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Typography variant="body1" sx={{ fontStyle: 'italic', fontWeight: 700, px: 2 }}>{content}</Typography>
          </motion.div>
        </AnimatePresence>
      </Box>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button onClick={() => handlePick('truth')} sx={{ borderRadius: 8, px: 3, border: `2px solid ${truthColor}`, color: activeTab === 'truth' ? '#fff' : truthColor, bgcolor: activeTab === 'truth' ? truthColor : 'transparent' }}>Verdad</Button>
        <Button onClick={() => handlePick('dare')} sx={{ borderRadius: 8, px: 3, border: `2px solid ${dareColor}`, color: activeTab === 'dare' ? '#fff' : dareColor, bgcolor: activeTab === 'dare' ? dareColor : 'transparent' }}>Reto</Button>
      </Stack>
    </Card>
  );
}

function TimeBox({ label, v, mode }) {
  return (
    <Box sx={{ px: 2, py: 1.5, borderRadius: 4, textAlign: "center", border: "1px solid rgba(255,105,180,0.2)", background: mode === 'dark' ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.5)", backdropFilter: "blur(10px)", minWidth: 80 }}>
      <Typography variant="h4" sx={{ fontWeight: 900, color: "primary.main" }}>{String(v).padStart(2, "0")}</Typography>
      <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', opacity: 0.6 }}>{label}</Typography>
    </Box>
  )
}

function ScrollReveal({ children, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  );
}

function EmergencySupport({ mode, fireHearts }) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState({ text: "", icon: null });

  const frases = [
    { text: "Aunque no este contigo siempre estare en tu corazon", icon: "❤️" },
    { text: "Si te sientes mal yo estare para ti siempre", icon: "🫂" },
    { text: "Eres la mujer más fuerte que conozco asi que tu puedes", icon: "💪" },
    { text: "Eres mi princesa y nunca te voy a dejar sola", icon: "👑" },
    { text: "Eres la persona que mas amo en este planeta", icon: "🌎" }
  ];

  const handleOpen = () => { 
    const random = frases[Math.floor(Math.random() * frases.length)];
    setMsg(random); 
    setOpen(true); 
  };

  const handleReceiveHug = () => {
    if (fireHearts) fireHearts();
    setOpen(false);
  };

  return (
    <>
      <Zoom in={true}>
        <Fab color="primary" onClick={handleOpen} sx={{ position: 'fixed', bottom: 25, right: 25, zIndex: 2000, borderRadius: "16px", border: 'none' }}>
          <MedicalServicesRoundedIcon />
        </Fab>
      </Zoom>
      <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { borderRadius: 4, p: 1, textAlign: 'center', background: mode === 'dark' ? 'rgba(30, 30, 45, 0.98)' : '#fff', border: '2px solid #ff69b4', maxWidth: '350px' } }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h2" sx={{ mb: 1 }}>{msg.icon}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, color: 'primary.main' }}>RECUERDA QUE</Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', fontStyle: 'italic', mb: 3 }}>"{msg.text}"</Typography>
          <Button fullWidth variant="contained" startIcon={<FavoriteRoundedIcon />} onClick={handleReceiveHug} sx={{ borderRadius: 3, py: 1.5, fontWeight: 800, textTransform: 'none' }}>Te amo ❤️</Button>
        </Box>
      </Dialog>
    </>
  );
}