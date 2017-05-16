import { GeoService, ToastService } from "../../../../core/services";
import { IAuthProvider } from "../../../../core/providers";
import { Contribution } from "../../../../core/entities";

export class TrafficMap {
    static $inject = ["NgMap", "$mdToast", "CoreConstants", "GeoService", "AuthProvider", "$q", "$scope", "ToastService"];
    private zoom: number;
    private center: google.maps.LatLng;
    private defaultZoom: number = 10;
    private preparedDirection: any;
    constructor(private NgMap,
        private $mdToast: ng.material.IToastService,
        private CoreConstants,
        private GeoService: GeoService,
        private AuthProvider: IAuthProvider,
        private $q: ng.IQService,
        private $scope: ng.IScope,
        private ToastService: ToastService) {
        this.setWatchers();
    }

    private setWatchers() {
        this.$scope.$watch("TrafficMap.center", (val: google.maps.LatLng) => this.backToCenter(val));
        this.$scope.$watch("TrafficMap.direction", (val: Contribution) => {
            if (val) {
                this.prepareDirection(val)
            } else {
                return;
            }
        });
        this.$scope.$watch("TrafficMap.zoom", (val: number) => this.backToZoom(val));
    }

    private getCurrentCoordinates(): google.maps.LatLng {
        return this.AuthProvider.currentUser.location.location;
    }

    private setCenter(pos: google.maps.LatLng): void {
        this.NgMap.getMap().then((map) => {
            this.backToCenter(pos);
            this.backToZoom(this.zoom || this.defaultZoom);
        })
    }

    private backToCenter(center: google.maps.LatLng) {
        if (center) {
            this.NgMap.getMap().then((map) => {
                map.setCenter(center);
            })
        } else {
            this.ToastService.showSimple("Please set your current coordinates first");
        }
    }

    private backToZoom(zoom: number) {
        this.NgMap.getMap().then((map) => {
            map.setZoom(zoom || this.defaultZoom);
        })
    }

    private prepareDirection(direction: Contribution) {
        this.preparedDirection = {
            origin: `${direction.startPoint.lat()}, ${direction.startPoint.lng()}`,
            destination: `${direction.endPoint.lat()}, ${direction.endPoint.lng()}`,
            waypoints: direction.additional.map((additional) => {
                return {
                    location: { lat: additional.lat, lng: additional.lng }, stopover: true,
                };
            })
        };
    }

    private findAdministrativeArea(areas: any[]) {
        return areas.filter((area) => {
            return area.types.indexOf("administrative_area_level_1") != -1;
        });
    }
}