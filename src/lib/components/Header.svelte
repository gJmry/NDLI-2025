<header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">

            <a href="#" class="text-2xl font-bold text-gray-800">
                MonLogo
            </a>

            <nav class="hidden md:flex space-x-8 text-gray-600 font-medium">
                <a href="#" class="hover:text-gray-900 transition">Accueil</a>
                <a href="#" class="hover:text-gray-900 transition">Services</a>
                <a href="#" class="hover:text-gray-900 transition">Contact</a>
            </nav>

            <div class="hidden md:block">
                <a href="#"
                   class="rounded-xl bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition">
                    S'inscrire
                </a>
            </div>

            <button class="md:hidden p-2 rounded hover:bg-gray-100 transition" id="menu-btn">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

        </div>
    </div>

    <nav id="mobile-menu" class="md:hidden hidden px-4 pb-4 space-y-3 text-gray-700">
        <a href="#" class="block hover:text-gray-900 transition">Accueil</a>
        <a href="#" class="block hover:text-gray-900 transition">Services</a>
        <a href="#" class="block hover:text-gray-900 transition">Contact</a>
        <a href="#"
           class="block text-center rounded-xl bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition">
            S'inscrire
        </a>
    </nav>

    <script>
        const btn = document.getElementById('menu-btn');
        const menu = document.getElementById('mobile-menu');
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    </script>
</header>
