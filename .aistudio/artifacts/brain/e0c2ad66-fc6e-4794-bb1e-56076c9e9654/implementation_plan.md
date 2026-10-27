# Reformulação do Layout: Modo Escuro LeGestão (Le Jardin & VJ Eventos)

Modernização completa da identidade visual do LeGestão, migrando para uma experiência escura de alto padrão (*dark luxury*), com base preta profunda, detalhes em dourado nobre e tons de verde botânico Le Jardin, mantendo compatibilidade e controle de alternância para o modo claro.

## User Review & Critical Decisions

> [!IMPORTANT]
> Decisões confirmadas com o usuário no alinhamento inicial:

- **Paleta e Tom Visual**: Preto absoluto (`#090c0a` a `#121614`) enriquecido com toques de dourado champagne (`#c5a059` / `#d8b775`) e verde-escuro aristocrático (`#1b3b2b`).
- **Comportamento do Tema**: Tema escuro ativo por padrão com botão interativo no cabeçalho/sidebar para alternar entre os modos Escuro e Claro, persistido no navegador (`localStorage`).
- **Nível de Modernização**: Novo design com cartões refinados, bordas de 1px sutis com micro-gradientes, tipografia calibrada para leitura óptica noturna, e acabamento contemporâneo sem ruído visual.

---

## 1. Overview & Core Concept

- **O que entrega**: Uma transformação visual completa em todas as telas do sistema — Login dos parceiros Le Jardin + VJ, Dashboard executivo de eventos, Gestão de Estoque, Gestão de Equipe & Escalas, Calendário de Montagem e Modais de criação/edição.
- **Público-alvo**: Gestores, produtores executivos e coordenadores de eventos das marcas Le Jardin Flores e VJ Eventos em tablets, notebooks e celulares em ambientes de backstage e escritório.
- **Valor Principal**: Interface elegante de alto contraste, ergonômica para baixa luminosidade em eventos, com forte identidade de marca e estética premium.

---

## 2. User Experience & Visual Design

### Fluxos Visuais Principais
1. **Tela de Login / Autenticação**:
   - Fundo em preto profundo com atmosfera cinematográfica e sutil halo botânico.
   - Vitrine de marcas parceiras (Le Jardin + VJ) destacadas com tipografia serifada sofisticada e detalhes dourados.
   - Card de login translúcido refinado com inputs escuros de alta legibilidade.
2. **Dashboard & Navegação**:
   - **Sidebar**: Fundo preto grafite (`#0f1311`), itens de navegação com iluminação dourada e verde-escuro suave no estado ativo.
   - **Topbar**: Breadcrumbs limpos, indicador de status e o **Seletor de Tema (Sol/Lua)** para alternar entre Dark e Light instantaneamente.
   - **Banner de Boas-Vindas**: Cartão hero escuro com tipografia serifada em destaque e botão de ação rápido.
   - **Grade de Métricas (KPIs)**: Cartões escuros com borda hairline (`#222a24`), números tabulares em alto contraste e ícones discretos.
   - **Quadros de Tarefas e Agenda**: Listas de alta densidade com hover suave e badges contextuais legíveis.
3. **Modais e Formulários**:
   - Superfície modal com backdrop escuro (`rgba(0,0,0,0.85)`), campos com bordas nítidas e contraste WCAG AA.

### Tokens de Cor & Estética
- **60% Fundo Dominante**: Preto absoluto e obsidiana (`#090c0a` no canvas, `#111613` nas superfícies estruturais).
- **30% Estrutura & Superfícies**: Cartões em `#151b17` com bordas sutis em `#243028` e divisores ultrafinos.
- **10% Acentos Nobres**: Dourado champagne (`#c5a059`, hover `#d8b775`) nos botões primários e detalhes; Verde-escuro botânico (`#1b3b2b`) para destaque de marca.
- **Tipografia**:
  - Títulos e cabeçalhos: Serif clássico (*Georgia / Cormorant style*) para transmitir o requinte floral e de produção do Le Jardin.
  - Corpo e controles: Sans-serif legível e moderno (*Inter / System-UI*) com números tabulares (`tabular-nums`) para dados e horários.

