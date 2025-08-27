import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Mock data for recent inquiries
    // In a real implementation, you would fetch from a database
    const mockInquiries = [
      {
        id: "1",
        customerName: "Fatima Ahmed",
        email: "fatima@example.com",
        message:
          "I'm interested in the Royal Heritage collection. Do you have custom sizing available?",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        status: "new" as const,
      },
      {
        id: "2",
        customerName: "Aisha Rahman",
        email: "aisha@example.com",
        message:
          "Beautiful abayas! I would like to visit your Dhanmondi store. What are your current opening hours?",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        status: "responded" as const,
      },
      {
        id: "3",
        customerName: "Mariam Khan",
        email: "mariam@example.com",
        message:
          "Do you offer international shipping? I'm based in London and would love to order from your Eid collection.",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        status: "new" as const,
      },
      {
        id: "4",
        customerName: "Zara Ali",
        email: "zara@example.com",
        message:
          "Thank you for the excellent service! The abaya I purchased fits perfectly.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        status: "closed" as const,
      },
    ];

    return NextResponse.json(mockInquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
