# REESTRUTURAÇÃO COMPLETA DO SISTEMA V J PRODUÇÕES E EVENTOS
## Plataforma profissional de gestão de eventos, clientes, projetos e operações

### 1. OBJETIVO PRINCIPAL

Reestruture integralmente o projeto existente V J Produções e Eventos, transformando-o em uma plataforma moderna, completa e profissional para gerenciamento de eventos futuros, eventos em andamento e eventos concluídos.

Repositório principal: `cirosouzatecno/vjpeventos`

Site em produção: https://vjproducoeseventos.com.br/

O objetivo é evoluir o sistema atual para uma solução integrada de gestão operacional, comercial, financeira e administrativa, mantendo o site institucional, o portfólio e todos os recursos existentes que ainda sejam úteis.

Não quero apenas uma reformulação visual. Quero uma revisão estrutural do sistema, dos módulos, dos fluxos de trabalho, da experiência do usuário e da arquitetura técnica.

**Regra fundamental:** antes de alterar qualquer arquivo, examine o projeto atual, identifique sua arquitetura real, seus componentes, suas páginas, suas integrações, seu banco de dados, suas funcionalidades e sua configuração de produção.

Não presuma que funcionalidades inexistentes já estejam implementadas. Não descarte recursos funcionais sem justificativa.

### 2. AUDITORIA E PRESERVAÇÃO DO PROJETO

Antes de iniciar o desenvolvimento:

1. Examine todo o repositório e identifique a stack tecnológica realmente utilizada.
2. Mapeie as páginas públicas, o painel administrativo, os componentes compartilhados, as rotas, as APIs e as integrações.
3. Identifique os recursos que funcionam, os que apresentam falhas e os que precisam ser reconstruídos.
4. Verifique a persistência de dados, a autenticação, as permissões e os mecanismos de upload de imagens e vídeos.
5. Analise a configuração da Vercel, as variáveis de ambiente e as integrações existentes, sem expor segredos.
6. Crie uma estratégia de migração segura e um ponto de recuperação antes de mudanças estruturais.
7. Elabore um plano de implementação por etapas e, em seguida, execute o desenvolvimento.

Não apague nem substitua todo o projeto de maneira indiscriminada. Preserve informações, conteúdo, imagens, vídeos, URLs públicas, configurações de SEO e funcionalidades úteis.

### 3. ESTRUTURA GERAL DO NOVO SISTEMA

Organize a plataforma em duas grandes áreas integradas.

**A. Site institucional público**

Manter e aprimorar o site da V J Produções e Eventos, incluindo:

- Página inicial com apresentação profissional da empresa.
- Portfólio de eventos realizados.
- Galerias de fotos e vídeos.
- Categorias de serviços e tipos de eventos.
- Projetos corporativos, casamentos, festas de 15 anos, aniversários, batizados, cerimônias e decoração residencial.
- Seção Sobre Nós e canais de contato.
- Botões de contato e solicitação de orçamento via WhatsApp.
- SEO técnico, metadados, URLs, desempenho e acessibilidade.
- Layout totalmente responsivo, priorizando dispositivos móveis.

O conteúdo público deve continuar sendo gerenciado pelo painel administrativo, respeitando as regras de publicação e aprovação existentes.

**B. Painel administrativo de gestão**

Criar uma área administrativa integrada, protegida por autenticação, com navegação lateral, dashboard, módulos independentes e interface consistente.

O painel deverá permitir administrar os eventos, clientes, orçamentos, fornecedores, equipe, materiais, tarefas, documentos, pagamentos e relatórios.

### 4. DASHBOARD EXECUTIVO

Criar um dashboard com informações reais e atualizadas do sistema.

Apresentar indicadores como:

- Próximos eventos.
- Eventos em planejamento.
- Eventos confirmados.
- Eventos em execução.
- Eventos concluídos.
- Orçamentos aguardando resposta.
- Propostas aprovadas e recusadas.
- Total contratado no período.
- Valores recebidos e valores pendentes.
- Despesas registradas e resultados financeiros.
- Tarefas atrasadas e atividades próximas do vencimento.
- Próximos compromissos e entregas.

Adicionar gráficos por período, situação, categoria de evento e desempenho comercial.

Permitir filtrar por data, cliente, responsável, tipo de evento e status.

Todos os indicadores devem ser calculados a partir dos dados efetivamente armazenados. Não utilizar números fictícios ou informações demonstrativas no ambiente de produção.