---

## 3. Key Product Decisions & Trade-Offs

- **Decisão 1: Arquitetura do Tema (Dark por padrão com CSS Variables + Classe `.theme-dark` / `.theme-light`)**
  - *Abordagem*: Centralizar as variáveis e regras no CSS global de modo que o HTML tenha `data-theme="dark"` (ou classe `dark`) por padrão, suportando alternância em tempo real com script leve no cliente.
  - *Por que*: Permite que todos os componentes existentes recebam o novo visual escuro instantaneamente sem quebrar a lógica de negócio ou estados do Supabase/Vite recuperado.
  - *Alternativas*: Reescrever cada tela do zero levaria a perda de funcionalidades já compiladas do bundle. O desacoplamento por design system e injeção do botão de alternância oferece 100% de integridade com visual renovado.

- **Decisão 2: Botão de Alternância de Tema Flutuante / Integrado**
  - *Abordagem*: Adicionar um botão discreto e elegante com ícones Sol/Lua no topo da interface e na tela de login, sincronizado com `localStorage`.
  - *Por que*: O usuário solicitou expressamente a possibilidade de alternar entre modo claro e escuro, garantindo flexibilidade total para diferentes iluminações no dia a dia.

---

## 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────┐
│                   Cliente / Navegador                    │
│                                                          │
│  ┌─────────────────┐             ┌─────────────────────┐ │
│  │   ThemeToggle   │ ──────────► │    LocalStorage     │ │
│  │  (Sol / Lua)    │             │   ('theme': 'dark') │ │
│  └────────┬────────┘             └──────────┬──────────┘ │
│           │                                 │            │
│           ▼                                 ▼            │
│  ┌─────────────────────────────────────────────────────┐ │
│  │        document.documentElement [data-theme]        │ │
│  │                                                     │ │
│  │  - CSS Custom Properties (--bg, --card, --accent)   │ │
│  │  - Dark Theme Defaults: #090c0a, #151b17, #c5a059   │ │
│  │  - Light Theme Fallbacks: #f5f6f2, #ffffff, #203d2b │ │
│  └─────────────────────────┬───────────────────────────┘ │
│                            │                             │
│                            ▼                             │
│  ┌─────────────────────────────────────────────────────┐ │
│  │             LeGestão Application Views              │ │
│  │                                                     │ │
│  │  ├── Login Screen (Dark Luxury Brand Split)        │ │
│  │  ├── Topbar & Sidebar (Dark Obsidiana)              │ │
│  │  ├── Dashboard (Welcome Banner, KPI Cards)          │ │
│  │  ├── Eventos & Montagem (Agenda & Timeline)         │ │
│  │  ├── Estoque & Insumos (Refined Table Grids)        │ │
│  │  └── Equipe & Escalas (Task Boards & Statuses)      │ │
│  └─────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

### Mapeamento de Modificações
1. **`app/globals.css`**:
   - Definição completa das variáveis temáticas escuras por padrão (`data-theme="dark"` / `:root`).
   - Cores de fundo `#090c0a`, cartões `#141916`, bordas `#242f27`, textos primários `#f0f3f1`, textos secundários `#98a89d`.
   - Botões primários com gradiente dourado nobre (`#c5a059` -> `#ad8a42`) com texto escuro e alto contraste.
   - Refinamento de elevação, sombras e raio de curvatura dos cartões.
   - Estilização do interruptor de tema moderno (Theme Toggle).
2. **`app/layout.tsx`**:
   - Atributos `data-theme="dark"` no elemento `<html>` e `theme-color: "#090c0a"`.
   - Injeção do script de inicialização do tema para evitar qualquer flicker de tela branca.
   - Componente de alternância de tema no Topbar / canto superior.
3. **`public/assets/index-18acEcHu.css`**:
   - Sincronização dos estilos atualizados para os assets servidos estaticamente.
