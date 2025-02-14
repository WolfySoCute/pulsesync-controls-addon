# [Русская версия](README_RU.md) 🇷🇺  
*Нажмите, чтобы переключиться на русский язык.*

# WebSocket Controls

**WebSocket Controls** is an addon-client for controlling Yandex Music via the WebSocket protocol.
> **Note:** This project was initially created for personal use, but anyone is welcome to use it for their own purposes.

## Installation (for DeckBoard)
To set up WebSocket Controls with DeckBoard, follow these steps:
1. **Install the addon in PulseSync.**
2. **Install the [PulseSync Controls](https://github.com/WolfySoCute/deckboard-pulsesync-controls) plugin for DeckBoard.**
3. **Configure the port in the DeckBoard settings and addon settings.**

## Usage in Other Programs
You can integrate WebSocket Controls with other programs that support WebSocket. If your program does not have built-in WebSocket support, you may need to develop an additional plugin.

## For Developers
When working with WebSocket, JSON messages of the following format are used:
```json
{
  "type": "Action type",
  "data": "Additional information"
}
```

### Available Message Types:
- `{ type: "connected", data: "Welcome message to the client" }`  
  Sends a message confirming successful connection. Optional.
- `{ type: "forward" }`  
  Skips to the next track.
- `{ type: "backward" }`  
  Skips to the previous track.
- `{ type: "pause" }`  
  Pauses playback.
- `{ type: "volume-down", data: "5" }`  
  Decreases volume by the specified value (in percentage).
- `{ type: "volume-up", data: "5" }`  
  Increases volume by the specified value (in percentage).

## Thank You
A big thank you to the **PulseSync team** for creating an excellent program for customizing Yandex.Music themes!  
If you'd like to support the developers or learn more about their work, visit their [official website](https://pulsesync.dev) or [GitHub repository](https://github.com/PulseSync-LLC/YMusic-DRPC).
