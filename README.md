# AudioBase Pro (Detector de Polaridade)

App web (PWA) com ferramentas para quem monta e alinha sistemas de som. Funciona no celular, pode ser instalado na tela inicial e roda offline depois da primeira visita.

## Ferramentas

| Página | O que faz |
|---|---|
| `fase.html` | **Scanner de Fase.** Emite pulsos positivos (sub, médio, agudo) e analisa pelo microfone se a via está com polaridade normal ou invertida. Usa várias leituras para decidir e mostra o último pulso capturado. |
| `delay.html` | **Delay / TA.** Converte distância em milissegundos (com temperatura), calcula o delay entre duas fontes e converte ms de volta em metros. |
| `projeto.html` | **Projeto do Sistema.** Calcula impedância (paralelo, série e série-paralelo), potência que o amplificador entrega naquela carga, Vrms/Vpico para o limiter e avisa sobre impedância baixa, clipping ou excesso de potência. |
| `gerador.html` | **Gerador de Sinais.** Senoide (20 Hz a 20 kHz), varredura, ruído rosa e branco, com volume em dBFS, fade e escolha de canal (esquerdo, direito ou ambos). |

## Como usar

O microfone só funciona em HTTPS. O jeito mais fácil é publicar com o **GitHub Pages**:

1. No GitHub, vá em *Settings → Pages*.
2. Em *Source* escolha a branch `main` e a pasta `/ (root)`.
3. Abra o endereço gerado no celular e use *Adicionar à tela inicial*.

Para testar no computador:

```bash
cd Detector-de-Polaridade
python3 -m http.server 8000
# abra http://localhost:8000
```

## Teste de polaridade passo a passo

1. Calibre: aponte o microfone para uma caixa que você sabe que está correta e dispare o pulso. Se aparecer "INVERTIDA", ligue a chave *Inverter referência do microfone*. Isso compensa microfones com polaridade própria.
2. Coloque o microfone a 30 a 50 cm, no eixo do falante que vai testar.
3. Escolha a via (Sub, Médio, Agudo) e espere pelo menos 3 leituras iguais.
4. Sem segundo aparelho, toque `audio/pulso_polaridade.wav` pelo sistema de som (pulsos de sub, médio e agudo, um por segundo).

## Publicando atualizações

Sempre que mudar algum arquivo, aumente a versão em `sw.js` (`const VERSION = ...`). Assim quem instalou o app recebe o aviso "Nova versão disponível".

## Estrutura

```
index.html      menu principal
fase.html       scanner de polaridade
delay.html      cálculo de delay
projeto.html    projeto de amplificação
gerador.html    gerador de sinais
style.css       estilos compartilhados
sw.js           service worker (offline e atualizações)
manifest.json   dados do app instalável
icons/          ícones do app
audio/          arquivos de teste
```
