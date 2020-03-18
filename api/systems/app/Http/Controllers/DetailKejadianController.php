<?php

namespace App\Http\Controllers;

use App\Wilayah;
use App\Kejadian;
use App\DetailKejadian;
use App\Bnpb\KMeans\Space;
use App\Bnpb\Phpml\Clustering\KMeans;

use Illuminate\Http\Request;

class DetailKejadianController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function tambahKejadian(Request $request){
        $inputs = $request->all();

        $time = strtotime($inputs['waktu']);
        $data = [
            'idwilayah'     => @$inputs['idWilayah'],
            'idpeta'        => 1,
            'namakejadian'  => @$inputs['namaKejadian'],
            'tahunMulai'    => date('Y', $time),
            'bulanMulai'    => date('n', $time),
            'tglMulai'      => date('j', $time),
        ];

        // print_r($data); die();

        $kejadian = Kejadian::create($data);
        if($kejadian){
            return [
                'status'    => 1,
                'message' => 'Add kejadian success',
            ];
        }
        return [
            'status'  => 0,
            'message' => 'Add kejadian error',
        ];
    }

    public function utambahUpdateKorban(Request $request){
        $inputs = $request->all();

        // print_r($inputs); die();
        $data = [
            'idkejadian'    => @$inputs['idKejadian'],
            'idwilayah'     => @$inputs['idKecamatan'],
            'meninggal'     => @$inputs['meninggal'],
            'hilang'        => @$inputs['hilang'],
            'luka'          => @$inputs['luka'],
            'mengungsi'     => @$inputs['mengungsi'],
            'terdampak'     => @$inputs['terdampak'],
        ];
        // print_r($data); die();
        $detailKejadian = DetailKejadian::where('idkejadian', $inputs['idKejadian'])->where('idwilayah', $inputs['idKecamatan'])->first();
        if($detailKejadian){
            // update
            $detailKejadian->update($data);
        }else{
            // insert
            $detailKejadian = DetailKejadian::create($data);
        }
        return $this->detailKejadian($inputs['idKejadian']);
    }

    public function detailKejadian($id=0){
        $kejadianDb = Kejadian::find($id);
        
        $response = [];
        if(!$kejadianDb){
            $kejadianDb = Kejadian::orderBy('id', 'DESC')->first();
        }
        $kotaDb = $kejadianDb->kota();
        $provinsiDb = $kejadianDb->provinsi();

        $petaDb = $kejadianDb->peta;

        #region detail
        $legends = $points = $dataIds = $dataList = $dataListOri = [];

        $detailKejadianDb = $kejadianDb->details;
        foreach ($detailKejadianDb as $detail) {
            if(empty($detail->meninggal)&&empty($detail->hilang)&&empty($detail->luka)&&empty($detail->mengungsi)&&empty($detail->terdampak)){
                continue;
            }
            $points[$detail->idwilayah] = [
                $detail->meninggal*1,
                $detail->hilang*1,
                $detail->luka*1,
                $detail->mengungsi*1,
                $detail->terdampak*1,
            ];

            $dataListOri[$detail->idwilayah] = [
                'id'        => $detail->idwilayah,
                'namaKota'  => $detail->wilayah->kota()->name,
                'namaKec'   => $detail->wilayah->kecamatan()->name,

                'korban'    => [
                    'meninggal'     => $detail->meninggal,
                    'hilang'        => $detail->hilang,
                    'luka'          => $detail->luka,
                    'mengungsi'     => $detail->mengungsi,
                    'terdampak'     => $detail->terdampak,
                ],
                // 'logistik'   => [10, 13, 120],

                'mapAreaId' => 'IdWil.'.$detail->idwilayah,

                'kluster'   => [
                    'c1', 'Kluster 1', '#D53232',
                ],
            ];
        }
        #region detail

        $chartData = [];

        if(is_array($points)&&count($points)){
            #region klustering2
            $cluterData = [
                ['c1', 'Kluster 1', '#D53232', 0],
                ['c2', 'Kluster 2', '#115099', 1],
                ['c3', 'Kluster 3', '#E38538', 2],
                ['c4', 'Kluster 4', '#000000', 3],
            ];
            // INIT_RANDOM||INIT_KMEANS_PLUS_PLUS
            $kmeans = new KMeans(3, KMeans::INIT_KMEANS_PLUS_PLUS);

            $clusters = $kmeans->cluster($points);
            $maxs = [];
            foreach($clusters as $clusterNo => $members){

                $chartData[$clusterNo] = [
                    'labels'    => [],
                    'list'      => [],
                ];
                $n = 0;
                foreach ($members as $idwilayah => $values) {
                    $n++;
                    $dataListOri[$idwilayah]['kluster'] = $cluterData[$clusterNo];
                    $dataList[] = $dataListOri[$idwilayah];


                    $chartData[$clusterNo]['labels'][] = 'wil-'.$n;

                    $columns = ['meninggal', 'hilang', 'luka', 'mengungsi', 'terdampak'];
                }
                foreach ($columns as $k => $column) {
                    $chartData[$clusterNo]['list'][] = [
                        'name'  => $column,
                        'data'  => array_column($members, $k),
                    ];
                    $maxs[] = max(array_column($members, $k));
                }
            }
            foreach ($chartData as $k => $v) {
                $v['max'] = max($maxs);
                $chartData[$k] = $v;
            }
            #region klustering2

            #region keterangan kluster
            $legends = [];
            foreach($clusters as $clusterNo => $members){
                $data = $cluterData[$clusterNo];
                
                $columns = ['meninggal', 'hilang', 'luka', 'mengungsi', 'terdampak'];

                $data['memberCount'] = count($members);
                foreach ($columns as $k => $column) {

                    $array_column = array_column($members, $k);
                    $data[$column] = [
                        'min'   => count($array_column) ? min($array_column) : 0,
                        'max'   => count($array_column) ? max($array_column) : 0,
                        'avg'   => count($array_column) ? array_sum($array_column)/count($array_column) : 0,
                    ];
                }

                $legends[] = $data;
                // print_r($members);
                // print_r(array_column($members, 4));
            }
            // print_r($legends);
            // die();
            #region keterangan kluster

            // die();
        }

        $listKecamatan = [];
        $dki = 31;
        $kecamatans = Wilayah::where('level', 3)->where('id', 'like', $dki.'%');
        if($kotaDb){
            $kecamatans->where('idwilayah', $kotaDb->id);
        }

        foreach ($kecamatans->get() as $kecamatan) {
            // $kota = $kecamatan->parent()->first();
            $listKecamatan[$kecamatan->id] = $kecamatan->toArray();
        }


        $response = [
            'idKejadian'    => $kejadianDb->id,
            'namaKejadian'  => $kejadianDb->namakejadian,
            
            'klusterKorban'     => $kejadianDb->klusterKorban,
            'klusterLogistik'   => $kejadianDb->klusterLogistik,
            
            'lokasi'        => [
                'idProv'    => $provinsiDb->id,
                'namaProv'  => $provinsiDb->name,

                'idKota'    => $kotaDb ? $kotaDb->id : 0,
                'namaKota'  => $kotaDb ? $kotaDb->name : 'Semua Kota',

                'display'   => $provinsiDb->name.' <i class="fa fa-chevron-right"></i> '.($kotaDb ? $kotaDb->name : 'Semua Kota'),
            ],

            'waktu' => [
                'mulai' => [
                    'tahun' => $kejadianDb->tahunMulai,
                    'bulan' => $kejadianDb->bulanMulai,
                    'tgl'   => $kejadianDb->tglMulai,

                    'display'   => date('Y / F', strtotime("{$kejadianDb->tahunMulai}/$kejadianDb->bulanMulai/$kejadianDb->tglMulai"))
                ],
            ],

            'peta'  => $petaDb,

            'legends'   => $legends,

            'dataList' => $dataList,

            'listKecamatan' => $listKecamatan,

            'chartData' => $chartData,
        ];

        return ['response' => $response];

    }
}


