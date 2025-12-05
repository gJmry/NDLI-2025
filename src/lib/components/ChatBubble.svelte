<script lang="ts">
    export let text: string;
    export let sender: "user" | "bot";
</script>

<div
    class="table mb-2 px-3 py-2 rounded font-mono text-[14px] leading-tight
           shadow-[0_0_10px_rgba(0,255,0,0.3)]
           border break-words
           max-w-[80%]
           {sender === 'user' 
               ? 'ml-auto bg-green-700 text-green-100 border-green-500 text-right' 
               : 'mr-auto bg-green-900 text-green-300 border-green-600'
           }"
>
    {text}
</div>
