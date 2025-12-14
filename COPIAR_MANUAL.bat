@echo off
echo ========================================
echo Copiando arquivos para arcAI
echo ========================================
echo.

set "source=C:\Users\maicon\Desktop\arc-da-pp-frontend"
set "target=C:\Users\maicon\Documents\GitHub\arcAI"

echo Criando diretorio...
if not exist "%target%" mkdir "%target%"

echo.
echo Copiando arquivos...
echo Origem: %source%
echo Destino: %target%
echo.

xcopy "%source%\*" "%target%\" /E /I /H /Y /EXCLUDE:exclude.txt

echo.
echo ========================================
echo Copia concluida!
echo ========================================
echo.
echo Proximos passos:
echo 1. Navegar: cd "%target%"
echo 2. Inicializar Git: git init
echo 3. Adicionar arquivos: git add .
echo 4. Commit: git commit -m "feat: initial commit"
echo.
pause

