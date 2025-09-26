import { generateWAMessageFromContent} from '@whiskeysockets/baileys'
import * as fs from 'fs'

const namebot = '☕ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 🌙'
const dev = '© 𝑴𝒂𝒅𝒆 𝒃𝒚 𝑫𝒆𝒗-𝒇𝒆𝒅𝒆𝒙𝒚𝒛'
const icon = 'https://files.catbox.moe/gm249p.jpg'
const redes = 'https://moonfare.team'

const rcanal = {
  contextInfo: {
    externalAdReply: {
      title: namebot,
      body: dev,
      mediaUrl: null,
      sourceUrl: redes,
      previewType: 'PHOTO',
      thumbnailUrl: icon,
      mediaType: 1,
      renderLargerThumbnail: false
}
}
}

var handler = async (m, { conn, text, participants, isOwner, isAdmin}) => {
  if (!m.quoted &&!text) {
    return conn.reply(m.chat, `☕ Ingrese un texto.\n\n☕ Ejemplo: holaa xd`, m, rcanal)
}

  try {
    const users = participants.map(u => conn.decodeJid(u.id))
    const q = m.quoted? m.quoted: m
    const c = m.quoted? await m.getQuotedObj(): m.msg || m.text || m.sender

    const msg = conn.cMod(
      m.chat,
      generateWAMessageFromContent(
        m.chat,
        {
          [m.quoted? q.mtype: 'extendedTextMessage']: m.quoted
? c.message[q.mtype]
: { text: '' || c}
},
        { quoted: null, userJid: conn.user.id}
),
      text || q.text,
      conn.user.jid,
      { mentions: users}
)

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id})
} catch {
    
    const users = participants.map(u => conn.decodeJid(u.id))
    const quoted = m.quoted? m.quoted: m
    const mime = (quoted.msg || quoted).mimetype || ''
    const isMedia = /image|video|sticker|audio/.test(mime)
    const more = String.fromCharCode(8206)
    const masss = more.repeat(850)
    const htextos = text || '*Hola!!*'

    let mediax
    if (isMedia) mediax = await quoted.download?.()

    if (isMedia && quoted.mtype === 'imageMessage') {
      await conn.sendMessage(
        m.chat,
        { image: mediax, caption: htextos, mentions: users},
        { quoted: null}
)
} else if (isMedia && quoted.mtype === 'videoMessage') {
      await conn.sendMessage(
        m.chat,
        {
          video: mediax,
          mimetype: 'video/mp4',
          caption: htextos,
          mentions: users
},
        { quoted: null}
)
} else if (isMedia && quoted.mtype === 'audioMessage') {
      await conn.sendMessage(
        m.chat,
        {
          audio: mediax,
          mimetype: 'audio/mp4',
          fileName: 'Hidetag.mp3',
          mentions: users
},
        { quoted: null}
)
} else if (isMedia && quoted.mtype === 'stickerMessage') {
      await conn.sendMessage(
        m.chat,
        { sticker: mediax, mentions: users},
        { quoted: null}
)
} else {
      await conn.relayMessage(
        m.chat,
        {
          extendedTextMessage: {
            text: `${masss}\n${htextos}\n`,
            contextInfo: {
              mentionedJid: users,
              externalAdReply: {
                thumbnailUrl: icon,
                sourceUrl: redes,
                title: namebot,
                body: dev,
                mediaType: 1,
                previewType: 'PHOTO',
                renderLargerThumbnail: false
}
}
}
},
        {}
)
}
}
}

handler.help = ['n']
handler.tags = ['grupo']
handler.command = ['notificar', 'tag']
handler.group = true
handler.admin = true
handler.register = true

export default handler
