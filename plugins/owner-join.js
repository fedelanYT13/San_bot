let handler = async (m, { conn, args, isOwner}) => {
  if (!isOwner) return m.reply('☕ Este comando solo puede usarlo el owner del bot.');

  const link = args[0];
  if (!link ||!link.includes('chat.whatsapp.com/')) {
    return m.reply('🔒 Proporciona un enlace válido de invitación de grupo.');
}

  const code = link.split('chat.whatsapp.com/')[1].trim();
  try {
    const res = await conn.groupAcceptInvite(code);
    const metadata = await conn.groupMetadata(res);
    const groupName = metadata.subject || 'Grupo';

    const rcanal = {
      contextInfo: {
        newsletterJid: "120363423335018677@newsletter",
        newsletterName: "🌘 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 ☽",
        serverMessageId: ""
}
};

    await conn.sendMessage(res, {
      text: `☕ Me uní correctamente a *${groupName}*.`,
...rcanal
}, { quoted: m});
} catch (err) {
    console.error('❎ Error al unirse al grupo:', err);
    await m.reply('❎ No pude unirme al grupo. Verifica el enlace o los permisos.');
}
};

handler.help = ['join <enlace>'];
handler.tags = ['owner'];
handler.command = ['join'];
handler.rowner = true;

export default handler;
