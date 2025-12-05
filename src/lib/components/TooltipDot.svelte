<script>
    export let title;
    export let desc;
    export let route;
    export let x;
    export let y;

    function go() {
        location.assign('http://localhost:5173/' + route);
    }
</script>

<div style="position: absolute; top:{y}px; left:{x}px;">
    <div class="wrapper relative w-lg">
        <input type="button" class="circle" on:click={go}>

        <div class="tooltip absolute bottom-5 bg-green-300 hidden">
            <strong>{title}</strong>
            <p>{desc}</p>
        </div>
    </div>
</div>


<style>
    .circle {
        position: absolute;
        width: 25px;
        height: 25px;
        background-color: red;
        border-radius: 50%;
        cursor: pointer;
    }

    .tooltip {
        padding: 10px;
        border-radius: 6px;
    }

    .wrapper:hover .tooltip {
        display: block;
    }
</style>
