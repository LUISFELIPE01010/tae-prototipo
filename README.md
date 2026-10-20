# Site TAE — Usinagem, Caldeiraria e Manutenção Industrial

Site institucional estático (HTML + CSS + JS puro), sem framework e **sem nenhuma dependência para instalar**.
Os arquivos-fonte (`index.html`, `assets/`) são editados normalmente. Um script de build (`build.js`, só Node)
gera a pasta `dist/` otimizada que a Vercel publica.

---

## Como visualizar

**Fonte, como está (para editar):**

```bash
node serve.js
```

Abra `http://localhost:4173`.

**Versão otimizada, igual à que vai ao ar** (CSS crítico inline, arquivos com hash, Brotli):

```bash
node build.js
node serve.js dist
```

Abra `http://localhost:4175`.

---

## Como publicar (Vercel)

O `vercel.json` já configura tudo: roda `npm run build` (= `node build.js`) e publica a pasta `dist/`.
Cada `git push` na `main` republica o site sozinho. Não é preciso mexer nas configurações do projeto na Vercel.

### O que o build faz

| Etapa | Por quê |
|---|---|
| **CSS crítico inline** — as seções 1–7 e 19 do `styles.css` (cabeçalho, hero, faixa, Nossa Atuação e animações) são minificadas e vão dentro do HTML; o resto (`rest.css`) carrega sem bloquear a primeira tela | tira o CSS do caminho crítico da renderização |
| **Hash no nome dos arquivos** (`hero-usinagem-800.7a413d9ba0.avif`) | permite cache de **1 ano** (`immutable`) com segurança: se a foto mudar, o nome muda |
| **Confere o JSON-LD** e compara o FAQ do schema com o FAQ visível | avisa (sem travar o deploy) se um dos dois ficou diferente |

Por causa do hash, **trocar uma foto continua simples**: substitua o arquivo mantendo o mesmo nome e faça o push.
O build gera o nome novo e o navegador baixa a versão atualizada.

### Domínio definitivo (importante)

O `canonical`, o `og:image`, o JSON-LD, o `robots.txt`, o `sitemap.xml` e o `llms.txt` usam o domínio de exemplo
**`https://www.taeusinagem.com.br`**. Quando o domínio real estiver no ar, **não é preciso editar arquivo nenhum**:
na Vercel, em *Settings → Environment Variables*, crie

```
SITE_URL = https://www.dominio-real.com.br
```

e republique. O build troca o domínio em todos esses pontos. (Para testar localmente: `SITE_URL=https://exemplo.com node build.js`.)

> Enquanto o domínio definitivo não existir, a prévia de link no WhatsApp/Facebook não mostra a imagem
> (ela aponta para o domínio de exemplo), e o Google pode indexar o endereço `.vercel.app` do protótipo.

### Estilos: como editar sem quebrar o build

O `assets/css/styles.css` é dividido em seções numeradas (`/* ---------- 5. Hero ---------- */`).
**Não renumere nem remova os marcadores**: o build usa os números para separar o CSS crítico do restante.
Seções críticas = 1 a 7 e 19. Novas seções entram no final (a 20 é o FAQ) e carregam depois da primeira tela.

---

## Estrutura

```
tae-site/
├── index.html              página única com todas as seções (inclui JSON-LD e FAQ)
├── build.js                gera dist/ (CSS crítico, hash nos arquivos, domínio)
├── vercel.json             build, cache de 1 ano em /assets e cabeçalhos de segurança
├── package.json            só declara o script "build" (nenhuma dependência)
├── robots.txt              libera buscadores e crawlers de IA (GPTBot, PerplexityBot, ClaudeBot…)
├── sitemap.xml
├── llms.txt                resumo da empresa em texto simples, para IAs
├── serve.js                servidor local (node serve.js | node serve.js dist)
└── assets/
    ├── css/styles.css      todo o estilo, em seções numeradas (tokens de cor no topo)
    ├── js/main.js          menu, animações, contadores, filtro de projetos, formulário
    ├── fonts/              Inter (latin, variável) hospedada no próprio site
    └── img/
        ├── logo-tae-mark*.webp        logo (3 tamanhos; versão clara para o rodapé)
        ├── logo-tae-completo.webp     logo com os 3 dizeres (usada no schema)
        ├── hero-usinagem-*.webp/.avif foto da hero (5 tamanhos)
        ├── usinagem / caldeiraria / manutencao   cards de Nossa Atuação (3 tamanhos)
        ├── sobre-oficina, faixa-industrial
        ├── projetos/                  34 fotos reais da galeria (.webp + .avif)
        └── parceiros/                 13 logos de clientes
```

