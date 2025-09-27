import axios from 'axios';

function isValidMediafireUrl(url) {
  try {
    const parsed = new URL(url);
    const isMediafireHost = parsed.hostname.includes('mediafire.com');
    const hasFilePath = parsed.pathname.includes('/file/');
    const hasQuery = parsed.search.length> 1;
    return isMediafireHost && (hasFilePath || hasQuery);
} catch {
    return false;
}
}

const handler = async (m, { conn, args, usedPrefix, command}) => {
  try {
    const input = args.join(' ');
    if (!input) {
      return m.reply(`☕ Por favor, ingresa un enlace de *MediaFire* o una palabra clave para buscar.\nEjemplo: ${usedPrefix}${command} GTA San Andreas`);
}

    let mediafireUrl = input;
    const isUrl = isValidMediafireUrl(input);

    if (!isUrl) {
      const searchRes = await axios.get(`${api.url}/search/mediafire?query=${encodeURIComponent(input)}&apikey=${api.key}`);
      const searchData = searchRes.data;

      if (!searchData.status ||!searchData.results?.length) {
        return m.reply('🌙 No se encontraron resultados para tu búsqueda. Intenta con otro título.');
}

      const result = searchData.results[Math.floor(Math.random() * searchData.results.length)];
      mediafireUrl = result.url;
}

    const response = await axios.get(`${api.url}/dow/mediafire?url=${mediafireUrl}&apikey=${api.key}`);
    const { status, data} = response.data;

    if (!status ||!data) {
      return m.reply('🌙 No se pudo procesar el enlace. Verifica que sea válido o público.');
}

    const { title, peso, fecha, tipo, dl} = data;

    const infoMsg = `📦 *Archivo encontrado:*\n\n` +
      `📄 *Nombre:* ${title}\n` +
      `📦 *Peso:* ${peso}\n` +
      `📅 *Fecha:* ${fecha}\n` +
      `📁 *Tipo:* ${tipo}\n\n` +
      `🔗 *Enlace directo:* ${dl}`;

    await conn.sendMessage(m.chat, { text: infoMsg}, { quoted: m});

    const isTooLarge = /GB|gb/.test(peso);
    if (!isTooLarge) {
      await conn.sendMessage(
        m.chat,
        {
          document: { url: dl},
          mimetype: tipo,
          fileName: title,
},
        { quoted: m}
);
} else {
      await conn.sendMessage(m.chat, {
        text: `☕ *El archivo supera el límite permitido para envío directo.*\nPuedes descargarlo manualmente desde el enlace.`
}, { quoted: m});
}

} catch (error) {
    console.error('Error en MediaFire handler:', error);
    m.reply('🌙 Ocurrió un error al procesar tu solicitud. Intenta nuevamente más tarde.');
}
};

handler.help = ['mediafire', 'mf'];
handler.tags = ['descargas'];
handler.command = ['mediafire', 'mf'];

export default handler;
