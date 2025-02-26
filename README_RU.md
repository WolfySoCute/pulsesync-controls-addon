# [English version](README.md) 🇬🇧  
*Click to switch to English.*

# WebSocket Controls

**WebSocket Controls** — это аддон-клиент для управления Яндекс Музыкой через протокол WebSocket.

> **Примечание:** Этот проект изначально создавался для личного использования, но любой желающий может использовать его в своих целях.


## Установка (для DeckBoard)

Чтобы настроить работу WebSocket Controls с DeckBoard, выполните следующие шаги:

1. **Установите аддон в PulseSync.**
2. **Установите плагин [PulseSync Controls](https://github.com/WolfySoCute/deckboard-pulsesync-controls) для DeckBoard.**
3. **Настройте порт в параметрах DeckBoard и аддона.**

## Использование в других программах

Вы можете интегрировать WebSocket Controls с другими программами, поддерживающими WebSocket. Если ваша программа не имеет встроенной поддержки WebSocket, возможно, потребуется разработка дополнительного плагина.


## Для разработчиков

При работе с WebSocket используются JSON-сообщения следующего формата:

```json
{
  "cmd": "Команда",
  "data": {}, // Дополнительная информация к команде
  "evt": "Событие"
}
```

## Доступные команды:

### `DISPATCH`
Вызов события.

**Пример:**
```json
{ 
  "cmd": "DISPATCH", 
  "evt": "READY"
}
```

### `CHANGE_SONG`
Изменение трека.

**Параметры:**
- `direction` — направление изменения трека. Возможные значения: `FORWARD` или `BACKWARD`.

**Пример:**
```json
{ 
  "cmd": "CHANGE_SONG", 
  "data": { 
    "direction": "FORWARD" 
  } 
}
```

### `PAUSE`
Пауза трека.

**Пример:**
```json
{ 
  "cmd": "PAUSE", 
  "data": {} 
}
```

### `CHANGE_VOLUME`
Изменение громкости.

**Параметры:**
- `action` — тип смены громкости. Возможные значения: `SET`, `INCREASE` или `DECREASE`.
- `value` — значение изменения (в процентах).
- `isSmoothly` — Плавное изменение громкости (true/false).

**Пример:**
```json
{ 
  "cmd": "CHANGE_VOLUME", 
  "data": { 
    "action": "SET", 
    "value": 5,
    "isSmoothly": true
  } 
}
```

## Доступные события:

### `READY`
Успешное подключение и готовность к работе.

**Пример:**
```json
{ 
  "cmd": "DISPATCH", 
  "evt": "READY", 
  "data": {} 
}
```

## Спасибо

Большое спасибо команде **PulseSync** за создание отличной программы для кастомизации тем Яндекс.Музыки!

Если вы хотите поддержать разработчиков PulseSync или узнать больше об их работе, посетите их [официальную страницу](https://pulsesync.dev) или [репозиторий на GitHub](https://github.com/PulseSync-LLC/YMusic-DRPC).
