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
4. Откройте терминал в созданной папке и запустите следующие команду:
```
docker pull almadelx/crypto-price-bot
docker run -d --env-file ./env.txt almadelx/crypto-price-bot
```

## Дополнительная инфорамция
- Отслеживать статус бота и логи можно в Docker Desktop
- В случае обновления достаточно остановить контейнер бота в Docker Desktop и выполнить команды из пункта 4 инструкции
