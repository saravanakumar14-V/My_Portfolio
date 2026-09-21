// LS test
// test
/**
 * 🌟 CREATIVE ANIMATED FOOD EXPERIENCE
 * Run directly with: node test.ts
 */

// ANSI Styling & 256-Color Palette
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  
  // Colors
  red: "\x1b[38;5;196m",
  orange: "\x1b[38;5;208m",
  yellow: "\x1b[38;5;220m",
  gold: "\x1b[38;5;214m",
  green: "\x1b[38;5;46m",
  lime: "\x1b[38;5;118m",
  cyan: "\x1b[38;5;51m",
  blue: "\x1b[38;5;39m",
  purple: "\x1b[38;5;141m",
  pink: "\x1b[38;5;213m",
  white: "\x1b[38;5;255m",
  gray: "\x1b[38;5;242m",
  darkGray: "\x1b[38;5;236m",
  
  // Backgrounds
  bgDark: "\x1b[48;5;234m",
  bgRed: "\x1b[48;5;52m",
  bgGold: "\x1b[48;5;58m",
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const clear = () => process.stdout.write("\x1b[2J\x1b[3J\x1b[H");
const hideCursor = () => process.stdout.write("\x1b[?25l");
const showCursor = () => process.stdout.write("\x1b[?25h");

// Ensure cursor is restored if interrupted
process.on("SIGINT", () => {
  showCursor();
  process.exit();
});

interface Dish {
  id: string;
  name: string;
  emoji: string;
  themeColor: string;
  tagline: string;
  prepItems: string[];
  cookPhrase: string;
  layers: string[];
  facts: string;
}

const DISHES: Record<string, Dish> = {
  burger: {
    id: "burger",
    name: "MEGA CYBER BURGER",
    emoji: "🍔",
    themeColor: c.orange,
    tagline: "Artisan Brioche • Wagyu Beef • Smoked Cheddar • Crisp Greens",
    prepItems: ["Fluffy Sesame Bun", "Crispy Lettuce", "Vine Tomatoes", "Aged Cheddar", "Prime Wagyu Patty", "Truffle Aioli"],
    cookPhrase: "Sizzling the wagyu beef patty on a 450°F cast iron skillet...",
    layers: [
      `${c.gold}      .---.--------------------.---.     ${c.reset}  ${c.bold}👑 Toasted Sesame Brioche Bun${c.reset}`,
      `${c.gold}     (    *    *     *    *     *   )    ${c.reset}`,
      `${c.pink}      ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~    ${c.reset}  ${c.pink}🥫 Signature Truffle Aioli Glaze${c.reset}`,
      `${c.lime}     {~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~}  ${c.reset}  ${c.lime}🥬 Crisp Organic Butterhead Lettuce${c.reset}`,
      `${c.red}      (==============================)   ${c.reset}  ${c.red}🍅 Sun-Ripened Crimson Tomatoes${c.reset}`,
      `${c.yellow}      \\   🧀   🧀   🧀   🧀   🧀   /   ${c.reset}  ${c.yellow}🧀 Melted Sharp Triple-Cheddar${c.reset}`,
      `${c.orange}     [################################]  ${c.reset}  ${c.orange}🥩 Flame-Seared Wagyu Beef Patty${c.reset}`,
      `${c.purple}      \\______________________________/   ${c.reset}  ${c.purple}🧅 Sweet Caramelized Red Onions${c.reset}`,
      `${c.gold}     (________________________________)  ${c.reset}  ${c.gold}🥖 Golden Butter-Toasted Bun Base${c.reset}`
    ],
    facts: "Crafted with 100% pure culinary passion."
  },
  pizza: {
    id: "pizza",
    name: "WOOD-FIRED NEAPOLITAN PIZZA",
    emoji: "🍕",
    themeColor: c.yellow,
    tagline: "San Marzano Tomatoes • Fresh Mozzarella • Wild Basil • Olive Oil",
    prepItems: ["48h Fermented Dough", "San Marzano Tomatoes", "Buffalo Mozzarella", "Fresh Basil", "Kalamata Olives"],
    cookPhrase: "Baking in a 900°F volcanic stone oven with oak wood fire...",
    layers: [
      `${c.gold}             //\"\"\"\"\"\"\"\"\"\"\"\"\"\"\\\\             ${c.reset}  ${c.gold}🔥 Blistered Leopard-Spotted Crust${c.reset}`,
      `${c.red}           //   🍅    🍅    🍅   \\\\           ${c.reset}  ${c.red}🥫 Crushed San Marzano Sauce${c.reset}`,
      `${c.yellow}         //   🧀    🧀    🧀    🧀   \\\\         ${c.reset}  ${c.yellow}🧀 Melted Buffalo Mozzarella${c.reset}`,
      `${c.lime}        ||   🍃   🌿    🌿    🍃   ||       ${c.reset}  ${c.lime}🌿 Hand-Torn Sweet Basil Leaves${c.reset}`,
      `${c.purple}        ||      🫒      🫒      🫒     ||       ${c.reset}  ${c.purple}🫒 Cured Mediterranean Olives${c.reset}`,
      `${c.gold}         \\\\    ✨ EXTRA VIRGIN OIL ✨    //        ${c.reset}  ${c.gold}🫗 Drizzle of Sicilian Olive Oil${c.reset}`,
      `${c.gold}           \\\\__________________________//         ${c.reset}  ${c.gold}🪵 Wood-Smoked Artisan Crust Base${c.reset}`
    ],
    facts: "Baked in 60 seconds at authentic Neapolitan perfection."
  },
  ramen: {
    id: "ramen",
    name: "TOKYO MIDNIGHT RAMEN",
    emoji: "🍜",
    color: c.cyan,
    themeColor: c.cyan,
    tagline: "Rich Tonkotsu Broth • Chashu Pork • Ajitama Egg • Scallions",
    prepItems: ["18h Tonkotsu Broth", "Handmade Ramen Noodles", "Braised Chashu", "Marinated Ajitama", "Crispy Nori"],
    cookPhrase: "Simmering rich collagen tonkotsu broth and boiling alkaline noodles...",
    layers: [
      `${c.gray}           (   ♨️    ♨️    ♨️    ♨️   )           ${c.reset}  ${c.white}♨️ Aromatic Garlic Oil & Steam${c.reset}`,
      `${c.yellow}       .---------------------------------.       ${c.reset}  ${c.green}🌱 Chopped Scallions & Nori Sheet${c.reset}`,
      `${c.orange}      /    🥩 Chashu Pork   🥚 Ajitama    \\      ${c.reset}  ${c.orange}🥩 Melt-In-Your-Mouth Braised Chashu${c.reset}`,
      `${c.yellow}     |   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  |     ${c.reset}  ${c.yellow}🍜 Handcrafted Springy Alkaline Noodles${c.reset}`,
      `${c.gold}     |   🍲 Rich Golden Tonkotsu Broth     |     ${c.reset}  ${c.gold}🥣 18-Hour Simmered Umami Broth${c.reset}`,
      `${c.cyan}      \\_________________________________/      ${c.reset}  ${c.cyan}🏺 Hand-Painted Ceramic Mino Bowl${c.reset}`,
      `${c.blue}          \\___________________________/          ${c.reset}  ${c.blue}🥢 Pure comfort in every single slurp${c.reset}`
    ],
    facts: "Best enjoyed by slurping loudly with total joy!"
  }
};

