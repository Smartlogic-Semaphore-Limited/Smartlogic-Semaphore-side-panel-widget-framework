/**
 * Make a deep copy of an object or array, assuring that there is at most
 * one instance of each object or array in the resulting structure. The
 * duplicate references (which might be forming cycles) are replaced with
 * an object of the form
 * ```
 * {$ref: PATH}
 * ```
 * where the `PATH` is a Array<string> that locates the first occurrence.
 * So,
 * ```javascript
 *      let a = [];
 *      a[0] = a;
 *      return JSON.stringify(decycle(a));
 * ```
 * produces the string `'[{"$ref":[]}]'`.
 *
 * Path is used to locate the unique object. [] indicates the top level of
 * the object or array. `[STRING]` indicates a child member or
 * property.
 *
 * @category JSON helpers
 */
const Root = Symbol();
function isObject(value:any) {
  const type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}
export function decycle (object:any) {
  const paths = new WeakMap();
  function walk(value:any, key:string|typeof Root, parent?:any) {
    if (key !== "$ref" && isObject(value)) {
      const seen = paths.has(value);
      if (seen) {
        return { $ref: paths.get(value) };
      } else {
        paths.set(value, Root === key ? [] : [...(paths.get(parent) ?? []), key]);
        return getCopy(value);
      }
    }
    return value;
  }
  function getCopy(src:any) {
    const target:Record<any, any> = Array.isArray(src) ? [] : {};
    Object.entries(src).forEach(([key, value]) => {
      target[key] = walk(value, key, src);
    });
    return target;
  }
  return walk(object, Root);
};

/**
 * Restore an object that was reduced by decycle. Members whose values are
 * objects of the form `{$ref: PATH}` are replaced with references to the
 * value found by the PATH. This will restore cycles. The object will be mutated.
 *
 * So,
 * ```javascript
 *      let s = '[{"$ref":[]}]';
 *      return retrocycle(JSON.parse(s));
 * ```
 * produces an array containing a single element which is the array itself.
 *
 * @category JSON helpers
 */
export function retrocycle (object:any) {
  function deref(parent:any, key:string) {
    const element = parent[key];
    if (isObject(element) && "$ref" in element) {
      if (!Array.isArray(element.$ref)) {
        throw new Error(`Invalid $ref "${element.$ref}" value ${element}`);
      }
      try {
        parent[key] = element.$ref.reduce((acc:any, key:string) => acc[key], object);
      } catch (e) {
        throw new Error(`Invalid $ref "${element.$ref}" value not found ${element}`);
      }
    } else {
      walk(element);
    }
  }
  function walk(value:any) {
    if (isObject(value)) {
      Object.keys(value).forEach(function (key) {
        deref(value, key);
      });
    }
    return value;
  }
  return walk(object);
}

