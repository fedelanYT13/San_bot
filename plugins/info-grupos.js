let handler = async (m, { conn}) => {
    // 📇 Tarjeta de contacto (vCard)
    const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;Marck Uwu;;;
FN:Marck Uwu
item1.TEL;waid=13135550002:+1 (313) 555-0002
item1.X-ABLabel:Celular
END:VCARD`;

    // 💬 Mensaje de contacto simulado para citar
    const quotedContact = {
        key: {
            fromMe: false,
            participant: "13135550002@s.whatsapp.net",
            remoteJid: "status@broadcast",
},
        message: {
            contactMessage: {
                displayName: "Meta Ai",
                vcard,
},
},
};

    // 📤 Enviar mensaje con imagen, botones y pie de página
    await conn.sendMessage(
        m.chat,
        {
            image: { url: "https://files.catbox.moe/gm249p.jpg"},
            caption:
                "🍙 *Proyecto Script Marck* 🍙\n" +
                "📢 *¡Bienvenido al universo de Nagi!*\n" +
                "🔗 Aquí tienes enlaces útiles para unirte, seguirnos y contactarnos directamente.\n" +
                "✨ *Gracias por formar parte de esta comunidad!*",
            title: "🌟 Nagi — Bot de WhatsApp",
            subtitle: "",
            footer: "*© 𝑴𝒂𝒅𝒆 𝒃𝒚 𝑫𝒆𝒗-𝒇𝒆𝒅𝒆𝒙𝒚𝒛*\n*Todos los derechos reservados*",
            interactiveButtons: [
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "👥 Grupo oficial",
                        url: "https://chat.whatsapp.com/LTOMyo9JqQEGYpSHm2hVT7",
                        merchant_url: "https://chat.whatsapp.com/LTOMyo9JqQEGYpSHm2hVT7",
}),
},
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "📺 Canal oficial",
                        url: "https://whatsapp.com/channel/0029Vb6EMjb6GcGKmVITlG2p",
                        merchant_url: "https://whatsapp.com/channel/0029Vb6EMjb6GcGKmVITlG2p",
}),
},
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "📞 Contacto directo",
                        url: "https://wa.me/5491156178758",
                        merchant_url: "https://wa.me/5491156178758",
}),
},
            ],
            hasMediaAttachment: true,
},
        { quoted: quotedContact}
);
};

handler.help = ["links", "grupos"];
handler.tags = ["info"];
handler.command = ["links", "grupos"];

export default handler;
