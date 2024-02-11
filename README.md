# CryptoPriceBot
Telegram bot for tracking prices of cryptocurrencies

## Необходимые программы для работы
- Node.js
- Git

## Инструкция по запуску
1. Откройте папку, где будет храниться бот, откройте командную строку в этой папке
2. Скачайте код бота с GitHub выполнив команду:
    ```
    git clone git@github.com:AlmadelX/CryptoPriceBot.git
    ```
    Если отобразится какой-то вопрос, ответьте "yes"
3. Перейдите в папку CryptoPriceBot, создайте в ней файл с названием ".env", в котором укажите токен бота в следующем
формате:
    ```
    BOT_TOKEN=token
    ```
4. Откройте командную строку в папке CryptoPriceBot и запустите следующие команды:
    ```
    npm i
    npm start
    ```

## Инструкция по обновлению
1. Остановите бота нажав Ctrl+C в командной строке
2. Выполните команды:
```
git pull origin main
npm ci
npm i
npm start
```
