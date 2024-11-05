import { toastController } from '@ionic/vue';

const showToast = async (message: string, color?: 'danger') => {
  const t = await toastController.create({
    message,
    duration: 2500,
    buttons: [
      {
        text: 'close',
        role: 'cancel'
      }
    ],
    color
  });
  await t.present();
};

export const useToast = () => {
  return { showToast };
};
