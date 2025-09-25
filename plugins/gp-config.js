const newsletterJid = "120363423335018677@newsletter";
const serverMessageId = "";
const newsletterName = "🌘 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 ☽";

const rcanal = {
  contextInfo: {
    externalAdReply: {
      title: newsletterName,
      body: "",
      mediaUrl: null,
      sourceUrl: null,
      previewType: "NONE",
      thumbnailUrl: null,
      mediaType: 1,
      renderLargerThumbnail: false
}
}
};

let handler = async (m, { conn, command}) => {
  try {
    const groupMetadata = await conn.groupMetadata(m.chat);
    const groupAnnouncement = groupMetadata.announce;

    if (command === 'cerrar) {
      if (groupAnnouncement === true) {
        return conn.sendMessage(m.chat, { text: '🔒 El grupo ya está cerrado.',...rcanal});
}
      await conn.groupSettingUpdate(m.chat, 'announcement');
      return conn.sendMessage(m.chat, { text: '🔓 El grupo ha sido cerrado correctamente.',...rcanal});
}

    if (command === 'abrir') {
      if (groupAnnouncement === false) {
        return conn.sendMessage(m.chat, { text: '☕ El grupo ya está abierto.',...rcanal});
}
      await conn.groupSettingUpdate(m.chat, 'not_announcement');
      return conn.sendMessage(m.chat, { text: '🌙 El grupo ha sido abierto correctamente.',...rcanal});
}

    return conn.sendMessage(m.chat, { text: '❎ *Error, repórtelo al grupo de soporte.*',...rcanal});

} catch (e) {
    console.error(e);
    return conn.sendMessage(m.chat, { text: `🌙 *Error al realizar la configuración del grupo:* ${e.message}.`,...rcanal});
}
};

handler.help = ['cerrar', 'abrir'];
handler.tags = ['group'];
handler.command = ['cerrar', 'abrir'];
handler.admin = true;
handler.botAdmin = true;

export default handler;
