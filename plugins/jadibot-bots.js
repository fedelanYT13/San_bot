import ws from 'ws'

async function handler(m, { conn: stars, usedPrefix}) {
  const uniqueUsers = new Map()

  global.conns.forEach((conn) => {
    if (conn.user && conn.ws?.socket?.readyState!== ws.CLOSED) {
      uniqueUsers.set(conn.user.jid, conn)
}
})

  const users = [...uniqueUsers.values()]
  const totalSubBots = users.length

  const mainBot = users[0]
  const mainBotInfo = mainBot
? `*☕ Bot Principal »* ${mainBot.user.name || '-'}\n   ↳ wa.me/${mainBot.user.jid.replace(/[^0-9]/g, '')}`
: '*🍁 Bot Principal »* No disponible'

  const subBots = users.slice(1)
  const subBotList = subBots.map((v, i) =>
    `*#${i + 1} Sub-Bot »* ${v.user.name || '-'}\n   ↳ wa.me/${v.user.jid.replace(/[^0-9]/g, '')}`
).join('\n\n')

  const responseMessage = `
${mainBotInfo}

*☕ Total Sub-Bots »* ${totalSubBots - 1}

${subBotList || '— No hay Sub-Bots activos —'}
`.trim()

  await stars.sendMessage(m.chat, { text: responseMessage,...rcanal}, { quoted: m})
}

handler.command = ['botlis', 'bots']
handler.help = ['bots', 'botslis']
handler.tags = ['jadibot']
export default handler
