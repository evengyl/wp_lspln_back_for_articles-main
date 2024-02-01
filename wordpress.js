import axios from "axios";
import * as fs from 'fs';
import * as path from 'path';


export class Wordpress{
    
    url
    headers

    constructor(wpConfig) {
        // Store the URL from the wpConfig object
        this.url = wpConfig.url;
        
        // Create the headers object with the authorization and content-type headers
        this.headers = {
          Authorization: "Basic " + Buffer.from(`${wpConfig.username}:${wpConfig.password}`).toString('base64'),
          "Content-Type": "application/json",
        };
    }


    // createPost method for creating a new post
    async createPost(post)
    {
        try {
            const response = await axios.post(`${this.url}/wp-json/wp/v2/posts`, 
                post, 
                { headers: this.headers }
            );
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error(`Error while creating post: ${error}`);
        }
    }

    async createTagsKeyWord(stringTagBrut){
        let newArrayTagForWP = stringTagBrut.split(',').map(tag => ({ name: tag.trim() }));
        let arrayIdKeyTags = []
        try {
            newArrayTagForWP.forEach(async (tag) => {

                let response = await axios.post(`${this.url}/wp-json/wp/v2/tags`, 
                    tag, 
                    { headers: this.headers }
                ).catch((err) => {
                })

                if(response != undefined)
                    arrayIdKeyTags.push(response.data.id)
            })

            return arrayIdKeyTags
        } catch (error) {
            throw new Error(`Error while updating post: ${error}`);
        }
    }

    async updatePost(idPost, post)
    {
        try {
            const response = await axios.post(`${this.url}/wp-json/wp/v2/posts/${idPost}`, 
                post, 
                { headers: this.headers }
            );
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error(`Error while updating post: ${error}`);
        }
    }

    async getAllCateg()
    {
        try {
            const response = await axios.get(`${this.url}/wp-json/wp/v2/categories?hide_empty=false&per_page=100`);
            return response.data
        } catch (error) {
            console.log(error)
            throw new Error(`Error while get taxonomies: ${error}`);
        }
    }


    async getOnePost(id){
        try {
            const response = await axios.get(`${this.url}/wp-json/wp/v2/posts/${id}`,
            { headers: this.headers });

            return response.data

        } catch (error) {
            console.log(error)
            throw new Error(`Error while get one post: ${error}`);
        }
    }


    async getAllBlockCompo()
    {
        try {
            const response = await axios.get(`${this.url}/wp-json/wp/v2/blocks`,
            { headers: this.headers });

            return response.data

        } catch (error) {
            console.log(error)
            throw new Error(`Error while get al block composition: ${error}`);
        }
    }


    async getBlockArticleV3Compo(id)
    {
        try {
            const response = await axios.get(`${this.url}/wp-json/wp/v2/blocks/${id}`,
            { headers: this.headers });

            return response.data

        } catch (error) {
            console.log(error)
            throw new Error(`Error while get al block composition: ${error}`);
        }
    }

    async getAllPost(){
        try {
            const response = await axios.get(`${this.url}/wp-json/wp/v2/posts?per_page=1`);
            
            return response.data
        } catch (error) {
            console.log(error)
            throw new Error(`Error while get all post: ${error}`);
        }
    }


    async getBloks()
    {
        try {
            const response = await axios.get(`${this.url}/wp-json/wp/v2/block-renderer?name=Articles Vidéos Beta 2.0`,
                { headers: this.headers }
            );

            return response.data
        } catch (error) {
            console.log(error)
            throw new Error(`Error while get one post: ${error}`);
        }
    }


    
}

