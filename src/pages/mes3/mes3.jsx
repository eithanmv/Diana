import { useState, useEffect } from "react";
import {
    Box, Typography, Container, Stack, Paper, IconButton, Button,
    Avatar, LinearProgress, Card, Grid, Modal, Fade, Backdrop, TextField
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowBackIosNewRounded, DarkModeRounded, LightModeRounded,
    StarsRounded, RocketLaunchRounded, LockRounded, PlayArrowRounded,
    TerminalRounded, ConfirmationNumberRounded, MailRounded,
    ChairRounded, MyLocationRounded, CloseRounded,
    SecurityUpdateGoodRounded, WarningAmberRounded, FingerprintRounded,
    VpnKeyRounded, ShieldMoonRounded
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Mes3({ mode, toggleMode }) {
    const navigate = useNavigate();

    // --- ESTADOS DE ACCESO (EL JUEGO) ---
    const [accesoConcedido, setAccesoConcedido] = useState(false);
    const [paso, setPaso] = useState(1);
    const [nombre, setNombre] = useState("");
    const [respuestaMemoria, setRespuestaMemoria] = useState("");
    const [errorAcceso, setErrorAcceso] = useState(false);

    // --- ESTADOS DE LA PÁGINA ---
    const [elapsed, setElapsed] = useState({ d: 0, h: 0, m: 0, s: 0 });
    const [revelado, setRevelado] = useState(false);
    const [openCard, setOpenCard] = useState(false);
    const [mensajeJuego, setMensajeJuego] = useState("¿Dónde perdimos la carta, Amor?");
    const [escaneando, setEscaneando] = useState(false);
    const [progresoEscaneo, setProgresoEscaneo] = useState(0);
    const [resultadoRadar, setResultadoRadar] = useState(false);
    const [probabilidadReal, setProbabilidadReal] = useState(false);

    const colorPrincipal = "#7c4dff";

    const cancionesSemana = [
        { dia: 1, titulo: "Quiero Ver", artista: "Café Tacvba", ytId: "I41Aa6jynUk" },
        { dia: 2, titulo: "Preso", artista: "José José", ytId: "Q7IVjcgfYRg" },
        { dia: 3, titulo: "Más Allá", artista: "Manuel Medrano", ytId: "SSkvxsn3zjo" },
        { dia: 4, titulo: "Química Mayor", artista: "Mon Laferte", ytId: "e23BTGIJcq8" },
        { dia: 5, titulo: "Jósean Log", artista: "Beso", ytId: "ntdwWKaGaPQ" },
        { dia: 6, titulo: "Intensos ", artista: "Manuel Medrano & Duplat", ytId: "QzOL3G7BkYw" },
        { dia: 7, titulo: "Cirugía ", artista: "DILLOM ", ytId: "WsvYPRqSH28" },
    ];

    const fechaDesbloqueo = new Date("2026-02-28T00:00:00");
    const hoy = new Date();

    let diaActualRelativo = 0;

    if (hoy >= fechaDesbloqueo) {
        const diff = hoy.getTime() - fechaDesbloqueo.getTime();
        diaActualRelativo = Math.floor(diff / 86400000) + 1;
    }

    if (diaActualRelativo > 7) diaActualRelativo = 7;
    const [cancionSeleccionada, setCancionSeleccionada] = useState(cancionesSemana[0]);

    useEffect(() => {
        const fechaContador = new Date("2025-11-30T00:00:00");

        const t = setInterval(() => {
            const ahora = new Date();
            const diff = ahora.getTime() - fechaContador.getTime();

            const dias = Math.floor(diff / 86400000);
            const horas = Math.floor((diff % 86400000) / 3600000);
            const minutos = Math.floor((diff % 3600000) / 60000);
            const segundos = Math.floor((diff % 60000) / 1000);

            setElapsed({
                d: dias < 0 ? 0 : dias,
                h: horas < 0 ? 0 : horas,
                m: minutos < 0 ? 0 : minutos,
                s: segundos < 0 ? 0 : segundos
            });

        }, 1000);

        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        const hoy = cancionesSemana.find(c => c.dia === diaActualRelativo);
        if (hoy) setCancionSeleccionada(hoy);
    }, [diaActualRelativo]);

    // --- LÓGICA DEL JUEGO DE BLOQUEO ---
    const verificarNombre = () => {
        if (nombre.toLowerCase().trim() === "hayler") {
            setPaso(2);
        } else {
            setErrorAcceso(true);
            setTimeout(() => setErrorAcceso(false), 2000);
        }
    };

    const verificarMemoria = () => {
        // CAMBIA AQUÍ LA RESPUESTA: He puesto 'cine' como ejemplo
        if (respuestaMemoria.toLowerCase().trim() === "negro") {
            setAccesoConcedido(true);
        } else {
            setErrorAcceso(true);
            setTimeout(() => setErrorAcceso(false), 2000);
        }
    };

    const intentarEncontrar = (fila) => {
        if (fila === 2) {
            setRevelado(true);
            setMensajeJuego("Aqui esta la carta que perdimos amorcito hermoso.");
        } else {
            setMensajeJuego("Aqui ño hay nada mi amorcito hermoso, sigue buscando.");
        }
    };

    const iniciarEscaneo = () => {
        setEscaneando(true);
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 12;
            if (p >= 100) {
                setProgresoEscaneo(100);
                setProbabilidadReal(true);
                setTimeout(() => {
                    setResultadoRadar(true);
                    setEscaneando(false);
                }, 4000);
                clearInterval(interval);
            } else {
                setProgresoEscaneo(p);
            }
        }, 200);
    };

    // --- COMPONENTE DE BLOQUEO (EL JUEGO) ---
    if (!accesoConcedido) {
        return (
            <Box sx={{
                minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
                bgcolor: mode === 'dark' ? '#08080a' : '#f4f4f9', p: 3,
                backgroundImage: mode === 'dark'
                    ? `radial-gradient(circle at 20% 30%, ${colorPrincipal}15 0%, transparent 40%), 
             radial-gradient(circle at 80% 70%, ${colorPrincipal}10 0%, transparent 40%)`
                    : 'none'
            }}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper elevation={0} sx={{
                        p: { xs: 4, md: 6 }, borderRadius: 10, textAlign: 'center', maxWidth: 450,
                        position: 'relative',
                        overflow: 'hidden',
                        border: `1px solid ${colorPrincipal}44`,
                        bgcolor: mode === 'dark' ? 'rgba(15, 15, 20, 0.9)' : 'white',
                        backdropFilter: 'blur(20px)',
                        boxShadow: mode === 'dark' ? `0 20px 50px rgba(0,0,0,0.5), 0 0 20px ${colorPrincipal}22` : `0 20px 40px rgba(0,0,0,0.1)`
                    }}>
                        {/* Decoración superior */}
                        <Box sx={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '4px',
                            background: `linear-gradient(90deg, transparent, ${colorPrincipal}, transparent)`
                        }} />

                        <AnimatePresence mode="wait">
                            {paso === 1 ? (
                                <motion.div
                                    key="p1"
                                    initial={{ x: 30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -30, opacity: 0 }}
                                >
                                    <Box sx={{ mb: 3, position: 'relative', display: 'inline-block' }}>
                                        <motion.div
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <ShieldMoonRounded sx={{ fontSize: 60, color: colorPrincipal }} />
                                        </motion.div>
                                    </Box>

                                    <Typography variant="h4" sx={{ fontWeight: 1000, mb: 1, letterSpacing: -1, color: mode === 'dark' ? 'white' : 'black' }}>
                                        PROTOCOL <span style={{ color: colorPrincipal }}>3.0</span>
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.6, mb: 4, fontWeight: 500 }}>
                                        Identificación requerida para acceso al servidor de recuerdos.
                                    </Typography>

                                    <Stack spacing={2}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Nombre del novio..."
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            error={errorAcceso}
                                            autoComplete="off"
                                            InputProps={{
                                                startAdornment: <FingerprintRounded sx={{ mr: 1, opacity: 0.5 }} />,
                                                sx: { borderRadius: 4, fontWeight: 600, bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }
                                            }}
                                        />
                                        <Button
                                            fullWidth
                                            onClick={verificarNombre}
                                            variant="contained"
                                            sx={{
                                                bgcolor: colorPrincipal, borderRadius: 4, py: 2, fontWeight: 900,
                                                boxShadow: `0 8px 20px ${colorPrincipal}44`,
                                                '&:hover': { bgcolor: colorPrincipal, transform: 'translateY(-2px)' },
                                                transition: 'all 0.3s'
                                            }}
                                        >
                                            VERIFICAR IDENTIDAD
                                        </Button>
                                    </Stack>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="p2"
                                    initial={{ x: 30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -30, opacity: 0 }}
                                >
                                    <VpnKeyRounded sx={{ color: colorPrincipal, fontSize: 50, mb: 2 }} />
                                    <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>RETO DE MEMORIA</Typography>
                                    <Typography variant="body1" sx={{ opacity: 0.8, mb: 4, fontStyle: 'italic' }}>
                                        "¿De qué color era la ropa que llevaba el dia que nos conocimos?"
                                    </Typography>

                                    <Stack spacing={2}>
                                        <TextField
                                            fullWidth
                                            placeholder="Escribe la respuesta..."
                                            value={respuestaMemoria}
                                            onChange={(e) => setRespuestaMemoria(e.target.value)}
                                            error={errorAcceso}
                                            InputProps={{
                                                sx: { borderRadius: 4, textAlign: 'center', fontWeight: 600 }
                                            }}
                                        />
                                        <Button
                                            fullWidth variant="contained"
                                            onClick={verificarMemoria}
                                            sx={{
                                                bgcolor: colorPrincipal, borderRadius: 4, py: 2, fontWeight: 900,
                                                boxShadow: `0 8px 20px ${colorPrincipal}44`
                                            }}
                                        >
                                            CONFIRMAR ACCESO
                                        </Button>
                                        <Button
                                            variant="text"
                                            size="small"
                                            onClick={() => setPaso(1)}
                                            sx={{ opacity: 0.5, color: mode === 'dark' ? 'white' : 'black', fontWeight: 700 }}
                                        >
                                            Cancelar e ir atrás
                                        </Button>
                                    </Stack>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {errorAcceso && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <Typography variant="caption" sx={{ color: '#ff5252', display: 'block', mt: 2, fontWeight: 900 }}>
                                    ACCESO DENEGADO: Datos incorrectas.
                                </Typography>
                            </motion.div>
                        )}
                    </Paper>
                </motion.div>
            </Box>
        );
    }

    // --- PÁGINA PRINCIPAL ---
    return (
        <Box sx={{ minHeight: '100vh', position: 'relative', pb: 10 }}>
            <Container maxWidth="sm">
                {/* HEADER */}
                <Box sx={{ position: "fixed", top: 16, left: 16, right: 16, zIndex: 1000, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        onClick={() => navigate("/")}
                        startIcon={<ArrowBackIosNewRounded />}
                        sx={{ borderRadius: 4, px: 2, color: mode === "dark" ? "white" : colorPrincipal, bgcolor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)", border: `1px solid ${colorPrincipal}44` }}
                    >
                        Atrás
                    </Button>
                    <IconButton onClick={toggleMode} sx={{ bgcolor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)", border: `1px solid ${colorPrincipal}44` }}>
                        {mode === "dark" ? <LightModeRounded sx={{ color: '#ffeb3b' }} /> : <DarkModeRounded sx={{ color: colorPrincipal }} />}
                    </IconButton>
                </Box>

                <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", py: 10 }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <Stack spacing={4} alignItems="center">

                            {/* TÍTULO */}
                            <Box sx={{
                                textAlign: 'center',
                                position: 'relative',
                                py: 6,
                                perspective: '1000px'
                            }}>
                                {/* RESPLANDOR AMBIENTAL BASADO EN LA PALETA */}
                                <Box sx={{
                                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                    width: { xs: 300, md: 500 }, height: 300,
                                    background: `radial-gradient(circle, ${colorPrincipal}25 0%, transparent 70%)`,
                                    filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none'
                                }} />

                                {/* ICONO CON GIRO Y FLOTACIÓN CONSTANTE */}
                                <Box sx={{ position: 'relative', display: 'inline-block', zIndex: 1, mb: 3 }}>
                                    <motion.div
                                        animate={{
                                            y: [0, -15, 0],
                                            rotate: [0, 360]
                                        }}
                                        transition={{
                                            y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                                            rotate: { repeat: Infinity, duration: 25, ease: "linear" }
                                        }}
                                    >
                                        <Avatar sx={{
                                            width: { xs: 110, md: 140 }, height: { xs: 110, md: 140 },
                                            bgcolor: mode === 'dark' ? 'rgba(15, 15, 20, 0.8)' : 'white',
                                            mx: 'auto',
                                            backdropFilter: 'blur(10px)',
                                            border: `2px solid ${colorPrincipal}`,
                                            boxShadow: mode === 'dark'
                                                ? `0 0 40px ${colorPrincipal}55`
                                                : `0 20px 40px ${colorPrincipal}33`,
                                        }}>
                                            <StarsRounded sx={{
                                                fontSize: { xs: 65, md: 90 },
                                                color: colorPrincipal,
                                                filter: `drop-shadow(0 0 10px ${colorPrincipal}aa)`
                                            }} />
                                        </Avatar>
                                    </motion.div>
                                </Box>

                                {/* TÍTULO CON DEGRADADO QUE COMBINA CON COLORPRINCIPAL */}
                                <Box sx={{ position: 'relative', zIndex: 1 }}>
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontWeight: 1000,
                                            fontSize: { xs: '3.8rem', md: '6rem' },
                                            lineHeight: 0.9,
                                            letterSpacing: -4,
                                            textTransform: 'uppercase',
                                            // El degradado ahora usa tu colorPrincipal como base de la animación
                                            background: mode === 'dark'
                                                ? `linear-gradient(90deg, #fff 15%, ${colorPrincipal} 40%, #fff 55%, ${colorPrincipal} 70%, #fff 85%)`
                                                : `linear-gradient(90deg, ${colorPrincipal} 15%, #fff 40%, ${colorPrincipal} 55%, #fff 70%, ${colorPrincipal} 85%)`,
                                            backgroundSize: '200% auto',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            animation: 'shineFlow 5s linear infinite',
                                            '@keyframes shineFlow': {
                                                '0%': { backgroundPosition: '200% center' },
                                                '100%': { backgroundPosition: '-200% center' },
                                            },
                                            filter: mode === 'dark' ? `drop-shadow(0 10px 20px ${colorPrincipal}33)` : 'none',
                                        }}
                                    >
                                        Mes Tres
                                    </Typography>

                                    {/* SUBTÍTULO ENCAPSULADO */}
                                    <Box sx={{
                                        display: 'inline-flex',
                                        mt: 2, px: 3, py: 0.6,
                                        borderRadius: '50px',
                                        border: `1.5px solid ${colorPrincipal}40`,
                                        background: `${colorPrincipal}08`,
                                        backdropFilter: 'blur(5px)'
                                    }}>
                                        <Typography variant="caption" sx={{
                                            fontWeight: 900,
                                            letterSpacing: 5,
                                            textTransform: 'uppercase',
                                            color: mode === 'dark' ? '#fff' : colorPrincipal,
                                            fontSize: '0.75rem',
                                            opacity: 0.9
                                        }}>
                                            Capítulo Tres
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* CONTADOR */}
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 6, width: '100%', background: mode === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(20px)", border: `1px solid ${colorPrincipal}33` }}>
                                <Stack direction="row" spacing={2} justifyContent="center">
                                    <TimeItem value={elapsed.d} label="Días" color={colorPrincipal} mode={mode} />
                                    <TimeItem value={elapsed.h} label="Hrs" color={colorPrincipal} mode={mode} />
                                    <TimeItem value={elapsed.m} label="Min" color={colorPrincipal} mode={mode} />
                                    <TimeItem value={elapsed.s} label="Seg" color={colorPrincipal} mode={mode} />
                                </Stack>
                            </Paper>

                            {/* RADAR ESTADÍSTICO */}
                            <Card sx={{ p: 3, width: '100%', borderRadius: 6, bgcolor: mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.9)', border: `2px solid ${colorPrincipal}44`, textAlign: 'center', overflow: 'hidden' }}>
                                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 1 }}>
                                    <MyLocationRounded sx={{ color: colorPrincipal, fontSize: 18 }} />
                                    <Typography variant="caption" sx={{ fontWeight: 900, color: colorPrincipal, letterSpacing: 1 }}>GT_POB: 17,312,000 HAB.</Typography>
                                </Stack>
                                <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 2 }}>Analizador Probabilístico</Typography>
                                {!resultadoRadar ? (
                                    <Box>
                                        {probabilidadReal ? (
                                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                                <WarningAmberRounded sx={{ color: '#ff9800', fontSize: 30, mb: 1 }} />
                                                <Typography variant="caption" sx={{ display: 'block', fontWeight: 900, opacity: 0.6, mb: 0.5 }}>PROBABILIDAD MATEMÁTICA:</Typography>
                                                <Typography variant="h4" sx={{ fontWeight: 1000, color: '#ff5252', letterSpacing: -1 }}>0.00000000000069%</Typography>
                                                <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', px: 2 }}>"Tan poca probababilidad y nos cruzamos de la manera mas rara posible."</Typography>
                                            </motion.div>
                                        ) : (
                                            <>
                                                <Stack spacing={0.5} sx={{ mb: 2, textAlign: 'left' }}>
                                                    <Typography variant="caption" sx={{ fontFamily: 'monospace', opacity: 0.7 }}>{escaneando ? `> Filtrando 17.3M de habitantes...` : `> Sistema listo...`}</Typography>
                                                    <Typography variant="caption" sx={{ fontFamily: 'monospace', opacity: 0.7 }}>{escaneando ? `> Buscando conexión Diana <-> Eithan...` : `> Ubicación: Guatemala`}</Typography>
                                                </Stack>
                                                <Box sx={{ position: 'relative', mb: 2 }}>
                                                    <LinearProgress variant="determinate" value={progresoEscaneo} sx={{ height: 10, borderRadius: 5, bgcolor: `${colorPrincipal}22`, '& .MuiLinearProgress-bar': { bgcolor: colorPrincipal } }} />
                                                </Box>
                                                <Button variant="contained" onClick={iniciarEscaneo} disabled={escaneando} sx={{ bgcolor: colorPrincipal, borderRadius: 3, fontWeight: 900 }}>{escaneando ? "CALCULANDO..." : "CALCULAR PROBABILIDAD"}</Button>
                                            </>
                                        )}
                                    </Box>
                                ) : (
                                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                        <Typography variant="h3" sx={{ fontWeight: 1000, color: colorPrincipal }}>100.00%</Typography>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>DE COMPATIBILIDAD </Typography>
                                        <Typography variant="body2" sx={{ fontStyle: 'italic', opacity: 0.8 }}>"Estabamos sin buscarnos pero sabiendo que estabamos para encontrarnos"</Typography>
                                    </motion.div>
                                )}
                            </Card>

                            {/* JUEGO DEL CINE */}
                            <Paper sx={{ p: 3, width: '100%', borderRadius: 6, bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `2px dashed ${colorPrincipal}66`, textAlign: 'center' }}>
                                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
                                    <ConfirmationNumberRounded sx={{ color: colorPrincipal }} />
                                    <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>Misión: Encontrar la carta del cine.</Typography>
                                </Stack>
                                <Typography variant="body2" sx={{ mb: 3, fontWeight: 600 }}>{mensajeJuego}</Typography>
                                <Grid container spacing={2} justifyContent="center">
                                    {[1, 2, 3].map((fila) => (
                                        <Grid item xs={4} key={fila}>
                                            <Button fullWidth variant="outlined" onClick={() => intentarEncontrar(fila)} disabled={revelado} sx={{ py: 2, borderRadius: 3, borderWidth: 2, borderColor: colorPrincipal, color: colorPrincipal }}>
                                                <Stack alignItems="center"><ChairRounded /><Typography variant="caption" sx={{ fontWeight: 900 }}>Fila {fila}</Typography></Stack>
                                            </Button>
                                        </Grid>
                                    ))}
                                </Grid>
                                <AnimatePresence>
                                    {revelado && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '24px' }}>
                                            <Card sx={{ p: 2, bgcolor: colorPrincipal, color: 'white', borderRadius: 4 }}>
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <MailRounded sx={{ fontSize: 40 }} />
                                                    <Typography variant="body2" sx={{ fontWeight: 700, textAlign: 'left' }}>"Tal vez perdimos esa carta cielo, aunque ya la leiste quiero que sepas que nada es suficiente para expresar todo lo que siento por ti."</Typography>
                                                </Stack>
                                            </Card>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Paper>

                            {/* SECCIÓN LEVEL 3 (ARREGLADA) */}
                            <Box sx={{ width: '100%', position: 'relative', mt: 3 }}>
                                <Box sx={{
                                    position: 'absolute', top: -12, right: 24, zIndex: 5,
                                    bgcolor: colorPrincipal, color: 'white', px: 2, py: 0.5, borderRadius: 2,
                                    fontWeight: 900, fontSize: '0.75rem', boxShadow: `0 4px 12px ${colorPrincipal}66`
                                }}>
                                    LEVEL Ꝏ
                                </Box>
                                <Card sx={{
                                    p: 4, width: '100%', borderRadius: 6, borderLeft: `10px solid ${colorPrincipal}`,
                                    bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
                                    backdropFilter: 'blur(10px)', border: mode === 'dark' ? `1px solid ${colorPrincipal}22` : 'none'
                                }}>
                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                        <RocketLaunchRounded sx={{ color: colorPrincipal, fontSize: 35 }} />
                                        <Typography variant="h5" sx={{ fontWeight: 900 }}>Nivel: Infinito</Typography>
                                    </Stack>
                                    <Typography variant="body1" sx={{ opacity: 0.8, lineHeight: 1.8, fontWeight: 500 }}>Mi amor por ti es tan grande que si lo comparamos con el universo, él sería finito.</Typography>
                                </Card>
                            </Box>

                            {/* BOTÓN TARJETA ESPECIAL */}
                            <Button variant="contained" fullWidth onClick={() => setOpenCard(true)} startIcon={<SecurityUpdateGoodRounded />} sx={{ py: 2, borderRadius: 5, bgcolor: mode === 'dark' ? 'rgba(124, 77, 255, 0.1)' : 'white', border: `2px solid ${colorPrincipal}`, color: mode === 'dark' ? 'white' : colorPrincipal, fontWeight: 900, boxShadow: `0 10px 25px ${colorPrincipal}33`, '&:hover': { bgcolor: colorPrincipal, color: 'white' } }}>
                                ABRIR CARTA
                            </Button>

                            {/* TRANSMISIÓN */}
                            <Paper sx={{ p: 2, width: '100%', borderRadius: 4, bgcolor: mode === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(124, 77, 255, 0.05)", border: `1px solid ${colorPrincipal}44` }}>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                    <TerminalRounded sx={{ color: colorPrincipal, fontSize: 18 }} />
                                    <Typography variant="caption" sx={{ color: colorPrincipal, fontFamily: 'monospace', fontWeight: 700 }}>COMMS_3.0</Typography>
                                </Stack>
                                <TypewriterText text="Amor, eres esa princesa de cuento de adas que cualquier hombre quisiera tener, la mas hermosa, talentosa y fuerte del mundo, gracias por hacerme parte de ti." color={colorPrincipal} />
                            </Paper>

                            {/* BLOQUE SIMÉTRICO: BITÁCORA + REPRODUCTOR */}
                            <Paper elevation={0} sx={{
                                width: '100%', mt: 2, overflow: 'hidden', borderRadius: 4,
                                border: `2px solid ${colorPrincipal}44`,
                                bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.01)' : 'white'
                            }}>
                                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ p: 2, borderBottom: `1px solid ${colorPrincipal}22` }}>
                                    <Avatar sx={{ bgcolor: colorPrincipal, width: 32, height: 32 }}><TerminalRounded sx={{ fontSize: 18 }} /></Avatar>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 1000, color: colorPrincipal, textTransform: 'uppercase', letterSpacing: 1.5 }}>Dedicatoria Semanal</Typography>
                                </Stack>

                                <Stack spacing={0} sx={{ bgcolor: mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.01)' }}>
                                    {cancionesSemana.map((cancion) => {
                                        const bloqueada = cancion.dia > diaActualRelativo;
                                        const seleccionada = cancionSeleccionada.ytId === cancion.ytId;
                                        return (
                                            <Button
                                                key={cancion.dia}
                                                fullWidth disabled={bloqueada}
                                                onClick={() => setCancionSeleccionada(cancion)}
                                                sx={{
                                                    p: 2, borderRadius: 0, justifyContent: 'flex-start',
                                                    borderBottom: `1px solid ${colorPrincipal}11`,
                                                    bgcolor: seleccionada ? `${colorPrincipal}15` : 'transparent',
                                                    '&:hover': { bgcolor: bloqueada ? 'transparent' : `${colorPrincipal}11` }
                                                }}
                                            >
                                                <Stack direction="row" spacing={2.5} alignItems="center" sx={{ width: '100%' }}>
                                                    <Avatar sx={{ width: 30, height: 30, bgcolor: bloqueada ? 'grey.400' : (seleccionada ? 'white' : colorPrincipal), color: seleccionada ? colorPrincipal : 'white', fontSize: '0.75rem', fontWeight: 900, border: seleccionada ? `2px solid ${colorPrincipal}` : 'none' }}>
                                                        {bloqueada ? <LockRounded sx={{ fontSize: 14 }} /> : cancion.dia}
                                                    </Avatar>
                                                    <Box sx={{ textAlign: 'left', flex: 1 }}>
                                                        <Typography variant="body2" sx={{ fontWeight: 800, color: bloqueada ? 'text.disabled' : (mode === 'dark' ? 'white' : 'black'), lineHeight: 1.1 }}>
                                                            {bloqueada ? "Encriptado" : cancion.titulo}
                                                        </Typography>
                                                        <Typography variant="caption" sx={{ color: colorPrincipal, fontWeight: 700, opacity: bloqueada ? 0.5 : 1 }}>
                                                            {bloqueada ? `T - ${24 - elapsed.h}h` : cancion.artista}
                                                        </Typography>
                                                    </Box>
                                                    {!bloqueada && (
                                                        <motion.div animate={{ opacity: seleccionada ? 1 : 0.3, scale: seleccionada ? [1, 1.1, 1] : 1 }} transition={{ repeat: seleccionada ? Infinity : 0, duration: 2 }}>
                                                            <PlayArrowRounded sx={{ color: colorPrincipal, fontSize: 18 }} />
                                                        </motion.div>
                                                    )}
                                                </Stack>
                                            </Button>
                                        );
                                    })}
                                </Stack>

                                <Box sx={{ width: '100%', bgcolor: 'black', position: 'relative', pt: '56.25%' }}>
                                    <iframe
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                                        src={`https://www.youtube.com/embed/${cancionSeleccionada.ytId}?rel=0&modestbranding=1&controls=1`}
                                        title="Diana Simphony"
                                        allowFullScreen
                                    />
                                </Box>
                                <Box sx={{ p: 1.5, textAlign: 'center', bgcolor: colorPrincipal, color: 'white' }}>
                                    <Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: 2 }}>DIANA & EITHAN</Typography>
                                </Box>
                            </Paper>

                            {/* PROGRESO FINAL */}
                            <Box sx={{ width: '100%', px: 2, pt: 1 }}>
                                <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 900, color: colorPrincipal, textAlign: 'right' }}>CONEXIÓN: 100%</Typography>
                                <LinearProgress variant="determinate" value={100} sx={{ height: 12, borderRadius: 6, bgcolor: `${colorPrincipal}22`, '& .MuiLinearProgress-bar': { bgcolor: colorPrincipal, borderRadius: 6 } }} />
                            </Box>

                        </Stack>
                    </motion.div>
                </Box>
            </Container>

            {/* MODAL DE LA CARTA */}
            <Modal open={openCard} onClose={() => setOpenCard(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, sx: { backdropFilter: 'blur(10px)', bgcolor: 'rgba(0,0,0,0.8)' } }}>
                <Fade in={openCard}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: 420 }}>
                        <Paper sx={{ p: 4, borderRadius: 8, textAlign: 'center', position: 'relative', border: `3px solid ${colorPrincipal}`, bgcolor: mode === 'dark' ? '#0a0a0a' : 'white' }}>
                            <IconButton onClick={() => setOpenCard(false)} sx={{ position: 'absolute', top: 15, right: 15, color: colorPrincipal }}><CloseRounded /></IconButton>
                            <Avatar sx={{ width: 70, height: 70, bgcolor: `${colorPrincipal}11`, mx: 'auto', mb: 3, border: `2px solid ${colorPrincipal}` }}><MailRounded sx={{ fontSize: 35, color: colorPrincipal }} /></Avatar>
                            <Typography variant="h5" sx={{ fontWeight: 950, color: colorPrincipal, mb: 2 }}>PARA MI AMORCITO</Typography>
                            <Typography variant="body1" sx={{ fontStyle: 'italic', lineHeight: 1.7, color: mode === 'dark' ? '#ccc' : '#444', mb: 3 }}>"Quiero que sepas que estos 3 meses a tu lado descubrí lo lindo que puede llegar a ser compartir vida con alguien tan especial como tú, me haces tan feliz que solo me salen palabras de agradecimiento a la vida por ponerte en mi camino, nunca te alejes de mí porque sin ti no soy nada. TE AMOOOOO"</Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 900, color: colorPrincipal, borderTop: `1px solid ${colorPrincipal}33`, pt: 2 }}>SIEMPRE ENAMORADO TUYO, EITHAN.</Typography>
                        </Paper>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}

function TimeItem({ value, label, color, mode }) {
    return (
        <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, color: color, textShadow: mode === 'dark' ? `0 0 10px ${color}66` : 'none' }}>{value}</Typography>
            <Typography variant="caption" sx={{ fontWeight: 800, opacity: 0.6, textTransform: 'uppercase', fontSize: '0.65rem' }}>{label}</Typography>
        </Box>
    );
}

function TypewriterText({ text, color }) {
    const [displayedText, setDisplayedText] = useState("");
    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setDisplayedText(text.substring(0, i)); i++;
            if (i > text.length) clearInterval(timer);
        }, 50);
        return () => clearInterval(timer);
    }, [text]);
    return (
        <Typography sx={{ color: 'text.primary', fontFamily: 'monospace', fontSize: '0.85rem', borderLeft: `2px solid ${color}`, pl: 1 }}>
            {displayedText}<motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity, duration: 0.6 }}>|</motion.span>
        </Typography>
    );
}