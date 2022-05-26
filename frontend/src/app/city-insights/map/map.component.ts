import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { GoogleMapService } from '@providers/google-map.service';

import { finalize, map, Observable, Subject, zip } from 'rxjs';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {

    @Input() public lat!: number;
    @Input() public lng!: number;
    @Input() public landmarks!: string[];

    public options!: google.maps.MapOptions;
    public markers$!: Observable<google.maps.MarkerOptions[]>;

    constructor(public googleMapService: GoogleMapService,
                private _cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.options = this._options;
    }

    private get _options(): google.maps.MapOptions {
        return {
            scrollwheel: false,
            disableDoubleClickZoom: true,
            center: { lat: this.lat || 0, lng: this.lng || 0 },
            zoom: 12,
            tilt: 45,
            maxZoom: 16,
            minZoom: 10,
        };
    }

    public addMarkers(mapRef: google.maps.Map): void {
        if (!this.landmarks?.length) {
            return;
        }

        const landmarks$: Observable<google.maps.MarkerOptions>[] = this.landmarks
            .filter(Boolean)
            .map(landmarkName => this.getMarker(mapRef, landmarkName));

        this.markers$ = zip(landmarks$).pipe(
            finalize(() => this._cdr.detectChanges()),
            map(markers => markers.filter(Boolean)),
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
        const landmark$ = new Subject<google.maps.MarkerOptions>();

        (new google.maps.places.PlacesService(map)).textSearch(
            { query: landmarkName },
            (
                places: google.maps.places.PlaceResult[] | null,
                status: google.maps.places.PlacesServiceStatus,
            ) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && places?.length) {
                    landmark$.next(this.createMarker(places[0]));
                }

                landmark$.complete();
            });

        return landmark$;
    }
}
