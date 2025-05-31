import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import SimpleApp from './App.simple';
import * as serviceWorker from './serviceWorker';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si vous souhaitez que votre application fonctionne hors ligne et se charge plus rapidement,
// vous pouvez changer unregister() en register() ci-dessous.
// Notez que cela s'accompagne de certains inconvénients.
// En savoir plus sur les service workers : https://cra.link/PWA
serviceWorker.unregister(); // Nous gardons le service worker désactivé pour éviter les problèmes
// serviceWorker.register({
//   onSuccess: () => console.log('L\'application est disponible hors ligne'),
//   onUpdate: () => console.log('Une nouvelle version de l\'application est disponible')
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

