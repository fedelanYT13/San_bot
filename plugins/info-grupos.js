let handler = async (m, { conn}) => {
  const imageUrl = 'https://files.catbox.moe/gm249p.jpg' // Puedes cambiar esta imagen si lo deseas

  const caption = `
☕ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 🌙

🌸 Aquí tienes los enlaces oficiales para unirte a nuestra comunidad:

📺 Canal oficial
👥 Grupo principal
📸 Instagram

¡Únete y forma parte del universo Moonfare!
`.trim()

  await conn.sendMessage(m.chat, {
    image: { url: imageUrl},
    caption,
    buttons: [
      {
        buttonId: 'url1',
        buttonText: { displayText: '🌘 Canal Oficial'},
        type: 2,
        url: 'https://whatsapp.com/channel/0029VaA9YvW3yKZzQXUu9v2U'
},
      {
        buttonId: 'url2',
        buttonText: { displayText: '👥 Grupo Principal'},
        type: 2,
        url: 'https://chat.whatsapp.com/EXAMPLEGROUPLINK'
},
      {
        buttonId: 'url3',
        buttonText: { displayText: '📸 Instagram'},
        type: 2,
        url: 'https://instagram.com/moonfare.team'
}
    ],
    headerType: 4,
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363423335018677@newsletter",
        serverMessageId: '',
        newsletterName: "🌘 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 ☽"
}
}
}, { quoted: m})
}

handler.help = ['info', 'grupos']
handler.tags = ['group']
handler.command = ['info', 'grupos', 'infogrupo', 'links']
export default handler