---

## O que trocar depois

### 1. Fotos (prioridade)
Todas as fotos atuais são de **banco de imagens gratuito (Pexels)** e servem de marcador.

> As fotos exatas da imagem de referência (a peça sendo furada na hero, o funcionário de uniforme TAE
> no 3º card) não existem em banco gratuito — são da própria empresa ou geradas. O enquadramento e a
> composição foram reproduzidos; o conteúdo das fotos é o que muda. Trocando pelos arquivos reais da
> TAE nos mesmos nomes, o resultado fica igual à referência.

Cada foto existe em **vários tamanhos** e em **dois formatos** (`.avif`, que os navegadores modernos usam,
e `.webp`, de reserva). O navegador escolhe sozinho o tamanho e o formato certos. Para trocar uma foto,
gere **todos os tamanhos nos dois formatos**, com o mesmo nome e a mesma proporção. Trocar só o `.webp`
deixa o `.avif` antigo aparecendo para a maioria dos visitantes. *(Se preferir, me envie as fotos novas e eu gero tudo.)*

| Arquivos | Proporção | Onde aparece |
|---|---|---|
| `hero-usinagem-640/800/1000/1280/1600` | 16:9 | topo do site |
| `usinagem-480/700/900` | 4:3 | card "Usinagem" |
| `caldeiraria-480/700/900` | 4:3 | card "Caldeiraria" |
| `manutencao-480/700/900` | 4:3 | card "Manutenção Industrial" |
| `sobre-oficina-480/700/1100` | 5:4 | seção "Sobre a TAE" |
| `faixa-industrial-720/1100/1920` | 21:9 | faixa "Como trabalhamos" |
| `logo-tae-mark(-light)-120/200` e o de 440 | — | logo (só `.webp`, tem transparência) |

A galeria de **Projetos** já usa fotos reais da TAE (34 fotos em `projetos/`, 27 de caldeiraria e 7 de
usinagem, cada uma em 800 px e 480 px, proporção 4:3, em `.webp` e `.avif`). Para adicionar uma foto nova,
gere os dois tamanhos nos dois formatos, copie para `assets/img/projetos/` e acrescente um `<figure>` em
`index.html` dentro de `<div id="galeria">`, com `data-cat="usinagem"` ou `data-cat="caldeiraria"`
(copie um `<figure>` existente, que já traz o `<picture>`). A galeria mostra 9 fotos por vez; o botão
"Ver mais projetos" revela as demais (o tamanho do lote está em `data-inicial`).

### Perguntas frequentes e schema
O FAQ fica em `<section id="faq">`. O mesmo texto também está no JSON-LD do `<head>` (`FAQPage`). Ao editar uma
pergunta ou resposta, altere **os dois lugares com o texto idêntico**; o `node build.js` avisa se ficarem diferentes.

### 2. Logo
A logo foi extraída do arquivo enviado. Se houver o original em vetor (`.ai`, `.svg`, `.eps`),
vale substituir — ficará mais nítido em telas de alta resolução.
A versão clara (`logo-tae-mark-light.webp`) é a mesma logo com o preto convertido em branco.

### 3. Logos dos parceiros
Em `assets/img/parceiros/`. **Bunge** e **Siemens Gamesa** estão em `.svg` (vetor, qualidade máxima,
baixados do Wikimedia Commons). As outras 11 foram recortadas da imagem que você enviou — se conseguir
os arquivos originais com esses clientes, é só substituir mantendo o nome.

