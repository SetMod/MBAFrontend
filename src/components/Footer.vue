<script setup lang="ts">
import useRoutes from '../hooks/useRoutes';

const { getAboutRoute } = useRoutes()
</script>

<template>
    <footer class="bg-black-alpha-20 p-5">
        <div class="grid">
            <div class="field col-4"></div>
            <div class="field col-4">Market Basket Analyze system @2023</div>
            <div class="field col-4">
                <ul class="w-fit">
                    <li>
                        <router-link :to="getAboutRoute()">About</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>