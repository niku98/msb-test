export function clearUndefinedProperties<T extends { [key: string]: any }>(
  object: T
) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const value = object[key];
      if (value === undefined) {
        delete object[key];
      }
    }
  }

  return object;
}

export function emptyObject<T>(obj: T): T {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      delete obj[key];
    }
  }

  return obj;
}

/**
 * Turn all object properties to `undefined`
 *
 * @param obj Object
 * @returns Object
 */
export function clearObject<T extends { [key: string]: any }>(obj: T): T {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj[key] = undefined as any;
    }
  }

  return obj;
}
