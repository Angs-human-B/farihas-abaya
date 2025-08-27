const bcrypt = require("bcryptjs");

async function hashPassword() {
  const password = process.argv[2] || "admin123";
  const saltRounds = 12;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("\n=== Farihas Abaya Admin Setup ===");
    console.log("Password:", password);
    console.log("Hashed Password:", hashedPassword);
    console.log("\nAdd this to your .env file:");
    console.log("ADMIN_EMAIL=admin@farihasabaya.com");
    console.log(`ADMIN_PASSWORD=${hashedPassword}`);
    console.log("NEXTAUTH_SECRET=your-secret-key-here");
    console.log("\n");
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

hashPassword();
