import fetch from 'node-fetch';

const handler = async (m, { conn, text}) => {
  if (!text?.trim()) {
    return conn.reply(m.chat, '☕ Por favor, ingresa un enlace de TikTok o una palabra clave para buscar.', m);
}

  const isUrl = /(?:https?:\/\/)?(?:www\.)?(?:vm|vt|t)?\.?tiktok\.com\/([^\s]+)/i.test(text);
  const apiUrl = isUrl
? `${api.url}/dow/tiktok?url=${encodeURIComponent(text)}&apikey=${api.key}`
: `${api.url}/search/tiktok?query=${encodeURIComponent(text)}&apikey=${api.key}`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`Error del servidor: ${res.status}`);
    const json = await res.json();

    const data = isUrl? json.data: json.data?.[0];
    if (!data) {
      return conn.reply(m.chat, '🌙 No se encontraron resultados. Intenta con otro enlace o término.', m);
}

    const {
      title = 'Sin título',
      dl,
      watermark,
      cover,
      duration = 'N/A',
      author = {},
      stats = {},
      music = {}
} = data;

    const caption = `
📥 *Descarga de TikTok*

🎬 *Título:* ${title}
👤 *Autor:* ${author.nickname || author.unique_id || 'Desconocido'}
⏱️ *Duración:* ${duration}
❤️ *Likes:* ${(stats.likes || 0).toLocaleString()}
💬 *Comentarios:* ${(stats.comments || 0).toLocaleString()}
👁️ *Vistas:* ${(stats.views || stats.plays || 0).toLocaleString()}
🔁 *Compartidos:* ${(stats.shares || 0).toLocaleString()}
🎵 *Audio:* ${music.title? music.title + ' - ': ''}${music.author || 'Desconocido'}
`.trim();

    const head = await fetch(dl, { method: 'HEAD'});
    const contentType = head.headers.get('content-type') || '';

    if (contentType.includes('video')) {
      return conn.sendMessage(m.chat, {
        video: { url: dl},
        caption
}, { quoted: m});
}

    return conn.reply(m.chat, '🌘 El contenido no es compatible o hubo un error al procesarlo.', m);

} catch (error) {
    console.error('Error en TikTok handler:', error);
    return conn.reply(m.chat, '❎ Ocurrió un error al procesar tu solicitud. Intenta nuevamente más tarde.', m);
}
};

handler.help = ['tiktok', 'tt'];
handler.tags = ['descargas'];
handler.command = ['tiktok', 'tt'];

export default handler;
