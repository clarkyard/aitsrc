import crypto from "crypto";

// SHA-256 Utility
export function sha256(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex");
}

// Generate RSA Keypair for the Election
export function generateElectionKeyPair(): { publicKey: string; privateKey: string } {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });
  return { publicKey, privateKey };
}

// Envelope Encryption: Encrypts data using AES-256-GCM, then encrypts AES key with RSA Public Key
export interface EncryptedBallot {
  encryptedKey: string; // AES key encrypted with RSA Public Key (hex)
  ciphertext: string;   // Ballot choices encrypted with AES (hex)
  iv: string;           // AES IV (hex)
  tag: string;          // AES Auth Tag (hex)
}

export function encryptBallot(text: string, publicKeyPem: string): EncryptedBallot {
  // 1. Generate random AES key (32 bytes) and IV (12 bytes)
  const aesKey = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);
  
  // 2. Encrypt text with AES-256-GCM
  const cipher = crypto.createCipheriv("aes-256-gcm", aesKey, iv);
  let ciphertext = cipher.update(text, "utf8", "hex");
  ciphertext += cipher.final("hex");
  const tag = cipher.getAuthTag().toString("hex");
  
  // 3. Encrypt AES key with RSA Public Key
  const encryptedKey = crypto.publicEncrypt(
    {
      key: publicKeyPem,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    aesKey
  );
  
  return {
    encryptedKey: encryptedKey.toString("hex"),
    ciphertext,
    iv: iv.toString("hex"),
    tag,
  };
}

export function decryptBallot(encrypted: EncryptedBallot, privateKeyPem: string): string {
  // 1. Decrypt AES key with RSA Private Key
  const aesKey = crypto.privateDecrypt(
    {
      key: privateKeyPem,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(encrypted.encryptedKey, "hex")
  );
  
  // 2. Decrypt ciphertext with AES-256-GCM
  const iv = Buffer.from(encrypted.iv, "hex");
  const tag = Buffer.from(encrypted.tag, "hex");
  const decipher = crypto.createDecipheriv("aes-256-gcm", aesKey, iv);
  
  decipher.setAuthTag(tag);
  let decrypted = decipher.update(encrypted.ciphertext, "hex", "utf8");
  decrypted += decipher.final("utf8");
  
  return decrypted;
}

/**
 * Shamir's Secret Sharing (2-of-3) Simulator
 * Works over GF(257) byte-by-byte.
 * Encodes shares as "x-hexString" where x is 1, 2, or 3.
 */
const PRIME = 257;

function mod(n: number): number {
  return ((n % PRIME) + PRIME) % PRIME;
}

function modInverse(n: number): number {
  n = mod(n);
  let base = n;
  let exp = PRIME - 2; // 255
  let result = 1;
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = mod(result * base);
    }
    base = mod(base * base);
    exp = Math.floor(exp / 2);
  }
  return result;
}

export function splitSecret(secret: string): string[] {
  const secretBytes = Buffer.from(secret, "utf8");
  const len = secretBytes.length;
  
  const share1Buf = Buffer.alloc(len * 2);
  const share2Buf = Buffer.alloc(len * 2);
  const share3Buf = Buffer.alloc(len * 2);
  
  for (let i = 0; i < len; i++) {
    const b = secretBytes[i];
    const a = crypto.randomInt(1, PRIME);
    
    const y1 = mod(b + a * 1);
    const y2 = mod(b + a * 2);
    const y3 = mod(b + a * 3);
    
    share1Buf.writeUInt16BE(y1, i * 2);
    share2Buf.writeUInt16BE(y2, i * 2);
    share3Buf.writeUInt16BE(y3, i * 2);
  }
  
  return [
    `1-${share1Buf.toString("hex")}`,
    `2-${share2Buf.toString("hex")}`,
    `3-${share3Buf.toString("hex")}`,
  ];
}

export function combineShares(shares: string[]): string {
  if (shares.length < 2) {
    throw new Error("At least 2 shares are required to combine");
  }
  
  const parsedShares = shares.slice(0, 2).map(s => {
    const parts = s.split("-");
    if (parts.length !== 2) throw new Error("Invalid share format");
    const x = parseInt(parts[0], 10);
    const buf = Buffer.from(parts[1], "hex");
    return { x, buf };
  });
  
  const s0 = parsedShares[0];
  const s1 = parsedShares[1];
  
  const len = s0.buf.length / 2;
  const resultBytes = Buffer.alloc(len);
  
  const x0 = s0.x;
  const x1 = s1.x;
  
  const l0 = mod(x1 * modInverse(x1 - x0));
  const l1 = mod(x0 * modInverse(x0 - x1));
  
  for (let i = 0; i < len; i++) {
    const y0 = s0.buf.readUInt16BE(i * 2);
    const y1 = s1.buf.readUInt16BE(i * 2);
    
    const b = mod(y0 * l0 + y1 * l1);
    resultBytes[i] = b;
  }
  
  return resultBytes.toString("utf8");
}

// Hash Chaining Logic for Ballots
export function calculateBallotHash(
  token: string,
  choices: string,
  prevHash: string,
  castAt: Date
): string {
  const content = `${token}|${choices}|${prevHash}|${castAt.toISOString()}`;
  return sha256(content);
}

export interface BallotRecord {
  anonymousToken: string;
  choices: string;
  prevHash: string;
  castAt: Date;
  hash: string;
}

export function verifyChain(ballots: BallotRecord[]): { valid: boolean; errorIndex?: number } {
  let expectedPrevHash = "0";
  
  for (let i = 0; i < ballots.length; i++) {
    const b = ballots[i];
    
    if (b.prevHash !== expectedPrevHash) {
      return { valid: false, errorIndex: i };
    }
    
    const computedHash = calculateBallotHash(b.anonymousToken, b.choices, b.prevHash, b.castAt);
    if (b.hash !== computedHash) {
      return { valid: false, errorIndex: i };
    }
    
    expectedPrevHash = b.hash;
  }
  
  return { valid: true };
}
