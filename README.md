# Site TAE — Usinagem, Caldeiraria e Manutenção Industrial

Site institucional estático (HTML + CSS + JS puro). **Sem build, sem dependências, sem framework.**
Para publicar, basta copiar a pasta inteira para qualquer hospedagem.

---

## Como visualizar

**Opção 1 — abrir direto:** dê duplo clique em `index.html`.
(O mapa do Google e as fontes precisam de internet; o resto funciona offline.)

**Opção 2 — servidor local** (recomendado, reproduz o comportamento real):

```bash
node serve.js
```

Depois abra `http://localhost:4173`.

---

## Como publicar

| Hospedagem | Como fazer |
|---|---|
| **Netlify / Vercel** | Arraste a pasta `tae-site` na área de deploy. Sem configuração. |
| **Hospedagem comum (cPanel, Hostgator, Locaweb…)** | Envie o conteúdo da pasta para `public_html` via FTP. |
| **GitHub Pages** | Suba a pasta no repositório e ative o Pages na branch principal. |

Depois de publicar, troque o domínio de exemplo `https://www.taeusinagem.com.br/` nos seguintes pontos:
`index.html` → tags `canonical`, `og:url`; `robots.txt`; `sitemap.xml`.

---

## Estrutura

```
tae-site/
├── index.html              página única com todas as seções
├── robots.txt
├── sitemap.xml
├── serve.js                servidor local para desenvolvimento
└── assets/
    ├── css/styles.css      todo o estilo (tokens de cor no topo do arquivo)
    ├── js/main.js          menu, scrollspy, filtro de projetos, formulário
    └── img/
        ├── logo-tae-mark.webp         logo para fundo claro
        ├── logo-tae-mark-light.webp   logo para fundo escuro (rodapé)
        ├── logo-tae-completo.webp     logo com os 3 dizeres
        ├── hero-*.webp                foto da hero (3 tamanhos)
        ├── usinagem / caldeiraria / manutencao
        ├── sobre-oficina, faixa-industrial
        ├── projetos/                  34 fotos reais da galeria
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

Para trocar, basta substituir o arquivo mantendo o **mesmo nome e a mesma proporção**:

| Arquivo | Proporção | Onde aparece |
|---|---|---|
| `hero-usinagem-1600/1000/640.webp` | 4:3 | topo do site |
| `usinagem-900/560.webp` | 4:3 | card "Usinagem" |
| `caldeiraria-900/560.webp` | 4:3 | card "Caldeiraria" |
| `manutencao-900/560.webp` | 4:3 | card "Manutenção Industrial" |
| `sobre-oficina-1100/700.webp` | 5:4 | seção "Sobre a TAE" |
| `faixa-industrial-1920/1100.webp` | 21:9 | faixa "Como trabalhamos" |

A galeria de **Projetos** já usa fotos reais da TAE (34 fotos em `projetos/`, 27 de caldeiraria e 7 de
usinagem, cada uma em 800 px e 480 px, proporção 4:3). Para adicionar uma foto nova, gere os dois
tamanhos, copie para `assets/img/projetos/` e acrescente um `<figure>` em `index.html` dentro de
`<div id="galeria">`, com `data-cat="usinagem"` ou `data-cat="caldeiraria"`. A galeria mostra 9 fotos
por vez; o botão "Ver mais projetos" revela as demais (o tamanho do lote está em `data-inicial`).

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
