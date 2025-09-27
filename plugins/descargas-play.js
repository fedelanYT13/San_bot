import fetch from "node-fetch";
import yts from "yt-search";

const namebot = '☕ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 🌙';
const dev = '© 𝑴𝒂𝒅𝒆 𝒃𝒚 𝑫𝒆𝒗-𝒇𝒆𝒅𝒆𝒙𝒚𝒛';
const icon = 'https://files.catbox.moe/gm249p.jpg';
const redes = 'https://moonfare.team';

const rcanal = {
  contextInfo: {
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363423335018677@newsletter",
      serverMessageId: '',
      newsletterName: "🌘 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 ☽"
},
    externalAdReply: {
      title: namebot,
      body: dev,
      mediaUrl: null,
      description: null,
      previewType: "PHOTO",
      thumbnailUrl: icon,
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: true
}
}
};

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/;

const handler = async (m, { conn, text, command}) => {
  try {
    if (!text?.trim()) {
      return conn.sendMessage(m.chat, {
        text: `☕ Debes escribir el *nombre* o *link* del video/audio para descargar.`,
...rcanal
}, { quoted: m});
}

    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key}});

    const videoIdMatch = text.match(youtubeRegexID);
    const searchQuery = videoIdMatch? `https://youtu.be/${videoIdMatch[1]}`: text;
    let ytResult = await yts(searchQuery);

    if (videoIdMatch) {
      const videoId = videoIdMatch[1];
      ytResult = ytResult.all.find(v => v.videoId === videoId) || ytResult.videos.find(v => v.videoId === videoId);
} else {
      ytResult = ytResult.all?.[0] || ytResult.videos?.[0];
}

    if (!ytResult) {
      await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key}});
      return conn.sendMessage(m.chat, {
        text: "⚠️ No encontré resultados. Intenta con otro nombre o link.",
...rcanal
}, { quoted: m});
}

    const { title, thumbnail, timestamp, views, ago, url, author} = ytResult;
    const canal = author?.name || "Desconocido";
    const vistas = formatViews(views);

    const infoMessage = `
📥 *Descarga en curso...*

🎧 *Título:* ${title}
📺 *Canal:* ${canal}
⏱️ *Duración:* ${timestamp}
👁️ *Vistas:* ${vistas}
📅 *Publicado:* ${ago}
🔗 *Enlace:* ${url}

${namebot}`.trim();

    const thumb = (await conn.getFile(thumbnail))?.data;
    await conn.sendMessage(m.chat, {
      text: infoMessage,
...rcanal
}, { quoted: m});

    if (["play", "yta", "ytmp3", "playaudio"].includes(command)) {
      const audioRes = await fetch(`https://ruby-core.vercel.app/api/download/youtube/mp3?url=${encodeURIComponent(url)}`);
      const audioJson = await audioRes.json();

      if (!audioJson?.status ||!audioJson?.download?.url) {
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key}});
        return conn.sendMessage(m.chat, {
          text: "🌙 No se pudo descargar el audio. Intenta más tarde.",
...rcanal
}, { quoted: m});
}

      await conn.sendMessage(m.chat, {
        audio: { url: audioJson.download.url},
        fileName: `${audioJson.metadata?.title || "music"}.mp3`,
        mimetype: "audio/mpeg",
        ptt: false,
...rcanal
}, { quoted: m});

      await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key}});
}

    else if (["play2", "ytv", "ytmp4", "mp4"].includes(command)) {
      const videoRes = await fetch(`https://ruby-core.vercel.app/api/download/youtube/mp4?url=${encodeURIComponent(url)}`);
      const videoJson = await videoRes.json();

      if (!videoJson?.status ||!videoJson?.download?.url) {
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key}});
        return conn.sendMessage(m.chat, {
          text: "🌙 No se pudo descargar el video. Intenta más tarde.",
...rcanal
}, { quoted: m});
}

      await conn.sendMessage(m.chat, {
        video: { url: videoJson.download.url},
        fileName: `${videoJson.metadata?.title || "video"}.mp4`,
        caption: title,
        mimetype: "video/mp4",
...rcanal
}, { quoted: m});

      await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key}});
}

    else {
      return conn.sendMessage(m.chat, {
        text: "🌘 Comando no válido. Revisa el menú.",
...rcanal
}, { quoted: m});
}

} catch (error) {
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key}});
    return conn.sendMessage(m.chat, {
      text: `⚠️ Error inesperado:\n\n${error}`,
...rcanal
}, { quoted: m});
}
};

handler.command = handler.help = ["play", "ytmp3", "play2", "ytmp4", "playaudio"];
handler.tags = ["descargas"];
export default handler;

function formatViews(views) {
  if (!views) return "No disponible";
  if (views>= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B`;
  if (views>= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views>= 1_000) return `${(views / 1_000).toFixed(1)}k`;
  return views.toString();
}
