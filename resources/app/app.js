var globalApiUrl = 'https://bnpb.alfath.tech/api';
    globalApiUrl = 'api';
var bnpbApp = angular
    .module('bnpbApp', [
        'ui.router',
        // 'ui.bootstrap',
        'ui.mask',
        // 'ui.select',
        'ngSanitize',
        'ngResource',
        // 'ngTable',
        'bnpbApp.controllers',
        'bnpbApp.services',
    ]).run(['$rootScope', '$state', '$stateParams', 'Dashboard', '$http',
        function ($rootScope, $state, $stateParams, Dashboard, $http) {
            $rootScope.pageTitle = "Smart Disaster Mapping with K-Means Clustering";
            $rootScope.pageLogoText = "Smart Disaster Map";

            $rootScope.loading = true;

            $rootScope.isLogin = false;
            $rootScope.loginData = {
                username : 'bnpb_admin',
                password : 'bismillah',
                name : "BNPB - Admin"
            };
            $rootScope.doLogin = function(){
                if($rootScope.login.username==$rootScope.loginData.username&&$rootScope.login.password==$rootScope.loginData.password){
                    alert('Login Berhasil');
                    $rootScope.isLogin = true;
                }else{
                    alert('Login Gagal');
                    $rootScope.isLogin = false;
                }
            }
            $rootScope.doLogout = function(){
                alert('Anda telah logout, Terimakasih');
                $rootScope.isLogin = false;
            }

            $rootScope.detailKejadian = false;

            $rootScope.idKejadian = 0;
            $rootScope.selectedIdProv = 0;
            $rootScope.selectedIdKota = 0;
            $rootScope.selectedTahun = 0;

            window.$root = $rootScope;
            window.$rootScope = $rootScope;

            $rootScope.getFirstKey = function (data) {
                for (var prop in data) {
                    return prop;
                }
            }
            $rootScope.listKota = [
                {
                    id: "3174",
                    nama: "Jakarta Barat"
                },
                {
                    id: "3173",
                    nama: "Jakarta Pusat"
                },
                {
                    id: "3171",
                    nama: "Jakarta Selatan"
                },
                {
                    id: "3172",
                    nama: "Jakarta Timur"
                },
                {
                    id: "3175",
                    nama: "Jakarta Utara"
                }
            ];

            $rootScope.listBencana = [
                {
                    id: 3,
                    bencana: "Banjir"
                }];

            $rootScope.listKecamatan = [
                {
                    id: "3174010",
                    nama: "Kembangan",
                }, {
                    id: "3174020",
                    nama: "Kebon Jeruk",
                },
                {
                    id: "3174030",
                    nama: "Palmerah",
                },
                {
                    id: "3174040",
                    nama: "Grogol Petamburan",
                },
                {
                    id: "3174050",
                    nama: "Tambora",
                },
                {
                    id: "3174060",
                    nama: "Taman Sari",
                },
                {
                    id: "3174070",
                    nama: "Cengkareng",
                },
                {
                    id: "3174080",
                    nama: "Kali Deres",
                },
                {
                    id: "3173010",
                    nama: "Tanah Abang",
                }, {
                    id: "3173020",
                    nama: "Menteng",
                }, {
                    id: "3173030",
                    nama: "Senen",
                }, {
                    id: "3173040",
                    nama: "Johar Baru",
                }, {
                    id: "3173050",
                    nama: "Cempaka Putih",
                }, {
                    id: "3173060",
                    nama: "Kemayoran",
                }, {
                    id: "3173070",
                    nama: "Sawah Besar",
                }, {
                    id: "3173080",
                    nama: "Gambir",
                }, {
                    id: "3171010",
                    nama: "Jagakarsa",
                }, {
                    id: "3171020",
                    nama: "Pasar Minggu",
                }, {
                    id: "3171030",
                    nama: "Cilandak",
                }, {
                    id: "3171040",
                    nama: "Pesanggrahan",
                }, {
                    id: "3171050",
                    nama: "Kebayoran Lama",
                }, {
                    id: "3171060",
                    nama: "Kebayoran Baru",
                }, {
                    id: "3171070",
                    nama: "Mampang Prapatan",
                }, {
                    id: "3171080",
                    nama: "Pancoran",
                }, {
                    id: "3171090",
                    nama: "Tebet",
                }, {
                    id: "3171100",
                    nama: "Setia Budi",
                }, {
                    id: "3172010",
                    nama: "Pasar Rebo",
                }, {
                    id: "3172020",
                    nama: "Ciracas",
                }, {
                    id: "3172030",
                    nama: "Cipayung",
                }, {
                    id: "3172040",
                    nama: "Makasar",
                }, {
                    id: "3172050",
                    nama: "Kramat Jati",
                }, {
                    id: "3172060",
                    nama: "Jatinegara",
                }, {
                    id: "3172070",
                    nama: "Duren Sawit",
                }, {
                    id: "3172080",
                    nama: "Cakung",
                }, {
                    id: "3172090",
                    nama: "Pulo Gadung",
                }, {
                    id: "3172100",
                    nama: "Matraman",
                }, {
                    id: "3175010",
                    nama: "Penjaringan",
                }, {
                    id: "3175020",
                    nama: "Pademangan",
                }, {
                    id: "3175030",
                    nama: "Tanjung Priok",
                }, {
                    id: "3175040",
                    nama: "Koja",
                }, {
                    id: "3175050",
                    nama: "Kelapa Gading",
                }, {
                    id: "3175060",
                    nama: "Cilincing",
                }
            ];

            $rootScope.loadListKejadian = function () {
                Dashboard.list({}, function (data) {
                    $rootScope.listKejadian = data.response;

                    $rootScope.loadDetailKejadian();
                })
            }

            $rootScope.refreshAll = function () {
                $rootScope.loading = true;
                Dashboard.detail({ id: $rootScope.idKejadian }, function (data) {
                    $rootScope.detailKejadian = data.response;

                    $rootScope.selectedIdProv = data.response.lokasi.idProv;
                    $rootScope.selectedIdKota = data.response.lokasi.idKota;

                    $rootScope.selectedTahun = data.response.waktu.mulai.tahun;
                    $rootScope.selectedBulan = data.response.waktu.mulai.bulan;

                    $rootScope.selectedKejadian = data.response.idKejadian;

                    $rootScope.selectProv();

                    $rootScope.listKecamatanKorban = data.response.listKecamatan;

                    $rootScope.renderChart(data.response.chartData, 0);

                    $rootScope.loading = false;

                    if (typeof after == 'function') {
                        after();
                    }
                    $rootScope.loading = false;
                })
            }

            $rootScope.chartCluster = 0;
            $rootScope.renderChart = function(data=[], cluster=0){
                var data = $rootScope.detailKejadian.chartData;
                data[$rootScope.chartCluster].labels.push('');
                new Chartist.Line('.graph-container', {
                      labels: data[$rootScope.chartCluster].labels/*[1, 2, 3, 4, 5, 6, 7, 8]*/,
                      series: data[$rootScope.chartCluster].list/*[
                        {name : 'meninggal' , data : [1, 2, 3, 1, -2, 0, 1, 0] },
                        {name : 'meninggal' , data : [-2, -1, -2, -1, -3, -1, -2, -1] },
                        {name : 'meninggal' , data : [0, 0, 0, 1, 2, 3, 2, 1] },
                        {name : 'meninggal' , data : [3, 2, 1, 0.5, 1, 0, -1, -3] }
                      ]*/
                    }, {
                      // high: data[$rootScope.chartCluster].max,
                      low: 0,
                      fullWidth: true,
                      // As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
                      axisY: {
                        onlyInteger: true,
                        offset: 50
                      },
                      plugins: [
                        Chartist.plugins.legend(),
                        Chartist.plugins.tooltip({
                          currency: ' ',
                          class: 'class1 class2',
                          appendToBody: true
                        })

                      ],
                });
            }

            $rootScope.loadDetailKejadian = function (after) {
                $rootScope.loading = true;
                Dashboard.detail({ id: $rootScope.idKejadian }, function (data) {
                    $rootScope.detailKejadian = data.response;

                    $rootScope.selectedIdProv = data.response.lokasi.idProv;
                    $rootScope.selectedIdKota = data.response.lokasi.idKota;

                    $rootScope.selectedTahun = data.response.waktu.mulai.tahun;
                    $rootScope.selectedBulan = data.response.waktu.mulai.bulan;

                    $rootScope.selectedKejadian = data.response.idKejadian;

                    $rootScope.selectProv();

                    $rootScope.renderChart(data.response.chartData, 0);

                    $rootScope.listKecamatanKorban = data.response.listKecamatan;

                    $rootScope.loading = false;

                    if (typeof after == 'function') {
                        after();
                    }
                })
            }
            $rootScope.init = function () {
                $rootScope.loadListKejadian();
            }

            $rootScope.tambahKorban = function (modalId) {
                var inputTambahKorban = {
                    idKejadian: $root.detailKejadian.idKejadian,
                    idKecamatan: $root.selectedIdKecamatan,
                    meninggal: $root.jml.meninggal,
                    hilang: $root.jml.hilang,
                    luka: $root.jml.luka,
                    terdampak: $root.jml.terdampak,
                    mengungsi: $root.jml.mengungsi,
                }
                console.log(inputTambahKorban);
                var url = globalApiUrl+'/kejadian/korban';
                $http.post(url, inputTambahKorban, null)
                    .then(function mySuccess(response) {
                        console.log(response);
                        $rootScope.clearKorban();
                        $(modalId).modal('hide');
                        alert("Korban berhasil disimpan");
                        $rootScope.refreshAll();
                    }, function myError(response) {
                        console.log(response);
                        $rootScope.clearKorban();
                        $(modalId).modal('hide');
                        alert("Korban gagal disimpan");
                        $rootScope.refreshAll();
                    });


            }

            $rootScope.clearKorban = function () {
                $root.selectedIdKecamatan = null;
                $root.jml.meninggal = null;
                $root.jml.hilang = null;
                $root.jml.luka = null;
                $root.jml.terdampak = null;
                $root.jml.mengungsi = null;
                // setTimeout(function () {
                //     $('#ddlKecamatan').selectpicker('refresh');
                // }, 0);
            }

            $rootScope.tambahKejadian = function (modalId) {
                var inputTambahKejadian = {
                    waktu: $root.tanggalKejadian,
                    idWilayah: $root.selectedIdKota,
                    namaKejadian: $root.nameKejadian,
                }
                console.log(inputTambahKejadian);
                var url = globalApiUrl+'/kejadian/add';
                $http.post(url, inputTambahKejadian, null)
                    .then(function mySuccess(response) {
                        console.log(response);
                        $rootScope.clearKejadian();
                        $(modalId).modal('hide');
                        alert("Kejadian berhasil disimpan");
                        $rootScope.refreshAll();
                    }, function myError(response) {
                        console.log(response);
                        $rootScope.clearKejadian();
                        $(modalId).modal('hide');
                        alert("Kejadian gagal disimpan");
                        $rootScope.refreshAll();
                    });
            }

            $rootScope.clearKejadian = function () {
                $root.tanggalKejadian = null;
                $root.selectedIdProv = null;
                $root.selectedIdKota = null;
                $root.nameKejadian = null;
                $root.selectedBencana = null;
                // setTimeout(function () {
                //     $('#ddlBencana').selectpicker('refresh');
                // }, 0);
            }

            $rootScope.selectProv = function () {
                var idProv = $rootScope.selectedIdProv;
                $rootScope.selectedProv = $rootScope.listKejadian[idProv];

                if (idProv != $rootScope.detailKejadian.lokasi.idProv) {
                    var listKota = $rootScope.selectedProv.listKota;

                    $rootScope.selectedIdKota = $rootScope.getFirstKey(listKota) * 1;
                }

                $rootScope.selectKota();
            }

            $rootScope.selectKota = function () {
                var idKota = $rootScope.selectedIdKota;

                if(typeof $rootScope.selectedProv.listKota[idKota] != 'undefined'){
                    $rootScope.selectedKota = $rootScope.selectedProv.listKota[idKota];
                    var kejadians = $rootScope.selectedKota.kejadians;

                    var tahunList = [];
                    $.each(kejadians, function (i, kejadian) {
                        tahunList.push(i * 1);
                    })
                    $rootScope.tahunList = tahunList;

                    if (idKota != $rootScope.detailKejadian.lokasi.idKota) {
                        $rootScope.selectedTahun = tahunList[0];
                    }

                    $rootScope.selectTahun();
                }
            }
            $rootScope.selectTahun = function () {
                var kejadians = $rootScope.selectedKota.kejadians[$rootScope.selectedTahun];

                var bulans = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

                var bulanList = [];
                $.each(kejadians, function (i, kejadian) {

                    bulanList.push({ val: i * 1, label: bulans[i] });
                })
                $rootScope.bulanList = bulanList;

                if ($rootScope.selectedTahun != $rootScope.detailKejadian.waktu.mulai.tahun) {
                    $rootScope.selectedBulan = bulanList[0]['val'];
                }

                $rootScope.selectBulan();
            }
            $rootScope.selectBulan = function () {
                var kejadians = $rootScope.selectedKota.kejadians[$rootScope.selectedTahun][$rootScope.selectedBulan];

                $rootScope.kejadianList = kejadians;
            }

            $rootScope.selectKejadian = function (modalId) {
                var idKejadian = $root.selectedKejadian;

                $rootScope.idKejadian = idKejadian;
                $rootScope.loadDetailKejadian(function () {
                    $(modalId).modal('hide');
                });
            }

            $rootScope.updatePilihKec = function(){
                var jmlDb = {
                    meninggal   : 0,
                    hilang      : 0,
                    luka        : 0,
                    terdampak   : 0,
                    mengungsi   : 0,
                };
                $.each($rootScope.detailKejadian.dataList, function(i, dk){
                    if(dk.id==$rootScope.selectedIdKecamatan){
                        $.each(dk.korban, function(k, v){
                            jmlDb[k] = parseInt(v);
                        })
                    }
                })
                $rootScope.jml = jmlDb;
            }

            $rootScope.init();
        }
    ]);
/*
 * Initialize controllers module
 */
angular.module('bnpbApp.controllers', []);

/*
 * Initialize services
 */
angular.module('bnpbApp.services', []);

/*
 * Initialize directives
 */
angular.module('bnpbApp.directives', []);

/*
 * Initialize filters
 */
angular.module('bnpbApp.filters', []);