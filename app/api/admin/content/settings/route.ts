import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Mock site settings data
    const mockSettings = {
      id: "1",
      brandStory:
        "At Farihas Abaya, we believe that every woman deserves to feel elegant and confident. Our premium abayas blend traditional Arabian heritage with contemporary design, creating timeless pieces that celebrate both modesty and style.",
      brandStoryAr:
        "في فريحة العباية، نؤمن أن كل امرأة تستحق أن تشعر بالأناقة والثقة. تمزج عباياتنا الفاخرة بين التراث العربي التقليدي والتصميم المعاصر.",
      craftmanship:
        "Each abaya is meticulously crafted by skilled artisans using the finest fabrics and traditional techniques passed down through generations.",
      instagram: "https://instagram.com/farihasabaya",
      facebook: "https://facebook.com/farihasabaya",
      whatsapp: "+880 1XXX-XXXXXX",
      email: "info@farihasabaya.com",
    };

    return NextResponse.json(mockSettings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // In a real implementation, you would save to database
    console.log("Saving settings:", body);

    return NextResponse.json({ message: "Settings saved successfully" });
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
