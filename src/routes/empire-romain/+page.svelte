<script lang="ts">
    import { onMount } from "svelte";

    type Emoji = {
        id: number;
        img: string;
        x: number;
        y: number;
        vx: number;
        vy: number;
        isTarget: boolean;
        size: number;
    };

    let emojis: Emoji[] = [];
    const totalEmojis = 400;
    const stageWidth = 800;
    const stageHeight = 400;

    let gameOver = false;
    let message = "";
    let time = 0; // temps écoulé
    let timerInterval: NodeJS.Timer;

    function random(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    function initEmojis() {
        emojis = [];
        const logos = [
            "/logos/docker.png",
            "/logos/gnu.png",
            "/logos/linux.png",
            "/logos/python.png",
            "/logos/rust.png",
            "/logos/vim.svg"
        ];

        for (let i = 0; i < totalEmojis; i++) {
            const isTarget = i === 0;
            emojis.push({
                id: i,
                img: isTarget ? "/logos/windows.png" : logos[Math.floor(Math.random() * logos.length)],
                x: random(0, stageWidth - 32),
                y: random(0, stageHeight - 32),
                vx: random(1, 3) * (Math.random() < 0.5 ? 1 : -1),
                vy: random(1, 3) * (Math.random() < 0.5 ? 1 : -1),
                isTarget,
                size: 32
            });
        }
    }

    function update() {
        if (gameOver) return;

        emojis.forEach(e => {
            e.x += e.vx;
            e.y += e.vy;

            if (e.x <= 0 || e.x >= stageWidth - e.size) e.vx *= -1;
            if (e.y <= 0 || e.y >= stageHeight - e.size) e.vy *= -1;
        });

        emojis = [...emojis];
        requestAnimationFrame(update);
    }

    function handleStageClick(evt: MouseEvent) {
        const stageEl = evt.currentTarget as HTMLElement;
        const rectStage = stageEl.getBoundingClientRect();
        const mx = evt.clientX - rectStage.left;
        const my = evt.clientY - rectStage.top;

        const clickZone = 20;

        for (const e of emojis) {
            if (mx >= e.x - clickZone && mx <= e.x + e.size + clickZone &&
                my >= e.y - clickZone && my <= e.y + e.size + clickZone) {
                if (e.isTarget) {
                    gameOver = true;
                    message = `Bravo ! Tu as trouvé Windows en ${time.toFixed(2)} secondes !`;
                    clearInterval(timerInterval);
                } else {
                    message = "Oups ! Ce n'est pas Windows.";
                }
                break;
            }
        }
    }

    function restart() {
        gameOver = false;
        message = "";
        time = 0;
        initEmojis();
        update();

        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (!gameOver) time += 0.01;
        }, 10);
    }

    onMount(() => {
        initEmojis();
        update();

        timerInterval = setInterval(() => {
            if (!gameOver) time += 0.01;
        }, 10);
    });
</script>

<div class="pixel-wrap">
    <div class="crt">
        <div class="hud">
            <div class="hud-left">GAULOIS HUB</div>
            <div class="hud-center">Mini-jeu — Trouve Windows !</div>
            <div class="hud-right">Temps: {time.toFixed(2)}s</div>
        </div>

        <div class="stage" on:click={handleStageClick}>
            {#each emojis as e (e.id)}
                <img
                        src={e.img}
                        class="emoji"
                        class:target={e.isTarget}
                        style="left:{e.x}px; top:{e.y}px; width:{e.size}px; height:{e.size}px"
                />
            {/each}

            {#if gameOver}
                <div class="game-over">
                    {message} <br />
                    <button class="btn pixel-btn" on:click={restart}>RECOMMENCER</button>
                    <a class="btn pixel-btn" href="/">CONTINUER</a>
                </div>
            {/if}
        </div>

        <div class="scanlines"></div>
    </div>
</div>


<style>
    .pixel-wrap {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        background: #0b0b0b;
        font-family: monospace;
    }

    .crt {
        width: min(900px, 96%);
        background: linear-gradient(180deg,#001207 0%,#02140b 100%);
        border: 8px solid #0b5b2b;
        padding: 12px;
        position: relative;
        image-rendering: pixelated;
    }

    .hud {
        display:flex;
        justify-content:space-between;
        padding:6px 12px;
        background: repeating-linear-gradient(90deg, rgba(0,0,0,0.15) 0 2px, rgba(255,255,255,0.02) 2px 4px);
        color:#bfe8a6;
        font-weight:700;
        font-size:13px;
        letter-spacing:1px;
    }

    .stage {
        position: relative;
        width: 800px;
        height: 400px;
        margin-top: 12px;
        background: #01210b;
        border: 3px solid #0b5b2b;
        overflow: hidden;
        border-radius: 6px;
    }

    .emoji {
        position: absolute;
        cursor: pointer;
        transition: transform .08s steps(1);
        filter: drop-shadow(1px 1px 0 #000);
    }

    .emoji:hover {
        transform: scale(1.3);
    }

    .game-over {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        padding: 24px;
        background: radial-gradient(circle at top left, #111 0%, #001b00 100%);
        border: 4px solid #0b5b2b;
        border-radius: 12px;
        box-shadow: 0 0 20px #00adef, 0 0 40px rgba(0,173,239,0.3);
        text-align: center;
        font-size: 22px;
        color: #00adef;
        font-weight: 900;
        text-shadow: 1px 1px 0 #000, 0 0 10px #00adef;
        animation: popupGlow 1.2s infinite alternate;
        z-index: 100;
    }

    @keyframes popupGlow {
        0% { box-shadow: 0 0 20px #00adef, 0 0 40px rgba(0,173,239,0.3); }
        100% { box-shadow: 0 0 30px #00adef, 0 0 60px rgba(0,173,239,0.5); }
    }

    .btn { padding: 10px 14px; border-radius:6px; border:3px solid rgba(0,0,0,0.5); font-weight:800; color:#fff; cursor:pointer; }
    .pixel-btn { background: linear-gradient(180deg,#163b1b,#0d2a13); box-shadow:0 6px 12px rgba(0,0,0,0.6); }

    .scanlines {
        position:absolute;
        inset:0;
        background-image: linear-gradient(rgba(0,0,0,0.02) 50%, rgba(255,255,255,0.01) 50%);
        background-size: 100% 4px;
        pointer-events:none;
        mix-blend-mode: overlay;
        opacity:0.18;
    }
    .emoji {
        position: absolute;
        cursor: pointer;
        transition: transform .08s steps(1);
        filter: drop-shadow(1px 1px 0 #000);
    }

    .emoji:hover {
        transform: scale(1.3);
    }

    .hud-right {
        font-weight: 700;
        color: #bfe8a6;
    }
</style>
