import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Mock hero content data
    const mockHeroContent = [
      {
        id: "1",
        title: "Farihas Abaya",
        titleAr: "فريحة العباية",
        subtitle: "Where Tradition Meets Luxury",
        ctaText: "Explore Collection",
        bgImage: "/images/hero-bg-1.jpg",
        isActive: true,
        order: 1,
      },
    ];

    return NextResponse.json(mockHeroContent);
  } catch (error) {
    console.error("Error fetching hero content:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
