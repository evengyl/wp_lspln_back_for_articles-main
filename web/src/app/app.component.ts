import { Component } from '@angular/core';
import { YoutubeService } from './youtube.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {

	urlYoutube : string = "https://www.youtube.com/watch?v=iQLfyx0-v84"


	channelName : string = ""
    nameVideo : string = ""
    listKeyWords : string = ""
    idVideo : string = ""
    description : string = ""

	constructor(private ytServe: YoutubeService) {
	}


	async init() {
		await this.ytServe.getAllHtmlVideo(this.urlYoutube)

		this.channelName = this.ytServe.channelName
		this.nameVideo = this.ytServe.nameVideo
		this.listKeyWords = this.ytServe.listKeyWords
		this.idVideo = this.ytServe.idVideo
		this.description = this.ytServe.description
	}
}
