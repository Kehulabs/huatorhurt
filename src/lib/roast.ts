interface RoastInput {
  name: string;
  age: number;
  relationship: string;
  lifeStatus: string;
  energyScore: number;
}

// ============================================================
// ROASTS — BRUTAL PERSONAL OBSERVATIONS IN SINGLISH
// Direct. About YOU. Not about aunties. Not about scenes.
// The kind of thing that makes you lock your phone.
// ============================================================

const singleRoasts: string[] = [
  "Eh {name}, {age} already and the longest relationship you had is with your bubble tea shop loyalty card.",
  "{name}, you {age} and single. Your phone screen time is 8 hours but your DMs drier than kueh lapis left in the sun.",
  "Bro {name}, even your WiFi connects to something. You {age} cannot even connect with one person ah?",
  "{name} at {age} still single. Your type is \"breathing and available\" and you STILL can't find anyone.",
  "Walao {name}, your love life got less chemistry than your sec school science project.",
  "{name}, {age} years of experience and your most committed relationship is with your Netflix subscription. And even that one you sharing password.",
  "Eh {name}, you not single by choice lah. You single by consensus.",
  "{name} at {age}. Your talking stage longer than the MRT East-West line bro.",
  "Bro {name}, the only thing you pulled this year is your hamstring.",
  "{name}, at {age} your standards are sky high but your rizz is Mariana Trench level.",
  "Eh {name}, you say you're single and ready to mingle but the only thing you mingling with is the chilli sauce at the prata shop.",
  "{name} at {age} — your love life is like a hawker centre at 3am. Empty. Closed. Chairs on tables.",
  "{name}, even the mandarin oranges come in pairs and they don't even have a personality.",
];

const datingRoasts: string[] = [
  "Oh {name} dating ah? Wah. Your partner must have very unique taste. Like... VERY unique. Bless them.",
  "{name} at {age} finally dating. Your partner must've been the last person on the app and thought \"aiya, just swipe right lah.\"",
  "Eh {name}, your partner looked at the whole market and chose YOU? In this economy? That's not love, that's charity.",
  "{name} been dating but still won't post on Instagram. Bro, even YOU know it's not confirmed yet.",
  "Wah {name}, {age} and dating. Your partner's friends definitely said \"ha? that one ah?\" at least once. Confirm.",
  "{name} dating already but still can't decide where to eat dinner together. You think you ready for marriage? You can't even handle Grab Food.",
  "Bro {name}, your relationship is at that stage where both of you still laugh at each other's jokes. Enjoy it. Got expiry date one.",
  "Eh {name}, \"taking it slow\" at {age}? Your relationship moving slower than the bus 858 during peak hour.",
  "{name} brought partner to meet the family. Bold. Your family is the final boss level and your partner doesn't even know the controls yet.",
  "{name} at {age} in a relationship. Your couple photos all got the same pose because you only got one angle that works.",
  "{name} say dating. How long? If you need to think that hard, it's either 2 weeks or \"it's complicated.\" Both also jialat.",
];

const marriedRoasts: string[] = [
  "{name}, married at {age}. Congrats — you found someone willing to hear you chew for the rest of their life.",
  "Eh {name}, marriage is just texting \"what you want eat\" back and forth until one of you dies.",
  "{name} married already. Now the most romantic thing you do is fall asleep on the sofa and your spouse covers you with blanket. Peak love.",
  "Bro {name}, you married at {age}. Your idea of a date night is buying groceries at FairPrice together without the kids. Shiok right.",
  "Walao {name}, married life means your biggest argument this week is about the aircon temperature. Every week. Forever.",
  "{name} at {age}, married. You went from \"I'll do anything for you\" to \"can you move, you blocking the TV\" real quick.",
  "Eh {name}, before marriage you had abs. After marriage you got subscription. To everything. Disney Plus, Netflix, HBO. The only six pack now is in the fridge.",
  "{name} married already but still cannot load the dishwasher correctly. {age} years on this earth and still can't figure out where the big plate goes.",
  "Bro {name}, being married means your spouse already knows what you're gonna say before you say it. And they're already annoyed.",
  "{name}, your wedding vows said \"for better or for worse.\" Your spouse didn't know \"worse\" meant your snoring ah.",
  "{name} at {age}, married. The most exciting thing in your life now is when the new IKEA catalogue drops.",
];

const hustlingRoasts: string[] = [
  "Eh {name}, you say hustle but your bank account says struggle.",
  "{name} at {age} calling yourself a CEO. Bro, your office is the Starbucks on level 3 and your employee is you.",
  "Wah {name}, \"content creator\" at {age}. Your content got 47 views and 3 of them is your mum from different devices.",
  "{name} say building a startup. Bro, the only thing you've built is a very impressive collection of free webinar certificates.",
  "Eh {name}, you been hustling since {age} minus 5 years ago and your biggest revenue stream is still ang bao money.",
  "Bro {name}, your \"passive income\" is the interest on your savings account. $0.37 last month. Shiok.",
  "{name}, your LinkedIn says \"Entrepreneur | Visionary | Dreamer.\" Your bank statement says \"insufficient funds.\"",
  "Walao {name}, your cousin your age got condo. You got a Vision Board. Both also got property, just different kind.",
  "{name} at {age} still hustling. The grind is real. The results... also real. Just not the results you wanted.",
  "Eh {name}, you say you're self-made. Bro, what did you make? Besides your parents worried?",
  "{name}, you {age} and freelancing. Your freelance rate is \"whatever you can pay lah\" which is code for desperate.",
];

