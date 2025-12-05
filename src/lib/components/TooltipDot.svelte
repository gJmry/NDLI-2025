<script>
    export let title;
    export let desc;
    export let route;
    export let xPercent;
    export let yPercent;
    export let style;
</script>

<div style="position: absolute; top:{yPercent}px; left:{xPercent}px;">
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
        margin-bottom: 24px;
    }

    .wrapper:hover .tooltip {
        display: block;
    }

    @keyframes floating {
        0% { 
            transform: translateY(-5%); 
            box-shadow: 0;
        }
        50% { 
            transform: translateY(5%);
            box-shadow: 0 15px 15px rgba(0, 0, 0, 0.3); 
        }
        100% { 
            transform: translateY(-5%); 
            box-shadow: 0;
        }
    }
    .wrapper img {
        animation: floating 2s ease-in-out infinite;
    }
</style>