<script>
  import { onMount } from 'svelte';
  import Asterix from '$lib/assets/Asterix.webp'
  import LogoKlub from '$lib/assets/LogoKlub.png'
  
  let phase = 'klub-big'; // klub-big, klub-move, content-show, fade-out
  let showScreen = true;

  onMount(() => {
    // Klub apparaît en grand au centre
    const timer1 = setTimeout(() => {
      phase = 'klub-move';
    }, 500);

    // Klub se déplace en haut
    const timer2 = setTimeout(() => {
      phase = 'content-show';
    }, 1800);

    // Début du fade out
    const timer3 = setTimeout(() => {
      phase = 'fade-out';
    }, 7000);

    // Suppression complète du composant
    const timer4 = setTimeout(() => {
      showScreen = false;
    }, 9500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  });
</script>

{#if showScreen}
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-1500 overflow-hidden medieval-bg"
    class:opacity-0={phase === 'fade-out'}
    class:opacity-100={phase !== 'fade-out'}
  >
    <!-- Texture parchemin -->
    <div class="absolute inset-0 parchment-texture"></div>
    
    <!-- Bordures celtiques -->
    <div class="absolute top-0 left-0 right-0 h-16 celtic-border"></div>
    <div class="absolute bottom-0 left-0 right-0 h-16 celtic-border"></div>
    
    <!-- Particules de poussière -->
    <div class="absolute inset-0 overflow-hidden">
      {#each Array(25) as _, i}
        <div
          class="absolute w-1 h-1 bg-amber-100/20 rounded-full dust-particle"
          style="
            top: {Math.random() * 100}%;
            left: {Math.random() * 100}%;
            animation-delay: {Math.random() * 5}s;
            animation-duration: {4 + Math.random() * 4}s;
          "
        />
      {/each}
    </div>

    <!-- Container principal -->
    <div class="relative w-full h-full flex items-center justify-center">
      
      <!-- Logo Klub - commence grand au centre, puis monte en haut -->
      <div
        class="absolute transition-all duration-1000 ease-in-out"
        style={
          phase === 'klub-big'
            ? 'left: 50%; top: 50%; transform: translate(-50%, -50%) scale(2);'
            : phase === 'klub-move'
            ? 'left: 50%; top: 15%; transform: translate(-50%, -50%) scale(0.8);'
            : 'left: 50%; top: 15%; transform: translate(-50%, -50%) scale(0.8);'
        }
        class:opacity-100={phase !== 'klub-big'}
        class:opacity-0={phase === 'klub-big'}
      >
        <img
          src={LogoKlub}
          alt="Logo Klub"
          class="w-32 h-32 object-contain drop-shadow-[0_0_25px_rgba(251,146,60,0.5)]"
          class:animate-float={phase === 'content-show'}
          crossorigin="anonymous"
        />
      </div>

      <!-- Contenu principal - apparaît après que Klub soit en haut -->
      <div
        class="flex items-center gap-16 transition-all duration-1000"
        class:opacity-100={phase === 'content-show'}
        class:scale-100={phase === 'content-show'}
        class:opacity-0={phase !== 'content-show'}
        class:scale-90={phase !== 'content-show'}
      >
        <!-- Texte vient de la gauche -->
        <div 
          class="text-center transition-transform duration-1000"
          style={phase === 'content-show' ? 'transform: translateX(0);' : 'transform: translateX(-100px);'}
        >
          <h1 class="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Nuit de l'info
          </h1>
          <div class="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-amber-300 to-orange-200 mt-2 drop-shadow-[0_0_20px_rgba(0,0,0,0.6)]">
            2025
          </div>
          <div class="mt-6 h-2 w-full bg-gradient-to-r from-transparent via-orange-400/60 to-transparent rounded-full animate-pulse shadow-[0_0_15px_rgba(251,146,60,0.4)]" />
        </div>

        <!-- Astérix vient de la droite -->
        <div 
          class="relative transition-transform duration-1000"
          style={phase === 'content-show' ? 'transform: translateX(0);' : 'transform: translateX(100px);'}
        >
          <img
            src={Asterix}
            alt="Astérix"
            class="w-80 h-auto object-contain drop-shadow-[0_0_30px_rgba(251,146,60,0.4)] animate-bounce-slow"
            crossorigin="anonymous"
          />
          <!-- Effet de brillance dorée -->
          <div class="absolute bg-gradient-to-r from-transparent via-orange-200 to-transparent opacity-20 animate-shimmer" />
        </div>
      </div>

      <!-- Barre de chargement en bas -->
      <div
        class="absolute bottom-16 left-1/2 -translate-x-1/2 w-[500px] transition-all duration-700"
      >
        <div class="text-center text-yellow-200 text-xs tracking-[0.3em] mb-4 animate-pulse font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          CHARGEMENT
        </div>
        <div class="h-2 bg-yellow-950/40 rounded-full overflow-hidden backdrop-blur-sm border border-yellow-600/30">
          <div class="h-full bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-500 rounded-full animate-loading shadow-[0_0_25px_rgba(251,191,36,0.9)]" />
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Fond médiéval parchemin */
  .medieval-bg {
    background: linear-gradient(135deg, #2c2416 0%, #3d3124 50%, #2c2416 100%);
  }

  .parchment-texture {
    background-image: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(139, 115, 85, 0.03) 2px,
        rgba(139, 115, 85, 0.03) 4px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 2px,
        rgba(139, 115, 85, 0.03) 2px,
        rgba(139, 115, 85, 0.03) 4px
      );
    opacity: 0.4;
  }

  .celtic-border {
    background: 
      repeating-linear-gradient(
        90deg,
        rgba(139, 115, 85, 0.3) 0px,
        rgba(139, 115, 85, 0.3) 20px,
        transparent 20px,
        transparent 40px
      ),
      linear-gradient(to bottom, rgba(139, 115, 85, 0.2), transparent);
    border-top: 1px solid rgba(139, 115, 85, 0.3);
  }

  @keyframes dust-particle {
    0% {
      opacity: 0;
      transform: translateY(0) translateX(0);
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 0;
      transform: translateY(-50px) translateX(20px);
    }
  }

  .dust-particle {
    animation: dust-particle 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes loading {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }

  .animate-loading {
    animation: loading 7s ease-out forwards;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  .animate-shimmer {
    animation: shimmer 2.5s ease-in-out infinite;
  }

  @keyframes bounce-slow {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }

  .animate-bounce-slow {
    animation: bounce-slow 3s ease-in-out infinite;
  }

  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>