import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch all risk contexts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const contexts = await prisma.riskContext.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            identifications: true,
            analyses: true,
            assessments: true,
          },
        },
      },
    });

    return NextResponse.json(contexts);
  } catch (error) {
    console.error("Error fetching risk contexts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new risk context
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nama_kl,
      tahun_penilaian,
      periode,
      sumber_data,
      dja_yang_menilai,
      tujuan_strategis,
      proses_bisnis,
      userId,
    } = body;

    // Validation
    if (
      !nama_kl ||
      !tahun_penilaian ||
      !periode ||
      !tujuan_strategis ||
      !proses_bisnis ||
      !userId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const context = await prisma.riskContext.create({
      data: {
        nama_kl,
        tahun_penilaian: parseInt(tahun_penilaian),
        periode,
        sumber_data,
        dja_yang_menilai,
        tujuan_strategis,
        proses_bisnis,
        userId,
      },
    });

    return NextResponse.json(context, { status: 201 });
  } catch (error) {
    console.error("Error creating risk context:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update risk context
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      nama_kl,
      tahun_penilaian,
      periode,
      sumber_data,
      dja_yang_menilai,
      tujuan_strategis,
      proses_bisnis,
      userId,
    } = body;

    if (!id || !userId) {
      return NextResponse.json(
        { error: "Context ID and User ID are required" },
        { status: 400 }
      );
    }

    // Check if context belongs to user
    const existingContext = await prisma.riskContext.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!existingContext) {
      return NextResponse.json(
        { error: "Context not found or unauthorized" },
        { status: 404 }
      );
    }

    const context = await prisma.riskContext.update({
      where: { id },
      data: {
        nama_kl,
        tahun_penilaian: parseInt(tahun_penilaian),
        periode,
        sumber_data,
        dja_yang_menilai,
        tujuan_strategis,
        proses_bisnis,
      },
    });

    return NextResponse.json(context);
  } catch (error) {
    console.error("Error updating risk context:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete risk context
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const userId = searchParams.get("userId");

    if (!id || !userId) {
      return NextResponse.json(
        { error: "Context ID and User ID are required" },
        { status: 400 }
      );
    }

    // Check if context belongs to user
    const existingContext = await prisma.riskContext.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!existingContext) {
      return NextResponse.json(
        { error: "Context not found or unauthorized" },
        { status: 404 }
      );
    }

    // Delete related records first (if needed)
    await prisma.riskAssessment.deleteMany({ where: { konteksId: id } });
    await prisma.riskAnalysis.deleteMany({ where: { konteksId: id } });
    await prisma.riskIdentification.deleteMany({ where: { konteksId: id } });

    // Delete the context
    await prisma.riskContext.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Context deleted successfully" });
  } catch (error) {
    console.error("Error deleting risk context:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
