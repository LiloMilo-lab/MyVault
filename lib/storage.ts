export function loadFromStorage<T>(
  key: string,
  fallback: T
): T {

  if (typeof window === "undefined") {
    return fallback;
  }

  const stored =
    localStorage.getItem(key);

  if (!stored) {
    return fallback;
  }

  try {

    return JSON.parse(stored) as T;

  } catch {

    return fallback;

  }

}


export function saveToStorage<T>(
  key: string,
  value: T
) {

  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    key,
    JSON.stringify(value)
  );

}