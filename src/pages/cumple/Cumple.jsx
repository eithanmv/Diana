import { useMemo, useState } from "react";
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
    Paper
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import foto from "../../assets/Amorcito.jpeg";
import {
    ArrowBackIosNewRounded,
    DarkModeRounded,
    LightModeRounded,
    CakeRounded,
    FavoriteRounded,
    CardGiftcardRounded,
    MusicNoteRounded,
    CloseRounded,
    StarsRounded,
    RocketLaunchRounded,
    PlayArrowRounded
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Cumple({ mode, toggleMode }) {
    const navigate = useNavigate();

    const palette = useMemo(
        () => ({
            pink: "#f28cab",
            rose: "#e6a0b6",
            purple: "#b07aa1",
            blue: "#c98fb0",
            yellow: "#f1d38a",

            inkLight: "#4f355f",
            inkDark: "#f8eef4",

            paperLight: "#fffaf4",
            paperDark: "#22181f",

            polaroidDark: "#2b1f27",

            bgLight: "#f7efe7",
            bgDark: "#140d12",

            topBarDark1: "#4a1f2d",
            topBarDark2: "#6a2d44",
            topBarDark3: "#8a4f67"
        }),
        []
    );

    const textColor = mode === "dark" ? palette.inkDark : palette.inkLight;
    const paperBg = mode === "dark" ? palette.paperDark : palette.paperLight;
    const pageBg = mode === "dark" ? palette.bgDark : palette.bgLight;

    const [selectedNote, setSelectedNote] = useState(0);
    const [openCarta, setOpenCarta] = useState(false);
    const [openRegalo, setOpenRegalo] = useState(false);
    const [activeSong, setActiveSong] = useState({
        titulo: "Vuelta por el Universo",
        artista: "Cerati & Melero",
        ytId: "Wun6zDSpwkg"
    });

    const notes = [
        {
            title: "Gracias por ser tú",
            text: "Gracias, vida mía, por ser tú. Eres el mayor regalo que la vida me pudo dar. Gracias por tu amor, tu comprensión y tu compañía conmigo. Te necesito hasta el día que me muera."
        },
        {
            title: "Lo que me gusta de estar contigo",
            text: "Lo que me gusta de estar contigo es que me haces sentir feliz con algo tan simple como escuchar tu hermosa voz. Me gusta que tengamos esa conexión tan especial que solo tú y yo sabemos cuál es, y simplemente me gustas por ser tú."
        },
        {
            title: "Mis deseos para ti",
            text: "Deseo que hoy, en tu día, te sientas feliz, porque es lo que se merece una mujer como tú. También deseo que la vida te siga regalando muchos años más y, por último, aunque sea un poco egoísta de mi parte, deseo que estés conmigo por siempre :D"
        }
    ];

    const stickers = [
        {
            icon: <CakeRounded />,
            title: "Pastel",
            text: "Ojalá comas un rico pastel."
        },
        {
            icon: <StarsRounded />,
            title: "Eres especial",
            text: "Hoy el día es especial por ti."
        },
        {
            icon: <RocketLaunchRounded />,
            title: "Un año más",
            text: "Otro año más para ti, pero a mi lado."
        }
    ];

    const songs = [
        {
            titulo: "Vuelta por el Universo",
            artista: "Cerati & Melero",
            ytId: "Wun6zDSpwkg"
        },
        {
            titulo: "Die For You",
            artista: "The Weeknd",
            ytId: "uPD0QOGTmMI"
        },
        {
            titulo: "Busca Por Dentro",
            artista: "Grupo Niche",
            ytId: "IVluKJqdEfE"
        },
        {
            titulo: "Lo Que Siento",
            artista: "Cuco",
            ytId: "AjGkbFqi67c"
        }
    ];

    return (
        <Box
            sx={{
                minHeight: "100vh",
                position: "relative",
                overflow: "hidden",
                background: pageBg
            }}
        >
            <PaperTextureBackground mode={mode} palette={palette} />

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
                        color: textColor,
                        bgcolor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.72)",
                        border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.14)" : "rgba(90,60,40,0.10)"}`,
                        backdropFilter: "blur(10px)",
                        fontWeight: 900,
                        boxShadow: mode === "dark" ? "0 10px 24px rgba(0,0,0,0.22)" : "none"
                    }}
                >
                    Atrás
                </Button>

                <IconButton
                    onClick={toggleMode}
                    sx={{
                        bgcolor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.72)",
                        border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.14)" : "rgba(90,60,40,0.10)"}`,
                        backdropFilter: "blur(10px)",
                        boxShadow: mode === "dark" ? "0 10px 24px rgba(0,0,0,0.22)" : "none"
                    }}
                >
                    {mode === "dark" ? (
                        <LightModeRounded sx={{ color: palette.yellow }} />
                    ) : (
                        <DarkModeRounded sx={{ color: palette.purple }} />
                    )}
                </IconButton>
            </Box>

            <Container maxWidth="lg" sx={{ py: 12, position: "relative", zIndex: 1 }}>
                <Stack spacing={4}>
                    <motion.div
                        initial={{ opacity: 0, y: -18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                py: 1.5,
                                px: 2,
                                borderRadius: "999px",
                                position: "relative",
                                background:
                                    mode === "dark"
                                        ? `linear-gradient(90deg, ${palette.topBarDark1} 0%, ${palette.topBarDark2} 52%, ${palette.topBarDark3} 100%)`
                                        : "linear-gradient(90deg, #f3dfcf 0%, #eadcf6 50%, #dcecf6 100%)",
                                color: mode === "dark" ? "#f8eef4" : "#5b4357",
                                overflow: "hidden",
                                boxShadow:
                                    mode === "dark"
                                        ? "0 18px 42px rgba(0,0,0,0.32)"
                                        : "0 14px 30px rgba(120,86,60,0.10)",
                                border:
                                    mode === "dark"
                                        ? "1px solid rgba(255,255,255,0.10)"
                                        : "1px solid rgba(120,86,60,0.10)",
                                "&::before":
                                    mode === "dark"
                                        ? {
                                            content: '""',
                                            position: "absolute",
                                            inset: 0,
                                            background:
                                                "linear-gradient(180deg, rgba(255,255,255,0.18), transparent 38%, rgba(255,255,255,0.05) 70%, transparent 100%)",
                                            pointerEvents: "none"
                                        }
                                        : undefined
                            }}
                        >
                            <Box sx={{ overflow: "hidden", width: "100%" }}>
                                <motion.div
                                    animate={{ x: ["0%", "-50%"] }}
                                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        display: "flex",
                                        width: "max-content",
                                        whiteSpace: "nowrap",
                                        fontWeight: 900,
                                        letterSpacing: "3px",
                                        textTransform: "uppercase",
                                        opacity: 0.95,
                                        position: "relative",
                                        zIndex: 1
                                    }}
                                >
                                    <Box sx={{ display: "flex", gap: "42px", pr: "42px" }}>
                                        {Array.from({ length: 10 }).map((_, i) => (
                                            <span key={`first-${i}`}>Happy Birthday Diana ✦ Happy Birthday Diana ✦</span>
                                        ))}
                                    </Box>

                                    <Box sx={{ display: "flex", gap: "42px", pr: "42px" }}>
                                        {Array.from({ length: 10 }).map((_, i) => (
                                            <span key={`second-${i}`}>Happy Birthday Diana ✦ Happy Birthday Diana ✦</span>
                                        ))}
                                    </Box>
                                </motion.div>
                            </Box>
                        </Box>
                    </motion.div>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "1.15fr 0.85fr" },
                            gap: 3,
                            alignItems: "start"
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Box sx={{ position: "relative" }}>
                                <Tape color={palette.yellow} top={-10} left={28} rotate={-7} />

                                <PaperCard
                                    mode={mode}
                                    sx={{
                                        p: { xs: 3.5, md: 5 },
                                        transform: "rotate(-1deg)"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: { xs: "0.78rem", md: "0.84rem" },
                                            fontWeight: 900,
                                            letterSpacing: 4,
                                            textTransform: "uppercase",
                                            color: textColor,
                                            opacity: 0.76,
                                            mb: 1.5
                                        }}
                                    >
                                        birthday notes
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: { xs: "3rem", md: "5.7rem" },
                                            fontWeight: 1000,
                                            lineHeight: 0.9,
                                            letterSpacing: -4,
                                            color: textColor
                                        }}
                                    >
                                        Feliz
                                        <br />
                                        cumpleaños
                                    </Typography>

                                    <Typography
                                        sx={{
                                            mt: 2.5,
                                            maxWidth: 620,
                                            lineHeight: 1.95,
                                            color: textColor,
                                            opacity: 0.92,
                                            fontSize: { xs: "1rem", md: "1.08rem" }
                                        }}
                                    >
                                        Hoy es el cumpleaños de la princesa más hermosa que existe y que existirá para mí. Hice un par de notas para ti para que recuerdes cuánto te amo y lo importante que eres para mí. Recuerda que te amo inmensamente y eres lo mejor que me paso en la vida, siempre estas en mi pensamiento y mi alma te celebra hoy y siempre, mi amor. TE AMOOOOOOOOOOOOOOOOO
                                    </Typography>

                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        spacing={1.2}
                                        sx={{ mt: 3 }}
                                    >
                                        <Button
                                            onClick={() => setOpenCarta(true)}
                                            startIcon={<FavoriteRounded />}
                                            sx={scrapButton(mode, palette, "pink")}
                                        >
                                            Abrir carta
                                        </Button>

                                        <Button
                                            onClick={() => setOpenRegalo(true)}
                                            startIcon={<CardGiftcardRounded />}
                                            sx={scrapButton(mode, palette, "purple")}
                                        >
                                            Abrir recordatorio
                                        </Button>
                                    </Stack>
                                </PaperCard>
                            </Box>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            <Stack spacing={3}>
                                <Polaroid mode={mode} palette={palette} rotate={2}>
                                    <Box sx={{ textAlign: "center" }}>
                                        <Box
                                            sx={{
                                                width: "100%",
                                                height: { xs: 260, sm: 320 },
                                                borderRadius: 2,
                                                overflow: "hidden",
                                                mb: 2,
                                                bgcolor: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={foto}
                                                alt="Diana"
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    display: "block"
                                                }}
                                            />
                                        </Box>

                                        <Typography
                                            sx={{
                                                mt: 1,
                                                fontWeight: 900,
                                                color: mode === "dark" ? palette.inkDark : palette.inkLight,
                                                fontSize: "1.03rem"
                                            }}
                                        >
                                            Hoy es completamente tu día
                                        </Typography>
                                    </Box>
                                </Polaroid>

                                <Polaroid
                                    mode={mode}
                                    palette={palette}
                                    rotate={-1.2}
                                    sx={{ mt: 1 }}
                                    tapeProps={{ top: 8, left: 24, rotate: -5 }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 1000,
                                            color: mode === "dark" ? palette.inkDark : palette.inkLight,
                                            fontSize: "1.05rem",
                                            mb: 1.2
                                        }}
                                    >
                                        Nota rápida
                                    </Typography>
                                    <Typography
                                        sx={{
                                            lineHeight: 1.9,
                                            color: mode === "dark" ? palette.inkDark : palette.inkLight,
                                            opacity: 0.92
                                        }}
                                    >
                                        Eres la luz de mis días, que ilumina y guía mi camino. Sigue para mí siempre, porque yo te necesito a mi lado para ser feliz.
                                    </Typography>
                                </Polaroid>
                            </Stack>
                        </motion.div>
                    </Box>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.1fr" },
                            gap: 3,
                            alignItems: "start"
                        }}
                    >
                        <PaperCard mode={mode} sx={{ p: 3.2, transform: "rotate(1deg)" }}>
                            <Typography
                                sx={{
                                    fontWeight: 1000,
                                    color: textColor,
                                    fontSize: "1.2rem",
                                    mb: 2
                                }}
                            >
                                Elige una nota
                            </Typography>

                            <Stack spacing={1.2}>
                                {notes.map((note, i) => {
                                    const active = selectedNote === i;
                                    return (
                                        <Button
                                            key={i}
                                            fullWidth
                                            onClick={() => setSelectedNote(i)}
                                            sx={{
                                                justifyContent: "flex-start",
                                                textTransform: "none",
                                                borderRadius: 3,
                                                px: 1.6,
                                                py: 1.2,
                                                color: textColor,
                                                border: `1px dashed ${
                                                    active
                                                        ? "rgba(242,140,171,0.55)"
                                                        : mode === "dark"
                                                            ? "rgba(255,255,255,0.10)"
                                                            : "rgba(0,0,0,0.10)"
                                                }`,
                                                bgcolor: active
                                                    ? "rgba(242,140,171,0.10)"
                                                    : mode === "dark"
                                                        ? "rgba(255,255,255,0.06)"
                                                        : "rgba(0,0,0,0.02)",
                                                fontWeight: 900
                                            }}
                                        >
                                            {i + 1}. {note.title}
                                        </Button>
                                    );
                                })}
                            </Stack>
                        </PaperCard>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedNote}
                                initial={{ opacity: 0, y: 16, rotate: -1 }}
                                animate={{ opacity: 1, y: 0, rotate: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.35 }}
                            >
                                <PaperCard mode={mode} sx={{ p: 4, minHeight: 250, transform: "rotate(-0.8deg)" }}>
                                    <Tape color={palette.rose} top={-12} right={36} rotate={7} />

                                    <Typography
                                        sx={{
                                            fontWeight: 1000,
                                            color: textColor,
                                            fontSize: { xs: "1.35rem", md: "1.65rem" },
                                            mb: 2
                                        }}
                                    >
                                        {notes[selectedNote].title}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            lineHeight: 2,
                                            color: textColor,
                                            opacity: 0.92,
                                            fontSize: { xs: "1rem", md: "1.04rem" }
                                        }}
                                    >
                                        {notes[selectedNote].text}
                                    </Typography>
                                </PaperCard>
                            </motion.div>
                        </AnimatePresence>
                    </Box>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                            gap: 2.2
                        }}
                    >
                        {stickers.map((item, i) => (
                            <PaperCard
                                key={i}
                                mode={mode}
                                sx={{
                                    p: 2.6,
                                    transform:
                                        i === 0 ? "rotate(-1deg)" : i === 1 ? "rotate(1deg)" : "rotate(-0.4deg)"
                                }}
                            >
                                <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1.2 }}>
                                    <Avatar
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            bgcolor:
                                                i === 0
                                                    ? "rgba(242,140,171,0.14)"
                                                    : i === 1
                                                        ? "rgba(176,122,161,0.14)"
                                                        : "rgba(241,211,138,0.14)",
                                            color:
                                                i === 0 ? palette.pink : i === 1 ? palette.purple : palette.yellow
                                        }}
                                    >
                                        {item.icon}
                                    </Avatar>

                                    <Typography sx={{ fontWeight: 1000, color: textColor }}>
                                        {item.title}
                                    </Typography>
                                </Stack>

                                <Typography sx={{ lineHeight: 1.85, color: textColor, opacity: 0.92 }}>
                                    {item.text}
                                </Typography>
                            </PaperCard>
                        ))}
                    </Box>

                    <Box sx={{ position: "relative" }}>
                        <PaperCard mode={mode} sx={{ p: { xs: 3, md: 4 }, transform: "rotate(0.5deg)" }}>
                            <Tape color={palette.blue} top={-10} left={42} rotate={-8} />

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: { xs: "1fr", md: "0.95fr 1.05fr" },
                                    gap: 3,
                                    alignItems: "stretch"
                                }}
                            >
                                <CassettePanel
                                    mode={mode}
                                    palette={palette}
                                    activeSong={activeSong}
                                    songs={songs}
                                    setActiveSong={setActiveSong}
                                />

                                <Box
                                    sx={{
                                        width: "100%",
                                        minHeight: 320,
                                        overflow: "hidden",
                                        borderRadius: 5,
                                        border: `2px solid ${mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)"}`,
                                        bgcolor: "#000",
                                        position: "relative"
                                    }}
                                >
                                    <iframe
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            width: "100%",
                                            height: "100%",
                                            border: 0
                                        }}
                                        src={`https://www.youtube.com/embed/${activeSong.ytId}?rel=0&modestbranding=1&controls=1`}
                                        title="Cumple Playlist"
                                        allowFullScreen
                                    />
                                </Box>
                            </Box>
                        </PaperCard>
                    </Box>
                </Stack>
            </Container>

            <Modal
                open={openCarta}
                onClose={() => setOpenCarta(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                        sx: {
                            backdropFilter: "blur(12px)",
                            bgcolor: "rgba(0,0,0,0.65)"
                        }
                    }
                }}
            >
                <Fade in={openCarta} timeout={500}>
                    <Box
                        sx={{
                            position: "fixed",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: { xs: 1.2, sm: 2.5 }
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                            style={{ width: "100%", maxWidth: "620px" }}
                        >
                            <Paper
                                sx={{
                                    p: { xs: 2, sm: 3.2, md: 4.6 },
                                    borderRadius: { xs: 4, sm: 6 },
                                    position: "relative",
                                    overflow: "hidden",
                                    background: paperBg,
                                    border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(120,86,60,0.12)"}`,
                                    boxShadow:
                                        mode === "dark"
                                            ? "0 24px 60px rgba(0,0,0,0.35)"
                                            : "0 24px 50px rgba(120,86,60,0.14)",
                                    maxHeight: { xs: "88vh", sm: "84vh" },
                                    overflowY: "auto",
                                    scrollbarWidth: "thin",
                                    "&::-webkit-scrollbar": {
                                        width: "8px"
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        background: mode === "dark" ? "rgba(255,255,255,0.18)" : "rgba(120,86,60,0.18)",
                                        borderRadius: "999px"
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        background:
                                            mode === "dark"
                                                ? "radial-gradient(circle at 15% 20%, rgba(242,140,171,0.10), transparent 30%), radial-gradient(circle at 85% 15%, rgba(176,122,161,0.10), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent)"
                                                : "radial-gradient(circle at 15% 20%, rgba(255,111,174,0.12), transparent 30%), radial-gradient(circle at 85% 15%, rgba(140,111,247,0.10), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.55), transparent)"
                                    }}
                                />

                                <Button
                                    onClick={() => setOpenCarta(false)}
                                    startIcon={<CloseRounded />}
                                    sx={{
                                        position: "absolute",
                                        top: { xs: 10, sm: 14 },
                                        right: { xs: 10, sm: 14 },
                                        zIndex: 2,
                                        minWidth: "auto",
                                        borderRadius: "999px",
                                        px: { xs: 1.2, sm: 1.8 },
                                        py: 0.5,
                                        fontSize: { xs: "0.72rem", sm: "0.78rem" },
                                        textTransform: "none",
                                        fontWeight: 900,
                                        color: mode === "dark" ? "#fff" : textColor,
                                        backdropFilter: "blur(10px)",
                                        background:
                                            mode === "dark"
                                                ? "linear-gradient(135deg, rgba(242,140,171,0.22), rgba(176,122,161,0.22))"
                                                : "linear-gradient(135deg, rgba(255,111,174,0.18), rgba(140,111,247,0.18))",
                                        border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.14)" : "rgba(120,86,60,0.12)"}`,
                                        boxShadow:
                                            mode === "dark"
                                                ? "0 8px 18px rgba(0,0,0,0.28)"
                                                : "0 8px 18px rgba(120,86,60,0.10)",
                                        "&:hover": {
                                            transform: "scale(1.05)"
                                        }
                                    }}
                                >
                                    Cerrar
                                </Button>

                                <Stack spacing={{ xs: 1.6, sm: 2.2 }} sx={{ position: "relative", zIndex: 1 }}>
                                    <motion.div
                                        animate={{ y: [0, -4, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: { xs: 58, sm: 72 },
                                                height: { xs: 58, sm: 72 },
                                                mx: "auto",
                                                mb: 0.5,
                                                bgcolor: "rgba(242,140,171,0.14)",
                                                color: palette.pink,
                                                border: `1px solid rgba(242,140,171,0.20)`
                                            }}
                                        >
                                            <FavoriteRounded sx={{ fontSize: { xs: 28, sm: 34 } }} />
                                        </Avatar>
                                    </motion.div>

                                    <Typography
                                        sx={{
                                            fontSize: { xs: "0.68rem", sm: "0.78rem" },
                                            letterSpacing: { xs: 2.5, sm: 4 },
                                            textTransform: "uppercase",
                                            fontWeight: 900,
                                            color: textColor,
                                            opacity: 0.65,
                                            textAlign: "center"
                                        }}
                                    >
                                        carta de cumpleaños
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: { xs: "1.25rem", sm: "1.55rem", md: "1.9rem" },
                                            fontWeight: 1000,
                                            color: textColor,
                                            textAlign: "center"
                                        }}
                                    >
                                        Amor,
                                    </Typography>

                                    <Box
                                        sx={{
                                            width: { xs: 54, sm: 70 },
                                            height: 3,
                                            borderRadius: 999,
                                            mx: "auto",
                                            background: "linear-gradient(90deg, rgba(242,140,171,0.9), rgba(176,122,161,0.9))"
                                        }}
                                    />

                                    <Typography
                                        sx={{
                                            lineHeight: { xs: 1.75, sm: 2 },
                                            color: textColor,
                                            opacity: 0.95,
                                            fontStyle: "italic",
                                            textAlign: "left",
                                            fontSize: { xs: "0.9rem", sm: "0.98rem", md: "1.03rem" }
                                        }}
                                    >
                                        “Feliz cumpleaños a mi vida entera, la razón de mis días y el trozo de mi alma que anda un poco lejos de mí. Desde que te conozco sé que eres diferente, una mujer divertida, capaz de hacer lo que se propone y la alegría de mis días. Sé que quizá hoy no pueda estar contigo, mi niña hermosa, pero créeme que voy a estar contigo en todo momento. Gracias por tanto amor que me das y por hacer sentir a este hombre el más afortunado del mundo al haberme topado a una personita como tú...
                                        <br /><br />
                                        Te podría decir muchas cosas por las cuales estoy enamorado de ti, pero no terminaría nunca. Cada día haces que con tu simple "Buenos días, amor" mi día se ponga feliz y llenes de alegría mi corazón. Sinceramente, amor, no sé cuántas veces te he dicho que te amo, pero créeme que cada día que pasa es más fuerte que el anterior, porque te tengo una mala noticia: este loco cada día está más perdido por ti.
                                        <br /><br />
                                        Quisiera tenerte cerca, abrazarte fuerte y decirte lo mucho que te amo. Eres la pieza fundamental de mi rompecabezas, porque contigo me siento completo. Gracias por existir, amor de mi vida, y recuerda... hoy, mañana y siempre, enamorado tuyo, vida mía.”
                                    </Typography>

                                    <Typography
                                        sx={{
                                            pt: 0.5,
                                            fontWeight: 1000,
                                            color: palette.pink,
                                            textAlign: "center",
                                            fontSize: { xs: "0.92rem", sm: "1rem" }
                                        }}
                                    >
                                        Feliz cumpleaños, hermosa.
                                    </Typography>
                                </Stack>
                            </Paper>
                        </motion.div>
                    </Box>
                </Fade>
            </Modal>

            <Modal
                open={openRegalo}
                onClose={() => setOpenRegalo(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                        sx: {
                            backdropFilter: "blur(12px)",
                            bgcolor: "rgba(0,0,0,0.65)"
                        }
                    }
                }}
            >
                <Fade in={openRegalo} timeout={500}>
                    <Box
                        sx={{
                            position: "fixed",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: { xs: 1.2, sm: 2.5 }
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                            style={{ width: "100%", maxWidth: "500px" }}
                        >
                            <Paper
                                sx={{
                                    p: { xs: 2, sm: 3.2, md: 4.2 },
                                    borderRadius: { xs: 4, sm: 6 },
                                    position: "relative",
                                    overflow: "hidden",
                                    background: paperBg,
                                    border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(120,86,60,0.12)"}`,
                                    textAlign: "center",
                                    boxShadow:
                                        mode === "dark"
                                            ? "0 24px 60px rgba(0,0,0,0.35)"
                                            : "0 24px 50px rgba(120,86,60,0.14)",
                                    maxHeight: { xs: "85vh", sm: "80vh" },
                                    overflowY: "auto",
                                    scrollbarWidth: "thin",
                                    "&::-webkit-scrollbar": {
                                        width: "8px"
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        background: mode === "dark" ? "rgba(255,255,255,0.18)" : "rgba(120,86,60,0.18)",
                                        borderRadius: "999px"
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        background:
                                            mode === "dark"
                                                ? "radial-gradient(circle at 20% 20%, rgba(176,122,161,0.12), transparent 30%), radial-gradient(circle at 80% 20%, rgba(241,211,138,0.10), transparent 30%)"
                                                : "radial-gradient(circle at 20% 20%, rgba(140,111,247,0.12), transparent 30%), radial-gradient(circle at 80% 20%, rgba(88,198,255,0.10), transparent 30%)"
                                    }}
                                />

                                <Button
                                    onClick={() => setOpenRegalo(false)}
                                    startIcon={<CloseRounded />}
                                    sx={{
                                        position: "absolute",
                                        top: { xs: 10, sm: 14 },
                                        right: { xs: 10, sm: 14 },
                                        zIndex: 2,
                                        minWidth: "auto",
                                        borderRadius: "999px",
                                        px: { xs: 1.2, sm: 1.8 },
                                        py: 0.5,
                                        fontSize: { xs: "0.72rem", sm: "0.78rem" },
                                        textTransform: "none",
                                        fontWeight: 900,
                                        color: mode === "dark" ? "#fff" : textColor,
                                        backdropFilter: "blur(10px)",
                                        background:
                                            mode === "dark"
                                                ? "linear-gradient(135deg, rgba(176,122,161,0.22), rgba(241,211,138,0.22))"
                                                : "linear-gradient(135deg, rgba(140,111,247,0.18), rgba(88,198,255,0.18))",
                                        border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.14)" : "rgba(120,86,60,0.12)"}`,
                                        boxShadow:
                                            mode === "dark"
                                                ? "0 8px 18px rgba(0,0,0,0.28)"
                                                : "0 8px 18px rgba(120,86,60,0.10)",
                                        "&:hover": {
                                            transform: "scale(1.05)"
                                        }
                                    }}
                                >
                                    Cerrar
                                </Button>

                                <Stack spacing={{ xs: 1.6, sm: 2.1 }} sx={{ position: "relative", zIndex: 1 }}>
                                    <motion.div
                                        animate={{ rotate: [0, -6, 6, 0], y: [0, -3, 0] }}
                                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: { xs: 62, sm: 78 },
                                                height: { xs: 62, sm: 78 },
                                                mx: "auto",
                                                bgcolor: "rgba(176,122,161,0.15)",
                                                color: palette.purple,
                                                border: `1px solid rgba(176,122,161,0.22)`
                                            }}
                                        >
                                            <CardGiftcardRounded sx={{ fontSize: { xs: 30, sm: 38 } }} />
                                        </Avatar>
                                    </motion.div>

                                    <Typography
                                        sx={{
                                            fontSize: { xs: "0.68rem", sm: "0.78rem" },
                                            letterSpacing: { xs: 2.5, sm: 4 },
                                            textTransform: "uppercase",
                                            fontWeight: 900,
                                            color: textColor,
                                            opacity: 0.65
                                        }}
                                    >
                                        recordatorio especial
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontWeight: 1000,
                                            fontSize: { xs: "1.2rem", sm: "1.45rem", md: "1.7rem" },
                                            color: textColor
                                        }}
                                    >
                                        Tu recordatorio
                                    </Typography>

                                    <Box
                                        sx={{
                                            width: { xs: 54, sm: 70 },
                                            height: 3,
                                            borderRadius: 999,
                                            mx: "auto",
                                            background: "linear-gradient(90deg, rgba(176,122,161,0.9), rgba(241,211,138,0.9))"
                                        }}
                                    />

                                    <Typography
                                        sx={{
                                            lineHeight: { xs: 1.8, sm: 1.95 },
                                            color: textColor,
                                            opacity: 0.94,
                                            fontSize: { xs: "0.92rem", sm: "0.98rem", md: "1.02rem" }
                                        }}
                                    >
                                        Sé que no voy a poder estar contigo en una fecha tan importante para ti como hoy, el día de tu cumpleaños, pero déjame decirte que quiero salir contigo para celebrar la vida de mi hermosa mujer. Así que ya sabes que tienes mi invitación para salir y hacerte pasar un rato de felicidad.
                                    </Typography>
                                </Stack>
                            </Paper>
                        </motion.div>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}

