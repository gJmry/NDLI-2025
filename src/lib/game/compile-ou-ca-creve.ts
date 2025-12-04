type Package = { name: string; good: boolean };
type Block = { id: number; text: string; bad?: boolean };

let packages: Package[] = [
    { name: "gcc", good: true },
    { name: "vim", good: true },
    { name: "kernel-gaulois.tar.gz", good: true },
    { name: "GAFAM-googlePotion.exe", good: false },
    { name: "trackingPlus.js", good: false },
    { name: "make", good: true },
    { name: "windows_ROMAN32.dll", good: false }
];

let chaudron: Package[] = [];
let poubelle: Package[] = [];
let message = "";
let gamePhase = 1;

let commandBlocks: Block[] = [
    { id: 1, text: "gcc" },
    { id: 2, text: "main.c" },
    { id: 3, text: "-o" },
    { id: 4, text: "potion" },
    { id: 5, text: "--with-magic" },
    { id: 6, text: "romanOS.dll", bad: true }
];

let assembled: Block[] = [];
const correctOrder = ["gcc", "main.c", "-o", "potion", "--with-magic"];

function onDrop(target: "chaudron" | "poubelle", pkg: Package) {
    if (target === "chaudron") {
        chaudron = [...chaudron, pkg];
        message = pkg.good ? "Par Toutatis ! Un bon paquet ajouté !" : "Aïe ! Ce fichier sent le Romain…";
    } else {
        poubelle = [...poubelle, pkg];
        message = pkg.good ? "NON ! Tu as jeté un paquet libre !" : "Bien joué, sabotage romain évité !";
    }

    packages = packages.filter((p) => p !== pkg);

    if (packages.length === 0) {
        setTimeout(() => {
            gamePhase = 2;
        }, 500);
    }
}

function dropBlock(e: DragEvent) {
    const id = Number(e.dataTransfer?.getData("block"));
    const block = commandBlocks.find((b) => b.id === id);
    if (!block) return;

    if (!assembled.includes(block)) assembled = [...assembled, block];
    if (block.bad) message = "Par Bélénos ! Cette dépendance est ROMAINE !";
}

function checkCommand() {
    const playerCmd = assembled.map((b) => b.text);
    if (JSON.stringify(playerCmd) === JSON.stringify(correctOrder)) {
        gamePhase = 3;
    } else {
        message = "La compilation échoue ! Un romain a dû encore toucher ton code…";
    }
}