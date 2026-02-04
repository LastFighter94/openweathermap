<template>
    <!-- Форма для добавления новой локации -->
    <div :class="b('add-location-box')">
        <input
          v-model="locationInput"
          type="text"
          placeholder="Введите локацию"
          @keyup.enter="addLocation"
        />
        <button @click="addLocation">Добавить</button>
    </div>

    <!-- Список текущих локаций -->
    <div :class="b('locations-list')">
        <div
          v-for="location in locations"
          :key="location"
          :class="b('locations-list--item')"
        >
            <span>{{ location }}</span>
            <button @click="removeLocation(location)">🗑️</button>
        </div>
    </div>

    <!-- Loader -->
    <UiSpinLoader v-if="isLoading" />

    <!-- Карточки погоды -->
    <div :class="b('weather-cards')">
        <WeatherCard
          v-for="location in locations"
          :key="location"
          :weather="weatherData[location] || null"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import WeatherCard from './components/WeatherCard.vue';
import { UiSpinLoader } from '@/ui/spin-loader';
import { WeatherData, type Coords } from '@/model';
import { useStyle } from '@/lib/style';
import { toast } from 'vue3-toastify';
// скачал данную библиотеку чтобы не писать UI элемент модального окна или notification
// обычно не использую библиотеки, а пишу custom решения на такие случаи, потому что
// ими проще управлять впоследствии (если очень срочно - тогда библиотеки)
import 'vue3-toastify/dist/index.css';
// import { mockData } from '@/mockData';

const { b } = useStyle('main-page');

/* =======================
   State
======================= */

const locations = ref<string[]>([]); // стартовые локации
// const locations = ref<string[]>(['London', 'Paris', 'Test']); // стартовые локации - для mock отображения (unblock task)

const locationInput = ref('');
const pendingRequests = ref(0);

const isLoading = computed(() => pendingRequests.value > 0);

const weatherData = reactive<Record<string, WeatherData | null>>({});
// const weatherData = reactive<Record<string, WeatherData | null>>(mockData);
// для mock отображения (unblock task) - если вдруг API просто ничего
// не возвращает по их внутренней ошибке (видимо ограничены запросы)

/* =======================
   Base fetch helper
======================= */

async function fetchWeatherBase(url: string): Promise<WeatherData | null> {
    pendingRequests.value++;

    try {
        const res = await fetch(url);
        if (!res.ok) return null;

        return await res.json();
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        pendingRequests.value--;
    }
}

/* =======================
   Fetch by city
======================= */

async function fetchWeatherByCity(city: string): Promise<boolean> {
    const url = `${process.env.URL_BASE}weather?q=${city}&units=metric&APPID=${process.env.API_KEY}`;
    const data = await fetchWeatherBase(url);

    if (!data) {
        weatherData[city] = null;
        toast.error('Город не найден, попробуйте ввести другой');
        return false;
    }

    weatherData[city] = data;
    return true;
}

/* =======================
   Fetch by coords
======================= */

async function fetchWeatherByCoords(lat: number, lon: number): Promise<void> {
    const url = `${process.env.URL_BASE}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.API_KEY}`;
    const data = await fetchWeatherBase(url);

    if (!data) {
        toast.error('Не удалось определить местоположение пользователя');
        return;
    }

    if (!locations.value.includes(data.name)) {
        locations.value.push(data.name);
    }

    weatherData[data.name] = data;
}

/* =======================
   Add / remove city
======================= */

async function addLocation() {
    const city = locationInput.value.trim();
    if (!city || locations.value.includes(city)) return;

    locationInput.value = '';

    const success = await fetchWeatherByCity(city);
    if (success) {
        locations.value.push(city);
    }
}

function removeLocation(city: string) {
    locations.value = locations.value.filter(l => l !== city);
    delete weatherData[city];
}

/* =======================
   Geolocation
======================= */

async function resolveCoords(): Promise<Coords | null> {
    // Browser geolocation
    if ('geolocation' in navigator) {
        try {
            return await new Promise<Coords>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                  pos =>
                    resolve({
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude,
                    }),
                  reject,
                  { enableHighAccuracy: true, timeout: 8000 }
                );
            });
        } catch {
            // fallback
        }
    }

    // IP fallback
    try {
        const res = await fetch('https://ipwho.is/');
        const data = await res.json();

        if (!data.success) return null;

        return {
            lat: data.latitude,
            lon: data.longitude,
        };
    } catch {
        return null;
    }
}

/* =======================
   Current location
======================= */

async function addCurrentLocation() {
    const coords = await resolveCoords();
    if (!coords) return;

    await fetchWeatherByCoords(coords.lat, coords.lon);
}

/* =======================
   Lifecycle
======================= */

onMounted(async () => {
    // Добавляем текущую локацию
    await addCurrentLocation();

    // стартовые локации для теста АПИ ручек
    // const defaultCities = ['irkutsk', 'moscow'];
    //
    // // Параллельно получаем погоду
    // await Promise.all(defaultCities.map(async city => {
    //     const success = await fetchWeatherByCity(city);
    //     if (success && !locations.value.includes(city)) {
    //         locations.value.push(city);
    //     }
    // }));
});
</script>

<style scoped lang="scss">
// можно вынести media стили в mixins, также по mobile first схеме
$block: 'main-page';

.#{$block} {
    &__add-location-box,
    &__locations-list {
        width: 100%;
    }

    &__add-location-box {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 10px;

        input {
            flex: 1;
            padding: 5px;
        }

        button {
            padding: 5px 10px;
        }

        @media (min-width: 784px) {
            flex-direction: row;
        }
    }

    &__locations-list {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 15px;

        &--item {
            display: flex;
            justify-content: space-between;
            padding: 5px;
            background-color: #eee;
            border-radius: 5px;
        }

        @media (min-width: 784px) {
            flex-direction: row;
            flex-wrap: wrap;

            &--item {
                flex: 1 1 calc(50% - 10px);
            }
        }

        @media (min-width: 1440px) {
            &--item {
                flex: 1 1 calc(33.33% - 10px);
            }
        }

        @media (min-width: 1820px) {
            &--item {
                flex: 1 1 calc(25% - 15px);
            }
        }
    }

    &__weather-cards {
        display: flex;
        flex-direction: column;
        gap: 10px;

        @media (min-width: 784px) {
            flex-direction: row;
            flex-wrap: wrap;
        }

        & > * {
            flex: 1 1 100%;

            @media (min-width: 784px) {
                flex: 1 1 calc(50% - 10px);
            }

            @media (min-width: 1440px) {
                flex: 1 1 calc(33.33% - 10px);
            }

            @media (min-width: 1820px) {
                flex: 1 1 calc(25% - 15px);
            }
        }
    }
}
</style>
