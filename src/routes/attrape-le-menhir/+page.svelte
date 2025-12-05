<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    
    type FallingItem = {
        id: number;
        x: number;
        y: number;
        type: string;
        repairable: boolean;
        emoji: string;
        speed: number;
    };

    let showIntro = true;
    let items: FallingItem[] = [];
    let score = 0;
    let lives = 3;
    let gameOver = false;
    let gameWon = false;
    let itemId = 0;
    let spawnInterval: any;
    let moveInterval: any;
    let obelixRunning = true;
    let crashed = false;
    let showInfo: { name: string; lore: string } | null = null;

    function startGame() {
        showIntro = false;
        // Là tu lances tes timers, spawn, et ton jeu normalement
    }

    const itemTypes = [
        { type: 'cable', repairable: true, emoji: '🔌', name: 'Câble USB', lore: 'Réparable ! Les câbles peuvent être ressoudés, les connecteurs changés. Favorise la réparabilité pour prolonger la durée de vie du matériel.' },
        { type: 'screen', repairable: true, emoji: '🖥️', name: 'Écran', lore: 'Réparable ! Les écrans peuvent être démontés, les dalles remplacées. Éviter de jeter permet d\'économiser ressources et énergie.' },
        { type: 'phone', repairable: true, emoji: '📱', name: 'Téléphone', lore: 'Réparable ! Batteries, écrans, ports peuvent être changés. La réparation combat l\'obsolescence programmée.' },
        { type: 'keyboard', repairable: true, emoji: '⌨️', name: 'Clavier', lore: 'Réparable ! Touches, circuits peuvent être remplacés. Un clavier réparé dure des années.' },
        { type: 'bigtech', repairable: false, emoji: '🏛️', name: 'Big Tech romain', lore: 'Attention ! Symbole de produits verrouillés, non réparables, conçus pour l\'obsolescence. À éviter !' },
        { type: 'cloud', repairable: false, emoji: '☁️', name: 'Cloud impérial', lore: 'Piège ! Centralisation des données, dépendance aux géants. Privilégier le local et l\'autonomie.' },
        { type: 'lock', repairable: false, emoji: '🔒', name: 'Verrou propriétaire', lore: 'Danger ! Empêche la réparation et l\'accès au matériel. Combat la souveraineté numérique.' },
        { type: 'ads', repairable: false, emoji: '📢', name: 'Publicité invasive', lore: 'Romain ! Consomme de la bande passante, piste les utilisateurs. Pollution numérique.' }
    ];

    function spawnItem() {
        if (gameOver || gameWon || showIntro) return;
        const item = itemTypes[Math.floor(Math.random() * itemTypes.length)];
        items = [...items, {
            id: itemId++,
            x: Math.random() * 85 + 5,
            y: -5,
            type: item.type,
            repairable: item.repairable,
            emoji: item.emoji,
            speed: 1.5 + Math.random() * 1
        }];
    }

    function moveItems() {
        if (gameOver || gameWon || showIntro) return;
        items = items.map(item => ({
            ...item,
            y: item.y + item.speed
        })).filter(item => {
            if (item.y > 100) {
                if (item.repairable) {
                    lives--;
                    if (lives <= 0) {
                        gameOver = true;
                    }
                }
                return false;
            }
            return true;
        });
    }

    function clickItem(item: FallingItem) {
        if (gameOver || gameWon) return;
        
        if (item.repairable) {
            score++;
            items = items.filter(i => i.id !== item.id);
            if (score >= 15) {
                gameWon = true;
            }
        } else {
            crashed = true;
            obelixRunning = false;
            setTimeout(() => {
                lives--;
                if (lives <= 0) {
                    gameOver = true;
                } else {
                    crashed = false;
                    obelixRunning = true;
                }
            }, 800);
            items = items.filter(i => i.id !== item.id);
        }
    }

    function openInfo(item: FallingItem) {
        const itemData = itemTypes.find(t => t.type === item.type);
        if (itemData) {
            showInfo = { name: itemData.name, lore: itemData.lore };
        }
    }

    function closeInfo() {
        showInfo = null;
    }

    function restart() {
        items = [];
        score = 0;
        lives = 3;
        gameOver = false;
        gameWon = false;
        obelixRunning = true;
        crashed = false;
    }

    onMount(() => {
        spawnInterval = setInterval(spawnItem, 1200);
        moveInterval = setInterval(moveItems, 50);
    });

    onDestroy(() => {
        if (spawnInterval) clearInterval(spawnInterval);
        if (moveInterval) clearInterval(moveInterval);
    });
</script>

