function evalutateKey(key) {
  switch (key) {
    case 'my.infra.thing':
      return 'control';
    case 'my.test.for.app':
      return 'a';
    default:
      return 'control'
  }
}

export const EXPIREMENTS = new class Expirements {
  getSnapShot(...keys) {
    let snapshot = {};
    for (let key of keys) {
      snapshot[key] = evalutateKey(key);
    }
    console.log(snapshot);
    return Object.freeze(snapshot);
  }
}

const REGISTRY = new Map();

export function lookup(key) {
  return REGISTRY.get(key)
}

export async function loadTreatments(snapshot) {
  let keys = Object.keys(snapshot);
  let modules = await Promise.all(keys.map(key => {
    return import(`./../treatments/${key}/${snapshot[key]}.js`);
  }));

  keys.forEach((key, i) => REGISTRY.set(key, modules[i].default));

  return snapshot;
}

export async function getSnapShot(...treatments) {
  return loadTreatments(EXPIREMENTS.getSnapShot(...treatments));
}
