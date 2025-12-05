<script>
    let message = "";
    async function sendMessage() {
        if (!message) return;

        console.log("Sending message:", message);

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        console.log(data);

        message = "";
    }
</script>

<header>
    <div class="w-full">
        <div
            class="w-80 m-auto rounded-lg shadow-[0px_3px_8px_rgba(0,0,0,0.24)]"
        >
            <h1 class="bg-[#fa9017] text-white text-center rounded-t-lg mb-0">
                Chatbox
            </h1>
            <div class="overflow-y-scroll h-80"></div>
            <div class="p-4 border-t flex">
                <input
                    type="text"
                    placeholder="Écrivez votre message..."
                    class="grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    bind:value={message}
                />
                <button
                    class="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
                    on:click={sendMessage}
                >
                    Envoyer
                </button>
            </div>
        </div>
    </div>
</header>
