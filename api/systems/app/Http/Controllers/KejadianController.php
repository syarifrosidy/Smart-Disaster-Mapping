<?php

namespace App\Http\Controllers;

use App\Kejadian;
use App\Bnpb\KMeans\Space;
use App\Bnpb\Phpml\Clustering\KMeans;
class KejadianController extends Controller
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

    public function listKejadian(){
        $kejadians = [];

        $kejadiansDB = Kejadian::all();
        foreach ($kejadiansDB as $kejadianDb) {
            $kotaDb = $kejadianDb->kota();
            $provinsiDb = $kejadianDb->provinsi();
            
            if(!isset($kejadians[$provinsiDb->id])){
                $kejadians[$provinsiDb->id] = [
                    'idProv'    => $provinsiDb->id,
                    'namaProv'  => $provinsiDb->name,
                    'listKota'  => [],
                ];
            }
            $kejadiansProv = $kejadians[$provinsiDb->id];

            $idKota = $kotaDb ? $kotaDb->id : 0;
            if(!isset($kejadiansProv['listKota'][$idKota])){
                $kejadians[$provinsiDb->id]['listKota'][$idKota] = [
                    'idKota'    => $idKota,
                    'namaKota'  => $kotaDb ? $kotaDb->name : 'Semua Kota',
                    'kejadians' => [],
                ];
            }

            $tahun  = $kejadianDb->tahunMulai;
            $bln    = $kejadianDb->bulanMulai;

            // $kejadians[$provinsiDb->id]['listKota'][$idKota]['kejadians'][$tahun][$bln]['bln'] = date('F', strtotime("2000/$bln/01"));
            
            $kejadians[$provinsiDb->id]['listKota'][$idKota]['kejadians'][$tahun][$bln][] = [
                'idKejadian'    => $kejadianDb->id,
                'namaKejadian'  => $kejadianDb->namakejadian,   
            ];
        }
        return ['response' => $kejadians];
    }
}


