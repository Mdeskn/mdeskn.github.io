@echo off
cd "C:\Users\Maede\mdeskn.github.io\One-Page-Portfolio-Template-master"

echo Listing all folders and files...
dir /s /b > file_list.txt

echo Extracting content of HTML, CSS, and JS files...
(for /r %%i in (*.html *.css *.js) do (
    echo ----------------------------------------
    echo Content of %%i:
    type "%%i"
    echo.
    echo ----------------------------------------
)) >> file_list.txt

echo Done. Content of HTML, CSS, and JS files saved in file_list.txt.
pause
