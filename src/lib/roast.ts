interface RoastInput {
  name: string;
  age: number;
  relationship: string;
  lifeStatus: string;
  energyScore: number;
}

// ============================================================
// ROASTS — SHORT, PUNCHY, ONE CLEAR JOKE
// Setup → punchline. No explaining. Let the truth do the work.
// ============================================================

const singleRoasts: string[] = [
  "{name}, {age}, single. The only match you're getting this year is from your lighter.",
  "Your longest relationship is with your phone charger and even that one you break every 6 months.",
  "{name}'s love life is like MRT during off-peak. Empty, quiet, and nobody wants to be there.",
  "You're not picky, {name}. You're just not an option.",
  "Even the ang bao comes in a pair of oranges and you still can't find one person.",
  "{name} at {age} — your rizz is so bad your phone autocorrects it to \"rest in peace.\"",
  "The only thing you've pulled this year is a muscle.",
  "You put \"open to opportunities\" on LinkedIn. We both know that's not just about jobs.",
  "{name}, your type is \"alive and willing\" and STILL nothing.",
  "You're the human version of \"no results found.\"",
  "Your DMs drier than the kueh lapis auntie left out since morning.",
  "Single at {age}. At this point it's not a phase, it's a lifestyle brand.",
  "{name}, the only one sliding into your DMs is Grab with a promo code.",
];

const datingRoasts: string[] = [
  "{name} is dating. Their partner looked at the whole market and chose... this. In THIS economy.",
  "\"Taking it slow\" at {age} is just \"scared to commit\" in a trench coat.",
  "{name} won't post their partner on IG. Even YOU know it's not confirmed yet.",
  "Your partner's friends definitely said \"ha? that one ah?\" at least once.",
  "{name} at {age}, dating. Your couple photos all same angle because you only got one that works.",
  "Your relationship is at the stage where you still laugh at each other's jokes. Got expiry date one.",
  "How long you been dating? If you need to think that hard, it's either 2 weeks or a situationship.",
  "{name} brought partner home for CNY. Bold. Your family is the final boss and partner don't even know the controls.",
  "Your partner chose you. Proof that love is blind, deaf, and apparently has no WiFi to Google you first.",
  "Dating at {age} and still can't decide where to eat. You think you ready for marriage?",
  "{name}'s relationship status: \"in a relationship.\" Partner's relationship status: \"let me check first.\"",
];

const marriedRoasts: string[] = [
  "{name}, married. Congrats on finding someone willing to hear you chew for the rest of their life.",
  "Marriage at {age} is just texting \"what you want eat\" back and forth until one of you dies.",
  "The most romantic thing you do now is fall asleep on the sofa and your spouse covers you with blanket. Peak love.",
  "{name}'s idea of a wild Friday night is FairPrice run without the kids.",
  "Your biggest argument this week is about the aircon temperature. Every week. Forever.",
  "Before marriage: abs. After marriage: subscription to every streaming service. The only six pack now is in the fridge.",
  "{name} at {age}, married. The spark isn't gone — it just moved to arguing about how to load the dishwasher.",
  "Your spouse already knows what you're gonna say before you say it. And they're already annoyed.",
  "Married at {age}. The most exciting thing in your life is when the new IKEA catalogue drops.",
  "Your wedding vows said \"for better or for worse.\" Spouse didn't know \"worse\" meant your snoring.",
  "{name}'s love language is \"I already ate\" and \"the Shopee parcel came.\"",
];

const hustlingRoasts: string[] = [
  "{name} says hustle. Bank account says struggle.",
  "\"CEO\" at {age}. Your office is Starbucks level 3 and your only employee is you.",
  "Your LinkedIn says Entrepreneur | Visionary | Dreamer. Your bank says Insufficient Funds.",
  "{name}'s \"passive income\" last month was $0.37 in savings interest. The grind is real.",
  "\"Content creator\" at {age}. 47 views and 3 of them is your mum from different devices.",
  "Your cousin same age got condo. You got a Vision Board. Both also property, just different kind.",
  "The only thing you've built is an impressive collection of free webinar certificates.",
  "{name} been hustling for years and the biggest revenue stream is still ang bao money.",
  "\"Self-made\" at {age}. What did you make exactly? Besides your parents worried.",
  "Your freelance rate is \"whatever you can pay lah.\" That's not a rate, that's a cry for help.",
  "{name}'s startup pitch: \"it's like Grab, but...\" Bro, just drive Grab.",
  "\"Trust the process\" — {name}, {age}, saying this for the 4th year running.",
];

const studentRoasts: string[] = [
  "{name}, {age}, still studying. Your degree taking longer than some marriages.",
  "Your biggest flex is student discount at GV. That's it. That's the whole flex.",
  "Your GPA and your bank account competing to see which one hits zero first.",
  "{name} at {age}, still a student. Your classmates 3 years younger already calling you uncle/auntie.",
  "Your thesis has been \"almost done\" longer than some people been alive.",
  "Your mum tells relatives you're \"still studying\" with the same energy as \"resting at the hospital.\"",
  "The only dean you know by name is Dean from the kopitiam. Not the Dean's List.",
  "{name} at {age} still collecting ang bao because \"student.\" Unethical, but impressive hustle.",
  "Your student loan interest earning more than your future starting salary.",
  "Your education timeline got more extensions than a Chrome browser.",
  "{name}, {age}. Your friends are getting married. You're getting another semester.",
  "\"Investing in myself\" — {name}, explaining to parents why still no job.",
];

