import { TestBed } from '@angular/core/testing';
import { environment } from 'environments/environment';
import { YoutubeService } from './youtube.service';
import { HttpClientModule } from '@angular/common/http';
import IYoutubeStatisticModel from '../models/response/youtube/youtubeStatistic.model';
import {
    HttpTestingController,
    HttpClientTestingModule
} from '@angular/common/http/testing';

describe('YoutubeService:', () => {
    let service: YoutubeService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [YoutubeService],
            imports: [HttpClientModule, HttpClientTestingModule]
        });
        service = TestBed.inject(YoutubeService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    describe('#getYoutubeVideoData', () => {
        it('should return an Observable<IYoutubeStatisticModel>', () => {
            const dummyPosts: IYoutubeStatisticModel = {
                kind: 'youtube#searchListResponse',
                etag:
                    '"SJZWTG6xR0eGuCOh2bX6w3s4F94/PvHIGgq1P8ipHYcLGerqlqUXA9A"',
                nextPageToken: 'CDIQAA',
                regionCode: 'UA',
                items: [
                    {
                        kind: 'youtube#searchResult',
                        etag:
                            '"SJZWTG6xR0eGuCOh2bX6w3s4F94/Oar34kCWOYeFPKlDqN5CXBejNQg"',
                        id: {
                            kind: 'youtube#video',
                            videoId: 'c09m5f7Gnic'
                        },
                        snippet: {
                            publishedAt: '2020-03-02T07:30:02.000Z',
                            channelId: 'UC3XTzVzaHQEd30rQbuvCtTQ',
                            title:
                                'Coronavirus: Last Week Tonight with John Oliver (HBO)',
                            description:
                                "As coronavirus spreads to the US, John Oliver discusses what's being done to fight the illness, what's gone wrong, and how to stay safe. Connect with Last Week ...",
                            thumbnails: {
                                default: {
                                    url:
                                        'https://i.ytimg.com/vi/c09m5f7Gnic/default.jpg',
                                    width: 120,
                                    height: 90
                                },
                                medium: {
                                    url:
                                        'https://i.ytimg.com/vi/c09m5f7Gnic/mqdefault.jpg',
                                    width: 320,
                                    height: 180
                                },
                                high: {
                                    url:
                                        'https://i.ytimg.com/vi/c09m5f7Gnic/hqdefault.jpg',
                                    width: 480,
                                    height: 360
                                }
                            },
                            channelTitle: 'LastWeekTonight',
                            liveBroadcastContent: 'none'
                        }
                    }
                ]
            };

            service.getYoutubeVideoData().subscribe(data => {
                expect(data.items.length).toBe(1);
                expect(data).toEqual(dummyPosts);
            });

            const req = httpMock.expectOne(environment.youtubeApiUrl);
            expect(req.request.method).toBe('GET');
            req.flush(dummyPosts);
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
