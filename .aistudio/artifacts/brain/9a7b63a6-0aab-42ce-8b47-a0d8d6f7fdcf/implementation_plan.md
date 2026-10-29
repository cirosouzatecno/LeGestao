# Reestruturação Completa: V J Produções e Eventos

Plataforma profissional unificada para a V J Produções e Eventos, integrando o site institucional público de alto padrão (com portfólio, galerias e solicitação de orçamento via WhatsApp) ao painel administrativo executivo para gestão de eventos em 14 etapas de pipeline, CRM de clientes, agenda inteligente com detecção de conflitos, escalas operacionais, acervo de materiais e controle financeiro por evento com persistência em tempo real no Firebase Firestore.

***

### User Review & Critical Decisions

> [!IMPORTANT]
> As três decisões fundamentais de arquitetura foram alinhadas na Fase 1 e orientam toda a estrutura desta reestruturação:

- **Estrutura de Rotas e Navegação**: O site institucional público permanece na rota principal (`/`), garantindo a vitrine digital, autoridade de marca, SEO e canais de contato. O painel administrativo completo de gestão operacional e comercial fica concentrado sob a rota protegida `/dashboard`, com navegação lateral modular, autenticação integrada e alternância de temas (dark/light).
- **Estratégia de Persistência e Dados**: O Firebase Firestore (`ai-studio-legestao-e0c2ad66-fc6e-4794-bb1e-56076c9e9654`) atuará como backend em tempo real com listeners ativos (`onSnapshot`), regras de segurança consolidadas e tolerância a falhas através de fallback local em memória quando offline.
- **Prioridade de Entrega Inicial**: Ciclo completo de vida dos eventos com CRM integrado, pipeline comercial e operacional em 14 estágios e calendário interativo com detecção de conflitos de datas, locais e equipe.

***

### 1. Overview & Core Concept

- **O que a solução entrega**: Uma suíte de software completa para a produtora de eventos de luxo e corporativos. De um lado, uma experiência pública institucional refinada que converte visitantes em clientes (apresentação de cenografia, iluminação cênica, sonorização, mobiliário e decoração). Do outro, um sistema operacional de nível empresarial onde diretores, produtores, decoradores e técnicos coordenam todo o ciclo de vida dos projetos.
- **Público-alvo**: Clientes corporativos, noivos, debutantes e promotores (na área pública); Diretoria Executiva, Coordenadores Técnicos, Floristas, Mestres de Cerimônia, Financeiro e Equipe de Apoio (no painel restrito).
- **Valor Principal**: Eliminação de gargalos operacionais e perda de informações entre o primeiro contato comercial e a desmontagem final do evento, com rastreabilidade de custos, alocação de estoque sem overbooking e agenda centralizada.

***

### 2. User Experience & Visual Design

#### Fluxos Principais do Usuário

1. **Jornada Pública (Visitante & Cliente Potencial)**:
   - Acesso à Home da V J Produções e Eventos com apresentação institucional e vídeo/galeria de destaque.
   - Navegação pelo portfólio categorizado (Casamentos, Corporativo, 15 Anos, Festas Sociais, Iluminação & Cenografia).
   - Consulta sobre a história da marca, diferenciais técnicos e depoimentos verificados.
   - Solicitação direta de proposta comercial através de formulário interativo de briefing ou clique para WhatsApp pré-formatado.
   - Acesso seguro ao portal do colaborador/administrador via botão sutil na barra superior ou rodapé.

2. **Jornada Administrativa (Produtor & Gestor)**:
   - Login no painel com e-mail/senha ou Google Auth protegido por perfis de acesso (Admin, Produtor, Comercial, Técnico).
   - Dashboard Executivo com indicadores consolidados: faturamento do mês, saldo a receber, eventos ativos, taxa de conversão e alertas de estoque.
   - Central de Eventos em visualização dupla (Kanban nos 14 estágios do ciclo de vida e Tabela densa com filtros avançados).
   - Calendário Operacional interativo com visualizações Mensal, Semanal e Lista, alertando sobre montagens simultâneas e conflitos de equipe.
   - CRM de Clientes com histórico de reuniões, propostas geradas e eventos contratados.
   - Alocação e Reserva de Materiais (som, luz, estruturas, vasos e acervo floral) com cálculo automático de saldo disponível.
   - Fechamento Financeiro com cálculo de margem real por projeto (receitas recebidas vs. despesas efetuadas).

#### Identidade Visual & Tema

