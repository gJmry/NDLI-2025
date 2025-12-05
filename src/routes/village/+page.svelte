<script>
    import village from '$lib/assets/village-gaulois.webp';
    import TooltipDot from "$lib/components/TooltipDot.svelte";

    const originalWidth = 1600; 
    const originalHeight = 900; 

    let tooltipDots = [
        { id: 1, title: "Jeu n°1 - Libre ou pas libre", desc: "Ceci est le premier jeu !", route: "libre-ou-pas-libre", x: 410, y: 310 },
        { id: 2, title: "Jeu n°2 - Attrape le menhir", desc: "Ceci est le deuxième jeu !", route: "attrape-le-menhir", x: 250, y: 270 },
        { id: 3, title: "Jeu n°3 - Empire romain", desc: "Ceci est le troisième jeu !", route: "empire-romain", x: 590, y: 160 },
        { id: 4, title: "Jeu n°4 - Quiz", desc: "Ceci est le quatrième jeu !", route: "quiz", x: 780, y: 210 }
    ];

    tooltipDots = tooltipDots.map(dot => ({
        ...dot,
        xPercent: (dot.x / originalWidth) * 100,
        yPercent: (dot.y / originalHeight) * 100
    }));
</script>

<main class="flex justify-center items-center w-full min-h-screen
             bg-linear-to-br from-[#031d03] via-[#041f04] to-[#032203]
             relative overflow-hidden">
             
    <div class="absolute inset-0 pointer-events-none opacity-20"
         style="background: repeating-linear-gradient(
             to bottom,
             rgba(0,255,0,0.02) 0px,
             rgba(0,255,0,0.02) 2px,
             transparent 3px,
             transparent 6px
         );">
    </div>

    <h1 class="absolute top-7 text-4xl md:text-5xl font-extrabold text-white 
               bg-green-900 bg-opacity-70 px-6 py-3 rounded-lg 
               border-4 border-green-500 shadow-lg z-10">
        Bienvenue au Village Gaulois !
    </h1>

    <!-- Cadre de l'image -->
    <div class="relative w-full max-w-[1000px] aspect-video 
                border-8 border-[#8B4513] 
                shadow-xl 
                bg-[#A0522D] overflow-hidden">
        <img src="{village}" alt="Village gaulois" class="w-full h-full object-contain" />

        {#each tooltipDots as dot}
            <TooltipDot
                title={dot.title}
                desc={dot.desc}
                route={dot.route}
                xPercent={dot.x}
                yPercent={dot.y}
                style="position: absolute; left: {dot.x}%; top: {dot.y}%; transform: translate(-50%, -50%);"
            />
        {/each}
    </div>

    <a href="/village" class="absolute bottom-7 left-[5%] text-lg md:text-xl font-semibold 
                      text-white bg-green-900 bg-opacity-70 
                      px-5 py-2 rounded-lg 
                      border-4 border-green-500 shadow-lg z-10 
                      hover:bg-green-800 transition">
        Retour à l'accueil
    </a>
</main>
