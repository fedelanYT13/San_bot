let handler = async (m, { conn}) => {
  const texto = m.mentionedJid || [];
  const who = texto.length> 0? texto[0]: (m.quoted? m.quoted.sender: null);

  if (!who) {
    return m.reply('☕ Para ver la foto de perfil, etiqueta o responde al mensaje del usuario.');
}

  try {
    const img = await conn.profilePictureUrl(who, 'image').catch(() => null);

    if (!img) {
      return conn.sendMessage(
        m.chat,
        {
          text: `🌙 No se pudo obtener la foto de perfil de @${who.split('@')[0]}.`,
          mentions: [who]
},
        { quoted: m}
);
}

    const caption = [
      `🖼️ *Foto de perfil solicitada*`,
      `👤 Usuario: @${who.split('@')[0]}`,
      `📡 Estado: Imagen obtenida correctamente`
    ].join('\n');

    await conn.sendMessage(
      m.chat,
      {
        image: { url: img},
        caption,
        mentions: [who]
},
      { quoted: m}
);
} catch (error) {
    console.error(error);
    await m.reply('🌙 Ocurrió un error al obtener la imagen. Intenta nuevamente.');
}
};

handler.help = ['pfp', 'getpic'];
handler.tags = ['utils'];
handler.command = ['pfp', 'getpic'];

export default handler;
