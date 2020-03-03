import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import IYoutubeStatisticModel from '../models/response/youtube/youtubeStatistic.model';

@Injectable()
export class YoutubeService {
    constructor(private readonly http: HttpClient) {}

    public getYoutubeVideoData(): Observable<IYoutubeStatisticModel> {
        return this.http.get<IYoutubeStatisticModel>(environment.youtubeApiUrl);
    }
}