<div class="pixel-wrap">
    <div class="crt">
        {#if showIntro}
    <div class="fixed inset-0 bg-black/80 text-white flex flex-col items-center justify-center z-50 p-6">
        <h1 class="text-4xl font-bold mb-6">Bienvenue dans la Chasse aux Objets du Village NIRD</h1>

        <p class="max-w-xl text-center mb-6 text-lg">
            Obélix doit aider le village à réduire sa dépendance aux Big Tech.  
            Attrape les objets **réparables**, évite les déchets des romains,  
            et deviens un vrai résistant gaulois libre !
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {#each itemTypes as item}
                <div class="bg-white/10 p-4 rounded-lg text-center">
                    <div class="text-4xl mb-2">{item.emoji}</div>
                    <div class="font-semibold">{item.name}</div>
                    <div class="text-sm opacity-80">{item.lore}</div>
                </div>
            {/each}
        </div>

        <button 
            on:click={startGame}
            class="bg-yellow-400 text-black px-6 py-3 rounded-lg text-xl font-bold hover:bg-yellow-300 transition"
        >
            Commencer l'aventure
        </button>
    </div>
{/if}

        <div class="hud">
            <div class="hud-left">MENHIR NUMÉRIQUE</div>
            <div class="hud-center">Attrape les objets réparables !</div>
            <div class="hud-right">
                <span>Score: {score}/15</span>
                <span>❤️ {lives}</span>
            </div>
        </div>

        <div class="game-area">
            <!-- Obélix qui court -->
            <div class="obelix {obelixRunning ? 'running' : ''} {crashed ? 'crashed' : ''}">
                <div class="obelix-sprite">{crashed ? '💥' : '🧔'}</div>
                <div class="menhir">🗿</div>
            </div>

            <!-- Objets qui tombent -->
            {#each items as item (item.id)}
                <div 
                    class="falling-item {item.repairable ? 'good' : 'bad'}"
                    style="left: {item.x}%; top: {item.y}%;"
                    on:click={() => clickItem(item)}
                    on:contextmenu|preventDefault={() => openInfo(item)}
                >
                    {item.emoji}
                </div>
            {/each}

            {#if gameOver}
                <div class="game-end">
                    <div class="end-title">💥 BOUM !</div>
                    <div class="end-text">Les Romains ont eu raison d'Obélix...</div>
                    <div class="end-score">Score final : {score}/15</div>
                    <div class="controls">
                        <button class="btn pixel-btn" on:click={restart}>REJOUER</button>
                        <a class="btn pixel-btn" href="./">RETOUR</a>
                    </div>
                </div>
            {/if}

            {#if gameWon}
                <div class="game-end win">
                    <div class="end-title">🎉 VICTOIRE !</div>
                    <div class="end-text">T'as bien mérité un sanglier !</div>
                    <div class="sanglier">🐗</div>
                    <div class="end-score">Score parfait : {score}/15</div>
                    <div class="controls">
                        <button class="btn pixel-btn" on:click={restart}>REJOUER</button>
                        <a class="btn pixel-btn" href="/village">CONTINUER</a>
                    </div>
                </div>
            {/if}

            {#if !gameOver && !gameWon && !showIntro}
                <div class="instructions">
                    Clique sur les objets numériques 🔧<br>
                    Évite les déchets romains 🏛️
                </div>
            {/if}
        </div>

        {#if showInfo}
            <div class="info-overlay" on:click={closeInfo}>
                <div class="info-card" on:click|stopPropagation>
                    <div class="info-title">{showInfo.name}</div>
                    <div class="info-body">{showInfo.lore}</div>
                    <div class="info-actions">
                        <button class="btn pixel-btn" on:click={closeInfo}>FERMER</button>
                    </div>
                </div>
            </div>
        {/if}

        <div class="scanlines"></div>
    </div>
</div>

<style>
    @font-face {
        font-family: 'Pixel';
        src: local('Courier New'), local('monospace');
    }
    :global(html,body) {
        height: 100%;
        margin: 0;
        background: #0b0b0b;
        font-family: 'Pixel', monospace;
        overflow: hidden;
    }

    .pixel-wrap {
        position: relative;
        height: 100vh;
        padding: 18px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .pixel-wrap::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image: url("/attrape-le-menhir/background-hutte.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(10px);
        transform: scale(1.05);
        pointer-events: none;
        z-index: 0;
    }

    .crt {
        width: min(1100px, 96%);
        height: 90vh;
        background: linear-gradient(180deg, #001207 0%, #02140b 100%);
        border: 8px solid #0b5b2b;
        box-shadow:
                0 12px 40px rgba(0,0,0,0.8),
                inset 0 0 0 4px rgba(0,0,0,0.6);
        padding: 12px;
        position: relative;
        image-rendering: pixelated;
        display: flex;
        flex-direction: column;
    }

    .hud {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: repeating-linear-gradient(90deg, rgba(0,0,0,0.15) 0 2px, rgba(255,255,255,0.02) 2px 4px);
        padding: 8px 12px;
        border-bottom: 4px solid rgba(0,0,0,0.6);
        color: #bfe8a6;
        font-weight: 700;
        letter-spacing: 1px;
        font-size: 13px;
        text-transform: uppercase;
    }

    .hud-right {
        display: flex;
        gap: 16px;
    }

    .game-area {
        flex: 1;
        position: relative;
        overflow: hidden;
        background: linear-gradient(180deg, rgba(0,50,30,0.2) 0%, rgba(0,20,10,0.4) 100%);
    }

    .obelix {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: flex-end;
        gap: 8px;
        font-size: 48px;
        filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.8));
        z-index: 10;
    }

    .obelix.running .obelix-sprite {
        animation: run 0.4s steps(2) infinite;
    }

    .obelix.crashed {
        animation: crash 0.8s ease-out;
    }

    @keyframes run {
        0% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
        100% { transform: translateY(0); }
    }

    @keyframes crash {
        0% { transform: translateX(-50%) scale(1); }
        50% { transform: translateX(-50%) scale(1.3) rotate(10deg); }
        100% { transform: translateX(-50%) scale(0.8) rotate(-5deg); }
    }

    .menhir {
        font-size: 64px;
        animation: float 2s ease-in-out infinite;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
    }

    .falling-item {
        position: absolute;
        font-size: 36px;
        cursor: pointer;
        user-select: none;
        transition: transform 0.1s;
        filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.6));
    }

    .falling-item:hover {
        transform: scale(1.2);
    }

    .falling-item.good {
        animation: pulse-good 1s ease-in-out infinite;
    }

    .falling-item.bad {
        animation: pulse-bad 1s ease-in-out infinite;
    }

    @keyframes pulse-good {
        0%, 100% { filter: drop-shadow(2px 2px 4px rgba(0,255,0,0.3)); }
        50% { filter: drop-shadow(2px 2px 8px rgba(0,255,0,0.6)); }
    }

    @keyframes pulse-bad {
        0%, 100% { filter: drop-shadow(2px 2px 4px rgba(255,0,0,0.3)); }
        50% { filter: drop-shadow(2px 2px 8px rgba(255,0,0,0.6)); }
    }

    .instructions {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        color: #ffd86b;
        text-align: center;
        font-size: 14px;
        background: rgba(0,0,0,0.6);
        padding: 12px 20px;
        border-radius: 8px;
        border: 2px solid rgba(255,255,255,0.1);
        line-height: 1.5;
    }

    .game-end {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.85);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        z-index: 20;
    }

    .game-end.win {
        background: rgba(0,50,0,0.85);
    }

    .end-title {
        font-size: 48px;
        color: #ffd86b;
        font-weight: 900;
        text-shadow: 3px 3px 0 #000;
    }

    .end-text {
        font-size: 20px;
        color: #e9f6de;
    }

    .sanglier {
        font-size: 80px;
        animation: bounce 1s ease-in-out infinite;
    }

    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }

    .end-score {
        font-size: 24px;
        color: #bfe8a6;
        font-weight: 700;
    }

    .controls {
        display: flex;
        gap: 12px;
        margin-top: 12px;
    }

    .btn {
        padding: 10px 14px;
        border-radius: 6px;
        border: 3px solid rgba(0,0,0,0.5);
        font-weight: 800;
        color: #fff;
        text-decoration: none;
        font-size: 14px;
    }

    .pixel-btn {
        background: linear-gradient(180deg,#163b1b,#0d2a13);
        box-shadow: 0 6px 12px rgba(0,0,0,0.6);
        cursor: pointer;
    }

    .pixel-btn:hover {
        transform: translateY(-2px);
    }

    .info-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 60;
    }

    .info-card {
        background: #04120a;
        padding: 18px;
        border-radius: 8px;
        border: 4px solid #0b5b2b;
        width: min(640px, 94%);
        color: #e9f6de;
        box-shadow: 0 12px 40px rgba(0,0,0,0.8);
    }

    .info-title {
        font-size: 18px;
        color: #ffd86b;
        font-weight: 900;
        margin-bottom: 8px;
    }

    .info-body {
        font-size: 14px;
        line-height: 1.5;
        color: #f1f8e8;
        margin-bottom: 12px;
    }

    .info-actions {
        display: flex;
        justify-content: center;
    }

    .scanlines {
        position: absolute;
        inset: 0;
        background-image: linear-gradient(rgba(0,0,0,0.02) 50%, rgba(255,255,255,0.01) 50%);
        background-size: 100% 4px;
        pointer-events: none;
        mix-blend-mode: overlay;
        opacity: 0.18;
    }

    @media (max-width: 720px) {
        .hud {
            font-size: 11px;
            padding: 6px 8px;
        }
        .falling-item {
            font-size: 28px;
        }
        .obelix {
            font-size: 36px;
        }
        .menhir {
            font-size: 48px;
        }
    }
</style>