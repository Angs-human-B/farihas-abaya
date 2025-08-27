import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Mock testimonials data
    const mockTestimonials = [
      {
        id: "1",
        name: "Fatima Al-Zahra",
        review:
          "Absolutely stunning abayas! The quality is exceptional and the designs are so elegant. I've received so many compliments.",
        rating: 5,
        image: "/images/testimonial-1.jpg",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Aisha Mohammed",
        review:
          "Farihas Abaya has become my go-to for special occasions. The craftsmanship is beautiful and the customer service is outstanding.",
        rating: 5,
        image: "/images/testimonial-2.jpg",
        isActive: true,
        createdAt: new Date(),
      },
    ];

    return NextResponse.json(mockTestimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
