import axios from "axios";
import * as fs from 'fs';
import * as path from 'path';


export class YouTubeParser
{
    async getAllHtmlVideo(url)
    {

        try {

            const URL = url

            const response = await axios.get(URL)
            //console.log(response.data)
            
            let parsing = response.data



            //#########################################################################
            let channelName = ""
            let regex = /<link[^>]*\bitemprop="name"[^>]*\bcontent="([^"]*)"[^>]*>/i
            let match = parsing.match(regex)

            if (match)
                channelName = match[1]
            //#########################################################################


            //#########################################################################
            let nameVideo = ""
            regex = /<title>(.*?)<\/title>/i
            match = parsing.match(regex)

            if (match)
                nameVideo = new String(match[1]).replace(" - YouTube", "")
            //#########################################################################


            //#########################################################################
            let listKeyWords = ""
            regex = /<meta\s+name="keywords"\s+content="([^"]*)"/i;
            match = parsing.match(regex);

            if(match)
                listKeyWords = match[1].split(',').map(keyword => keyword.trim());
            //#########################################################################


            //#########################################################################
            let description = ""
            regex = /"shortDescription":"(.*?)","isCrawlable":true,"thumbnail":{"thumbnails"/s;
            match = parsing.match(regex);

            if(match)
                description = match[1]

            description = description.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ''); // Supprimer tous les caractères de contrôle
            description = description.replace(/\\n/g, '<br>'); // Remplacer les sauts de ligne par <br>

            //#########################################################################



            //#########################################################################
            let idVideo = ""
            regex = /(?:\?|&)v=([^&]+)/i;
            match = URL.match(regex);

            if(match)
                idVideo = match[1]
            //#########################################################################

            fs.writeFileSync(path.join("", "./datasYoutube/channelName"), channelName)
            fs.writeFileSync(path.join("", "./datasYoutube/nameVideo"), nameVideo)
            fs.writeFileSync(path.join("", "./datasYoutube/listKeyWords"), listKeyWords.join(", "))
            fs.writeFileSync(path.join("", "./datasYoutube/idVideo"), idVideo)
            fs.writeFileSync(path.join("", "./datasYoutube/description"), description)

        } catch (error) {
            console.log(error)
            throw new Error(`Error while get video on youtube: ${error}`)
        }

        
    }


    
}