import { Card3Col } from "@/components/Card3Col";
import { Eyebrow } from "@/components/Eyebrow";
import { GlowDot } from "@/components/GlowDot";
import { HeroTitle } from "@/components/HeroTitle";
import { Section } from "@/components/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { InputField } from "@/components/ui/InputField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Body, Caption, Subtitle, Title } from "@/components/ui/Typography";

const featureCards = [
  {
    title: "Automatiza cada lanzamiento",
    body: "Secuencias inteligentes, campañas adaptativas y dashboards que reaccionan en vivo a la conversión.",
    icon: "🚀",
  },
  {
    title: "Branding impecable",
    body: "Bloques visuales, gradientes suaves y tipografías equilibradas listas para personalizar sin código.",
    icon: "✨",
  },
  {
    title: "Colabora en tiempo real",
    body: "Comentarios, aprobaciones y handoff a desarrollo con un clic, todo en un mismo flujo.",
    icon: "🤝",
  },
];

const highlights = [
  {
    title: "+48%",
    subtitle: "Engagement en funnels",
  },
  {
    title: "7x",
    subtitle: "Velocidad de entrega",
  },
  {
    title: "24/7",
    subtitle: "Automatizaciones activas",
  },
];

const steps = [
  {
    title: "Diseña experiencias",
    body: "Arrastra componentes, combina colores pastel y genera layouts fluidos optimizados para mobile first.",
  },
  {
    title: "Conecta tu stack",
    body: "Integra APIs, CRM y analítica con bloques preconfigurados y métricas en tiempo real.",
  },
  {
    title: "Lanza y prueba",
    body: "Publica con un clic, activa tests A/B y mide resultados con dashboards luminosos y claros.",
  },
];

const testimonials = [
  {
    quote:
      "La sensación premium y las animaciones sutiles cambiaron por completo la percepción de nuestro producto.",
    name: "Sofía Ruiz",
    role: "Head of Product, Nova",
  },
  {
    quote: "Todo está centrado, ordenado y preparado para iterar rápido. El equipo lo adoptó en días.",
    name: "Martín Cabrera",
    role: "Growth Lead, Orbit",
  },
];

