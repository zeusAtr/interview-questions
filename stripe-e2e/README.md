# Stripe Elements — e2e review task

Автотест на WebdriverIO для тестовой страницы со Stripe Elements:
https://zeusatr.github.io/interview-questions/stripe-elements/

Тест проверяет создание PaymentMethod через раздельные поля карты (Card Number / Expiry / CVC)
и поля плательщика вне фреймов Stripe.

## Задание

1. Прочитай код в `pages/`, `specs/`, `helpers/`, `data/`.
2. Найди, что в тестах сделано неправильно, и объясни, к чему это приводит.
3. Предложи исправления.

Тесты можно запускать, но это не обязательно.

## Запуск

```sh
npm install
npm test            # headless Chrome
HEADED=1 npm test   # с окном браузера
```

Нужны Node.js 20+ и установленный Google Chrome.
