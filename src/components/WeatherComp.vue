<template>
  <div class="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
    <div class="max-w-lg w-full text-center bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-xl p-8">
      <h1 class="text-4xl font-bold mb-6 text-blue-700">🌤 Weather App</h1>
      <div class="flex gap-3">
        <input v-model="city" placeholder="Enter city name" class="p-2 border rounded-[12px] w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white" />
        <button @click="fetchWeather" class=" text-white bg-blue-700 px-2 py-3 border rounded-[12px] font-semibold transition-all">Search</button>
      </div>
      <LoaderSpinner v-if="loading" />
      <div v-if="error" class="mt-4 text-red-300 font-semibold">{{ error }}</div>
      <div v-if="weatherData" class="mt-6 p-6 bg-white text-gray-800 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold">{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <p class="text-lg capitalize">{{ weatherData.weather[0].description }}</p>
        <p class="text-4xl font-bold my-2">{{ weatherData.main.temp }}°C</p>
        <div class="flex justify-between text-gray-700 text-lg mt-4">
          <p>🌡 Feels like: {{ weatherData.main.feels_like }}°C</p>
          <p>💨 Wind: {{ weatherData.wind.speed }} m/s</p>
        </div>
        <div class="flex justify-between text-gray-700 text-lg mt-2">
          <p>💦 Humidity: {{ weatherData.main.humidity }}%</p>
          <p>🌅 Sunrise: {{ formatTime(weatherData.sys.sunrise) }}</p>
        </div>
        <div class="text-gray-700 text-lg mt-2">🌇 Sunset: {{ formatTime(weatherData.sys.sunset) }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useWeatherStore } from '@/stores/WeatherStore';
import { storeToRefs } from 'pinia';
import LoaderSpinner from '@/components/Loader.vue';

const store = useWeatherStore();
const { weatherData, loading, error } = storeToRefs(store);
const city = ref('');

const fetchWeather = () => {
  if (city.value.trim()) {
    store.fetchWeather(city.value);
  }
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
</script>