### 5. MÓDULO CENTRAL: GESTÃO DE EVENTOS

Criar um cadastro completo de eventos, com operações de criação, consulta, edição, arquivamento e cancelamento.

Cada evento deverá possuir:

- Código ou identificador único.
- Nome do evento.
- Cliente responsável.
- Tipo e categoria.
- Data e horários de início e término.
- Endereço e local de realização.
- Contatos do cliente.
- Responsável interno pelo projeto.
- Descrição e briefing.
- Público estimado.
- Serviços contratados.
- Orçamento aprovado.
- Situação comercial e operacional.
- Cronograma de preparação.
- Equipe envolvida.
- Fornecedores vinculados.
- Materiais e equipamentos necessários.
- Tarefas e prazos.
- Documentos e contratos.
- Fotografias, vídeos e referências visuais.
- Histórico de alterações e observações.

Criar os seguintes status, permitindo evolução controlada entre as etapas:

1. Novo contato.
2. Em atendimento.
3. Briefing pendente.
4. Orçamento em elaboração.
5. Proposta enviada.
6. Aguardando aprovação.
7. Aguardando contrato ou sinal.
8. Confirmado.
9. Em planejamento.
10. Preparação final.
11. Em execução.
12. Concluído.
13. Em encerramento financeiro.
14. Arquivado.

Incluir cancelamento como situação específica, com motivo, data e histórico preservados.

Permitir configurar as transições entre status, evitando que um evento seja considerado confirmado sem os requisitos comerciais definidos pela empresa.

### 6. CALENDÁRIO E AGENDA

Criar um calendário integrado à gestão de eventos.

Disponibilizar visualizações mensal, semanal, diária e em lista.

Permitir:

- Consultar eventos futuros e anteriores.
- Visualizar horários de montagem, desmontagem e execução.
- Identificar conflitos de datas, horários, locais e recursos.
- Consultar a disponibilidade da equipe e dos equipamentos.
- Filtrar eventos por responsável, categoria e situação.
- Abrir o cadastro completo do evento diretamente pelo calendário.
- Criar tarefas e compromissos vinculados a um evento.
- Exibir alertas de compromissos próximos e prazos vencidos.

Implementar validações de conflitos, com possibilidade de autorização administrativa quando houver uma exceção justificada.

Considerar o fuso horário de São Paulo, com armazenamento e apresentação de datas de maneira consistente.

### 7. CLIENTES E CRM

Criar um módulo de relacionamento com clientes.

Permitir cadastrar pessoas físicas e jurídicas, contatos, telefones, e-mails, endereços, observações comerciais e histórico de relacionamento.

Cada cliente deverá apresentar:

- Dados cadastrais.
- Histórico de contatos.
- Eventos solicitados, contratados e realizados.
- Propostas e orçamentos.
- Contratos e documentos.
- Pagamentos relacionados.
- Preferências e referências.
- Pendências comerciais.
- Próximas ações de acompanhamento.

Implementar pesquisa rápida, filtros e identificação de clientes recorrentes.

Permitir converter um novo contato em oportunidade comercial e, posteriormente, em evento, sem precisar cadastrar novamente os mesmos dados.

### 8. ORÇAMENTOS E PROPOSTAS COMERCIAIS

Criar um módulo profissional para elaboração de propostas.

Permitir cadastrar serviços, quantidades, valores unitários, descontos, custos adicionais e condições comerciais.

A proposta deverá incluir:

- Dados da empresa e do cliente.
- Identificação do evento.
- Descrição dos serviços.
- Itens e valores detalhados.
- Subtotal, descontos e total.
- Condições de pagamento.
- Validade da proposta.
- Observações e condições de contratação.
- Versão e histórico de revisões.

Criar modelos de propostas que possam ser personalizados com a identidade visual da V J Produções e Eventos.

Permitir gerar documentos em PDF, imprimir e compartilhar por canais disponíveis.

Implementar estados como rascunho, enviada, visualizada quando houver mecanismo de rastreamento, aprovada, recusada e expirada.

Uma proposta aprovada deve poder gerar o evento confirmado e os registros financeiros correspondentes sem duplicar dados.

Não registrar uma aprovação apenas porque um arquivo foi aberto ou baixado.

### 9. PLANEJAMENTO E EXECUÇÃO

Cada evento deverá ter uma área própria de planejamento operacional.