export default function Home() {
  return (
    <main className="relative flex flex-col gap-16 pb-24 pt-12 sm:gap-20 sm:pb-28 sm:pt-16">
      <div className="container space-y-16 sm:space-y-20">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(16,21,34,0.92),rgba(9,12,22,0.9))] p-7 shadow-[0_25px_90px_rgba(0,0,0,0.55)] sm:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(111,243,197,0.1),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(154,129,255,0.16),transparent_40%),radial-gradient(circle_at_60%_80%,rgba(75,210,255,0.18),transparent_45%)]" />
          <div className="absolute -right-16 top-10 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -left-24 bottom-6 h-52 w-52 rounded-full bg-[var(--color-accent)]/25 blur-3xl" />
          <GlowDot className="right-14 top-12 animate-pulse" />
          <GlowDot className="bottom-16 left-16 animate-[ping_3s_ease-in-out_infinite]" color="var(--color-accent-2)" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <Eyebrow className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 text-white/80">
                Nuevo look & flujo pulido
              </Eyebrow>
              <HeroTitle
                className="max-w-3xl"
                lead="Conecta tus ideas con un diseño que respira. Animaciones suaves, bloques luminosos y call to actions listos para convertir."
              >
                Una landing pastel que vibra con cada scroll
              </HeroTitle>

              <div className="flex flex-wrap gap-4">
                <PrimaryButton className="px-6 py-3 text-base">Empieza gratis</PrimaryButton>
                <SecondaryButton className="px-6 py-3 text-base">Ver recorrido</SecondaryButton>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="floating-card surface relative overflow-hidden rounded-xl border border-white/10 p-5"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_32%)]" />
                    <div className="relative space-y-2">
                      <Title as="p" className="text-2xl sm:text-3xl">
                        {item.title}
                      </Title>
                      <Body className="text-sm text-white/70">{item.subtitle}</Body>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="floating-card surface relative isolate space-y-5 overflow-hidden rounded-2xl border border-white/10 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_15%_15%,rgba(111,243,197,0.16),transparent_38%)]" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <Caption className="text-[var(--color-accent)]">Panel creativo</Caption>
                    <Title as="p" className="text-2xl">
                      Sesión en vivo
                    </Title>
                    <Body className="text-sm text-white/70">
                      Movimientos fluidos y tarjetas de cristal listas para arrastrar.
                    </Body>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">Modo zen</div>
                </div>

                <div className="grid gap-4 rounded-xl bg-white/5 p-4 backdrop-blur">
                  <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-primary/15 via-white/5 to-accentBlue/20 p-4 shadow-inner shadow-black/20">
                    <div>
                      <Body className="text-white">Landing reactiva</Body>
                      <Caption className="text-white/60">Animations on scroll</Caption>
                    </div>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs text-white">Activo</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-white/80">
                    {["Hero", "Sección valores", "CTA final"].map((tag) => (
                      <div key={tag} className="rounded-lg bg-white/5 px-3 py-2 text-center text-xs shadow-inner shadow-black/20">
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {["Pastel glow", "Micro-interacciones", "Métricas"].map((item) => (
                      <div key={item} className="rounded-lg border border-white/10 bg-surface p-3 text-sm text-white/80">
                        <div className="flex items-center justify-between">
                          <span>{item}</span>
                          <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <Subtitle as="p" className="text-lg text-white">
                    Flujo de lanzamiento
                  </Subtitle>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="rounded-lg bg-white/5 p-3 text-sm text-white/80">
                      ✅ Publicado y optimizado
                    </div>
                    <div className="rounded-lg bg-white/5 p-3 text-sm text-white/80">
                      ⚡ Animaciones suaves activas
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Section
          eyebrow="Flow delicioso"
          title="Todo espacioso, centrado y listo para atraer"
          lead="Bloques acolchados, tipografías con aire y gradientes románticos que acompañan la historia de tu producto."
        >
          <div className="mt-6">
            <Card3Col items={featureCards} />
          </div>
        </Section>

        <Section
          eyebrow="Pasos claros"
          title="Tu landing, de idea a producción en minutos"
          lead="Cada paso viene con micro-animaciones y suficiente padding para que el contenido respire en mobile y desktop."
          variant="darker"
        >
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <GlassCard key={step.title} className="floating-card h-full border-white/10 bg-white/5">
                <div className="flex items-center justify-between pb-4">
                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                    Paso {index + 1}
                  </div>
                  <span className="text-primary">✦</span>
                </div>
                <Subtitle as="h3" className="text-xl text-white">
                  {step.title}
                </Subtitle>
                <Body className="pt-2 text-white/70">{step.body}</Body>
              </GlassCard>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Historias reales"
          title="Clientes que sienten la diferencia"
          lead="Los espacios amplios, las transiciones con glow y los CTA flotantes elevan la percepción de calidad."
        >
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {testimonials.map((item) => (
              <GlassCard key={item.name} className="floating-card border-white/10 bg-white/5">
                <Body className="text-lg text-white">“{item.quote}”</Body>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <Subtitle as="p" className="text-white">
                      {item.name}
                    </Subtitle>
                    <Caption className="text-white/60">{item.role}</Caption>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accentBlue shadow-[0_10px_30px_rgba(139,77,247,0.35)]" />
                </div>
              </GlassCard>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Listo para convertir"
          title="Captura leads con un toque suave"
          lead="Formularios centrados, inputs acolchonados y botones brillantes que guían a la acción sin fricción."
          variant="darker"
        >
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <GlassCard className="floating-card border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))]">
              <div className="space-y-4">
                <Subtitle as="h3" className="text-white">
                  Recibe la demo privada
                </Subtitle>
                <Body className="text-white/70">
                  Obtén un recorrido con transiciones guiadas, ejemplos de funnels y templates pastel listos para publicar.
                </Body>
              </div>
              <form className="mt-6 grid gap-4 sm:grid-cols-2">
                <InputField name="name" placeholder="Nombre completo" className="bg-white/10" />
                <InputField type="email" name="email" placeholder="Email de trabajo" className="bg-white/10" />
                <InputField
                  name="company"
                  placeholder="Compañía"
                  className="bg-white/10 sm:col-span-2"
                />
                <PrimaryButton type="submit" className="sm:col-span-2">
                  Enviar y agendar
                </PrimaryButton>
              </form>
            </GlassCard>

            <div className="floating-card surface relative overflow-hidden rounded-2xl border border-white/10 p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(122,184,255,0.14),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(139,77,247,0.12),transparent_38%)]" />
              <div className="relative space-y-4">
                <Caption className="text-[var(--color-accent)]">Checklist de perfección</Caption>
                <Title as="p" className="text-2xl text-white">
                  Alineado, acolchado y responsive
                </Title>
                <div className="space-y-3">
                  {["Grid fluido", "Espaciado amplio", "CTA visibles", "Animaciones suaves"].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3 text-white/80">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/30 text-white shadow-glow">
                        ✓
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
