@echo off
npm install
Remove-Item -Recurse -Force allure-results, allure-report -ErrorAction SilentlyContinue
if exist allure-results rd /s /q allure-results