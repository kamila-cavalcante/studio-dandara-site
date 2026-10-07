# Studio Dandara — site oficial

Landing page estática (HTML/CSS/JS, sem build) do Studio Dandara: micropigmentação avançada e despigmentação a laser em Niterói, RJ.

## Estrutura

```
index.html          página única, com dados estruturados (JSON-LD) de LocalBusiness, Person e FAQPage
style.css           estilos
track.js            eventos de rastreamento (GA4, GTM, Meta Pixel)
*.jpg / *.png       imagens (as atuais são provisórias; substituir pelas fotos reais)
llms.txt            resumo do negócio em texto puro, para assistentes de IA
robots.txt          libera buscadores e robôs de IA, aponta o sitemap
sitemap.xml         mapa do site
site.webmanifest    ícones e cores para instalação no celular
vercel.json         cabeçalhos de segurança e cache
```

## Publicar na Vercel

1. Suba este repositório no GitHub.
2. Em vercel.com → Add New → Project → Import Git Repository.
3. Framework Preset: **Other**. Build Command: vazio. Output Directory: vazio (raiz).
4. Deploy. A Vercel gera uma URL `.vercel.app`.
5. Quando o domínio estiver comprado: Project → Settings → Domains → adicionar `studiodandara.com.br`.

## Antes de publicar: trocar os marcadores

| Onde | Marcador | O que colocar |
|---|---|---|
| index.html | `GTM-XXXXXXX` | ID do contêiner do Google Tag Manager |
| index.html | `G-XXXXXXXXXX` | ID da propriedade do Google Analytics 4 |
| index.html | `SEU_PIXEL_ID` | ID do Pixel da Meta |
| index.html | `SEU_CODIGO_SEARCH_CONSOLE` | código de verificação do Search Console |
| index.html | link do Trinks | confirmar se o agendamento online é mesmo do studio |
| raiz do repo | imagens provisórias | fotos reais, mesmos nomes de arquivo |

Enquanto o domínio não existir, trocar `https://studiodandara.com.br` pela URL da Vercel em `index.html`, `sitemap.xml`, `robots.txt` e `llms.txt`.

## Eventos enviados ao GA4 / GTM

| Evento | Quando dispara | Parâmetros |
|---|---|---|
| `clique_contato` | clique em qualquer botão de contato | `canal`, `local`, `texto` |
| `secao_vista` | seção aparece na tela | `secao` |
| `rolagem` | 25%, 50%, 75% e 100% da página | `porcentagem` |
| `faq_aberta` | abertura de uma pergunta frequente | `pergunta` |
| `visita_engajada` | 30 segundos na página | `segundos` |

No GA4, marcar `clique_contato` como conversão (Admin → Eventos).

## Regras de conteúdo acordadas com o estúdio

- Não exibir preços.
- Não prometer prazo, duração ou garantia de resultado.