/**
 * Animated Progress Bar
 */
async function renderProgressBar(label: string, totalSteps = 24, delay = 25, color = c.gold) {
  for (let i = 0; i <= totalSteps; i++) {
    const pct = Math.round((i / totalSteps) * 100);
    const filled = "█".repeat(i);
    const empty = "░".repeat(totalSteps - i);
    process.stdout.write(`\r  ${c.bold}${label}${c.reset} [${color}${filled}${c.darkGray}${empty}${c.reset}] ${c.bold}${pct}%${c.reset}`);
    await sleep(delay);
  }
  process.stdout.write("\n\n");
}

/**
 * Interactive Knife Chopping Animation
 */
async function animateChopping(items: string[]) {
  const knifeFrames = [
    `       🔪  `,
    `      /🔪\\ `,
    `     ||💥|| `,
    `      \\🔪/ `
  ];

  console.log(`\n  ${c.bold}${c.yellow}🔪 [STAGE 1/4] ARTISAN PREPARATION & CHOPPING${c.reset}`);
  console.log(`  ${c.gray}${"─".repeat(50)}${c.reset}\n`);

  for (const item of items) {
    for (let f = 0; f < 3; f++) {
      process.stdout.write(`\r  ${knifeFrames[f % knifeFrames.length]} ${c.bold}Prepping:${c.reset} ${c.cyan}${item}${c.reset}  ${c.dim}${["(slicing...)", "(dicing...)", "(seasoning...)"][f]}${c.reset}   `);
      await sleep(70);
    }
    process.stdout.write(`\r  ${c.green}  ✓${c.reset} ${c.bold}${item}${c.reset} ${c.green}prepped to perfection!${c.reset}                    \n`);
    await sleep(60);
  }
}

/**
 * Animated Fire & Sizzle Animation
 */
async function animateCooking(cookPhrase: string) {
  console.log(`\n  ${c.bold}${c.orange}🔥 [STAGE 2/4] MASTER FLAME & COOKING${c.reset}`);
  console.log(`  ${c.gray}${"─".repeat(50)}${c.reset}\n`);
  console.log(`  ${c.italic}${cookPhrase}${c.reset}\n`);

  const fireFrames = [
    [
      `     (  🔥  .  ✨  .  🔥  )   `,
      `    ( 🔥  🔥  💥  🔥  🔥 )  `,
      `   [=======================] `
    ],
    [
      `     ( .  ✨  🔥  ✨  .  )   `,
      `    (  🔥  💥  🔥  💥  🔥 )  `,
      `   [=======================] `
    ],
    [
      `     (  ✨  🔥  .  🔥  ✨  )  `,
      `    ( 💥  🔥  🔥  🔥  💥 )  `,
      `   [=======================] `
    ]
  ];

  for (let cycle = 0; cycle < 10; cycle++) {
    const frame = fireFrames[cycle % fireFrames.length];
    process.stdout.write(`\x1b[3A`); // Move up 3 lines
    for (const line of frame) {
      process.stdout.write(`\r  ${c.orange}${line}${c.reset}\n`);
    }
    await sleep(90);
  }

  await renderProgressBar("  Temperature Boost", 26, 20, c.red);
}

