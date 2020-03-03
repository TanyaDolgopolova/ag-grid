import IVideoIdModel from './videoId.model';
import ISnippetModel from './snippet.model';

export default interface IYoutubeVideoModel {
    kind: string;
    etag: string;
    id: IVideoIdModel;
    snippet: ISnippetModel;
}
