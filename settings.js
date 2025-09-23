import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"

global.botNumber = ""

global.owner = ["5491156178758", "5491137612743"]

global.botname = '🕸 SakuraBot-MD'
global.namebot = '🥗 Sakura Bot'
global.bot = 'SakuraBot'
global.packname = '🐸 𝗦𝗮𝗸𝘂𝗿𝗮𝗕𝗼𝘁-𝗠𝗗'
global.wm = '🌿 𝙎𝙖𝙠𝙪𝙧𝙖𝘽𝙤𝙩-𝙈𝘿'
global.author = '🥗 DevAlexJs'
global.dev = '© Pᴏᴡᴇʀᴇᴅ Bʏ DᴇᴠAʟᴇxJs.'

global.banner = 'https://stellarwa.xyz/files/1757377941018.jpeg'
global.icon = 'https://stellarwa.xyz/files/1757378468505.jpeg'
global.currency = 'CryptoCoins'
global.sessions = 'sessions/session-bot'
global.jadi = 'sessions/session-sub'

global.api = { 
url: 'https://api.stellarwa.xyz',
key: 'Diamond'
}

global.my = {
  ch: '120363423335018677@newsletter',
  name: '🌘 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 ☽',

  ch2: '120363423335018677@newsletter',
  name3: '🌘 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 ☽'
}

const file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright(`Update "${file}"`))
  import(`${file}?update=${Date.now()}`)
})
