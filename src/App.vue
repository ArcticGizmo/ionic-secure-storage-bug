<template>
  <ion-app>
    <div style="margin: 2rem">
      <IonButton @click="initialise()">1. Initialise</IonButton>
      <IonButton @click="testGetAndSet()">2. Test get and set value in storage</IonButton>
      <IonButton @click="randomiseKey()">3. Regen key</IonButton>
      <IonButton @click="reload()">4. Reload (so storage can re-initialise)</IonButton>
      <IonButton @click="initialise()">5. Initialise</IonButton>
      <IonButton @click="destroyStorage()">6. Try destroy storage</IonButton>
    </div>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonButton } from '@ionic/vue';
import { useKeyValueStorage } from './composables/keyValueStorage';
import { useToast } from './composables/toast';
import { useVault } from './composables/keyVault';

const KEY = 'example-key';

const { regenKey } = useVault();
const { getValue, setValue, destroy } = useKeyValueStorage();
const { showToast } = useToast();

const handleErr = (err: any) => {
  console.error(err);
  if (typeof err === 'string') {
    showToast(`err: ${err}`, 'danger');
  }

  if (err instanceof Error) {
    showToast(`err: ${err.message}`, 'danger');
  }
};

const initialise = async () => {
  try {
    await getValue(KEY);
    showToast('Initialised');
  } catch (err) {
    handleErr(err);
  }
};

const testGetAndSet = async () => {
  try {
    await setValue(KEY, 'example');
    const resp = await getValue(KEY);
    showToast(`Set value and got '${resp}' back`);
  } catch (err) {
    handleErr(err);
  }
};

const randomiseKey = async () => {
  try {
    const key = await regenKey();
    showToast(`new key: ${key}`);
  } catch (err) {
    handleErr(err);
  }
};

const reload = () => window.location.reload();

const destroyStorage = async () => {
  try {
    await destroy();
    showToast('Destroyed');
  } catch (err) {
    handleErr(err);
  }
};
</script>
