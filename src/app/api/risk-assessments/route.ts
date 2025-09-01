import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch all risk assessments
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

    const assessments = await prisma.riskAssessment.findMany({
      where,
      include: {
        context: true,
        identification: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(assessments);
  } catch (error) {
    console.error("Error fetching risk assessments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new risk assessment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      respon_risiko,
      pengendalian_sudah_ada,
      rencana_tindak_pengendalian,
      penanggung_jawab,
      target_penyelesaian,
      indikator_pengeluaran,
      kemungkinan_diharapkan,
      dampak_diharapkan,
      nilai_diharapkan,
      konteksId,
      identifikasiId,
      analisisId,
      userId,
    } = body;

    // Validation
    if (
      !respon_risiko ||
      !penanggung_jawab ||
      !target_penyelesaian ||
      !konteksId ||
      !identifikasiId ||
      !analisisId ||
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

    const assessment = await prisma.riskAssessment.create({
      data: {
        respon_risiko,
        pengendalian_sudah_ada,
        rencana_tindak_pengendalian,
        penanggung_jawab,
        target_penyelesaian: new Date(target_penyelesaian),
        indikator_pengeluaran,
        kemungkinan_diharapkan,
        dampak_diharapkan,
        nilai_diharapkan,
        konteksId,
        identifikasiId,
        analisisId,
        userId,
      },
      include: {
        context: true,
        identification: true,
      },
    });

    return NextResponse.json(assessment, { status: 201 });
  } catch (error) {
    console.error("Error creating risk assessment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update risk assessment
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      respon_risiko,
      pengendalian_sudah_ada,
      rencana_tindak_pengendalian,
      penanggung_jawab,
      target_penyelesaian,
      indikator_pengeluaran,
      kemungkinan_diharapkan,
      dampak_diharapkan,
      nilai_diharapkan,
      analisisId,
      userId,
    } = body;

    if (!id || !userId) {
      return NextResponse.json(
        { error: "Assessment ID and User ID are required" },
        { status: 400 }
      );
    }

    // Check if assessment belongs to user
    const existingAssessment = await prisma.riskAssessment.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!existingAssessment) {
      return NextResponse.json(
        { error: "Risk assessment not found or unauthorized" },
        { status: 404 }
      );
    }

    const assessment = await prisma.riskAssessment.update({
      where: { id },
      data: {
        respon_risiko,
        pengendalian_sudah_ada,
        rencana_tindak_pengendalian,
        penanggung_jawab,
        target_penyelesaian: target_penyelesaian
          ? new Date(target_penyelesaian)
          : undefined,
        indikator_pengeluaran,
        kemungkinan_diharapkan,
        dampak_diharapkan,
        nilai_diharapkan,
        analisisId,
      },
      include: {
        context: true,
        identification: true,
      },
    });

    return NextResponse.json(assessment);
  } catch (error) {
    console.error("Error updating risk assessment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete risk assessment
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const userId = searchParams.get("userId");

    if (!id || !userId) {
      return NextResponse.json(
        { error: "Assessment ID and User ID are required" },
        { status: 400 }
      );
    }

    // Check if assessment belongs to user
    const existingAssessment = await prisma.riskAssessment.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!existingAssessment) {
      return NextResponse.json(
        { error: "Risk assessment not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.riskAssessment.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Risk assessment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting risk assessment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
