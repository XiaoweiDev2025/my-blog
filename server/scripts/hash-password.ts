import bcrypt from "bcryptjs";

const plain = process.argv[2];

if (!plain) {
    console.error("Usage: ts-node scripts/hash-password.ts <your-password>");
    process.exit(1);
}

const salt = bcrypt.genSaltSync(12);
const hash = bcrypt.hashSync(plain, salt);

console.log("ADMIN_PASSWORD_HASH=", hash);