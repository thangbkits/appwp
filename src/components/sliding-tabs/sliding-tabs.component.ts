import { ApplicationRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { ConfigService } from 'src/providers/config/config.service';
import { LoadingService } from 'src/providers/loading/loading.service';
import { Router } from "@angular/router";


@Component({
    selector: 'app-sliding-tabs',
    templateUrl: './sliding-tabs.component.html',
    styleUrls: ['./sliding-tabs.component.scss'],
})
export class SlidingTabsComponent implements OnInit {
    @ViewChild(IonInfiniteScroll, { static: false }) infinite: IonInfiniteScroll;

    @Input('type') type;//product data
    products: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    products23: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    products22: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    selected = '0';
    page = 1;
    count = 0;
    loadingServerData = false;
    sliderConfig = {
        slidesPerView: this.config.productSlidesPerPage,
        spaceBetween: 0
    }

    constructor(
        public router: Router,
        public shared: SharedDataService,
        public config: ConfigService,
        public loading: LoadingService,
        private applicationRef: ApplicationRef
    ) {

    }

    getProducts(infiniteScroll) {
        if (this.loadingServerData) return 0;
        if (this.page == 1) {

            this.count++;
            this.loadingServerData = false;
        }
        this.loadingServerData = true;
        let query = 'products?' + 'page=' + this.page;
        if (this.selected != '0')
            query = 'products?category=' + this.selected + '&page=' + this.page;
        query = query + "&status=publish" + "&" + this.config.productsArguments
        if (this.page == 1) {
            this.products = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        }
        console.log(query, 'qurerry');
        this.config.getWoo(query).then((data: any) => {

            let dat = data

            this.infinite.complete();
            if (this.page == 1) {
                this.products = new Array;
            }
            if (dat.length != 0) {
                this.page++;
                for (let value of dat) {
                    this.products.push(value);
                }
            }
            console.log(data, 'this.products');
            if (dat.length < 10) {
                this.infinite.disabled = true;
            }
            this.loadingServerData = false;
            this.applicationRef.tick();
        });
    }

    //changing tab
    changeTab(c) {
        this.infinite.disabled = false;
        this.page = 1;
        if (c == '0') this.selected = c
        else this.selected = c.id;
        this.getProducts(null);
        //this.loading.autoHide(700);
    }


    ngOnInit() {
        // this.getProducts(null);
        // let quer = 'products?' + 'page=' + this.page;
        // quer = 'products?category=' + 23 + '&page=' + this.page;
        // quer = quer + "&status=publish" + "&" + this.config.productsArguments
        // if (this.page == 1) {
        //     this.products23 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        // }
        // console.log(quer, 'qurerry');
        // this.config.getWoo(quer).then((datar: any) => {
        //     let datr = datar
        //     if (this.page == 1) {
        //         this.products23 = new Array;
        //     }
        //     if (datr.length != 0) {
        //         this.page++;
        //         for (let valur of datr) {
        //             this.products23.push(valur);
        //         }
        //     }
        //     this.loadingServerData = false;
        //     console.log(datar, 'this.products23');
        // });
        this.getprBantra();
        this.getprGhean();
        this.config.getOptions().then(res => {
            console.log(res, 'Acf options');
        }, err => {
            console.log(err);
        });
    }

    getprBantra() {
        let quertra = 'products?' + 'page=' + this.page;
        quertra = 'products?category=' + 22 + '&page=' + this.page;
        quertra = quertra + "&status=publish" + "&" + this.config.productsArguments
        if (this.page == 1) {
            this.products22 = [];
        }
        console.log(quertra, 'qurerry');
        this.config.getWoo(quertra).then((datrs: any) => {
            let datra = datrs;
            if (this.page == 1) {
                this.products22 = new Array;
            }
            if (datra.length != 0) {
                this.page++;
                for (let valur of datra) {
                    this.products22.push(valur);
                }
            }
            // this.loadingServerData = false;
            console.log(datrs, 'this.products22');
        });
    }
    getprGhean() {
        let quer = 'products?' + 'page=' + this.page;
        quer = 'products?category=' + 23 + '&page=' + this.page;
        quer = quer + "&status=publish" + "&" + this.config.productsArguments
        if (this.page == 1) {
            this.products23 = [];
        }
        console.log(quer, 'qurerry');
        this.config.getWoo(quer).then((datar: any) => {
            let datr = datar
            if (this.page == 1) {
                this.products23 = new Array;
            }
            if (datr.length != 0) {
                this.page++;
                for (let valur2 of datr) {
                    this.products23.push(valur2);
                }
            }
            // this.loadingServerData = false;
            console.log(datar, 'this.products23');
        });
    }

    goCate(id) {
        // name = this.products23.name;
        this.router.navigateByUrl("tabs/categories/products/" + id + "/" + this.products23.name + "/newest");
    }

    goCate22(id) {
        // name = this.products22.name;
        this.router.navigateByUrl("tabs/categories/products/" + id + "/" + this.products23.name + "/newest");
    }
}
