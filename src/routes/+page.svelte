<script>
    import Header from "$lib/components/Header.svelte";
    import IntroLogo from "$lib/components/IntroLogo.svelte";
</script>


<IntroLogo />

 <Header />
<section class="relative bg-gradient-to-br from-stone-800 via-amber-950 to-stone-900 text-amber-50 py-20 overflow-hidden">
    <!-- Décor discret -->
    <div class="absolute inset-0 opacity-10">
        <div class="absolute bottom-0 left-[10%] w-16 h-32 bg-stone-600 opacity-50"></div>
        <div class="absolute bottom-0 right-[15%] w-12 h-24 bg-stone-700 opacity-40"></div>
    </div>
    
    <div class="relative mx-auto max-w-5xl px-6 text-center">
        <div class="mb-6 flex justify-center gap-4 text-5xl">
            <span class="animate-bounce" style="animation-duration: 2s;">🗿</span>
            <span class="animate-bounce" style="animation-duration: 2s; animation-delay: 0.2s;">⚔️</span>
            <span class="animate-bounce" style="animation-duration: 2s; animation-delay: 0.4s;">🛡️</span>
        </div>
        
        <h1 class="text-5xl md:text-6xl font-black text-amber-300 mb-6 drop-shadow-lg">
            Bienvenue au Village Gaulois !
        </h1>
        
        <p class="text-xl md:text-2xl text-amber-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Un village numérique qui résiste à l'envahisseur Big Tech... 
            Par Toutatis, rejoins la résistance !
        </p>
        
        <div class="inline-block bg-stone-900/60 backdrop-blur-sm border-2 border-amber-600/40 rounded-lg p-6 mb-10">
            <p class="text-amber-200 text-sm mb-2 font-semibold">
                🏆 Développé pour la Nuit de l'Info 2025 par
            </p>
            <p class="text-amber-100 font-bold text-lg">
                Titouan-Lysandre André • Nathan Priano<br>
                Jérémy Girard • Axel Raimondo
            </p>
        </div>
        
        <!-- Gros bouton CTA -->
        <a 
            href="/village"
            class="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-black text-xl px-10 py-5 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200 border-4 border-amber-700"
        >
            <span class="text-2xl">🏛️</span>
            Entrer dans le village
            <span class="text-2xl">→</span>
        </a>
    </div>
</section>

<!-- Section Concept -->
<section class="bg-stone-100 py-16">
    <div class="mx-auto max-w-6xl px-6">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-black text-stone-800 mb-4">
                🗺️ Le Concept
            </h2>
            <div class="w-24 h-1 bg-amber-600 mx-auto rounded-full"></div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg border-4 border-amber-700/20 p-8 md:p-12">
            <div class="prose prose-lg max-w-none">
                <p class="text-stone-700 text-lg leading-relaxed mb-6">
                    Bienvenue dans un village gaulois pas comme les autres ! Ici, <strong class="text-amber-700">Astérix, Obélix et leurs compagnons</strong> luttent contre l'invasion du numérique irresponsable et de la dépendance aux géants de la tech.
                </p>
                
                <p class="text-stone-700 text-lg leading-relaxed mb-6">
                    À travers des <strong class="text-amber-700">missions ludiques et des mini-jeux</strong>, tu découvriras les principes du <strong class="text-amber-700">NIRD</strong> (Numérique Inclusif, Responsable et Durable) : 
                </p>
                
                <div class="grid md:grid-cols-3 gap-6 my-8">
                    <div class="bg-amber-50 border-2 border-amber-600/30 rounded-lg p-6 text-center">
                        <div class="text-4xl mb-3">♻️</div>
                        <h3 class="font-black text-stone-800 mb-2">Réemploi</h3>
                        <p class="text-sm text-stone-600">
                            Apprends à réparer et réutiliser le matériel plutôt que de le jeter
                        </p>
                    </div>
                    
                    <div class="bg-amber-50 border-2 border-amber-600/30 rounded-lg p-6 text-center">
                        <div class="text-4xl mb-3">🔓</div>
                        <h3 class="font-black text-stone-800 mb-2">Logiciels Libres</h3>
                        <p class="text-sm text-stone-600">
                            Découvre les alternatives open source aux outils propriétaires
                        </p>
                    </div>
                    
                    <div class="bg-amber-50 border-2 border-amber-600/30 rounded-lg p-6 text-center">
                        <div class="text-4xl mb-3">🛡️</div>
                        <h3 class="font-black text-stone-800 mb-2">Indépendance</h3>
                        <p class="text-sm text-stone-600">
                            Réduis ta dépendance aux Big Tech et reprends le contrôle
                        </p>
                    </div>
                </div>
                
                <p class="text-stone-700 text-lg leading-relaxed">
                    Chaque défi complété te rapproche de la victoire finale : <strong class="text-amber-700">devenir un véritable gaulois du numérique responsable</strong> ! 🏆
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Section CTA Final -->
<section class="bg-gradient-to-br from-amber-900 to-stone-900 text-amber-50 py-16">
    <div class="mx-auto max-w-4xl px-6 text-center">
        <h2 class="text-4xl font-black text-amber-300 mb-6">
            Prêt à rejoindre la résistance ?
        </h2>
        <p class="text-xl text-amber-100 mb-8">
            Entre dans le village, accomplis les missions et deviens un héros du numérique responsable !
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
                href="/village"
                class="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-black text-lg px-8 py-4 rounded-lg shadow-xl transform hover:scale-105 transition-all"
            >
                <span>🏛️</span>
                Découvrir le village
            </a>
            <a 
                href="/papyrus-form"
                class="inline-flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-amber-300 font-black text-lg px-8 py-4 rounded-lg shadow-xl transform hover:scale-105 transition-all border-2 border-amber-600/50"
            >
                <span>📜</span>
                Nous contacter
            </a>
        </div>
        <p class="text-amber-400 text-sm mt-8 italic">
            "Ils sont fous ces Romains !" - Obélix
        </p>
    </div>
</section>

<!-- Footer -->
<footer class="bg-stone-900 text-amber-200 py-8 border-t-4 border-amber-700">
    <div class="mx-auto max-w-7xl px-6 text-center">
        <p class="text-sm">
            © 2025 Village Gaulois - Nuit de l'Info 2025
        </p>
        <p class="text-xs text-amber-400 mt-2">
            Développé avec ❤️ et 🧪 potion magique par une équipe de gaulois résistants
        </p>
    </div>
</footer>

<style>
    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-20px);
        }
    }
    
    .animate-bounce {
        animation: bounce 2s ease-in-out infinite;
    }
</style>