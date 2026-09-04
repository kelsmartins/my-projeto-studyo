# 📚 Studyo

Studyo é um espaço pessoal de organização de estudos: você descreve o que precisa estudar em linguagem natural — assunto, materiais, data, cor — e o app transforma isso em um card organizado no seu mural.

> Projeto em desenvolvimento ativo. Algumas telas (Hoje, Calendário) ainda são stubs / não implementadas.

## ✨ Funcionalidades

- **Mural de estudos (Board):** cards visuais com título, data, cor de destaque e indicação de materiais anexados (arquivo ou link).
- **Assistente de estudos:** um chat lateral onde você digita algo como "quero estudar Cálculo 1, prova dia 20/10, anexei o PDF da apostila" e envia arquivos junto — o texto é interpretado pela API e volta como um card pronto para confirmar ou descartar.
- **Materiais por estudo:** cada estudo pode ter múltiplos materiais (arquivos ou links), visualizáveis e removíveis individualmente nos detalhes do card.
- **Estudos concluídos:** marque um estudo como concluído, revise a lista separada ou exclua tudo de uma vez (com modal de confirmação).
- **Interface em português**, com identidade visual própria (cards coloridos, navbar fixa).

## 🛠️ Tecnologias

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Axios](https://axios-http.com/) para consumo da API
- [Lucide React](https://lucide.dev/) para ícones

## 🔌 API

O front-end espera uma API rodando em `http://127.0.0.1:5000/api`, com endpoints como:

- `GET /studies` — lista estudos
- `POST /studies` — cria um estudo (multipart, com arquivos)
- `PUT /studies/:id` — marca como concluído
- `DELETE /studies/:id` — exclui estudo
- `DELETE /studies/:id/material/:materialId` — remove um material
- `DELETE /studies/done-studies` — limpa todos os concluídos
- `POST /parse_study` — interpreta o texto livre do assistente e retorna os dados estruturados do estudo

> **Nota:** o backend não faz parte deste repositório. Para rodar o projeto completo, você precisa de uma API compatível com esses endpoints rodando localmente na porta 5000.

## 🚀 Como rodar localmente

Pré-requisitos: Node.js 18+ e um gerenciador de pacotes (npm, yarn, pnpm ou bun).

```bash
# clone o repositório
git clone https://github.com/kelsmartins/my-projeto-studyo.git
cd my-projeto-studyo

# instale as dependências
npm install

# rode o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador. Lembre-se de ter a API rodando em `127.0.0.1:5000` para que o app funcione de ponta a ponta.

## 📁 Estrutura do projeto

```
src/
├── api/            # configuração do cliente axios
├── app/            # rotas (App Router): board, done-studies, layout
├── components/
│   ├── chat/       # assistente de estudos (chat, input, materiais)
│   ├── navbar/      # navegação lateral
│   ├── pages/       # cabeçalho reutilizável das páginas
│   └── studycard/   # card de estudo e modal de detalhes
├── contexts/        # StudyContext — estado global e chamadas à API
└── types/           # tipos StudyType e ParsedStudyType
```

## 🗺️ Status atual

- ✅ Mural, criação via assistente, materiais, estudos concluídos
- 🚧 Página "Hoje" (rota `/`) — ainda vazia
- 🚧 Página "Calendário" — ainda não implementada

## 👤 Autor

Desenvolvido por [Kel Martins](https://github.com/kelsmartins).