Criar recursos para:

- Checklist de preparação.
- Cronograma de montagem e desmontagem.
- Plano de execução.
- Tarefas por responsável.
- Prazos e prioridades.
- Dependências entre tarefas.
- Registro de conclusão.
- Anexos e referências visuais.
- Ocorrências e imprevistos.
- Lista de conferência antes do evento.
- Lista de conferência após o evento.

Permitir modelos reutilizáveis de planejamento para casamentos, eventos corporativos, festas, cerimônias e outras categorias.

Ao criar um evento com um modelo, gerar as tarefas e os prazos previstos com base na data do evento, permitindo ajustes manuais.

### 10. EQUIPE E FORNECEDORES

Criar módulos para gerenciar a equipe interna e os fornecedores externos.

**Equipe:**
- Cadastro e função.
- Contatos profissionais.
- Especialidades.
- Disponibilidade.
- Eventos atribuídos.
- Tarefas pendentes.
- Escalas e horários.
- Registro de participação.

**Fornecedores:**
- Cadastro e contatos.
- Serviços prestados.
- Condições comerciais.
- Orçamentos recebidos.
- Contratações vinculadas.
- Datas e horários de entrega.
- Documentos e comprovantes.
- Avaliação e histórico de atendimento.

Permitir associar pessoas e fornecedores aos eventos e identificar indisponibilidades e conflitos de agenda.

Implementar permissões para que cada perfil veja somente os dados necessários às suas atribuições.

### 11. MATERIAIS, DECORAÇÃO E EQUIPAMENTOS

Criar um módulo de controle de materiais e recursos utilizados nos eventos.

Permitir cadastrar:

- Nome e descrição.
- Categoria.
- Código interno.
- Fotografias.
- Quantidade disponível.
- Quantidade reservada.
- Estado de conservação.
- Local de armazenamento.
- Custo ou valor de referência.
- Necessidade de manutenção.
- Observações.

Possibilitar reservar materiais para um evento, registrar saída, retorno, avarias e perdas.

Calcular a disponibilidade considerando reservas e movimentações, sem permitir alocações incompatíveis com o estoque.

Diferenciar materiais próprios, materiais alugados e itens fornecidos por terceiros.

Criar listas de separação, conferência de saída e conferência de retorno.

### 12. FINANCEIRO POR EVENTO

Criar um módulo financeiro vinculado aos eventos e aos clientes.

Permitir registrar:

- Valor contratado.
- Entrada ou sinal.
- Parcelas.
- Recebimentos.
- Contas a pagar.
- Despesas previstas e realizadas.
- Custos de fornecedores.
- Custos de equipe e materiais.
- Descontos e acréscimos.
- Comprovantes e documentos.
- Datas de vencimento.
- Situação de cada lançamento.

Apresentar, por evento, o valor contratado, o total recebido, o saldo a receber, os custos registrados e o resultado financeiro calculado.

Criar relatórios consolidados por mês, cliente, categoria e evento.

Não confundir receita contratada com dinheiro efetivamente recebido, nem custo previsto com despesa efetivamente realizada.

Não integrar pagamentos reais, bancos ou serviços financeiros sem configuração e autorização específicas.

### 13. DOCUMENTOS E ARQUIVOS

Criar uma área documental organizada por cliente e evento.

Permitir anexar contratos, propostas, recibos, notas, checklists, plantas, referências, imagens e vídeos.

Implementar:

- Upload com indicação de progresso.
- Validação de tamanho e tipo de arquivo.
- Organização por categoria.
- Pré-visualização quando suportada.
- Download com autorização.
- Controle de acesso.
- Registro de data e responsável pelo envio.
- Tratamento de erros e recuperação de operações.
- Armazenamento seguro e links de acesso adequados.

Preservar as integrações de mídia existentes quando forem compatíveis com a arquitetura final.

### 14. PORTFÓLIO E GALERIAS

Manter e aprimorar o gerenciamento do portfólio público.

Permitir cadastrar projetos realizados, categorias, fotografias, vídeos, legendas, datas, descrições e informações relevantes.

Criar um fluxo para selecionar os materiais de um evento concluído e transformá-los em uma publicação do portfólio.

Implementar estados de rascunho, aguardando aprovação, aprovado e publicado.

Preservar os mecanismos administrativos de aprovação, os registros de alterações e os links do Instagram já utilizados.

