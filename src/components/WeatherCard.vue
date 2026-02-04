<template>
    <div v-if="weather && weather.cod === 200" :class="b({cold: !!isCold})">
        <div :class="b('info-box')">
            <h1>{{ weather.name }}</h1>
            {{ weather.sys.country }}

            <div :class="b('info-box--coords')">
                <p>X: {{ weather.coord.lon }}</p>
                <p>Y: {{ weather.coord.lat }}</p>
            </div>

            <div :class="b('info-box--temperature')">
                <h1>Feels like {{ weather.main.temp }} C</h1>
            </div>

            <div :class="b('info-box--weather')">
                <div>
                    <h1>{{ weather.weather[0].main }}</h1>
                    <p>{{ weather.weather[0].description }}</p>
                </div>

                <div>
                    <h1>Pressure</h1>
                    <p>{{ weather.main.pressure }}</p>
                </div>

                <div>
                    <h1>Humidity</h1>
                    <p>{{ weather.main.humidity }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { WeatherData } from '@/model';
import { useStyle } from '@/lib/style';

const { b } = useStyle('weather-card');

const props = defineProps<{ weather: WeatherData | null }>();

const isCold = computed(() =>
  !!(props.weather?.main.temp && props.weather.main.temp < 16)
);
</script>


<style lang="scss">
$block: 'weather-card';

.#{$block} {
    border-radius: 15px;
    background-size: cover;
    background-position: center;
    transition: 0.4s;
    margin-bottom: 20px;
    text-align: center;
    background-image: url('@/assets/images/warm-bg.jpg');
    width: 100%;

    &--cold {
        background-image: url('@/assets/images/cold-bg.jpg');
    }

    &__info-box {
        padding: 10px;

        &--coords,
        &--temperature {
            margin-bottom: 10px;
        }

        &--weather {
            display: flex;
            flex-direction: column;
            gap: 10px;
            justify-content: center;

            > div {
                background-color: rgba(255, 255, 255, 0.85);
                box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
                border-radius: 10px;
                font-size: 0.8rem;
                padding: 5px;
            }

            // планшет
            @media (min-width: 784px) {
                flex-direction: row;
                > div {
                    flex: 1;
                }
            }

            // десктоп
            @media (min-width: 1440px) {
                gap: 15px;
                > div {
                    font-size: 0.9rem;
                    padding: 8px;
                }
            }

            // over-desktop
            @media (min-width: 1820px) {
                gap: 20px;
                > div {
                    font-size: 1rem;
                    padding: 10px;
                }
            }
        }
    }
}
</style>
