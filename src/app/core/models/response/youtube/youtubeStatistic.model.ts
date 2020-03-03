import IYoutubeVideoModel from './youtubeVideo.model';

export default interface IYoutubeStatisticModel {
    kind: string;
    etag: string;
    nextPageToken: string;
    regionCode: string;
    items: Array<IYoutubeVideoModel>;
}
