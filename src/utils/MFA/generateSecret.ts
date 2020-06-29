import speakeasy from "speakeasy";

export default function generateSecretToMFA() {
  const secret = speakeasy.generateSecret({length: 64});
  return secret.base32;
}
