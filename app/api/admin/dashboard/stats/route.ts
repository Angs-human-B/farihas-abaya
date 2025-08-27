import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all statistics in parallel
    const [
      totalProducts,
      featuredProducts,
      inStockProducts,
      outOfStockProducts,
      activeTestimonials,
      totalInquiries,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { featured: true } }),
      prisma.product.count({ where: { inStock: true } }),
      prisma.product.count({ where: { inStock: false } }),
      prisma.testimonial.count({ where: { isActive: true } }),
      // For now, we'll mock inquiries count since we haven't created that table yet
      Promise.resolve(0),
    ]);

    const stats = {
      totalProducts,
      featuredProducts,
      inStockProducts,
      outOfStockProducts,
      activeTestimonials,
      totalInquiries,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
