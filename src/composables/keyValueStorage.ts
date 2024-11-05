import { KeyValueStorage } from '@ionic-enterprise/secure-storage';
import { useVault } from './keyVault';

let isReady: Promise<void>;

const storage = new KeyValueStorage();
const { getStorageKey } = useVault();

const createStorage = async () => {
  const key = await getStorageKey();
  console.log('key', key);
  await storage.create(key);
};

const initializeStorage = async (): Promise<void> => {
  if (!isReady) {
    isReady = createStorage();
  }
  return isReady;
};

const getValue = async <T = unknown>(key: string): Promise<T | undefined> => {
  await initializeStorage();
  return storage.get(key) as T | undefined;
};

const setValue = async <T = unknown>(key: string, value: T): Promise<void> => {
  await initializeStorage();
  await storage.set(key, value ?? null);
};

const removeValue = async (key: string): Promise<void> => {
  await initializeStorage();
  return storage.remove(key);
};

const clearStorage = async (): Promise<void> => {
  await initializeStorage();
  return storage.clear();
};

const destroy = async (): Promise<Void> => {
  try {
    await storage.destroyStorage();
  } finally {
    isReady = undefined;
  }
};

export const useKeyValueStorage = () => ({
  getValue,
  setValue,
  removeValue,
  clearStorage,
  destroy
});
