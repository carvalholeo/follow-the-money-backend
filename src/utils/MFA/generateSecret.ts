import speakeasy from 'speakeasy';

export default function generateSecretToMFA(): string {
  const secret = speakeasy.generateSecret({length: 64});
  return secret.base32;
}
