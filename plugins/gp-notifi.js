const { makeWASocket, useMultiFileAuthState} = require('@whiskeysockets/baileys');

async function iniciarBot() {
  const { state, saveCreds} = await useMultiFileAuthState('auth');
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
});

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('group-update', async (update) => {
    const { id, announce} = update;

    const metadata = await sock.groupMetadata(id);
    const nombreGrupo = metadata.subject;
    const actor = update.participants?.[0] || 'Desconocido';
    const actorID = actor.split('@')[0];

    const replyAbrir = `✅ El grupo *${nombreGrupo}* ha sido abierto por @${actorID}`;
    const replyCerrar = `🔒 El grupo *${nombreGrupo}* ha sido cerrado por @${actorID}`;

    const contextInfo = {
      isForwarded: true,
      forwardingScore: 999,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363423335018677@newsletter",
        serverMessageId: '',
        newsletterName: "🌘 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 ☽"
}
};

    if (announce === false) {
      await sock.sendMessage(id, {
        text: replyAbrir,
        mentions: [actor],
        contextInfo
});
}

    if (announce === true) {
      await sock.sendMessage(id, {
        text: replyCerrar,
        mentions: [actor],
        contextInfo
});
}
});
}

iniciarBot();
