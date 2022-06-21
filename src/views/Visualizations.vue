<template>
  <section>
    <div class="my-5">
      <div class="flex justify-content-around align-items-center">
        <div class="p-card p-5">
          <Chart type="pie" :data="chartData" :options="lightOptions" />
        </div>
        <div class="p-card p-5">
          <Chart type="polarArea" :data="chartData" :options="chartOptions" />
        </div>
        <div class="p-card p-5">
          <Chart type="doughnut" :data="chartData" :options="lightOptions" />
        </div>
        <div class="p-card p-5">
          <Chart type="radar" :data="radarData" :options="chartOptions" />
        </div>
      </div>

      <div class="p-grid flex m-auto">
        <div class="col-5 m-5">
          <Chart type="line" :data="basicData" :options="basicOptions" />
        </div>
        <div class="col-5 m-5">
          <Chart type="bar" :data="basicData" :options="basicOptions" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    const chartData = ref({
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"]
        }
      ]
    });

    const basicData = ref({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#FFA726',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    });

    const radarData = ref({
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    });

    const basicOptions = ref(
      {
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          },
          y: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          }
        }
      }
    );

    const lightOptions = ref({
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      }
    });


    const chartOptions = ref(
      {
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          r: {
            grid: {
              color: '#ebedef'
            }
          }
        }
      }
    );

    return {
      chartData,
      basicData,
      radarData,
      lightOptions,
      basicOptions,
      chartOptions
    }
  },
});
</script>

<style>
</style>