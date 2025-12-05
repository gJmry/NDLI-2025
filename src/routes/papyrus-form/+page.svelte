<script>
    import { onMount } from 'svelte';
    
    let showModal = false;
    let isSubmitting = false;
    let druidApproval = 0;
    let magicPotion = false;
    let obelixHungry = false;
    let romanAlert = false;
    let formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };
    
    // Variables pour ajuster la taille du parchemin
    let parchmentScale = 0.85; // Vous pouvez modifier cette valeur (0.8, 1.2, etc.)
    
    async function handleSubmit() {
        
        isSubmitting = true;
        druidApproval = 0;
        
        // Animation de validation par les druides
        const interval = setInterval(() => {
            druidApproval += Math.random() * 15;
            if (druidApproval >= 100) {
                druidApproval = 100;
                clearInterval(interval);
            }
        }, 200);
        
        try {
            // Envoi du formulaire à ton API backend
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi');
            }
            
            // Attendre que l'animation soit terminée
            while (druidApproval < 100) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            setTimeout(() => {
                isSubmitting = false;
                showModal = true;
            }, 500);
            
        } catch (error) {
            console.error('Erreur:', error);
            clearInterval(interval);
            isSubmitting = false;
            alert('Erreur lors de l\'envoi du message. Par Toutatis, réessaye !');
        }
    }
    
    function closeModal() {
        showModal = false;
        formData = { name: '', email: '', subject: '', message: '' };
    }

</script>

