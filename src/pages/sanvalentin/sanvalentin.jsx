import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container, Stack, Divider, Dialog, DialogContent, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Favorite, Terminal, RestartAlt, ChatBubbleOutline, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// --- SUB-COMPONENTE: LLUVIA DIGITAL DE AMOR ---
const DigitalRain = () => (
  <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.15 }}>
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: -100 }}
        animate={{ y: '100vh' }}
        transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
        style={{
          position: 'absolute',
          left: `${i * 5}%`,
          color: '#ff4081',
          fontFamily: 'monospace',
          fontSize: '12px',
          writingMode: 'vertical-rl'
        }}
      >
        {Math.random() > 0.5 ? "LOVE" : "1010"}{" "}❤️{" "}{Math.random() > 0.5 ? "DIANA" : "VALENTINE"}
      </motion.div>
    ))}
  </Box>
);

export default function SanValentin({ mode }) {
  const nav = useNavigate();
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusText, setStatusText] = useState("ESPERANDO RESPUESTA DE MI AMORCITO...");
  const [openModal, setOpenModal] = useState(false); // Estado para el modal

  // Pantalla de carga romántica (3 segundos)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const moveNo = () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 300 - 150;
    setNoPos({ x, y });
    setStatusText("ERROR: ESTA ACCION NO ESTA PERMITIDA PARA TI");
  };

  const handleMouseEnterSi = () => setStatusText("ESTADO: DECISIÓN CORRECTA DETECTADA");

  // --- RENDER DE CARGA ROMÁNTICA ---
  if (loading) {
    return (
      <Box sx={{ 
        height: "100vh", 
        display: "flex", 
        flexDirection: 'column', 
        alignItems: "center", 
        justifyContent: "center", 
        bgcolor: mode === "dark" ? "#0a0508" : "#fff5f7" 
      }}>
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            filter: ["drop-shadow(0 0 5px #ff4081)", "drop-shadow(0 0 20px #ff4081)", "drop-shadow(0 0 5px #ff4081)"]
          }} 
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
        >
          <Favorite sx={{ color: "#ff4081", fontSize: 80 }} />
        </motion.div>

        <Stack spacing={1} sx={{ mt: 4, alignItems: 'center' }}>
          <Typography sx={{ color: "#ff4081", fontWeight: 900, letterSpacing: 3, fontSize: '0.8rem', textTransform: 'uppercase' }}>
            Estableciendo conexión con Diana...
          </Typography>
          
          <Box sx={{ width: '250px', height: '4px', bgcolor: 'rgba(255,64,129,0.1)', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
            <motion.div 
              initial={{ x: "-100%" }} 
              animate={{ x: "100%" }} 
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              style={{ 
                width: '60%', 
                height: '100%', 
                background: "linear-gradient(90deg, transparent, #ff4081, transparent)",
                position: 'absolute' 
              }} 
            />
          </Box>

          <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <Typography sx={{ fontSize: '0.65rem', color: mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", fontFamily: 'monospace' }}>
              ANALIZANDO SENTIMIENTOS // COMPATIBILIDAD: 100%
            </Typography>
          </motion.div>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', bgcolor: mode === "dark" ? "#0a0508" : "#fff5f7" }}>
      <DigitalRain />

      <AnimatePresence mode="wait">
        {!accepted ? (
          <Container maxWidth="md" key="question">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            >
              <Box sx={{
                position: 'relative',
                p: { xs: 4, md: 8 },
                borderRadius: 0,
                border: "1px solid rgba(255, 64, 129, 0.4)",
                background: mode === "dark" ? "rgba(10, 2, 6, 0.95)" : "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                textAlign: "center",
                boxShadow: mode === "dark" ? "0 0 80px rgba(255, 64, 129, 0.2)" : "0 20px 50px rgba(255, 64, 129, 0.1)",
              }}>
                {/* LÍNEA DE ESCANEO */}
                <motion.div
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: 'absolute', left: 0, width: '100%', height: '2px',
                    background: 'linear-gradient(90deg, transparent, #ff4081, transparent)',
                    zIndex: 10, opacity: 0.5
                  }}
                />

                <Box sx={{ position: 'absolute', top: -2, left: -2, width: 60, height: 60, borderTop: '4px solid #ff4081', borderLeft: '4px solid #ff4081' }} />
                <Box sx={{ position: 'absolute', bottom: -2, right: -2, width: 60, height: 60, borderBottom: '4px solid #ff4081', borderRight: '4px solid #ff4081' }} />

                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Terminal sx={{ fontSize: 18, color: "#ff4081" }} />
                      <Typography variant="caption" sx={{ color: "#ff4081", fontWeight: 900, letterSpacing: 2 }}>
                        SISTEMA_DE_VOTO_DIANA
                      </Typography>
                    </Stack>
                    <Typography variant="caption" sx={{ opacity: 0.5, fontFamily: 'monospace' }}>
                      ID: DIANA_USER
                    </Typography>
                  </Box>

                  <Divider sx={{ borderColor: 'rgba(255,64,129,0.2)' }} />

                  <Typography variant="h2" sx={{ 
                    fontWeight: 950, 
                    fontSize: { xs: '2.8rem', md: '5rem' },
                    letterSpacing: -2,
                    lineHeight: 1,
                    textTransform: 'uppercase',
                    color: mode === 'dark' ? '#fff' : '#000',
                  }}>
                    ¿Quieres ser mi <br/>
                    <Box component="span" sx={{ color: '#ff4081' }}>San Valentín?</Box>
                  </Typography>

                  <Box sx={{ bgcolor: 'rgba(255,64,129,0.05)', p: 1, border: '1px dashed rgba(255,64,129,0.3)' }}>
                    <Typography variant="caption" sx={{ color: "#ff4081", fontWeight: 800, fontFamily: 'monospace' }}>
                      {statusText}
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    display: "flex", 
                    flexDirection: { xs: 'column', sm: 'row' }, 
                    gap: 4, 
                    justifyContent: "center", 
                    alignItems: "center",
                    mt: 4
                  }}>
                    <Button
                      component={motion.button}
                      whileHover={{ scale: 1.1, boxShadow: "0 0 40px #4caf50" }}
                      whileTap={{ scale: 0.9 }}
                      variant="contained"
                      onMouseEnter={handleMouseEnterSi}
                      onClick={() => setAccepted(true)}
                      sx={{
                        borderRadius: 0, py: 2, px: 10, fontWeight: 950,
                        bgcolor: "#ff4081", fontSize: "1.5rem",
                        "&:hover": { bgcolor: "#4caf50" }
                      }}
                    >
                      SÍ, ACEPTO
                    </Button>

                    <motion.div
                      animate={{ x: noPos.x, y: noPos.y }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <Button
                        variant="outlined"
                        onMouseEnter={moveNo}
                        sx={{
                          borderRadius: 0, py: 2, px: 6, fontWeight: 950,
                          color: "#ff4081", border: "2px solid #ff4081",
                          fontSize: "1.2rem", opacity: 0.8,
                        }}
                      >
                        NO
                      </Button>
                    </motion.div>
                  </Box>
                </Stack>
              </Box>
            </motion.div>
          </Container>
        ) : (
          <Container maxWidth="md" key="accepted" sx={{ textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '200px', height: '200px', backgroundColor: '#ff4081', borderRadius: '50%', filter: 'blur(60px)', zIndex: -1
                  }}
                />
                <Favorite sx={{ fontSize: 120, color: "#ff4081", filter: "drop-shadow(0 0 20px #ff4081)" }} />
              </Box>
              
              <Typography variant="h1" sx={{ 
                fontWeight: 950, mt: 4,
                fontSize: { xs: '3.5rem', md: '7rem' },
                color: mode === 'dark' ? '#fff' : '#000', textShadow: mode === 'dark' ? '0 0 30px #ff4081' : 'none'
              }}>
                ¡ES OFICIAL!
              </Typography>
              
              <Typography variant="h4" sx={{ fontWeight: 300, color: '#ff4081', textTransform: 'uppercase', letterSpacing: 4, mb: 6 }}>
                Diana & Eithan <br/>
                <Box component="span" sx={{ fontWeight: 900 }}>Juntos este 15 de Febrero</Box>
              </Typography>

              <Stack direction="column" spacing={2} alignItems="center">
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => nav("/")}
                  startIcon={<RestartAlt />}
                  sx={{
                    borderRadius: 0, py: 1.5, px: 4,
                    border: "1px solid rgba(255, 64, 129, 0.5)",
                    color: "#ff4081", fontWeight: 900, letterSpacing: 2,
                    bgcolor: "transparent",
                    "&:hover": { border: "1px solid #ff4081", bgcolor: "rgba(255, 64, 129, 0.05)" }
                  }}
                >
                  REGRESAR AL INICIO
                </Button>

                {/* BOTÓN PARA ABRIR EL MODAL */}
                <Button 
                  startIcon={<ChatBubbleOutline />} 
                  onClick={() => setOpenModal(true)} 
                  sx={{ 
                    color: "rgba(255, 64, 129, 0.6)", 
                    fontSize: '0.75rem', 
                    fontFamily: 'monospace', 
                    textTransform: 'none', 
                    "&:hover": { color: "#ff4081", bgcolor: 'transparent' } 
                  }}
                >
                  [ LEER_NOTA ]
                </Button>
              </Stack>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 1 }}
                style={{ height: '1px', backgroundColor: 'rgba(255, 64, 129, 0.3)', marginTop: '40px' }}
              />
              <Typography sx={{ mt: 2, opacity: 0.4, fontFamily: 'monospace', fontSize: '0.7rem' }}>
                SESSION_SUCCESSFUL // REDIRECT_READY
              </Typography>
            </motion.div>
          </Container>
        )}
      </AnimatePresence>

      {/* --- MODAL DE AGRADECIMIENTO (DIALOG) --- */}
      <Dialog 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
        PaperProps={{ 
          sx: { 
            borderRadius: 0, 
            bgcolor: mode === 'dark' ? '#0a0508' : '#fff', 
            border: '2px solid #ff4081', 
            minWidth: '320px', 
            position: 'relative', 
            overflow: 'visible',
            boxShadow: "0 0 50px rgba(255, 64, 129, 0.3)"
          } 
        }}
      >
        <IconButton 
          onClick={() => setOpenModal(false)} 
          sx={{ position: 'absolute', right: -15, top: -15, bgcolor: '#ff4081', color: 'white', '&:hover': { bgcolor: '#e91e63' }, boxShadow: 3 }}
        >
          <Close fontSize="small" />
        </IconButton>
        <DialogContent sx={{ p: 4, textAlign: 'center' }}>
          <Stack spacing={2} alignItems="center">
            <Favorite sx={{ color: '#ff4081', fontSize: 40 }} />
            <Typography sx={{ fontFamily: 'monospace', fontWeight: 900, color: '#ff4081', letterSpacing: 1 }}>
              MENSAJE DE TU NOVIECITO:
            </Typography>
            <Typography sx={{ color: mode === 'dark' ? '#fff' : '#000', fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.4 }}>
              “Gracias por aceptar ser mi San Valentín, amor. Este va a ser el primero de muchos que pasaremos juntos, cielo. Ya quiero que el día llegue.”
            </Typography>
            <Divider sx={{ width: '100%', borderColor: 'rgba(255,64,129,0.2)' }} />
            <Typography variant="caption" sx={{ opacity: 0.5, fontFamily: 'monospace' }}>
              STATUS: COMPLETAMENTE_ENAMORADO
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}