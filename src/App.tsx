import { useEffect, useState } from "react";

const problemas = [
  {
    n: "01",
    t: "Teto de preço invisível",
    d: "Você quer cobrar mais caro mas ninguém quer pagar, porque o valor do seu trabalho está em entregar arquivos, não em solucionar um problema.",
  },
  {
    n: "02",
    t: "Revisão infinita",
    d: 'Sem estratégia ancorando o projeto, o critério vira o "gosto do cliente" e você vira refém de alterações.',
  },
  {
    n: "03",
    t: "Desvalorizado",
    d: "Você sabe que vale mais, só não consegue provar isso para o cliente. A única autoridade que você tem é um portfólio bonitinho.",
  },
  {
    n: "04",
    t: "Sem um processo claro",
    d: "Sem um fluxo de trabalho documentado, cada cliente novo é uma aventura.",
  },
];

const metodologia = [
  {
    k: "Alma",
    s: "O fundamento estratégico",
    d: "Propósito, posicionamento, arquétipos, personas e brand idea. Sem Alma aprovada, nenhuma outra etapa começa.",
  },
  {
    k: "Voz",
    s: "A marca aprende a falar",
    d: "Tom de voz, glossário, manifesto e tagline construídos a partir do que foi definido na Alma.",
  },
  {
    k: "Corpo",
    s: "O visual como consequência da estratégia",
    d: "Briefing criativo, conceito, moodboard aprovado e identidade visual completa.",
  },
  {
    k: "Vida",
    s: "A marca vai para o mundo",
    d: "Redes sociais, site, papelaria, cada ponto de contato com coerência e critério. Cada aplicação pode virar um novo projeto ou recorrência com o mesmo cliente.",
  },
];

const modulos = [
  { c: "Introdução", t: "O que é branding de verdade", a: "1 aula" },
  { c: "M0", t: "A virada de mentalidade", a: "4 aulas", sub: "A diferença entre executor e estrategista." },
  { c: "M1", t: "A reunião de diagnóstico", a: "3 aulas", sub: "Script que qualifica o lead antes de qualquer proposta." },
  { c: "M2", t: "Proposta comercial", a: "3 aulas", sub: 'Como apresentar, precificar e responder "tá caro".' },
  { c: "M3", t: "Alma", a: "4 aulas", sub: "Briefing, imersão e documento de posicionamento aprovado." },
  { c: "M4", t: "Voz", a: "3 aulas", sub: "Identidade verbal completa com IA como parceiro." },
  { c: "M5", t: "Corpo", a: "3 aulas", sub: "Do briefing criativo ao guia de identidade visual." },
  { c: "M6", t: "Vida", a: "2 aulas", sub: "Ativação, plataforma de marca e entrega com onboarding." },
];

const faq = [
  {
    q: "Preciso ter muita experiência?",
    a: "O curso é para quem já está no mercado e já entregou ao menos alguns projetos de identidade visual. Se você ainda está nos fundamentos, esse não é o ponto de entrada.",
  },
  {
    q: "O curso ensina Illustrator ou Figma?",
    a: "Não. Parte do pressuposto que você já sabe executar. O que entrega é o processo estratégico que vem antes disso.",
  },
  {
    q: "Por quanto tempo tenho acesso?",
    a: "1 ano. Entra no seu ritmo e tem acesso a qualquer atualização que vier durante esse período.",
  },
  {
    q: "Preciso de assinatura do Claude ou ChatGPT?",
    a: "Útil, mas não obrigatório. As etapas funcionam sem IA; ela é um acelerador, não um requisito.",
  },
  {
    q: "A metodologia funciona para qualquer nicho?",
    a: "Sim. A estrutura é o processo; o conteúdo de cada etapa é adaptado ao cliente específico.",
  },
  {
    q: "Tem garantia?",
    a: "7 dias. Pediu reembolso dentro do prazo, devolvemos sem questionamento.",
  },
];

const inclusos = [
  "Script de call de diagnóstico",
  "Script de call de proposta",
  "Template de proposta comercial (prompt IA e Figma)",
  "Checklists de cada etapa do Branding Vivo",
  "Prompts para construção de IA especialista",
  "Template de plataforma de marca",
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCursor() {
  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    const el = document.createElement("div");
    el.className = "tuca-cursor";
    document.body.appendChild(el);
    let x = 0, y = 0, cx = 0, cy = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      const hover = !!t.closest("a, button, [data-hover]");
      el.classList.toggle("hover", hover);
    };
    window.addEventListener("mousemove", move);
    let raf = 0;
    const tick = () => {
      cx += (x - cx) * 0.25;
      cy += (y - cy) * 0.25;
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      el.remove();
    };
  }, []);
}

