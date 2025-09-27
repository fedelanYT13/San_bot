import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command}) => {
  try {
    const url = args[0];

    if (!url) {
      return m.reply(`☕ Por favor, ingresa el enlace de un video de *Facebook*.\nEjemplo: ${usedPrefix}${command} https://www.facebook.com/...`);
}

    const isFacebookLink = /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.watch|video\.fb\.com)\//i.test(url);
    if (!isFacebookLink) {
      return m.reply('🌙 El enlace no parece *válido*. Asegúrate de que sea de *Facebook*.');
}

    await conn.sendMessage(m.chat, { text: '⏳ *Procesando video...*'}, { quoted: m});

    const response = await fetch(`${api.url}/dow/facebook?url=${encodeURIComponent(url)}&apikey=${api.key}`);
    const json = await response.json();

    if (!json.status ||!json.data?.dl) {
      return m.reply('🫟 No se pudo obtener el *video*. Intenta con otro enlace o verifica que sea público.');
}

    await conn.sendMessage(
      m.chat,
      {
        video: { url: json.data.dl},
        caption: `📥 *Descarga completada*\n\n📚 Enlace original:\n${url}`,
        mimetype: 'video/mp4',
        fileName: 'facebook_video.mp4'
},
      { quoted: m}
);

} catch (error) {
    console.error('Error al descargar video de Facebook:', error);
    m.reply('⚠️ Ocurrió un *error inesperado* al procesar el video. Intenta nuevamente más tarde.');
}
};

handler.help = ['fb', 'facebook'];
handler.tags = ['descargas', 'facebook'];
handler.command = ['fb', 'facebook'];

export default handler;
