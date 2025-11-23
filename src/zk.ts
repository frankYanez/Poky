// src/zk.ts

import { Noir } from "@noir-lang/noir_js";
import { BarretenbergBackend } from "@noir-lang/barretenberg";

// Importá los circuitos compilados desde tu carpeta zk/
import hashCircuit from "./zk/hash_answer.json";
import validateCircuit from "./zk/validate_answer.json";

// Convierte texto → [Field; 32]
export function textToFields(text: string): number[] {
  const buf = new Uint8Array(32);
  const raw = new TextEncoder().encode(text);
  buf.set(raw.slice(0, 32));
  return Array.from(buf);
}

// Inicializa el circuito Noir + backend
async function initCircuit(circuitJson: any) {
  const backend = new BarretenbergBackend(circuitJson);
  const noir = new Noir(circuitJson, backend);
  return noir;
}

// 1️⃣ Generar hash Pedersen de la respuesta
export async function generateHash(answer: string) {
  const noir = await initCircuit(hashCircuit);

  const input = {
    data: textToFields(answer),
  };

  const { returnValue } = await noir.execute(input);

  // returnValue es el hash 0x...
  return returnValue;
}

// 2️⃣ Generar proof ZK que valida que la respuesta coincide con el hash
export async function generateProof(answer: string, expectedHash: string) {
  const noir = await initCircuit(validateCircuit);

  const input = {
    data: textToFields(answer),
    expected_hash: expectedHash,
  };

  const proof = await noir.generateProof(input);

  return proof; // { proof, publicInputs }
}

// 3️⃣ Verificar proof ZK (opcional, en el front)
export async function verifyProof(proof: any) {
  const noir = await initCircuit(validateCircuit);

  const ok = await noir.verifyProof(proof);

  return ok; // true o false
}
