import fetch from 'node-fetch';

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

const captions = {
  anal: (from, to) => from === to? 'se la metió en el ano.': 'se la metió en el ano a',
  cum: (from, to) => from === to? 'se vino dentro de... Omitiremos eso.': 'se vino dentro de',
  undress: (from, to) => from === to? 'se está quitando la ropa': 'le está quitando la ropa a',
  fuck: (from, to) => from === to? 'se entrega al deseo': 'se está cogiendo a',
  spank: (from, to) => from === to? 'está dando una nalgada': 'le está dando una nalgada a',
  lickpussy: (from, to) => from === to? 'está lamiendo un coño': 'le está lamiendo el coño a',
  fap: (from, to) => from === to? 'se está masturbando': 'se está masturbando pensando en',
  grope: (from, to) => from === to? 'se lo está manoseando': 'se lo está manoseando a',
  sixnine: (from, to) => from === to? 'está haciendo un 69': 'está haciendo un 69 con',
  suckboobs: (from, to) => from === to? 'está chupando unas ricas tetas': 'le está chupando las tetas a',
  grabboobs: (from, to) => from === to? 'está agarrando unas tetas': 'le está agarrando las tetas a',
  blowjob: (from, to) => from === to? 'está dando una rica mamada': 'le dio una mamada a',
  boobjob: (from, to) => from === to? 'esta haciendo una rusa': 'le está haciendo una rusa a',
  footjob: (from, to) => from === to? 'está haciendo una paja con los pies': 'le está haciendo una paja con los pies a'
};

const symbols = ['(⁠◠⁠‿⁠◕⁠)', '˃͈◡˂͈', '૮(˶ᵔᵕᵔ˶)ა', '(づ｡◕‿‿◕｡)づ', '(✿◡‿◡)', '(꒪⌓꒪)', '(✿✪‿✪｡)', '(*≧ω≦)', '(✧ω◕)', '˃ 𖥦 ˂', '(⌒‿⌒)', '(¬‿¬)', '(✧ω✧)',  '✿(◕ ‿◕)✿',  'ʕ•́ᴥ•̀ʔっ', '(ㅇㅅㅇ❀)',  '(∩︵∩)',  '(✪ω✪)',  '(✯◕‿◕✯)', '(•̀ᴗ•́)و ̑̑'];

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const commandAliases = {
  encuerar: 'undress',
  coger: 'fuck',
  nalgada: 'spank',
  paja: 'fap',
  69: 'sixnine',
  bj: 'blowjob'
};

const handler = async (m, { conn, command}) => {
  if (!db.data.chats[m.chat].nsfw) return m.reply('✧ Los comandos de *NSFW* están desactivados en este grupo.');

  const actualCommand = commandAliases[command] || command;
  if (!captions[actualCommand]) return;

  let who;
  const texto = await m.mentionedJid;
  if (m.isGroup) {
    who = texto.length> 0? texto[0]: (m.quoted? await m.quoted.sender: m.sender);
} else {
    who = m.quoted?.sender || m.sender;
}

  const fromName = globalThis.db.data.users[m.sender]?.name || 'Alguien';
  const toName = globalThis.db.data.users[who]?.name || 'alguien';
  const user = globalThis.db.data.users[m.sender];
  const genero = user.genre || 'Oculto';
  const captionText = captions[actualCommand](fromName, toName, genero);
  const caption = who!== m.sender
? `*${fromName}* ${captionText} *${toName} ${getRandomSymbol()}*.`
: `*${fromName}* ${captionText} *${getRandomSymbol()}*`;

  try {
    const response = await fetch(`${api.url}/nsfw/interaction?type=${actualCommand}&apikey=${api.key}`);
    const json = await response.json();
    const { result} = json;

    await conn.sendMessage(m.chat, {
      video: { url: result},
      gifPlayback: true,
      caption,
...rcanal
}, { quoted: m});
} catch {
    await m.reply('❎ Ocurrió un error al obtener el contenido.');
}
};

handler.help = ['anal', 'cum', 'undress', 'encuerar', 'fuck', 'coger', 'spank', 'nalgada', 'lickpussy', 'fap', 'paja', 'grope', 'sixnine', '69', 'suckboobs', 'grabboobs', 'blowjob', 'bj', 'boobjob', 'footjob'];
handler.tags = ['anime'];
handler.command = ['anal', 'cum', 'undress', 'encuerar', 'fuck', 'coger', 'spank', 'nalgada', 'lickpussy', 'fap', 'paja', 'grope', 'sixnine', '69', 'suckboobs', 'grabboobs', 'blowjob', 'bj', 'boobjob', 'footjob'];

export default handler;
