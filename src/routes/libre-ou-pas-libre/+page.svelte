<script lang="ts">
    type Package = { name: string; good: boolean; lore?: string };
    function shuffle<T>(arr: T[]): T[] {
        return arr.sort(() => Math.random() - 0.5);
    }

    let basePackages: Package[] = [
        {
            name: "gcc",
            good: true,
            lore: "Compilateur libre : transforme le code source en programmes autonomes. Utiliser des compilateurs libres évite d'être dépendant d'outils propriétaires, facilite l'audit et permet de réduire la consommation en évitant des couches logicielles inutiles."
        },
        {
            name: "vim",
            good: true,
            lore: "Éditeur léger et extensible : favorise la sobriété (peu de ressources), le contrôle local des données et l'efficacité. Un bon éditeur local évite de transmettre son travail à des services externes."
        },
        {
            name: "make",
            good: true,
            lore: "Outil d'automatisation local : permet d'automatiser la construction des programmes de façon reproductible. La reproductibilité permet le réemploi et évite la duplication des efforts, réduisant la charge énergétique."
        },
        {
            name: "kernel-gaulois.tar.gz",
            good: true,
            lore: "Noyau minimal et auditable : un cœur de système simple et transparent réduit la surface d'attaque et facilite la maintenance locale, limitant les besoins en ressources externes et en mises à jour intrusives."
        },
        {
            name: "libpotion.so",
            good: true,
            lore: "Bibliothèque partagée locale : centralise des fonctions réutilisables sans dépendre de services externes. Favorise le réemploi du code et la maintenance communautaire."
        },
        {
            name: "menhir-lang",
            good: true,
            lore: "Langage local pensé pour la robustesse : adopter des langages et écosystèmes ouverts permet de garder le contrôle, d'allonger la durée de vie des logiciels et de réduire la dépendance aux géants."
        },
        {
            name: "potion-compiler",
            good: true,
            lore: "Outil qui compile les recettes magiques locales : garantit que les formules restent contrôlées par le village. C'est un symbole de souveraineté logicielle."
        },
        {
            name: "villageOS-tools",
            good: true,
            lore: "Ensemble d'outils système conçus pour la réparabilité et la sobriété : privilégier des outils faciles à comprendre et réparer réduit l'obsolescence et la consommation."
        },
        {
            name: "druid-magic-api",
            good: true,
            lore: "API ouverte et documentée : permet d'interopérer sans verrouillages, favoriser le partage contrôlé et limiter la centralisation des services."
        },
        {
            name: "obelix-muscles-devkit",
            good: true,
            lore: "Kit de développement simple et résilient : favorise l'automatisation locale, le bricolage réutilisable et l'économie de ressources matérielles et humaines."
        },
        {
            name: "GAFAM-googlePotion.exe",
            good: false,
            lore: "Service propriétaire centralisé : collecte de données et verrouillage. L'adopter revient à envoyer des informations du village directement à l'empire."
        },
        {
            name: "trackingPlus.js",
            good: false,
            lore: "Script de pistage implanté par des acteurs externes : surveille le comportement des villageois et alimente des profils centralisés."
        },
        {
            name: "windows_ROMAN32.dll",
            good: false,
            lore: "Binaire propriétaire et opaque imposant des dépendances : rend le système fragile et dépendant d'acteurs tiers."
        },
        {
            name: "ceasarCloudSync.pkg",
            good: false,
            lore: "Solution de synchronisation centralisée : copy-paste des données du village vers des serveurs étrangers, perte de souveraineté et consommation de bande passante."
        },
        {
            name: "rome-antivirus-2025.exe",
            good: false,
            lore: "Outil de sécurité prétendument offert par l'empire : souvent une façade pour installer des mécanismes de surveillance."
        }
    ];

    let packages = shuffle([...basePackages]);
    let totalGood = packages.filter(p => p.good).length;
    let chaudron: Package[] = [];
    let wrongClicks = 0;
    let message = "";
    let showSummary = false;
    let gamePhase = 1;
    let wrongFlash: string | null = null;
    let showInfo: Package | null = null;

    function selectPackage(pkg: Package) {
        if (showSummary) return;
        if (!pkg.good) {
            wrongClicks++;
            message = "Paquet romain détecté !";
            wrongFlash = pkg.name;
            setTimeout(() => wrongFlash = null, 420);
            return;
        }
        chaudron = [...chaudron, pkg];
        packages = packages.filter(p => p !== pkg);
        message = "Paquet gaulois ajouté !";
        if (packages.filter(p => p.good).length === 0) showSummary = true;
    }

    function restartPhase1() {
        chaudron = [];
        wrongClicks = 0;
        message = "";
        showSummary = false;
        packages = shuffle([...basePackages]);
        totalGood = packages.filter(p => p.good).length;
    }

    function openInfo(pkg: Package) {
        showInfo = pkg;
    }

    function closeInfo() {
        showInfo = null;
    }
</script>

