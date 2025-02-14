/*
    КЛАССЫ ДЛЯ УПРОЩЕНИЯ РАБОТЫ С ТЕМОЙ
    Автор: WolfySoCute
    Версия: 1.0.0
*/

class StylesManager {
    constructor() {
        this._styles = [];
    }

    add(style) {
        this._styles.push(style);
    }

    clear() {
        this._styles = [];
    }

    get result() {
        return this._styles.join('\n\n');
    }
}

class SettingsManager {
    constructor() {
        this.settings = {};
        this.old_settings = {};
    }

    async update() {
        try {
            const response = await fetch('http://localhost:2007/get_handle');
            if (!response.ok) throw new Error(`Ошибка сети: ${response.status}`);

            const { data } = await response.json();
            if (!data?.sections) {
                console.warn("Структура данных не соответствует ожидаемой");
                return null;
            }

            this.old_settings = this.settings;
            this.settings = this.transformJSON(data);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    transformJSON(input) {
        const result = {};

        try {
            input.sections.forEach(section => {
                section.items.forEach(item => {
                    if (item.type === "text" && item.buttons) {
                        result[item.id] = {};
                        item.buttons.forEach(button => {
                            result[item.id][button.id] = {
                                value: button.text,
                                default: button.defaultParameter
                            };
                        });
                    } else {
                        result[item.id] = {
                            value: item.bool !== undefined ? item.bool : item.input,
                            default: item.defaultParameter
                        };
                    }
                });
            });
        } catch (error) {
            console.error("Failed to transform JSON:", error);
        }
        
        return result;
    }

    getSetting(id) {
        const keys = id.split('.');
        let value = this.settings;

        for (const key of keys) {
            value = value[key];
        }

        return value;
    }

    hasChanged(id) {
        const hasSettings = Object.keys(this.settings).length > 0;
        if (!hasSettings) return true;

        const keys = id.split('.');
        let value = this.settings;
        let oldValue = this.old_settings;

        for (const key of keys) {
            if (value === undefined || oldValue === undefined) return true;
            value = value[key];
            oldValue = oldValue[key];
        }

        return value !== oldValue;
    };
}

class Theme {
    constructor(id) {
        this.id = id;
        this.actions = {};
        this.stylesManager = new StylesManager();
        this.settingsManager = new SettingsManager();
    }

    applyTheme() {
        this.stylesManager.clear();

        for (const id in this.actions) {
            if (this.actions[id]) {
                this.actions[id](this.settingsManager, this.settingsManager.hasChanged(id), this.stylesManager);
            }
        }

        this.applyStyles();
    }

    applyStyles() {
        let themeStylesElement = document.getElementById(`${this.id}-styles`);
        if (!themeStylesElement) {
            themeStylesElement = document.createElement('style');
            themeStylesElement.id = `${this.id}-styles`;
            document.head.appendChild(themeStylesElement);
        }

        themeStylesElement.textContent = this.stylesManager.result;
    }

    addAction(id, callback) {
        this.actions[id] = callback;
    }

    async update() {
        await this.settingsManager.update();
        if (!this.settingsManager.settings) return;

        this.applyTheme();
    }

    start(interval) {
        setInterval(() => this.update(), interval);
        this.update();
    }
}




/* НАЧАЛО ТЕМЫ */

let socket;
const theme = new Theme('WebSocket-Controls');

theme.addAction('websocket.port', (settingsManager, hasChanged, styles) => {
    const setting = settingsManager.getSetting('websocket.port');

	if (!setting) return;
    if (!setting.value) return;

	if (socket?.readyState === WebSocket.OPEN || !hasChanged) return
	if (socket) socket.close();

	socket = new WebSocket(`ws://localhost:${setting.value}`);

	socket.addEventListener('open', () => {
		console.log('Подключено к серверу');
	});
	
	socket.addEventListener('message', (event) => {
		console.log(`Получено от сервера: ${event.data}`);

		const message = JSON.parse(event.data);
		
		if (message.type == 'connected') console.log(message.data);
		else if (message.type == 'forward') window.player.moveForward();
		else if (message.type == 'backward') window.player.moveBackward();
		else if (message.type == 'pause') window.player.togglePause();
		else if (message.type == 'volume-down') window.player.decreaseVolume(Number(message.data) / 100 || 0.05);
		else if (message.type == 'volume-up') window.player.increaseVolume(Number(message.data) / 100 || 0.05);
	});
	
	socket.addEventListener('error', (error) => {
		console.error('Ошибка:', error);
	});
});

theme.start(5000);