<main class="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 relative overflow-hidden py-8">
    <!-- Décor de village gaulois -->
    <div class="absolute inset-0 opacity-20">
        <div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-green-900/40 to-transparent"></div>
        <div class="absolute bottom-0 left-[5%] w-24 h-64 tree"></div>
        <div class="absolute bottom-0 left-[15%] w-20 h-56 tree" style="animation-delay: 0.5s;"></div>
        <div class="absolute bottom-0 right-[8%] w-28 h-72 tree" style="animation-delay: 1s;"></div>
        <div class="absolute bottom-0 right-[20%] w-16 h-48 tree" style="animation-delay: 1.5s;"></div>
        <div class="absolute bottom-0 left-[25%] hut"></div>
        <div class="absolute bottom-0 right-[30%] hut" style="animation-delay: 0.8s;"></div>
    </div>
    
    <!-- Menhirs décoratifs -->
    <div class="absolute bottom-0 left-[10%] menhir"></div>
    <div class="absolute bottom-0 left-[5%] menhir-small"></div>
    <div class="absolute bottom-0 right-[12%] menhir"></div>
    <div class="absolute bottom-0 right-[6%] menhir-small"></div>
    
    <!-- Fumée des huttes -->
    <div class="absolute bottom-32 left-[28%] smoke"></div>
    <div class="absolute bottom-28 right-[32%] smoke" style="animation-delay: 1s;"></div>
    

    <!-- Formulaire sur parchemin -->
    <div class="relative z-10" style="transform: scale({parchmentScale});">
        <!-- Torches décoratives autour du parchemin -->
        <div class="absolute -top-16 -left-12 text-6xl animate-flicker drop-shadow-2xl z-20">🔥</div>
        <div class="absolute -top-16 -right-12 text-6xl animate-flicker drop-shadow-2xl z-20" style="animation-delay: 0.5s;">🔥</div>
        
        <form
            class="parchment-container relative w-[95vw] max-w-3xl"
            on:submit|preventDefault={handleSubmit}
        >
            <!-- Image de parchemin en arrière-plan -->
            <div class="parchment-image"></div>
            
            <!-- Contenu du formulaire -->
            <div class="parchment-content relative z-10 p-12">
                <div class="text-center mb-8">
                    <h1 class="text-5xl font-black text-stone-800 drop-shadow-md mb-3 tracking-wide parchment-title">
                        📜 Parchemin du Village 📜
                    </h1>
                    <p class="text-stone-700 text-base italic font-semibold">
                        "Par Toutatis! Remplis ce formulaire pour rejoindre la résistance gauloise..."
                    </p>
                </div>

                <div class="flex flex-col gap-6">
                    <!-- Nom -->
                    <label class="flex flex-col gap-2">
                        <span class="text-stone-800 font-black text-sm flex items-center gap-2">
                            🗡️ Nom du guerrier
                            <span class="text-xs text-stone-600 italic font-normal">(obligatoire)</span>
                        </span>
                        <input
                            type="text"
                            required
                            bind:value={formData.name}
                            placeholder="Ex: Astérix, Obélix..."
                            class="parchment-input"
                        />
                    </label>

                    <!-- Email -->
                    <label class="flex flex-col gap-2">
                        <span class="text-stone-800 font-black text-sm flex items-center gap-2">
                            📧 Pigeon voyageur (Email)
                            <span class="text-xs text-stone-600 italic font-normal">(obligatoire)</span>
                        </span>
                        <input
                            type="email"
                            required
                            bind:value={formData.email}
                            placeholder="ton.nom@village-gaulois.gaul"
                            class="parchment-input"
                        />
                    </label>

                    <!-- Sujet -->
                    <label class="flex flex-col gap-2">
                        <span class="text-stone-800 font-black text-sm flex items-center gap-2">
                            🎯 Mission
                            <span class="text-xs text-stone-600 italic font-normal">(obligatoire)</span>
                        </span>
                        <input
                            type="text"
                            required
                            bind:value={formData.subject}
                            placeholder="Demande de potion, bataille..."
                            class="parchment-input"
                        />
                    </label>

                    <!-- Message -->
                    <label class="flex flex-col gap-2">
                        <span class="text-stone-800 font-black text-sm flex items-center gap-2">
                            ✍️ Message au conseil des druides
                            <span class="text-xs text-stone-600 italic font-normal">(obligatoire)</span>
                        </span>
                        <textarea
                            required
                            bind:value={formData.message}
                            placeholder="Raconte ton histoire, tes exploits, ou demande conseil au druide Panoramix..."
                            class="parchment-input min-h-[160px] resize-none"
                        ></textarea>
                    </label>
                </div>

                <!-- Bouton submit -->
                <button
                    type="submit"
                    disabled={isSubmitting}
                    class="submit-button mt-8 w-full"
                >
                    {#if isSubmitting}
                        <div class="flex items-center justify-center gap-3">
                            <div class="animate-spin text-2xl">⚔️</div>
                            <span>Validation druides... {Math.floor(druidApproval)}%</span>
                        </div>
                        <div class="absolute bottom-0 left-0 h-1 bg-green-500 transition-all duration-300 rounded-full" style="width: {druidApproval}%"></div>
                    {:else}
                        <span class="flex items-center justify-center gap-2">
                            🗿 Graver sur le menhir
                        </span>
                    {/if}
                </button>
                
                <p class="text-center text-xs text-stone-700 italic mt-4 font-semibold">
                    "Ils sont fous ces Romains!" - Obélix
                </p>
            </div>
        </form>
    </div>

    <!-- Modal de succès -->
    {#if showModal}
        <div class="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div class="bg-gradient-to-br from-amber-800 to-stone-900 border-4 border-amber-500 rounded-xl p-10 max-w-lg w-full text-center relative animate-bounceIn shadow-2xl">
                <div class="absolute top-0 left-1/4 text-4xl animate-ping">✨</div>
                <div class="absolute top-0 right-1/4 text-4xl animate-ping" style="animation-delay: 0.2s;">✨</div>
                
                <div class="text-7xl mb-6 animate-bounce">🎉</div>
                <h2 class="text-4xl font-black text-amber-300 mb-6">
                    Par Toutatis!
                </h2>
                <p class="text-2xl text-amber-100 mb-8">
                    Le conseil des druides a approuvé ta demande!
                </p>
                <div class="bg-stone-800/50 border-2 border-amber-600 rounded-lg p-6 mb-8">
                    <p class="text-amber-200 italic text-lg">
                        "Un sanglier rôti t'attend au banquet du village! 🐗"
                    </p>
                    <p class="text-sm text-amber-400 mt-3">
                        - Abraracourcix, Chef du village
                    </p>
                </div>
                <button
                    on:click={closeModal}
                    class="bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 px-10 rounded-lg transform hover:scale-105 transition-all text-lg"
                >
                    Fermer le parchemin
                </button>
            </div>
        </div>
    {/if}
</main>

<style>
    /* Conteneur du parchemin */
    .parchment-container {
        position: relative;
        min-height: 800px;
    }
    
    /* Image de parchemin en arrière-plan */
    .parchment-image {
        position: absolute;
        inset: 0;
        background-image: url('/papyrus-form/parchemin.png');
        background-size: 100% 100%; /* Étire l'image pour remplir */
        background-position: center;
        background-repeat: no-repeat;
        filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5));
        pointer-events: none;
    }
    
    /* Si l'image ne charge pas, fallback avec texture générée */
    .parchment-image::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, #f4e4c1 0%, #e8d4a8 50%, #f4e4c1 100%);
        background-image: 
            radial-gradient(circle at 20% 50%, rgba(139, 115, 85, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 115, 85, 0.12) 0%, transparent 50%),
            linear-gradient(135deg, #f4e4c1 0%, #e8d4a8 50%, #f4e4c1 100%);
        box-shadow: 
            inset 0 0 80px rgba(139, 115, 85, 0.3),
            0 0 0 4px #d4b896,
            0 0 0 8px #c9a87a;
        border: 3px solid #b89968;
        border-radius: 8px;
        z-index: -1;
    }
    
    /* Contenu par-dessus le parchemin */
    .parchment-content {
        position: relative;
        z-index: 10;
    }
    
    /* Style des inputs sur parchemin */
    .parchment-input {
        background: rgba(255, 250, 240, 0.85);
        color: #3e2723;
        border: 2px solid #a68a5c;
        border-radius: 6px;
        padding: 12px 16px;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.3s;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .parchment-input:focus {
        outline: none;
        border-color: #8b6f47;
        background: rgba(255, 252, 245, 0.95);
        box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.1),
            0 0 0 3px rgba(139, 111, 71, 0.2);
    }
    
    .parchment-input:hover {
        border-color: #9d7e54;
    }
    
    .parchment-input::placeholder {
        color: #8b7355;
        opacity: 0.7;
    }
    
    /* Titre sur parchemin */
    .parchment-title {
        text-shadow: 
            2px 2px 0 rgba(212, 184, 150, 0.4),
            1px 1px 10px rgba(139, 115, 85, 0.3);
    }
    
    /* Bouton submit */
    .submit-button {
        background: linear-gradient(135deg, #b8860b, #daa520, #b8860b);
        color: white;
        font-weight: 900;
        font-size: 18px;
        padding: 16px 32px;
        border-radius: 8px;
        border: 3px solid #8b6914;
        box-shadow: 
            0 6px 0 #6b5010,
            0 10px 20px rgba(0, 0, 0, 0.4);
        transition: all 0.2s;
        position: relative;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .submit-button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 
            0 8px 0 #6b5010,
            0 12px 25px rgba(0, 0, 0, 0.5);
    }
    
    .submit-button:active:not(:disabled) {
        transform: translateY(2px);
        box-shadow: 
            0 4px 0 #6b5010,
            0 6px 15px rgba(0, 0, 0, 0.3);
    }
    
    .submit-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    /* Décor village (identique à avant) */
    .tree {
        background: linear-gradient(to top, #3d2817, #5a4030);
        clip-path: polygon(40% 0%, 50% 10%, 60% 0%, 70% 20%, 80% 10%, 90% 30%, 100% 100%, 0% 100%, 10% 30%, 20% 10%, 30% 20%);
        animation: sway 4s ease-in-out infinite;
    }
    
    @keyframes sway {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(2deg); }
    }
    
    .hut {
        width: 100px;
        height: 80px;
        background: linear-gradient(to bottom, #8b6f47, #6b5436);
        border-radius: 50% 50% 0 0;
        position: relative;
        animation: float-hut 6s ease-in-out infinite;
    }
    
    .hut::after {
        content: '';
        position: absolute;
        bottom: -20px;
        left: 10%;
        width: 80%;
        height: 20px;
        background: #5a4030;
        border-radius: 0 0 4px 4px;
    }
    
    @keyframes float-hut {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }
    
    .menhir {
        width: 60px;
        height: 200px;
        background: linear-gradient(to right, #7a7a7a, #a0a0a0, #8a8a8a);
        clip-path: polygon(30% 0%, 70% 0%, 90% 100%, 10% 100%);
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
        animation: menhir-glow 3s ease-in-out infinite;
        opacity: 0.7;
    }
    
    .menhir-small {
        width: 40px;
        height: 140px;
        background: linear-gradient(to right, #888, #aaa, #999);
        clip-path: polygon(30% 0%, 70% 0%, 85% 100%, 15% 100%);
        box-shadow: -3px 0 10px rgba(0, 0, 0, 0.3);
        animation: menhir-glow 3s ease-in-out infinite;
        animation-delay: 1s;
        opacity: 0.6;
    }
    
    @keyframes menhir-glow {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.2); }
    }
    
    .smoke {
        width: 30px;
        height: 60px;
        background: radial-gradient(circle, rgba(200, 200, 200, 0.4), transparent);
        border-radius: 50%;
        animation: rise 4s ease-in-out infinite;
        filter: blur(8px);
    }
    
    @keyframes rise {
        0% {
            transform: translateY(0) scale(0.8);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
        }
    }
    
    .animate-bird {
        animation: fly 20s linear infinite;
    }
    
    @keyframes fly {
        0% { transform: translateX(-100px); }
        100% { transform: translateX(calc(100vw + 100px)); }
    }
    
    @keyframes flicker {
        0%, 100% { 
            opacity: 1; 
            filter: brightness(1) drop-shadow(0 0 20px rgba(255, 150, 0, 0.8));
        }
        50% { 
            opacity: 0.85;
            filter: brightness(1.3) drop-shadow(0 0 30px rgba(255, 150, 0, 1));
        }
    }
    
    .animate-flicker {
        animation: flicker 2s ease-in-out infinite;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
    }
    
    @keyframes bounceIn {
        0% {
            transform: scale(0.3);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .animate-bounceIn {
        animation: bounceIn 0.5s ease-out;
    }
    
</style>