export default function App() {
  useReveal();
  useCursor();
  const [openMet, setOpenMet] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0D0D0D", color: "#fff" }}>
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: "rgba(13,13,13,0.7)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2" data-hover>
            <span className="block w-2.5 h-2.5 bg-red" />
            <span className="font-display text-lg tracking-tight uppercase">Tuca Lab</span>
          </a>
          <a
            href="#oferta"
            data-hover
            className="text-sm font-medium px-5 py-2.5 bg-red text-white hover:-translate-y-0.5 transition-transform"
          >
            Quero entrar no curso
          </a>
        </div>
      </header>

      <main id="top" className="pt-24">
        {/* HERO */}
        <section className="mx-auto max-w-7xl px-6 pt-20 pb-32 md:pt-32 md:pb-48">
          <div className="reveal">
            <div className="text-sm uppercase tracking-[0.3em] text-red mb-8">— Curso · Tuca Lab</div>
            <h1 className="font-display uppercase text-[12vw] md:text-[8vw] leading-[0.85] tracking-tight">
              Metodologia
              <br />
              <span className="text-red">Branding</span> Vivo
            </h1>
            <p className="mt-10 max-w-2xl text-xl md:text-2xl text-white/80 leading-snug">
              Metodologia para criar marcas desejáveis, com personalidade e sem um processo chato pra krlho
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <a
                href="#oferta"
                data-hover
                className="inline-flex items-center gap-3 bg-red px-7 py-4 text-base font-medium hover:-translate-y-1 transition-transform"
              >
                Quero entrar no curso
                <span aria-hidden>→</span>
              </a>
              <div className="text-white/70">
                <span className="font-display text-2xl text-white">R$ 197</span>
                <span className="mx-2 text-white/40">·</span>
                <span>Acesso por 1 ano</span>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEMA */}
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
            <div className="reveal mb-16 md:mb-24">
              <div className="text-sm uppercase tracking-[0.3em] text-red mb-4">— O problema</div>
              <h2 className="font-display text-5xl md:text-7xl uppercase">
                Reconhece alguma
                <br /> dessas situações?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-px bg-white/10">
              {problemas.map((p) => (
                <div
                  key={p.n}
                  className="reveal bg-[#0D0D0D] p-10 md:p-14 hover:bg-[#141414] transition-colors"
                  data-hover
                >
                  <div className="font-display text-red text-3xl mb-6">{p.n}</div>
                  <h3 className="font-display text-2xl md:text-3xl uppercase mb-4">{p.t}</h3>
                  <p className="text-white/70 leading-relaxed">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BRANDING VIVO */}
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
            <div className="reveal mb-16">
              <div className="text-sm uppercase tracking-[0.3em] text-red mb-4">— Branding Vivo</div>
              <h2 className="font-display text-5xl md:text-7xl uppercase max-w-4xl">
                O processo em <span className="text-red">quatro etapas</span>, do fundamento à ativação
              </h2>
              <p className="mt-8 max-w-3xl text-lg text-white/70 leading-relaxed">
                Estratégia antes de estética. A paleta tem origem no posicionamento. A tipografia tem
                lógica no tom de voz. O símbolo tem raiz na Alma. Tudo conectado porque existe algo
                para conectar.
              </p>
            </div>

            {/* Accordion etapas */}
            <div className="reveal border-t border-white/10">
              {metodologia.map((m, i) => {
                const open = openMet === i;
                return (
                  <div key={m.k} className="border-b border-white/10">
                    <button
                      data-hover
                      onClick={() => setOpenMet(open ? null : i)}
                      className="w-full flex items-center justify-between gap-6 py-8 md:py-10 text-left group"
                    >
                      <div className="flex items-baseline gap-6 md:gap-10">
                        <span className="font-display text-red text-xl md:text-2xl w-10">0{i + 1}</span>
                        <span className="font-display uppercase text-4xl md:text-6xl group-hover:text-red transition-colors">
                          {m.k}
                        </span>
                        <span className="hidden md:block text-white/50">{m.s}</span>
                      </div>
                      <span
                        className="font-display text-3xl text-red transition-transform"
                        style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}
                      >
                        +
                      </span>
                    </button>
                    <div
                      style={{
                        maxHeight: open ? 400 : 0,
                        opacity: open ? 1 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.5s ease, opacity 0.4s ease",
                      }}
                    >
                      <p className="pb-10 md:pb-12 md:pl-24 max-w-3xl text-lg text-white/75 leading-relaxed">
                        {m.d}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Módulos */}
            <div className="reveal mt-24">
              <h3 className="font-display text-3xl md:text-4xl uppercase mb-10">
                23 aulas em 8 módulos, <span className="text-red">do mindset ao onboarding de entrega.</span>
              </h3>
              <ul className="border-t border-white/10">
                {modulos.map((m) => (
                  <li
                    key={m.c}
                    data-hover
                    className="group border-b border-white/10 py-6 md:py-7 flex flex-col md:flex-row md:items-center gap-2 md:gap-8 hover:bg-[#141414] hover:pl-6 transition-all"
                  >
                    <span className="font-display text-red w-32 shrink-0 text-lg">{m.c}</span>
                    <div className="flex-1">
                      <div className="font-display uppercase text-xl md:text-2xl group-hover:translate-x-1 transition-transform inline-block">
                        {m.t}
                      </div>
                      {m.sub && <div className="text-white/60 text-sm mt-1">{m.sub}</div>}
                    </div>
                    <span className="text-white/50 text-sm uppercase tracking-wider">{m.a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* PARA QUEM É */}
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
            <div className="reveal mb-16">
              <div className="text-sm uppercase tracking-[0.3em] text-red mb-4">— Para quem é</div>
              <h2 className="font-display text-5xl md:text-7xl uppercase">É para você se...</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 reveal">
              <p className="text-lg md:text-xl text-white/85 leading-relaxed border-l-2 border-red pl-6">
                Você já está no mercado, entrega trabalho com qualidade visual e sente que cobra
                abaixo do que deveria, mas não sabe como justificar um aumento sem mudar o que
                entrega.
              </p>
              <p className="text-lg md:text-xl text-white/85 leading-relaxed border-l-2 border-red pl-6">
                Você começa cada projeto do zero, perde cliente para designer mais barato e na
                reunião de proposta ainda não sabe exatamente o que dizer quando o silêncio vem
                depois do preço.
              </p>
            </div>
            <div className="reveal mt-16 p-8 md:p-10 bg-[#141414] border border-white/10">
              <div className="font-display uppercase text-red text-sm tracking-[0.3em] mb-3">
                Não é para você
              </div>
              <p className="text-lg text-white/80">
                Se ainda está aprendendo os softwares ou quer técnica de execução visual. O curso
                parte do pressuposto que você já sabe fazer.
              </p>
            </div>
          </div>
        </section>

        {/* OFERTA */}
        <section id="oferta" className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
            <div className="reveal grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <div className="text-sm uppercase tracking-[0.3em] text-red mb-4">— Oferta</div>
                <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.9]">
                  Metodologia <span className="text-red">Branding Vivo</span>
                </h2>
                <div className="mt-10 flex items-baseline gap-5">
                  <span className="text-white/40 text-2xl line-through font-display">R$ 397</span>
                  <span className="font-display text-6xl md:text-7xl">R$ 197</span>
                </div>
                <div className="mt-3 text-white/70">Acesso por 1 ano · Acesso imediato</div>
                <a
                  href="#"
                  data-hover
                  className="mt-10 inline-flex items-center gap-3 bg-red px-8 py-5 text-lg font-medium hover:-translate-y-1 transition-transform"
                >
                  Entrar no curso agora
                  <span aria-hidden>→</span>
                </a>
                <p className="mt-6 text-sm text-white/60">
                  7 dias de garantia. Se não for o que esperava, devolvemos o valor integral.
                </p>
              </div>
              <div className="bg-[#141414] border border-white/10 p-8 md:p-10">
                <div className="font-display uppercase tracking-wider text-red text-sm mb-6">
                  Inclusos
                </div>
                <ul className="space-y-4">
                  {inclusos.map((i) => (
                    <li key={i} className="flex gap-4 items-start text-white/85">
                      <span className="text-red mt-2 block w-2 h-2 bg-red shrink-0" />
                      <span className="text-base md:text-lg">{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
            <div className="reveal mb-16">
              <div className="text-sm uppercase tracking-[0.3em] text-red mb-4">— FAQ</div>
              <h2 className="font-display text-5xl md:text-7xl uppercase">Perguntas</h2>
            </div>
            <div className="reveal border-t border-white/10">
              {faq.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={f.q} className="border-b border-white/10">
                    <button
                      data-hover
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full flex items-center justify-between gap-6 py-7 text-left group"
                    >
                      <span className="font-display uppercase text-xl md:text-2xl group-hover:text-red transition-colors">
                        {f.q}
                      </span>
                      <span
                        className="text-red text-2xl transition-transform shrink-0"
                        style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}
                      >
                        +
                      </span>
                    </button>
                    <div
                      style={{
                        maxHeight: open ? 300 : 0,
                        opacity: open ? 1 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.5s ease, opacity 0.4s ease",
                      }}
                    >
                      <p className="pb-7 max-w-3xl text-white/75 leading-relaxed text-lg">{f.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
              <div>
                <div className="font-display uppercase text-5xl md:text-7xl">
                  Tuca <span className="text-red">Lab</span>
                </div>
                <p className="mt-4 text-white/70 max-w-md">
                  Criado por Tuca, fundador da Agência Tuca · Marcas vivas. Conexões reais.
                </p>
              </div>
              <div className="text-white/50 text-sm">© 2025</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
