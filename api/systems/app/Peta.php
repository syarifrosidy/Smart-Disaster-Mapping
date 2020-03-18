<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Peta extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'peta';
    public $timestamps = false;
    
    protected $fillable = [
        'idwilayah', 'level', 'filename'
    ];
    protected $hidden = ['id', 'idwilayah'];


    public function wilayah()
    {
        return $this->belongsTo(Wilayah::class, 'idwilayah');
    }
    public function kejadians()
    {
       return $this->hasMany(Kejadian::class, 'idkejadian');
    }
}
