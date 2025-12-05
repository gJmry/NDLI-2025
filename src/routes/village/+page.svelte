<script>
    import village from '$lib/assets/village-gaulois.webp';
    import TooltipDot from "$lib/components/TooltipDot.svelte";

    let tooltipDots = [
        {
            id: 1,
            title: "Jeu n°1 - Libre ou pas libre",
            desc: "Ceci est le premier jeu !",
            route: "libre-ou-pas-libre",
            x: 990,
            y: 210
        },
        {
            id: 2,
            title: "Jeu n°2 - Attrape le menhir",
            desc: "Ceci est le deuxième jeu !",
            route: "attrape-le-menhir",
            x: 830,
            y: 560
        },
        {
            id: 3,
            title: "Jeu n°3 - Empire romain",
            desc: "Ceci est le troisième jeu !",
            route: "empire-romain",
            x: 420,
            y: 460
        },
        {
            id: 4,
            title: "Jeu n°4 - Quiz",
            desc: "Ceci est le quatrième jeu !",
            route: "quiz",
            x: 1365,
            y: 520
        }
    ];
</script>

<main class="relative flex justify-center w-full">
    <img src="{village}" alt="Village gaulois" class="h-screen"/>

    {#each tooltipDots as dot}
        <TooltipDot
                title="{dot.title}"
                desc="{dot.desc}"
                route="{dot.route}"
                x={dot.x}
                y={dot.y}
        />
    {/each}
</main>