- **Direção Estética**: Luxo contemporâneo, sóbrio e editorial. Inspirado no universo da alta cenografia, espetáculos de iluminação arquitetônica e arquitetura efêmera.
- **Paleta de Cores (Disciplina 60-30-10)**:
  - *60% Tela Neutra*: Preto obsidiana (`#070a08` e `#0c120e` no tema escuro; off-white botânico `#f5f6f3` no modo claro).
  - *30% Superfícies Estruturais*: Superfícies de cards e gavetas em verde-musgo profundo acetinado (`#121d16` / `#16241b`), divisores sutis em hairline border (`#1f2f24`).
  - *10% Destaques & Acentos*: Dourado champanhe suave (`#c5a059` e `#dfba73`) para ações primárias, estados ativos e tipografia nobre; esmeralda técnico (`#10b981`) para confirmações e âmbar suave (`#f59e0b`) para alertas de montagem.
- **Tipografia**:
  - *Títulos e Destaques*: Georgia / Playfair Serif para elegância editorial em cabeçalhos institucionais e valores de destaque.
  - *Corpo e Interface*: Sans-serif de alta legibilidade (`system-ui`, `-apple-system`, `Inter`) com tracking confortável.
  - *Métricas, Datas e Valores*: Estritamente monoespaçado tabular (`font-mono tabular-nums`) para evitar jittering visual em tabelas e cards.
- **Top Bar Contract**:
  - Na área pública: Wordmark da V J Produções à esquerda, 4 links textuais (`Sobre`, `Serviços`, `Portfólio`, `Contato`) e 1 botão de ação primária (`Solicitar Orçamento`).
  - No painel administrativo: Trilha de migalhas (*breadcrumbs*) contextual à esquerda, barra de pesquisa global central, e menu de perfil/tema à direita.

***

### 3. Key Product Decisions & Trade-Offs

- **Decisão 1: Pipeline Unificado de 14 Estágios em Fluxo Visual Kanban e Lista**
  - *Abordagem*: Mapear as 14 etapas solicitadas na especificação (*1. Novo contato, 2. Em atendimento, 3. Briefing pendente, 4. Orçamento em elaboração, 5. Proposta enviada, 6. Aguardando aprovação, 7. Aguardando contrato ou sinal, 8. Confirmado, 9. Em planejamento, 10. Preparação final, 11. Em execução, 12. Concluído, 13. Em encerramento financeiro, 14. Arquivado*) em um controle com transições validadas, impedindo que eventos passem para "Confirmado" sem valor acordado ou data fixada.
  - *Justificativa*: Dá visibilidade tanto para o setor comercial (etapas 1 a 7) quanto para a equipe de montagem e produção (etapas 8 a 14).
  - *Alternativas Consideradas*: Dois sistemas separados (CRM e Operações), descartado para evitar duplicidade de cadastros e divergência de dados.

- **Decisão 2: Arquitetura Next.js App Router Monolítica Unificada**
  - *Abordagem*: Manter o site institucional e o painel de gestão na mesma base de código Next.js 16 com rotas segmentadas (`app/page.tsx` para o portal institucional e `app/dashboard/*` para a área de gestão).
  - *Justificativa*: Facilita o compartilhamento dos modelos de dados (ex: eventos aprovados migram automaticamente para o portfólio público com 1 clique), evita custos adicionais de múltiplos deploys e mantém a integridade dos assets públicos.
  - *Alternativas Consideradas*: Repositórios ou deploys separados, descartados pela complexidade operacional e exigência do usuário de manter a base existente.

- **Decisão 3: Gestão de Mídia Segura e Geração de Propostas em PDF**
  - *Abordagem*: Upload com pré-visualização, compressão no cliente e registro de URLs no Firestore; renderização de propostas comerciais imprimíveis com folha de estilo dedicada `@media print` para exportação direta em PDF pelo navegador sem dependências nativas pesadas de backend.
  - *Justificativa*: Máxima compatibilidade com o ambiente Node 22 e Vercel, garantindo layouts vetoriais nítidos com a identidade visual da empresa.

***

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        V J PRODUÇÕES E EVENTOS                         │
│                    (Next.js App Router Architecture)                   │
└────────────────────────────────────────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌──────────────────────┐                          ┌──────────────────────┐
│  PORTAL INSTITUCIONAL │                          │ PAINEL OPERACIONAL   │
│  Rota: /             │                          │ Rota: /dashboard     │
├──────────────────────┤                          ├──────────────────────┤
│ • Hero Apresentação  │                          │ • Dashboard KPI Exec │
│ • Portfólio & Mídia  │                          │ • Pipeline 14 Etapas │
│ • Áreas de Atuação   │                          │ • Calendário Agenda  │
│ • Formulário Briefing│                          │ • CRM Clientes       │
│ • WhatsApp Direct    │                          │ • Propostas Comerciais│
└──────────────────────┘                          │ • Alocação Materiais │
           │                                      │ • Equipe & Escalas   │
           │                                      │ • Financeiro Projeto │
           │                                      └──────────────────────┘
           │                                                 │
           └────────────────────────┬────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      FIREBASE SERVICE INTEGRATION                      │