const complicatedRoasts: string[] = [
  "\"It's complicated\" is just \"single\" with extra steps.",
  "{name}, your relationship status needs a PowerPoint to explain.",
  "Your love life got more red flags than CNY decoration.",
  "{name} at {age}, it's complicated. Your situationship got more meetings than a corporate job but less benefits.",
  "Even ChatGPT would say \"I cannot help you with this.\"",
  "\"It's complicated\" — that's not a relationship status, that's a cry for help.",
  "Your love life got more seasons than One Piece and still no conclusion.",
  "{name}, it's complicated at {age}. Bro, YOU'RE the complication.",
  "Your relationship got more plot twists than a Korean drama but none of the good looks.",
  "\"It's complicated\" means you don't even know if you're allowed to be sad about it.",
  "{name}'s love life: 404 Relationship Not Found.",
  "Even your phone doesn't know whether to show a heart emoji or a skull for this one.",
];

// ============================================================
// RELATIONSHIP FLAVOR — one short line, twists the knife
// ============================================================

const relationshipFlavor: Record<string, string[]> = {
  "Friend": [
    "Sent with love by your \"friend.\" 🥰",
    "Your bestie paid $0 to emotionally damage you. Real ones. 💀",
    "A friend who knows your deepest secrets chose violence today.",
  ],
  "Sibling": [
    "Love, your sibling. The favourite child. 😘",
    "Your sibling sent this. Same parents, different levels of savage.",
    "Sibling confirmed: you're the family's comic relief.",
  ],
  "Colleague": [
    "From your colleague. Monday's gonna be different. 💼",
    "HR cannot help you here. Happy CNY from your coworker.",
    "Someone you share a pantry with chose chaos.",
  ],
  "Parents": [
    "Your own child did this to you. ROI on parenting: negative.",
    "The person you gave life to gave you this. Full circle. 🔄",
    "Your kid says you're welcome.",
  ],
  "Cousin": [
    "From the cousin auntie always compares you to. Now you know why. 📊",
    "Your cousin sees you once a year and chose to make it count.",
    "Cousin-to-cousin emotional damage. It's tradition.",
  ],
  "Relatives": [
    "From a relative who forgot your Chinese name but remembered to roast you.",
    "A relative did this. $2 ang bao energy, $10 worth of judgement.",
    "Family reunion this year is gonna be interesting. 🍊",
  ],
  "Boss (IF YOU DARE)": [
    "Your employee sent this. Promotion or termination — no in between. 💀",
    "Someone who needs you to approve their leave just did this. Bold.",
    "Sent by a subordinate. Career speedrun any% strat.",
  ],
  "Your Partner": [
    "From the love of your life. Their love language is emotional damage. ❤️",
    "The person who sleeps next to you sent this with their whole chest.",
    "Your partner chose this over a normal CNY greeting. Keeper. 💍",
  ],
};

// ============================================================
// BLESSINGS — short backhanded CNY wishes
// ============================================================

const blessingTemplates: string[] = [
  "恭喜发财 — may your wallet be thicker than your skin.",
  "HUAT AH! Terms and conditions apply.",
  "新年快乐! May your year be better than this score suggests.",
  "May your luck be better than your life choices, {name}.",
  "Wishing {name} a less embarrassing year than the last one. 🙏",
  "大吉大利! Big luck, big prosperity, big copium.",
  "年年有余 — may you have surplus every year. Your weight got the memo first.",
  "红包拿来! Sike. Emotional damage only. No refunds.",
  "Prosperity, health, peace of mind. {name} getting ONE. Dealer's choice.",
  "May this year treat you better. The bar is underground so can only go up.",
  "Gong xi fa cai. You'll need all the prosperity you can get.",
  "步步高升 — step by step, like {name}'s blood pressure reading this.",
];

// ============================================================
// GENERATOR
// ============================================================

function pickFromPool(pool: string[], seed: number): string {
  return pool[Math.abs(seed) % pool.length];
}

function hashSeed(name: string, age: number, score: number): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = ((h << 5) - h + name.charCodeAt(i)) | 0;
  }
  return Math.abs(h + age * 137 + score * 31);
}

export function generateRoast(input: RoastInput): string {
  const seed = hashSeed(input.name, input.age, input.energyScore);
  const status = input.lifeStatus.toLowerCase();

  let pool: string[];
  switch (status) {
    case "single": pool = singleRoasts; break;
    case "dating": pool = datingRoasts; break;
    case "married": pool = marriedRoasts; break;
    case "hustling": pool = hustlingRoasts; break;
    case "student": pool = studentRoasts; break;
    default: pool = complicatedRoasts; break;
  }

  let roast = pickFromPool(pool, seed);

  // Add relationship flavor
  const flavorKey = Object.keys(relationshipFlavor).find(
    k => k.toLowerCase() === input.relationship.toLowerCase()
  );
  if (flavorKey && relationshipFlavor[flavorKey]) {
    const flavor = pickFromPool(relationshipFlavor[flavorKey], seed * 3 + 7);
    roast += "\n\n" + flavor;
  }

  // Replace placeholders
  roast = roast
    .replace(/{name}/g, input.name)
    .replace(/{age}/g, String(input.age))
    .replace(/{relationship}/g, input.relationship.toLowerCase())
    .replace(/{lifeStatus}/g, input.lifeStatus.toLowerCase())
    .replace(/{score}/g, String(input.energyScore));

  return roast;
}

export function generateBlessing(input: RoastInput): string {
  const seed = hashSeed(input.name, input.age, input.energyScore) * 7 + 13;
  let blessing = pickFromPool(blessingTemplates, seed);

  blessing = blessing
    .replace(/{name}/g, input.name)
    .replace(/{score}/g, String(input.energyScore))
    .replace(/{lifeStatus}/g, input.lifeStatus.toLowerCase());

  return blessing;
}
