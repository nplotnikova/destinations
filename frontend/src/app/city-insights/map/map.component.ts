import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

import { GoogleMapService } from '@providers/google-map.service';

import { filter, finalize, Observable, Subject, zip } from 'rxjs';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {

    private readonly ZOOM = 12;
    private readonly MIN_ZOOM = 10;
    private readonly MAX_ZOOM = 16;

    @ViewChild(MapInfoWindow)
    public infoWindow!: MapInfoWindow;

    @Input() public lat!: number;
    @Input() public lng!: number;
    @Input() public landmarks!: string[];

    public options!: google.maps.MapOptions;
    public markers$!: Observable<google.maps.MarkerOptions[]>;
    public infoWindowText: string = '';

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
        const placesService = new google.maps.places.PlacesService(mapRef);
        const markers$: Observable<google.maps.MarkerOptions>[] = this.landmarks
            .filter(Boolean)
            .map(landmarkName => this.getMarker(placesService, landmarkName));

        this.markers$ = zip(markers$).pipe(
            filter(Boolean),
            finalize(() => this._cdr.detectChanges()),
        );
    }

    public showMarkerInfo(mapMarker: MapMarker): void {
        this.infoWindowText = mapMarker.marker?.getTitle() || 'N/A';
        this.infoWindow.open(mapMarker);
    }

    private createMarker = (place: google.maps.places.PlaceResult): google.maps.MarkerOptions => {
        return <google.maps.MarkerOptions>{
            position: {
                lat: place?.geometry?.location?.lat(),
                lng: place?.geometry?.location?.lng(),
            },
            title: `<span class="title">${place.name}</span><div class="address">${place.formatted_address}</div>`,
            animation: google.maps.Animation.DROP,
        };
    };

    private getMarker(placesService: google.maps.places.PlacesService, landmarkName: string): Subject<google.maps.MarkerOptions> {
        const marker$ = new Subject<google.maps.MarkerOptions>();

        placesService.textSearch(
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
