<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wilayah extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'wilayah';
    public $timestamps = false;
    
    protected $fillable = [
        'parentid', 'level', 'name'
    ];
    public function childs()
    {
       return $this->hasMany(Wilayah::class, 'idwilayah');
    }
    public function parent()
    {
       return $this->belongsTo(Wilayah::class, 'idwilayah');
    }

    public function kejadians()
    {
       return $this->hasMany(Kejadian::class, 'idkejadian');
    }
    public function petas()
    {
       return $this->hasMany(Peta::class, 'idpeta');
    }



    public function provinsi()
    {
        $provinsi = $this;
        while($provinsi->level!=1){
            $provinsi = $provinsi->parent ? $provinsi->parent : $provinsi;
        }
        return $provinsi;
    }

    public function kota()
    {
        $kota = $this;
        if($kota->level<2)
            return false;

        while($kota->level!=2){
            $kota = $kota->parent ? $kota->parent : $kota;
        }
        return $kota;
    }

    public function kecamatan()
    {
        $kec = $this;
        if($kec->level<3)
            return false;
        
        while($kec->level!=3){
            $kec = $kec->parent ? $kec->parent : $kec;
        }
        return $kec;
    }
}
