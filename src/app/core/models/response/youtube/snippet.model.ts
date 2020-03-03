import IThumbnailsModel from './thumbnails.model';

export default interface ISnippetModel {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: IThumbnailsModel;
    channelTitle: string;
    liveBroadcastContent: string;
}
