@echo off
echo ========================================
echo ArcnetAI - Git Repository Initialization
echo ========================================
echo.

REM Check if Git is installed
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Git nao esta instalado ou nao esta no PATH.
    echo.
    echo Por favor, instale o Git:
    echo 1. Baixe em: https://git-scm.com/download/win
    echo 2. Instale o Git
    echo 3. Reinicie o terminal
    echo 4. Execute este script novamente
    echo.
    pause
    exit /b 1
)

echo [OK] Git encontrado!
echo.

REM Navigate to project directory
cd /d "%~dp0"

echo [1/6] Inicializando repositorio Git...
git init
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao inicializar Git
    pause
    exit /b 1
)
echo [OK] Repositorio inicializado
echo.

echo [2/6] Configurando usuario Git...
echo Por favor, informe seu nome (ou pressione Enter para usar "ArcnetAI Team"):
set /p GIT_NAME=
if "%GIT_NAME%"=="" set GIT_NAME=ArcnetAI Team

echo Por favor, informe seu email (ou pressione Enter para usar "team@arcnetai.dev"):
set /p GIT_EMAIL=
if "%GIT_EMAIL%"=="" set GIT_EMAIL=team@arcnetai.dev

git config user.name "%GIT_NAME%"
git config user.email "%GIT_EMAIL%"
echo [OK] Usuario configurado: %GIT_NAME% ^<%GIT_EMAIL%^>
echo.

echo [3/6] Adicionando arquivos ao staging...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao adicionar arquivos
    pause
    exit /b 1
)
echo [OK] Arquivos adicionados
echo.

echo [4/6] Verificando status...
git status --short
echo.

echo [5/6] Criando commit inicial...
git commit -m "feat: initial commit - ArcnetAI DApp on Arc Network

- Complete AI agent marketplace with tokenization
- On-chain chat and forum functionality
- Modern UI inspired by Arc Network design
- Full Web3 integration with wagmi/viem
- Smart contract for agent management
- Comprehensive documentation"
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao criar commit
    pause
    exit /b 1
)
echo [OK] Commit criado com sucesso!
echo.

echo [6/6] Renomeando branch para main...
git branch -M main
echo [OK] Branch renomeada para main
echo.

echo ========================================
echo Git Repository Inicializado com Sucesso!
echo ========================================
echo.
echo Proximos passos:
echo.
echo 1. Crie um repositorio no GitHub/GitLab
echo 2. Execute os seguintes comandos:
echo.
echo    git remote add origin https://github.com/SEU-USUARIO/arcnetai.git
echo    git push -u origin main
echo.
echo ========================================
pause

