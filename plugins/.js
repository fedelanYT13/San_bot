const namebot = '☕ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 🌙';
const dev = '© 𝑴𝒂𝒅𝒆 𝒃𝒚 𝑫𝒆𝒗-𝒇𝒆𝒅𝒆𝒙𝒚𝒛';
const icon = 'https://files.catbox.moe/gm249p.jpg';
const redes = 'https://moonfare.team';

const rcanal = {
  contextInfo: {
    mentionedJid: [],
    isForwarded: true,
    forwardingScore: 999,
    externalAdReply: {
      title: namebot,
      body: dev,
      mediaUrl: null,
      sourceUrl: redes,
      previewType: "PHOTO",
      thumbnailUrl: icon,
      mediaType: 1,
      renderLargerThumbnail: false
}
}
}

let handler = async (m, { conn}) => {
  const text = m.text.trim()
  if (!text.startsWith('>') &&!text.startsWith('$')) return

  const contenido = text.slice(1).trim()
  if (!contenido) {
    return conn.sendMessage(m.chat, {
      text: '⚠️ Escribe algo después del símbolo para ejecutar.',
...rcanal
}, { quoted: m})
}

  const respuesta = [
    `📝 *Entrada:* ${contenido}`,
    `📡 *Estado:* Acción recibida correctamente.`
  ].join('\n')

  await conn.sendMessage(m.chat, {
    text: respuesta,
    mentions: [m.sender],
...rcanal
}, { quoted: m})
}

handler.customPrefix = /^[>$]/
handler.command = new RegExp
handler.exp = 0

export default handler
