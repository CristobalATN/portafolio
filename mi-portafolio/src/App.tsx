
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  FileDown,
  Cpu,
  Code2,
  TerminalSquare,
  Sparkles,
  LaptopMinimalCheck,
  Rocket,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * Portafolio base minimalista para profesional TI
 * - Diseño elegante con alto contraste, animaciones sutiles y micro-interacciones
 * - Estructura pensada para reemplazar fácilmente textos, enlaces e imágenes
 * - Sección de proyectos con filtros, experiencia, habilidades y contacto
 * - Modo oscuro/claro, acentos de color personalizables
 */

const profile = {
  name: "Tu Nombre",
  role: "Ingeniero de Software / DevOps",
  tagline:
    "Construyo soluciones escalables y accesibles con foco en calidad, seguridad y experiencia de usuario.",
  location: "Santiago, Chile",
  email: "tu@email.com",
  github: "https://github.com/usuario",
  linkedin: "https://www.linkedin.com/in/usuario/",
  cvUrl: "#",
};

const skills = [
  { name: "Backend", items: ["Node.js", "Python", "Go", "REST", "GraphQL"] },
  { name: "Frontend", items: ["React", "Next.js", "Tailwind", "Vite", "A11y"] },
  { name: "DevOps", items: ["Docker", "Kubernetes", "CI/CD", "AWS", "Terraform"] },
  { name: "Calidad", items: ["TDD", "Jest", "Playwright", "SonarQube", "Sentry"] },
];

const allTags = ["frontend", "backend", "devops", "ui", "api", "data"] as const;

const projects: Array<{
  title: string;
  description: string;
  tags: typeof allTags[number][];
  link?: string;
  repo?: string;
}> = [
  {
    title: "Dashboard de Observabilidad",
    description:
      "Panel en tiempo real con métricas, trazas y logs. Integración con OpenTelemetry y alertas.",
    tags: ["devops", "backend", "ui"],
    link: "#",
    repo: "#",
  },
  {
    title: "Generador de Portafolios",
    description:
      "CLI + plantilla para crear portafolios rápidos con React, Tailwind y despliegue serverless.",
    tags: ["frontend", "ui"],
    link: "#",
    repo: "#",
  },
  {
    title: "API de Pagos",
    description:
      "Servicio de pagos idempotente con Webhooks firmados, JWT y rate limiting.",
    tags: ["backend", "api"],
    link: "#",
    repo: "#",
  },
  {
    title: "Pipeline ML",
    description:
      "Ingesta y entrenamiento programado con orquestación, pruebas de datos y monitoreo de drift.",
    tags: ["data", "backend", "devops"],
    link: "#",
    repo: "#",
  },
];

const experience = [
  {
    role: "Senior Software Engineer",
    company: "Empresa X",
    period: "2022 — Presente",
    bullets: [
      "Diseñé arquitectura de microservicios con observabilidad end-to-end.",
      "Reduje costos de infraestructura en 28% migrando a autoscaling eficiente.",
    ],
  },
  {
    role: "DevOps Engineer",
    company: "Empresa Y",
    period: "2020 — 2022",
    bullets: [
      "Implementé CI/CD con estrategias de despliegue blue/green y canary.",
      "Aceleré el time-to-market un 35% automatizando pruebas y revisiones.",
    ],
  },
];

// Paleta de acentos (elige una)
const ACCENTS = [
  "from-fuchsia-500 via-violet-500 to-indigo-500",
  "from-cyan-500 via-sky-500 to-blue-500",
  "from-emerald-500 via-lime-500 to-teal-500",
  "from-rose-500 via-pink-500 to-orange-500",
];

