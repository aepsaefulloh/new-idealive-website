<template>
    <footer class="bg-[#3F316F] relative">
        <div class="w-full py-4 md:py-8 overflow-hidden">
            <img src="/images/Floothink-CTA-Cat-Calling-min.png" alt="Cat" class="cat-contact" />

            <span class="block text-[14px] text-white text-center font-funnel">© 2025 <a href="#"
                    class="hover:underline">Floothink</a>. All Rights Reserved.</span>
        </div>
    </footer>
</template>

<script setup>

</script>

<style scoped>
.cat-contact {
    position: absolute;
    right: -2%;
    bottom: -5%;
    width: 200px;
    z-index: 1;
}

@media(max-width: 768px) {
    .cat-contact {
        display: none;
    }
}
</style>