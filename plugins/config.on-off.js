let handler = async (m, { conn, args, command }) => {
  const setting = args[0]?.toLowerCase();
  const chatData = global.db.data.chats[m.chat];

  if (!setting) {
    return m.reply(
      ` 📚 Debes seleccionar la *función* que deseas activar o desactivar.`
    );
  }

  const status = command === 'on';
  const reply = (name) =>
    m.reply(`📚 La función *${name}* ha sido *${status ? 'activada' : 'desactivada'}* en este grupo.`);

  switch (setting) {
    case 'antilinks':
    case 'antienlaces':
      chatData.antilink = status;f.
      reply('Anti Enlaces');
      break;

    case 'nsfw':
      chatData.nsfw = status;
      reply('NSFW');
      break;

    case 'welcome':
      chatData.welcome = status;
      reply('Bienvenida');
      break;

    case 'alerts':
    case 'alertas':
      chatData.alerts = status;
      reply('Alertas');
      break;

    default:
      m.reply(
        `❎ Opción no *válida*\n\n☕ *Configuraciónes disponibles:*\nwelcome\nantienlaces\nnsfw\nsoloadmin\n- alertas\n\n📚 *Ejemplo:* ${command} welcome'
      );
      break;
  }
};

handler.help = ['on', 'off'];
handler.tags = ['config'];
handler.command = ['on', 'off'];
handler.admin = true;
// handler.botAdmin = true;

export default handler;