<div class="pixel-wrap">
    <div class="crt">
        <div class="hud">
            <div class="hud-left">GAULOIS HUB</div>
            <div class="hud-center">Mini-jeu — Tri des paquets</div>
            <div class="hud-right">{chaudron.length}/{totalGood}</div>
        </div>

        <div class="stage">
            <div class="title">📦 Trouve uniquement les paquets gaulois</div>
            <div class="subtitle">Clique sur les paquets gaulois. Evite les trucs romains !</div>

            {#if !showSummary}
                <div class="packages">
                    {#each packages as pkg}
                        <div class="pkg {wrongFlash === pkg.name ? 'wrong' : ''}">
                            <div class="pkg-sprite">{pkg.good ? '🍯' : '📦'}</div>
                            <div class="pkg-name" on:click={() => selectPackage(pkg)}>{pkg.name}</div>
                            <button class="info-btn" on:click={() => openInfo(pkg)}>i</button>
                        </div>
                    {/each}
                </div>
                <div class="message">{message}</div>
            {/if}

            {#if showSummary}
                <div class="summary-title">Résultats</div>
                <div class="summary-grid">
                    <div class="summary-block">
                        <div class="block-title">Paquets gaulois</div>
                        {#each chaudron as c}
                            <div class="good">
                                <span class="sprite">🍯</span>
                                <span>{c.name}</span>
                                <button class="info-inline" on:click={() => openInfo(c)}>?</button>
                            </div>
                        {/each}
                    </div>
                    <div class="summary-block">
                        <div class="block-title">Erreurs</div>
                        <div class="bad">{wrongClicks} erreurs</div>
                    </div>
                </div>
                <div class="controls">
                    <button class="btn pixel-btn" on:click={restartPhase1}>RECOMMENCER</button>
                    <a class="btn pixel-btn" href="/village">CONTINUER</a>
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
    }

    .pixel-wrap {
        position: relative;
        min-height: 100vh;
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
        background-image: url("/compile-ou-ca-creve/background-hutte.jpg");
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
        background: linear-gradient(180deg, #001207 0%, #02140b 100%);
        border: 8px solid #0b5b2b;
        box-shadow:
                0 12px 40px rgba(0,0,0,0.8),
                inset 0 0 0 4px rgba(0,0,0,0.6);
        padding: 12px;
        position: relative;
        image-rendering: pixelated;
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

    .stage {
        padding: 18px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }

    .title {
        font-size: 20px;
        color: #fff8cf;
        text-shadow: 1px 1px 0 #000;
        letter-spacing: 1px;
    }

    .subtitle {
        font-size: 16px;
        color: #d8e9c9;
        opacity: 0.9;
    }

    .packages {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 12px;
        width: 100%;
        max-width: 980px;
    }

    .pkg {
        display: flex;
        align-items: center;
        gap: 8px;
        background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.12));
        border: 3px solid rgba(0,0,0,0.6);
        padding: 10px;
        border-radius: 6px;
        color: #f1f5e6;
        box-shadow: 0 6px 12px rgba(0,0,0,0.6);
        transition: transform .08s steps(1), border-color .08s;
        font-size: 13px;
    }

    .pkg:hover { transform: translateY(-4px); border-color: rgba(102,255,102,0.12); }

    .pkg-sprite {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        filter: drop-shadow(1px 1px 0 #000);
    }

    .pkg-name {
        flex: 1;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .info-btn {
        background: #0e2a18;
        border: 2px solid #244a2e;
        color: #cfe9b8;
        padding: 6px 8px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 700;
        font-size: 12px;
    }

    .message {
        min-height: 20px;
        color: #ffd;
        text-shadow: 0 1px 0 #000;
        font-size: 14px;
    }

    .pkg.wrong {
        border-color: #ff4444 !important;
        animation: px-shake .36s steps(4), px-flash .36s steps(4);
        box-shadow: 0 0 0 4px rgba(255,68,68,0.06), 0 6px 10px rgba(0,0,0,0.6);
    }

    @keyframes px-flash {
        0% { box-shadow: 0 0 0 0 rgba(255,68,68,0.6); }
        50% { box-shadow: 0 0 8px 3px rgba(255,68,68,0.35); }
        100% { box-shadow: 0 0 0 0 rgba(255,68,68,0); }
    }
    @keyframes px-shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-6px); }
        50% { transform: translateX(6px); }
        75% { transform: translateX(-4px); }
        100% { transform: translateX(0); }
    }

    .summary-title {
        color: #ffd86b;
        font-weight: 800;
        margin-top: 6px;
        letter-spacing: 1px;
    }

    .summary-grid {
        display: flex;
        gap: 18px;
        margin-top: 12px;
        flex-wrap: wrap;
        justify-content: center;
    }

    .summary-block {
        background: rgba(0,0,0,0.25);
        padding: 12px;
        border-radius: 8px;
        border: 3px solid rgba(255,255,255,0.03);
        min-width: 220px;
    }

    .block-title {
        font-weight: 800;
        color: #cfe9b8;
        margin-bottom: 8px;
        font-size: 13px;
    }

    .good, .bad {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        border-radius: 6px;
        margin: 6px 0;
        font-size: 13px;
    }

    .good { background: #123a14; color: #dff0d8; }
    .bad { background: #3a1212; color: #ffd6d6; justify-content: center; min-height: 44px; align-items: center; }

    .controls { display:flex; gap:12px; margin-top:12px; justify-content:center; }
    .btn { padding: 10px 14px; border-radius: 6px; border: 3px solid rgba(0,0,0,0.5); font-weight: 800; color: #fff; text-decoration: none; }
    .pixel-btn { background: linear-gradient(180deg,#163b1b,#0d2a13); box-shadow: 0 6px 12px rgba(0,0,0,0.6); cursor: pointer; }

    .info-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 60; }
    .info-card { background: #04120a; padding: 18px; border-radius: 8px; border: 4px solid #0b5b2b; width: min(640px, 94%); color: #e9f6de; box-shadow: 0 12px 40px rgba(0,0,0,0.8); }
    .info-title { font-size: 18px; color: #ffd86b; font-weight: 900; margin-bottom: 8px; }
    .info-body { font-size: 14px; line-height: 1.3; color: #f1f8e8; }

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
        .packages { grid-template-columns: repeat(2, 1fr); }
        .hud { font-size: 11px; padding: 6px 8px; }
        .pkg { min-width: 120px; padding: 8px; }
    }
</style>
