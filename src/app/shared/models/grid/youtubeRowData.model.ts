export default class YoutubeRowDataModel {
    constructor(
        thumbnails: string,
        publishedAt: string,
        title: string,
        description: string
    ) {
        this.thumbnails = thumbnails;
        this.publishedAt = publishedAt;
        this.title = title;
        this.description = description;
    }

    thumbnails: string;
    publishedAt: string;
    title: string;
    description: string;
}
