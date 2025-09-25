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
};

// ✨ Frases NSFW (solo 5)
const captions = {
  fuck: (from, to) => from === to? 'se entrega al deseo': 'se está cogiendo a',
  spank: (from, to) => from === to? 'está dando una nalgada': 'le está dando una nalgada a',
  undress: (from, to) => from === to? 'se está quitando la ropa': 'le está quitando la ropa a',
  fap: (from, to) => from === to? 'se está masturbando': 'se está masturbando pensando en',
  sixnine: (from, to) => from === to? 'está haciendo un 69': 'está haciendo un 69 con'
};

// 🧩 Alias opcionales
const commandAliases = {
  encuerar: 'undress',
  coger: 'fuck',
  nalgada: 'spank',
  paja: 'fap',
  69: 'sixnine'
};

// ✨ Símbolos decorativos
const symbols = ['(⁠◠⁠‿⁠◕⁠)', '˃͈◡˂͈', '૮(˶ᵔᵕᵔ˶)ა', '(✧ω✧)', '(⌒‿⌒)', '(✿◡‿◡)', '(✪ω✪)', '(•̀ᴗ•́)و ̑̑'];

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// 🧠 Handler principal
const handler = async (m, { conn, command}) => {
  if (!db.data.chats[m.chat]?.nsfw) {
    return m.reply('✧ Los comandos de *NSFW* están desactivados en este grupo.');
}

  const actualCommand = commandAliases[command] || command;
  if (!captions[actualCommand]) return;

  const texto = await m.mentionedJid;
  const who = m.isGroup
? (texto.length> 0? texto[0]: (m.quoted? await m.quoted.sender: m.sender))
: (m.quoted?.sender || m.sender);

  const fromName = db.data.users[m.sender]?.name || 'Alguien';
  const toName = db.data.users[who]?.name || 'alguien';
  const captionText = captions[actualCommand](fromName, toName);
  const caption = who!== m.sender
? `*${fromName}* ${captionText} *${toName} ${getRandomSymbol()}*.`
: `*${fromName}* ${captionText} *${getRandomSymbol()}*`;

  try {
    if (!api?.url ||!api?.key) throw new Error('API no configurada');

    const response = await fetch(`${api.url}/nsfw/interaction?type=${actualCommand}&apikey=${api.key}`);
    const json = await response.json();
    const { result} = json;

    if (!result) throw new Error('Respuesta vacía');

    await conn.sendMessage(m.chat, {
      video: { url: result},
      gifPlayback: true,
      caption,
...rcanal
}, { quoted: m});
} catch (err) {
    console.error('❎ Error al obtener contenido NSFW:', err);
    await m.reply('❎ Ocurrió un error al obtener el contenido.');
}
};

handler.help = ['fuck', 'spank', 'undress', 'fap', 'sixnine'];
handler.tags = ['anime'];
handler.command = ['fuck', 'spank', 'undress', 'encuerar', 'fap', 'paja', 'sixnine', '69', 'coger', 'nalgada'];

export default handler;
