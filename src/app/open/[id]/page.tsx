import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AngBaoReveal from "@/components/AngBaoReveal";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OpenPage({ params }: PageProps) {
  const { id } = await params;

  const angbao = await prisma.angBao.findUnique({
    where: { id },
  });

  if (!angbao) {
    notFound();
  }

  return (
    <AngBaoReveal
      name={angbao.name}
      energyScore={angbao.energyScore}
      roastMessage={angbao.roastMessage}
      blessing={angbao.blessing}
      secretMessage={angbao.secretMessage}
      id={angbao.id}
    />
  );
}
