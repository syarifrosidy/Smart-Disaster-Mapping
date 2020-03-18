<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kejadian extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'kejadian';
    public $timestamps = false;
    
    protected $fillable = [
        'idwilayah', 'idpeta', 'namakejadian', 'klusterKorban', 'klusterLogistik', 'tahunMulai', 'bulanMulai', 'tglMulai'
    ];

    public function wilayah()
    {
        return $this->belongsTo(Wilayah::class, 'idwilayah', 'id');
    }
    public function peta()
    {
        return $this->belongsTo(Peta::class, 'idpeta');
    }
    public function details()
    {
        return $this->hasMany(DetailKejadian::class, 'idkejadian');
    }


    public function provinsi()
    {
        $provinsi = $this->wilayah;
        while($provinsi->level!=1){
            $provinsi = $provinsi->parent ? $provinsi->parent : $provinsi;
        }
        return $provinsi;
    }

    public function kota()
    {
        $kota = $this->wilayah;
        if($kota->level<2)
            return false;

        while($kota->level!=2){
            $kota = $kota->parent ? $kota->parent : $kota;
        }
        return $kota;
    }

    public function kecamatan()
    {
        $kec = $this->wilayah;
        if($kec->level<3)
            return false;
        
        while($kec->level!=3){
            $kec = $kec->parent ? $kec->parent : $kec;
        }
        return $kec;
    }
}
