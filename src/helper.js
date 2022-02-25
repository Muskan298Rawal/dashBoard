import { store } from 'react-notifications-component';

export const displaySuccess = (message, t) => {
  store.addNotification({
    message: message,
    type: t,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: { duration: 3000 },
    dismissable: { click: true }
  });
};

export const displayError = (message, t) => {
  store.addNotification({
    message: message,
    type: t,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: { duration: 3000 },
    dismissable: { click: true }
  });
};
