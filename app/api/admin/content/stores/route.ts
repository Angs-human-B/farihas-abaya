import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Mock stores data
    const mockStores = [
      {
        id: "1",
        name: "Dhanmondi Flagship Store",
        address: "House 42, Road 8, Dhanmondi, Dhaka 1205",
        phone: "+880 1XXX-XXXXXX",
        hours: "10 AM - 10 PM",
        mapUrl: "https://maps.google.com/...",
        image: "/images/store-dhanmondi.jpg",
        isActive: true,
      },
      {
        id: "2",
        name: "Gulshan Boutique",
        address: "Plot 15, Road 113, Gulshan 2, Dhaka 1212",
        phone: "+880 1XXX-XXXXXX",
        hours: "11 AM - 9 PM",
        mapUrl: "https://maps.google.com/...",
        image: "/images/store-gulshan.jpg",
        isActive: true,
      },
    ];

    return NextResponse.json(mockStores);
  } catch (error) {
    console.error("Error fetching stores:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
