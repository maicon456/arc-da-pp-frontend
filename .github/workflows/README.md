# GitHub Actions Workflows

Este diretório contém os workflows do GitHub Actions para CI/CD.

## Workflows Disponíveis

### CI (Continuous Integration)

- **Arquivo:** `.github/workflows/ci.yml`
- **Trigger:** Push e Pull Requests para `main` e `develop`
- **Ações:**
  - Instala dependências
  - Executa linter
  - Faz build do projeto

## Configuração

Os workflows usam variáveis de ambiente padrão, mas você pode configurar secrets no GitHub:

1. Vá em: Settings → Secrets and variables → Actions
2. Adicione secrets se necessário:
   - `NEXT_PUBLIC_ARC_RPC_URL`
   - `NEXT_PUBLIC_ARC_BLOCK_EXPLORER`
   - `NEXT_PUBLIC_VIRTUAL_AGENT_ADDRESS`

## Habilitar Workflows

Os workflows são habilitados automaticamente quando você faz push para o repositório.