export default function PortfolioMinimal() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [accentIndex, setAccentIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<typeof allTags[number][]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const text = (p.title + " " + p.description).toLowerCase();
      const matchQuery = q ? text.includes(q) : true;
      const matchTags = activeTags.length
        ? activeTags.every((t) => p.tags.includes(t))
        : true;
      return matchQuery && matchTags;
    });
  }, [query, activeTags]);

  const accent = ACCENTS[accentIndex % ACCENTS.length];

  return (
    <div className={`min-h-screen ${
      theme === "dark" ? "bg-neutral-950 text-neutral-100" : "bg-white text-neutral-900"
    } transition-colors duration-300`}
    >
      {/* Glow de acento */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 opacity-40 blur-3xl -z-10 bg-gradient-to-br ${accent}`}
      />

      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-neutral-950/40 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">CC</span>
            <span className="sr-only">Inicio</span>
          </a>
          <nav className="hidden md:flex gap-6 text-sm">
            {[
              ["Sobre mí", "#about"],
              ["Habilidades", "#skills"],
              ["Proyectos", "#projects"],
              ["Experiencia", "#experience"],
              ["Contacto", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white rounded"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cambiar tema"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              className="rounded-xl"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cambiar acento"
              onClick={() => setAccentIndex((i) => (i + 1) % ACCENTS.length)}
              className="rounded-xl"
            >
              <Sparkles className="h-5 w-5" />
            </Button>
            <a href={profile.cvUrl} target="_blank" rel="noreferrer">
              <Button className="rounded-xl">CV <FileDown className="ml-2 h-4 w-4" /></Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="mx-auto max-w-6xl px-4 pt-16 pb-20">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]"
            >
              {profile.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-4 text-xl opacity-90"
            >
              {profile.role}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 max-w-2xl text-base opacity-80"
            >
              {profile.tagline}
            </motion.p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`}>
                <Button className="rounded-xl">Hablemos <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-xl"><Github className="mr-2 h-4 w-4"/>GitHub</Button>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-xl"><Linkedin className="mr-2 h-4 w-4"/>LinkedIn</Button>
              </a>
            </div>
          </div>
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${accent} p-[1px]`}
            >
              <div className="rounded-[22px] bg-white/70 dark:bg-neutral-950/70 p-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-black/90 dark:bg-white/90 flex items-center justify-center">
                    <LaptopMinimalCheck className="h-6 w-6 text-white dark:text-black" />
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Disponible para proyectos</p>
                    <p className="font-medium">{profile.location}</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-2 text-sm opacity-80">
                  <li className="flex items-center gap-2"><Cpu className="h-4 w-4"/> Arquitecturas escalables</li>
                  <li className="flex items-center gap-2"><Code2 className="h-4 w-4"/> Código limpio y probado</li>
                  <li className="flex items-center gap-2"><TerminalSquare className="h-4 w-4"/> Automatización y CI/CD</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sobre mí */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5"/> Sobre mí
              </CardTitle>
            </CardHeader>
            <CardContent className="leading-relaxed text-sm md:text-base opacity-90">
              Profesional TI con experiencia en diseño, desarrollo y operación de sistemas modernos. Me apasiona construir interfaces accesibles, backends robustos y pipelines confiables.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Contacto rápido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <a className="group flex items-center justify-between rounded-xl border border-white/10 px-3 py-2 hover:bg-white/60 hover:dark:bg-neutral-800/60 transition">
                  <span className="flex items-center gap-2 opacity-90"><Mail className="h-4 w-4"/> {profile.email}</span>
                  <ChevronRight className="h-4 w-4 opacity-60 group-hover:translate-x-0.5 transition-transform"/>
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-xl border border-white/10 px-3 py-2 hover:bg-white/60 hover:dark:bg-neutral-800/60 transition">
                  <span className="flex items-center gap-2 opacity-90"><Linkedin className="h-4 w-4"/> LinkedIn</span>
                  <ExternalLink className="h-4 w-4 opacity-60"/>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Habilidades */}
      <section id="skills" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Habilidades</h2>
          <p className="text-sm opacity-70">Pasa el cursor para ver el efecto</p>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {skills.map((group) => (
            <motion.div
              key={group.name}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`rounded-2xl border border-white/10 p-[1px] bg-gradient-to-br ${accent}`}
            >
              <div className="rounded-[15px] bg-white/70 dark:bg-neutral-950/70 p-5">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4"/> {group.name}
                </h3>
                <ul className="text-sm opacity-80 space-y-1">
                  {group.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Proyectos con búsqueda y filtros */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between mb-6">
          <h2 className="text-xl font-semibold">Proyectos</h2>
          <div className="flex flex-1 items-center gap-2 md:justify-end">
            <Input
              placeholder="Buscar por nombre o descripción…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="max-w-sm rounded-xl"
            />
            <div className="flex flex-wrap gap-2">
              {allTags.map((t) => {
                const active = activeTags.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() =>
                      setActiveTags((arr) =>
                        active ? arr.filter((x) => x !== t) : [...arr, t]
                      )
                    }
                    className={`text-xs rounded-full border px-3 py-1 transition ${
                      active
                        ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                        : "border-white/20 hover:border-white/40"
                    }`}
                  >
                    #{t}
                  </button>
                );
              })}
              {activeTags.length > 0 && (
                <button
                  onClick={() => setActiveTags([])}
                  className="text-xs rounded-full border px-3 py-1 border-white/20 hover:border-white/40"
                >
                  limpiar
                </button>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          <div className="grid md:grid-cols-2 gap-4">
            {filteredProjects.map((p) => (
              <motion.a
                key={p.title}
                href={p.link || p.repo || "#"}
                target="_blank"
                rel="noreferrer"
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="group rounded-2xl border border-white/10 overflow-hidden"
              >
                <div className={`h-1 w-full bg-gradient-to-r ${accent}`} />
                <div className="p-5 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-lg group-hover:underline underline-offset-4 decoration-from-font">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm opacity-80">{p.description}</p>
                    </div>
                    <ExternalLink className="shrink-0 h-4 w-4 opacity-60 mt-1"/>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs rounded-full border px-2 py-0.5 border-white/20 opacity-80">#{t}</span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
            {filteredProjects.length === 0 && (
              <Card className="rounded-2xl border-white/10">
                <CardContent className="p-8 text-center opacity-70">
                  Sin resultados. Prueba con otros filtros.
                </CardContent>
              </Card>
            )}
          </div>
        </AnimatePresence>
      </section>

      {/* Experiencia */}
      <section id="experience" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl font-semibold mb-6">Experiencia</h2>
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10" aria-hidden />
          <ul className="space-y-6">
            {experience.map((e) => (
              <li key={e.role} className="relative pl-10">
                <span className={`absolute left-0 top-1.5 h-3 w-3 rounded-full ring-4 ring-white/10 bg-gradient-to-br ${accent}`} />
                <div className="rounded-2xl border border-white/10 bg-white/50 dark:bg-neutral-900/40 backdrop-blur p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{e.role} · {e.company}</p>
                    <p className="text-sm opacity-70">{e.period}</p>
                  </div>
                  <ul className="mt-3 list-disc pl-5 text-sm opacity-90 space-y-1">
                    {e.bullets.map((b, i) => (<li key={i}>{b}</li>))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contacto */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div>
            <h2 className="text-xl font-semibold">Trabajemos juntos</h2>
            <p className="mt-2 text-sm opacity-80 max-w-prose">
              ¿Tienes una idea o proyecto? Envíame un mensaje y te responderé pronto.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 text-sm underline underline-offset-4 opacity-90 hover:opacity-100">
                <Mail className="h-4 w-4"/> {profile.email}
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm underline underline-offset-4 opacity-90 hover:opacity-100">
                <Github className="h-4 w-4"/> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm underline underline-offset-4 opacity-90 hover:opacity-100">
                <Linkedin className="h-4 w-4"/> LinkedIn
              </a>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Envíame un mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Gracias por tu mensaje ✨");
                }}
                className="space-y-3"
              >
                <Input required placeholder="Nombre" className="rounded-xl" />
                <Input required type="email" placeholder="Email" className="rounded-xl" />
                <Textarea required placeholder="Tu mensaje" className="rounded-xl" rows={5} />
                <Button type="submit" className="rounded-xl">Enviar</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm opacity-70 flex flex-wrap items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {profile.name}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <a href={profile.github} className="underline underline-offset-4">GitHub</a>
            <span>·</span>
            <a href={profile.linkedin} className="underline underline-offset-4">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
