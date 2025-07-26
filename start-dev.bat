@echo off
echo Starting EOD Report Generator in Development Mode...
echo.

echo Starting Backend Server...
start "Backend" cmd /k "cd backend && npm start"

timeout /t 5 >nul

echo Starting Frontend Server...
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Press any key to stop all servers...
pause >nul

echo Stopping servers...
taskkill /f /im node.exe 2>nul
echo Done!