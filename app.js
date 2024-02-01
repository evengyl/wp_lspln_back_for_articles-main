import dotenv from 'dotenv'
dotenv.config()

import { Wordpress } from './wordpress.js' 
import { YouTubeParser } from './youtube.js'
import * as fs from 'fs';
import * as path from 'path';

  const ytp = new YouTubeParser()
  //await ytp.getAllHtmlVideo("https://www.youtube.com/watch?v=3MJJvXGuDag")



// Define configuration for connecting to the WordPress API
const wpCofig = {
    url: 'https://www.lasciencepourlesnuls.fr',
    username: 'baudouxloic@gmail.com',
    password: process.env.WP_KEY
}

// Create an instance of the WordPress class
const wp = new Wordpress(wpCofig)



//#############################################################
//#############################################################
//#############################################################


//Get composition V3 article
let blockArticleV3Compo = await wp.getBlockArticleV3Compo(1453)
//console.log(blockArticleV3Compo)

//ok création article sur base du block
//#############################################################
//Define a new post object
const post = {
  title: 'test article v3 par API JS',
  content : blockArticleV3Compo.content.raw,
  status: 'draft',

}

//Call the createPost method from the WordPress instance and log the result
let newArticleWithCompoV3 = await wp.createPost(post) 


let channelName = fs.readFileSync(path.join("", "./datasYoutube/channelName")).toString()
let nameVideo = fs.readFileSync(path.join("", "./datasYoutube/nameVideo")).toString()
let listKeyWords = fs.readFileSync(path.join("", "./datasYoutube/listKeyWords")).toString()
let idVideo = fs.readFileSync(path.join("", "./datasYoutube/idVideo")).toString()
let description = fs.readFileSync(path.join("", "./datasYoutube/description")).toString()


let allCateg = await wp.getAllCateg()
console.log(allCateg.map(category => category.id))


//il faut créer les nouveaux tag pour pouvoir les ajouter à la listes de l'article car il travaille avec les ID des tags
  let resultCreateNewTag = await wp.createTagsKeyWord(listKeyWords)

// let resultUpdate = await wp.updatePost(newArticleWithCompoV3.id, {
//   title : "Bonjour jne suis un update test",
//   categories : [
//     2, 3
//   ],
//   tags : resultCreateNewTag,
//   excerpt : "test",
//   slug : "test"
// })
// console.log(resultUpdate)
// #############################################################
// #############################################################
// #############################################################





