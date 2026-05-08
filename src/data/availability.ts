export function parseAvailable(flag: string | undefined): boolean {
  return flag === "true";
}

export const available = parseAvailable(import.meta.env.PUBLIC_AVAILABLE_FOR_HIRE);
