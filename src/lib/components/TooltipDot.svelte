<script>
    export let title;
    export let desc;
    export let route;
    export let x;
    export let y;
</script>

<div style="position: absolute; top:{y}px; left:{x}px;">
    <div class="wrapper relative w-lg">
        <a href="http://localhost:5173/{route}">
            <img class="w-12" src="/src/lib/assets/3d-shield.png" alt="Bouclier gaulois">
        </a>

        <div class="tooltip absolute bottom-5 bg-green-300 hidden">
            <strong>{title}</strong>
            <p>{desc}</p>
        </div>
    </div>
</div>

<style>
    .tooltip {
        padding: 10px;
        border-radius: 6px;
    }

    .wrapper:hover .tooltip {
        display: block;
    }
</style>