/**
 * Assembly Animation (Layer by Layer with Impact Bounce)
 */
async function animateAssembly(dish: Dish) {
  console.log(`  ${c.bold}${c.purple}⚡ [STAGE 3/4] PRECISION PLATING & ASSEMBLY${c.reset}`);
  console.log(`  ${c.gray}${"─".repeat(50)}${c.reset}\n`);

  const assembled: string[] = [];

  for (let i = 0; i < dish.layers.length; i++) {
    assembled.push(dish.layers[i]);
    
    // Quick flash effect for incoming layer
    process.stdout.write(`\r  ${c.bold}${c.yellow}⬇ Placing component ${i + 1}/${dish.layers.length}...${c.reset}\n\n`);
    for (const layer of assembled) {
      console.log(`  ${layer}`);
    }
    
    await sleep(130);
    
    if (i < dish.layers.length - 1) {
      // Clear lines to redraw smoothly
      process.stdout.write(`\x1b[${assembled.length + 2}A`);
    }
  }
}

/**
 * Grand Finale Presentation with Rotating Sparkles
 */
async function grandFinale(dish: Dish) {
  const sparkles = ["✨", "🌟", "⭐", "💫", "🔥", "🎉", "👑", "❤️"];
  
  for (let t = 0; t < 12; t++) {
    clear();
    const sp1 = sparkles[t % sparkles.length];
    const sp2 = sparkles[(t + 2) % sparkles.length];
    const sp3 = sparkles[(t + 4) % sparkles.length];
    const sp4 = sparkles[(t + 6) % sparkles.length];

    console.log(`\n  ${sp1} ${dish.themeColor}${c.bold}======================================================================${c.reset} ${sp2}`);
    console.log(`  ${sp3}   🍽️   CHEF'S SIGNATURE CREATION : ${dish.themeColor}${c.bold}${dish.name}${c.reset} ${dish.emoji}   ${sp4}`);
    console.log(`  ${sp2} ${dish.themeColor}${c.bold}======================================================================${c.reset} ${sp1}\n`);
    console.log(`  ${c.italic}${c.gold}"${dish.tagline}"${c.reset}\n`);

    // Render layers
    for (const layer of dish.layers) {
      console.log(`  ${layer}`);
    }

    console.log(`\n  ${c.bold}${c.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`);
    console.log(`  ${c.bold}Status:${c.reset} ${c.lime}Ready to Serve! Bon Appétit! 😋🍴${c.reset}`);
    console.log(`  ${c.dim}Note: ${dish.facts}${c.reset}`);
    console.log(`  ${c.bold}${c.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}\n`);

    await sleep(120);
  }
}

/**
 * Main Food Function
 * @param dishType 'burger' | 'pizza' | 'ramen' | 'random'
 */
export async function food(dishType: keyof typeof DISHES | "all" = "burger") {
  hideCursor();
  clear();

  try {
    console.log(`\n  ${c.bold}${c.pink}╔════════════════════════════════════════════════════════════════╗${c.reset}`);
    console.log(`  ${c.bold}${c.pink}║${c.reset}   ${c.bold}${c.yellow}👨‍🍳  WELCOME TO THE 5-STAR CYBER KITCHEN STUDIO  🌟${c.reset}        ${c.bold}${c.pink}║${c.reset}`);
    console.log(`  ${c.bold}${c.pink}╚════════════════════════════════════════════════════════════════╝${c.reset}\n`);
    
    const targetDishes = dishType === "all" 
      ? Object.values(DISHES)
      : [DISHES[dishType] || DISHES.burger];

    for (const selectedDish of targetDishes) {
      console.log(`  ${c.bold}Ordering:${c.reset} ${selectedDish.themeColor}${c.bold}${selectedDish.name}${c.reset} ${selectedDish.emoji}`);
      await renderProgressBar("Initializing Culinary Engine", 20, 20, selectedDish.themeColor);

      // Phase 1: Chopping
      await animateChopping(selectedDish.prepItems);
      await sleep(200);

      // Phase 2: Cooking
      await animateCooking(selectedDish.cookPhrase);
      await sleep(200);

      // Phase 3: Assembly
      await animateAssembly(selectedDish);
      await sleep(300);

      // Phase 4: Grand Finale
      await grandFinale(selectedDish);
    }
  } finally {
    showCursor();
  }
}

// Execute food function
food("burger");