### 4. Textos e contatos
Tudo está em `index.html`, em português e sem código misturado. Os pontos de contato aparecem em
vários lugares — use **Localizar e substituir**:

| O que | Valor atual |
|---|---|
| WhatsApp (link) | `5513991690175` |
| WhatsApp (exibido) | `13 99169-0175` |
| Telefone fixo | `(13) 3372-2215` / `+551333722215` |
| Instagram | `taeusinagem` |
| Endereço | R. Olívia de Jesus Peralta, 150 — Sítio São Luís, Cubatão/SP |

> **Atenção:** o número de WhatsApp `13 99169-0175` veio da imagem de referência.
> Confirme se é mesmo o número da TAE antes de publicar.

### 5. Cores
Todas no topo de `assets/css/styles.css`, no bloco `:root`:

```css
--g-800:#005c2e;   /* verde escuro: botão do topo, barras dos cards */
--g-700:#1e7a4c;   /* verde principal */
--g-600:#1e8a50;   /* verde dos botões de ação */
--g-400:#45cc57;   /* verde claro: destaque do título, ícones no escuro */
--ink:#171717;     /* preto/grafite das seções escuras */
```

---

## Mapa

O mapa **não carrega sozinho**: a seção Contato mostra um bloco com o endereço e um botão
"Carregar mapa". Só ao clicar é que o iframe do Google entra na página.

Isso é de propósito — evita um iframe de terceiro (e os cookies dele) no carregamento inicial,
deixa a página mais leve e funciona em ambientes que bloqueiam conteúdo externo. O botão
"Abrir no Google Maps" leva direto à ficha da empresa e funciona em qualquer situação.

Para voltar ao mapa sempre visível, troque o `<button class="mapa__preview">` em `index.html`
pelo `<iframe>` usando a URL que está no atributo `data-embed` da div `.mapa`.

## Formulário de orçamento

O formulário **não usa servidor**. Ao enviar, ele monta a mensagem e abre o WhatsApp da TAE
já preenchido. Nenhum dado é armazenado nem enviado para terceiros.

Se um dia quiser receber por e-mail, dá para ligar a serviços como Formspree ou Web3Forms
trocando apenas o trecho final de `assets/js/main.js`.

---

## O que já está pronto

- **Responsivo** — testado em 390 px (celular) e 1440 px (desktop).
- **Rápido** — ~17 kB de HTML+CSS+JS comprimidos; imagens em WebP com `srcset` por tamanho de tela.
  Só a hero carrega de imediato; o resto é carregado conforme a rolagem.
- **SEO** — título e descrição, Open Graph (prévia ao compartilhar), dados estruturados
  `LocalBusiness` (endereço, telefone, horário), `sitemap.xml` e `robots.txt`.
- **Acessibilidade** — navegação por teclado, foco visível, textos alternativos nas imagens,
  link "pular para o conteúdo" e respeito a "reduzir movimento".
- **Interações** — menu fixo com indicador da seção atual, menu sanfona no celular,
  filtro na galeria de projetos, animações de entrada e botão flutuante de WhatsApp.
- **Animações de entrada** — os blocos aparecem conforme a página é rolada: itens de grade entram em
  sequência (um após o outro na mesma linha), textos e fotos entram por lados opostos, os cards de
  "Nossa Atuação" deslizam já inclinados, e os números do "Sobre" contam de 0 até o valor. Na hero só
  o texto anima; a foto fica parada. Cada elemento anima uma vez. Tudo é CSS + ~1,5 kB de JavaScript.
  Para animar um bloco novo, use a classe `reveal` (opcional: `reveal--left` ou `reveal--right`) ou o
  atributo `data-stagger` no contêiner de uma grade. Quem usa "reduzir movimento" no sistema vê tudo
  sem animação, e se o JavaScript falhar o conteúdo continua visível.
