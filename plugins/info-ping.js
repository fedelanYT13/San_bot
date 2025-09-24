import os from 'os'
import { performance} from 'perf_hooks'

const namebot = '☕ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 🌙'
const dev = '𝑴𝒂𝒅𝒆 𝒃𝒚 𝑫𝒆𝒗-𝒇𝒆𝒅𝒆𝒙𝒚𝒛'
const icon = 'https://files.catbox.moe/gm249p.jpg'
const redes = 'https://moonfare.team'
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

async function handler(m, { conn}) {
  const start = performance.now()
  const ping = Math.round(performance.now() - start)
  const uptime = process.uptime()
  const usedMemory = process.memoryUsage().rss / 1024 / 1024
  const totalMemory = os.totalmem() / 1024 / 1024
  const cpuModel = os.cpus()[0].model
  const platform = os.platform()
  const arch = os.arch()
  const currentTime = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires'})

  const info = `
☕ *${namebot} - Estado del Sistema* 🌙

📡 *Ping:* ${ping} ms
⏱️ *Uptime:* ${Math.floor(uptime / 60)} min
💾 *RAM usada:* ${usedMemory.toFixed(2)} MB / ${totalMemory.toFixed(2)} MB
🧠 *CPU:* ${cpuModel}
🖥️ *Sistema:* ${platform} (${arch})
🕰️ *Hora actual:* ${currentTime}
`.trim()

  await conn.sendMessage(m.chat, {
    text: info,
...rcanal
}, { quoted: m})
}

handler.command = ['ping', 'info', 'estado']
handler.help = ['ping', 'info']
handler.tags = ['info']
export default handler
