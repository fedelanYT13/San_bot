import { WAMessageStubType} from '@whiskeysockets/baileys';

export async function before(m, { conn, participants, groupMetadata}) {
  if (!m.messageStubType ||!m.isGroup) return true;

  const chat = globalThis.db.data.chats[m.chat];
  const nombre = globalThis.db.data.users[m.messageStubParameters[0]]?.name || {};
  const botId = conn.user.jid;

  const ppUrl = await conn.profilePictureUrl(m.messageStubParameters[0], 'image')
.catch(() => "https://files.catbox.moe/gm249p.jpg");

  const name = nombre || conn.getName(m.messageStubParameters[0]);
  const actionUser = m.key.participant? await conn.getName(m.key.participant): null;

  const actionMessages = {
    [WAMessageStubType.GROUP_PARTICIPANT_ADD]: actionUser? `\n┊➤ *Agregado por ›* @${m.key.participant.split`@`[0]}`: '',
    [WAMessageStubType.GROUP_PARTICIPANT_REMOVE]: actionUser? `\n┊➤ *Eliminado por ›* @${m.key.participant.split`@`[0]}`: '',
    [WAMessageStubType.GROUP_PARTICIPANT_LEAVE]: ''
};

  const userss = m.messageStubParameters[0];
  const formatText = (template, memberCount) => {
    return template
.replace('@user', `@${userss.split`@`[0]}`)
.replace('@group', groupMetadata.subject)
.replace('@date', new Date().toLocaleString())
.replace('@users', `${memberCount}`)
.replace('@type', actionMessages[m.messageStubType])
.replace('@desc', groupMetadata.desc?.toString() || '☕ Sin Desc 🍁');
};

  let memberCount = participants.length;
  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) memberCount += 1;
  else if ([WAMessageStubType.GROUP_PARTICIPANT_REMOVE, WAMessageStubType.GROUP_PARTICIPANT_LEAVE].includes(m.messageStubType)) memberCount -= 1;

  const welcomeMessage = formatText(chat.sWelcome || `╭───⌁ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 𝑾𝑨 ⌁───╮
│ 「 𝑩𝒊𝒆𝒏𝒗𝒆𝒏𝒊𝒅𝒐 𝒂𝒍 𝒈𝒓𝒖𝒑𝒐 」
│─────────────────────
│ 🧸 𝑵𝒐𝒎𝒃𝒓𝒆 › @user
│ 🏷️ 𝑮𝒓𝒖𝒑𝒐 › @group
│ @type
│📌 𝑼𝒔𝒂 /menu 𝒑𝒂𝒓𝒂 𝒗𝒆𝒓 𝒍𝒐𝒔 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔.
│👥 𝑨𝒉𝒐𝒓𝒂 𝒔𝒐𝒎𝒐𝒔 @users 𝒎𝒊𝒆𝒎𝒃𝒓𝒐𝒔.
╰─────────────────────╯`, memberCount);

  const byeMessage = formatText(chat.sBye || `╭───⌁ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 𝑾𝑨 ⌁───╮
│ 「 𝑯𝒂𝒔𝒕𝒂 𝒑𝒓𝒐𝒏𝒕𝒐 」
│─────────────────────
│ 🧸 𝑵𝒐𝒎𝒃𝒓𝒆 › @user
│ @type
│💭 𝑶𝒋𝒂𝒍𝒂 𝒗𝒖𝒆𝒍𝒗𝒂 𝒑𝒓𝒐𝒏𝒕𝒐.
│👥 𝑨𝒉𝒐𝒓𝒂 𝒒𝒖𝒆𝒅𝒂𝒏 @users 𝒎𝒊𝒆𝒎𝒃𝒓𝒐𝒔.
╰─────────────────────╯`, memberCount);

  const leaveMessage = formatText(chat.sBye || byeMessage, memberCount);
  const mentions = [userss, m.key.participant];

  const fakeContext = {
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
},
      mentionedJid: mentions
}
};

  if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    let caption = welcomeMessage;
    await conn.sendMessage(m.chat, { image: { url: ppUrl}, caption,...fakeContext});
}

  if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
    let caption = byeMessage;
    await conn.sendMessage(m.chat, { image: { url: ppUrl}, caption,...fakeContext});
}

  if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
    let caption = welcomeMessage;
    await conn.sendMessage(m.chat, { image: { url: ppUrl}, caption,...fakeContext});
}
}
