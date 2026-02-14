import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { computeEnergyScore } from "@/lib/energy";
import { generateRoast, generateBlessing } from "@/lib/roast";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, age, relationship, lifeStatus, secretMessage } = body;

    if (
      !name ||
      typeof name !== "string" ||
      !age ||
      typeof age !== "number" ||
      age < 1 ||
      age > 150 ||
      !relationship ||
      typeof relationship !== "string" ||
      !lifeStatus ||
      typeof lifeStatus !== "string"
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const sanitizedName = name.trim().slice(0, 50);
    const sanitizedMessage =
      typeof secretMessage === "string" ? secretMessage.trim().slice(0, 500) : "";

    const seed =
      sanitizedName.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) +
      age * 13 +
      Date.now() % 10000;

    const energyScore = computeEnergyScore(age, lifeStatus, seed);

    const roastInput = {
      name: sanitizedName,
      age,
      relationship,
      lifeStatus,
      energyScore,
    };

    const roastMessage = generateRoast(roastInput);
    const blessing = generateBlessing(roastInput);

    const angbao = await prisma.angBao.create({
      data: {
        name: sanitizedName,
        age,
        relationship,
        lifeStatus,
        energyScore,
        roastMessage,
        blessing,
        secretMessage: sanitizedMessage,
      },
    });

    return NextResponse.json({ id: angbao.id });
  } catch (error) {
    console.error("Failed to create angbao:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
