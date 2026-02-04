# Weather App 🌤️

> Приложение для отображения погоды в разных локациях с поддержкой текущей геолокации пользователя.

---

## 🛠 Requirements

- Node.js: `v18.16.0` (tested)
- Node.js: `v20.9.0` (tested)
- Node.js: `v22.17.0` (tested)
- npm / yarn: latest stable

---

## ⚡ Installation

Склонируйте репозиторий и установите зависимости:

```bash
1) git clone <REPO_URL>
2) cd <PROJECT_FOLDER>
3) npm install
# или
yarn install
4) npm run dev или yarn dev
```

---

## 🗝 Environment Variables

Вы можете положить в .env файл свой ключ от API https://api.openweathermap.org

API_KEY=ВАШ_КЛЮЧ_ЗДЕСЬ

## 🌍 Features

- 🏠 Добавление и удаление локаций
- 📍 Определение текущей геолокации пользователя
- ⚡ Параллельная загрузка погоды
- ⏳ Loader при ожидании API
- 🔔 Уведомления об ошибках через vue3-toastify
## 📦 Installed Libraries

Ниже перечислены ключевые библиотеки, используемые в проекте, с описанием и ссылками на документацию.

---

### 🌟 Dependencies (runtime)

| 📦 Library | Version | 📝 Description | 🔗 Reference |
|------------|---------|----------------|--------------|
| `vue` | ^3.5.27 | Основной фронтенд-фреймворк для создания SPA | [vuejs.org](https://vuejs.org/) |
| `vue3-toastify` | ^0.2.8 | Уведомления / toast для Vue 3 | [npm](https://www.npmjs.com/package/vue3-toastify) |
| `lodash` | ^4.17.23 | Утилитарные функции для работы с массивами, объектами и т.д. | [lodash.com](https://lodash.com/) |

---

### ⚙️ DevDependencies (для разработки и сборки)

| 📦 Library | Version | 📝 Description | 🔗 Reference |
|------------|---------|----------------|--------------|
| `typescript` | ^5.2.2 | Статическая типизация для JS | [typescriptlang.org](https://www.typescriptlang.org/) |
| `@types/lodash` | ^4.17.23 | Типы TypeScript для lodash | [npm](https://www.npmjs.com/package/@types/lodash) |
| `webpack` | ^5.104.1 | Сборщик модулей | [webpack.js.org](https://webpack.js.org/) |
| `webpack-cli` | ^5.1.0 | CLI для webpack | [webpack.js.org](https://webpack.js.org/) |
| `webpack-dev-server` | ^4.15.1 | Локальный dev server с hot reload | [webpack.js.org](https://webpack.js.org/configuration/dev-server/) |
| `vue-loader` | ^17.3.0 | Загрузка и компиляция Vue SFC | [vue-loader.vuejs.org](https://vue-loader.vuejs.org/) |
| `ts-loader` | ^9.4.2 | TypeScript loader для webpack | [github](https://github.com/TypeStrong/ts-loader) |
| `sass` | ^1.97.3 | SCSS препроцессор | [sass-lang.com](https://sass-lang.com/) |
| `sass-loader` | ^16.0.6 | Loader для SCSS файлов в webpack | [webpack.js.org](https://webpack.js.org/loaders/sass-loader/) |
| `css-loader` | ^6.8.1 | Обработка CSS файлов в webpack | [webpack.js.org](https://webpack.js.org/loaders/css-loader/) |
| `style-loader` | ^3.3.3 | Вставка CSS в DOM через JS | [webpack.js.org](https://webpack.js.org/loaders/style-loader/) |
| `html-webpack-plugin` | ^5.5.1 | Генерация HTML для сборки webpack | [github](https://github.com/jantimon/html-webpack-plugin) |
| `dotenv-webpack` | ^8.0.1 | Подключение `.env` переменных в webpack | [github](https://github.com/mrsteele/dotenv-webpack) |

---

💡 **Примечания:**

- **Dependencies** — пакеты, необходимые для работы приложения у пользователя.
- **DevDependencies** — пакеты, которые нужны **только во время разработки и сборки** (TypeScript, Webpack, лоадеры).
- Все ссылки ведут на официальную документацию или npm, чтобы быстро посмотреть справку.
