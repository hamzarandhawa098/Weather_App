import { defineStore } from 'pinia';
import apiClient from '@/api/axiosConfig';

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weatherData: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchWeather(city) {
      this.loading = true;
      this.error = null;
      this.weatherData = null; 
      try {
        const apiKey = '711dcb777b24f3347cbb50d56901acf4';
        const response = await apiClient.get(`/weather?q=${city}&appid=${apiKey}&units=metric`);
        this.weatherData = response.data;
      } catch (err) {
        this.error = 'City not found or an error occurred';
      } finally {
        this.loading = false;
      }
    },
  },
});