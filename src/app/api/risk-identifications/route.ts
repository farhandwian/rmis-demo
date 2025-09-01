import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch all risk identifications
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

    const identifications = await prisma.riskIdentification.findMany({
      where,
      include: {
        context: true,
        analyses: true,
        assessments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(identifications);
  } catch (error) {
    console.error("Error fetching risk identifications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new risk identification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sifat_risiko,
      kode_risiko,
      pemilik,
      kategori_risiko,
      uraian_risiko,
      sumber_sebab,
      uraian_sebab,
      pihak_terkena,
      uraian_dampak,
      konteksId,
      userId,
    } = body;

    // Validation
    if (
      !sifat_risiko ||
      !kode_risiko ||
      !pemilik ||
      !kategori_risiko ||
      !uraian_risiko ||
      !konteksId ||
      !userId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if context exists and belongs to user
    const context = await prisma.riskContext.findFirst({
      where: {
        id: konteksId,
        userId: userId,
      },
    });

    if (!context) {
      return NextResponse.json(
        { error: "Context not found or unauthorized" },
        { status: 404 }
      );
    }

    const identification = await prisma.riskIdentification.create({
      data: {
        sifat_risiko,
        kode_risiko,
        pemilik,
        kategori_risiko,
        uraian_risiko,
        sumber_sebab,
        uraian_sebab,
        pihak_terkena,
        uraian_dampak,
        konteksId,
        userId,
      },
      include: {
        context: true,
      },
    });

    return NextResponse.json(identification, { status: 201 });
  } catch (error) {
    console.error("Error creating risk identification:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update risk identification
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      sifat_risiko,
      kode_risiko,
      pemilik,
      kategori_risiko,
      uraian_risiko,
      sumber_sebab,
      uraian_sebab,
      pihak_terkena,
      uraian_dampak,
      userId,
    } = body;

    if (!id || !userId) {
      return NextResponse.json(
        { error: "Identification ID and User ID are required" },
        { status: 400 }
      );
    }

    // Check if identification belongs to user
    const existingIdentification = await prisma.riskIdentification.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!existingIdentification) {
      return NextResponse.json(
        { error: "Risk identification not found or unauthorized" },
        { status: 404 }
      );
    }

    const identification = await prisma.riskIdentification.update({
      where: { id },
      data: {
        sifat_risiko,
        kode_risiko,
        pemilik,
        kategori_risiko,
        uraian_risiko,
        sumber_sebab,
        uraian_sebab,
        pihak_terkena,
        uraian_dampak,
      },
      include: {
        context: true,
      },
    });

    return NextResponse.json(identification);
  } catch (error) {
    console.error("Error updating risk identification:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete risk identification
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const userId = searchParams.get("userId");

    if (!id || !userId) {
      return NextResponse.json(
        { error: "Identification ID and User ID are required" },
        { status: 400 }
      );
    }

    // Check if identification belongs to user
    const existingIdentification = await prisma.riskIdentification.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!existingIdentification) {
      return NextResponse.json(
        { error: "Risk identification not found or unauthorized" },
        { status: 404 }
      );
    }

    // Delete related records first
    await prisma.riskAssessment.deleteMany({ where: { identifikasiId: id } });
    await prisma.riskAnalysis.deleteMany({ where: { identifikasiId: id } });

    // Delete the identification
    await prisma.riskIdentification.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Risk identification deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting risk identification:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
