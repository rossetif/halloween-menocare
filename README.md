# Quiz de Halloween MenoCare

Quiz interativo para a festa de Halloween: 6 perguntas, 5 personagens de terror (Coragem, Freddy Krueger, Dracula, Morticia Addams e Ze do Caixao).

Site estatico, sem build e sem dependencias. A unica chamada externa e a fonte do Google Fonts.

## Estrutura

- `index.html`: estrutura da pagina
- `style.css`: visual
- `script.js`: perguntas, personagens e logica de pontuacao
- `assets/logo-menocare.svg`: logo
- `assets/personagens/`: imagens dos personagens (fotos dos 5 personagens)

## Rodar localmente

Abra o `index.html` no navegador, ou rode um servidor simples na pasta:

```bash
npx serve .
```

## Deploy na Vercel

1. Suba o repositorio no GitHub.
2. Na Vercel, **Add New > Project** e importe o repositorio.
3. Framework Preset: **Other**. Deixe Build Command e Output Directory vazios.
4. Deploy.

## Como editar

Perguntas, descricoes e frases dos personagens ficam no topo do `script.js` (objetos `CHARS` e `QUESTIONS`).

Pontuacao: cada resposta soma 1 ponto para um personagem. Em caso de empate, vale a resposta mais recente entre os empatados (normalmente a pergunta 6, a da fantasia).