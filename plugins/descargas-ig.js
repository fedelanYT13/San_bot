import { igdl} from "ruhend-scraper";

const handler = async (m, { args, conn}) => {
  const EMOJI = {
    wait: '🕒',
    success: '✅',
    fail: '⚠️'
};

  const link = args[0];

  if (!link) {
    return conn.reply(m.chat, '☕ Por favor, ingresa un enlace válido de *Instagram*.', m);
}

  try {
    await m.react(EMOJI.wait);

    await conn.sendMessage(m.chat, {
      text: '🕒 *Procesando descarga desde Instagram...*',
      contextInfo: {
        externalAdReply: {
          title: 'Instagram Downloader',
          body: 'Descarga rápida y sin marca de agua',
          mediaType: 1,
          showAdAttribution: true,
          previewType: 0,
          thumbnail: null,
          sourceUrl: null
}
}
}, { quoted: m});

    const res = await igdl(link);
    const data = res?.data;

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('No se encontraron medios disponibles.');
}

    const media = data
.filter(item => item.url && item.type === 'video')
.sort((a, b) => (parseInt(b.resolution) || 0) - (parseInt(a.resolution) || 0))[0];

    if (!media) {
      throw new Error('No se encontró un video adecuado para descargar.');
}

    await conn.sendMessage(m.chat, {
      video: { url: media.url},
      caption: '📥 *Video descargado desde Instagram*'
}, { quoted: m});

    await m.react(EMOJI.success);

} catch (err) {
    console.error('Error en Instagram handler:', err);
    await m.react(EMOJI.fail);
    return conn.reply(m.chat, `🌙 Ocurrió un error al procesar el enlace:\n${err.message}`, m);
}
};

handler.command = ['instagram', 'ig'];
handler.tags = ['descargas'];
handler.help = ['instagram', 'ig'];
handler.register = false;

export default handler;
