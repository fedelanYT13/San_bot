import { googleImage} from '@bochilteam/scraper';

const handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text?.trim()) {
    return conn.sendMessage(m.chat, {
      text: `☕ *Uso correcto:*\n${usedPrefix + command} Naruto Uzumaki`,
}, { quoted: m});
}

  await conn.sendMessage(m.chat, {
    text: '⌛ *Buscando imágenes...*',
}, { quoted: m});

  try {
    const results = await googleImage(text);
    if (!Array.isArray(results) || results.length === 0) {
      return conn.sendMessage(m.chat, {
        text: `❌ No se encontraron imágenes para *${text}*.`,
}, { quoted: m});
}

    const validImages = results.filter(url => /\.(jpg|jpeg|png|webp)$/i.test(url));
    const selectedImage = validImages[Math.floor(Math.random() * validImages.length)] || results[0];

    await conn.sendMessage(m.chat, {
      image: { url: selectedImage},
      caption: `🔍 *Resultado de búsqueda:* ${text}`,
}, { quoted: m});

} catch (error) {
    console.error('Error en búsqueda de imagen:', error);
    await conn.sendMessage(m.chat, {
      text: `🌙 Ocurrió un error al buscar imágenes:\n${error.message}`,
}, { quoted: m});
}
};

handler.help = ['imagen <consulta>'];
handler.tags = ['buscador', 'descargas'];
handler.command = ['image', 'imagen'];
handler.group = true;
handler.register = false;

export default handler;
