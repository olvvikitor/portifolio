// Hash atual sem o "#", decodificado. Um hash malformado (ex.: "%E0") volta cru em vez de lançar erro.
export function readHash(): string {
  const raw = window.location.hash.slice(1)
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}
