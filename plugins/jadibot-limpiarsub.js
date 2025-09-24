import ws from 'ws'

async function handler(m, { conn}) {
  let activeBots = global.conns.filter(bot => bot.user && bot.ws?.socket?.readyState!== ws.CLOSED)

  if (activeBots.length <= 1) {
    await conn.sendMessage(m.chat, { text: '⚠️ No hay Sub-Bots activos para eliminar.'}, { quoted: m})
    return
}

  const subBots = activeBots.slice(1)

  for (const bot of subBots) {
    try {
      await bot.ws.close()
      console.log(`🗑️ Sub-Bot eliminado: ${bot.user.jid}`)
} catch (e) {
      console.error(`❌ Error al eliminar Sub-Bot ${bot.user.jid}:`, e)
}
}

  await conn.sendMessage(m.chat, {
    text: `✅ Se han eliminado ${subBots.length} Sub-Bots.\n🤖 Bot Principal sigue activo.`,
}, { quoted: m})
}

handler.command = ['limpiar', 'limpiarsub']
handler.help = ['limpiar']
handler.tags = ['jadibot']
export default handler
