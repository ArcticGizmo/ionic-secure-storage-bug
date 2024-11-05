import { isPlatform } from '@ionic/vue';
import { BrowserVault, DeviceSecurityType, IdentityVaultConfig, Vault, VaultType } from '@ionic-enterprise/identity-vault';

const createVault = (config: IdentityVaultConfig) => (isPlatform('hybrid') ? new Vault(config) : new BrowserVault(config));

const STORAGE_KEY = 'encryption-key';

const generateEncryptionKey = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const vault = createVault({
  key: 'ionic-secure-storage-bug.storage',
  type: VaultType.SecureStorage,
  deviceSecurityType: DeviceSecurityType.None,
  unlockVaultOnLoad: false
});

const getStorageKey = async (): Promise<string> => {
  const key = await vault.getValue(STORAGE_KEY);

  if (await vault.isLocked()) {
    throw 'storage is locked';
  }

  if (key) return key;

  const encryptionKey = generateEncryptionKey();
  await vault.setValue(STORAGE_KEY, encryptionKey);
  return encryptionKey;
};

const regenKey = async () => {
  const encryptionKey = generateEncryptionKey();
  await vault.setValue(STORAGE_KEY, encryptionKey);
  return encryptionKey;
};

export const useVault = () => ({
  getStorageKey,
  regenKey
});
