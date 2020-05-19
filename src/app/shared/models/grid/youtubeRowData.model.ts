export default class YoutubeRowDataModel {
    constructor(
        thumbnails: string,
        publishedAt: string,
        title: string,
        description: string,
        checkbox: boolean
    ) {
        this.thumbnails = thumbnails;
        this.publishedAt = publishedAt;
        this.title = title;
        this.description = description;
        this.checkbox = checkbox;
    }

    thumbnails: string;
    publishedAt: string;
    title: string;
    description: string;
    checkbox: boolean;
}
