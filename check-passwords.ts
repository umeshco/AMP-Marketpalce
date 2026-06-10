import crypto from 'node:crypto';

function uc(e: string): string {
  const enc = new TextEncoder().encode(e + "amp_salt_2024");
  const hash = crypto.createHash('sha256').update(enc).digest('hex');
  return hash;
}

const hashesToTest = [
  "a591025453039e5a5b536d48a1540cb8e92ab93673b42c21f2a3da804d341009", // admin hash
];

const passwords = [
  "admin@1234", "admin1234!", "Admin@1234", "Admin1234", "Admin1234!", "admin@2026", "admin2026", "ampadmin",
  "amp_admin", "amp_admin123", "admin_amp", "authority_placement", "password@2024", "admin@2024!", "Admin@2024",
  "Admin@2024!", "admin@2025", "admin2025", "Admin@2025", "Admin@2025!"
];

passwords.forEach(p => {
  const h = uc(p);
  if (hashesToTest.includes(h)) {
    console.log(`MATCH FOUND! Password "${p}" corresponds to hash ${h}`);
  }
});
