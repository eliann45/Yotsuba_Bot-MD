/**
© ZENITH
ᘎ https://whatsapp.com/channel/0029Vai9MMj5vKABWrYzIJ2Z
*/

import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, args }) => {
  try {
    const query = args.join(" ") || m.quoted?.text || m.quoted?.caption || m.quoted?.description || "";
    if (!query.trim()) return m.reply("Por favor, ingresa una palabra clave para buscar.");

    await m.reply("Buscando, por favor espera...");

    const res = await yts(query);
    const vid = res.videos[0];
    if (!vid) return m.reply("No se encontró ningún video. Prueba con otra palabra clave.");

    const { title, thumbnail, timestamp, views, ago, url } = vid;
    const formattedViews = parseInt(views).toLocaleString("id-ID") + " vistas";
    const captvid = `*Título:* ${title}\n*Duración:* ${timestamp}\n*Vistas:* ${formattedViews}\n*Subido hace:* ${ago}\n*Enlace:* ${url}`;

    // Descargar la miniatura del video
    const ytthumb = (await conn.getFile(thumbnail))?.data;

    const infoReply = {
      contextInfo: {
        externalAdReply: {
          body: "Descargando el video, por favor espera...",
          mediaType: 1,
          mediaUrl: url,
          previewType: 0,
          renderLargerThumbnail: true,
          sourceUrl: url,
          thumbnail: ytthumb,
          title: "Y O U T U B E - V I D E O",
        },
      },
    };

    await conn.reply(m.chat, captvid, m, infoReply);

    // Realizar la solicitud al API de descarga
    const apiRes = await fetch(`https://apis-starlights-team.koyeb.app/starlight/youtube-mp4?url=${url}`);
    const json = await apiRes.json();

    if (json.success) {
      const { video } = json.result;

      await conn.sendMessage(
        m.chat,
        {
          video: { url: video.url },
          caption: `*Título:* ${title}\n*Resolución:* ${video.resolution}\n*Tamaño del archivo:* ${video.size}`,
          mimetype: "video/mp4",
          contextInfo: infoReply.contextInfo,
        },
        { quoted: m }
      );
    } else {
      await m.reply("No se pudo descargar el video. Intenta nuevamente.");
    }
  } catch (e) {
    console.error(e);
    await m.reply("Ocurrió un error al procesar tu solicitud. Intenta nuevamente.");
  }
};

handler.help = ["play2 <término de búsqueda>"];
handler.tags = ["downloader"];
handler.command = /^(play2|ytplay2)$/i;
handler.limit = true;

export default handler;
