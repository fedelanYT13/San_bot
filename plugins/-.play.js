import fetch from 'node-fetch'

// Personalización visual del bot
const namebot = '☕ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 🌙'
const dev = 'Desarrollado por Moonfare Team'
const icon = 'https://example.com/icon.jpg' // Reemplaza con tu imagen
const redes = 'https://moonfare.team'       // Reemplaza con tu enlace

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
      renderLargerThumbnail: false
}
}
}

async function handler(m, { conn, args, command}) {
  const url = args[0]
  if (!url ||!url.includes('youtube.com') &&!url.includes('youtu.be')) {
    return conn.sendMessage(m.chat, {
      text: `❌ Ingresa un enlace válido de YouTube.\n\nEjemplo: *${command} https://youtu.be/abc123*`,
...rcanal
}, { quoted: m})
}

  try {
    const api = `https://ruby-core.vercel.app/api/download/youtube/mp3?url=${encodeURIComponent(url)}`
    const res = await fetch(api)
    const json = await res.json()

    if (!json.status ||!json.result?.url) {
      throw new Error('No se pudo obtener el audio.')
}

    const { title, url: download, thumbnail, filesize} = json.result

    const caption = `
🎶 *Título:* ${title}
📦 *Tamaño:* ${filesize}
🔗 *Fuente:* ${url}
`.trim()

    await conn.sendMessage(m.chat, {
      text: caption,
...rcanal
}, { quoted: m})

    await conn.sendMessage(m.chat, {
      audio: { url: download},
      mimetype: 'audio/mp4',
      fileName: `${title}.mp3`,
...rcanal
}, { quoted: m})

} catch (e) {
    await conn.sendMessage(m.chat, {
      text: `⚠️ Error al procesar el enlace.\nAsegúrate de que sea un video válido de YouTube.`,
...rcanal
}, { quoted: m})
}
}

handler.command = ['play3', 'playmp3']
handler.help = ['play <enlace>']
handler.tags = ['descargas']
export default handler
