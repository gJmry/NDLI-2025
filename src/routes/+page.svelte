<script>
    import Chatbot from "$lib/components/Chatbot.svelte";
    import Header from "$lib/components/Header.svelte";
    import IntroLogo from "$lib/components/IntroLogo.svelte";
</script>

<!-- <IntroLogo />  a remettre-->
<Header />
<section
    class="bg-gradient-to-r from-green-50 to-white rounded-xl p-8 shadow-sm"
>
    <h2 class="text-2xl font-bold mb-3">
        Bienvenue au Village Numérique Résistant
    </h2>
    <p class="mb-4">
        Découvre comment ton établissement peut réduire sa dépendance aux Big
        Tech, réparer et réemployer le matériel, et adopter des solutions libres
        et durables.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold">Parcours</h3>
            <p class="text-sm text-gray-600">
                Testez le diagnostic de dépendance et suivez un plan d'action.
            </p>
        </div>
        <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold">Ressources</h3>
            <p class="text-sm text-gray-600">
                Logiciels libres, guides de réemploi, et tutoriels Linux.
            </p>
        </div>
        <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold">Communauté</h3>
            <p class="text-sm text-gray-600">
                Contribue, partage ton projet, rejoins la forge des communs.
            </p>
        </div>

        <Chatbot />
    </div>
</section>
