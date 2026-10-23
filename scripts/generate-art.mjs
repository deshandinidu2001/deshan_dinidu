import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync("public/projects", { recursive: true });
const grid = `<pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0v48" fill="none" stroke="#87949F" stroke-opacity=".09" stroke-width="1"/></pattern>`;
const frame = (bg, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="760" viewBox="0 0 1000 760"><defs>${grid}<linearGradient id="metal" x2="1" y2=".4"><stop stop-color="#303a30"/><stop offset=".45" stop-color="#748066"/><stop offset=".6" stop-color="#394330"/><stop offset="1" stop-color="#1b251c"/></linearGradient><linearGradient id="screen" x2="0" y2="1"><stop stop-color="#29372b"/><stop offset="1" stop-color="#141c16"/></linearGradient></defs><path fill="${bg}" d="M0 0h1000v760H0z"/><path fill="url(#grid)" d="M0 0h1000v760H0z"/>${body}</svg>`;
const label = (text, x, y, color = "#a5b09e", size = 11) =>
  `<text x="${x}" y="${y}" fill="${color}" font-family="monospace" font-size="${size}" letter-spacing="2">${text}</text>`;
const cross = (x, y) =>
  `<path d="M${x - 6} ${y}h12m-6-6v12" stroke="#87949F" stroke-opacity=".5"/>`;
const spectra = frame(
  "#18221a",
  `
${label("SPECTRA / LEAF", 75, 90, "#edeae2", 15)}${label("SENSE. UNDERSTAND. CONNECT.", 75, 115, "#879879", 8)}${cross(920, 80)}
<g transform="translate(540 380) rotate(-22)">
<ellipse cy="150" rx="230" ry="84" fill="#0b120d" opacity=".65"/>
<path d="M-183-25v133c0 70 366 70 366 0V-25" fill="url(#metal)" stroke="#66735c" stroke-width="1"/>
${Array.from({ length: 9 }, (_, i) => `<path d="M-183 ${8 + i * 13}c0 69 366 69 366 0" stroke="#111a12" stroke-opacity=".5" fill="none"/>`).join("")}
<ellipse cy="-25" rx="183" ry="72" fill="#31402c" stroke="#879878"/>
<ellipse cy="-28" rx="155" ry="57" fill="#152218" stroke="#60794d"/>
<ellipse cy="-28" rx="121" ry="42" fill="#1d2e1c" stroke="#405b35"/>
<path d="M-62-20Q-42-87 65-65Q43 1-62-20Z" fill="#6f9140" stroke="#a8c86c" stroke-width=".8"/>
<path d="M-70-15Q-15-44 65-65m-83 28 8-24m17 14 15 13" fill="none" stroke="#b3d276" stroke-width="1"/>
<path d="M-116 40Q-20-8 99 42" stroke="#b1ce7c" stroke-opacity=".5" fill="none" stroke-dasharray="3 7"/>
<circle cx="125" cy="-30" r="7" fill="#c8ff3d"/><circle cx="-114" cy="-52" r="5" fill="#a3c17e"/>
</g>
<g transform="translate(117 380) rotate(-12)"><rect width="158" height="234" rx="19" fill="#0c110e" stroke="#63715a" stroke-width="2"/><rect x="9" y="10" width="140" height="214" rx="12" fill="url(#screen)"/><rect x="61" y="15" width="36" height="5" rx="2" fill="#0c110e"/>${label("SPECTRA", 25, 55, "#edeae2", 10)}<path d="M25 79h106M25 91h63" stroke="#58674f"/><path d="M25 150l18-7 17 3 18-26 13 4 22-21 17 9" fill="none" stroke="#c8ff3d" stroke-width="2"/><path d="M25 170h106M25 184h66M25 198h84" stroke="#58674f" stroke-opacity=".5"/><circle cx="124" cy="53" r="3" fill="#c8ff3d"/></g>
<path d="M290 485C363 508 364 360 405 353" fill="none" stroke="#c8ff3d" stroke-opacity=".6" stroke-dasharray="3 6"/>
${label("SENSOR", 714, 263, "#bac6ae", 9)}<path d="M708 268h-40l-15 43" stroke="#7e906d" fill="none"/><circle cx="653" cy="311" r="3" fill="#c8ff3d"/>
${label("A CONNECTED MONITORING SYSTEM", 75, 680, "#879879", 9)}${cross(920, 670)}
`,
);
const ran = frame(
  "#d8d8cc",
  `${label("RAN TECHNOLOGY", 80, 100, "#344138", 14)}${cross(916, 95)}
<g transform="translate(230 210)"><path d="M0 92 225-35 465 104 238 235Z" fill="#c3c7b3" stroke="#7b8975"/><path d="M0 92v220l238 138V235Z" fill="#859575" stroke="#66795a"/><path d="M238 235v215l227-130V104Z" fill="#526747" stroke="#42583b"/>
<path d="m80 46 231 137v126l75-44V142L157 3" fill="#c8ff3d"/><path d="m42 172 90 52v88l-90-52Z" fill="#354b34"/><path d="m273 290 140-82m-140 108 140-82" stroke="#a9b99a" stroke-width="2"/>
</g><text x="81" y="640" font-family="sans-serif" font-size="105" font-weight="600" letter-spacing="-8" fill="#344138">RAN.</text>${label("TYPESCRIPT / SYSTEM STUDY", 85, 675, "#66745d", 9)}`,
);
const loan = frame(
  "#1d242b",
  `${label("SMARTLOAN / BLMS", 75, 95, "#edeae2", 15)}${cross(917, 90)}<g transform="translate(165 235) rotate(-8 320 150)">
<rect x="0" y="45" width="575" height="280" rx="10" fill="#11181f" stroke="#596776"/><rect x="25" y="20" width="575" height="280" rx="10" fill="#26323b" stroke="#617080"/><rect x="52" width="575" height="280" rx="10" fill="#323f48" stroke="#76838d"/>
<path d="M81 61h160m-160 24h100" stroke="#a2aeb6" stroke-width="5"/><path d="M80 115h520" stroke="#4b5c67"/>
${Array.from({ length: 4 }, (_, i) => `<path d="M82 ${151 + i * 27}h48m25 0h199m45 0h67m28 0h75" stroke="#82919b" stroke-opacity="${0.8 - i * 0.1}" stroke-width="4"/>`).join("")}
<circle cx="548" cy="66" r="28" fill="#c8ff3d"/><path d="m536 66 9 9 16-18" stroke="#26323b" stroke-width="3" fill="none"/>
</g>${label("FRONTEND → BACKEND", 75, 660, "#87949F", 10)}`,
);
const cafe = frame(
  "#171a1c",
  `${label("GAMING CAFÉ", 75, 92, "#edeae2", 17)}${label("CONNECTED SESSION CONTROL", 75, 120, "#87949F", 9)}${cross(920, 85)}
<g stroke="#56636b" stroke-width="1.5" fill="none"><path d="M496 250v95M245 345h500M245 345v75m250-75v75m250-75v75"/><path d="M245 385h500" stroke="#c8ff3d" stroke-dasharray="3 8" stroke-opacity=".6"/></g>
<g transform="translate(387 170)"><path d="m0 38 106-40 118 41-108 44Z" fill="#4d5d52" stroke="#879888"/><path d="M0 38v100l116 48V83Z" fill="#26372c" stroke="#687e6a"/><path d="m116 83 108-44v100l-108 47Z" fill="#384d36" stroke="#687e6a"/><path d="m140 108 57-24m-57 46 57-24m-57 46 57-24" stroke="#c8ff3d" stroke-width="2"/></g>
${[163, 414, 665].map((x, i) => `<g transform="translate(${x} 423)"><path d="m0 0 159 11v117L0 117Z" fill="#263139" stroke="#7c8992"/><path d="m9 11 141 10v96L9 107Z" fill="#0d1418"/><path d="m66 126-8 37h45l-11-36" fill="#4e5b61"/><path d="m50 168 64 4" stroke="#87949f" stroke-width="4"/><path d="M28 52h99m-99 17h60" stroke="#77888e" stroke-opacity=".5"/><rect x="27" y="83" width="48" height="6" fill="${i === 1 ? "#c8ff3d" : "#6b7b68"}"/></g>`).join("")}
${label("SERVER", 456, 150, "#c8ff3d", 9)}${label("TCP / JSON", 437, 376, "#c8ff3d", 9)}${label(".NET 8 / WINDOWS CLIENTS", 75, 675, "#87949F", 9)}`,
);
const kiosk = frame(
  "#bfc7c7",
  `${label("PERAVERSE / KIOSK", 75, 95, "#293a42", 14)}${cross(917, 90)}<g transform="translate(350 130) rotate(8 150 240)"><path d="M22 16h270v442H22Z" fill="#819196" stroke="#4e646c"/><rect width="270" height="442" rx="9" fill="#1c2a31" stroke="#637b84" stroke-width="3"/><rect x="13" y="14" width="244" height="402" fill="#243b44"/><path d="M25 30h220v3H25Z" fill="#a9c2c7"/>
<text x="30" y="100" fill="#edeae2" font-family="sans-serif" font-size="33" font-weight="600" letter-spacing="-2">PeraVerse</text>
<path d="m33 149 57-30 64 33-57 34Z" fill="#a8b69e"/><path d="m90 119 59-32 64 33-59 32Z" fill="#c8ff3d"/><path d="m97 186 57-34 64 34-59 32Z" fill="#638b7d"/><path d="M30 249h210m-210 22h135m-135 42h210m-210 22h165m-165 42h210" stroke="#819a9e" stroke-opacity=".7" stroke-width="4"/><circle cx="135" cy="429" r="3" fill="#c8ff3d"/><path d="m88 443-18 90h135l-20-90" fill="#536971"/><path d="M49 534h176" stroke="#293e47" stroke-width="9"/></g>${label("EVENTS → SCHEDULE → INFORMATION", 75, 680, "#4c6269", 9)}`,
);
const erp = frame(
  "#20251f",
  `${label("SKILL / ENGINEERING ERP", 75, 95, "#edeae2", 14)}${cross(920, 90)}
<g transform="translate(490 385)"><circle r="210" stroke="#6c7e5e" stroke-opacity=".5" fill="none" stroke-dasharray="3 9"/>
${Array.from({ length: 6 }, (_, i) => {
  const a = (i * Math.PI) / 3;
  const x = Math.cos(a) * 210,
    y = Math.sin(a) * 210;
  return `<path d="M0 0 ${x} ${y}" stroke="#829474" stroke-opacity=".7"/><g transform="translate(${x} ${y})"><rect x="-48" y="-35" width="96" height="70" rx="3" fill="#303d2c" stroke="#839575"/><path d="M-24-12h48m-48 13h32m-32 13h40" stroke="#b0bda6" stroke-width="2"/></g>`;
}).join("")}
<path d="m0-71 64 36v74L0 76l-64-37v-74Z" fill="#c8ff3d"/><path d="m-64-35 64 37 64-37M0 2v74m0-147V2" stroke="#698a20"/><circle r="104" fill="none" stroke="#c8ff3d" stroke-opacity=".25"/>
</g>${label("ONE PROJECT / CONNECTED WORKFLOWS", 75, 680, "#a1b095", 9)}`,
);
for (const [name, svg] of Object.entries({
  spectra,
  ran,
  loan,
  cafe,
  kiosk,
  erp,
}))
  writeFileSync(`public/projects/${name}.svg`, svg);
console.log("Generated six original SVG system studies.");