const studentRoasts: string[] = [
  "Eh {name}, {age} and still studying. Your degree taking longer than some marriages.",
  "{name}, student at {age}. Your biggest flex is student discount at GV cinema. That's it. That's the whole flex.",
  "Bro {name}, you been studying so long your student card photo looks like a different person. Because it WAS. {age} hits different.",
  "Walao {name}, your GPA and your bank account competing to see which one lower.",
  "{name} at {age} still a student. The only networking you doing is trying to connect to the campus WiFi.",
  "Eh {name}, you studying at {age} while your classmates 3 years younger than you calling you uncle/auntie already.",
  "{name}, your thesis has been \"almost done\" for longer than some people been alive.",
  "Bro {name}, student at {age}. Your mum tells relatives you're \"still studying\" with the same energy as saying someone is \"resting\" at the hospital.",
  "{name}, the only dean you're on first name basis with is Dean from the kopitiam, not the Dean's List.",
  "Eh {name}, you at {age} still collecting angbao because student. The hustle is actually impressive. Unethical, but impressive.",
  "{name} at {age}, still studying. Your education timeline got more extensions than a Chrome browser.",
  "Bro {name}, your student loan interest earning more than your future starting salary.",
];

const complicatedRoasts: string[] = [
  "Eh {name}, \"it's complicated\" at {age}? Your relationship status got more plot twists than a Korean drama.",
  "{name}, you say it's complicated but bro... YOU'RE the complication.",
  "Walao {name}, \"it's complicated\" is just \"single\" with extra steps.",
  "Bro {name}, your relationship status needs a PowerPoint presentation to explain.",
  "{name} at {age} with \"it's complicated\" — your love life got more red flags than CNY decoration.",
  "Eh {name}, it's complicated? Even your phone doesn't know whether to show a heart emoji or a skull.",
  "{name}, \"it's complicated\" at {age}. Your situationship got more meetings than a corporate job but less benefits.",
  "Bro {name}, your relationship status is \"it's complicated\" which is just LinkedIn for \"unemployed\" but for love.",
  "{name} said it's complicated. That's not a relationship status, that's a cry for help.",
  "Walao {name}, your love life so complicated even ChatGPT would say \"I cannot help you with this.\"",
  "Eh {name}, {age} and it's complicated. Your relationship got more seasons than One Piece and still no conclusion.",
];

// ============================================================
// RELATIONSHIP FLAVOR (who sent it — the knife twist)
// ============================================================

const relationshipFlavor: Record<string, string[]> = {
  "Friend": [
    "And your FRIEND sent this. On purpose. For free. With friends like this who needs enemies?",
    "Your friend chose to emotionally damage you instead of just saying gong xi fa cai. Real ones.",
    "Someone who knows your deepest secrets sent this. Sleep well tonight, {name}.",
  ],
  "Sibling": [
    "Your OWN sibling did this to you. Same parents. Same house. Different levels of savage.",
    "Sibling sent this. Your parents have a favourite child and this angbao just confirmed it's not you.",
    "Family is forever. So is this screenshot your sibling is definitely saving.",
  ],
  "Colleague": [
    "A COLLEAGUE sent this. Monday morning is gonna be different, {name}.",
    "Someone you share a pantry with chose violence. HR cannot help you here.",
    "Your coworker roasted you on a public holiday. That's dedication to the craft.",
  ],
  "Parents": [
    "Your own child sent this. This is the return on investment for raising them.",
    "The person you gave life to chose to give you this. Full circle.",
    "Your kid did this. Nature is healing. The children are fighting back.",
  ],
  "Cousin": [
    "Your cousin sent this. The same one auntie always compares you to. Now you know the score.",
    "Cousin did this to you. Sees you once a year, chose to make it count.",
    "Your cousin really woke up and chose to violate you during CNY. Family values.",
  ],
  "Relatives": [
    "A relative who probably doesn't remember your Chinese name sent this. But they'll remember your score.",
    "A relative did this. The same one who gives you $2 angbao but $10 worth of judgement.",
    "A relative roasted you. At least this time it's digital and not across the dinner table.",
  ],
  "Boss (IF YOU DARE)": [
    "Someone sent this to their BOSS. Either very brave or very done with the job.",
    "Your subordinate sent this. Career speedrun any% strat. Bold move.",
    "An employee roasted their boss. Promotion or termination, no in between.",
  ],
  "Your Partner": [
    "Your PARTNER sent this. Their love language is emotional damage.",
    "The person who sleeps next to you sent this with their whole chest. That's love. Probably.",
    "Your partner chose this over a normal CNY greeting. Relationship built different.",
  ],
};

// ============================================================
// BLESSINGS (backhanded Singlish, short)
// ============================================================

const blessingTemplates: string[] = [
  "恭喜发财 — may your wallet be thicker than your skin. You'll need both.",
  "新年快乐! May your year be better than this score suggests. Low bar but still.",
  "年年有余 — surplus every year. Your weight understood the assignment first.",
  "HUAT AH! Terms and conditions apply. No refund. No guarantee. Good luck.",
  "万事如意 — if everything went your way, you wouldn't be reading this right now, {name}.",
  "步步高升 — step by step, like {name}'s blood pressure reading this roast.",
  "红包拿来! Sike. Emotional damage only. Non-transferable. No exchange.",
  "Wishing {name} a prosperous year. Or at least a less embarrassing one than last year.",
  "大吉大利! May your luck be better than your life choices.",
  "May this year treat {name} better. The bar is underground. Can only go up.",
  "Gong xi fa cai, {name}. You'll need all the prosperity you can get.",
  "Prosperity, health, peace of mind. {name} getting ONE. Dealer's choice. HUAT AH!",
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
    roast += " " + flavor;
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
