# RGB.gg

Projeto de faculdade. É um jogo de memória de cores: uma cor RGB aparece por 2 segundos, some, e você tenta identificar qual era ela entre as opções mostradas.

🔗 [RGB.gg](http://RGB.gg)

## Como funciona

1. **Reveal** – a cor alvo aparece em tela cheia por 2s.
2. **Guess** – três opções de RGB são mostradas (a correta + 2 aleatórias).
3. **Result** – mostra acerto/erro, pontuação e streak, e inicia a próxima rodada.

## Contador global

Usa a API pública do [CounterAPI](https://counterapi.dev/) para contar quantas rodadas já foram jogadas no total, sem precisar de backend próprio.

## Observação

A versão original do trabalho tinha autenticação de usuário, CRUD de foto de perfil e persistência em banco de dados. Como o deploy é no GitHub Pages (hospedagem estática), essas partes foram removidas para viabilizar a publicação.

## Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [react-colorful](https://github.com/omgovich/react-colorful) — seletor de cores
- ESLint (`eslint-plugin-react-hooks` + `react-refresh`)

## Estrutura principal

```
src/
├── App.jsx           # estado do jogo (fases: reveal → guess → result)
├── GameScreen.jsx     # tela de exibição da cor e das opções
├── ResultScreen.jsx   # tela de resultado (acerto/erro, stats)
└── App.css / index.css
```

## Rodando localmente

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## Licença

MIT