function PaperCard({ children, mode, sx = {} }) {
    return (
        <Paper
            elevation={0}
            sx={{
                position: "relative",
                background: mode === "dark" ? "#22181f" : "#fffaf4",
                borderRadius: 4,
                border: `2px solid ${mode === "dark" ? "rgba(255,255,255,0.07)" : "rgba(90,60,40,0.08)"}`,
                boxShadow: mode === "dark" ? "0 16px 36px rgba(0,0,0,0.24)" : "0 16px 36px rgba(0,0,0,0.10)",
                ...sx
            }}
        >
            {children}
        </Paper>
    );
}

function Tape({ color, top, left, right, rotate = 0 }) {
    return (
        <Box
            sx={{
                position: "absolute",
                top,
                left,
                right,
                width: 70,
                height: 24,
                borderRadius: 1.5,
                background: color,
                opacity: 0.36,
                transform: `rotate(${rotate}deg)`,
                zIndex: 3
            }}
        />
    );
}

function Polaroid({
    children,
    mode,
    palette,
    rotate = 0,
    sx = {},
    tapeProps = {}
}) {
    const textColor = mode === "dark" ? palette.inkDark : palette.inkLight;

    return (
        <Box sx={{ position: "relative" }}>
            <Tape
                color={palette.yellow}
                top={tapeProps.top ?? -10}
                left={tapeProps.left ?? 24}
                right={tapeProps.right}
                rotate={tapeProps.rotate ?? -5}
            />
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    pb: 3,
                    borderRadius: 2,
                    transform: `rotate(${rotate}deg)`,
                    background: mode === "dark" ? "#2b1f27" : "#fffdf9",
                    border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(90,60,40,0.08)"}`,
                    boxShadow: mode === "dark" ? "0 14px 28px rgba(0,0,0,0.20)" : "0 14px 28px rgba(0,0,0,0.12)",
                    color: textColor,
                    ...sx
                }}
            >
                {children}
            </Paper>
        </Box>
    );
}

