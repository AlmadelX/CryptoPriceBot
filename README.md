# CryptoPriceBot
Telegram bot for tracking prices of cryptocurrencies

## Инструкция по запуску
1. Установите Docker Desktop &mdash; скачать установщик можно по [этой ссылке](
https://www.docker.com/products/docker-desktop/)
2. Запустите Docker Desktop
3. Создайте папку для файлов бота, создайте в этой папке файл с названием "env.txt" в котором укажите токен бота:
```
BOT_TOKEN=token
```
4. Откройте терминал в созданной папке и запустите следующую команду:
```
docker run -d --env-file ./env.txt almadelx/crypto-price-bot
```
5. Статус и логи бота можно отслеживать в Docker Desktop
