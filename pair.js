import makeWASocket, { 
  useMultiFileAuthState, 
  fetchLatestBaileysVersion 
} from "@whiskeysockets/baileys";

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false
  });

  // ⚠️ PON TU NÚMERO AQUÍ SIN + NI ESPACIOS
  const number = "8299657068"; 

  const code = await sock.requestPairingCode(number);
  console.log("🔑 Tu código de vinculación es: " + code);

  sock.ev.on("creds.update", saveCreds);
}

start();