Não publicar fotos de clientes, documentos ou materiais privados automaticamente. Exigir autorização e respeitar as permissões de divulgação aplicáveis.

### 15. AUTENTICAÇÃO, PERFIS E SEGURANÇA

Revisar e fortalecer o sistema de autenticação e autorização.

Criar perfis configuráveis, como:

- Administrador.
- Gestor de eventos.
- Comercial.
- Financeiro.
- Operacional.
- Colaborador.
- Consulta.

Cada perfil deverá possuir permissões específicas de visualização, criação, edição, aprovação, exclusão e exportação.

Implementar proteção real no servidor ou na camada de dados. Ocultar botões na interface não é suficiente para proteger informações.

Adicionar:

- Validação de dados.
- Controle de sessões.
- Proteção de rotas.
- Registro de operações relevantes.
- Histórico de alterações.
- Confirmação para operações críticas.
- Política segura de recuperação de acesso.
- Proteção de documentos e arquivos privados.

Nunca expor senhas, chaves, tokens ou variáveis de ambiente no código público, nos logs ou nas respostas da aplicação.

### 16. EXPERIÊNCIA VISUAL E USABILIDADE

Reestruture a interface com padrão visual profissional, adequado a uma empresa de produção de eventos.

Adote:

- Tema escuro como opção padrão do painel, com alternativa clara.
- Layout responsivo, priorizando celulares.
- Menu lateral organizado por módulos.
- Cabeçalho com pesquisa global e acesso ao perfil.
- Cards de indicadores objetivos.
- Tabelas com ordenação, filtros e paginação.
- Formulários divididos por etapas ou seções.
- Modais e painéis de detalhes quando apropriados.
- Estados de carregamento e mensagens claras.
- Confirmações para operações destrutivas.
- Acessibilidade, contraste e navegação por teclado.

Evite interfaces excessivamente carregadas, animações desnecessárias e telas que obriguem o usuário a navegar por muitas páginas para concluir tarefas simples.

As principais ações devem ser facilmente acessíveis pelo celular.

### 17. PESQUISA GLOBAL E RELATÓRIOS

Criar uma pesquisa global para localizar clientes, eventos, fornecedores, propostas e documentos permitidos ao usuário.

Criar relatórios de:

- Agenda de eventos.
- Pipeline comercial.
- Propostas e conversões.
- Eventos por categoria.
- Produtividade operacional.
- Tarefas e atrasos.
- Utilização de materiais.
- Receitas contratadas e recebidas.
- Despesas e resultados registrados.
- Histórico de clientes.

Permitir exportações autorizadas para formatos adequados, como CSV e PDF.

Os filtros dos relatórios devem corresponder aos dados exibidos, e os totais precisam ser consistentes com os registros de origem.

### 18. ARQUITETURA, BANCO DE DADOS E INTEGRAÇÕES

Analise a arquitetura existente e evolua-a sem introduzir complexidade desnecessária.

Mantenha a stack atual quando ela for adequada. Não migre automaticamente de React/Vite para Vue, nem substitua o banco ou os serviços existentes sem demonstrar a necessidade técnica.

Se for necessária uma nova estrutura de dados:

- Defina entidades e relacionamentos.
- Estabeleça identificadores e restrições.
- Implemente validações e integridade referencial.
- Prepare migrações reversíveis quando possível.
- Preserve os dados existentes.
- Planeje tratamento de erros e concorrência.
- Documente as variáveis de ambiente necessárias.
- Implemente índices e paginação quando apropriado.

Caso o projeto utilize Supabase, Firebase, Redis/KV ou outros serviços, avalie sua função atual antes de decidir pela manutenção ou substituição.

Não utilize armazenamento temporário do navegador como única fonte de dados para informações críticas compartilhadas entre usuários.

Integre APIs e serviços externos somente quando houver configuração, credenciais e autorização adequadas.

### 19. REGRAS DE NEGÓCIO E AUTOMAÇÕES

Implementar automações úteis e rastreáveis:

- Alertas para eventos próximos.
- Notificações de tarefas atrasadas.
- Lembretes de vencimentos financeiros.
- Alertas de conflitos de agenda.
- Avisos de materiais insuficientes.
- Acompanhamento de propostas pendentes.
- Criação de checklists com base em modelos.
- Atualização dos indicadores após alterações confirmadas.
- Sugestões de atividades para o encerramento do evento.

