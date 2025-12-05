<script>
    let showModal = false;

    function openModal() {
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }
</script>

<main class="w-full h-screen flex justify-center items-center bg-crt-darker pixel-font relative">

    <form
            class="crt-box pixel-font w-[90%] max-w-xl flex flex-col gap-4 text-crt-light relative"
            on:submit|preventDefault
    >
        <div class="scanlines"></div>

        <h1 class="text-crt-title text-2xl font-bold text-center drop-shadow">
            Bienvenue gaulois !
        </h1>

        <h2 class="text-crt-subtitle text-center opacity-90 mb-4">
            Remplis ce formulaire pour obtenir ta certification de gaulois éthique...
        </h2>

        <div class="flex flex-col gap-3">

            <label class="flex flex-col">
                Nom du résistant
                <input
                        type="text"
                        class="bg-crt-dark border-2 border-crt-border pixel-shadow rounded-pixel p-2 text-crt-light focus:outline-none"
                />
            </label>

            <label class="flex flex-col">
                Email
                <input
                        type="email"
                        class="bg-crt-dark border-2 border-crt-border pixel-shadow rounded-pixel p-2 text-crt-light focus:outline-none"
                />
            </label>

            <label class="flex flex-col">
                Sujet
                <input
                        type="text"
                        class="bg-crt-dark border-2 border-crt-border pixel-shadow rounded-pixel p-2 text-crt-light focus:outline-none"
                />
            </label>

            <label class="flex flex-col">
                Message au conseil des druides
                <textarea
                        class="bg-crt-dark border-2 border-crt-border pixel-shadow rounded-pixel p-2 text-crt-light min-h-[120px] focus:outline-none resize-none"
                ></textarea>
            </label>
        </div>

        <button
                type="submit"
                class="pixel-btn mt-4 w-full text-center text-lg"
        >
            Signer le papyrus
        </button>

    </form>
</main>