├────────────────────────────────────────────────────────────────────────┤
│ • Auth Service: Email/Password & Google Provider                       │
│ • Firestore Database:                                                  │
│   ├── /events         (Cadastro completo, datas, status, briefings)    │
│   ├── /clients        (PF/PJ, contatos, histórico comercial)           │
│   ├── /proposals      (Itens orçados, margens, versões, aprovações)    │
│   ├── /inventory      (Equipamentos som/luz, estruturas, saldo)        │
│   ├── /team           (Produtores, técnicos, floristas, escalas)       │
│   ├── /financial      (Receitas, despesas, parcelas, contas a pagar)   │
│   ├── /portfolio      (Projetos públicos publicados, fotos, categorias)│
│   └── /settings       (Configurações de notificações e templates)      │
└────────────────────────────────────────────────────────────────────────┘
```

#### Modelo de Dados e Entidades Principais

- **Event**: `id`, `code`, `title`, `clientId`, `clientName`, `type` (`casamento`, `corporativo`, `15_anos`, `social`, `cenografia`), `dateStart`, `dateEnd`, `location`, `guestCount`, `budget`, `status` (14 etapas), `assignedProducerId`, `briefing`, `tags`, `financialSummary`, `createdAt`, `updatedAt`.
- **Client**: `id`, `name`, `type` (`PF` | `PJ`), `document` (CPF/CNPJ), `email`, `phone`, `whatsapp`, `address`, `notes`, `lifetimeValue`, `eventIds`.
- **Proposal**: `id`, `eventId`, `clientId`, `version`, `items` (serviço, quant, unitário, subtotal), `discount`, `total`, `paymentTerms`, `status` (`rascunho`, `enviada`, `aprovada`, `recusada`), `validUntil`.
- **InventoryItem**: `id`, `code`, `name`, `category` (`iluminacao`, `sonorizacao`, `cenografia`, `flores_vasos`, `mobiliario`), `totalQty`, `reservedQty`, `storageLocation`, `unitCost`, `condition` (`excelente`, `bom`, `em_manutencao`).
- **FinancialEntry**: `id`, `eventId`, `type` (`receita` | `despesa`), `category`, `description`, `amount`, `dueDate`, `paidDate`, `status` (`previsto`, `pendente`, `pago`), `receiptUrl`.

***

### 5. Fases de Execução e Cronograma

- **Fase 1 (Estrutura Base & Vitrine Pública)**:
  - Desenvolvimento da página institucional na raiz (`/`) com visual sofisticado, apresentação de serviços da V J Produções, portfólio dinâmico com fotos de acervo, seção institucional e canal de orçamento rápido para WhatsApp.
  - Atualização dos metadados de SEO, OpenGraph e favicon para refletir a marca V J Produções e Eventos.

- **Fase 2 (Autenticação, Dashboard Executivo & Métricas Reais)**:
  - Estruturação do layout administrativo `/dashboard` com navegação lateral expansível, cabeçalho de pesquisa e alternância de temas.
  - Implementação do Dashboard Executivo com cartões de KPIs calculados em tempo real (Eventos ativos, faturamento previsto vs. realizado, taxas de conversão e alertas de equipe).

- **Fase 3 (Módulo Central: Eventos & Pipeline de 14 Etapas)**:
  - Visualização em Quadro Kanban dos 14 estágios com arrastar/mover e transição de status auditada.
  - Tabela avançada de eventos com busca textual, ordenação por data e filtros por categoria.
  - Modal de cadastro e edição detalhada de eventos com campos de briefing, horários de montagem, estimativa de público e responsável.

- **Fase 4 (Calendário & Agenda Operacional)**:
  - Componente de calendário interativo com visualização mensal e semanal.
  - Algoritmo de identificação de conflitos (mesma data, local ou sobreposição de horários de montagem).
  - Acesso direto ao prontuário do evento a partir de qualquer dia do calendário.

- **Fase 5 (CRM de Clientes, Propostas Comerciais & PDF)**:
  - Cadastro de clientes e histórico de contatos.
  - Gerador de propostas com lista de itens, cálculos de descontos e geração de proposta formatada para impressão/PDF com a marca V J Produções.

- **Fase 6 (Acervo de Materiais, Equipe & Financeiro por Evento)**:
  - Módulo de inventário com controle de reservas por evento e saldo em tempo real.
  - Cadastro de equipe interna e fornecedores vinculados com atribuição de escalas.
  - Painel financeiro com balanço de receitas contratadas, valores já recebidos, despesas de produção e margem líquida.

- **Fase 7 (Auditoria, Validação de Tipagem e Testes de Build)**:
  - Validação estrita via TypeScript (`tsc --noEmit`), compilação via `compile_applet` e verificação de responsividade mobile.
