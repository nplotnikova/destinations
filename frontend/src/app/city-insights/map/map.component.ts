import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { GoogleMapService } from '@providers/google-map.service';

import { filter, finalize, Observable, Subject, zip } from 'rxjs';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {

    private readonly ZOOM = 12;
    private readonly MIN_ZOOM = 10;
    private readonly MAX_ZOOM = 16;

    @Input() public lat!: number;
    @Input() public lng!: number;
    @Input() public landmarks!: string[];

    public options!: google.maps.MapOptions;
    public markers$!: Observable<google.maps.MarkerOptions[]>;

    constructor(public googleMapService: GoogleMapService,
                private _cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.options = {
            scrollwheel: false,
            disableDoubleClickZoom: true,
            center: { lat: this.lat || 0, lng: this.lng || 0 },
            zoom: this.ZOOM,
            maxZoom: this.MAX_ZOOM,
            minZoom: this.MIN_ZOOM,
        };
    }

    public addMarkers(mapRef: google.maps.Map): void {
        if (!this.landmarks?.length) {
            return;
        }

        const markers$: Observable<google.maps.MarkerOptions>[] = this.landmarks
            .filter(Boolean)
            .map(landmarkName => this.getMarker(mapRef, landmarkName));

        this.markers$ = zip(markers$).pipe(
            filter(Boolean),
            finalize(() => this._cdr.detectChanges()),
        );
    }

    private createMarker = (place: google.maps.places.PlaceResult): google.maps.MarkerOptions => {
        return <google.maps.MarkerOptions>{
            position: {
                lat: place?.geometry?.location?.lat(),
                lng: place?.geometry?.location?.lng(),
            },
            label: {
                className: 'fw-bold bg-white',
                text: place.name,
            },
            animation: google.maps.Animation.DROP,
        };
    };

    private getMarker(map: google.maps.Map, landmarkName: string): Subject<google.maps.MarkerOptions> {
        const marker$ = new Subject<google.maps.MarkerOptions>();

        (new google.maps.places.PlacesService(map)).textSearch(
            { query: landmarkName },
            (
                places: google.maps.places.PlaceResult[] | null,
                status: google.maps.places.PlacesServiceStatus,
            ) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && places?.length) {
                    marker$.next(this.createMarker(places[0]));
                }
                marker$.complete();
            });

        return marker$;
    }
}
