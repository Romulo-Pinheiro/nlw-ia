import ytdl from 'ytdl-core'
import fs from 'fs'

export const download = (videoId) => {
  const videoUrl = "https://www.youtube.com/shorts/" + videoId
  console.log("Downloading video: " + videoId)

  ytdl(videoUrl, {quality: "lowestaudio", filter:"audioonly"}).on("info", (info) => {
    const seconds = info.formats[0].approxDurationMs / 1000
    if(seconds > 60){
      throw new Error("The duration of this video is longer than 60 seconds.")
    }

  }).on("end", () =>{
    console.log("Video download just finished.")
  }).on("error", (error) => {
    console.log("Couldn't download video. Details:", error)
  }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
}