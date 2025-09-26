export async function before(m, { conn}) {
  const canal = 'https://whatsapp.com/channel/0029Vb6EMjb6GcGKmVITlG2p'
  const canal2 = 'https://whatsapp.com/channel/0029Vb6EMjb6GcGKmVITlG2p'
  const api = 'https://api.moonfare.xyz'
  const git = 'https://github.com/Dev-fedexyz'
  const md = 'https:/moonfare.team'

  globalThis.redes = [canal, api, git, md].getRandom()

  const canales = Object.entries(global.my).reduce((acc, [key, value]) => {
    if (key.startsWith('ch')) {
      const index = key.slice(2)
      const nombre = global.my[`name${index}`]
      if (nombre) acc.push({ id: value, nombre})
}
    return acc
}, [])

  const channelRD = canales[Math.floor(Math.random() * canales.length)]

  global.fake = {
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: '0',
        newsletterName: channelRD.nombre
},
      externalAdReply: {
        showAdAttribution: true,
        title: global.packname,
        body: global.dev,
        mediaUrl: null,
        description: null,
        previewType: 'PHOTO',
        thumbnailUrl: icon,
        sourceUrl: globalThis.redes,
        mediaType: 1,
        renderLargerThumbnail: false
}
}
}

  global.rcanal = {
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        newsletterName: channelRD.nombre,
        serverMessageId: '0'
}
}
}
}