Quando houver integração autorizada com WhatsApp ou e-mail, permitir o envio de mensagens previamente configuradas.

Não afirmar que uma mensagem foi enviada se o provedor não confirmar o envio.

Registrar as automações relevantes e permitir configurar quais notificações ficam ativas.

### 20. TESTES E GARANTIA DE QUALIDADE

Antes de considerar a reestruturação concluída:

1. Executar a instalação e a compilação do projeto.
2. Corrigir erros de compilação, dependências e rotas.
3. Testar autenticação e permissões.
4. Testar operações de criação, edição e consulta.
5. Verificar a integridade dos relacionamentos.
6. Testar os fluxos de orçamento, aprovação e confirmação.
7. Testar cálculos financeiros com valores conhecidos.
8. Testar conflitos de agenda e disponibilidade de materiais.
9. Testar uploads, permissões e tratamento de falhas.
10. Testar o layout em telas pequenas e grandes.
11. Verificar as páginas públicas, o SEO e os links existentes.
12. Testar os principais fluxos ponta a ponta.

Não remover testes para fazer a compilação passar. Não ocultar erros, substituir integrações por dados falsos ou marcar funcionalidades como concluídas sem testá-las.

### 21. IMPLANTAÇÃO NA VERCEL

Preparar a nova versão para implantação na Vercel.

Antes da publicação:

- Confirmar que as configurações de produção continuam válidas.
- Verificar variáveis de ambiente sem divulgar seus valores.
- Validar rotas e comportamento de atualização das páginas.
- Verificar compatibilidade com os serviços de dados e arquivos.
- Executar os testes de produção disponíveis.
- Confirmar que o site público não foi prejudicado.
- Preparar uma estratégia de retorno à versão anterior.

Publicar em ambiente de prévia primeiro, quando possível. Só promover para produção depois dos testes e da verificação das integrações críticas.

Não alterar domínios, apagar dados de produção ou substituir a versão publicada sem autorização específica.

### 22. ORDEM DE EXECUÇÃO

Divida o trabalho nas seguintes etapas:

**Fase 1:** auditoria completa do repositório e plano de reestruturação.

**Fase 2:** arquitetura, modelo de dados, segurança e autenticação.

**Fase 3:** layout do painel, dashboard, navegação e pesquisa.

**Fase 4:** clientes, eventos, calendário e fluxo comercial.

**Fase 5:** planejamento operacional, tarefas, equipe, fornecedores e materiais.

**Fase 6:** financeiro, documentos e relatórios.

**Fase 7:** integração com o portfólio e o site institucional.

**Fase 8:** testes, correções, documentação e implantação controlada.

Ao final de cada fase, informe o que foi concluído, os arquivos ou módulos afetados, os testes executados e as pendências identificadas.

Não interrompa o trabalho após apresentar apenas um plano. Depois da auditoria, comece a implementar as fases em sequência, entregando incrementos funcionais e verificáveis.

### 23. CRITÉRIOS DE ACEITAÇÃO FINAL

A reestruturação será considerada concluída quando:

- O site institucional continuar funcionando.
- O painel administrativo estiver protegido.
- Os eventos puderem ser gerenciados de ponta a ponta.
- O calendário refletir os eventos registrados.
- Clientes, propostas e eventos estiverem relacionados corretamente.
- As tarefas e os recursos operacionais puderem ser acompanhados.
- Os registros financeiros apresentarem cálculos consistentes.
- Os arquivos respeitarem as permissões.
- Os relatórios utilizarem dados reais.
- A interface funcionar adequadamente em celulares.
- Os recursos existentes importantes tiverem sido preservados.
- Os testes críticos tiverem sido executados com sucesso.
- A documentação técnica e operacional estiver disponível.

### INSTRUÇÃO FINAL

Trabalhe como arquiteto de software, desenvolvedor full-stack, especialista em segurança e designer de produto.

Tome decisões técnicas com base no código e nos dados reais do projeto. Quando uma decisão irreversível depender de uma informação ausente, registre a dúvida e não destrua dados nem funcionalidades para contorná-la.

Priorize segurança, integridade dos dados, facilidade de uso, manutenção e evolução futura.

O resultado deve ser um sistema realmente utilizável pela V J Produções e Eventos, não apenas uma demonstração visual.

Comece auditando o repositório existente e apresente um diagnóstico técnico objetivo. Em seguida, implemente a reestruturação por etapas, validando cada entrega antes de avançar.
