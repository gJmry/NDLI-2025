<script lang="ts">
    import ChatBubble from "./ChatBubble.svelte";

    let message = "";
    let messages: { text: string; sender: "user" | "bot" }[] = [];
    let thinking = false;
    let open = false; 

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

        await new Promise((r) => setTimeout(r, 400));

        thinking = false;

        messages = [...messages, { text: data.responseMessage, sender: "bot" }];
    }

    function toggleChat() {
        open = !open;
    }
</script>

<div class="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
    {#if open}
        <div class="w-96 rounded-lg border border-green-500 bg-[#032a03] shadow-xl p-2 relative z-10">
            <div class="relative mb-1">
                <h1 class="text-green-400 tracking-widest uppercase text-sm font-bold absolute left-1/2 -translate-x-1/2">
                    Chat d'assistance
                </h1>
                <button class="text-green-300 font-bold absolute right-0 top-0" on:click={toggleChat}>✕</button>
            </div>

            
            <div class="h-80 overflow-y-auto mt-1 p-2 space-y-1">
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
                    class="grow bg-[#021f02] text-green-300 border border-green-700 px-3 py-2 outline-none font-mono text-sm focus:border-green-400 rounded-l"
                    on:keydown={(e) => { if(e.key === 'Enter') sendMessage(); }}
                />
                <button on:click={sendMessage} class="bg-green-700 text-green-200 px-4 py-2 border border-green-600 rounded-r hover:bg-green-600 active:bg-green-500 transition font-mono">
                    Envoyer
                </button>
            </div>
        </div>
    {:else}
        <button on:click={toggleChat} class="bg-green-700 hover:bg-green-800 text-green-50 rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-2xl font-mono">
            ?
        </button>
    {/if}
</div>
