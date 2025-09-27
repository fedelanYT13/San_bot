export async function before(m, { groupMetadata}) {

  if (!m.text ||!globalThis.prefix.test(m.text)) return;

  const usedPrefix = globalThis.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  const isValidCommand = (cmd, plugins) => {
    return Object.values(plugins).some(plugin => {
      const cmds = Array.isArray(plugin.command)? plugin.command: [plugin.command];
      return cmds.includes(cmd);
});
};

  const chat = globalThis.db.data.chats[m.chat];
  const botId = this.user.jid;
  const settings = globalThis.db.data.settings[botId];

  const isOwner = globalThis.owner
.map(([number]) => number.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
.includes(m.sender);

  if (chat?.adminonly) return;
  if (settings?.self) return;
  if (!command || command === 'mute') return;
  if (chat?.bannedGrupo &&!isOwner) return;

  if (!isValidCommand(command, globalThis.plugins)) {
    const reply = `☕ El comando *${command}* no existe.\n> Usa *${usedPrefix}menu* para ver la lista de comandos disponibles.`;

    await conn.sendMessage(m.chat, {
      text: reply,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363423335018677@newsletter",
          serverMessageId: '',
          newsletterName: "🌘 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 ☽"
}
}
});
}
}
