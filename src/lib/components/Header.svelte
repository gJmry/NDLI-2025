<script>
    let mobileMenuOpen = false;
    
    function toggleMenu() {
        mobileMenuOpen = !mobileMenuOpen;
    }
</script>

<!-- Header -->
<header class="bg-stone-900 border-b-4 border-amber-700 shadow-lg">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-20 items-center justify-between">
            <!-- Logo -->
            <a href="/" class="flex items-center gap-3 group">
                <span class="text-3xl">🏛️</span>
                <span class="text-2xl font-black text-amber-300 group-hover:text-amber-200 transition">
                    Village Gaulois
                </span>
            </a>
            
            <!-- Navigation desktop -->
            <nav class="hidden md:flex space-x-8 text-amber-100 font-semibold">
                <a href="/" class="hover:text-amber-300 transition-colors">
                    Accueil
                </a>
                <a href="/village" class="hover:text-amber-300 transition-colors">
                    Village
                </a>
                <a href="/papyrus-form" class="hover:text-amber-300 transition-colors">
                    Nous contacter
                </a>
            </nav>
            
            <!-- Bouton mobile -->
            <button 
                class="md:hidden p-2 rounded text-amber-300 hover:bg-stone-800 transition" 
                on:click={toggleMenu}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
    </div>
    
    <!-- Menu mobile -->
    {#if mobileMenuOpen}
        <nav class="md:hidden px-4 pb-4 space-y-3 text-amber-100 border-t border-amber-700/30">
            <a href="/" class="block py-2 hover:text-amber-300 transition">Accueil</a>
            <a href="/village" class="block py-2 hover:text-amber-300 transition">Village</a>
            <a href="/papyrus-form" class="block py-2 hover:text-amber-300 transition">Nous contacter</a>
        </nav>
    {/if}
</header>