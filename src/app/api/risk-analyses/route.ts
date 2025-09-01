import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch all risk analyses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const konteksId = searchParams.get("konteksId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const where: any = { userId };
    if (konteksId) {
      where.konteksId = konteksId;
    }

    const analyses = await prisma.riskAnalysis.findMany({
      where,
      include: {
        context: true,
        identification: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(analyses);
  } catch (error) {
    console.error("Error fetching risk analyses:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new risk analysis
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      skala_dampak,
      skala_kemungkinan,
      uraian_pengendalian,
      hasil_penilaian,
      konteksId,
      identifikasiId,
      userId,
    } = body;

    // Validation
    if (
      !skala_dampak ||
      !skala_kemungkinan ||
      !uraian_pengendalian ||
      !hasil_penilaian ||
      !konteksId ||
      !identifikasiId ||
      !userId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if identification exists and belongs to user
    const identification = await prisma.riskIdentification.findFirst({
      where: {
        id: identifikasiId,
        userId: userId,
      },
    });

    if (!identification) {
      return NextResponse.json(
        { error: "Risk identification not found or unauthorized" },
        { status: 404 }
      );
    }

    // Calculate risk score using the matrix
    const skala_risiko = calculateRiskScore(skala_kemungkinan, skala_dampak);

    const analysis = await prisma.riskAnalysis.create({
      data: {
        skala_dampak,
        skala_kemungkinan,
        skala_risiko,
        uraian_pengendalian,
        hasil_penilaian,
        konteksId,
        identifikasiId,
        userId,
      },
      include: {
        context: true,
        identification: true,
      },
    });

    return NextResponse.json(analysis, { status: 201 });
  } catch (error) {
    console.error("Error creating risk analysis:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update risk analysis
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      skala_dampak,
      skala_kemungkinan,
      uraian_pengendalian,
      hasil_penilaian,
      userId,
    } = body;

    if (!id || !userId) {
      return NextResponse.json(
        { error: "Analysis ID and User ID are required" },
        { status: 400 }
      );
    }

    // Check if analysis belongs to user
    const existingAnalysis = await prisma.riskAnalysis.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!existingAnalysis) {
      return NextResponse.json(
        { error: "Risk analysis not found or unauthorized" },
        { status: 404 }
      );
    }

    // Calculate new risk score
    const skala_risiko = calculateRiskScore(skala_kemungkinan, skala_dampak);

    const analysis = await prisma.riskAnalysis.update({
      where: { id },
      data: {
        skala_dampak,
        skala_kemungkinan,
        skala_risiko,
        uraian_pengendalian,
        hasil_penilaian,
      },
      include: {
        context: true,
        identification: true,
      },
    });

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error updating risk analysis:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete risk analysis
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const userId = searchParams.get("userId");

    if (!id || !userId) {
      return NextResponse.json(
        { error: "Analysis ID and User ID are required" },
        { status: 400 }
      );
    }

    // Check if analysis belongs to user
    const existingAnalysis = await prisma.riskAnalysis.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!existingAnalysis) {
      return NextResponse.json(
        { error: "Risk analysis not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.riskAnalysis.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Risk analysis deleted successfully" });
  } catch (error) {
    console.error("Error deleting risk analysis:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to calculate risk score based on the matrix
function calculateRiskScore(kemungkinan: number, dampak: number): number {
  const matrix = [
    [1, 3, 5, 9, 20],
    [2, 7, 10, 13, 21],
    [4, 8, 14, 17, 22],
    [6, 12, 16, 19, 24],
    [11, 15, 18, 23, 25],
  ];

  // Ensure values are within bounds (1-5)
  const kemungkinanIndex = Math.max(0, Math.min(4, kemungkinan - 1));
  const dampakIndex = Math.max(0, Math.min(4, dampak - 1));

  return matrix[kemungkinanIndex][dampakIndex];
}
