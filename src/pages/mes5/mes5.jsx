import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Container,
    Grid,
    Paper,
    IconButton,
    Button,
    Stack,
    Dialog,
    DialogContent,
    Divider,
    Zoom,
    Avatar,
    Tooltip,
    LinearProgress,
    MobileStepper,
    TextField,
    InputAdornment,
    Fade
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowBackIosNewRounded,
    FavoriteRounded,
    MailOutlineRounded,
    BlurOnRounded,
    CloseRounded,
    AutoAwesomeRounded,
    ExploreRounded,
    AutoGraphRounded,
    SecurityRounded,
    DarkModeRounded,
    LightModeRounded,
    TimelineRounded,
    ForestRounded,
    MusicNoteRounded,
    HeadphonesRounded,
    GraphicEqRounded,
    PlayArrowRounded,
    PauseRounded,
    RadioRounded,
    QueueMusicRounded,
    SkipNextRounded,
    SkipPreviousRounded,
    VolumeUpRounded,
    SpaRounded,
    EmojiEmotionsRounded,
    KeyboardArrowLeftRounded,
    KeyboardArrowRightRounded,
    LockOpenRounded,
    LockOutlineRounded,
    KeyRounded,
    StarRounded,
    HeartBrokenRounded
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Mes5({ mode, toggleMode }) {
    const navigate = useNavigate();
    const isDark = mode === "dark";
    const [openCarta, setOpenCarta] = useState(false);
    const [hoveredValue, setHoveredValue] = useState(null);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentFact, setCurrentFact] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);

    const textColor = isDark ? "#ffffff" : "#1a1a1a";
    const accentColor = "#00695c";
    const emeraldColor = "#3de3b0";
    const glassBg = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.6)";
    const glassBorder = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(6, 35, 28, 0.15)";

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const startDate = new Date("2025-11-30T00:00:00");
        const timer = setInterval(() => {
            const now = new Date();
            const diff = now - startDate;
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / 1000 / 60) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const funFacts = [
        "Eres lo mejor que me paso en la vida entera 💖",
        "Somos tan iguales que parece que somos la misma persona 😄",
        "Cuando estoy contigo me siento completo ✨",
        "Escucharia cualquier canción contigo 🎵",
        "Cada día contigo es mejor que el anterior 🌟",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFact((prev) => (prev + 1) % funFacts.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleOpenCarta = () => setOpenCarta(true);
    const handleCloseCarta = () => setOpenCarta(false);

    const songs = [
        {
            id: 1,
            title: "Telephones",
            artist: "Vacations",
            embedUrl: "https://open.spotify.com/embed/track/0JIMT9gzLIIz0esKLyjbKf?utm_source=generator&theme=0",
        },
        {
            id: 2,
            title: "Starry Eyes",
            artist: "The Weeknd",
            embedUrl: "https://open.spotify.com/embed/track/6zzdyvVWjGrQBraSvuqJPY?utm_source=generator&theme=0",
        },
        {
            id: 3,
            title: "No Podrás Escapar de Mi",
            artist: "Willie Gonzalez",
            embedUrl: "https://open.spotify.com/embed/track/0lacKf3kZXbQ1F17QvurMs?utm_source=generator&theme=0",
        },
        {
            id: 4,
            title: "En Tus Ojitos",
            artist: "José y el Toro",
            embedUrl: "https://open.spotify.com/embed/track/7lyiGxMZPxVrERLHuDYpXU?utm_source=generator&theme=0",
        },
        {
            id: 5,
            title: "Feliz Me Siento",
            artist: "Gunda Merced Y Su Salsa Fever",
            embedUrl: "https://open.spotify.com/embed/track/0AR56gESaWxo357s1VXXN6?utm_source=generator&theme=0",
        }
    ];

    const handleSelectSong = (song) => {
        setSelectedSong(song);
        setIsPlaying(true);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        if (!selectedSong) return;
        const currentIndex = songs.findIndex(s => s.id === selectedSong.id);
        const nextIndex = (currentIndex + 1) % songs.length;
        setSelectedSong(songs[nextIndex]);
        setActiveStep(nextIndex);
        setIsPlaying(true);
    };

    const handlePrev = () => {
        if (!selectedSong) return;
        const currentIndex = songs.findIndex(s => s.id === selectedSong.id);
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        setSelectedSong(songs[prevIndex]);
        setActiveStep(prevIndex);
        setIsPlaying(true);
    };

    const handleCarouselNext = () => {
        const nextStep = (activeStep + 1) % songs.length;
        setActiveStep(nextStep);
        setSelectedSong(songs[nextStep]);
        setIsPlaying(true);
    };

    const handleCarouselPrev = () => {
        const prevStep = (activeStep - 1 + songs.length) % songs.length;
        setActiveStep(prevStep);
        setSelectedSong(songs[prevStep]);
        setIsPlaying(true);
    };

    const verifyPassword = () => {
        if (password.toLowerCase() === "blanco" || password.toLowerCase() === "Blanco") {
            setIsUnlocked(true);
            setError(false);
        } else {
            setError(true);
            setShake(true);
            setTimeout(() => {
                setError(false);
                setShake(false);
            }, 2000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            verifyPassword();
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

    const pulseAnimation = {
        scale: [1, 1.05, 1],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    };

    const floatAnimation = {
        y: [0, -15, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    };

    // PANTALLA DE BLOQUEO MEJORADA
    if (!isUnlocked) {
        return (
            <Box sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                background: isDark 
                    ? "linear-gradient(135deg, #0a0a0a 0%, #0d1a15 100%)" 
                    : "linear-gradient(135deg, #f0f7f4 0%, #e0ece6 100%)"
            }}>
                {/* Elementos decorativos flotantes */}
                <motion.div animate={floatAnimation} style={{ position: "absolute", top: "5%", left: "5%", opacity: 0.15 }}>
                    <FavoriteRounded sx={{ fontSize: 100, color: emeraldColor }} />
                </motion.div>
                <motion.div animate={{ ...floatAnimation, transition: { delay: 1, duration: 4 } }} style={{ position: "absolute", bottom: "10%", right: "3%", opacity: 0.12 }}>
                    <FavoriteRounded sx={{ fontSize: 140, color: emeraldColor }} />
                </motion.div>
                <motion.div animate={{ ...floatAnimation, transition: { delay: 0.5, duration: 3.5 } }} style={{ position: "absolute", top: "20%", right: "10%", opacity: 0.1 }}>
                    <StarRounded sx={{ fontSize: 80, color: emeraldColor }} />
                </motion.div>
                <motion.div animate={{ ...floatAnimation, transition: { delay: 1.5, duration: 4.5 } }} style={{ position: "absolute", bottom: "20%", left: "8%", opacity: 0.08 }}>
                    <StarRounded sx={{ fontSize: 70, color: emeraldColor }} />
                </motion.div>

                {/* Partículas decorativas */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 0.3, 0], scale: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
                        style={{
                            position: "absolute",
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            backgroundColor: emeraldColor,
                            filter: "blur(1px)"
                        }}
                    />
                ))}

                <Container maxWidth="sm">
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                    >
                        <Paper elevation={0} sx={{
                            p: { xs: 4, md: 5 },
                            borderRadius: "56px",
                            bgcolor: glassBg,
                            backdropFilter: "blur(20px)",
                            border: `1px solid ${glassBorder}`,
                            textAlign: "center",
                            position: "relative",
                            overflow: "hidden",
                            boxShadow: `0 30px 60px ${isDark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)"}`
                        }}>
                            {/* Gradiente de fondo elegante */}
                            <Box sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 4,
                                background: `linear-gradient(90deg, ${emeraldColor}, ${accentColor}, ${emeraldColor})`
                            }} />

                            <Box sx={{
                                position: "absolute",
                                top: -100,
                                right: -100,
                                width: 250,
                                height: 250,
                                borderRadius: "50%",
                                background: `radial-gradient(circle, ${emeraldColor}15, transparent)`,
                                pointerEvents: "none"
                            }} />
                            <Box sx={{
                                position: "absolute",
                                bottom: -100,
                                left: -100,
                                width: 250,
                                height: 250,
                                borderRadius: "50%",
                                background: `radial-gradient(circle, ${emeraldColor}10, transparent)`,
                                pointerEvents: "none"
                            }} />

                            {/* Icono de candado animado */}
                            <motion.div
                                animate={pulseAnimation}
                                style={{ display: "inline-block" }}
                            >
                                <Box sx={{
                                    width: 90,
                                    height: 90,
                                    borderRadius: "50%",
                                    background: `linear-gradient(135deg, ${emeraldColor}25, ${accentColor}25)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mx: "auto",
                                    mb: 3,
                                    boxShadow: `0 0 30px ${emeraldColor}40`
                                }}>
                                    <LockOutlineRounded sx={{ fontSize: 50, color: emeraldColor }} />
                                </Box>
                            </motion.div>

                            <Typography variant="h3" sx={{
                                fontWeight: 950,
                                color: textColor,
                                mb: 1,
                                letterSpacing: -2,
                                fontFamily: "'Georgia', serif",
                                background: `linear-gradient(135deg, ${textColor}, ${emeraldColor})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>
                                Para ti, Amorcito
                            </Typography>

                            <Typography sx={{
                                color: emeraldColor,
                                fontWeight: 600,
                                fontSize: "0.8rem",
                                letterSpacing: 3,
                                mb: 2
                            }}>
                                ✧ SEGURIDAD  ✧
                            </Typography>

                            <Divider sx={{ width: 60, mx: "auto", my: 2, borderColor: `${emeraldColor}40` }} />

                            <Typography sx={{
                                color: textColor,
                                opacity: 0.7,
                                fontSize: "0.9rem",
                                mb: 3,
                                maxWidth: 320,
                                mx: "auto",
                                lineHeight: 1.6
                            }}>
                                Hice algo para ti, pero antes...
                            </Typography>

                            {/* Corazón decorativo animado */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                style={{ marginBottom: 24 }}
                            >
                                <FavoriteRounded sx={{ color: emeraldColor, fontSize: 28, opacity: 0.5 }} />
                            </motion.div>

                            <Typography sx={{
                                color: textColor,
                                fontWeight: 700,
                                fontSize: "1.1rem",
                                mb: 2
                            }}>
                                ¿De qué color es mi personaje de Roblox?
                            </Typography>

                            <Box sx={{ position: "relative", mb: 3 }}>
                                <motion.div
                                    animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                                    transition={{ duration: 0.4 }}
                                >
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Que color es?"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        error={error}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <KeyRounded sx={{ color: error ? "#f44336" : emeraldColor }} />
                                                </InputAdornment>
                                            ),
                                            sx: {
                                                borderRadius: "40px",
                                                bgcolor: isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.9)",
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: error ? "#f44336" : `${emeraldColor}60`,
                                                    borderWidth: error ? 2 : 1,
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: emeraldColor,
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                    textAlign: "center",
                                                    fontSize: "0.9rem",
                                                    letterSpacing: 1
                                                }
                                            }
                                        }}
                                        autoFocus
                                    />
                                </motion.div>
                                
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            <Typography sx={{
                                                color: "#f44336",
                                                fontSize: "0.7rem",
                                                mt: 1,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: 0.5
                                            }}>
                                                <HeartBrokenRounded sx={{ fontSize: 14 }} />
                                                Ese color no es gg
                                                <HeartBrokenRounded sx={{ fontSize: 14 }} />
                                            </Typography>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Box>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={verifyPassword}
                                    endIcon={<LockOpenRounded />}
                                    sx={{
                                        background: `linear-gradient(135deg, ${emeraldColor}, ${accentColor})`,
                                        color: "#000",
                                        borderRadius: "40px",
                                        py: 1.5,
                                        fontWeight: 800,
                                        textTransform: "none",
                                        fontSize: "1rem",
                                        boxShadow: `0 15px 35px ${emeraldColor}66`,
                                        transition: "all 0.4s ease",
                                        "&:hover": {
                                            background: `linear-gradient(135deg, ${emeraldColor}99, ${accentColor})`,
                                            transform: "translateY(-2px)",
                                            boxShadow: `0 20px 40px ${emeraldColor}80`
                                        }
                                    }}
                                >
                                    Desbloquear tu página
                                </Button>
                            </motion.div>

                            <Typography sx={{
                                color: textColor,
                                opacity: 0.35,
                                fontSize: "0.65rem",
                                mt: 3,
                                letterSpacing: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1
                            }}>
                                <FavoriteRounded sx={{ fontSize: 10 }} />
                                Yo asi soy 🤑🤑🤑
                                <FavoriteRounded sx={{ fontSize: 10 }} />
                            </Typography>

                            {/* Pista sutil */}
                            <Typography sx={{
                                color: textColor,
                                opacity: 0.25,
                                fontSize: "0.55rem",
                                mt: 2,
                                letterSpacing: 3
                            }}>
                                PISTA: Siempre lo digo al reves 😉
                            </Typography>
                        </Paper>
                    </motion.div>
                </Container>
            </Box>
        );
    }

    // CONTENIDO PRINCIPAL DE LA PÁGINA (todo tu código original aquí)
    return (
        <Box sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 10, md: 12 },
            pb: 8,
            position: "relative",
            overflowX: "hidden"
        }}>
            {/* BOTÓN REGRESAR */}
            <IconButton
                onClick={() => navigate("/")}
                sx={{
                    position: "fixed", top: 30, left: 30, zIndex: 100,
                    color: textColor,
                    border: `1px solid ${glassBorder}`,
                    backdropFilter: "blur(20px)",
                    bgcolor: glassBg,
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                        bgcolor: emeraldColor,
                        color: "#000",
                        transform: "translateX(-5px) rotate(-5deg)",
                        borderColor: emeraldColor
                    }
                }}
            >
                <ArrowBackIosNewRounded fontSize="small" />
            </IconButton>

            {/* BOTÓN DARK MODE */}
            <IconButton
                onClick={toggleMode}
                sx={{
                    position: "fixed",
                    top: 30,
                    right: 30,
                    zIndex: 100,
                    bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${emeraldColor}33`,
                    color: textColor,
                    transition: "all 0.3s ease",
                    "&:hover": {
                        transform: "rotate(180deg)",
                        borderColor: emeraldColor,
                        bgcolor: emeraldColor,
                        color: "#000"
                    }
                }}
            >
                {isDark ? <LightModeRounded /> : <DarkModeRounded />}
            </IconButton>

            <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3, md: 4 }, textAlign: "center" }}>
                {/* TÍTULO CENTRADO */}
                <Box sx={{ mb: 5 }}>
                    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                        <motion.div variants={itemVariants}>
                            <Typography variant="overline" sx={{
                                color: isDark ? emeraldColor : "#004d40",
                                fontWeight: 900,
                                letterSpacing: 8,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 2
                            }}>
                                <motion.div animate={pulseAnimation}>
                                    <BlurOnRounded sx={{ fontSize: 28 }} />
                                </motion.div>
                                CAPÍTULO V: CADA DÍA MEJORANDO 
                            </Typography>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Typography sx={{
                                fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
                                fontWeight: 950,
                                lineHeight: 0.9,
                                color: textColor,
                                mb: 3,
                                letterSpacing: -2,
                            }}>
                                Nuestro
                                <br />
                                <span style={{
                                    background: `linear-gradient(135deg, ${emeraldColor} 0%, ${accentColor} 100%)`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    filter: `drop-shadow(0 8px 20px ${emeraldColor}40)`,
                                    display: "inline-block"
                                }}>
                                    Camino
                                </span>
                            </Typography>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Typography sx={{
                                color: textColor,
                                opacity: isDark ? 0.75 : 0.85,
                                fontSize: "0.9rem",
                                lineHeight: 1.6,
                                fontWeight: 400,
                                maxWidth: 550,
                                mx: "auto",
                                mb: 3
                            }}>
                                Cinco meses contigo, donde cada día parece mejor que el anterior, porque siempre me regalas risas y felicidad. En un mundo donde solo existimos tú y yo, seguimos construyendo algo hermoso <strong style={{ color: emeraldColor }}>"juntos"</strong>.
                            </Typography>
                        </motion.div>

                        {/* BOTÓN DE LA CARTA */}
                        <motion.div variants={itemVariants}>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    onClick={handleOpenCarta}
                                    variant="contained"
                                    startIcon={<MailOutlineRounded />}
                                    sx={{
                                        bgcolor: emeraldColor,
                                        color: "#000",
                                        borderRadius: "30px",
                                        px: 5,
                                        py: 1.3,
                                        fontWeight: 800,
                                        textTransform: "none",
                                        fontSize: "0.85rem",
                                        boxShadow: `0 15px 35px ${emeraldColor}66`,
                                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                        "&:hover": {
                                            bgcolor: accentColor,
                                            transform: "translateY(-3px)",
                                            boxShadow: `0 20px 45px ${accentColor}88`,
                                            color: "#fff"
                                        }
                                    }}
                                >
                                    Abrir carta
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </Box>

                {/* CONTADOR CENTRADO */}
                <Box sx={{ mb: 5, display: "flex", justifyContent: "center" }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                        style={{ width: "100%" }}
                    >
                        <Paper elevation={0} sx={{
                            p: 3,
                            borderRadius: "28px",
                            bgcolor: glassBg,
                            border: `1px solid ${glassBorder}`,
                            backdropFilter: "blur(30px)",
                            position: "relative",
                            overflow: "hidden"
                        }}>
                            <Box sx={{
                                position: "absolute",
                                top: -20,
                                right: -20,
                                width: 100,
                                height: 100,
                                bgcolor: `${emeraldColor}15`,
                                borderRadius: "50%",
                                filter: "blur(40px)"
                            }} />

                            <Typography sx={{
                                color: isDark ? emeraldColor : "#004d40",
                                fontWeight: 900,
                                fontSize: "0.7rem",
                                letterSpacing: 4,
                                textAlign: "center",
                                mb: 2,
                                opacity: 0.8
                            }}>
                                <TimelineRounded sx={{ fontSize: 14, verticalAlign: "middle", mr: 1 }} />
                                TIEMPO A TU LADO
                            </Typography>
                            <Grid container spacing={2} justifyContent="center">
                                {[
                                    { val: timeLeft.days, label: "DÍAS" },
                                    { val: timeLeft.hours, label: "HORAS" },
                                    { val: timeLeft.minutes, label: "MIN" },
                                    { val: timeLeft.seconds, label: "SEG" }
                                ].map((t, i) => (
                                    <Grid item xs={3} key={i}>
                                        <Stack alignItems="center">
                                            <Typography sx={{
                                                color: textColor,
                                                fontWeight: 950,
                                                fontSize: { xs: "1.8rem", md: "2.2rem" },
                                                letterSpacing: -1,
                                                fontFamily: "'Monospace', monospace"
                                            }}>
                                                {t.val.toString().padStart(2, '0')}
                                            </Typography>
                                            <Typography sx={{
                                                color: isDark ? emeraldColor : "#004d40",
                                                fontSize: "0.65rem",
                                                fontWeight: 800,
                                                mt: 0.5,
                                                letterSpacing: 2
                                            }}>
                                                {t.label}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </motion.div>
                </Box>

                {/* AVATARES DE MESES */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
                    <Stack direction="row" spacing={-1.5}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Tooltip key={i} title={`Mes ${i}${i === 5 ? " • Actual" : ""}`} arrow>
                                <motion.div whileHover={{ y: -5, scale: 1.1 }}>
                                    <Avatar sx={{
                                        width: 45, height: 45,
                                        border: `3px solid ${isDark ? "#121212" : "#fff"}`,
                                        bgcolor: i === 5 ? emeraldColor : (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"),
                                        color: i === 5 ? "#000" : textColor,
                                        fontSize: "0.9rem",
                                        fontWeight: 800,
                                        transition: "all 0.3s ease",
                                        cursor: "pointer"
                                    }}>
                                        {i}
                                    </Avatar>
                                </motion.div>
                            </Tooltip>
                        ))}
                    </Stack>
                </Box>

                {/* VALORES CONSTRUIDOS */}
                <Box sx={{ mb: 5 }}>
                    <Typography variant="h6" sx={{
                        color: textColor,
                        fontWeight: 800,
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        fontSize: "1.1rem"
                    }}>
                        <AutoGraphRounded sx={{ color: emeraldColor }} />
                        Lo que hemos construido
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {[
                            { title: "Confianza", desc: "Cada día mejoramos", icon: <SecurityRounded /> },
                            { title: "Amor", desc: "Cada día mas fuerte", icon: <FavoriteRounded /> },
                            { title: "Sueños", desc: "Soñamos en grande", icon: <AutoAwesomeRounded /> }
                        ].map((val, idx) => (
                            <Grid item xs={12} sm={4} key={idx}>
                                <motion.div
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    onHoverStart={() => setHoveredValue(idx)}
                                    onHoverEnd={() => setHoveredValue(null)}
                                >
                                    <Box sx={{
                                        p: 2.5,
                                        borderRadius: "20px",
                                        border: `1px solid ${glassBorder}`,
                                        bgcolor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
                                        transition: "all 0.4s ease",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        "&:hover": {
                                            borderColor: emeraldColor,
                                            bgcolor: isDark ? `${emeraldColor}08` : `${emeraldColor}04`,
                                        }
                                    }}>
                                        <Box sx={{
                                            color: hoveredValue === idx ? emeraldColor : (isDark ? emeraldColor : "#004d40"),
                                            mb: 1.5,
                                            transition: "all 0.3s ease",
                                            transform: hoveredValue === idx ? "scale(1.1)" : "scale(1)",
                                            display: "flex",
                                            justifyContent: "center"
                                        }}>
                                            {val.icon}
                                        </Box>
                                        <Typography sx={{ color: textColor, fontWeight: 800, fontSize: "0.95rem", mb: 0.5 }}>
                                            {val.title}
                                        </Typography>
                                        <Typography sx={{ color: textColor, opacity: 0.5, fontSize: "0.7rem", lineHeight: 1.3 }}>
                                            {val.desc}
                                        </Typography>
                                    </Box>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* DATOS CURIOSOS */}
                <Box sx={{ mb: 5 }}>
                    <Paper elevation={0} sx={{
                        p: 2.5,
                        borderRadius: "20px",
                        bgcolor: glassBg,
                        border: `1px solid ${glassBorder}`,
                        textAlign: "center"
                    }}>
                        <EmojiEmotionsRounded sx={{ color: emeraldColor, fontSize: 24, mb: 0.5, opacity: 0.7 }} />
                        <Typography sx={{ color: textColor, fontSize: "0.65rem", fontWeight: 600, mb: 1, letterSpacing: 2, opacity: 0.6 }}>
                            DATOS CURIOSOS
                        </Typography>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentFact}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Typography sx={{ color: emeraldColor, fontSize: "0.8rem", fontWeight: 500 }}>
                                    {funFacts[currentFact]}
                                </Typography>
                            </motion.div>
                        </AnimatePresence>
                        <LinearProgress 
                            sx={{ 
                                mt: 2, 
                                borderRadius: 10, 
                                height: 2.5,
                                bgcolor: `${emeraldColor}20`,
                                '& .MuiLinearProgress-bar': { bgcolor: emeraldColor }
                            }} 
                            variant="determinate" 
                            value={((currentFact + 1) / funFacts.length) * 100} 
                        />
                    </Paper>
                </Box>

                {/* REPRODUCTOR + CARRUSEL DE CANCIONES */}
                <Box sx={{ mb: 5 }}>
                    <Typography variant="h6" sx={{
                        color: textColor,
                        fontWeight: 800,
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1.5,
                        fontSize: "1.1rem"
                    }}>
                        <RadioRounded sx={{ color: emeraldColor }} />
                        Nuestro Soundtrack
                        <QueueMusicRounded sx={{ color: emeraldColor, fontSize: 18 }} />
                    </Typography>

                    {/* Reproductor actual */}
                    {selectedSong && (
                        <Paper elevation={0} sx={{
                            mb: 3,
                            borderRadius: "20px",
                            bgcolor: glassBg,
                            border: `2px solid ${emeraldColor}`,
                            overflow: "hidden"
                        }}>
                            <Box sx={{ p: 2, borderBottom: `1px solid ${glassBorder}` }}>
                                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" flexWrap="wrap">
                                    <Box sx={{
                                        width: 45,
                                        height: 45,
                                        borderRadius: "12px",
                                        bgcolor: `${emeraldColor}15`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <MusicNoteRounded sx={{ fontSize: 22, color: emeraldColor }} />
                                    </Box>
                                    
                                    <Box>
                                        <Typography sx={{ color: textColor, fontWeight: 700, fontSize: "0.9rem" }}>
                                            {selectedSong.title}
                                        </Typography>
                                        <Typography sx={{ color: emeraldColor, fontSize: "0.7rem" }}>
                                            {selectedSong.artist}
                                        </Typography>
                                    </Box>

                                    <Stack direction="row" spacing={1}>
                                        <IconButton onClick={handlePrev} size="small" sx={{ color: emeraldColor }}>
                                            <SkipPreviousRounded sx={{ fontSize: 22 }} />
                                        </IconButton>
                                        <IconButton 
                                            onClick={togglePlayPause}
                                            sx={{
                                                bgcolor: emeraldColor,
                                                color: "#000",
                                                width: 36,
                                                height: 36
                                            }}
                                        >
                                            {isPlaying ? <PauseRounded sx={{ fontSize: 20 }} /> : <PlayArrowRounded sx={{ fontSize: 20 }} />}
                                        </IconButton>
                                        <IconButton onClick={handleNext} size="small" sx={{ color: emeraldColor }}>
                                            <SkipNextRounded sx={{ fontSize: 22 }} />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </Box>

                            <Box sx={{ height: 90, position: "relative" }}>
                                <iframe
                                    key={selectedSong.id}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        border: "none"
                                    }}
                                    src={`${selectedSong.embedUrl}&autoplay=${isPlaying ? 1 : 0}`}
                                    title={selectedSong.title}
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                />
                            </Box>
                        </Paper>
                    )}

                    {/* CARRUSEL DE CANCIONES */}
                    <Box sx={{ position: "relative", maxWidth: "100%", mx: "auto" }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Paper
                                    elevation={0}
                                    onClick={() => handleSelectSong(songs[activeStep])}
                                    sx={{
                                        p: 3,
                                        borderRadius: "20px",
                                        bgcolor: selectedSong?.id === songs[activeStep].id ? `${emeraldColor}15` : glassBg,
                                        border: `1px solid ${selectedSong?.id === songs[activeStep].id ? emeraldColor : glassBorder}`,
                                        cursor: "pointer",
                                        textAlign: "center",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            borderColor: emeraldColor,
                                            bgcolor: `${emeraldColor}08`,
                                            transform: "scale(1.02)"
                                        }
                                    }}
                                >
                                    <MusicNoteRounded sx={{ fontSize: 40, color: emeraldColor, mb: 1.5 }} />
                                    <Typography sx={{ color: textColor, fontWeight: 800, fontSize: "1.1rem", mb: 0.5 }}>
                                        {songs[activeStep].title}
                                    </Typography>
                                    <Typography sx={{ color: emeraldColor, fontSize: "0.8rem" }}>
                                        {songs[activeStep].artist}
                                    </Typography>
                                    {selectedSong?.id === songs[activeStep].id && (
                                        <Box sx={{
                                            mt: 1.5,
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            bgcolor: emeraldColor,
                                            mx: "auto",
                                            boxShadow: `0 0 12px ${emeraldColor}`
                                        }} />
                                    )}
                                </Paper>
                            </motion.div>
                        </AnimatePresence>

                        <IconButton
                            onClick={handleCarouselPrev}
                            size="small"
                            sx={{
                                position: "absolute",
                                left: -15,
                                top: "50%",
                                transform: "translateY(-50%)",
                                bgcolor: glassBg,
                                backdropFilter: "blur(10px)",
                                border: `1px solid ${emeraldColor}`,
                                color: emeraldColor,
                                zIndex: 2,
                                "&:hover": { bgcolor: emeraldColor, color: "#000" }
                            }}
                        >
                            <KeyboardArrowLeftRounded />
                        </IconButton>

                        <IconButton
                            onClick={handleCarouselNext}
                            size="small"
                            sx={{
                                position: "absolute",
                                right: -15,
                                top: "50%",
                                transform: "translateY(-50%)",
                                bgcolor: glassBg,
                                backdropFilter: "blur(10px)",
                                border: `1px solid ${emeraldColor}`,
                                color: emeraldColor,
                                zIndex: 2,
                                "&:hover": { bgcolor: emeraldColor, color: "#000" }
                            }}
                        >
                            <KeyboardArrowRightRounded />
                        </IconButton>
                    </Box>

                    <MobileStepper
                        steps={songs.length}
                        position="static"
                        activeStep={activeStep}
                        sx={{
                            mt: 2,
                            bgcolor: "transparent",
                            justifyContent: "center",
                            '& .MuiMobileStepper-dot': {
                                width: 8,
                                height: 8,
                                bgcolor: `${emeraldColor}40`,
                                mx: 0.5
                            },
                            '& .MuiMobileStepper-dotActive': {
                                bgcolor: emeraldColor,
                                width: 10,
                                height: 10
                            }
                        }}
                        nextButton={null}
                        backButton={null}
                    />

                    <Box sx={{
                        mt: 3,
                        p: 2,
                        borderRadius: "20px",
                        bgcolor: glassBg,
                        border: `1px solid ${glassBorder}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2
                    }}>
                        <VolumeUpRounded sx={{ fontSize: 16, color: emeraldColor, opacity: 0.6 }} />
                        <Box sx={{ display: "flex", gap: 0.8 }}>
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        scaleY: selectedSong && isPlaying ? [1, 1.5 + Math.random() * 0.5, 1] : 1
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: selectedSong && isPlaying ? Infinity : 0,
                                        delay: i * 0.08
                                    }}
                                    style={{
                                        width: 2.5,
                                        height: 14,
                                        backgroundColor: emeraldColor,
                                        borderRadius: 2,
                                        opacity: selectedSong ? 0.8 : 0.3
                                    }}
                                />
                            ))}
                        </Box>
                        <GraphicEqRounded sx={{ fontSize: 16, color: emeraldColor, opacity: 0.6 }} />
                        <Typography sx={{ color: textColor, fontSize: "0.7rem", opacity: 0.5 }}>
                            {selectedSong && isPlaying ? "🎵 Sonando ahora" : selectedSong ? "⏸ Pausado" : " Haz clic en una canción"}
                        </Typography>
                    </Box>
                </Box>

                {/* FRASE FINAL */}
                <Box sx={{ textAlign: "center" }}>
                    <Paper elevation={0} sx={{
                        p: 2.5,
                        borderRadius: "20px",
                        bgcolor: glassBg,
                        border: `1px solid ${glassBorder}`
                    }}>
                        <SpaRounded sx={{ color: emeraldColor, fontSize: 24, mb: 1, opacity: 0.6 }} />
                        <Typography sx={{ color: textColor, fontStyle: "italic", fontSize: "0.8rem", lineHeight: 1.5 }}>
                            "Eres lo que siempre quise y soñe, te amo con mi vida hermosa"
                        </Typography>
                        <ForestRounded sx={{ color: emeraldColor, fontSize: 18, mt: 1, opacity: 0.4 }} />
                    </Paper>
                </Box>
            </Container>

            {/* MODAL DE LA CARTA */}
            <Dialog
                open={openCarta}
                onClose={handleCloseCarta}
                fullWidth
                maxWidth="sm"
                TransitionComponent={Zoom}
                PaperProps={{
                    sx: {
                        borderRadius: "48px",
                        bgcolor: isDark ? "#0a0a0a" : "#ffffff",
                        backgroundImage: "none",
                        border: `1px solid ${glassBorder}`,
                        overflow: "visible",
                        boxShadow: isDark ? "0 50px 100px rgba(0,0,0,0.6)" : "0 50px 100px rgba(0,0,0,0.2)",
                    }
                }}
            >
                <IconButton
                    onClick={handleCloseCarta}
                    sx={{
                        position: "absolute",
                        top: -18,
                        right: -18,
                        bgcolor: emeraldColor,
                        color: "#000",
                        zIndex: 10,
                        "&:hover": { bgcolor: accentColor, transform: "scale(1.15) rotate(90deg)", color: "#fff" },
                        boxShadow: `0 5px 15px ${emeraldColor}80`
                    }}
                >
                    <CloseRounded />
                </IconButton>

                <DialogContent sx={{ p: { xs: 4, md: 6 }, position: "relative" }}>
                    <FavoriteRounded sx={{ position: "absolute", bottom: 20, right: 20, fontSize: 180, color: `${emeraldColor}06`, transform: "rotate(15deg)", zIndex: 0 }} />
                    <FavoriteRounded sx={{ position: "absolute", top: 20, left: 20, fontSize: 120, color: `${accentColor}06`, transform: "rotate(-10deg)", zIndex: 0 }} />

                    <Stack spacing={4} alignItems="center" sx={{ position: "relative", zIndex: 1 }}>
                        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                            <Box sx={{ width: 85, height: 85, borderRadius: "35% 65% 70% 30% / 35% 40% 60% 65%", bgcolor: `${emeraldColor}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <AutoAwesomeRounded sx={{ color: emeraldColor, fontSize: 45 }} />
                            </Box>
                        </motion.div>

                        <Box textAlign="center">
                            <Typography variant="h4" sx={{ fontWeight: 950, color: textColor, mb: 1, letterSpacing: -1, fontFamily: "'Georgia', serif" }}>
                                Amor,
                            </Typography>
                            <Typography sx={{ color: emeraldColor, fontWeight: 800, fontSize: "0.75rem", letterSpacing: 4 }}>
                                30 DE NOVIEMBRE • 5 MESES
                            </Typography>
                        </Box>

                        <Typography sx={{ color: textColor, opacity: 0.9, lineHeight: 2, fontSize: "1rem", textAlign: "justify", fontFamily: "'Georgia', serif", px: 2 }}>
                            "Amor, desde que te conozco cada día ha sido una aventura maravillosa, donde hemos podido conocernos y mejorar juntos como pareja. Soy una persona muy afortunada por tenerte, y nunca dudes de eso.
Te dije que no todas las relaciones van a ser días felices siempre, pero hoy que cumplimos 5 meses quiero decirte algo: no sé si ya te diste cuenta, pero cada día nuestro lazo se vuelve más fuerte, porque hemos superado todos los obstáculos y diferencias.
Quiero agradecerte por aguantarme tanto y por ser esa persona que hace que despertar valga la pena."
                        </Typography>

                        <Divider sx={{ width: "50%", borderColor: `${emeraldColor}33`, my: 1 }} />

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Box sx={{ textAlign: "right" }}>
                                <Typography sx={{ fontWeight: 900, color: textColor, fontSize: "1rem", fontFamily: "'Georgia', serif" }}>
                                    Con todo mi amor,
                                </Typography>
                                <Typography sx={{ color: emeraldColor, fontWeight: 700, fontSize: "0.85rem", letterSpacing: 1 }}>
                                    EITHAN :D
                                </Typography>
                            </Box>
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}>
                                <FavoriteRounded sx={{ color: emeraldColor, fontSize: 28, filter: `drop-shadow(0 0 8px ${emeraldColor}80)` }} />
                            </motion.div>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Box>
    );
}