let handler = async (m, { conn, text }) => {

let user = global.db.data.users[m.sender]

user.registered = false

let txt = `\`REGISTRO ANULADO\`\n\n👤 User: ${m.pushName || 'Anónimo'}\n🌍 Pais: ${global.userNationality}\n🍄 Bot: 𝙎𝙝𝙞𝙯𝙪𝙠𝙖𝘽𝙤𝙩-𝙈𝘿 ✨️🍁`.trim()
await conn.sendMessage(global.channelid, { text: txt, contextInfo: {
externalAdReply: {
title: "🔔 Notificación General 🔔 ",
body: '🐢 ¡Un usuario anuló su registrado!',
thumbnailUrl: fotoperfil,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })

return conn.reply(m.chat, `🚩 Usted anuló su registro de *YotsubaBot-MD 🌻✨️*\n\n🚩 Puede usar #reg nombre.edad para realizar un nuevo registro`, m, rcanal)

}
handler.help = ['unreg']
handler.tags = ['rg']
handler.command = ['unreg', 'unregister']
handler.register = true
export default handler