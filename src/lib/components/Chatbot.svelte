<script lang="ts">
    import ChatBubble from "./ChatBubble.svelte";

    let message = "";
    let messages: { text: string; sender: "user" | "bot" }[] = [];
    let thinking = false;

    async function sendMessage() {
        if (!message.trim()) return;

        const userMessage = message;
        messages = [...messages, { text: userMessage, sender: "user" }];
        message = "";

        thinking = true;

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();

        await new Promise((r) => setTimeout(r, 600));

        thinking = false;

        messages = [...messages, { text: data.responseMessage, sender: "bot" }];
    }
</script>

<header class="w-full min-h-screen flex items-center justify-center text-green-300 font-mono relative overflow-hidden">

    <!-- Scanlines -->
    <div class="absolute inset-0 pointer-events-none opacity-20"
         style="background: repeating-linear-gradient(
             to bottom,
             rgba(0,0,0,0.1) 0px,
             rgba(0,0,0,0.1) 2px,
             transparent 3px,
             transparent 6px
         );">
    </div>

    <div class="w-96 rounded-lg border border-green-500 bg-[#032a03] shadow-xl p-2 relative z-10">

        <h1 class="text-center text-green-400 pb-2 border-b border-green-700 tracking-widest uppercase text-sm">
            Retro Chat Terminal
        </h1>

        <!-- Messages -->
        <div class="h-80 overflow-y-auto mt-2 p-2 space-y-1">
            {#each messages as msg}
                <ChatBubble text={msg.text} sender={msg.sender} />
            {/each}

            {#if thinking}
                <div class="mr-auto mt-1 px-3 py-2 rounded bg-green-900 text-green-400 border border-green-700 max-w-[40%] font-mono text-sm">
                    <span class="inline-flex space-x-1 animate-pulse">
                        <span>.</span><span>.</span><span>.</span>
                    </span>
                </div>
            {/if}
        </div>

        <div class="border-t border-green-700 mt-2 pt-2 flex">
            <input
                type="text"
                bind:value={message}
                placeholder="Tape ton message..."
                class="grow bg-[#021f02] text-green-300 border border-green-700 px-3 py-2 outline-none font-mono text-sm
                       focus:border-green-400 rounded-l"
            />

            <button
                on:click={sendMessage}
                class="bg-green-700 text-green-200 px-4 py-2 border border-green-600 rounded-r
                       hover:bg-green-600 active:bg-green-500 transition font-mono"
            >
                Envoyer
            </button>
        </div>
    </div>
</header>