function BirthdayCakeScene({ mode, palette }) {
    return (
        <Box
            sx={{
                position: "relative",
                width: 220,
                height: 220,
                mx: "auto"
            }}
        >
            {[...Array(10)].map((_, i) => {
                const angle = (360 / 10) * i;
                const radius = 92;
                return (
                    <motion.div
                        key={i}
                        animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.2, 0.85] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.14 }}
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background:
                                i % 3 === 0
                                    ? palette.pink
                                    : i % 3 === 1
                                        ? palette.purple
                                        : palette.yellow,
                            boxShadow:
                                i % 3 === 0
                                    ? `0 0 12px ${palette.pink}`
                                    : i % 3 === 1
                                        ? `0 0 12px ${palette.purple}`
                                        : `0 0 12px ${palette.yellow}`,
                            transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px)`
                        }}
                    />
                );
            })}

            <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 1, 0, -1, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Avatar
                    sx={{
                        width: 110,
                        height: 110,
                        bgcolor: mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.92)",
                        border: "2px solid rgba(0,0,0,0.05)"
                    }}
                >
                    <CakeRounded sx={{ fontSize: 58, color: palette.purple }} />
                </Avatar>
            </motion.div>
        </Box>
    );
}

function CassettePanel({ mode, palette, activeSong, songs, setActiveSong }) {
    const textColor = mode === "dark" ? "#f8eef4" : "#4f355f";

    return (
        <Box
            sx={{
                borderRadius: 5,
                p: 2.2,
                background: mode === "dark" ? "#2a1d25" : "#fff7fb",
                border: `2px solid ${mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                boxShadow:
                    mode === "dark"
                        ? "0 18px 30px rgba(0,0,0,0.22)"
                        : "0 16px 26px rgba(120,86,60,0.08)",
                overflow: "hidden",
                position: "relative",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    opacity: mode === "dark" ? 0.03 : 0.05,
                    backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(0,0,0,0.18) 0.6px, transparent 0.7px),
            radial-gradient(circle at 70% 50%, rgba(0,0,0,0.12) 0.6px, transparent 0.7px)
          `,
                    backgroundSize: "24px 24px, 36px 36px",
                    pointerEvents: "none"
                }
            }}
        >
            <Stack spacing={2} sx={{ position: "relative", zIndex: 1 }}>
                <Stack direction="row" spacing={1.2} alignItems="center">
                    <Avatar
                        sx={{
                            width: 42,
                            height: 42,
                            bgcolor: "rgba(242,140,171,0.14)",
                            color: palette.pink,
                            border: "1px solid rgba(242,140,171,0.18)"
                        }}
                    >
                        <MusicNoteRounded />
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 1000, color: textColor }}>
                            Birthday Playlist 
                        </Typography>
                        <Typography sx={{ fontSize: "0.82rem", color: textColor, opacity: 0.7 }}>
                            Cassette edition
                        </Typography>
                    </Box>
                </Stack>

                <Box
                    sx={{
                        p: 2,
                        borderRadius: 4,
                        background: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(120,86,60,0.03)",
                        border: `1px dashed ${mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(120,86,60,0.16)"}`
                    }}
                >
                    <Typography sx={{ fontWeight: 1000, color: textColor, mb: 1 }}>
                        Ahora sonando
                    </Typography>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSong.ytId}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                        >
                            <Typography sx={{ color: textColor, fontWeight: 900 }}>
                                {activeSong.titulo}
                            </Typography>
                            <Typography sx={{ fontSize: "0.82rem", color: textColor, opacity: 0.72 }}>
                                {activeSong.artista}
                            </Typography>
                        </motion.div>
                    </AnimatePresence>

                    <Box
                        sx={{
                            mt: 1.6,
                            height: 8,
                            borderRadius: 999,
                            overflow: "hidden",
                            bgcolor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(120,86,60,0.08)"
                        }}
                    >
                        <motion.div
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                            style={{
                                width: "40%",
                                height: "100%",
                                borderRadius: 999,
                                background: "linear-gradient(90deg, rgba(242,140,171,0.9), rgba(176,122,161,0.9), rgba(241,211,138,0.9))"
                            }}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        position: "relative",
                        borderRadius: 5,
                        p: 2,
                        background:
                            mode === "dark"
                                ? "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))"
                                : "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(248,239,233,0.95))",
                        border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(120,86,60,0.10)"}`
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "0.72rem",
                            letterSpacing: 2,
                            textTransform: "uppercase",
                            fontWeight: 900,
                            color: textColor,
                            opacity: 0.7,
                            mb: 1.6
                        }}
                    >
                        cassette visual
                    </Typography>

                    <Box
                        sx={{
                            height: 140,
                            borderRadius: 4,
                            position: "relative",
                            background:
                                mode === "dark"
                                    ? "linear-gradient(180deg, #241820 0%, #1a1217 100%)"
                                    : "linear-gradient(180deg, #fffdf9 0%, #f8efe8 100%)",
                            border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(120,86,60,0.10)"}`
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: 18,
                                left: 18,
                                right: 18,
                                height: 34,
                                borderRadius: 2,
                                bgcolor: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(120,86,60,0.06)",
                                display: "flex",
                                alignItems: "center",
                                px: 1.4
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "0.72rem",
                                    fontWeight: 900,
                                    color: textColor,
                                    opacity: 0.78,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}
                            >
                                {activeSong.titulo}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                position: "absolute",
                                top: 68,
                                left: 34,
                                right: 34,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            {[0, 1].map((item) => (
                                <Box
                                    key={item}
                                    sx={{
                                        width: 62,
                                        height: 62,
                                        borderRadius: "50%",
                                        bgcolor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(120,86,60,0.08)",
                                        border: `2px solid ${mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(120,86,60,0.10)"}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        position: "relative"
                                    }}
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        style={{
                                            width: 34,
                                            height: 34,
                                            borderRadius: "50%",
                                            border: `2px solid ${item === 0 ? palette.pink : palette.yellow}`,
                                            position: "relative"
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                background: item === 0 ? palette.pink : palette.yellow,
                                                transform: "translate(-50%, -50%)"
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "8%",
                                                left: "50%",
                                                width: 2,
                                                height: 10,
                                                background: item === 0 ? palette.pink : palette.yellow,
                                                transform: "translateX(-50%)"
                                            }}
                                        />
                                    </motion.div>
                                </Box>
                            ))}
                        </Box>

                        <Box
                            sx={{
                                position: "absolute",
                                left: 92,
                                right: 92,
                                top: 97,
                                height: 6,
                                borderRadius: 999,
                                bgcolor: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(120,86,60,0.08)"
                            }}
                        >
                            <motion.div
                                animate={{ width: ["8%", "75%", "20%"] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                style={{
                                    height: "100%",
                                    borderRadius: 999,
                                    background: "linear-gradient(90deg, rgba(242,140,171,0.8), rgba(176,122,161,0.8))"
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                <Stack spacing={1}>
                    {songs.map((song, i) => {
                        const active = activeSong.ytId === song.ytId;

                        return (
                            <motion.div key={song.ytId} whileTap={{ scale: 0.985 }}>
                                <Button
                                    fullWidth
                                    onClick={() => setActiveSong(song)}
                                    sx={{
                                        justifyContent: "space-between",
                                        textTransform: "none",
                                        borderRadius: 3,
                                        px: 1.5,
                                        py: 1.2,
                                        bgcolor: active
                                            ? "rgba(242,140,171,0.10)"
                                            : mode === "dark"
                                                ? "rgba(255,255,255,0.06)"
                                                : "rgba(255,255,255,0.55)",
                                        border: `1px solid ${
                                            active
                                                ? "rgba(242,140,171,0.35)"
                                                : mode === "dark"
                                                    ? "rgba(255,255,255,0.08)"
                                                    : "rgba(120,86,60,0.08)"
                                        }`,
                                        boxShadow: active
                                            ? "0 10px 22px rgba(242,140,171,0.10)"
                                            : "none"
                                    }}
                                >
                                    <Stack direction="row" spacing={1.1} alignItems="center">
                                        <Avatar
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                fontSize: "0.78rem",
                                                fontWeight: 1000,
                                                bgcolor: active ? "rgba(242,140,171,0.18)" : "rgba(176,122,161,0.12)",
                                                color: active ? palette.pink : palette.purple
                                            }}
                                        >
                                            {i + 1}
                                        </Avatar>

                                        <Box sx={{ textAlign: "left" }}>
                                            <Typography
                                                sx={{
                                                    fontWeight: 900,
                                                    fontSize: "0.88rem",
                                                    color: textColor,
                                                    lineHeight: 1.2
                                                }}
                                            >
                                                {song.titulo}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "0.74rem",
                                                    opacity: 0.72,
                                                    color: textColor
                                                }}
                                            >
                                                {song.artista}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <motion.div
                                        animate={active ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                                        transition={{ duration: 1.4, repeat: active ? Infinity : 0 }}
                                    >
                                        <PlayArrowRounded
                                            sx={{ color: active ? palette.pink : palette.purple }}
                                        />
                                    </motion.div>
                                </Button>
                            </motion.div>
                        );
                    })}
                </Stack>
            </Stack>
        </Box>
    );
}

function PaperTextureBackground({ mode, palette }) {
    return (
        <>
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: mode === "dark" ? "#140d12" : "#f7efe7"
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    opacity: mode === "dark" ? 0.05 : 0.08,
                    backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(0,0,0,0.25) 0.6px, transparent 0.7px),
            radial-gradient(circle at 80% 40%, rgba(0,0,0,0.18) 0.6px, transparent 0.7px),
            radial-gradient(circle at 30% 70%, rgba(0,0,0,0.16) 0.6px, transparent 0.7px)
          `,
                    backgroundSize: "26px 26px, 34px 34px, 42px 42px"
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        mode === "dark"
                            ? "linear-gradient(135deg, rgba(255,255,255,0.03), transparent 30%, rgba(255,255,255,0.02) 60%, transparent 100%)"
                            : "linear-gradient(135deg, rgba(255,255,255,0.55), transparent 30%, rgba(255,255,255,0.25) 60%, transparent 100%)"
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 520,
                    height: 520,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(242,140,171,0.12), transparent 70%)",
                    filter: "blur(90px)"
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    top: "12%",
                    right: "8%",
                    width: 280,
                    height: 280,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(176,122,161,0.12), transparent 70%)",
                    filter: "blur(80px)"
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    bottom: "8%",
                    left: "10%",
                    width: 240,
                    height: 240,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(241,211,138,0.08), transparent 70%)",
                    filter: "blur(80px)"
                }}
            />
        </>
    );
}

function scrapButton(mode, palette, variant) {
    const isPink = variant === "pink";
    return {
        borderRadius: 999,
        px: 2.3,
        py: 1.2,
        textTransform: "none",
        bgcolor: isPink ? "rgba(242,140,171,0.12)" : "rgba(176,122,161,0.12)",
        color: mode === "dark" ? palette.inkDark : palette.inkLight,
        border: `1px solid ${isPink ? "rgba(242,140,171,0.24)" : "rgba(176,122,161,0.24)"}`,
        fontWeight: 900,
        boxShadow: mode === "dark" ? "0 10px 18px rgba(0,0,0,0.14)" : "none"
    };
}